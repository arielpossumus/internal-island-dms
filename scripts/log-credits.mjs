#!/usr/bin/env node
// Records Copilot Chat credit consumption of this workspace into docs/CREDITS_LOG.md.
// Usage: node scripts/log-credits.mjs [--quiet] [--install-hook]
// Env:   CREDITS_STORAGE_DIR overrides the VS Code workspaceStorage root to scan.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'docs', 'credits');
const logFile = path.join(root, 'docs', 'CREDITS_LOG.md');
const args = new Set(process.argv.slice(2));
const quiet = args.has('--quiet');
const say = (msg) => { if (!quiet) console.log(msg); };

// ---------- Hook installation ----------
if (args.has('--install-hook')) {
  const hook = path.join(root, '.githooks', 'pre-commit');
  if (!fs.existsSync(hook)) {
    console.error('.githooks/pre-commit is missing');
    process.exit(1);
  }
  if (process.platform !== 'win32') fs.chmodSync(hook, 0o755);
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { cwd: root, stdio: 'inherit' });
  console.log('Installed: git hooks now run from .githooks (credits are logged on every commit).');
  process.exit(0);
}

// ---------- Locate chatSessions folders of this workspace ----------
function storageRoots() {
  if (process.env.CREDITS_STORAGE_DIR) return [process.env.CREDITS_STORAGE_DIR];
  const home = os.homedir();
  let base;
  if (process.platform === 'win32') base = process.env.APPDATA ?? path.join(home, 'AppData', 'Roaming');
  else if (process.platform === 'darwin') base = path.join(home, 'Library', 'Application Support');
  else base = process.env.XDG_CONFIG_HOME ?? path.join(home, '.config');
  return ['Code', 'Code - Insiders'].map((v) => path.join(base, v, 'User', 'workspaceStorage'));
}

const caseFold = (p) => (process.platform === 'linux' ? p : p.toLowerCase());
const samePath = (a, b) => caseFold(path.resolve(a)) === caseFold(path.resolve(b));

function findChatSessionDirs() {
  const found = [];
  for (const base of storageRoots()) {
    if (!fs.existsSync(base)) continue;
    for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = path.join(base, entry.name);
      try {
        const ws = JSON.parse(fs.readFileSync(path.join(dir, 'workspace.json'), 'utf8'));
        if (!ws.folder || !samePath(fileURLToPath(ws.folder), root)) continue;
      } catch { continue; }
      const sessions = path.join(dir, 'chatSessions');
      if (fs.existsSync(sessions)) found.push(sessions);
    }
  }
  return found;
}

// ---------- Rebuild a session state from its patch log ----------
function setPath(state, keys, value) {
  let node = state;
  for (const k of keys.slice(0, -1)) {
    if (node == null || typeof node !== 'object') return;
    node = node[k];
  }
  if (node != null && typeof node === 'object') node[keys[keys.length - 1]] = value;
}

function getPath(state, keys) {
  let node = state;
  for (const k of keys) {
    if (node == null || typeof node !== 'object') return undefined;
    node = node[k];
  }
  return node;
}

function readSession(file) {
  let state = null;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }
    if (ev.kind === 0) state = ev.v;
    else if (!state) continue;
    else if (ev.kind === 1) setPath(state, ev.k, ev.v);
    else if (ev.kind === 2) {
      const arr = getPath(state, ev.k);
      if (!Array.isArray(arr)) continue;
      if (typeof ev.i === 'number') arr.length = Math.min(arr.length, ev.i);
      arr.push(...(Array.isArray(ev.v) ? ev.v : [ev.v]));
    }
  }
  return state;
}

const localDate = (ms) => {
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const round = (n) => Math.round(n * 1e6) / 1e6;

function summarize(state, user) {
  const requests = (state.requests ?? []).filter((r) => typeof r?.copilotCredits === 'number');
  if (!requests.length) return null;
  const days = {};
  let credits = 0, promptTokens = 0, completionTokens = 0, peakPromptTokens = 0;
  for (const r of requests) {
    const day = localDate(r.timestamp);
    days[day] ??= { credits: 0, requests: 0, promptTokens: 0, completionTokens: 0 };
    days[day].credits = round(days[day].credits + r.copilotCredits);
    days[day].requests += 1;
    days[day].promptTokens += r.promptTokens ?? 0;
    days[day].completionTokens += r.completionTokens ?? 0;
    credits += r.copilotCredits;
    promptTokens += r.promptTokens ?? 0;
    completionTokens += r.completionTokens ?? 0;
    peakPromptTokens = Math.max(peakPromptTokens, r.promptTokens ?? 0);
  }
  const first = state.requests.find((r) => r?.message?.text)?.message.text;
  const stamps = requests.map((r) => r.timestamp);
  return {
    sessionId: state.sessionId,
    title: state.customTitle ?? (first ? first.slice(0, 80) : '(untitled)'),
    user,
    credits: round(credits),
    requests: requests.length,
    promptTokens,
    completionTokens,
    peakPromptTokens,
    firstAt: new Date(Math.min(...stamps)).toISOString(),
    lastAt: new Date(Math.max(...stamps)).toISOString(),
    days,
  };
}

// ---------- Identity ----------
function currentUser() {
  let name = '';
  try { name = execFileSync('git', ['config', 'user.name'], { cwd: root, encoding: 'utf8' }).trim(); } catch { /* fall back below */ }
  name ||= os.userInfo().username;
  return { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'unknown' };
}

// ---------- Upsert into the per-user data file ----------
function updateUserData(user, summaries) {
  fs.mkdirSync(dataDir, { recursive: true });
  const file = path.join(dataDir, `${user.slug}.json`);
  const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { user: user.name, sessions: {} };
  let changed = false;
  for (const s of summaries) {
    const prev = data.sessions[s.sessionId];
    // Never lower a recorded value (a compacted or truncated session file must not erase history).
    if (prev && prev.credits > s.credits) continue;
    if (prev && JSON.stringify(prev) === JSON.stringify(s)) continue;
    data.sessions[s.sessionId] = s;
    changed = true;
  }
  if (changed) {
    const sorted = Object.fromEntries(Object.entries(data.sessions).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(file, `${JSON.stringify({ user: data.user, sessions: sorted }, null, 2)}\n`);
  }
  return changed;
}

// ---------- Render the changelog-style log ----------
// es-AR: dot for thousands, comma for decimals ('always' keeps the dot on 4-digit numbers).
const AR = 'es-AR';
const fmt = (n) => n.toLocaleString(AR, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' });
const num = (n) => n.toLocaleString(AR, { useGrouping: 'always' });
const tokens = (n) => (n >= 1000 ? `${(n / 1000).toLocaleString(AR, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}K` : String(n));
const usedTokens = (o) => (o.promptTokens ?? 0) + (o.completionTokens ?? 0);

function renderLog() {
  const sessions = fs.existsSync(dataDir)
    ? fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'))
        .flatMap((f) => Object.values(JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8')).sessions))
    : [];
  const byDay = new Map();
  for (const s of sessions) {
    for (const [day, d] of Object.entries(s.days)) {
      if (!byDay.has(day)) byDay.set(day, new Map());
      const users = byDay.get(day);
      if (!users.has(s.user)) users.set(s.user, []);
      users.get(s.user).push({ s, ...d });
    }
  }
  const total = sessions.reduce((sum, s) => sum + s.credits, 0);
  const perUser = new Map();
  for (const s of sessions) {
    const u = perUser.get(s.user) ?? { credits: 0, promptTokens: 0, completionTokens: 0 };
    u.credits += s.credits;
    u.promptTokens += s.promptTokens ?? 0;
    u.completionTokens += s.completionTokens ?? 0;
    perUser.set(s.user, u);
  }
  const all = { promptTokens: 0, completionTokens: 0 };
  for (const u of perUser.values()) {
    all.promptTokens += u.promptTokens;
    all.completionTokens += u.completionTokens;
  }

  const out = [
    '# Credits Log',
    '',
    'Generated by `scripts/log-credits.mjs` from the Copilot Chat session data of each contributor. Do not edit by hand; run the script or ask the `credits-tracker` agent to refresh it.',
    '',
    `**Project total: ${fmt(total)} credits, ${num(usedTokens(all))} tokens (${num(all.promptTokens)} input, ${num(all.completionTokens)} output)** across ${sessions.length} session(s).`,
    '',
    'Input tokens add up the context sent on every request, so they exceed the peak context of a session.',
    '',
    ...[...perUser].sort((a, b) => b[1].credits - a[1].credits).map(([name, u]) => `- ${name}: ${fmt(u.credits)} credits, ${num(usedTokens(u))} tokens (${num(u.promptTokens)} input, ${num(u.completionTokens)} output)`),
    '',
  ];
  for (const day of [...byDay.keys()].sort().reverse()) {
    const users = byDay.get(day);
    const dayTotal = [...users.values()].flat().reduce((sum, e) => sum + e.credits, 0);
    out.push(`## [${day}] - ${fmt(dayTotal)} credits`, '');
    for (const [user, entries] of [...users].sort(([a], [b]) => a.localeCompare(b))) {
      out.push(`### ${user} - ${fmt(entries.reduce((sum, e) => sum + e.credits, 0))} credits`, '');
      for (const e of entries.sort((a, b) => b.credits - a.credits)) {
        out.push(`- \`${e.s.sessionId.slice(0, 8)}\` ${e.s.title}: ${fmt(e.credits)} credits, ${num(usedTokens(e))} tokens (${num(e.promptTokens ?? 0)} input, ${num(e.completionTokens ?? 0)} output), ${e.requests} request(s), peak context ${tokens(e.s.peakPromptTokens)}`);
      }
      out.push('');
    }
  }
  return `${out.join('\n').trimEnd()}\n`;
}

// ---------- Main ----------
const dirs = findChatSessionDirs();
if (!dirs.length) {
  say('No Copilot Chat session data found for this workspace; log left unchanged.');
} else {
  const user = currentUser();
  const best = new Map();
  for (const dir of dirs) {
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.jsonl'))) {
      try {
        const state = readSession(path.join(dir, f));
        const summary = state && summarize(state, user.name);
        if (!summary) continue;
        const prev = best.get(summary.sessionId);
        if (!prev || prev.credits < summary.credits) best.set(summary.sessionId, summary);
      } catch (e) {
        say(`Skipped ${f}: ${e.message}`);
      }
    }
  }
  const changed = updateUserData(user, [...best.values()]);
  const log = renderLog();
  const previous = fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf8') : '';
  if (log !== previous) fs.writeFileSync(logFile, log);
  say(`${best.size} session(s) read for ${user.name}; data ${changed ? 'updated' : 'unchanged'}; log ${log !== previous ? 'rewritten' : 'unchanged'}.`);
}

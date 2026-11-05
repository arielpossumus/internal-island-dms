#!/usr/bin/env node
// Validates framework structure: frontmatter, cross-references, paths, naming, and version.
// Usage: node scripts/validate-framework.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const error = (file, msg) => errors.push(`${rel(file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${rel(file)}: ${msg}`);

function rel(p) {
  return path.relative(root, p).split(path.sep).join('/') || '.';
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(root);
const mdFiles = allFiles.filter((f) => f.endsWith('.md'));
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const unquote = (s) => s.trim().replace(/^['"]|['"]$/g, '');

// ---------- 1. Required root files ----------
const requiredRoot = [
  'README.md', 'AGENTS.md', 'project_context.md', 'architecture.md', 'tech_stack.md',
  'contributing.md', 'CHANGELOG.md', 'FRAMEWORK_VERSION', 'docs/FRAMEWORK_CHANGELOG.md',
  '.github/copilot-instructions.md',
];
for (const f of requiredRoot) {
  if (!fs.existsSync(path.join(root, f))) error(path.join(root, f), 'required file is missing');
}

// ---------- 2. Empty files ----------
for (const f of mdFiles) {
  if (read(f).trim() === '') error(f, 'file is empty');
}

// ---------- 3. Naming conventions ----------
const namingRules = [
  { dir: '.github/agents/dev', test: (n) => n.endsWith('.agent.md'), hint: '*.agent.md' },
  { dir: '.github/agents/ux', test: (n) => n.endsWith('.agent.md'), hint: '*.agent.md' },
  { dir: '.github/skills/dev', test: (n) => n.endsWith('.skill.md'), hint: '*.skill.md' },
  { dir: '.github/skills/ux', test: (n) => n.endsWith('.skill.md'), hint: '*.skill.md' },
  { dir: '.github/rules', test: (n) => n.endsWith('.rules.md'), hint: '*.rules.md' },
  { dir: '.github/templates', test: (n) => n.endsWith('.template.md'), hint: '*.template.md' },
  { dir: '.github/workflows', test: (n) => n.endsWith('.workflow.md') || /\.ya?ml$/.test(n), hint: '*.workflow.md (or GitHub Actions *.yml)' },
  { dir: '.github/prompts', test: (n) => n.endsWith('.prompt.md'), hint: '*.prompt.md' },
  { dir: '.github/instructions', test: (n) => n.endsWith('.instructions.md'), hint: '*.instructions.md' },
  { dir: '.github/examples', test: (n) => n.endsWith('.example.md') || n.startsWith('example-'), hint: '*.example.md or example-*.md' },
];
for (const f of allFiles) {
  const r = rel(f);
  const name = path.basename(f);
  if (name === '.gitkeep') continue;
  if (/^\.github\/agents\/[^/]+$/.test(r)) {
    error(f, 'agents must live in .github/agents/dev/ or .github/agents/ux/');
    continue;
  }
  if (/^\.github\/skills\/[^/]+$/.test(r)) {
    error(f, 'skills must live in .github/skills/dev/ or .github/skills/ux/');
    continue;
  }
  for (const rule of namingRules) {
    if (r.startsWith(`${rule.dir}/`) && !rule.test(name)) {
      error(f, `file name must match ${rule.hint}`);
    }
  }
}

// ---------- 4. Frontmatter ----------
function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  if (end === -1) return null;
  const lines = text.slice(4, end).split('\n');
  const data = {};
  let key = null;
  for (const line of lines) {
    const top = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (top) {
      key = top[1];
      data[key] = { value: unquote(top[2]), block: [] };
    } else if (key && /^\s+\S/.test(line)) {
      data[key].block.push(line);
    }
  }
  return data;
}

const agentFiles = mdFiles.filter((f) => f.endsWith('.agent.md'));
const promptFiles = mdFiles.filter((f) => f.endsWith('.prompt.md'));
const instructionFiles = mdFiles.filter((f) => f.endsWith('.instructions.md'));

const agentNames = new Map();
const agentData = new Map();
for (const f of agentFiles) {
  const fm = parseFrontmatter(read(f));
  if (!fm) { error(f, 'missing or malformed frontmatter'); continue; }
  agentData.set(f, fm);
  for (const k of ['name', 'description']) {
    if (!fm[k] || !fm[k].value) error(f, `frontmatter is missing "${k}"`);
  }
  const name = fm.name?.value;
  if (!name) continue;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) error(f, `agent name "${name}" must be kebab-case`);
  if (agentNames.has(name)) error(f, `duplicate agent name "${name}" (also in ${rel(agentNames.get(name))})`);
  else agentNames.set(name, f);
  const expected = path.basename(f).replace('.agent.md', '');
  if (expected !== name) warn(f, `agent name "${name}" differs from file name "${expected}"`);
}

for (const [f, fm] of agentData) {
  for (const line of fm.agents?.block ?? []) {
    const m = line.match(/^\s*-\s+(.+)$/);
    if (!m) continue;
    const ref = unquote(m[1]);
    if (ref !== '*' && !agentNames.has(ref)) error(f, `"agents:" references unknown agent "${ref}"`);
  }
  for (const line of fm.handoffs?.block ?? []) {
    const m = line.match(/^\s+(?:-\s+)?agent:\s*(.+)$/);
    if (!m) continue;
    const ref = unquote(m[1]);
    if (!agentNames.has(ref)) error(f, `handoff references unknown agent "${ref}"`);
  }
}

for (const f of promptFiles) {
  const fm = parseFrontmatter(read(f));
  if (!fm) { error(f, 'missing or malformed frontmatter'); continue; }
  if (!fm.description?.value) error(f, 'frontmatter is missing "description"');
  const ref = fm.agent?.value;
  if (ref && !agentNames.has(ref)) error(f, `"agent:" references unknown agent "${ref}"`);
}

for (const f of instructionFiles) {
  const fm = parseFrontmatter(read(f));
  if (!fm) { error(f, 'missing or malformed frontmatter'); continue; }
  if (!fm.applyTo?.value) error(f, 'frontmatter is missing "applyTo"');
}

// ---------- 4b. Unclosed code fences ----------
for (const f of mdFiles) {
  let open = null;
  for (const line of read(f).split('\n')) {
    const m = line.match(/^\s*(`{3,})(.*)$/);
    if (!m) continue;
    if (!open) open = m[1].length;
    else if (m[1].length >= open && m[2].trim() === '') open = null;
  }
  if (open) error(f, 'unclosed code fence');
}

// ---------- 5. Links and paths ----------
const registry = new Set(allFiles.map((f) => path.basename(f)));
const pathPrefix = /^(\.github|docs|scripts)\//;
const historical = new Set(['CHANGELOG.md', 'docs/FRAMEWORK_CHANGELOG.md']);

function checkPathRef(file, ref) {
  if (/[<\[{$]|NNNN/.test(ref)) return;
  let target = ref;
  if (ref.includes('*')) {
    target = ref.slice(0, ref.indexOf('*'));
    target = target.slice(0, Math.max(target.lastIndexOf('/'), 0));
  }
  target = target.replace(/\/+$/, '');
  if (!target) return;
  const full = path.join(root, target);
  if (!fs.existsSync(full)) error(file, `referenced path does not exist: ${ref}`);
}

for (const f of mdFiles) {
  if (historical.has(rel(f))) continue;
  const text = read(f);
  const noFences = text.replace(/```[\s\S]*?```/g, '');

  for (const m of noFences.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    let target = m[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target) || /[<${]/.test(target)) continue;
    target = decodeURIComponent(target);
    const full = path.resolve(path.dirname(f), target);
    if (!fs.existsSync(full)) error(f, `broken link: ${m[1]}`);
  }

  for (const m of noFences.matchAll(/`([^`\n]+)`/g)) {
    const token = m[1].trim();
    if (pathPrefix.test(token) && !/\s/.test(token)) {
      checkPathRef(f, token);
    } else if (/^[a-z0-9-]+\.(skill|workflow|template|rules|agent|prompt|instructions)\.md$/.test(token)) {
      if (!registry.has(token)) error(f, `referenced file does not exist: ${token}`);
    }
  }
}

// ---------- 6. Version ----------
const versionFile = path.join(root, 'FRAMEWORK_VERSION');
const changelogFile = path.join(root, 'docs/FRAMEWORK_CHANGELOG.md');
if (fs.existsSync(versionFile) && fs.existsSync(changelogFile)) {
  const version = read(versionFile).trim();
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    error(versionFile, `"${version}" is not a valid semantic version (x.y.z)`);
  } else {
    const top = read(changelogFile).match(/^##\s+(\d+\.\d+\.\d+)/m);
    if (!top) error(changelogFile, 'no version heading (## x.y.z) found');
    else if (top[1] !== version) {
      error(changelogFile, `latest entry is ${top[1]} but FRAMEWORK_VERSION is ${version}`);
    }
  }
}

// ---------- Report ----------
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`\nChecked ${mdFiles.length} markdown files: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);

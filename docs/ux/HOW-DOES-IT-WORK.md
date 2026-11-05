# How Does It Work

Complete guide to the UX / Design System domain of the framework: what it is, how it works, its philosophy, and how to start a new project.

---

## What this framework is

The UX domain of the unified framework (agents in `.github/agents/ux/`, documentation in `docs/ux/`) is a reusable base structure for UX/UI projects that work with a tokenized Design System and AI agents integrated into the editor.

It is not a component library or a code generator. It is a **working system**: a combination of folder structure, documented conventions, and pre-configured GitHub Copilot agents that let UX + Dev teams work in a coordinated way from Figma to implementation.

The framework solves three concrete problems:
1. **The Figma → code gap**: design tokens reach the repo with a defined structure and contracts, not as screenshots.
2. **Context loss between handoffs**: specs, decisions, and reviews live in the repo next to the code.
3. **Inconsistent token usage**: the AI agents know the system's rules and apply them in every suggestion.

---

## How it works

The framework rests on three pillars:

### 1. Tokens as a shared source of truth
Tokens are exported from Figma Variables in W3C DTCG format and live in `/tokens/`. They are the contract between design and development: the designer defines values in Figma, the dev consumes them from the JSONs. Nobody hardcodes values.

### 2. Specialized agents by role
The GitHub Copilot agents in `.github/agents/ux/` have design-specific context: they know the tokens, the project conventions, and the workflow. They are not generic assistants: they are configured for concrete tasks (audit, specify, review, sync).

### 3. Prompts as workflow commands
The prompts in `.github/prompts/` are shortcuts for repeatable tasks. They are invoked with `/name`; if the request arrives in natural language, the agent uses the matching prompt and says which one it applied.

| Prompt | What it does |
|--------|----------|
| `/session-start` | Loads the project context at the start of a session |
| `/create-figma-tokens` | Analyzes or creates variables, Text Styles, and Effect Styles in Figma with scope and description (analysis or apply mode) |
| `/create-figma-component` | Creates a component in Figma with the right variables, variants, and states |
| `/audit-design` | Audits a design against the defined tokens |
| `/audit-tokens` | Verifies the internal consistency of the tokens |
| `/audit-consistency` | Reviews consistency of components and styles |
| `/generate-spec` | Generates a handoff spec for dev |
| `/implement-html` | Generates an HTML prototype from a spec, an image, or a direct request |
| `/audit-html-components` | Inventories the components and tokens of an HTML prototype and detects gaps against the Figma library |
| `/sync-html-to-figma` | Rebuilds an HTML section in Figma using real library components |
| `/heuristic-review` | Formal heuristic evaluation (Nielsen) with a documentable report |
| `/sync-tokens` | Shows the token diff and updates the files |

---

## Internal framework flow

### Main flow: Figma → HTML

```
Figma (visual source)
  │
  ▼
Initial export of Variables → /tokens/*.json
  │
  ▼
/session-start → the agent loads the project context
  │
  ▼
/create-figma-component → component created in Figma with variables and states
  │
  ▼
/audit-design → the agent reviews design ↔ token consistency
  │
  ├── inconsistencies found → fix in Figma → /sync-tokens
  │
  ▼
/generate-spec → handoff spec in /specs/
  │
  ▼
/implement-html → HTML prototype in /prototypes/flow/v1/
  │
  ▼
User testing → findings in /research/
  │
  ├── changes needed → /implement-html new version (v2, v3...)
  │     → CHANGELOG.md updated in /prototypes/flow/
  │     → important decision → ADR in /decisions/
  │     → (loop until validated)
  │
  ▼
Validated prototype → design review
  │
  ├── Formal evaluation → /heuristic-review → report in /reviews/
  └── Iterative review → ask the prototype-reviewer agent
  │
  ▼
Design decisions → /decisions/ (ADRs)
```

### Reverse flow: HTML → Figma

When you have a validated HTML prototype and want to sync it to Figma:

```
/implement-html → prototype in /prototypes/flow/v1/
  │
  ▼
Validated with users → ready to sync
  │
  ▼
/audit-html-components → complete inventory
  │
  ├── Components that exist in the library (List 1)
  ├── New components to build (List 2)
  ├── Missing tokens (List 3)
  └── Hardcoded values (List 4)
  │
  ▼
/create-figma-component → build the missing ones from List 2
  │
  ▼
/sync-html-to-figma → rebuild in Figma with variables and components
  │
  ▼
/audit-design → verify the rebuilt frame before closing
```

**When there are changes in Figma:**
```
You modify Variables, Text Styles, or Effect Styles in Figma
  → /sync-tokens with the agent
  → the agent shows the diff
  → you approve
  → the agent updates /tokens/
  → you commit
```

For the full sequence of a design system change (including ADRs and the handoff to dev), see the `design-system` workflow in `.github/workflows/`.

---

## Repository structure (UX domain)

```
tokens/                          ← DS source of truth
│   ├── primitives/
│   │   └── color.tokens.json        ← raw palette
│   ├── foundations/
│   │   ├── spacing.tokens.json      ← spacing scale
│   │   ├── typography.tokens.json   ← typography and scale
│   │   ├── shadow.tokens.json       ← shadows (Effect Styles)
│   │   └── border.tokens.json       ← radius
│   └── semantic/
│       └── default.tokens.json      ← one file per mode

.github/
├── copilot-instructions.md      ← global instructions for Copilot
├── agents/ux/                   ← specialized agent definitions
│   ├── ui-architect.agent.md
│   ├── ux-researcher.agent.md
│   └── prototype-reviewer.agent.md
├── instructions/                ← automatic rules by file type
│   ├── tokens.instructions.md
│   └── components.instructions.md
└── prompts/                     ← workflow commands
    ├── session-start.prompt.md
    ├── create-figma-tokens.prompt.md
    ├── create-figma-component.prompt.md
    ├── audit-design.prompt.md
    ├── audit-tokens.prompt.md
    ├── audit-consistency.prompt.md
    ├── generate-spec.prompt.md
    ├── implement-html.prompt.md
    ├── audit-html-components.prompt.md
    ├── sync-html-to-figma.prompt.md
    ├── heuristic-review.prompt.md
    └── sync-tokens.prompt.md

research/                        ← UX findings, insights, interview guides
specs/                           ← component specs for dev handoff
prototypes/                      ← HTML prototypes for internal UX validation
decisions/                       ← ADRs: record of design decisions
reviews/                         ← usability and accessibility reviews

AGENTS.md                        ← project context for the agents
docs/ux/                         ← this guide and the prompts guide
```

---

## What each folder does

### `/tokens/`
Tokens in W3C DTCG format, synced from Figma. Variables arrive through an initial export per collection; `/sync-tokens` then maintains the Variables deltas and syncs Text Styles and Effect Styles with a diff + human OK. They are the source of truth for design values. The architecture (layers, files, and mapping to Figma) is in `AGENTS.md` → «Token architecture».

### `/.github/agents/ux/`
Definition of the GitHub Copilot agents. Each file configures an agent with specific instructions, enabled tools, and role context. Agents are invoked from the VS Code Chat panel.

### `/.github/instructions/`
Automatic instructions that Copilot applies according to the type of file open. `tokens.instructions.md` activates when working with tokens; `components.instructions.md` when working with prototypes in `/prototypes/`.

### `/.github/prompts/`
Reusable commands that chain instructions for the agent. They run with `/prompt-name` in the active agent's chat.

### `/research/`
Everything that comes from the discovery process: interview findings, competitor analyses, and insights.

### `/specs/`
Specifications of components or screens generated by the ui-architect agent. They are the handoff deliverable for dev: they describe structure, tokens, states, behavior, and accessibility. Template: `.github/templates/ux-spec.template.md`.

### `/prototypes/`
HTML prototypes where the design lives while it is iterated and validated. They are generated with the `/implement-html` prompt and are the main workspace before the real implementation: user tests, clickable deliverables, flow reviews.

Each flow or screen has its own folder, versioned by iteration:

```
prototypes/flow-name/
├── CHANGELOG.md   ← iteration log: what changed, why, which findings motivated it
├── v1/
│   ├── index.html
│   └── README.md  ← what was tested, with whom, findings
└── v2/
    ├── index.html
    └── README.md  ← what changed from v1 and why
```

The `CHANGELOG.md` is the traceability thread: it connects each version with the research findings and the design decisions that motivated it. The links point to files in `/research/` and `/decisions/` so the history is navigable.

### `/decisions/`
ADRs (Architecture Decision Records) for design and architecture. Each important decision is documented here: context, alternatives considered, decision taken, and consequences. Name format: `ADR-NNNN-title.md` (sequential numbering), with status and date in the header. Template: `.github/templates/adr.template.md`.

### `/reviews/`
Formal usability and accessibility reviews, generated by the prototype-reviewer agent. They document the problems found, severity, and recommendations. Template: `.github/templates/ux-review.template.md`.

---

## Important project files

| File | Purpose | Who edits it |
|---------|-----------|----------------|
| `AGENTS.md` | Project-specific context: name, team, stack, visual principles | UX Lead when starting the project |
| `.github/copilot-instructions.md` | Global Copilot behavior in this repo | UX Lead |
| `.github/agents/ux/*.agent.md` | Personality and capabilities of each agent | UX Lead (if adjustments are needed) |
| `.github/instructions/tokens.instructions.md` | Rules Copilot applies when working with tokens | Do not edit except for a convention change |
| `.github/instructions/components.instructions.md` | Conventions for prototypes in `/prototypes/`: versioned structure, CHANGELOG and README formats | Do not edit except for a convention change |
| `tokens/**/*.tokens.json` | Variables exported initially and deltas synced from Figma | UX exports a new collection; then `/sync-tokens` updates the target |
| `FRAMEWORK_VERSION` | Framework version the project came from | Do not edit by hand; updated when incorporating changes from the base |
| `docs/FRAMEWORK_CHANGELOG.md` | Framework change history (not to be confused with each prototype's `CHANGELOG.md` or the project's) | Framework maintainer |

---

## How to start a new project

### 1. Create the project from the framework

Use GitHub **"Use this template"** on the framework repo. The project is born with a clean history but with an identifiable starting point.

Note the version it came from: the `FRAMEWORK_VERSION` file already ships in the template and is not edited.

**To incorporate framework improvements later:**

```bash
# Add the framework as a read-only remote
git remote add upstream https://github.com/YOUR-ORG/ai-framework-template
git fetch upstream

# See what changed since the project's version (see docs/FRAMEWORK_CHANGELOG.md)
git diff <version-commit> upstream/main -- .github AGENTS.md
```

Review the diff before applying: the project may have its own adjustments (paths, `applyTo`, sections of `AGENTS.md`). When finished, update `FRAMEWORK_VERSION`.

For projects created from a version before 3.0.0: engineering agents moved to `.github/agents/dev/`, UX agents to `.github/agents/ux/` and renamed in kebab-case (prompts now reference the new names), skills to `.github/skills/dev/`, and ADRs live in `decisions/` as `ADR-NNNN-title.md`. Adjust any paths or agent names in your own prompts.

### 2. Fill in the project context

These are the files you **must update** before starting to work:

#### `AGENTS.md`
Complete all sections marked with `[...]`:
- `## What this project is` — product name and description
- `## Team` — names of the UX Lead and the dev
- `## Stack` — fonts, CSS framework, frontend framework
- `## Project visual principles` — page composition, visual voice, anti-patterns

#### `.github/copilot-instructions.md`
- Check that the "Framework Paths" table is correct

#### `README.md`
- Fill in the project overview and keep it short; framework documentation lives in `docs/`

#### Tokens
- Export the project's Figma Variables once in W3C DTCG format
- Upload the JSONs to `/tokens/`
- For later changes, use `/sync-tokens` on the affected target

### 3. Verify that the agents work

1. Open VS Code in the project folder
2. Go to the GitHub Copilot Chat panel
3. Select the **ui-architect** agent
4. Run `/session-start`
5. Verify that the agent responds with the right project context

---

## Framework philosophy

### Design and code speak the same language
Tokens are the shared vocabulary. A semantic token such as `color.interactive.primary` has the same name in Figma, in the JSONs, and in the generated CSS. There is no translation, no loss of information.

### Documentation lives where it is used
Specs are not in Notion or a shared Drive: they are in `/specs/`, next to the code. Decisions are in `/decisions/`. Reviews are in `/reviews/`. Everything a dev needs to implement a component is in the repo.

### Context is loaded, not remembered
Agents have no memory between sessions. That is why `AGENTS.md` and `/session-start` exist: every session starts with the agent receiving the full project context. We do not depend on "the agent remembering" — it is all written down.

### Primitives vs semantic: a single rule
Primitive tokens (`color.blue.500`) exist only to define the semantic ones. They are never used in components. This rule has no exceptions. It is what allows changing a brand color in one place and having the whole system update.

### Token JSONs are not edited by hand
Variables enter through the initial Figma export; afterwards, `/sync-tokens` updates only the deltas with a diff + human OK. Text Styles and Effect Styles are synced from Figma with the agent. Do not edit the JSONs directly: the flow is Figma → initial export or `/sync-tokens` → commit.

### A dev should not need to open Figma to implement
If the spec is well made, the dev has everything: HTML structure, tokens to use, component states, behavior, and accessibility. If the dev needs to open Figma, the spec is incomplete.

### Decisions are documented, not remembered
Every time a choice is made between two design options for a non-obvious reason, that reason goes to `/decisions/`. In six months, when someone asks "why is it like this", the answer is written down.

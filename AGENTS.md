# AGENTS.md

> Rules for the **UX / Design System** domain of the unified framework. They apply to the agents in `.github/agents/ux/`, to the UX flow prompts, and to design artifacts (`tokens/`, `specs/`, `prototypes/`, `research/`, `reviews/`, `decisions/`). Engineering rules live in `.github/copilot-instructions.md` and `.github/rules/`.

## What this project is
[PROJECT NAME] — [short description]

## Team
- UX/UI Lead: Sara Vera saraverasalguero
- Dev: Ariel Karlen arielpossumus
- Dev: Ricardo Povolo

## Decision ownership

Each domain has an owner who is consulted before moving forward. For agents: when facing a decision in a domain, defer to its owner.

| Domain | Owner |
|---------|-----------|
| Design system, tokens, and naming | [name] |
| Priorities and process | [name] |
| Frontend / implementation | [name] |
| Content and functional scope | [name] |

## Stack
- Tokens: W3C DTCG exported from Figma Variables
- Typography: [project fonts]
- CSS: [CSS framework] — pipeline via Style Dictionary (dev task)
- Frontend framework: [define with the team]
- Figma: visual source of truth — variables and styles synced to the tokens folder

## Language
- Responses and documentation: [English / other]
- Code and comments: [English / other]

## Repo structure
```
[repo-name]/
├── tokens/                        ← DS source of truth for dev
│   ├── primitives/
│   │   └── color.tokens.json      ← raw palette — NEVER use in components
│   ├── foundations/
│   │   ├── spacing.tokens.json    ← spacing scale
│   │   ├── typography.tokens.json ← families, sizes, weights, line-height and letter-spacing
│   │   ├── shadow.tokens.json     ← shadows (come from Effect Styles, not variables)
│   │   └── border.tokens.json     ← radius
│   └── semantic/
│       └── default.tokens.json    ← purpose-driven tokens; one file per mode (dark, etc.)
├── .github/
│   ├── copilot-instructions.md
│   ├── agents/
│   │   ├── ux/                    ← ui-architect, ux-researcher, prototype-reviewer
│   │   └── dev/                   ← engineering agents (orchestrator, backend, frontend, etc.)
│   ├── instructions/
│   │   ├── tokens.instructions.md
│   │   └── components.instructions.md
│   └── prompts/                   ← flow commands; see docs/ux/prompts-guide.md → «What to use and when»
├── research/                      ← findings, interview guides, insights
├── specs/                         ← component specs for dev handoff
├── prototypes/                    ← HTML from implement-html for testing and internal UX checks
├── decisions/                     ← ADRs (design and architecture): ADR-NNNN-title.md, template in .github/templates/adr.template.md
├── reviews/                       ← reviews: usability, a11y

```

**This section is the only source of paths.** Agents, prompts, and instructions read from here where each folder lives; the paths in the block are the defaults. If the project uses a different structure, change it only here.

### When adapting the framework to a project

- Fill in the sections marked with `[...]` and adjust the paths in "Repo structure" if they differ.
- Update the `applyTo` in the frontmatter of `.github/instructions/tokens.instructions.md` and `.github/instructions/components.instructions.md`: those patterns are fixed and do **not** read this file.

## Token architecture

Three layers, one folder per layer:

| Layer | What it contains | Do components use it? |
|------|---------------|--------------------------|
| `primitives/` | Raw values (palette) | Never |
| `foundations/` | Spacing, typography, shadows, radii | Yes |
| `semantic/` | Purpose-driven tokens; one file per mode, named after the mode in Figma | Yes |

**Mapping to Figma.** Figma has no folders: it has collections (with groups and modes). Each file has its origin:

| File | Figma collection or origin | Source |
|---------|----------------------------|--------|
| `primitives/color.tokens.json` | collection `primitives/color` | Variables |
| `foundations/spacing.tokens.json` | collection `foundations/spacing` | Variables |
| `foundations/border.tokens.json` | collection `foundations/border` | Variables |
| `foundations/typography.tokens.json` | collection `foundations/typography`, plus Text Styles | Variables (family, size, weight) and Text Styles (`lineHeight`, `letterSpacing`) |
| `foundations/shadow.tokens.json` | Effect Styles `shadow/*` | Effect Styles (not variables) |
| `semantic/<mode>.tokens.json` | collection `semantic`, one mode per file | Variables |

**Rule for new projects: 1:1.** Each Figma Variables collection maps to one repo file, except `semantic`: its modes map to its files. Names with `/` visually organize the collections in Figma without mixing their exports. Shadows have no variable collection: each `shadow/*` Effect Style maps to a token in `foundations/shadow.tokens.json`.

**Existing libraries.** They are not restructured by default. The agent first inventories the collections and proposes the Figma → repo mapping; it only migrates a collection or variables with explicit human approval. If an existing collection contains several groups, `/sync-tokens` can split them when writing to the repo.

**Typography classification.** Font families, sizes, and weights are `foundations/typography` by default. Text Styles are compositions of those variables and explicit metrics; they are also synced to `foundations/typography.tokens.json` by default. Only create typographic tokens or Text Styles in `semantic` when the project has documented that they change by mode or context. That exception is recorded in this file before syncing. A typography Figma collection with a single mode uses the `default` mode. If an existing library has them under `semantic/typography`, the agent flags the discrepancy and proposes the mapping to the repo; it does not move variables or assume a `dark` variation without evidence.

**Modes.** In `semantic/`, the file name is the mode name in Figma, in kebab-case (`default`, `dark`, etc.). A project with a single mode uses `default`. All modes have the same token keys; only the values change.

**Text Styles.** `fontFamily`, `fontSize`, and `fontWeight` are bound to variables; `lineHeight` and `letterSpacing` are explicit values inside the style (a numeric line-height variable may apply pixels). In the JSON they are stored with exactly the same value and unit as Figma (percentage, pixels, or unitless), not as aliases.

A `components/` layer is reserved for later.

## Token flow

**Initial setup — once:**
Export the variables from Figma (Export modes) → upload the JSONs to the tokens folder, split according to the token architecture → commit.

**When Figma changes:**
Modify variables, Text Styles, or Effect Styles in Figma → use /sync-tokens with the agent on the affected target →
the agent shows the diff → you approve → the agent updates the files → you commit.

**New Variables collection:** export it once from Figma and upload it to the destination file before the first sync. After that, `/sync-tokens` maintains its deltas without requiring repeated manual exports.

**Style Dictionary** (CSS pipeline) — configured by the dev when they start.
It is not part of the UX flow.

## Figma conventions

- Library file key: [key]
- Component names: [convention, e.g. kebab-case]
- Library icon names: [convention, if applicable]
- Variable and style scopes and descriptions: see the `/create-figma-tokens` prompt

## Active modules

List of optional capabilities this project uses (SEO, multi-language content, CMS, gated handoff, icon catalog). If there are none, leave "none".

- [module or "none"]

## Project visual principles

### Token system — how to read it
Tokens have three layers with distinct roles:
- **Primitives** → raw values (colors). They exist only to feed the other layers.
- **Foundations** → spacing, typography, shadows, and radii. Components use them directly.
- **Semantic** → describe purpose, not appearance. `color.interactive.primary` not `color.blue`.

Each token has a `$description` documenting when to use it and when not to.
**Read the $description before using any token** — the usage restrictions are there.

### Page composition
[Describe how pages are structured: container width, section rhythm,
background alternation, grid system. This is what defines the visual personality
beyond colors.]

Example to fill in:
- Sections alternate between [background A] and [background B] to create visual rhythm
- Content lives inside a [X px] container — never uncontrolled full-width
- Typography follows a hierarchy: [brand font] for headings, [functional font] for body

### Brand visual voice
[Describe the visual personality in terms the agent can apply.
Not "use blue" but "the system is technical but approachable — precision without coldness".]

### Anti-patterns — what this system does NOT do
[Document explicit decisions about what to avoid. This is as important as the right patterns.]

Examples of how to fill it in:
- ❌ Do not use [color X] in [context Y] — use [alternative]
- ❌ Do not use pure black (#000000) — use the system's near-black
- ❌ Do not hardcode values that should be tokens
- ❌ Do not create new components without checking whether a similar one exists

## Decision hierarchy for the agent

When there is ambiguity, the agent follows this order:

1. **If a value has no token** → report it as missing; do not hardcode it or invent a name
2. **If Figma and the token do not match** → report the discrepancy; do not assume which is correct. Wait for the UX decision
3. **If there is design ambiguity** → do not decide for the designer: mark it (`⚠️` / `🔴` / `❓`, see `ui-architect`) and list it under "Decisions that need design judgment". Ask in the moment only if the action is destructive or hard to revert. Design intent is never assumed
4. **If the component already exists** → use or extend it. Do not create a new one without checking
5. **If accessibility information is missing** → always flag it, even if not requested

## Branch conventions
- `ux/name` — research, specs, design documentation
- `ds/name` — design system changes
- `feat/name` — dev implementation
- `fix/name` — fixes

## Global rules
- A dev should not need to open Figma to implement a documented component
- Never use primitives in components — always semantic tokens
- Every new token is created first in Figma, then exported to the repo
- The JSONs in the tokens folder are updated only with `/sync-tokens` (diff + human OK, only what changed) — do not edit them by hand outside that flow
- Every important design decision is documented in `decisions/` (see "Repo structure") as an ADR (architecture decision record) using `.github/templates/adr.template.md`, named `ADR-NNNN-title.md`, describing the decision, its context, and its consequences

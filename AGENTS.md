# AGENTS.md

> Rules for the **UX / Design System** domain of the unified framework. They apply to the agents in `.github/agents/ux/`, to the UX flow prompts, and to design artifacts (`tokens/`, `specs/`, `prototypes/`, `research/`, `reviews/`, `decisions/`). Engineering rules live in `.github/copilot-instructions.md` and `.github/rules/`.

## What this project is
Isla DMS — A white-label digital document management platform where users can upload files, assign configurable metadata, and manage documents centrally.

## Team
- UX/UI Lead: Sara Vera saraverasalguero
- Dev: Ariel Karlen arielpossumus
- Dev: Ricardo Povolo

## Decision ownership

Each domain has an owner who is consulted before moving forward. For agents: when facing a decision in a domain, defer to its owner.

| Domain | Owner |
|---------|-----------|
| Design system, tokens, and naming | Sara Vera |
| Priorities and process | --- |
| Frontend / implementation | Ariel Karlen |
| Content and functional scope | --- |

## Stack
- Tokens: To be defined (custom system from HTML prototypes and specs)
- Typography: To be defined
- CSS: Tailwind CSS
- Frontend framework: React 18 + Vite
- Design source: HTML prototypes with specs and custom tokens (no Figma)

## Language
- Responses and documentation: English
- Code and comments: English

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

**To be defined.** Token system architecture (primitives, foundations, semantic layers) will be designed once HTML prototypes and initial specs are in place.

---

## Active modules

None yet. To be defined as the project evolves.

## Project visual principles

### Token system — how to read it
Tokens have three layers with distinct roles:
- **Primitives** → raw values (colors). They exist only to feed the other layers.
- **Foundations** → spacing, typography, shadows, and radii. Components use them directly.
- **Semantic** → describe purpose, not appearance. `color.interactive.primary` not `color.blue`.

Each token has a `$description` documenting when to use it and when not to.
**Read the $description before using any token** — the usage restrictions are there.

### Page composition

**To be defined in initial prototypes.** Layout structure (container widths, section rhythm, grid system, background patterns) will be established once design direction is set.

### Brand visual voice

**To be defined.** Visual personality and design principles will be established in the design direction phase. Focus: professional, clean, accessible, suitable for a white-label document management platform.

### Anti-patterns — what this system does NOT do

- ❌ Do not hardcode color, spacing, or typography values — use tokens from `tokens/`
- ❌ Do not create new components without checking if a similar one exists
- ❌ Do not implement beyond the handoff spec in `specs/` without design approval
- ❌ Do not skip accessibility checks — ARIA roles and semantic HTML are always required
- ❌ Do not use complex animations that distract from document management workflows

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

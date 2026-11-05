# UX Prompts Guide

## What to use and when

Prompts are invoked with `/name` in chat (or applied automatically from natural language). They live in `.github/prompts/`.

| Situation | Prompt | Agent |
|---|---|---|
| Start a session | `/session-start` | any |
| Create or complete tokens in Figma | `/create-figma-tokens` | ui-architect |
| Figma tokens changed | `/sync-tokens` | ui-architect |
| New Figma component | `/create-figma-component` | ui-architect |
| Audit tokens / consistency / design | `/audit-tokens`, `/audit-consistency`, `/audit-design` | ui-architect |
| Heuristic evaluation | `/heuristic-review` | prototype-reviewer |
| Handoff spec for dev | `/generate-spec` | ui-architect |
| HTML prototype | `/implement-html` | ui-architect |
| Prototype → Figma | `/audit-html-components`, `/sync-html-to-figma` | ui-architect |

Typical flow: `/session-start` → `/create-figma-tokens` → `/sync-tokens` → `/create-figma-component` → `/audit-design` → `/heuristic-review` → `/generate-spec` → `frontend-developer` implements from `specs/`.

The `ux-researcher` agent is used in conversation, without prompts.

For design system changes (tokens, Text Styles, shared components, naming), the `design-system` workflow defines the full sequence, including ADRs and the handoff to dev.

More detail: [HOW-DOES-IT-WORK.md](HOW-DOES-IT-WORK.md).

---
agent: "ui-architect"
description: "When: before handoff. Reviews a Figma design against tokens, components, and accessibility"
---

# Design audit — general pre-handoff review

## File and node to audit
- File key: `${input:figmaFileKey}`
- Node ID: `${input:nodeId}`
- Section: `${input:sectionName}`

## What to do

Full review before passing to dev. Three layers in order:

1. **Tokens** — read the tokens folder (see `AGENTS.md`) and verify that each value uses the right token
2. **Components** — verify that all instances come from the library, not local overrides
3. **Basic accessibility** — contrast, visual hierarchy, defined interactive states

## Report format per layer

### Layer 1 — Tokens
| Element | Value in Figma | Expected token | Status |
|----------|---------------|----------------|--------|

### Layer 2 — Components
| Component | Problem detected | Action |
|------------|-------------------|--------|

### Layer 3 — Accessibility
| Element | Issue | Severity |
|----------|-------|-----------|

## At the end

- Is it ready for handoff? Yes / No + reason
- Prioritized list of what to fix before passing the spec to dev

Prioritization:
- 🔴 Critical — blocks handoff
- 🟡 Important — resolve before handoff
- 🟢 Improvement — document as debt

---
agent: "ui-architect"
description: "When: you have an HTML prototype to bring to Figma. Inventories components and tokens and detects what is missing"
---

# Audit HTML → components and tokens

## Prototype to audit
- Path: `${input:htmlPath:prototypes/[flow-name]/v1/index.html}`
- Figma file key: `${input:figmaFileKey}`
- Section or screen: `${input:sectionName}`

## What to do

This prompt only reads and reports — it does not touch Figma and creates nothing.
The generated report is the input for `/create-figma-component` and `/sync-html-to-figma`.

If any data above is missing, ask for it before starting.

---

### 1. Read the prototype

Read the `index.html` and the CSS embedded in `<style>`. If a `README.md` exists in the same version folder, read it too — it has context about what changed from previous versions.

Inventory:
- DOM structure and container nesting
- Each distinguishable visual block (cards, badges, pills, buttons, inputs, tables, grids, navs, heroes, etc.)
- Texts: font-family, size, weight, line-height, color — distinguish whether they use `var()` or a literal value
- Referenced icons (class, src, or inline SVG)
- Hover/focus/active/disabled states defined in the CSS
- Layout properties: `display: flex`, `display: grid` and their values (gap, padding, justify, align, columns)
- CSS variables declared in `:root`

Zero omissions. If an element repeats (e.g. a card in a grid), record it once with a note of how many instances there are.

### 2. Cross-check against the Figma library

For each visual block identified, look it up in the library with `search_design_system`.

Determine:
- Does a published component exist that covers it exactly? → **reuse**
- Does something similar but not identical exist? → note it as a candidate to extend, do not create from scratch
- Does nothing similar exist? → **build new**, go to List 2

### 3. Cross-check against tokens

Read all the `.tokens.json` files in the tokens folder (see `AGENTS.md`), in their three layers:
- `primitives/`
- `foundations/` (spacing, typography, shadows, radii)
- `semantic/` (one file per mode)

For each CSS value in the prototype (color, spacing, radius, shadow, border, typography):
- If it uses `var(--name)` → check whether that variable has a semantic equivalent in the system's tokens
- If it is a literal value → check whether a token with that exact value exists

---

## Report format

### List 1 — Components that exist in the library

| Element in HTML | Component in Figma | Observation |
|-----------------|---------------------|-------------|

> "Observation" for cases where the component exists but there are minor differences to take into account in `/sync-html-to-figma`.

### List 2 — New components to build

| Element in HTML | Functional description | States detected in CSS | Planned variants | Has internal grid/flex |
|-----------------|----------------------|--------------------------|---------------------|------------------------|

> "Planned variants" based on what is in the CSS (e.g. classes `.btn--primary`, `.btn--ghost`).  
> "Has internal grid/flex" helps plan the Auto Layout in `/create-figma-component`.

### List 3 — Missing tokens (var without an equivalent in the system)

| CSS variable in the prototype | Value | Suggested token | File where it should live |
|-----------------------------|-------|----------------|-----------------------------|

### List 4 — Hardcoded values without a token

| CSS property | Value | Suggested category | Recommended action |
|--------------|-------|-------------------|--------------------|

Categories: `color` / `spacing` / `radius` / `shadow` / `border` / `typography`.

---

## Report closing

Summarize:
- Total elements audited
- Components that exist in the library vs new components to build
- Missing tokens vs hardcoded values without an equivalent

**Suggested next step:**
- If there are new components → run `/create-figma-component` for each one before continuing
- If all components exist → go straight to `/sync-html-to-figma`
- If there are missing tokens → create them in Figma before `/sync-html-to-figma` so variables can be bound

Do not execute any following step. The person decides what to run and in what order.

---

### List 5 — Fidelity to the original design (HTML vs Figma)

Visually compare the HTML against the Figma frame from the input. Record differences that affect visual communication or consistency with the DS.

| Element | Current HTML | Original Figma | Difference | Severity |
|----------|-------------|----------------|------------|-----------|

Severity:
- 🔴 Critical — breaks the brand's visual communication
- 🟡 Important — resolve before approving the implementation
- 🟢 Improvement — nice to have

> If the differences imply changes to the spec, state them: which section of the specs folder (see `AGENTS.md`) should be updated and why.

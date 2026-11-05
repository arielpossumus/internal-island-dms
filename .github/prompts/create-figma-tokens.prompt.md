---
agent: "ui-architect"
description: "When: you are creating a new system or reviewing Figma variables and styles. Analysis or apply mode"
---

# Create or complete variables and styles in Figma

## File and mode
- File key: `${input:figmaFileKey}`
- Mode: `${input:mode:analysis}` — `analysis` (read-only) or `apply` (writes to Figma, only after the table is approved)

## When to use it
- New project without variables or a library in Figma.
- File with incomplete variables or styles: no scope or description, Text Styles with unbound properties, modes with different keys.

## Analysis mode (default)

Writes nothing to Figma.

1. Read the variable collections, groups, and modes, the Text Styles, and the Effect Styles of the file via Figma MCP, and the tokens folder (see `AGENTS.md`). Classify the file before proposing changes:
   - **New project:** there is no variable or style system to preserve.
   - **Existing system:** there are already collections, variables, or styles. Inventory its structure first; do not create collections, do not duplicate variables, and do not move anything yet.
2. Detect what is missing or wrong:
   - variables with `ALL_SCOPES` or without a description;
   - Text Styles with `fontFamily`, `fontSize`, or `fontWeight` not bound to variables;
   - Text Styles or Effect Styles without a description;
   - `semantic` modes with different keys;
   - names that do not follow the project convention (`AGENTS.md` → «Figma conventions»).
   - families, sizes, weights, or Text Styles under `semantic/typography`: mark as ⚠️ architecture discrepancy and propose the mapping to `foundations/typography` in the repo. Do not ask whether they should belong to `default` or `dark`, and do not move them, unless Figma or `AGENTS.md` document that they change by mode or context.
3. If it is a new project, propose the 1:1 structure from `AGENTS.md` → «Token architecture»: collections `primitives/color`, `foundations/spacing`, `foundations/typography`, `foundations/border`, and `semantic` (mode `default`), with their initial variables. Create the Text Styles of the type scale and the `shadow/*` Effect Styles if any.

   If it is an existing system, first propose this mapping, without imposing collection names or creating duplicates:

| Existing Figma collection/group/style | Destination file in the repo | Proposed action | Notes |
|-------------------------------------------|---------------------------|------------------|-------|
| | `primitives/`, `foundations/` or `semantic/` | map / split on sync / needs decision | |

   The repo architecture is stable; the existing Figma organization is preserved. An existing collection may contain several groups: `/sync-tokens` splits them into the repo files without creating new collections, unless a human decides to migrate.
4. Deliver **a single table per batch**:

| Element | Type | Action | Scope | Proposed description (draft) | Notes |
|----------|------|--------|-----------------|----------------------------------|-------|
| | variable / Text Style / Effect Style | create / fix | | | ❓ if there is something to decide |

5. Close with **«Decisions that need design judgment»**: everything marked with ⚠️, 🔴, or ❓, and wait for the human's answer.

An explicit approval of the table (for example, `OK apply batch`) authorizes **all** approved rows. Do not ask for one confirmation per collection, variable, or style. Ask again only if an action outside the approved table appears, or a conflict or a decision marked ⚠️, 🔴, or ❓.

## Apply mode

Only if the human approved or corrected the table in this conversation.

1. Apply exactly the approved batch, with `figma/use_figma`. Do not add, delete, move, or overwrite anything that is not in the approved table. Do not pause to ask for intermediate validations.
2. Verify the result and report what was applied and what remains pending, without asking for another OK just for the verification.
3. If a new Variables collection was created, export it once from Figma and upload it to the repo's destination file. After that use `/sync-tokens` to maintain the deltas and sync Text Styles and Effect Styles.

## Rules

**Scope (variables):** never leave `ALL_SCOPES`. For a new variable or one without scope, propose the scope by type. For an existing variable, show its current scope and do not propose changing it unless it is `ALL_SCOPES` or contradicts the type.

| Variable type | Suggested scope |
|---|---|
| Background color | `FRAME_FILL`, `SHAPE_FILL` |
| Text color | `TEXT_FILL` |
| Border color | `STROKE_COLOR` |
| Spacing | `GAP`, `WIDTH_HEIGHT` |
| Radius | `CORNER_RADIUS` |
| Font family, size, weight | `FONT_FAMILY`, `FONT_SIZE`, `FONT_WEIGHT` |
| Primitives | No application scope (not used directly in components) |

**Description:** write it from the semantic context (name, resolved value, where it is used in the system or in specs) and present it as a draft in the table. Do not invent usage restrictions that are not backed by the design or by `AGENTS.md`; if you do not know when it must NOT be used, mark ❓. Format: when to use it and when not to.

**Text Styles:** bind family, size, and weight to variables; keep `lineHeight` and `letterSpacing` as explicit values. See `AGENTS.md` → «Text Styles» for the JSON format.

**Modes (`semantic` collection):** each mode is a file in `semantic/` with the same name as the mode in Figma, in kebab-case. All modes must have the same token keys; only the values change. If a key is missing in any mode, report it before syncing. Base typography and its Text Styles live in `foundations/typography` by default; they move to semantic only with a documented exception of variation by mode or context.

## Do not
- Write to Figma in analysis mode.
- Leave variables with all scopes or without a description.
- Invent tokens or usage restrictions that are not in the design.
- Bind `lineHeight` or `letterSpacing` to variables.

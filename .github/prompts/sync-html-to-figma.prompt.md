---
agent: "ui-architect"
description: "When: a validated HTML prototype must be reflected in Figma. Rebuilds the section with real components"
---

# Sync HTML → Figma

You rebuild in Figma the section of `${input:htmlPath}` (${input:sectionName}), on page `${input:figmaPageName}` of file `${input:figmaFileKey}`, at `${input:breakpoint:1440 desktop}`. It is not new design: it is a faithful translation of what already exists, with real variables bound.

If any data is missing, ask for it before starting — do not assume or substitute a different file or section than the one indicated.

## Audit input (optional)

If you already ran `/audit-html-components` for this section, paste the report in the chat or indicate the path. The agent uses it to skip the inventory and library search steps — it goes straight to construction.

If there is no previous report, the agent does the inventory and the search inline.

> ⚠️ If the report lists new components in List 2 that **have not yet been built** with `/create-figma-component`, resolve them before continuing — or build them flat now and mark them as `🟡 Pending construction` in the output.

## Do not
- **Do not delete anything — frames, layers, components, or pages — under any circumstances.** If the indicated frame already exists, duplicate it and work on the copy (`[name] copy` or `[name] - sync [date]`), never on the original. Deleting is the person's decision, never the agent's.
- Do not modify existing tokens, styles, or components.
- Do not invent a token for a value without a match — report it.
- Do not touch frames outside the indicated one.
- Do not omit fills, colors, or borders for lacking a published component — "no component" never means "no style".

## Steps

1. **Inventory.** If there is an audit report → use its inventory as the base; do not re-inventory from scratch. If there is no report → list all visible elements of the HTML: structure, repeated components, texts, icons, hover states if they are in the CSS. Zero omissions.

2. **Cross-check against tokens.** If there is an audit report → the missing tokens (List 3) and hardcoded values (List 4) are already identified; use them directly. If there is no report → for each color/typography/spacing/radius/shadow/**border** in the CSS: look it up in the JSONs of the tokens folder (see `AGENTS.md`). In both cases: if it matches → bind the variable; if not → apply the value as is and add it to "values without token" in the report.

3. **Review the library before building.** If there is an audit report → use List 1 to know which instances to use and List 2 to know what to build flat. If there is no report → look up each element in the library with `search_design_system`. In both cases: existing published component → use an instance. It does not exist → build it flat with the same fill, color, radius, and stroke as the HTML — flat means "not an instance", not "without style". Add it to "missing components".

4. **Map layout:**

   **Flexbox:**
   - `flex-direction` row/column → horizontal/vertical
   - `gap` → item spacing
   - `padding` → Auto Layout padding
   - `justify-content` / `align-items` → alignment
   - `flex-wrap: wrap` → wrap

   **Grid** (`display: grid`):
   - Do not flatten a grid into a single column. Rebuild it as rows of horizontal Auto Layout, each with as many cells as `grid-template-columns` — the same number of columns as the original.
   - Borders between cells (`border`, `border-collapse`) → stroke on each cell, cross-checked against the border token.

   **Mandatory Auto Layout rule:**
   - Every HTML container with `display: flex` or `display: grid` is created as a frame with Auto Layout. Preserve the DOM nesting.
   - Do not create a flow frame without Auto Layout.
   - `position: absolute` is an exception for the specific element, not an alternative to the container's Auto Layout. Document the cause as `⚠️ Auto Layout exception`; if there is no verifiable cause, do not use it.

5. **Name layers.** `Section/Element` (e.g. `Hero/Heading`). No default names.

6. **Text.** Apply published Text Styles — no text with manual size/line-height if one matches. If no Text Style matches, use the literal font-family from the CSS, never Figma's default (Inter) — and add it to the report as "without Text Style". Resize: Auto width for short labels/badges, Auto height for text blocks. Never Fixed size — it truncates or overlaps content.

## Verification

Before reporting, compare the finished frame against the HTML element by element: are all the columns/rows there? the fills of each badge or pill? the grid borders? does each flex/grid container have Auto Layout? If something is missing, fix it now — do not leave it for the report.

## Output

Short summary in the chat (no new file):
- ✅ Frame created — name and location
- ⚠️ Values without token
- ⚠️ Components missing from the library
- ⚠️ Texts without a published Text Style
- ⚠️ Auto Layout / Grid exceptions

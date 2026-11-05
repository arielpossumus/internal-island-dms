---
agent: "ui-architect"
description: "When: you want to validate a design with a prototype. Generates an HTML prototype from a spec, an image, or a direct request"
---

# Implement section in HTML

## Source to implement
`${input:source:path to the spec, image, or description}`

The spec is optional. The source can be a spec, an image or visual reference, or a direct request. Never block generation for lack of a spec.

## Flow
`${input:flowName:flow-name}`

## Rules

### CSS variables from tokens
```css
:root {
  /* Generate variables from the tokens before implementing */
}
```

### What to use
- CSS variables for all values
- Project fonts with fallbacks
- Flexbox or Grid — no external frameworks

### What NOT to do
- Do not hardcode values without a token
- Do not invent styles, states, or behavior that the source does not define

### Responsive and undefined values
- Implement only what the source defines. If it does not define responsive, build the single indicated format, without inventing mobile or other breakpoints.
- Mark in the report what is undefined (`⚠️ Responsive not defined`, missing states, values without a token) and continue; do not ask or stop.
- If the person asks for mobile or another breakpoint, do it.
- An image without equivalent tokens is translated with the closest project tokens; if there is no match, use the visible value and report it as debt.

### Minimum accessibility
- Semantic roles (nav, main, section, article)
- Alt text on images
- Visible focus

## Before generating

Resolve the version without asking if the path is unambiguous:

1. Check `[prototypes folder]/${input:flowName}`.
   - If it does not exist, create `v1`.
   - If `v[N]` versions exist, identify the highest and create the next one (`v[N+1]`).
2. If it is an iteration, read the previous version's `README.md` and the `CHANGELOG.md` to understand what changed and why. Adjustments to an existing HTML are recorded as a new version with its changelog.
3. Ask only if you cannot identify the flow, there is more than one plausible path, or the person asks for a specific version.

## Output

Single HTML file with CSS embedded in `<style>`.
Save to `[prototypes folder]/[flow-name]/v[N]/index.html` (prototypes folder according to `AGENTS.md`, default `prototypes/`)

Also create `[prototypes folder]/[flow-name]/v[N]/README.md` with the convention's template.

From v2, create or update `[prototypes folder]/[flow-name]/CHANGELOG.md` with the changes inferred from the source, the request, and the previous version. If the reason cannot be inferred, leave it as `⚠️ pending documentation`, without stopping generation.

## When finished, report
- Version generated and full path
- Tokens used
- Hardcoded values (technical debt)
- What could not be implemented faithfully and why
- If it is an iteration: confirm that the CHANGELOG was updated

## Reverse flow (optional)

If the generated prototype is going to be synced with Figma, the output of this prompt is the input for `/audit-html-components`.

Pass as input:
- Path of the generated `index.html`
- The project's Figma file key
- Section name

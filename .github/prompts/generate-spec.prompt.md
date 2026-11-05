---
agent: "ui-architect"
description: "When: a design is ready to pass to dev. Generates the handoff spec from a Figma node"
---

# Generate handoff spec

## File and node
- File key: `${input:figmaFileKey}`
- Node ID: `${input:nodeId}`
- Section: `${input:sectionName}`

## What to do

1. Read the tokens in the tokens folder (see `AGENTS.md`)
2. Check whether the spec already exists at the destination path. If it exists: **STOP** — show a summary of what would change and wait for an explicit "yes" before writing
3. Read the node in Figma via MCP
   - Capture token **names**, not resolved values: use the fully prefixed CSS vars from the design context (for example `--color/text/primary`) and the Text Style by its name (it appears in that context). For what does not appear in the code (SVG icon color, gradients) use `get_variable_defs`. Do not derive the token from the hex.
   - Library icons: use the instance name in Figma as is (convention in `AGENTS.md` → «Figma conventions»). If the name is generic, do not guess it from how it looks: mark `⚠️ pending confirmation`.
   - Absolute positions, non-tokenizable values, and everything not defined: follow what is stated in `ui-architect` («When something is not defined»).
4. Generate the complete spec

## Spec structure

Use `.github/templates/ux-spec.template.md` as the base structure.
### Header
- `Status:` one of these values (do not use others, such as `Draft` or `In progress`):
  - `✅ Ready for Dev` — all four conditions are met: (1) every applied token has its full path, (2) the ⚠️ and 🔴 are listed explicitly, not silenced, (3) the documented states match the Figma variants, (4) no ❓ remains unresolved. Dev can implement without opening a new design decision.
  - `🟡 Pending UX` — a design or a UX decision is missing. List what is missing and who resolves it.
  - `⚠️ With debt` — it can be implemented, but there is debt explicitly documented in the spec (for example a missing token) and accepted by the human.
- `Figma:` full link `https://www.figma.com/design/<fileKey>/?node-id=<nodeId with hyphen>` · `Node <nodeId>`
- `Date:` generation date
- If the spec is for a library component: **component properties** table (Text / Instance-swap / Boolean / Variants)

### Anatomy
Elements and visual hierarchy.

### Applied tokens
- Color: `token.path` → resolved value
- Typography: style → family, size, weight, line-height
- Spacing: `token.path` → value in px
- Border radius: `token.path` → value
- Shadow: Effect Style by name (shadows are not variables)

### States
For each interactive element: what changes in each state and with which token.

### Responsive
What changes between mobile and desktop. Relevant breakpoints.

### Implementation notes
Non-obvious behaviors, animations, accessibility.

### Missing tokens
Values in Figma without an equivalent token, including non-tokenizable ones (see `tokens.instructions`).

### Decisions that need design judgment
List of all the ⚠️, 🔴, and ❓ in the spec, so the designer can resolve them.

## Where to save
Specs folder according to `AGENTS.md` (default `specs/[section-name].spec.md`)

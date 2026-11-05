---
applyTo: "tokens/**,**/*.css,**/*.scss,**/*.tsx,apps/**/components/**,apps/**/ui/**"
---

# Token rules

## Token files

Tokens live in the tokens folder (see `AGENTS.md` → «Repo structure») and are organized according to `AGENTS.md` → «Token architecture»: `primitives/`, `foundations/`, and `semantic/`.

## Main rule

❌ Primitives in components: raw color values
✅ `semantic/` and `foundations/` tokens in components: aliases with a purpose name and foundation values (spacing, typography, shadows, radii)

## General rules

- NEVER hardcode color, spacing, or typography values
- NEVER use primitives directly in components
- ALWAYS verify that the token exists in the tokens folder before using it
- If the token does not exist → report it as a missing token; do not invent it

## Typography: `lineHeight` and `letterSpacing`

In Figma they are explicit inside the Text Style (a numeric line-height variable may apply pixels). In the JSONs, typography tokens (`foundations/typography`) carry both as an **explicit value with the same unit as Figma** (percentage, pixels, or unitless), not as an alias to a primitive. Family, size, and weight of the Text Style are bound to variables. It is not a missing token.

Families, sizes, weights, and Text Styles live in `foundations/typography` by default. They are only recorded in `semantic/<mode>` when the project documents that they vary by mode or context.

## JSON format and metadata

The repo uses a canonical format so diffs are readable and Figma stays traceable:

- 2-space indentation.
- One property per line.
- Property order: `$type`, `$value`, `$description`, `$extensions`.
- `$extensions` can keep Figma metadata if it comes in the export. It is not required by dev nor used to transform values; scopes are used for auditing when available.
- When syncing Variables, preserve `$type`, `$value`, `$description`, and the existing metadata from the Figma export. The agent may split groups into files, but must not reinterpret `number` as `dimension`, add units, or remove metadata.

The first format normalization is shown as a separate diff and requires a human OK. In later syncs, update only the changed tokens: do not reformat the whole file for aesthetics or clean up metadata.

## Non-tokenizable values

Some properties cannot be Figma variables. They are not missing tokens: they are documented decisions. Detect them, document the real value and the reason, and leave the CSS workaround. Never omit them or flatten them to a solid value.

| Property | Why it is not tokenized | CSS workaround |
|---|---|---|
| Gradient border | Figma Variables does not support gradients on borders | `::before` with `-webkit-mask` and `background: linear-gradient(...)` |
| Animated border rotation | Figma has no motion tokens | `@keyframes` with `transform: rotate()` on the pseudo-element |
| Backdrop filter (blur) | It is neither a shadow nor a variable | `backdrop-filter` on the component |

## $value format in Figma JSONs

JSONs exported from Figma use `$value` as an object for colors:
```json
"$value": { "colorSpace": "srgb", "components": [...], "hex": "#XXXXXX" }
```
Style Dictionary v4+ understands it natively.
The `hex` field is the value used in CSS.

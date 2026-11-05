# UX Handoff Spec Template

> Used by `/generate-spec` (ui-architect). Save as `specs/[section-name].spec.md`. Use token **names**, never resolved values. Never overwrite an existing spec without explicit confirmation.

## Header

- **Status:** `✅ Ready for Dev` | `🟡 Pending UX` | `⚠️ With debt`
- **Figma:** `https://www.figma.com/design/<fileKey>/?node-id=<nodeId with hyphen>` · `Node <nodeId>`
- **Date:** [YYYY-MM-DD]

Status criteria:

- `✅ Ready for Dev`: every applied token has its full path, the ⚠️ and 🔴 are listed explicitly, the documented states match the Figma variants, and no ❓ remains unresolved.
- `🟡 Pending UX`: a design or a UX decision is missing; list what is missing and who resolves it.
- `⚠️ With debt`: it can be implemented, but there is debt documented in the spec and accepted by the human.

---

## Component Properties

> Only for library components.

| Property | Type (Text / Instance-swap / Boolean / Variant) | Values |
|---|---|---|
| [property] | [type] | [values] |

---

## Anatomy

[Elements and visual hierarchy.]

---

## Applied Tokens

| Aspect | Token | Resolved value |
|---|---|---|
| Color | `token.path` | [value] |
| Typography | [Text Style] | [family, size, weight, line-height] |
| Spacing | `token.path` | [px] |
| Border radius | `token.path` | [value] |
| Shadow | [Effect Style name] | Shadows are not variables |

---

## States

| Element | State | What changes | Token |
|---|---|---|---|
| [element] | default / hover / focus / disabled / error | [change] | `token.path` |

---

## Responsive

[What changes between mobile and desktop. Relevant breakpoints. Mark `⚠️ Not specified` if there are no mobile frames.]

---

## Implementation Notes

- [Non-obvious behavior]
- [Animations]
- [Accessibility: role, aria, keyboard behavior, focus]

---

## Missing Tokens

> Values in Figma without an equivalent token, including non-tokenizable values (gradient borders, animated rotation, backdrop filters): real value, reason, and CSS workaround.

| Value | Where | Reason | Workaround |
|---|---|---|---|
| [value] | [element] | [reason] | [CSS] |

---

## Decisions That Need Design Judgment

> List of every ⚠️, 🔴, and ❓ in this spec, for the designer to resolve.

- ⚠️ [Not specified]
- 🔴 [Critical gap]
- ❓ [Ambiguous: interpretation A / interpretation B]

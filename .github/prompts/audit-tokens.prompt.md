---
agent: "ui-architect"
description: "When: you want to check whether a Figma node uses tokens, Text Styles, and Effect Styles correctly"
---

# Token audit — Figma vs system

## File and node to audit
- File key: `${input:figmaFileKey}`
- Node ID: `${input:nodeId}`
- Section: `${input:sectionName}`

## What to do

1. Read the tokens in the tokens folder (see `AGENTS.md`)
2. Read the node in Figma via MCP
3. Compare each visual value against the tokens

## Report format

| Element | Value in Figma | Expected token | Status |
|----------|---------------|----------------|--------|

Statuses:
- ✅ Correct — matches the token
- ⚠️ Does not match — exists but does not use the token
- ❌ No token — no equivalent in the system

## Specific validations

**Text Styles:**
- ✅ The TEXT node has a `textStyleId` applied.
- ❌ The TEXT node has loose `fontSize`, `fontFamily`, or `lineHeight` without a Text Style.
- Explicit `lineHeight` and `letterSpacing` inside the Text Style are correct (Figma limitation): do not report them as an untokenized value.
- ❌ The Text Style has `fontFamily`, `fontSize`, or `fontWeight` not bound to a variable.
- ⚠️ The style's description contradicts its values or repeats numeric values that may become outdated.

**Effect Styles:**
- ✅ The node has an `effectStyleId` applied.
- ❌ The node has loose shadows without a linked Effect Style.

**System variables and styles:**
- ❌ Variable with `ALL_SCOPES` → propose the scope by type (see `/create-figma-tokens`).
- ⚠️ Variable or style without `description` → list it to complete with human validation.

**Layers:**
- ❌ A component uses a token from `primitives/` → it must use `semantic/` or `foundations/`.
- ❌ A `semantic/` mode does not have the same keys as the others.

## At the end

- Missing tokens → suggested name, value, file where it lives
- Missing Text Styles or Effect Styles → suggested name according to the system's naming
- Hardcoded values to replace with tokens
- Decisions to document in the decisions folder (see `AGENTS.md`)

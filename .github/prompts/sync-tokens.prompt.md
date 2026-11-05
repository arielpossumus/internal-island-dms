---
agent: "ui-architect"
description: "When: tokens changed in Figma. Syncs only the indicated collection or mode, with your OK"
---

# Sync tokens — Figma vs repo

## Figma file
- File key: `${input:figmaFileKey}`
- Target: `${input:target:collection, mode or all}` — for example `foundations/spacing`, `foundations/typography`, `foundations/shadow`, `semantic/default` or `all`.

## First time and later changes

- **First time:** when a new Variables collection is created, UX exports that collection from Figma and uploads the JSON to the repo's destination file. That export fixes the file's initial structure.
- **Delta:** with an already existing destination file, `/sync-tokens` reads the target in Figma and updates only the tokens, Text Styles, or Effect Styles that changed. It does not require a manual export for every change.
- If the Variables target has no destination file yet, do not build the JSON from scratch: ask for the initial export of that collection.

## What to do

1. Determine the target. If it was not indicated, infer it from the person's request; ask once if it is still ambiguous. **Never use `all` by default.**
2. Read only the source and the destination file of the target according to `AGENTS.md` → «Token architecture».
	- `all` reads every applicable source.
	- In an existing library, use the approved mapping; do not restructure Figma.
	- Typography includes its Text Styles; shadow includes Effect Styles.
3. If the target is `semantic/<mode>` or `all`, compare the keys of the indicated mode with the other semantic modes. For any other target, do not read other modes.
4. Report differences only for the target.

## Fidelity contract for Variables

When splitting groups into files, keep each token without reinterpreting it.

- Preserve `$type`, `$value`, `$description`, and any existing `$extensions`.
- Do not change types, values, units, or metadata.
- Scopes are used for auditing when available; they are not required for dev to use the token.
- If Figma does not expose metadata for a new token, do not invent it.
- For a new token in an existing file, follow the export structure already present in that file.

## Report format

Show only changes or problems that require action. Do not list matching tokens, confirmed scopes, `codeSyntax`, or unchanged metadata.

**New variables in Figma** (do not exist in the JSONs):
- name → value → file where to add it

**Variables whose value changed**:
- name → previous value → new value

**Variables removed from Figma** (still in the JSONs):
- name → file where they are

**Figma Text Styles and Effect Styles missing from the JSON:**
- name → file where to add it → properties/bindings to incorporate

**If there are no differences:** state `No differences in <target>` and do not add empty sections.

## Attention (only if applicable)

- scope changed or not verifiable;
- metadata needed to sync not available;
- normalization requested.

Do not report as removed the values that the JSON defines and Figma does not express as a variable (for example explicit `lineHeight` and `letterSpacing`): they are not touched.

When incorporating a Text Style, preserve exactly the value and unit defined in Figma for `lineHeight` and `letterSpacing` (percentage, pixels, or unitless). Never convert units or derive an alternative value. For Variables scopes, Figma is the source of truth: if the JSON differs, propose Figma's scope in the diff.

## Important

- Show the diff before modifying files.
- `OK apply batch` authorizes all the changes included in that diff, including new files and folders.
- Apply the batch and verify only the modified files. Do not ask for another OK.
- Ask for a new confirmation only if a change outside the approved diff appears.
- Normalize format only if the person asks or it is an initial import; always as a separate diff.

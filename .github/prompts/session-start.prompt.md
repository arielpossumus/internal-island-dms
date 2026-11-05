---
description: "When: at the start of every session. Loads the project context from AGENTS.md"
---

# Session start

## Step 1 — Read AGENTS.md

Read `AGENTS.md`. From that file extract and confirm:
- Project name and stack
- Repo folder structure
- **Figma file key** — keep it in context; it is used in every following step with Figma tools (`search_design_system`, `use_figma`, etc.)
- The project's global rules
- **`applyTo` of the instructions:** verify that the patterns in `.github/instructions/tokens.instructions.md` and `.github/instructions/components.instructions.md` match the paths in "Repo structure". If they do not match, warn and propose the adjustment; do not edit it without an OK.

If `AGENTS.md` does not exist, ask before continuing. Do not assume a structure.

> ⚠️ **If the Figma file key is not documented in `AGENTS.md`**, warn explicitly:
> ```
> I could not find the Figma file key in AGENTS.md.
> To get it: open the file in Figma → copy the URL → the key is the string between /design/ and the file name.
> Example: figma.com/design/ABC123xyz/name → key = ABC123xyz
> Paste it here before continuing.
> ```
> Do not proceed without the file key — every Figma operation requires it.

## Step 2 — Read tokens

Try to read all the `.tokens.json` files in the tokens folder (see `AGENTS.md`), organized in three layers:
- `primitives/`
- `foundations/`
- `semantic/` (one file per mode)

**If the files exist** → read them and confirm:
- How many files you found
- The main color rules (semantic)
- The documented interactive components, if any

**If the files do not exist or are empty** → it is a new project without exported tokens. Report:
```
⚠️ Tokens not found — new project or tokens pending export from Figma.

Options:
A) Create the token system from scratch in Figma with /create-figma-tokens → export the Variables collections once to the repo → then sync with /sync-tokens
B) They already exist in Figma but were not exported → export them once to the repo before using /sync-tokens

Which is the case?
```
Wait for the answer before continuing.

## Step 3 — Confirm loaded context

Before any task, confirm in the chat:
- Project: [name]
- Figma file key: [key] ← this value is reused throughout the session
- Tokens loaded: [N files / not found]
- `applyTo` of the instructions: [matches / needs adjustment]
- Key project rules

Do nothing else until confirmed.

After confirming, ask what the person wants to do and suggest the matching prompt (see `docs/ux/prompts-guide.md` → «What to use and when»).

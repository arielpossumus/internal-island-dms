# Framework Changelog

History of framework changes, not of the projects that use it. Semantic versioning: **major** breaks the adaptation of existing projects, **minor** adds capabilities, **patch** fixes texts or errors. Each entry states the origin of the change and its evidence.

The current version is in `FRAMEWORK_VERSION` and must match the first entry of this file (validated by `scripts/validate-framework.mjs`). Up to 2.8.0 the history belongs to the original UX framework; from 3.0.0 it is the history of the unified framework (Dev + UX).

## 3.0.0 — 2026-11-04

Origin: integration of the UX framework into the engineering agents framework as a single template. Major change: it moves files and renames agents.

- **Structure:** agents in `.github/agents/dev/` and `.github/agents/ux/`; skills in `.github/skills/dev/` and `.github/skills/ux/`; UX artifacts (`tokens/`, `specs/`, `prototypes/`, `research/`, `reviews/`, `decisions/`), `AGENTS.md`, and `docs/ux/` in the same repo; `apps/` for application code.
- **UX agents:** `ui-architect`, `ux-researcher`, and `prototype-reviewer` (kebab-case) with `agents:` and `handoffs:` toward the development agents. Prompts point to the new names.
- **Language:** UX agents, prompts, instructions, `AGENTS.md`, `docs/ux/`, and the design system backlog translated to English; markers and titles unified.
- **Orchestration:** "Framework Paths" table in `copilot-instructions.md`, UX routing, UX → Dev handoff, a design stage in `feature-development`, and the new `design-system` workflow.
- **Responsibility boundaries:** QA / Test Automation and Tech Lead / Software Architect, with tie-break rules in the orchestrator.
- **ADR:** single location `decisions/` (`ADR-NNNN-title.md`) with `adr.template.md`.
- **Project templates:** `project_context.md` and `tech_stack.md` with placeholders; the logistics example moved to `.github/examples/`.
- **UX templates:** `ux-spec.template.md` and `ux-review.template.md`.
- **Fixes:** `architecture-analysis.skill.md` was empty; `api-design.template.md` was truncated; unclosed code fences and leftover wrapper headers repaired in agents, skills, examples, and templates.
- **Documentation:** short README (template for the project's README) and guides in `docs/` (`framework-guide.md`, `usage-guide.md`, `ux/prompts-guide.md`).
- **Validation:** `scripts/validate-framework.mjs` and the GitHub Actions workflow `validate-framework.yml` verify frontmatter, references between agents, paths, file names, version, and unclosed code fences.

For existing projects: see the update section in `docs/ux/HOW-DOES-IT-WORK.md`. Agent paths, agent names in your own prompts, and the ADR location must be adjusted.

## 2.8.0 — 2026-10-28

Origin: some projects do not generate specs and start from an image or a direct request.

- **Optional spec in `/implement-html`:** it accepts a spec, an image, or a description and is never blocked by the lack of a spec.
- **Responsive without inventing:** it implements only what the source defines; anything undefined is marked `⚠️ Responsive not defined` and work continues.
- **Iterations:** adjustments to an existing HTML are recorded as a new version with a changelog.

## 2.7.0 — 2026-10-26

Origin: definition of the final flow for a living design system without manually exporting every change.

- **Variables bootstrap:** UX exports each collection once to create the repo's initial JSON.
- **Agent deltas:** `/sync-tokens` then updates only the existing target and syncs Text Styles and Effect Styles from Figma with a diff + human OK.
- **New collections:** they require an initial export; the agent does not rebuild a Variables file from scratch.
- **Prompt ergonomics:** the Figma → repo mapping lives only in `AGENTS.md`; `/sync-tokens` shows only actionable differences and the prompts keep the technical guidance needed to operate Figma.

## 2.6.9 — 2026-10-26

Origin: the test run revealed repeated confirmations when creating collections and syncing files.

- **Batch approval:** an approved table or diff authorizes all the rows and files it contains, including the necessary folders. Prompts do not ask for an OK per collection, variable, style, or verification.
- **New OK only for scope changes:** another confirmation is requested only if an action outside the batch appears, a conflict arises, Figma changes, or the target changes.

## 2.6.8 — 2026-10-26

Origin: simplification of context consumption and Figma calls during everyday syncing.

- **Focused sync:** `/sync-tokens` receives a target and reads only the necessary collection, mode, or Effect Styles. It never uses `all` by default.
- **Explicit full review:** `all` is the only target that reads Variables, Text Styles, and Effect Styles of the whole file. Comparison between modes is limited to semantic syncs or `all`.
- **On-demand formatting:** normalizing a file is not proposed unless a human asks for it or it is an initial import.

## 2.6.7 — 2026-10-26

Origin: further simplification of the sync so it does not become an export cleaner.

- **Passive metadata:** `/sync-tokens` preserves any existing `$extensions`, but does not depend on it for development nor invent it if the MCP does not expose it. Scopes are used for auditing when available.
- **No automatic cleanup:** the sync does not remove IDs, code syntax, modes, or other export metadata. It only splits groups, preserves values, and applies formatting with a human OK.

## 2.6.6 — 2026-10-26

Origin: simplification of the JSON contract to prioritize development readability and scope validation.

- **Minimal repo JSON:** this policy was replaced by passive metadata preservation in 2.6.7.

## 2.6.5 — 2026-10-26

Origin: comparison of a manual Figma export with JSON generated by the agent during the test run.

- **Variables fidelity:** `/sync-tokens` preserves exactly the `$type`, `$value`, and `$description` of the Figma export, plus the scopes. It can split groups into files, but does not convert types or units.

## 2.6.4 — 2026-10-26

Origin: review to prevent the token architecture from biasing libraries or projects with typography that varies by mode.

- **Typography as a default, not a dogma:** families, sizes, weights, and Text Styles are synced to `foundations/typography` by default. A typographic variation by mode or context may use `semantic/<mode>` if the project documents it explicitly.

## 2.6.3 — 2026-10-26

Origin: an audit of an existing library asked whether typography should belong to the semantic modes.

- **Typographic classification:** families, sizes, and weights are `foundations/typography` by default. In an existing library under `semantic/typography`, the agent proposes the mapping to the repo and flags the discrepancy; it does not move variables nor ask about `dark` without evidence of variation by mode.

## 2.6.2 — 2026-10-26

Origin: clarification of compatibility between libraries that use percentages, pixels, or unitless values in their Text Styles.

- **Typography:** `lineHeight` and `letterSpacing` are preserved exactly as Figma expresses them. The framework does not impose percentages nor convert units.

## 2.6.1 — 2026-10-26

Origin: comparison between a compact JSON generated by the agent and a JSON exported from Figma in the test run.

- **Canonical format:** JSON with 2-space indentation, one property per line, and stable order of `$type`, `$value`, `$description`, `$extensions`.
- **Figma metadata:** `/sync-tokens` keeps `$extensions` (IDs, scopes, code syntax, modes, and available metadata) and shows them in the diff.
- **Normalization:** it is a separate operation, with its own diff and human OK. Normal syncs update only changed tokens and do not reformat whole files.
- Pending validation of a real project's pipeline to confirm its handling of `$extensions`.

## 2.6.0 — 2026-10-26

Origin: simplification of the Figma → JSON flow for new projects.

- **1:1 architecture for new projects:** Figma collections `primitives/color`, `foundations/spacing`, `foundations/typography`, and `foundations/border` correspond directly to their repo files. `semantic` keeps one collection with one file per mode; `shadow/*` continues as Effect Styles.
- **Existing libraries:** they are not migrated automatically. `/create-figma-tokens` and `/sync-tokens` keep the approved mapping and can split groups of an existing collection when writing to the repo.
- It reduces the need to infer and split exports in new projects, without imposing a risky restructuring on existing libraries.

## 2.5.0 — 2026-10-26

Origin: test run in `test_framework_V2`.

- **Existing libraries:** `/create-figma-tokens` first classifies the file and inventories its structure. In an existing system it proposes the Figma → repo mapping and waits for approval; it does not create or duplicate collections or variables by default.
- **Figma → JSON:** `/sync-tokens` supports a Figma collection with several groups and distributes them across the repo files. It incorporates missing Text Styles and Effect Styles after the human OK, preserves exactly the values and units from Figma (percentage, px, or unitless), and proposes the scopes Figma declares.
- **Prototypes:** `/implement-html` detects the next version from the repository and asks only for an ambiguous path or an explicit version.
- **HTML → Figma:** Auto Layout is mandatory for every flex/grid container; an absolute exception is documented and does not replace the container's layout.

## 2.4.1 — 2026-10-23

Origin: first test in a real repo. When running `/session-start` the selector went back to the built-in agent.

- **`/session-start`:** `agent: agent` and `tools: search/codebase` were removed from the header. The first forced the built-in agent instead of the selected one; the second limited tools to code search (no file reading nor Figma tools). It now runs with the agent and tools the person chose.

## 2.4.0 — 2026-10-23

Origin: concern about the learning curve with 12 prompts.

- **Prompts are shortcuts, not a requirement:** `ui-architect` and `prototype-reviewer` read and follow the matching prompt even if the person did not invoke it, and say which one they used.
- **`README` → "What to use and when":** guide by situation with prompt, when to use it, and agent, plus the typical order.
- **Descriptions of the 12 prompts** include the "when" (it is the text shown when typing `/`).
- **`/session-start`:** when confirming the context, it suggests the prompt based on what the person wants to do.
- Prompts are not merged for now; this is evaluated after the test run (for example `/audit-tokens` with `/audit-design`).

## 2.3.0 — 2026-10-23

Origin: review of each agent's goals. The `ui-architect` had grown from 5.8 KB to 10.3 KB and was loaded in full in 9 of the 11 prompts, with procedures inside.

- **New `/create-figma-tokens`:** analyzes or creates variables, Text Styles, and Effect Styles with scope and description, in two modes. `analysis` (default) is read-only and delivers one table per batch; `apply` writes to Figma only what was approved in that table. It includes the rules for scope, description, Text Styles, and modes, and the case of a new project without a library.
- **`ui-architect`:** goes from 154 to 119 lines (10.3 KB to 7.5 KB). Those procedures moved to the new prompt, which the agent references. The repeated section "To create or edit in Figma" was removed.
- **`prototype-reviewer`:** no longer audits tokens; it flags and refers to `/audit-html-components`. It keeps usability, accessibility, states, and help.
- **`ux-researcher`:** when documenting a flow, it makes users, goal, and findings explicit, which is the context the `prototype-reviewer` uses.
- `create-figma-component` and `audit-tokens` point to `/create-figma-tokens`.
- Criterion to split the `ui-architect` into two agents (token system and design): if in a test run the agent skips rules, such as batch validation or the protocol for marking what is undefined.

## 2.2.0 — 2026-10-23

Origin: end-to-end review of the framework against the goal of being an agnostic and adaptable base.

**Consistency**
- **README:** setup uses "Use this template" and `FRAMEWORK_VERSION` (previously `rm -rf .git`). Component states: "default, hover, focus, disabled and, when applicable, error".
- **Mark instead of asking:** single source in `AGENTS.md` → "Decision hierarchy". `⚠️` / `🔴` / `❓` are marked, listed under "Decisions that need design judgment", and a question is asked in the moment only for destructive actions. `copilot-instructions` and `ui-architect` reference it.
- **ADRs:** name format `ADR-NNNN-title.md` (sequential numbering), in `README`, `HOW-DOES-IT-WORK`, and `components.instructions`.
- **`create-figma-component`:** the naming convention is the one in `AGENTS.md`; if it is not defined, the agent asks before creating. Variables are named generically (by layer), without fixed token names.

**Single source of the token architecture**
- `AGENTS.md` → "Token architecture" contains the layers, the mapping to Figma, the modes, and the Text Styles. `copilot-instructions`, `tokens.instructions`, `ui-architect`, `sync-tokens`, and `HOW-DOES-IT-WORK` only reference it.

**Adapt a project only from `AGENTS.md`**
- New "Language" section in `AGENTS.md`; `copilot-instructions` no longer fixes the language.
- `prototype-reviewer`: the context of users and goals is taken from each flow's documentation in research, not from the agent nor `AGENTS.md`. If it does not exist, it marks `⚠️ No user information for this flow`.

**Declared assumptions**
- `README` → "What this framework assumes": web product in Figma, tools, DTCG format, language, and heuristic coverage.

**Heuristics**
- `/heuristic-review` adds H2 (match with the real world). H10 (help and documentation) is evaluated on the prototype with `prototype-reviewer`. H7 is not included.

**Removed**
- `/process-prd` and the `research/prd/` folder: they are specific to teams that receive PRDs; each project can add them. The prompt can be recovered from the git history of commit `e63dcec`.

## 2.1.0 — 2026-10-22

Origin: comparison against a project that adapted the framework. Criterion: what enters the base is a tool limitation or standard practice; the rest was evaluated as a candidate outside the base.

- **Mark instead of deciding:** `⚠️` / `🔴` / `❓` for what is undefined, and every spec or report closes with "Decisions that need design judgment". A question is asked in the moment only for destructive actions.
- **`generate-spec`:** defines the spec states with their criteria (`✅ Ready for Dev`, `🟡 Pending UX`, `⚠️ With debt`); it does not overwrite an existing spec without an explicit "yes"; it captures token names (not resolved values); header with `Status`, Figma link, and date; library icons without guessing the name.
- **`ui-architect`:** layout rule for absolute positions; non-tokenizable values; proposal of entries for `ds-backlog.md`.
- **Scopes and descriptions:** validated per batch with a single table.
- **`tokens.instructions`:** list of non-tokenizable values.
- **New:** `decisions/ds-backlog.md` (template).
- **Text Styles:** built with `fontFamily`, `fontSize`, and `fontWeight` bound to variables and with explicit `lineHeight` and `letterSpacing`; in the JSON those two values carry their unit (for example `110%`). The style's description explains usage and does not repeat numeric values. `audit-tokens` flags as an error a Text Style with any of the three properties unbound.
- **Component approval:** `Pending approval (UX Lead)`, without emoji, so it is not confused with spec states.

## 2.0.0 — 2026-10-22

**Major change: three-layer token architecture** (see `AGENTS.md` → "Token architecture").

- `tokens/` goes from five flat files to `primitives/`, `foundations/` (spacing, typography, shadow, border), and `semantic/` (one file per mode).
- Shadows have their own file: they are not Figma variables, they come from Effect Styles.
- Components use `semantic` and `foundations`, never `primitives`.
- Figma collections: `primitives`, `foundations`, and `semantic` (with modes).
- `ui-architect`, `sync-tokens`, `session-start`, `audit-tokens`, `audit-html-components`, `AGENTS.md`, and the guides were updated to the new structure.
- The `components/` layer is reserved, not created.
- `ui-architect` validates that all `semantic/` modes have the same keys; `audit-tokens` flags as an error a component that uses a token from `primitives/`.
- One mode per file, named after the mode in Figma (`default` if the project has only one), so nothing has to be renamed when another is added.

**Migration from 1.x:** move `primitive.tokens.json` to `primitives/color.tokens.json`; `typography`, `spacing`, and `border` to `foundations/`; add `foundations/shadow.tokens.json` with the shadows of the Effect Styles; move `semantic.tokens.json` to `semantic/default.tokens.json`. Update the build pipeline to read the folder recursively and review the `applyTo` patterns.

## 1.1.0 — 2026-10-22

Origin: comparison against a project that adapted the framework.

- **Paths from `AGENTS.md`:** agents, instructions, and prompts read the folders from "Repo structure" instead of fixed paths. Checklist to update the `applyTo` when adapting; `session-start` warns if it does not match.
- **ADRs:** single path `decisions/` (previously `AGENTS.md` said `/docs/decisions/`).
- **Shadows:** clarified that they are not Figma variables (they are Effect Styles).
- **Typography:** `lineHeight` and `letterSpacing` are explicit in the Text Style (not variables) and as an explicit number in the JSON.
- **Variables and styles in Figma:** the agent assigns scope by type (never `ALL_SCOPES`) and writes descriptions as a draft, both validated by the human.
- **Token sync:** `/sync-tokens` updates only what changed, with a human OK; it does not report as removed the values that Figma does not express as a variable.
- **`audit-tokens`:** validates `textStyleId` and `effectStyleId`, scopes other than `ALL_SCOPES`, and the presence of descriptions.
- **`create-figma-component`:** the code example uses a generic font family instead of a specific font.
- **Spec states:** single vocabulary `✅ Ready for Dev` · `🟡 Pending UX` · `⚠️ With debt`.
- **`AGENTS.md`:** new sections for ownership, Figma conventions, and active modules.
- **Adoption:** flow with "Use this template", `FRAMEWORK_VERSION`, and an `upstream` remote instead of deleting `.git`.

## 1.0.0 — 2026-07-17

State of the framework at commit `e63dcec` (starting point of this comparison).

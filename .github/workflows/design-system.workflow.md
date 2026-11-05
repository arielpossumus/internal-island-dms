# Workflow: Design System Change

## Purpose

Define the standard workflow for changing the design system: design tokens, Text Styles, Effect Styles, shared components, and naming.

This workflow keeps Figma, the token files in `tokens/`, the specs, and the implementation in sync, with explicit human approval at every point where the design system changes.

Rules and paths for this domain live in `AGENTS.md`.

---

## Workflow Goals

The workflow aims to:

- keep Figma as the visual source of truth and `tokens/` as the contract with dev
- prevent hardcoded values and invented tokens
- keep token JSONs changing only through `/sync-tokens`
- record non-obvious decisions as ADRs
- track design system debt instead of losing it
- hand changes to development with clear impact

---

## 1. Change Scope Definition

## Primary Agent

- UI Architect Agent

## Responsibilities

- Identify what changes: tokens, Text Styles, Effect Styles, a shared component, or naming.
- Check whether a token or component already covers the need (reuse before creating).
- Identify the target for the sync (collection, mode, or file). Never default to `all`.
- Run `/session-start` if the session has no context loaded.

## Outputs

- change scope and target
- reuse check result
- open questions for the design owner

## Escalation

Involve:

- UX Lead (design owner) → naming, new collections, or any change to token architecture.
- Frontend Developer Agent → when the change affects how components consume tokens.

---

## 2. Change in Figma

## Primary Agent

- UX Lead (human), with the UI Architect Agent for new variables and styles

## Responsibilities

- Make the change in Figma first; every new token is created in Figma, then exported to the repo.
- For a new system or incomplete variables and styles, use `/create-figma-tokens` (analysis first, apply only after the table is approved).
- For a new component, use `/create-figma-component`.

## Outputs

- updated Figma variables, styles, or components

---

## 3. Token Sync

## Primary Agent

- UI Architect Agent (`/sync-tokens`)

## Responsibilities

- Read only the indicated target in Figma and its destination file in `tokens/`.
- Show the diff before modifying any file.
- Wait for explicit human approval (`OK apply batch`), then apply only the approved diff.
- Preserve `$type`, `$value`, `$description`, and `$extensions` exactly; do not normalize format unless requested.
- For a new Variables collection, require the one-time export from Figma first.

## Outputs

- approved diff
- updated token files

---

## 4. Audit

## Primary Agent

- UI Architect Agent

## Responsibilities

- Verify token usage with `/audit-tokens`.
- Verify cross-screen consistency with `/audit-consistency` when components changed.
- Verify layers: components use `semantic/` and `foundations/`, never `primitives/`.
- Verify all modes of `semantic/` have the same keys.

## Outputs

- audit report with 🔴 / 🟡 / 🟢 priorities
- list of decisions that need design judgment

---

## 5. Decision and Debt Recording

## Primary Agents

- UI Architect Agent
- Technical Writer Agent (formatting and consistency)

## Responsibilities

- Record an ADR when the change is non-obvious, an exception to the system, or alters token architecture. Use `.github/templates/adr.template.md` and store it as `decisions/ADR-NNNN-title.md`.
- Propose entries in `decisions/ds-backlog.md` for missing tokens, ungoverned components, or broken references; wait for human approval before writing them.
- Document non-tokenizable values (gradient borders, animated rotation, backdrop filters) with the real value, the reason, and the CSS workaround.

## Outputs

- ADR (when applicable)
- approved backlog entries

---

## 6. Handoff to Development

## Primary Agents

- UI Architect Agent
- Frontend Developer Agent

## Responsibilities

- Update or regenerate affected specs in `specs/` with `/generate-spec` (never overwrite an existing spec without confirmation).
- Tell dev which tokens were added, changed, or removed, and which components consume them.
- Dev regenerates the CSS from `tokens/` with the project's pipeline (for example Style Dictionary); this is a dev task, not part of the UX flow.
- Frontend Developer Agent implements from the spec using semantic and foundations tokens only.

## Outputs

- updated specs
- token change summary for dev

---

## 7. Documentation

## Primary Agent

- Technical Writer Agent

## Responsibilities

- Update `CHANGELOG.md` for user-visible or breaking token changes (renamed or removed tokens are breaking).
- Update `README.md` or `docs/` if conventions changed.

## Outputs

- updated changelog and documentation

---

## Completion Criteria

The workflow is complete when:

- Figma and the token files match for the target
- token JSONs changed only through an approved `/sync-tokens` diff
- audits show no 🔴 findings
- non-obvious decisions have an ADR in `decisions/`
- debt is recorded in `decisions/ds-backlog.md` with human approval
- dev knows what changed and how it affects components
- `CHANGELOG.md` is updated

---

## Rules

- Never hardcode values or invent token names; report missing tokens instead.
- Never use primitives in components.
- Never edit token JSONs by hand outside `/sync-tokens`.
- Do not decide design intent for the designer: mark `⚠️ Not specified`, `🔴 Critical gap`, or `❓ Ambiguous` and list it under "Decisions that need design judgment".

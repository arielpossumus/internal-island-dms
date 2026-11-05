---
agent: "prototype-reviewer"
description: "When: before generating the spec. Formal heuristic evaluation of a design in Figma"
---

# /heuristic-review

> Covers 8 of Nielsen's 10 heuristics (H1, H2, H3, H4, H5, H6, H8, and H9). H10 (help and documentation) is evaluated on the prototype with the prototype-reviewer agent. H7 is not included; if the project needs it, add it to the list.

## When to use it
Formal evaluation on the design in Figma, **before generating the handoff spec**.
It detects usability problems when the cost of fixing them is minimal — before they are implemented in HTML.

## Input
- File key: `${input:figmaFileKey}`
- Node ID: `${input:nodeId}`
- Screen or flow: `${input:sectionName}`

---

## Evaluation by heuristic

For each one: concrete question → findings → severity.
If there are no findings for a heuristic, mark it ✅ to leave traceability.

### H1 — Visibility of system status
Does the user know at all times what is going on?
- Loading, success, and error states are represented
- The active or selected element is distinguishable
- The system gives feedback for every interactive action

### H2 — Match between the system and the real world
Does the product speak the user's language?
- Texts, labels, and messages use the user's words, not internal or technical terms
- Icons and metaphors are recognizable to the user
- Information follows a natural and logical order for the task

### H3 — User control and freedom
Can the user undo and exit without consequences?
- There is a way to cancel or go back at every step of the flow
- Destructive actions have explicit confirmation
- There are no flows that are hard to escape

### H4 — Consistency and standards
Do the same things look and behave the same across the product?
- DS components applied consistently
- The same action produces the same result in different contexts
- Platform conventions respected (web / mobile)

### H5 — Error prevention
Does the design prevent the user from making errors before they happen?
- Fields with the expected format communicated before submit
- Irreversible actions require prior confirmation
- Constraints visible before attempting an invalid action

### H6 — Recognition rather than recall
Can the user operate without having to remember things between steps?
- Options are visible; there are no commands or routes to remember
- The context of where they are and what they did is visible on screen
- Labels always present, without depending on tooltips or memory

### H8 — Aesthetic and minimalist design
Is there information or elements that should not be there?
- Every element has a clear purpose on the screen
- The visual hierarchy guides to the right goal without ambiguity
- There is no visual noise competing with what is important

### H9 — Error recovery
Do error messages help solve the problem?
- Errors identify what went wrong (not just "something failed")
- They suggest how to fix it with a concrete step
- The tone is neutral, not blaming

---

## Accessibility (what can be evaluated in Figma)

- WCAG 2.1 AA minimum contrast on all texts
- Interactive states distinguishable without relying on color alone
- Clear visual hierarchy (size, weight, position)
- Interactive elements visually identifiable

> Focus ring, aria-labels, and keyboard behavior are validated on the HTML — they are not evaluable at this stage.

---

## Output format

Use `.github/templates/ux-review.template.md` as the base structure.

A table for each heuristic with findings:

| Heuristic | Finding | Severity | Recommendation |
|------------|----------|-----------|---------------|

Severity:
- 🔴 Critical — blocks or breaks the experience
- 🟡 Important — resolve before handoff
- 🟢 Improvement — nice to have

Heuristics without findings: list as `✅ H[N] — no findings`

## When closing

- Is it ready to move to the handoff spec? **Yes / No** + reason
- If No: prioritized list of what to resolve first
- Save in the reviews folder (see `AGENTS.md`, default `reviews/`): `[YYYY-MM-DD]-heuristic-[flow-name]-v[N].md`

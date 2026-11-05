# UX Review Template

> Used by `/heuristic-review` and by the prototype-reviewer agent. Save in `reviews/`: `[YYYY-MM-DD]-heuristic-[flow-name]-v[N].md` for heuristic evaluations, or `review-[name]-v[N].md` for prototype reviews.

## Review Information

- **Type:** Heuristic evaluation (Figma) | Prototype review (HTML)
- **Flow or screen:** [name]
- **Source:** [Figma node link, or prototype path `prototypes/[flow]/v[N]/index.html`]
- **Date:** [YYYY-MM-DD]
- **Reviewer:** [agent or person]

---

## Context

> Users, goals, and previous findings come from the flow documentation in `research/`.

- Users: [from research]
- Goal: [from research]
- Previous findings: [links]

`⚠️ No user information for this flow` — state this if research documentation does not exist, and evaluate only against general usability, accessibility, and DS consistency criteria.

---

## Findings

Severity: 🔴 Critical (breaks usability or accessibility) · 🟡 Important (resolve before handoff) · 🟢 Improvement (nice to have)

| Area / Heuristic | Finding | Severity | Why it is a problem | Recommendation |
|---|---|---|---|---|
| [H1–H9 or Usability / Accessibility / States / Help] | [finding] | 🔴 / 🟡 / 🟢 | [why] | [how to fix] |

Heuristics without findings: `✅ H[N] — no findings`.

---

## Heuristic Coverage

| Heuristic | Result |
|---|---|
| H1 Visibility of system status | ✅ / findings |
| H2 Match between system and real world | ✅ / findings |
| H3 User control and freedom | ✅ / findings |
| H4 Consistency and standards | ✅ / findings |
| H5 Error prevention | ✅ / findings |
| H6 Recognition rather than recall | ✅ / findings |
| H8 Aesthetic and minimalist design | ✅ / findings |
| H9 Error recovery | ✅ / findings |
| H10 Help and documentation | Evaluated on the prototype |

H7 (flexibility and efficiency of use) is not included.

---

## Accessibility

- WCAG 2.1 AA contrast: [result]
- Interactive states distinguishable without relying on color alone: [result]
- Visual hierarchy: [result]
- Focus ring, aria-labels, and keyboard behavior: [validated on HTML only]

---

## States Covered

- [ ] default
- [ ] hover
- [ ] focus
- [ ] disabled
- [ ] error
- [ ] mobile (if shown)

---

## Closing

1. **Is it ready for the handoff spec (or approved)?** Yes / No — [reason]
2. **Do any findings justify a new iteration?** Yes / No — [the ones with most impact]
3. **Should any finding be documented as a design decision?** If yes: ADR title and path `decisions/ADR-NNNN-title.md`.
4. **What should be updated in this version's `README.md`** before closing the prototype?
5. **Prioritized list of what to resolve first** (if the answer to 1 is No):
   - [item]

## Recommended Next Agents

- [Agent] → [Reason]

---
applyTo: "prototypes/**"
---

# Prototype conventions

## Folder structure

Each prototype lives in its own folder, versioned by iteration:

```
prototypes/flow-name/
├── CHANGELOG.md        ← log of iterations and decisions (mandatory from v2)
├── v1/
│   ├── index.html      ← HTML prototype
│   └── README.md       ← what was tested, findings, what would change
├── v2/
│   ├── index.html
│   └── README.md       ← what changed from v1 and why
└── assets/             ← images or other resources shared between versions (optional)
```

**Folder names:** descriptive kebab-case of the flow or screen (`onboarding-flow`, `checkout-step2`).

## CHANGELOG.md — mandatory format

Create it from the second version. It records the full thread of iterations:

```markdown
# Changelog — [Flow name]

## v2 — YYYY-MM-DD
**What changed:** [concise description of the changes]
**Why:** [test findings that motivated the change]
**Source findings:** research/[date]-insights-[flow].md
**Documented decision:** decisions/ADR-NNNN-title.md *(if applicable)*

## v1 — YYYY-MM-DD
**What was tested:** [description of the flow or screen]
**With whom:** [number and segment of users]
**Key findings:** research/[date]-insights-[flow].md
```

## README.md per version — format

```markdown
# [Flow name] — v[N]

## What is being validated
[Hypothesis or design question to answer]

## How to test it
[Instructions for the facilitator or for internal review]

## Tokens used
[List of tokens applied in this version]

## States covered
- [ ] default
- [ ] hover
- [ ] focus
- [ ] disabled
- [ ] error

## Findings
[Complete after the test. Point to the file in the research folder if there is a full synthesis]

## What would change in the next version
[Complete after the test. Empty if no iteration is planned]
```

## Minimum accessibility

- Elements without visible text: `aria-label` mandatory
- Decorative icons: `aria-hidden="true"`
- WCAG 2.1 AA minimum contrast
- Never rely on color alone to communicate state
- Visible focus ring on all interactive elements

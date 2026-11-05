# Skill: Architecture Analysis

## Purpose

Analyze and evaluate system architecture: module boundaries, dependency direction, integration patterns, data ownership, and long-term evolvability.

This skill helps agents decide whether a change fits the existing architecture, what structural impact it has, and which architectural options are worth considering.

Scope boundary: this skill covers system structure. Deep analysis of growth, load, and performance belongs to `scalability-analysis.skill.md`. Threat analysis belongs to `threat-modeling.skill.md`.

---

## Responsibilities

When using this skill:

- Compare the proposed change against `architecture.md` and `tech_stack.md`.
- Identify affected modules and their boundaries.
- Review dependency direction and coupling.
- Detect circular dependencies and leaked domain internals.
- Review integration points and their contracts.
- Review data ownership and consistency boundaries.
- Identify architectural risks and technical debt.
- Compare architectural options and their trade-offs.
- Recommend the simplest architecture that meets the requirement.
- Define whether an ADR should be written.

---

## Architectural Principles

Always prioritize:

- Simplicity
- Clear module boundaries
- Explicit dependencies
- Low coupling and high cohesion
- Maintainability
- Evolvability
- Testability
- Operational sustainability

Avoid:

- Overengineering
- Premature distribution (microservices by default)
- Abstractions without a concrete problem
- Shared mutable state between modules
- Circular dependencies
- Decisions driven by trends

---

## Analysis Areas

Review:

- module boundaries and responsibilities
- dependency direction (inner layers must not depend on outer layers)
- separation of concerns
- domain boundaries and ownership
- integration patterns (sync vs async, contracts, failure handling)
- data ownership and consistency requirements
- external dependencies and how they are isolated
- deployment and operational impact
- testing impact
- migration impact and reversibility

---

## Fit Check

Classify the change before analyzing further:

| Result | Meaning | Next step |
|---|---|---|
| Fits | Stays within the existing architecture | Hand off to the Tech Lead Agent for the implementation plan |
| Extends | Adds a module or integration consistent with current patterns | Document in `architecture.md`; Tech Lead plans implementation |
| Changes | Alters boundaries, data ownership, integration patterns, or deployment topology | Full architectural analysis; consider an ADR |

---

## Options Comparison

When more than one option exists, compare:

- complexity
- long-term maintenance cost
- migration cost and risk
- operational impact
- fit with team size and maturity
- reversibility

Recommend one option and state why the others were rejected.

---

## Technical Debt

When reviewing debt:

- identify root causes
- evaluate long-term impact
- estimate migration complexity
- prioritize debt with business impact
- avoid large uncontrolled rewrites

---

## Collaboration Guidelines

Recommend involving:

- Software Architect Agent → architectural ownership and decisions.
- Tech Lead Agent → implementation plan once the decision is made.
- Product Owner Agent → unclear domain rules or business boundaries.
- Backend Developer Agent → service and data implementation details.
- Frontend Developer Agent → frontend architecture and integration concerns.
- Security Reviewer Agent → trust boundaries and sensitive data flows.
- DevOps Engineer Agent → infrastructure and deployment impact.
- Technical Writer Agent → ADRs and architecture documentation.
- `scalability-analysis.skill.md` → growth, load, and performance concerns.

---

## Output Format

```md
## Architecture Analysis

### Context

[Short description of the change or question.]

### Fit Check

- Fits / Extends / Changes — [reason]

### Affected Modules

- [Module] → [Impact]

### Dependency and Boundary Review

- [Finding]

### Integration Considerations

- [Consideration]

### Data Ownership Considerations

- [Consideration]

### Options

#### Option 1

Advantages:
- [Advantage]

Disadvantages:
- [Disadvantage]

### Recommended Option

[Recommendation and justification.]

### Risks

- [Risk]

### Migration Considerations

- [Consideration]

### ADR Needed

- Yes / No — [reason]

### Recommended Next Agents

- [Agent] → [Reason]
```

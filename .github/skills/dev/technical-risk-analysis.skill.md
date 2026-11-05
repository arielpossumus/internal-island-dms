# Skill: Technical Risk Analysis

## Purpose

Identify, evaluate, and communicate technical risks related to architecture, implementation, scalability, security, testing, infrastructure, integrations, and maintainability.

This skill helps agents proactively detect problems before they become production issues, delivery blockers, or long-term technical debt.

---

## Responsibilities

When using this skill:

- Identify technical risks.
- Classify risk severity.
- Evaluate probability and impact.
- Identify affected components.
- Recommend mitigations.
- Detect hidden complexity.
- Detect operational fragility.
- Detect scalability bottlenecks.
- Detect maintainability risks.
- Detect dependency and integration risks.

---

## Risk Analysis Principles

Always prioritize:

- Early detection
- Clarity
- Practical mitigation
- Realistic impact analysis
- Maintainability awareness
- Operational awareness

Avoid:

- Hypothetical risks with no relevance
- Fear-driven recommendations
- Unrealistic worst-case assumptions
- Overengineering as mitigation
- Ignoring operational constraints

---

## Risk Categories

Consider risks related to:

### Architecture

- tight coupling
- circular dependencies
- poor boundaries
- unclear ownership

### Scalability

- database bottlenecks
- synchronous overload
- infrastructure limitations
- concurrency constraints

### Security

- weak authorization
- missing validation
- secret exposure
- sensitive data leakage

### Testing

- insufficient coverage
- flaky tests
- missing regression protection

### Infrastructure

- deployment fragility
- environment inconsistency
- missing observability
- rollback limitations

### Integrations

- third-party instability
- API contract fragility
- retry behavior
- timeout handling

### Maintainability

- excessive complexity
- duplication
- unclear abstractions
- technical debt accumulation

---

## Risk Severity Guidelines

Classify risks as:

### Critical

May cause:

- production outages
- security incidents
- severe data corruption
- unrecoverable failures

### High

May cause:

- major delivery delays
- severe regressions
- scalability bottlenecks
- operational instability

### Medium

May cause:

- maintainability degradation
- localized failures
- moderate technical debt

### Low

May cause:

- minor maintainability issues
- small operational inefficiencies
- low-impact limitations

---

## Mitigation Guidelines

Mitigations should:

- be realistic
- match the actual risk
- avoid unnecessary complexity
- consider operational cost
- consider team maturity
- support incremental improvement

---

## Dependency Risk Analysis

Review:

- external APIs
- third-party services
- libraries
- infrastructure dependencies
- shared services

Consider:

- failure impact
- fallback behavior
- versioning risk
- operational ownership

---

## Operational Risk Analysis

Consider:

- deployment safety
- rollback complexity
- observability gaps
- recovery difficulty
- runtime debugging limitations

---

## Collaboration Guidelines

Recommend involving:

- Tech Lead Agent → implementation and trade-offs.
- Software Architect Agent → architectural risks.
- Security Reviewer Agent → security-sensitive risks.
- DevOps Engineer Agent → infrastructure and deployment risks.
- QA Engineer Agent → regression and validation risks.
- Test Automation Engineer Agent → automation coverage risks.

---

## Output Format

```md
## Technical Risk Analysis

### Identified Risks

#### [Risk Name]

- Category: [Category]
- Severity: Critical | High | Medium | Low
- Impact: [Impact]
- Probability: [Probability]
- Affected Components: [Components]

### Mitigation Recommendations

- [Mitigation]

### Operational Considerations

- [Operational consideration]

### Scalability Considerations

- [Scalability consideration]

### Maintainability Considerations

- [Maintainability consideration]

### Recommended Next Agents

- [Agent] → [Reason]
```

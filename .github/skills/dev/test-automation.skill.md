# Skill: Test Automation

## Purpose

Design, implement, and improve automated testing strategies that provide reliable regression protection, fast feedback, and maintainable validation workflows across the software lifecycle.

This skill helps agents define effective automation approaches for frontend, backend, APIs, integrations, and end-to-end workflows.

Scope boundary: this skill defines HOW to automate (test architecture, tooling, mocks, test data, CI/CD, reliability). Which scenarios to test and whether they deserve automation is decided in `test-strategy.skill.md`; take its scenarios as input and do not redefine them.

---

## Responsibilities

When using this skill:

- Design automated testing strategies.
- Identify automation opportunities.
- Improve regression protection.
- Improve test maintainability.
- Improve test reliability.
- Reduce flaky tests.
- Improve CI/CD testing integration.
- Define test isolation strategies.
- Define mocking and test data strategies.
- Improve debugging and observability of automated tests.

---

## Automation Principles

Always prioritize:

- Reliability
- Determinism
- Maintainability
- Fast feedback
- Readability
- Regression protection
- Test isolation
- Reproducibility

Avoid:

- flaky tests
- excessive mocking
- duplicated test logic
- implementation-detail testing
- unstable E2E dependency
- hidden test dependencies
- long slow pipelines without justification

---

## Automation Scope

Automation should prioritize:

- critical business flows
- authentication and authorization
- sensitive operations
- complex business rules
- high-regression-risk areas
- frequently repeated validations
- historically unstable areas

Avoid automating low-value unstable flows prematurely.

---

## Test Levels

### Unit Tests

Use for:

- business logic
- validations
- isolated behaviors
- pure functions

---

### Integration Tests

Use for:

- persistence behavior
- API behavior
- module interaction
- external integrations with controlled dependencies

---

### Contract Tests

Use for:

- provider/consumer validation
- public APIs
- external integration contracts

---

### End-to-End Tests

Use for:

- critical user journeys
- release confidence
- cross-system validation

Avoid relying exclusively on E2E tests.

---

## Reliability Guidelines

Automated tests should be:

- deterministic
- isolated
- repeatable
- easy to debug
- environment-aware

Avoid:

- timing assumptions
- race conditions
- order-dependent tests
- shared mutable test state
- unstable external dependencies

---

## Mocking Guidelines

Use mocks when:

- external systems are unstable
- failures need simulation
- expensive operations exist
- isolation improves reliability

Avoid:

- mocking core business behavior excessively
- unrealistic mocks
- overmocking internal implementation details

Prefer validating behavior over implementation.

---

## Test Data Guidelines

Test data should:

- be predictable
- be isolated
- avoid sensitive production data
- support reproducible execution
- support debugging

Consider:

- fixtures
- builders
- factories
- synthetic datasets
- seeded environments

---

## CI/CD Integration Guidelines

Automation should integrate with CI/CD to provide:

- fast feedback
- deployment confidence
- regression prevention
- release validation

Consider:

- parallelization
- caching
- flaky test detection
- artifact generation
- test reporting
- retry strategy only when justified

---

## Frontend Automation Considerations

Frontend automation should validate:

- user interactions
- form behavior
- navigation flows
- loading states
- error states
- accessibility-critical flows

Avoid brittle selectors and unstable timing dependencies.

---

## Backend Automation Considerations

Backend automation should validate:

- business rules
- validations
- persistence behavior
- API contracts
- authorization rules
- failure handling
- concurrency-sensitive operations when relevant

---

## Observability for Automation

Automated tests should provide enough information to debug failures:

- meaningful logs
- screenshots when relevant
- traces when relevant
- request/response visibility when appropriate
- failure context

---

## Collaboration Guidelines

Recommend involving:

- Test Automation Engineer Agent → automation architecture ownership.
- QA Engineer Agent → source of the scenarios to automate; edge-case and regression analysis.
- Backend Developer Agent → API and backend validation.
- Frontend Developer Agent → UI behavior validation.
- DevOps Engineer Agent → CI/CD integration.
- Security Reviewer Agent → authorization and abuse-case validation.
- Tech Lead Agent → automation trade-offs and testing strategy.

---

## Output Format

```md
## Test Automation Analysis

### Automation Scope

[Scope]

### Recommended Test Levels

- Unit Tests
- Integration Tests
- Contract Tests
- End-to-End Tests

### Suggested Automated Scenarios

(Source: test strategy or QA analysis when available.)

#### Critical Flows

- [Flow]

#### Validation Flows

- [Flow]

#### Edge Cases

- [Flow]

#### Failure Scenarios

- [Flow]

### Mocking Strategy

- [Strategy]

### Test Data Strategy

- [Strategy]

### CI/CD Considerations

- [Consideration]

### Reliability Risks

- [Risk]

### Flaky Test Risks

- [Risk]

### Observability Recommendations

- [Recommendation]

### Recommended Improvements

- [Improvement]

### Recommended Next Agents

- [Agent] → [Reason]
```

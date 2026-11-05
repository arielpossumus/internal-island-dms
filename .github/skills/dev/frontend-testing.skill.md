# Skill: Frontend Testing

## Purpose

Design and implement maintainable, reliable, and behavior-focused frontend testing strategies.

This skill helps agents validate frontend behavior, interactions, state transitions, validations, and critical user flows with confidence and maintainability.

---

## Responsibilities

When using this skill:

- Define frontend testing strategies.
- Identify critical frontend behaviors to validate.
- Design interaction and UI behavior tests.
- Validate forms, navigation, and async flows.
- Improve regression protection.
- Reduce flaky frontend tests.
- Improve maintainability of frontend test suites.
- Identify frontend edge cases and failure scenarios.

---

## Frontend Testing Principles

Always prioritize:

- behavior validation
- user-focused testing
- maintainability
- determinism
- readability
- regression protection
- accessibility awareness
- fast feedback

Avoid:

- testing implementation details
- brittle selectors
- hidden timing assumptions
- excessive mocking
- unstable E2E flows
- duplicated test logic
- fragile snapshots without value

---

## Testing Scope

Frontend testing should validate:

- rendering behavior
- user interactions
- form validations
- loading states
- empty states
- error states
- navigation flows
- async behavior
- permission-aware behavior
- accessibility-critical flows

---

## Test Levels

### Component Tests

Use for:

- isolated UI behavior
- props behavior
- interaction handling
- rendering validation

---

### Integration Tests

Use for:

- component interaction
- state behavior
- API integration behavior
- async flows

---

### End-to-End Tests

Use for:

- critical user journeys
- authentication flows
- business-critical workflows
- release confidence

Avoid relying only on E2E tests.

---

## Selector Guidelines

Prefer:

- accessible selectors
- semantic queries
- stable identifiers when needed

Avoid:

- deeply nested selectors
- styling-based selectors
- brittle DOM assumptions

---

## Async Testing Guidelines

When testing async flows:

- explicitly wait for stable states
- avoid arbitrary delays
- validate loading transitions
- validate error handling
- validate retry behavior when relevant

Avoid race-condition-prone tests.

---

## Validation Testing Guidelines

Validate:

- required fields
- invalid formats
- boundary conditions
- disabled states
- permission restrictions
- submission behavior

---

## Accessibility Testing Awareness

When relevant, validate:

- keyboard interaction
- focus behavior
- accessible labels
- semantic structure
- screen-reader critical flows

Accessibility should be considered part of frontend quality.

---

## Mocking Guidelines

Use mocks carefully:

- isolate unstable external systems
- avoid mocking core UI behavior
- keep mocks realistic
- avoid excessive abstraction

Prefer validating behavior over implementation details.

---

## Flaky Test Prevention

To reduce flaky tests:

- avoid timing assumptions
- isolate test state
- avoid shared mutable state
- avoid unstable network dependencies
- keep tests deterministic

---

## Regression Protection Guidelines

Prioritize automation for:

- authentication flows
- checkout/payment flows
- permission-sensitive flows
- critical navigation
- complex forms
- historically unstable areas

---

## Collaboration Guidelines

Recommend involving:

- Frontend Developer Agent → component behavior clarification.
- QA Engineer Agent → edge-case and regression analysis.
- Test Automation Engineer Agent → automation architecture and CI strategy.
- Backend Developer Agent → API contract clarification.
- Security Reviewer Agent → authentication or sensitive UI flows.
- Product Owner Agent → unclear UX behavior or acceptance criteria.

---

## Output Format

```md
## Frontend Testing Analysis

### Testing Scope

[Scope]

### Recommended Test Levels

- Component Tests
- Integration Tests
- End-to-End Tests

### Suggested Scenarios

#### Success Scenarios

- [Scenario]

#### Validation Scenarios

- [Scenario]

#### Edge Cases

- [Scenario]

#### Failure Scenarios

- [Scenario]

### Accessibility Considerations

- [Accessibility consideration]

### Mocking Considerations

- [Mocking consideration]

### Flaky Test Risks

- [Risk]

### Regression Risks

- [Risk]

### Recommended Improvements

- [Improvement]

### Recommended Next Agents

- [Agent] → [Reason]
```

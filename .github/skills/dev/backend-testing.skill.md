# Skill: Backend Testing

## Purpose

Define and implement backend testing strategies that increase confidence in system behavior and maintainability.

---

## Responsibilities

When creating testing strategies:

- Cover business rules.
- Cover validations and edge cases.
- Cover error handling.
- Cover integration flows when needed.
- Keep tests deterministic and maintainable.

---

## Testing Principles

Prioritize:

- Behavior validation
- Readability
- Isolation
- Determinism
- Maintainability

Avoid:

- Flaky tests
- Overmocking
- Testing implementation details
- Large unclear tests

---

## Test Types

### Unit Tests

Use for:

- Business logic
- Validation logic
- Isolated components

### Integration Tests

Use for:

- Database interaction
- API behavior
- Module interaction

### Contract Tests

Use for:

- External services
- Public APIs

### End-to-End Tests

Use for:

- Critical workflows

---

## Edge Cases

Always consider:

- Invalid input
- Empty values
- Duplicated data
- Unauthorized access
- Missing resources
- External failures

---

## TDD Support

When TDD is requested:

1. Define expected behavior.
2. Write failing tests first.
3. Implement minimal code.
4. Refactor after passing tests.

---

## Output Format

```md
## Backend Testing Strategy

### Test Types

- Unit Tests
- Integration Tests

### Suggested Test Scenarios

#### Success Cases

- [Scenario]

#### Validation Cases

- [Scenario]

#### Error Cases

- [Scenario]

#### Edge Cases

- [Scenario]

### Mocking Strategy

[Mocking considerations]

### Risks

- [Testing risk]
```

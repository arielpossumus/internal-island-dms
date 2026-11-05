# Backend Test Plan Template

## Feature / Component

[Feature or component name]

---

## Testing Goal

Describe the purpose of the test plan.

---

## Scope

Describe what is included and excluded.

### Included

- [Included item]

### Excluded

- [Excluded item]

---

## Test Types

### Unit Tests

Describe unit testing scope.

---

### Integration Tests

Describe integration testing scope.

---

### Contract Tests

Describe contract testing scope.

---

### End-to-End Tests

Describe E2E testing scope if applicable.

---

## Test Scenarios

### Success Scenarios

| Scenario | Expected Result |
|---|---|
| Scenario | Expected behavior |

---

### Validation Scenarios

| Scenario | Expected Result |
|---|---|
| Invalid input | Validation error |

---

### Authorization Scenarios

| Scenario | Expected Result |
|---|---|
| Unauthorized access | 401 Unauthorized |

---

### Edge Cases

| Scenario | Expected Result |
|---|---|
| Empty payload | Validation error |

---

### Failure Scenarios

| Scenario | Expected Result |
|---|---|
| External service unavailable | Proper fallback |

---

## Mocking Strategy

Describe:

- mocked dependencies
- external services
- test fixtures
- fake data strategy

---

## Test Data Requirements

Describe required test data.

---

## Risks

- [Risk]
- [Risk]

---

## Coverage Expectations

Describe critical areas that must be covered.

---

## Automation Considerations

Describe:

- CI/CD execution
- flaky test prevention
- environment requirements

---

## Exit Criteria

Describe conditions required to consider testing complete.
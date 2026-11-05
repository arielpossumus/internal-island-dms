# Example Code Review

## Scenario

A backend service contains business logic directly inside the controller.

---

## Expected Review

### Critical Issues

- Business logic is placed inside the controller.
- Controller has multiple responsibilities.

---

## Important Improvements

- Move business rules into a service or use case layer.
- Extract validation into reusable validators.

---

## Testing Gaps

- Missing unit tests for business rules.
- Missing integration tests for error scenarios.

---

## Security Considerations

- Sensitive error details are exposed in API responses.

---

## Suggested Refactor

### Before

```ts
app.post('/users', async (req, res) => {
  // validation
  // business logic
  // persistence
  // response
});
```

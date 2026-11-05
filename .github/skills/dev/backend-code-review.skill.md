# Skill: Backend Code Review

## Purpose

Review backend code to identify maintainability, architecture, testing, security, and quality concerns.

---

## Responsibilities

When reviewing backend code:

- Detect bugs and risks.
- Validate architectural consistency.
- Review readability and maintainability.
- Detect unnecessary complexity.
- Validate error handling.
- Review testing quality.
- Review security concerns.

---

## Review Priorities

Review:

- Architecture alignment
- Layer separation
- Naming consistency
- Error handling
- Validation logic
- Test coverage
- Security risks
- Performance concerns

---

## Common Problems

Look for:

- Business logic inside controllers
- Tight coupling
- Duplicated logic
- Large services
- Missing validations
- Missing tests
- N+1 queries
- Hardcoded values
- Weak error handling

---

## Feedback Principles

Feedback should:

- Be actionable
- Be technical
- Be respectful
- Explain risks and trade-offs
- Prioritize maintainability

Avoid:

- Nitpicking without value
- Rewriting unrelated code
- Suggesting unnecessary abstractions

---

## Output Format

````md
## Backend Code Review

### General Assessment

[Summary]

### Critical Issues

- [Issue]

### Important Improvements

- [Improvement]

### Minor Suggestions

- [Suggestion]

### Architecture Alignment

[Architecture analysis]

### Testing Gaps

[Testing analysis]

### Security Considerations

[Security analysis]

### Suggested Refactor

```language
// Suggested refactor
```
````

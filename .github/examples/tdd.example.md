# Example: TDD Workflow

## Scenario

Implement a password reset feature that allows authenticated users to request a reset link via email.

---

# Step 1 — Product Owner Agent

## Responsibilities

- define expected behavior
- define acceptance criteria
- define edge cases

## Output

### Acceptance Criteria

- authenticated users can request password reset
- reset email is sent successfully
- reset token expires after configured time
- invalid or expired tokens are rejected
- password must satisfy validation rules
- successful reset invalidates old sessions

### Edge Cases

- expired token
- reused token
- invalid email
- email service unavailable
- weak password
- multiple reset requests

---

# Step 2 — QA Engineer Agent

## Responsibilities

- define validation scenarios

## Output

### Validation Scenarios

#### Success Flows

- valid reset request sends email
- valid token updates password

#### Failure Flows

- expired token rejected
- invalid token rejected
- weak password rejected
- reused token rejected

#### Security Validation

- token cannot be guessed
- old sessions invalidated
- reset flow rate limited

---

# Step 3 — Tech Lead Agent

## Responsibilities

- define implementation boundaries

## Output

### Technical Strategy

- token stored hashed in database
- expiration validated server-side
- email delivery isolated through service abstraction
- session invalidation required after reset

---

# Step 4 — Test Automation Engineer Agent

## Responsibilities

- define initial failing tests

## Output

### Initial Tests (RED Phase)

- requesting reset generates token
- expired token fails
- reused token fails
- successful reset invalidates sessions
- weak password validation fails

### Result

All tests fail initially.

---

# Step 5 — Backend Developer Agent

## Responsibilities

- implement minimal behavior

## Output

### Minimal Implementation (GREEN Phase)

- reset token generation
- token validation
- password update flow
- session invalidation
- email trigger

### Result

Tests now pass.

---

# Step 6 — Code Reviewer Agent

## Responsibilities

- review maintainability and design

## Output

### Refactor Recommendations (REFACTOR Phase)

- extract token service
- isolate password policy validation
- improve naming consistency
- centralize expiration logic

---

# Step 7 — Backend Developer Agent

## Responsibilities

- apply refactor safely

## Output

### Refactored Implementation

- reusable token service
- reusable password validation
- clearer separation of concerns
- no regression introduced

### Result

All tests still pass.

---

# Step 8 — Security Reviewer Agent

## Responsibilities

- validate security-sensitive behavior

## Output

### Security Findings

- tokens stored hashed
- expiration validated correctly
- session invalidation works
- brute-force protection recommended
- rate limiting recommended

---

# Step 9 — QA Engineer Agent

## Responsibilities

- validate edge cases and regressions

## Output

### Validation Results

- expired token validated
- reused token validated
- weak password validation confirmed
- multiple reset requests validated
- regression flows validated

---

# Step 10 — DevOps Engineer Agent

## Responsibilities

- validate operational readiness

## Output

### Operational Notes

- email provider configuration documented
- monitoring for failed reset attempts added
- alert for abnormal reset volume recommended

---

# Step 11 — Technical Writer Agent

## Responsibilities

- document behavior and operational notes

## Output

### Documentation Updates

- password reset API documented
- operational email configuration documented
- security recommendations documented

---

# Final Result

The feature was:

- behavior-defined first
- test-driven
- implemented incrementally
- validated continuously
- security reviewed
- regression protected
- operationally prepared
- documented
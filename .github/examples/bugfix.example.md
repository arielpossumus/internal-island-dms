# Example: Bug Fix Workflow

## Reported Bug

Users are intermittently unable to complete checkout after applying a discount coupon.

Sometimes the payment succeeds, but the order remains in a pending state.

---

# Step 1 — QA Engineer Agent

## Responsibilities

- reproduce the issue
- identify affected flows
- identify severity

## Output

### Reproduction Steps

1. add products to cart
2. apply discount coupon
3. complete payment
4. intermittently, the order remains pending

### Expected Behavior

- payment succeeds
- order becomes confirmed

### Actual Behavior

- payment succeeds
- order remains pending

### Severity

High

### Affected Areas

- checkout
- payment integration
- order processing

---

# Step 2 — Product Owner Agent

## Responsibilities

- validate expected business behavior

## Output

### Business Validation

- orders must transition to confirmed after successful payment
- pending orders should only exist while payment is unresolved

### Acceptance Criteria

- successful payments always confirm the order
- failures must generate retryable recovery actions

---

# Step 3 — Tech Lead Agent

## Responsibilities

- identify root cause hypothesis
- define fix strategy

## Output

### Technical Findings

- async payment webhook race condition detected
- order update depends on delayed webhook processing

### Risks

- duplicated payment processing
- inconsistent order state
- retry behavior instability

### Proposed Fix

- implement idempotent order confirmation
- add retry-safe processing
- improve event ordering validation

---

# Step 4 — Software Architect Agent

## Responsibilities

- validate architectural implications

## Output

### Architecture Notes

- payment processing tightly coupled to webhook timing
- event-driven processing should become more resilient
- recommend explicit payment state machine

---

# Step 5 — Security Reviewer Agent

## Responsibilities

- validate payment security implications

## Output

### Security Notes

- validate webhook signatures
- validate idempotency protection
- validate duplicate payment prevention

---

# Step 6 — Backend Developer Agent

## Responsibilities

- implement the fix

## Output

### Backend Changes

- idempotent payment processing
- retry-safe order updates
- improved webhook validation
- payment event logging
- regression tests

---

# Step 7 — Test Automation Engineer Agent

## Responsibilities

- automate regression protection

## Output

### Automated Tests

- duplicate webhook delivery
- delayed webhook arrival
- concurrent confirmation attempts
- successful payment flow
- retry validation

---

# Step 8 — QA Engineer Agent

## Responsibilities

- validate the fix

## Output

### Validation Results

- successful payments now confirm correctly
- duplicate webhook handling validated
- retry behavior validated
- regression flows validated

---

# Step 9 — Code Reviewer Agent

## Responsibilities

- review maintainability and reliability

## Output

### Review Findings

- retry logic improved significantly
- recommend extracting payment state transitions
- observability improvements validated

---

# Step 10 — DevOps Engineer Agent

## Responsibilities

- validate operational readiness

## Output

### Operational Improvements

- payment event monitoring added
- alert for stuck pending orders added
- tracing for payment lifecycle added

---

# Step 11 — Technical Writer Agent

## Responsibilities

- document operational changes

## Output

### Documentation Updates

- payment troubleshooting guide updated
- webhook retry behavior documented
- operational monitoring updated

---

# Final Result

The incident was:

- reproduced
- analyzed
- fixed safely
- regression tested
- operationally improved
- documented
- prepared for release
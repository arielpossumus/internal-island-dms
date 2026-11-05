# Example: Security Review Workflow

## Scenario

The team wants to expose a new public API endpoint that allows external partners to submit customer lead information.

The endpoint will receive:

- customer name
- email
- phone number
- source campaign
- partner identifier

---

# Step 1 — Security Reviewer Agent

## Responsibilities

- identify assets at risk
- define trust boundaries
- identify attack surfaces

## Output

### Assets at Risk

- personal customer information
- partner API credentials
- lead database
- internal CRM integration

### Trust Boundaries

- external partner system → public API
- public API → backend service
- backend service → CRM integration

### Attack Surfaces

- public endpoint
- partner authentication
- request payload
- CRM integration

---

# Step 2 — Backend Developer Agent

## Responsibilities

- validate API behavior and input handling

## Output

### Backend Security Requirements

- validate request body
- reject unexpected fields
- validate email and phone format
- enforce payload size limits
- sanitize string inputs
- return safe error responses

---

# Step 3 — Security Reviewer Agent

## Responsibilities

- validate authentication and authorization

## Output

### Authentication Requirements

- partners must authenticate using API keys or OAuth client credentials
- invalid credentials must be rejected
- credentials must be rotated periodically

### Authorization Requirements

- partners can only submit leads for their assigned campaigns
- partner identifiers must not be trusted from request body alone

---

# Step 4 — DevOps Engineer Agent

## Responsibilities

- validate operational security

## Output

### Operational Security Notes

- store partner credentials in secret manager
- avoid logging full request payloads
- configure rate limiting
- monitor suspicious request spikes
- restrict API access where possible

---

# Step 5 — QA Engineer Agent

## Responsibilities

- define security-sensitive validation scenarios

## Output

### QA Scenarios

- invalid API key is rejected
- expired API key is rejected
- oversized payload is rejected
- missing required fields are rejected
- partner cannot submit leads for another campaign
- malformed payload does not break the service

---

# Step 6 — Test Automation Engineer Agent

## Responsibilities

- define automated security regression coverage

## Output

### Automated Tests

- unauthorized request returns 401
- forbidden campaign access returns 403
- invalid payload returns validation error
- unexpected fields are ignored or rejected
- rate-limit behavior is validated if supported

---

# Step 7 — Code Reviewer Agent

## Responsibilities

- review implementation quality

## Output

### Review Findings

- validation is centralized and reusable
- partner authorization must not rely on request body
- logging should mask personal data
- error responses are client-safe

---

# Step 8 — Technical Writer Agent

## Responsibilities

- document API usage and security expectations

## Output

### Documentation Updates

- partner API documentation updated
- authentication instructions added
- error responses documented
- rate-limit behavior documented
- data handling notes added

---

# Final Recommendation

### Decision

Approve With Mitigations

### Required Mitigations

- enforce partner authentication
- validate campaign ownership server-side
- mask sensitive data in logs
- apply rate limiting
- document credential rotation process

---

# Final Result

The public API was:

- security reviewed
- validated against abuse cases
- protected with authentication and authorization
- tested for invalid access
- operationally hardened
- documented for partners
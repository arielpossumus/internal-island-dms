# Security Review Template

## Review Scope

[Describe the feature, API, workflow, infrastructure, or system being reviewed.]

---

## Security Context

### Business Context

[Business context]

### Technical Context

[Technical context]

### Exposure Context

[Describe whether the system is internal, external, public-facing, admin-only, etc.]

---

## Critical Assets

List the assets or data that require protection.

Examples:

- user accounts
- authentication tokens
- personal data
- financial data
- internal APIs
- administrative functionality

---

## Trust Boundaries

Describe trust boundaries involved in the flow.

Examples:

- frontend ↔ backend
- external systems ↔ internal APIs
- authenticated ↔ unauthenticated users
- admin ↔ standard users

---

## Authentication Review

### Authentication Required

- Yes
- No

### Authentication Risks

- [Risk]

### Authentication Recommendations

- [Recommendation]

---

## Authorization Review

### Authorization Rules

[Describe permission and ownership expectations.]

### Authorization Risks

- [Risk]

### Authorization Recommendations

- [Recommendation]

---

## Input Validation Review

### Reviewed Inputs

- request body
- query params
- headers
- file uploads
- external payloads

### Validation Risks

- [Risk]

### Validation Recommendations

- [Recommendation]

---

## Sensitive Data Review

### Sensitive Data Involved

- [Data]

### Storage Considerations

- [Consideration]

### Transmission Considerations

- [Consideration]

### Logging Considerations

- [Consideration]

### Exposure Risks

- [Risk]

---

## API Security Review

### Public Exposure

- Public
- Internal
- Private

### API Risks

- [Risk]

### API Recommendations

- [Recommendation]

---

## Infrastructure and Operational Security

### Infrastructure Risks

- [Risk]

### Secret Management Concerns

- [Concern]

### CI/CD Concerns

- [Concern]

### Operational Recommendations

- [Recommendation]

---

## Threat Modeling Summary

### Attack Surfaces

- [Surface]

### Abuse Cases

- [Abuse case]

### Threats Identified

| Threat | Severity | Impact | Mitigation |
|---|---|---|---|
| [Threat] | [Critical/High/Medium/Low] | [Impact] | [Mitigation] |

---

## Logging and Monitoring Considerations

[Describe observability, auditing, and monitoring considerations.]

---

## Security Testing Recommendations

### Manual Validation

- [Validation]

### Automated Validation

- [Validation]

### Abuse-Case Validation

- [Validation]

---

## Recommended Next Agents

- [Agent] → [Reason]

---

## Final Assessment

### Overall Security Risk

- Critical
- High
- Medium
- Low

### Final Recommendation

- Approve
- Approve With Mitigations
- Requires Additional Validation
- Block Release

Comments:

[Final comments]
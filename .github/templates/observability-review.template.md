# Observability Review Template

## Review Scope

[Describe the service, workflow, feature, infrastructure, or system being reviewed.]

---

## Observability Goals

Describe what operational visibility the system should provide.

Examples:

- detect failures
- monitor latency
- investigate incidents
- validate deployments
- monitor business-critical workflows

---

## System Overview

### Components Involved

- [Component]

### Critical Workflows

- [Workflow]

### External Dependencies

- [Dependency]

---

## Logging Review

### Structured Logging

- Implemented
- Partial
- Missing

### Correlation IDs

- Implemented
- Partial
- Missing

### Sensitive Data Protection

- Validated
- Needs Review

### Logging Gaps

- [Gap]

### Logging Recommendations

- [Recommendation]

---

## Metrics Review

### Existing Metrics

- [Metric]

### Missing Metrics

- [Metric]

### Recommended Metrics

Examples:

- request latency
- throughput
- error rate
- queue size
- resource usage

---

## Tracing Review

### Distributed Tracing

- Implemented
- Partial
- Missing

### Request Correlation

- Implemented
- Partial
- Missing

### Tracing Gaps

- [Gap]

### Tracing Recommendations

- [Recommendation]

---

## Monitoring Review

### Health Checks

- Implemented
- Partial
- Missing

### Dashboards

- Available
- Partial
- Missing

### Alerts

- Available
- Partial
- Missing

### Monitoring Gaps

- [Gap]

---

## Alerting Review

### Existing Alerts

- [Alert]

### Missing Alerts

- [Alert]

### Alert Noise Risks

- [Risk]

### Alert Recommendations

- [Recommendation]

---

## Reliability Visibility

Describe visibility for:

- failures
- retries
- timeouts
- saturation
- dependency failures
- deployment validation

---

## Performance Visibility

Describe visibility for:

- latency
- throughput
- resource consumption
- bottlenecks
- scaling behavior

---

## Security Observability

Describe:

- audit logging
- suspicious activity monitoring
- access monitoring
- sensitive event tracking

---

## Operational Risks

| Risk | Severity | Recommendation |
|---|---|---|
| [Risk] | [High/Medium/Low] | [Recommendation] |

---

## Recommended Improvements

### Immediate Improvements

- [Improvement]

### Short-Term Improvements

- [Improvement]

### Long-Term Improvements

- [Improvement]

---

## Recommended Next Agents

- [Agent] → [Reason]

---

## Final Assessment

### Observability Maturity

- Low
- Medium
- High

### Recommendation

- Ready
- Ready With Improvements
- Requires Additional Validation
- Major Improvements Recommended

Comments:

[Final comments]
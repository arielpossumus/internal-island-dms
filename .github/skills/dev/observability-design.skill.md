# Skill: Observability Design

## Purpose

Design observability strategies that improve system visibility, operational debugging, incident detection, reliability analysis, and production troubleshooting.

This skill helps agents ensure systems expose enough operational information to understand behavior, detect failures, and support safe production operations.

---

## Responsibilities

When using this skill:

- Design logging strategies.
- Design monitoring strategies.
- Design metrics collection strategies.
- Design tracing strategies.
- Improve operational visibility.
- Improve incident investigation capability.
- Improve debugging capabilities.
- Identify observability gaps.
- Improve production diagnostics.
- Support operational reliability analysis.

---

## Observability Principles

Always prioritize:

- Visibility
- Clarity
- Actionability
- Reliability
- Traceability
- Maintainability
- Operational usefulness
- Low-noise signal quality

Avoid:

- excessive noisy logging
- hidden failures
- missing operational visibility
- unstructured logs
- missing correlation identifiers
- dashboards without actionable meaning
- collecting data with no operational value

---

## Logging Guidelines

Logs should:

- support debugging
- support incident investigation
- include meaningful context
- remain structured when possible
- support correlation between systems

Consider including:

- request identifiers
- correlation IDs
- operation context
- service names
- environment information

Avoid logging:

- passwords
- tokens
- secrets
- sensitive personal data
- private keys

---

## Metrics Guidelines

Metrics should help identify:

- system health
- latency
- throughput
- error rates
- resource consumption
- bottlenecks
- abnormal behavior

Prefer metrics that are:

- actionable
- meaningful
- operationally useful

Avoid vanity metrics with no operational value.

---

## Tracing Guidelines

When distributed systems or async workflows exist, consider:

- distributed tracing
- request correlation
- async operation visibility
- dependency latency visibility

Tracing should help identify:

- bottlenecks
- failure propagation
- dependency impact
- request flow behavior

---

## Monitoring Guidelines

Monitoring should support:

- failure detection
- SLA/SLO awareness when relevant
- incident response
- deployment validation
- operational trend analysis

Consider:

- dashboards
- alerts
- anomaly detection
- health checks
- synthetic monitoring when relevant

---

## Alerting Guidelines

Alerts should:

- be actionable
- minimize noise
- avoid alert fatigue
- prioritize operational relevance
- include useful investigation context

Avoid alerts that:

- trigger constantly
- lack ownership
- provide no actionable information

---

## Reliability Awareness

Observability should support:

- faster incident resolution
- rollback decisions
- release validation
- root-cause analysis
- operational learning

---

## Performance Awareness

Observability should help detect:

- slow endpoints
- database bottlenecks
- memory issues
- request spikes
- infrastructure saturation
- queue backlogs
- async processing issues

---

## Security Awareness

Observability systems must:

- protect sensitive data
- restrict access appropriately
- avoid leaking secrets
- avoid exposing internal operational details publicly

When sensitive operational concerns exist, involve the Security Reviewer Agent.

---

## Collaboration Guidelines

Recommend involving:

- DevOps Engineer Agent → monitoring infrastructure and operational tooling.
- Backend Developer Agent → backend instrumentation.
- Frontend Developer Agent → frontend monitoring and UX telemetry.
- Tech Lead Agent → operational trade-offs and visibility strategy.
- Software Architect Agent → distributed tracing and system-level visibility.
- Security Reviewer Agent → sensitive operational data handling.
- QA Engineer Agent → production validation and monitoring scenarios.

---

## Output Format

```md
## Observability Analysis

### Observability Goals

[Goals]

### Logging Recommendations

- [Recommendation]

### Metrics Recommendations

- [Recommendation]

### Tracing Recommendations

- [Recommendation]

### Monitoring Recommendations

- [Recommendation]

### Alerting Recommendations

- [Recommendation]

### Reliability Considerations

- [Consideration]

### Performance Considerations

- [Consideration]

### Security Considerations

- [Consideration]

### Identified Gaps

- [Gap]

### Recommended Improvements

- [Improvement]

### Recommended Next Agents

- [Agent] → [Reason]
```

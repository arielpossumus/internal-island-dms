# CI/CD Design Template

## Pipeline Overview

### Pipeline Name

[Pipeline name]

### Purpose

[Describe the pipeline purpose.]

### Supported Environments

- Development
- Staging
- Production

---

## Pipeline Goals

Describe the objectives of the pipeline.

Examples:

- fast feedback
- automated validation
- deployment safety
- rollback readiness
- release traceability

---

## Trigger Conditions

| Trigger | Description |
|---|---|
| Pull Request | [Description] |
| Merge to Main | [Description] |
| Release Tag | [Description] |

---

## Pipeline Stages

### 1. Setup

Describe:

- environment preparation
- dependency installation
- configuration loading

---

### 2. Static Validation

Describe:

- linting
- formatting
- static analysis
- type checking

---

### 3. Automated Testing

Describe:

- unit tests
- integration tests
- contract tests
- E2E tests

---

### 4. Security Validation

Describe:

- dependency scanning
- secret scanning
- vulnerability analysis
- container scanning

---

### 5. Build Stage

Describe:

- build strategy
- artifact generation
- reproducibility expectations

---

### 6. Deployment Stage

Describe:

- deployment strategy
- rollout approach
- deployment order
- migration handling

---

### 7. Post-Deployment Validation

Describe:

- smoke tests
- health checks
- monitoring validation
- rollback validation

---

## Deployment Strategy

### Deployment Type

- Rolling
- Blue/Green
- Canary
- Manual
- Other

### Rollback Strategy

[Describe rollback behavior.]

---

## Environment Configuration

Describe:

- environment variables
- secrets handling
- runtime configuration
- feature flags

---

## Infrastructure Considerations

Describe:

- infrastructure dependencies
- scaling considerations
- runtime requirements
- infrastructure risks

---

## Observability Requirements

Describe:

- logging
- monitoring
- metrics
- tracing
- alerting

---

## Security Considerations

Describe:

- secret management
- access control
- CI/CD permissions
- environment isolation

---

## Reliability Considerations

Describe:

- retry behavior
- failure handling
- deployment validation
- recovery procedures

---

## Performance Considerations

Describe:

- pipeline duration
- caching strategy
- parallel execution
- optimization opportunities

---

## Risks and Concerns

| Risk | Severity | Recommendation |
|---|---|---|
| [Risk] | [High/Medium/Low] | [Recommendation] |

---

## Recommended Next Agents

- [Agent] → [Reason]

---

## Final Recommendation

- Ready
- Ready With Improvements
- Requires Additional Validation
- Major Rework Recommended

Comments:

[Final comments]
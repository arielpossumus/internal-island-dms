# Example: Architecture Review Workflow

## Scenario

The team wants to migrate a monolithic backend into modular services to improve scalability, deployment independence, and maintainability.

The current system handles:

- authentication
- payments
- notifications
- reporting
- order management

All modules currently share the same database and deployment pipeline.

---

# Step 1 — Product Owner Agent

## Responsibilities

- explain business motivations
- identify operational pain points

## Output

### Business Drivers

- deployments are too risky
- reporting workloads affect checkout performance
- scaling the entire monolith is expensive
- development teams are blocked by shared ownership

### Constraints

- migration must be incremental
- downtime must be minimal
- customer-facing behavior must remain stable

---

# Step 2 — Tech Lead Agent

## Responsibilities

- analyze technical feasibility
- define migration strategy

## Output

### Technical Findings

- notification module is loosely coupled
- reporting workloads are resource intensive
- authentication is deeply shared across modules

### Risks

- distributed transaction complexity
- operational overhead
- duplicated business rules during migration

### Proposed Strategy

- modular monolith first
- extract notifications first
- keep shared authentication temporarily centralized

---

# Step 3 — Software Architect Agent

## Responsibilities

- validate architecture evolution strategy

## Output

### Architecture Review

#### Current Problems

- strong module coupling
- shared database ownership
- unclear domain boundaries
- deployment coordination complexity

#### Recommended Architecture

- modular domain boundaries
- independent service ownership
- async event-driven communication where appropriate
- separate reporting workloads

#### Migration Strategy

1. define domain boundaries
2. isolate notification module
3. introduce event contracts
4. separate reporting workloads
5. evaluate future extraction candidates

### Trade-Offs

#### Advantages

- better scalability
- better ownership
- safer deployments
- workload isolation

#### Disadvantages

- increased operational complexity
- distributed observability requirements
- async consistency challenges

---

# Step 4 — Security Reviewer Agent

## Responsibilities

- validate trust boundaries and security implications

## Output

### Security Findings

- service-to-service authentication required
- centralized secret management required
- audit logging should be improved
- authorization boundaries must remain explicit

---

# Step 5 — DevOps Engineer Agent

## Responsibilities

- analyze operational impact

## Output

### Operational Findings

- CI/CD pipelines must become service-oriented
- distributed logging and tracing required
- deployment orchestration complexity increases
- container orchestration recommended

### Observability Recommendations

- distributed tracing
- centralized logging
- service health dashboards
- alert correlation

---

# Step 6 — QA Engineer Agent

## Responsibilities

- analyze regression and validation complexity

## Output

### QA Findings

- integration regression risk is high
- contract validation becomes critical
- async workflows require new testing strategies

### Validation Recommendations

- contract testing
- integration environment validation
- migration rollback validation

---

# Step 7 — Test Automation Engineer Agent

## Responsibilities

- define automation strategy

## Output

### Automation Recommendations

- API contract testing
- async workflow validation
- deployment smoke tests
- distributed integration testing

---

# Step 8 — Code Reviewer Agent

## Responsibilities

- review maintainability impact

## Output

### Review Findings

- modular boundaries significantly improve ownership
- event contracts require strong versioning discipline
- migration should avoid premature microservice fragmentation

---

# Step 9 — Technical Writer Agent

## Responsibilities

- document architecture evolution

## Output

### Documentation Updates

- architecture diagrams updated
- migration strategy documented
- service ownership documentation added
- operational runbooks updated

---

# Final Recommendation

### Decision

Approve With Incremental Migration Strategy

### Key Principles

- evolve incrementally
- avoid premature distributed complexity
- strengthen observability early
- preserve clear domain boundaries
- prioritize operational sustainability

---

# Final Result

The architecture proposal was:

- analyzed
- validated
- risk-assessed
- operationally reviewed
- security reviewed
- testing reviewed
- documented
- approved for phased implementation
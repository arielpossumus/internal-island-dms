# Skill: Scalability Analysis

## Purpose

Analyze how a system, feature, API, module, or workflow behaves as usage, data volume, traffic, concurrency, or operational complexity increases.

This skill helps agents identify scalability bottlenecks, growth constraints, performance risks, and practical improvement strategies.

Scope boundary: this skill covers growth, load, and performance. System structure (module boundaries, dependencies, integration patterns, data ownership) belongs to `architecture-analysis.skill.md`.

---

## Responsibilities

When using this skill:

- Identify scalability bottlenecks.
- Analyze traffic growth impact.
- Analyze data growth impact.
- Analyze concurrency risks.
- Review database scalability concerns.
- Review API throughput constraints.
- Review infrastructure scalability.
- Review async processing opportunities.
- Review caching opportunities.
- Recommend practical scalability improvements.
- Avoid premature optimization.

---

## Scalability Principles

Always prioritize:

- Realistic growth assumptions
- Practical improvements
- Incremental scalability
- Maintainability
- Operational simplicity
- Reliability
- Measurable bottlenecks

Avoid:

- Optimizing for unrealistic scale
- Adding distributed complexity too early
- Recommending microservices by default
- Introducing caching without invalidation strategy
- Adding queues without operational ownership
- Premature performance tuning without evidence

---

## Analysis Areas

Review:

- API traffic volume
- database query patterns
- database indexes
- data volume growth
- concurrent users
- background jobs
- external service limits
- file processing
- memory usage
- CPU-heavy operations
- network latency
- deployment model
- infrastructure limits

---

## Database Scalability

Consider:

- query complexity
- indexing strategy
- pagination
- N+1 query risks
- connection pool limits
- transaction duration
- read/write patterns
- data partitioning only when justified
- archival or retention strategies

---

## API Scalability

Consider:

- request volume
- payload size
- rate limits
- timeout behavior
- synchronous bottlenecks
- response caching
- idempotency
- pagination and filtering
- expensive operations per request

---

## Concurrency Analysis

Consider:

- race conditions
- duplicate processing
- locking behavior
- transaction conflicts
- idempotent operations
- retry behavior
- eventual consistency when appropriate

---

## Async Processing

Consider async processing when:

- operations are slow
- external dependencies are unreliable
- tasks can be processed later
- user experience should not block
- retries are needed
- workload should be distributed

Avoid async processing when it adds unnecessary complexity.

---

## Caching Analysis

Consider caching when:

- data is frequently read
- computation is expensive
- external calls are costly
- latency reduction is valuable

Always consider:

- invalidation strategy
- stale data tolerance
- cache ownership
- cache consistency
- operational debugging

---

## Infrastructure Scalability

Consider:

- horizontal scaling
- stateless services
- autoscaling
- queue workers
- load balancing
- resource limits
- deployment environment
- monitoring and alerting

---

## Observability Requirements

Scalability recommendations should consider how to measure:

- latency
- throughput
- error rates
- queue length
- database performance
- resource consumption
- saturation points

---

## Collaboration Guidelines

Recommend involving:

- Software Architect Agent → system-level scalability decisions.
- Tech Lead Agent → technical trade-offs and implementation strategy.
- Backend Developer Agent → API, database, and backend implementation changes.
- DevOps Engineer Agent → infrastructure scaling and deployment concerns.
- Observability-related skills → monitoring and measurement strategy.
- QA Engineer Agent → load-sensitive edge cases and regression risks.
- Test Automation Engineer Agent → performance or load test automation.

---

## Output Format

```md
## Scalability Analysis

### Growth Assumptions

- [Assumption]

### Current Bottlenecks

- [Bottleneck]

### API Scalability Considerations

- [Consideration]

### Database Scalability Considerations

- [Consideration]

### Concurrency Considerations

- [Consideration]

### Async Processing Opportunities

- [Opportunity]

### Caching Opportunities

- [Opportunity]

### Infrastructure Considerations

- [Consideration]

### Observability Requirements

- [Metric or signal]

### Risks

- [Risk]

### Recommended Improvements

#### Immediate

- [Improvement]

#### Near-Term

- [Improvement]

#### Future

- [Improvement]

### Recommended Next Agents

- [Agent] → [Reason]
```

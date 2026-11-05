# Skill: Technical Documentation

## Purpose

Create, improve, and maintain clear, accurate, structured, and maintainable technical documentation for software systems, workflows, APIs, infrastructure, and development processes.

This skill helps agents communicate technical information effectively to developers, QA engineers, DevOps teams, product stakeholders, and future maintainers.

---

## Responsibilities

When using this skill:

- Write clear technical documentation.
- Improve documentation structure and readability.
- Simplify complex technical explanations.
- Identify missing documentation.
- Keep documentation aligned with implementation.
- Create onboarding and setup guides.
- Document APIs, workflows, and architecture.
- Document operational procedures and troubleshooting flows.
- Improve discoverability and maintainability of documentation.

---

## Documentation Principles

Always prioritize:

- Clarity
- Accuracy
- Readability
- Structure
- Practical usefulness
- Audience awareness
- Maintainability
- Consistency

Avoid:

- vague explanations
- unnecessary jargon
- excessive verbosity
- outdated examples
- undocumented assumptions
- implementation-disconnected documentation
- duplicated content without purpose

---

## Audience Awareness

Adapt documentation depending on the audience.

### Developers

Focus on:

- setup
- architecture
- APIs
- workflows
- debugging
- conventions

---

### QA Engineers

Focus on:

- validation flows
- testing instructions
- environment setup
- troubleshooting

---

### DevOps / Operations

Focus on:

- deployment
- monitoring
- rollback
- runtime configuration
- operational procedures

---

### Product / Business Stakeholders

Focus on:

- workflows
- behavior
- scope
- capabilities

---

## README Guidelines

A README should generally include:

- project purpose
- setup instructions
- run instructions
- testing instructions
- environment requirements
- project structure
- workflows or conventions
- contribution guidance when relevant

Avoid overly generic README files.

---

## API Documentation Guidelines

API documentation should include:

- endpoint purpose
- authentication requirements
- request structure
- response structure
- validations
- error responses
- status codes
- usage examples

---

## Architecture Documentation Guidelines

Architecture documentation should explain:

- system structure
- module boundaries
- dependency direction
- integration points
- architectural patterns
- important decisions
- data flow when relevant

Documentation should help future developers understand and evolve the system.

---

## Operational Documentation Guidelines

Operational documentation should include:

- deployment steps
- rollback procedures
- monitoring expectations
- environment setup
- troubleshooting guidance
- operational risks when relevant

Avoid undocumented operational dependencies.

---

## Troubleshooting Guidelines

Troubleshooting documentation should:

- describe symptoms clearly
- explain likely causes
- provide actionable resolution steps
- include validation steps after resolution

Avoid vague troubleshooting guidance.

---

## ADR Guidelines

ADRs live in `decisions/` as `ADR-NNNN-title.md`, written with `.github/templates/adr.template.md`.

Architecture Decision Records should include:

- Context
- Problem
- Decision
- Alternatives considered
- Trade-offs
- Consequences

Focus on documenting why decisions were made.

---

## Formatting Guidelines

Prefer:

- headings
- bullet points
- numbered steps
- tables when useful
- examples
- concise paragraphs

Avoid:

- walls of text
- inconsistent formatting
- excessive nesting
- unnecessary repetition

---

## Maintenance Guidelines

Documentation should:

- remain aligned with implementation
- avoid stale examples
- avoid dead links
- be reviewed when major changes occur
- remain discoverable and organized

---

## Security Awareness

Documentation must not expose:

- passwords
- secrets
- API keys
- private operational information
- internal credentials
- sensitive production details

When sensitive operational guidance exists, involve the Security Reviewer Agent.

---

## Collaboration Guidelines

Recommend involving:

- Technical Writer Agent → full documentation ownership.
- Product Owner Agent → business behavior clarification.
- Tech Lead Agent → technical explanation clarification.
- Software Architect Agent → architecture clarification.
- Backend Developer Agent → backend behavior clarification.
- Frontend Developer Agent → frontend behavior clarification.
- DevOps Engineer Agent → deployment and operational clarification.
- QA Engineer Agent → validation and testing clarification.
- Security Reviewer Agent → security-sensitive documentation review.

---

## Output Format

```md
## Documentation Analysis

### Documentation Goal

[Goal]

### Intended Audience

- Developers
- QA Engineers
- DevOps
- Product Stakeholders

### Proposed Structure

- Section
- Section
- Section

### Important Context

- [Context]

### Missing Information

- [Missing information]

### Risks / Concerns

- [Risk]

### Recommended Improvements

- [Improvement]

### Recommended Next Agents

- [Agent] → [Reason]
```

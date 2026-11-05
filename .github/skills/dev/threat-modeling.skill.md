# Skill: Threat Modeling

## Purpose

Identify, analyze, and evaluate potential security threats, attack surfaces, abuse cases, trust boundaries, and risk exposure across systems, APIs, infrastructure, workflows, and integrations.

This skill helps agents proactively detect security weaknesses and design safer systems before vulnerabilities reach production.

---

## Responsibilities

When using this skill:

- Identify trust boundaries.
- Identify attack surfaces.
- Identify abuse cases.
- Analyze sensitive data exposure.
- Analyze authentication and authorization risks.
- Analyze integration risks.
- Analyze infrastructure exposure risks.
- Evaluate likelihood and impact of threats.
- Recommend mitigations and hardening strategies.
- Improve security awareness during design and implementation.

---

## Threat Modeling Principles

Always prioritize:

- realistic attack scenarios
- defense in depth
- least privilege
- secure defaults
- explicit trust boundaries
- practical mitigations
- operationally sustainable protections

Avoid:

- fear-driven analysis
- unrealistic attacker assumptions
- unnecessary security complexity
- security through obscurity
- assuming internal systems are automatically trusted
- relying only on frontend protections

---

## Threat Modeling Areas

Review:

- APIs
- authentication flows
- authorization flows
- external integrations
- infrastructure exposure
- file uploads
- async processing
- webhooks
- admin functionality
- deployment workflows
- CI/CD systems
- data storage
- logging systems

---

## Trust Boundary Analysis

Identify boundaries between:

- users and systems
- frontend and backend
- services and services
- internal and external systems
- trusted and untrusted input
- privileged and non-privileged actors

Validate:

- authentication requirements
- authorization enforcement
- input validation
- sensitive operation protection

---

## Threat Categories

Consider threats such as:

### Authentication Threats

- credential theft
- session hijacking
- token misuse
- brute force attacks
- weak recovery flows

---

### Authorization Threats

- privilege escalation
- horizontal access violations
- vertical access violations
- insecure admin access
- missing ownership validation

---

### Data Exposure Threats

- sensitive data leakage
- insecure logging
- insecure storage
- insecure transmission
- excessive API responses

---

### Injection Threats

- SQL injection
- command injection
- unsafe serialization
- template injection
- unsafe file processing

---

### Infrastructure Threats

- exposed services
- insecure CI/CD
- weak secret management
- insecure runtime configuration
- excessive infrastructure permissions

---

### Availability Threats

- denial of service
- resource exhaustion
- queue flooding
- retry storms
- infrastructure saturation

---

## Abuse Case Analysis

Consider how systems could be abused through:

- repeated requests
- malformed payloads
- automation
- unauthorized workflows
- excessive resource usage
- missing rate limits
- missing operational protections

---

## Sensitive Data Analysis

Review handling of:

- passwords
- tokens
- API keys
- personal data
- financial data
- confidential business data

Validate:

- minimization
- encryption when required
- masking
- secure storage
- safe logging

---

## Risk Severity Guidelines

### Critical

May cause:

- major data breach
- unauthorized privileged access
- destructive operations
- credential exposure

---

### High

May cause:

- sensitive data exposure
- broken authorization
- significant abuse potential

---

### Medium

May cause:

- operational exposure
- partial validation bypass
- localized security weakness

---

### Low

May cause:

- hardening opportunities
- low-impact exposure
- security maintainability concerns

---

## Mitigation Guidelines

Mitigations should:

- be practical
- match the actual threat
- avoid excessive complexity
- support maintainability
- consider operational impact

Examples:

- stronger validation
- rate limiting
- authorization checks
- secret isolation
- safer logging
- encryption
- retry controls
- monitoring and alerting

---

## Operational Security Awareness

Consider:

- incident detection
- observability
- audit logging
- rollback capability
- deployment security
- runtime hardening

---

## Collaboration Guidelines

Recommend involving:

- Security Reviewer Agent → security validation ownership.
- Backend Developer Agent → API and authorization implementation.
- Frontend Developer Agent → client-side security behavior.
- DevOps Engineer Agent → infrastructure and deployment security.
- Software Architect Agent → trust boundaries and distributed systems concerns.
- QA Engineer Agent → abuse-case validation.
- Test Automation Engineer Agent → automated security-sensitive flow validation.
- Tech Lead Agent → trade-offs and prioritization.

---

## Output Format

```md
## Threat Modeling Analysis

### Reviewed Area

[Area]

### Trust Boundaries

- [Boundary]

### Attack Surfaces

- [Surface]

### Identified Threats

#### [Threat]

- Category:
- Severity:
- Impact:
- Likelihood:

### Abuse Cases

- [Abuse case]

### Sensitive Data Risks

- [Risk]

### Infrastructure Risks

- [Risk]

### Recommended Mitigations

- [Mitigation]

### Operational Security Considerations

- [Consideration]

### Monitoring Recommendations

- [Recommendation]

### Recommended Next Agents

- [Agent] → [Reason]
```

# Example: Tech Stack (Logistics Platform)

> Reference example of a filled-in `tech_stack.md`. Copy the structure, not the content. The template lives at the repo root: `tech_stack.md`.

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| TypeScript | Main backend language |
| NestJS | Backend framework |
| PostgreSQL | Relational database |
| Prisma | ORM and database access |
| Redis | Caching and temporary state |
| JWT | Authentication tokens |

---

## Frontend

| Technology | Purpose |
|---|---|
| React | Web UI library |
| TypeScript | Main frontend language |
| Vite | Frontend build tool |
| React Router | Routing |
| TanStack Query | Server state and API caching |
| Zustand | Lightweight client-side state management |
| React Hook Form | Form handling |
| Zod | Schema validation |
| Tailwind CSS | Styling |

---

## Mobile

| Technology | Purpose |
|---|---|
| React Native | Driver mobile application |
| TypeScript | Mobile app language |
| Expo | Mobile development and build tooling |

---

## Database

| Technology | Purpose |
|---|---|
| PostgreSQL | Primary transactional database |
| Prisma Migrate | Database migrations |
| Redis | Cache and short-lived operational data |

---

## Infrastructure

| Technology | Purpose |
|---|---|
| Docker | Local and production containerization |
| Kubernetes | Container orchestration |
| AWS S3 | File storage for delivery proofs |
| AWS RDS | Managed PostgreSQL database |
| AWS ElastiCache | Managed Redis |
| AWS CloudFront | CDN for public assets |

---

## CI/CD

| Technology | Purpose |
|---|---|
| GitHub Actions | CI/CD pipelines |
| Docker Registry | Store application images |
| Kubernetes Deployments | Runtime deployment |
| GitHub Environments | Environment protection rules |

---

## Testing Stack

| Technology | Purpose |
|---|---|
| Jest | Backend unit tests |
| Supertest | Backend API integration tests |
| React Testing Library | Frontend component and interaction tests |
| Playwright | End-to-end tests |
| MSW | API mocking for frontend tests |
| Testcontainers | Integration testing with real dependencies |

---

## Observability Stack

| Technology | Purpose |
|---|---|
| OpenTelemetry | Distributed tracing |
| Grafana | Dashboards |
| Prometheus | Metrics collection |
| Loki | Centralized logs |
| Sentry | Error tracking |

---

## Security Tooling

| Technology | Purpose |
|---|---|
| GitHub Secret Scanning | Detect exposed secrets |
| Dependabot | Dependency updates |
| OWASP ZAP | API security testing |
| AWS Secrets Manager | Secret management |

---

## Development Conventions

## Backend Conventions

- Use modular architecture by domain.
- Keep controllers thin.
- Place business logic in use cases or services.
- Keep database access inside repositories.
- Use DTOs for request and response boundaries.
- Use Zod or framework validation pipes for input validation.
- Use explicit error classes for business, validation, authentication, and authorization errors.
- Do not expose Prisma models directly through API responses.
- Keep external integrations behind adapters or clients.

---

## Frontend Conventions

- Organize code by feature.
- Use shared components only for reusable UI.
- Keep API calls inside services or hooks.
- Use TanStack Query for server state.
- Use Zustand only for shared client-side state.
- Keep local UI state inside components when possible.
- Use React Hook Form for complex forms.
- Use Zod schemas for validation.
- Handle loading, empty, and error states explicitly.

---

## Mobile Conventions

- Organize code by feature.
- Keep navigation logic isolated.
- Keep API access centralized.
- Support offline-friendly behavior when possible.
- Avoid duplicating business rules that must be enforced by backend.
- Handle poor connectivity scenarios clearly.

---

## Testing Conventions

- Unit tests should validate business rules and isolated logic.
- Integration tests should validate API behavior and persistence.
- E2E tests should cover only critical user flows.
- Tests should validate behavior, not implementation details.
- Avoid flaky tests and arbitrary timeouts.
- Use realistic fixtures and test data builders.
- Add regression tests for bug fixes.

---

## Git Workflow

- Use feature branches.
- Open pull requests for all changes.
- Require code review before merging.
- Require passing CI before merging.
- Use clear PR descriptions.
- Link related tickets when available.
- Use conventional commits when possible.

---

## Environment Strategy

| Environment | Purpose |
|---|---|
| Local | Developer environment |
| Development | Shared development validation |
| Staging | Pre-production validation |
| Production | Live operational environment |

---

## Deployment Strategy

- Backend and frontend are deployed through GitHub Actions.
- Docker images are built and pushed to registry.
- Kubernetes deployments are updated per environment.
- Staging deployment happens before production.
- Production deployments require manual approval.
- Rollback must be available for critical releases.
- Database migrations must be reviewed before production deployment.

---

## Final Notes

The stack prioritizes maintainability, type safety, operational reliability, scalability, and developer productivity.

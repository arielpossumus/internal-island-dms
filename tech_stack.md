# Tech Stack

> Template. Replace every `[...]` placeholder with the real technologies and conventions of the project, and delete rows or sections that do not apply. Agents must not suggest technologies outside this file. A filled-in reference lives in `.github/examples/logistics-tech-stack.example.md`.

## Backend

| Technology | Purpose |
|---|---|
| [Runtime] | Backend runtime |
| [Language] | Main backend language |
| [Framework] | Backend framework |
| [Auth mechanism] | Authentication |

---

## Frontend

| Technology | Purpose |
|---|---|
| [UI library] | Web UI library |
| [Language] | Main frontend language |
| [Build tool] | Frontend build tool |
| [Routing] | Routing |
| [Server state] | Server state and API caching |
| [Client state] | Client-side state management |
| [Styling] | Styling approach |

Design tokens: `tokens/` (W3C DTCG exported from Figma). Components use `semantic/` and `foundations/` tokens only. See `AGENTS.md`.

---

## Mobile

> Delete if the project has no mobile app.

| Technology | Purpose |
|---|---|
| [Framework] | Mobile application |
| [Language] | Mobile app language |

---

## Database

| Technology | Purpose |
|---|---|
| [Database] | Primary transactional database |
| [ORM / migration tool] | Data access and migrations |
| [Cache] | Cache and short-lived data |

---

## Infrastructure

| Technology | Purpose |
|---|---|
| [Containerization] | Local and production containerization |
| [Orchestration / hosting] | Runtime environment |
| [Cloud services] | Storage, managed database, CDN |

---

## CI/CD

| Technology | Purpose |
|---|---|
| [CI/CD tool] | Pipelines |
| [Registry] | Store application images |
| [Environment protection] | Approval rules |

---

## Testing Stack

| Technology | Purpose |
|---|---|
| [Unit test tool] | Unit tests |
| [Integration test tool] | API integration tests |
| [Frontend test tool] | Component and interaction tests |
| [E2E tool] | End-to-end tests |

---

## Observability Stack

| Technology | Purpose |
|---|---|
| [Tracing] | Distributed tracing |
| [Metrics] | Metrics and dashboards |
| [Logs] | Centralized logs |
| [Error tracking] | Error tracking |

---

## Security Tooling

| Technology | Purpose |
|---|---|
| [Tool] | Secret scanning |
| [Tool] | Dependency updates |
| [Tool] | Security testing |
| [Tool] | Secret management |

---

## Development Conventions

### Backend Conventions

- [Convention]

---

### Frontend Conventions

- [Convention]
- Use design tokens from `tokens/`; never hardcode color, spacing, or typography values.
- Implement from the handoff spec in `specs/` when one exists.

---

### Mobile Conventions

- [Convention]

---

### Testing Conventions

- [Convention]

---

### Git Workflow

- [Branching, pull request, review, and commit rules. UX branches: see `AGENTS.md`.]

---

## Environment Strategy

| Environment | Purpose |
|---|---|
| [Environment] | [Purpose] |

---

## Deployment Strategy

- [Deployment rule]

---

## Final Notes

[Stack priorities, for example maintainability and operational reliability.]

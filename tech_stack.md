# Tech Stack

> Template. Replace every `[...]` placeholder with the real technologies and conventions of the project, and delete rows or sections that do not apply. Agents must not suggest technologies outside this file. A filled-in reference lives in `.github/examples/logistics-tech-stack.example.md`.

## Backend

| Technology | Purpose |
|---|---|
| Python 3.12 (`python:3.12-slim` image) | Backend runtime and main backend language |
| FastAPI 0.115 | REST API framework (synchronous endpoints, OpenAPI/Swagger docs) |
| Uvicorn 0.34 | ASGI server |
| Pydantic 2.11 | Domain models and response validation |
| python-multipart | Multipart file upload handling |
| ExifTool | Embedded metadata extraction (invoked as a subprocess) |
| libmagic (`python-magic`) | MIME type detection |
| Not defined yet | Authentication (no auth mechanism implemented; planned) |

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
| PostgreSQL 16 (JSONB for variable embedded metadata) | Primary transactional database |
| SQLAlchemy 2.0 + psycopg 3 | Data access (ORM and driver) |
| `Base.metadata.create_all` at startup (Alembic planned) | Schema management; no migration tool yet |
| Not defined yet | Cache (none in use) |

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

- Layered architecture per app: `api` (HTTP/routers) → `application` (use cases) → `domain` (models, contracts, errors) → `infrastructure` (database, external tools).
- Dependencies point inward: `domain` does not import from `application`, `api`, or `infrastructure`.
- External integrations sit behind a domain contract (Strategy), for example `MetadataExtractor` with `ExifToolExtractor`.
- Persistence goes through repository classes; SQLAlchemy entities stay in `infrastructure` and never reach the API.
- Wire dependencies with FastAPI `Depends` so they can be overridden in tests.
- Use domain exceptions (for example `FileTooLargeError`) for expected failures; map them to HTTP status codes in the `api` layer only.
- Never return internal details (paths, SQL, tool output) in error responses; log them with `logging` instead.
- Sanitize external input before persisting it (file names, extensions, NUL characters).
- Configuration comes from environment variables read in `app/config.py`.
- Public endpoints are versioned under `/api/v1` and documented with summary, description, and error responses.

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

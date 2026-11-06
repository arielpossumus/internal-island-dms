# Architecture Overview

## Architecture Style

This project follows a **modular and decoupled architecture**, inspired by Clean Architecture and SOLID principles, with emphasis on:

- **Configurability**: Dynamic metadata without hardcoding
- **Scalability**: Built to grow without code changes
- **Maintainability**: Clear separation of concerns
- **White-label**: Adaptable to different clients and use cases

---

## SOLID Principles Applied

### Single Responsibility Principle

Each module, component, or service has a single responsibility:

- Controllers/Routes: HTTP request/response handling
- Services: business logic
- Repositories: data access
- Validators: input validation
- Config: dynamic configuration loading

---

### Open/Closed Principle

System is open for extension without modification:

- New metadata types are added via configuration, not code
- New validations without rewriting controllers
- Adaptation to different clients without forking the codebase

---

### Liskov Substitution Principle

Implementations are interchangeable respecting contracts:

- Consistent repository implementations
- Storage adapters (local, cloud, etc.)

---

### Interface Segregation Principle

Small and focused interfaces:

- Avoid large generic services
- Separate read/write responsibilities when needed

---

### Dependency Inversion Principle

Business logic does not depend on infrastructure details:

- Services depend on abstractions
- Infrastructure implements those abstractions
- Database, file storage, external APIs: behind interfaces

---

## High-Level Structure

### Frontend (React + Vite)

```txt
apps/web/src/
├── components/
│   ├── ui/              ← ShadCN/Tailwind components
│   ├── features/        ← feature components (Upload, DocumentList, etc.)
│   └── layout/          ← general layouts (Header, Sidebar, etc.)
├── pages/               ← pages/routes
├── hooks/               ← custom hooks (useDocuments, useAuth, etc.)
├── services/            ← API clients (axios + React Query)
├── contexts/            ← global contexts (Auth, Config, etc.)
├── types/               ← TypeScript types and interfaces
├── utils/               ← general utilities
├── tokens/              ← custom tokens (colors, spacing, typography)
└── tests/               ← unit and component tests
```

### Backend

```txt
apps/[backend]/src/
├── modules/
│   └── [module-name]/
│       ├── domain/              ← entities and business logic
│       ├── application/         ← use cases
│       ├── infrastructure/      ← adapters, repositories
│       └── presentation/        ← controllers, routes
├── config/              ← dynamic configuration loading
├── shared/
│   ├── errors/          ← custom errors
│   ├── utils/           ← shared utilities
│   ├── types/           ← shared types
│   └── validators/      ← validators
└── tests/
```

---

## Key Architectural Decisions

### 1. Dynamic Metadata Configuration

Metadata is **NOT hardcoded**. It is loaded from configuration file (JSON/YAML) on app startup.

```
config/
├── metadata-schema.json   ← defines document metadata structure
└── validation-rules.json  ← validation rules
```

This enables:
- Metadata changes without redeploy
- Adaptation to different clients (white-label)
- Schema versioning

### 2. Frontend-Backend Separation

- Frontend: UI, local authentication, UX validation
- Backend: Business validation, storage, workflow logic

### 3. Storage Scalability

File storage abstracted:
- Local (development)
- S3/Blob Storage (production)
- Other providers without code changes

---

## Module Responsibilities (Backend, to be defined)

| Module | Responsibility |
|--------|-----------------|
| Auth | Authentication and JWT tokens |
| Documents | Document and metadata management |
| Files | File storage and download |
| Config | Configuration loading and validation |
| Health | Healthchecks and observability |

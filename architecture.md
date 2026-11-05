# Architecture Overview

## Architecture Style

This project follows a layered architecture inspired by Clean Architecture and SOLID principles.

The goal is to keep business logic independent from frameworks, databases, APIs, and external services.

---

## SOLID Principles Applied

### Single Responsibility Principle

Each class, module, service, or component should have one clear responsibility.

Examples:

- Controllers handle HTTP input/output.
- Use cases coordinate business operations.
- Repositories handle persistence access.
- Services encapsulate reusable domain or application behavior.
- Validators validate input or business constraints.

---

### Open/Closed Principle

The system should be open for extension but closed for unnecessary modification.

Examples:

- New integrations should be added through adapters.
- New business rules should be added without rewriting controllers.
- New persistence providers should be isolated behind repository interfaces.

---

### Liskov Substitution Principle

Implementations should be replaceable without breaking expected behavior.

Examples:

- Repository implementations should respect the same contract.
- External service adapters should return consistent results.
- Test doubles should behave like real dependencies from the use case perspective.

---

### Interface Segregation Principle

Interfaces should be small and focused.

Examples:

- Avoid large generic service interfaces.
- Split read and write responsibilities when needed.
- Avoid forcing modules to depend on methods they do not use.

---

### Dependency Inversion Principle

High-level business logic should not depend directly on low-level infrastructure details.

Examples:

- Use cases depend on abstractions.
- Infrastructure implements those abstractions.
- Database, HTTP clients, file storage, and external APIs are hidden behind interfaces.

---

## High-Level Structure

```txt
apps/[app-name]/src/
├── modules/
│   └── [module-name]/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── shared/
│   ├── errors/
│   ├── utils/
│   └── types/
└── tests/
```

# Isla DMS

> Isla DMS is a white-label platform for managing documents and workflows. Users can upload files, assign configurable metadata, and manage them centrally.

## Project Overview

### Business Goal

Provide a flexible and scalable solution for centralized management of digital documents with configurable dynamic metadata. The system acts as a white-label platform, allowing it to be adapted to different industries and use cases.

### Main Users

- **Document Managers**: Users who upload files, assign metadata, and manage the document repository.

### Main Features

- File upload with validations
- Configurable metadata system (white-label)
- Document management and organization
- User authentication
- Document search and retrieval

## Project Context

Keep these files updated; the AI works only within them:

- `project_context.md` — business domain, users, workflows, rules
- `architecture.md` — architecture and module boundaries
- `tech_stack.md` — technologies and conventions
- `AGENTS.md` — UX / Design System rules (only if the project has a UI)

---

## AI Framework

This repository uses a unified AI framework that simulates a multidisciplinary team with specialized agents: engineering (`dev`) and design (`ux`). Describe what you need; the framework selects the workflow, agents, and skills automatically.

```txt
apps/                       application source code (one folder per app)
.github/
├── agents/{dev,ux}/        specialized roles
├── skills/{dev,ux}/        reusable capabilities
├── rules/  workflows/  templates/  examples/
├── instructions/  prompts/  UX conventions and /slash commands
└── copilot-instructions.md orchestration rules and framework paths

AGENTS.md                   UX / Design System rules
tokens/ specs/ prototypes/ research/ reviews/ decisions/
docs/                       framework documentation
```

### apps/

Contains the applications of the project, one folder per app (for example `apps/web`, `apps/api`, `apps/mobile`). All production code, app-level tests, and app-specific configuration live here; the rest of the repository is framework, design artifacts, and documentation.

Agents implement code inside `apps/`. Frontend code consumes the design tokens from `tokens/` and implements from the specs in `specs/`.

## Quick Start

1. Create the repository from this template.
2. Fill in `README.md`, `project_context.md`, `architecture.md`, and `tech_stack.md`. For UI projects also complete `AGENTS.md` and export Figma tokens to `tokens/`.
3. Create your first application under `apps/` (for example `apps/web`) and record its structure in `architecture.md`.
4. Open the chat and describe the work, for example:

   ```txt
   Drivers should be able to upload proof-of-delivery photos.
   ```

5. Keep `CHANGELOG.md` and the affected docs updated with every user-visible change.

## Documentation

| Document | Content |
|---|---|
| [docs/framework-guide.md](docs/framework-guide.md) | What each folder does, how the framework works, how to extend it, philosophy |
| [docs/usage-guide.md](docs/usage-guide.md) | Working with the AI: prompt examples, best practices, changelog workflow |
| [docs/ux/prompts-guide.md](docs/ux/prompts-guide.md) | UX slash commands: what to use and when |
| [docs/ux/HOW-DOES-IT-WORK.md](docs/ux/HOW-DOES-IT-WORK.md) | UX / Design System framework in depth |
| [contributing.md](contributing.md) | Conventions for changing the framework |
| [docs/FRAMEWORK_CHANGELOG.md](docs/FRAMEWORK_CHANGELOG.md) | Framework version history (`FRAMEWORK_VERSION`) |
| [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) | Improvements log and pending work |

Validate framework structure with `node scripts/validate-framework.mjs` (also runs in CI).

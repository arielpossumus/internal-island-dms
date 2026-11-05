# Usage Guide

How to work with the AI in a project built on this framework.

---

## Getting Started

1. Create the repository from this template.
2. Fill in `README.md`, `project_context.md`, `architecture.md`, and `tech_stack.md`. For UI projects also complete `AGENTS.md` and export Figma tokens to `tokens/` (see [ux/HOW-DOES-IT-WORK.md](ux/HOW-DOES-IT-WORK.md)).
3. Create or verify the initial application structure under `apps/`, for example:

   ```txt
   apps/
   └── web/
       └── src/
           ├── modules/
           ├── shared/
           ├── infrastructure/
           └── tests/
   ```

4. Create or initialize `CHANGELOG.md` from day one to track user-visible changes.
5. Start working with the AI.

---

## Prompt Examples

### Feature Request

```txt
Drivers should be able to upload proof-of-delivery photos.
```

### Bugfix

```txt
Payments are processed successfully but orders remain stuck in pending status.
```

### Architecture Review

```txt
We are considering splitting the reporting module from the monolith.
```

### Security Review

```txt
We want to expose a public API for external partners.
```

### TDD

```txt
We want to implement password reset using strict TDD.
```

### Design System Change

```txt
The primary button color changed in Figma; sync the tokens and tell dev what is affected.
```

---

## Best Practices

- keep `project_context.md`, `architecture.md`, and `tech_stack.md` updated
- write clear prompts with objective, constraints, and expected behavior
- rely on existing workflows instead of manually requesting each agent
- keep ownership clear across specialized agents

## Common Mistakes

- vague prompts that do not define scope
- asking for too many major deliverables in one prompt
- ignoring `tech_stack.md`
- letting `architecture.md` become stale after architecture changes

---

## Documentation And Changelog Workflow

For user-visible or operationally relevant changes, update documentation in the same task:

- update `CHANGELOG.md`
- review README, API docs, architecture docs, and operational runbooks when impacted

Changelog structure: Added, Changed, Fixed, Removed, Deprecated, Security.

Entry checklist:

- summarize user-visible impact in one sentence
- mention affected APIs, endpoints, commands, or workflows when relevant
- mark breaking changes clearly and include migration notes
- keep entries concise and action-oriented

The root `CHANGELOG.md` is the project's changelog. Framework changes are recorded in [FRAMEWORK_CHANGELOG.md](FRAMEWORK_CHANGELOG.md).

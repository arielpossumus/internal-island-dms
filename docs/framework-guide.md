# Framework Guide

How the unified AI framework is organized, how it works, and how to extend it.

---

## Purpose

The framework simulates a multidisciplinary software team using specialized AI agents. It provides:

- specialized engineering and design agents
- reusable skills
- engineering rules and standards
- structured workflows
- standardized templates
- realistic collaboration patterns

---

## What Each Folder Does

### .github/agents/

Defines specialized roles, split in two groups:

- `dev/`: orchestrator, product owner, tech lead, software architect, backend, frontend, QA, test automation, security, DevOps, code reviewer, technical writer.
- `ux/`: ui-architect, ux-researcher, prototype-reviewer.

Each agent includes responsibilities, ownership, boundaries, expected behavior, and collaboration expectations. UX agents are discovered through `.vscode/settings.json` (`chat.agentFilesLocations`).

### .github/skills/

Reusable capabilities that define how technical work is performed, split in `dev/` and `ux/` (UX flows currently live in `prompts/`).

### .github/rules/

Global engineering constraints and quality guardrails.

### .github/workflows/

How agents collaborate: execution order, responsibilities, handoffs, validations, and escalations. The folder also holds the GitHub Actions file `validate-framework.yml`.

### .github/templates/

Structured output formats and reusable writing patterns (for example `adr.template.md`).

### .github/examples/

Realistic collaboration examples and filled-in reference documents.

### .github/prompts/ and .github/instructions/

UX slash commands (`prompts/`) and auto-applied UX conventions (`instructions/`, selected by `applyTo`). See [ux/prompts-guide.md](ux/prompts-guide.md).

### UX artifacts

`tokens/`, `specs/`, `prototypes/`, `research/`, `reviews/`, and `decisions/` (ADRs for design and architecture). Their paths and rules are defined in `AGENTS.md`.

### .github/copilot-instructions.md

Orchestration rules and the "Framework Paths" table, the single source of framework locations.

---

## How The Framework Works

When a user submits a request, the framework:

1. classifies the task type
2. selects the matching workflow
3. selects the required agents
4. activates relevant skills
5. produces a structured response

Users do not need to manually invoke agents, workflows, or skills.

```txt
User Request
	↓
Task Classification
	↓
Workflow Detection
	↓
Agent Selection
	↓
Skill Activation
	↓
Structured Response
```

For features with a UI, the UX track runs first: `ux-researcher` → `ui-architect` → `prototype-reviewer` → `frontend-developer`, with the handoff spec in `specs/`.

---

## Important Project Files

| File | Describes |
|---|---|
| `README.md` | Project purpose, setup, structure, and conventions |
| `project_context.md` | Business domain, users, workflows, rules, and operational constraints |
| `architecture.md` | Architecture, module boundaries, patterns, integrations, and technical decisions |
| `tech_stack.md` | Technologies, frameworks, testing stack, infrastructure, CI/CD, and conventions |
| `AGENTS.md` | UX / Design System rules: paths, token architecture, language, decision hierarchy |

The AI must respect these files and should not invent behavior or technologies outside the defined context.

---

## How To Extend The Framework

You can add agents, skills, workflows, rules, templates, and examples. Always preserve:

- clarity
- ownership
- realistic collaboration
- maintainability
- simplicity

Naming conventions, validation, and versioning: see [../contributing.md](../contributing.md).

---

## Framework Philosophy

The framework aims to represent how a real technical team works. Agents behave like specialists collaborating with each other.

The goal is not to generate code quickly at any cost. The goal is to produce:

- maintainable software
- scalable software
- testable software
- secure software
- coherent decisions
- realistic technical reasoning

---

## Final Rule

AI should not respond as a generic assistant. It should respond as a coordinated team.

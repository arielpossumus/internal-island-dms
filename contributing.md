# Contributing Guidelines

## Purpose

This repository provides a reusable AI Engineering Framework designed to simulate a real multidisciplinary software engineering team using specialized AI agents.

Contributions should improve:

- maintainability
- clarity
- scalability
- consistency
- realism of engineering collaboration
- reusability across projects

---

# Repository Structure

```txt
.github/
├── agents/
│   ├── dev/
│   └── ux/
├── skills/
│   ├── dev/
│   └── ux/
├── rules/
├── workflows/
├── templates/
├── instructions/
├── prompts/
└── examples/
```

---

# Contribution Principles

All contributions should prioritize:

- simplicity
- clarity
- maintainability
- realistic engineering practices
- explicit responsibilities
- structured collaboration
- scalability
- operational awareness

Avoid:

- overengineering
- duplicated logic
- vague prompts
- hidden assumptions
- conflicting responsibilities
- unnecessary complexity

---

# Agents

Location:

```txt
.github/agents/dev/   (engineering)
.github/agents/ux/    (design)
```

Agents represent specialized engineering roles.

Examples:

- Backend Developer Agent
- Frontend Developer Agent
- QA Engineer Agent
- Tech Lead Agent
- Security Reviewer Agent

## Agent Guidelines

Agents should define:

- responsibilities
- ownership boundaries
- collaboration expectations
- escalation behavior
- engineering mindset

Agents should NOT:

- behave like generic assistants
- ignore architectural constraints
- absorb responsibilities from every other role
- generate unrealistic implementations

---

# Skills

Location:

```txt
.github/skills/dev/   (engineering)
.github/skills/ux/    (design)
```

Skills define reusable engineering capabilities.

Examples:

- API design
- scalability analysis
- threat modeling
- observability design

## Skill Guidelines

Skills should:

- remain reusable across projects
- focus on HOW work is performed
- avoid project-specific implementation details
- encourage realistic engineering reasoning

---

# Rules

Location:

```txt
.github/rules/
```

Rules define engineering constraints and quality standards.

## Rule Guidelines

Rules should:

- remain generic and reusable
- define guardrails
- reinforce maintainability and clarity
- avoid excessive rigidity

---

# Workflows

Location:

```txt
.github/workflows/
```

Workflows define collaboration between agents.

Examples:

- feature development
- bug fixes
- release validation
- architecture review

## Workflow Guidelines

Workflows should define:

- execution order
- ownership
- handoffs
- validations
- escalation paths
- completion criteria

Avoid unrealistic or excessively bureaucratic workflows.

---

# Templates

Location:

```txt
.github/templates/
```

Templates define standardized outputs.

## Template Guidelines

Templates should:

- improve consistency
- improve structure
- improve readability
- remain reusable
- support engineering reasoning

Avoid overly rigid templates that prevent contextual thinking.

---

# Examples

Location:

```txt
.github/examples/
```

Examples demonstrate realistic collaboration patterns between agents.

## Example Guidelines

Examples should:

- simulate realistic engineering scenarios
- demonstrate agent collaboration
- show structured reasoning
- include risks, trade-offs, and validations
- avoid trivial examples

---

# Documentation Standards

Documentation should:

- be written in English
- be explicit and structured
- avoid ambiguity
- remain maintainable
- remain technology-agnostic when possible

When behavior changes are user-visible, contributors must update `CHANGELOG.md`.

---

# Naming Conventions

## Agents

```txt
[role].agent.md
```

Examples:

```txt
backend-developer.agent.md
qa-engineer.agent.md
```

---

## Skills

```txt
[capability].skill.md
```

Examples:

```txt
api-design.skill.md
threat-modeling.skill.md
```

---

## Rules

```txt
[rule-name].rules.md
```

Examples:

```txt
clean-code.rules.md
security.rules.md
```

---

## Workflows

```txt
[workflow-name].workflow.md
```

Examples:

```txt
feature-development.workflow.md
release.workflow.md
```

---

## Templates

```txt
[template-name].template.md
```

Examples:

```txt
security-review.template.md
qa-test-plan.template.md
```

---

## Examples

```txt
[scenario].example.md
```

Examples:

```txt
bugfix.example.md
tdd.example.md
```

---

# Validation and Versioning

Run the validator before opening a pull request:

```txt
node scripts/validate-framework.mjs
```

It runs in CI through `.github/workflows/validate-framework.yml` (a GitHub Actions file; the `*.workflow.md` files in the same folder are agent workflows, not Actions). It checks:

- required root files and empty files
- file naming conventions per folder
- agent, prompt, and instruction frontmatter (kebab-case agent names, required fields)
- that `agents:`, `handoffs:`, and prompt `agent:` reference existing agents
- that markdown links and `.github/`, `docs/`, `scripts/` paths exist
- that `FRAMEWORK_VERSION` is a valid semantic version and matches the latest entry of `docs/FRAMEWORK_CHANGELOG.md`

When changing the framework itself (not a project built on it):

1. Add an entry at the top of `docs/FRAMEWORK_CHANGELOG.md`.
2. Update `FRAMEWORK_VERSION` to match: major for changes that break existing projects, minor for new capabilities, patch for fixes.
3. Log the improvement in `docs/IMPROVEMENTS.md`.

The root `CHANGELOG.md` is the template for the changelog of each project, not of the framework.

---

# Pull Request Expectations

Contributors should:

- explain the purpose of the change
- explain affected areas
- avoid unrelated modifications
- keep contributions focused
- maintain consistency with existing framework patterns

---

# Recommended Contribution Flow

1. Identify improvement opportunity
2. Validate overlap with existing content
3. Update or add content
4. Validate naming consistency
5. Validate structure consistency
6. Validate collaboration consistency
7. Open pull request with explanation

---

# Non-Goals

This framework is NOT intended to:

- replace human engineering judgment
- force specific technologies
- generate production code blindly
- encourage overengineering
- replace architecture thinking

---

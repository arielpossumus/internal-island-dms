# Skill: Frontend State Management

## Purpose

Design predictable, maintainable, scalable, and understandable frontend state management strategies.

This skill helps agents organize UI state, domain state, async state, and shared state correctly while minimizing complexity and coupling.

---

## Responsibilities

When using this skill:

- Define appropriate state ownership.
- Separate UI state from business/domain state.
- Reduce unnecessary global state.
- Improve state predictability.
- Reduce duplicated state sources.
- Improve maintainability and debugging.
- Design scalable frontend data flow.
- Identify state-related complexity and risks.

---

## State Management Principles

Always prioritize:

- Simplicity
- Predictability
- Explicit data flow
- Maintainability
- Low coupling
- Clear ownership
- Minimal shared state
- Debuggability

Avoid:

- unnecessary global state
- duplicated state
- hidden mutations
- deeply coupled state dependencies
- implicit shared behavior
- excessive abstraction
- state synchronization hacks

---

## State Classification

When analyzing state, classify it as:

### Local UI State

Examples:

- modal visibility
- form field state
- loading indicators
- tabs
- local interactions

Keep local whenever possible.

---

### Shared UI State

Examples:

- theme
- navigation state
- layout preferences

Use shared/global state only when coordination is required.

---

### Domain / Business State

Examples:

- authenticated user
- cart
- orders
- permissions
- workflow state

Should be predictable, centralized when necessary, and clearly structured.

---

### Server / Async State

Examples:

- API responses
- cached queries
- remote resources

Prefer specialized async/server-state solutions when appropriate.

Avoid manually synchronizing server state unnecessarily.

---

## State Ownership Rules

State should have:

- a single source of truth
- clear ownership
- predictable update flow
- explicit mutation paths

Avoid:

- duplicated caches
- scattered business state
- conflicting state updates
- uncontrolled side effects

---

## Async State Guidelines

When handling async state:

- handle loading states
- handle error states
- handle retries when appropriate
- handle stale data intentionally
- avoid race conditions

Consider:

- caching
- invalidation
- synchronization
- optimistic updates only when justified

---

## Complexity Guidelines

When state complexity grows, consider:

- modularization
- domain separation
- state normalization
- event-driven flows when appropriate
- extracting reusable hooks/services

Do not introduce complex state libraries without justification.

---

## Performance Awareness

When relevant, consider:

- unnecessary re-renders
- selector efficiency
- memoization
- expensive derived state
- large shared subscriptions

Do not optimize prematurely without evidence.

---

## Testing Considerations

State management should support:

- predictable testing
- isolated state testing
- interaction testing
- async behavior testing
- edge-case validation

Avoid hidden state behavior that is difficult to reproduce.

---

## Collaboration Guidelines

Recommend involving:

- Frontend Developer Agent → implementation details.
- Tech Lead Agent → frontend architecture decisions.
- QA Engineer Agent → interaction and edge-case validation.
- Test Automation Engineer Agent → automated state behavior testing.
- Backend Developer Agent → async data consistency and API contracts.
- Product Owner Agent → unclear workflow behavior.

---

## Output Format

```md
## State Management Analysis

### State Classification

#### Local UI State

- [State]

#### Shared State

- [State]

#### Domain State

- [State]

#### Server State

- [State]

### Ownership Considerations

- [Ownership consideration]

### Async State Considerations

- [Async consideration]

### Complexity Risks

- [Risk]

### Performance Considerations

- [Performance consideration]

### Testing Considerations

- [Testing consideration]

### Recommended Improvements

- [Improvement]

### Recommended Next Agents

- [Agent] → [Reason]
```

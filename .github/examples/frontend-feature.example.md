# Example: Frontend Feature Workflow

## Scenario

Implement a new dashboard page where authenticated users can view, filter, and search their orders.

The page should support:

- pagination
- filtering by status
- text search
- loading states
- empty states
- responsive layout

---

# Step 1 — Product Owner Agent

## Responsibilities

- define user behavior
- define acceptance criteria
- define UX expectations

## Output

### Acceptance Criteria

- authenticated users can access the orders dashboard
- users can filter orders by status
- users can search orders by order number
- pagination works correctly
- loading states are visible
- empty states are user-friendly
- unauthorized users cannot access the page

### Edge Cases

- empty order list
- slow API response
- invalid filter combinations
- expired session
- network failure

---

# Step 2 — Tech Lead Agent

## Responsibilities

- define frontend implementation strategy
- identify impacted areas

## Output

### Technical Decisions

- use server-side pagination
- debounce text search
- isolate API layer
- separate filters from presentation components
- shared table component can be reused

### Risks

- duplicated state between filters and URL
- excessive API requests during typing
- inconsistent pagination behavior

---

# Step 3 — Software Architect Agent

## Responsibilities

- validate frontend architecture alignment

## Output

### Architecture Notes

- API integration should remain isolated
- avoid business logic inside UI components
- shared table abstraction is appropriate
- URL state synchronization recommended

---

# Step 4 — Security Reviewer Agent

## Responsibilities

- validate frontend security behavior

## Output

### Security Findings

- dashboard requires authenticated access
- frontend permissions should not replace backend authorization
- avoid exposing internal order metadata
- expired sessions must redirect safely

---

# Step 5 — Frontend Developer Agent

## Responsibilities

- implement frontend feature

## Output

### Frontend Deliverables

- orders dashboard page
- filters panel
- search input
- paginated table
- loading skeletons
- empty-state component
- responsive layout
- error handling UI

### State Management

#### Local State

- filter modal state
- table sorting state

#### Shared State

- authenticated user

#### Server State

- orders list
- pagination metadata

---

# Step 6 — Backend Developer Agent

## Responsibilities

- support frontend integration needs

## Output

### Backend Deliverables

- paginated orders endpoint
- filtering support
- search support
- validation improvements
- optimized query performance

---

# Step 7 — Test Automation Engineer Agent

## Responsibilities

- define automated frontend coverage

## Output

### Automated Tests

- successful dashboard rendering
- filtering behavior
- search behavior
- pagination behavior
- loading states
- empty states
- expired session handling

---

# Step 8 — QA Engineer Agent

## Responsibilities

- validate user behavior and regressions

## Output

### QA Validation

- filters validated
- pagination validated
- responsive behavior validated
- error handling validated
- unauthorized access validated
- loading states validated

---

# Step 9 — Code Reviewer Agent

## Responsibilities

- review frontend maintainability and consistency

## Output

### Review Findings

- API logic correctly isolated
- state management remains predictable
- table abstraction reusable
- search debounce implementation acceptable

---

# Step 10 — DevOps Engineer Agent

## Responsibilities

- validate frontend deployment impact

## Output

### Operational Notes

- frontend environment variables validated
- monitoring for API failures added
- frontend error tracking validated

---

# Step 11 — Technical Writer Agent

## Responsibilities

- update documentation

## Output

### Documentation Updates

- dashboard workflow documented
- API usage documented
- frontend environment setup updated

---

# Final Result

The frontend feature was:

- behavior-defined
- architecture-reviewed
- security-reviewed
- implemented
- tested
- validated
- reviewed
- documented
- prepared for release
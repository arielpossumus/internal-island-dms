# Example: Feature Request Workflow

## Scenario

Implement a feature that allows authenticated users to upload profile pictures.

The feature should support:

- image preview
- image replacement
- file validation
- upload progress
- responsive behavior

---

# Step 1 — Product Owner Agent

## Responsibilities

- define feature behavior
- define acceptance criteria
- identify edge cases

## Output

### Acceptance Criteria

- authenticated users can upload profile pictures
- only supported image formats are accepted
- oversized files are rejected
- users can preview the image before saving
- previous profile picture is replaced
- upload failures are visible to the user

### Edge Cases

- unsupported file format
- upload timeout
- corrupted image
- expired session
- empty upload
- multiple upload attempts

---

# Step 2 — Tech Lead Agent

## Responsibilities

- define implementation strategy
- identify technical risks

## Output

### Technical Decisions

- images stored in cloud object storage
- metadata stored in database
- backend validates file size and MIME type
- upload progress handled client-side
- retry-safe upload endpoint recommended

### Risks

- large file uploads
- malicious uploads
- storage growth
- inconsistent upload state

---

# Step 3 — Software Architect Agent

## Responsibilities

- validate architecture alignment

## Output

### Architecture Notes

- upload service should remain isolated
- storage provider should be abstracted
- CDN integration recommended
- async processing optional for future scalability

---

# Step 4 — Security Reviewer Agent

## Responsibilities

- review upload security concerns

## Output

### Security Findings

- validate MIME type server-side
- sanitize filenames
- avoid exposing storage bucket publicly
- validate authentication server-side
- enforce upload size limits
- rate limiting recommended

---

# Step 5 — Backend Developer Agent

## Responsibilities

- implement upload backend behavior

## Output

### Backend Deliverables

- upload endpoint
- file validation
- storage integration
- metadata persistence
- safe error handling
- automated tests

---

# Step 6 — Frontend Developer Agent

## Responsibilities

- implement upload user experience

## Output

### Frontend Deliverables

- upload component
- drag-and-drop support
- image preview
- loading indicators
- upload progress
- validation messages
- retry handling

---

# Step 7 — Test Automation Engineer Agent

## Responsibilities

- define automated coverage

## Output

### Automated Tests

- successful upload
- unsupported format rejection
- max-size validation
- expired session handling
- retry behavior
- upload failure handling

---

# Step 8 — QA Engineer Agent

## Responsibilities

- validate feature behavior

## Output

### QA Validation

- supported formats validated
- invalid uploads rejected correctly
- mobile responsiveness validated
- upload progress validated
- retry behavior validated
- error handling validated

---

# Step 9 — Code Reviewer Agent

## Responsibilities

- validate maintainability and consistency

## Output

### Review Findings

- upload validation duplicated in two layers
- storage abstraction naming could improve
- tests cover critical flows correctly

---

# Step 10 — DevOps Engineer Agent

## Responsibilities

- validate operational readiness

## Output

### Operational Notes

- storage permissions validated
- CDN cache rules configured
- monitoring for upload failures added
- alerting for abnormal upload volume recommended

---

# Step 11 — Technical Writer Agent

## Responsibilities

- update documentation

## Output

### Documentation Updates

- API documentation updated
- onboarding documentation updated
- storage setup documented
- operational troubleshooting guide updated

---

# Final Result

The feature was:

- analyzed
- architecture-reviewed
- security-reviewed
- implemented
- tested
- validated
- operationally reviewed
- documented
- prepared for release
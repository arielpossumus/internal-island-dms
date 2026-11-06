# Project Context

## Project Name

Isla DMS

---

## Business Domain

Digital document management and workflows platform. A white-label solution that allows organizations across any sector to centralize, categorize, and manage their files with configurable metadata.

---

## Business Goal

Provide a scalable and flexible document management solution that:

- Allows centralized file upload and organization
- Configures metadata dynamically based on client needs (white-label)
- Facilitates document search and retrieval
- Ensures authentication and access security

---

## Main Users

| User Type | Description |
|---|---|
| Document Manager | Uploads files, assigns configurable metadata, manages the document repository |

---

## Main Workflows

### Document Management

1. User authenticates in the system
2. Accesses the documents panel
3. Uploads a file (with validations)
4. Assigns configurable metadata/categories to the file
5. File becomes available in the repository
6. User can search, view, and manage their documents

---

## Business Rules

| Rule ID | Rule |
|---|---|
| BR-001 | All authenticated users have the same permissions (no differentiated RBAC at this stage) |
| BR-002 | Document metadata is configurable via configuration file (white-label architecture) |
| BR-003 | No differentiated permissions between users in the initial version |

---

## Operational Constraints

- Metadata defined dynamically in config file (not hardcoded)
- System must be adaptable to different clients without code changes
- File validation according to configuration

---

## Scalability Expectations

Expected scale during the first year:

- To be defined with backend architecture

Future scalability considerations:

- Multi-tenant support
- Integration with external systems
- Document auditing and versioning

---

## Security Considerations

- Mandatory authentication for all users
- Encryption of sensitive data
- Secure management of uploaded files
- Validation of file types and sizes
- Access control to the repository

---

## Reliability Expectations

- To be defined with backend architecture and deployment

---

## Known Risks

| Risk | Impact |
|---|---|
| Misconfigured metadata | Users unable to categorize documents correctly |
| Insufficient file validations | Security compromised |

---

## Current Challenges

- Design flexible metadata system without hardcoding values
- Secure and configurable file validation

---

## Future Expectations

- Add approval workflows
- Document versioning
- Integration with external services
- Multi-tenant support

---

## UX / Design System Context

- Design source of truth: HTML prototypes with specs and custom tokens (no Figma)
- Target platforms: Web
- Primary user flows to design first: Authentication → File upload → Metadata management → Document search

---

## Final Notes

Priority: **Flexibility and configurability** over complex initial features. The system must be adaptable to different clients without changes to the codebase.

# API Design Template

## Endpoint

`METHOD /path`

Example:

`POST /users`

---

## Purpose

Describe the purpose of the endpoint.

Example:

Creates a new user account.

---

## Authentication

- Required
- Optional
- Not Required

Describe authentication and authorization requirements.

Example:

Requires authenticated admin user.

---

## Request

### Headers

| Header | Required | Description |
|---|---|---|
| Authorization | Yes | Bearer token |

---

### Path Params

| Param | Type | Required | Description |
|---|---|---|---|
| id | UUID | Yes | User identifier |

---

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| page | Number | No | Pagination page |

---

### Request Body

```json
{}
```

---

## Validation Rules

| Field | Rule | Error |
|---|---|---|
| [field] | [Required, format, length, range] | [Error code] |

---

## Business Rules

- [Rule]

---

## Response

### Success Response

Status: `200` / `201` / `204`

```json
{}
```

---

### Error Responses

| Status | Error Code | When |
|---|---|---|
| 400 | VALIDATION_ERROR | Invalid input |
| 401 | UNAUTHORIZED | Missing or invalid authentication |
| 403 | FORBIDDEN | Authenticated but not allowed |
| 404 | NOT_FOUND | Resource does not exist |
| 409 | CONFLICT | State or uniqueness conflict |
| 500 | INTERNAL_ERROR | Unexpected failure |

---

## Idempotency

Describe whether the endpoint is idempotent and how retries are handled.

---

## Pagination, Filtering, and Sorting

Describe if applicable.

---

## Rate Limiting

Describe limits and behavior when exceeded.

---

## Security Considerations

- authorization rules
- sensitive data exposure
- input sanitization
- audit logging

---

## Observability

- logs
- metrics
- tracing
- alerts

---

## Testing Considerations

- success scenarios
- validation scenarios
- authorization scenarios
- failure scenarios
- contract tests

---

## Backward Compatibility

Describe versioning and impact on existing consumers.

---

## Notes

[Additional notes]
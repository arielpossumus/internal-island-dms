# Example Backend Feature

## Feature

User Registration

---

## Goal

Allow users to create accounts using email and password.

---

## Requirements

### Functional Requirements

- Users can register with email and password.
- Email must be unique.
- Password must be hashed before persistence.
- JWT token must be returned after successful registration.

---

## Validation Rules

- Email is required.
- Email must be valid.
- Password is required.
- Password must contain at least 8 characters.

---

## Business Rules

- Duplicate emails are not allowed.
- Disabled users cannot authenticate.
- Passwords must never be stored in plain text.

---

## Suggested API

### Endpoint

`POST /auth/register`

---

### Request

```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

# Example API Design

## Endpoint

`POST /auth/login`

---

## Purpose

Authenticate users using email and password.

---

## Authentication

Not required.

---

## Request

```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

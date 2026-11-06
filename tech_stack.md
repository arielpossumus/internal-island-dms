# Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React 18+ | UI library |
| TypeScript | Static typing |
| Vite | Build tool and dev server |
| React Router | Routing and navigation |
| React Query | Server state management and caching |
| Axios | HTTP client for APIs |
| ShadCN/UI | Accessible UI components |
| Tailwind CSS | Styling and CSS utilities |
| Custom Tokens | Design system tokens (from specs and HTML prototypes) |

---

## Backend

**To be defined in next phase**

---

## Database

**To be defined in next phase**

---

## Infrastructure

**To be defined in next phase**

---

## CI/CD

**To be defined in next phase**

---

## Testing Stack

**To be defined in next phase**

---

## Observability Stack

**To be defined in next phase**

---

## Security Tooling

**To be defined in next phase**

---

## Development Conventions

### Frontend Conventions

- Use **TypeScript** throughout all frontend code
- Import components from ShadCN/UI + Tailwind for base UI
- Use **custom tokens** from `tokens/` for colors, spacing, typography (never hardcode values)
- Implement from specs in `specs/` when available
- Use **React Query** for server state
- Keep components without business logic (dumb components)
- Use **custom hooks** for reusable logic
- Validate data in frontend (UX) and backend (security)
- Prefer composition over inheritance in components

### File Structure Convention

```
src/
├── components/         reusable components
├── pages/             pages/routes
├── hooks/             custom hooks
├── services/          API clients and calls
├── types/             TypeScript types
├── utils/             utilities
├── tokens/            design system
└── tests/             tests
```

### API Integration Convention

- Use **Axios** with centralized instance
- **React Query** for queries (GET) and mutations (POST, PUT, DELETE)
- Centralize endpoints in `services/api.ts` or similar
- Consistent error handling
- Automatic retries in queries according to configuration

### State Management Convention

- **Local state**: useState in component
- **URL state**: useSearchParams, useParams
- **Server state**: React Query (queries + mutations)
- **Global state**: Context API + useReducer if needed (minimize)

### Testing Convention

- Unit tests: pure components, utils, hooks
- Integration tests: critical flows (auth, upload)
- E2E: complete user flows (TBD)

### Git Workflow

- **Branches**: `feat/`, `fix/`, `ux/`, `ds/` according to change type
- **Commits**: Descriptive and in English
- **PRs**: Clear description, mandatory review
- **Main**: Always deployable

---

## Environment Strategy

| Environment | Purpose |
|---|---|
| development | Local, with hot reload |
| staging | Production mirror (to be defined) |
| production | End users |

---

## Deployment Strategy

**To be defined in next phase**

---

## Final Notes

**Priorities:**
1. Flexibility and configurability (white-label)
2. Static typing (TypeScript)
3. Developer experience (Vite + hot reload)
4. Accessible components (ShadCN)
5. Clean and predictable state (React Query + Context)

# Isla DMS - Frontend

Frontend application for Isla DMS (Island Digital Management System), a white-label document management platform built with React, Vite, TypeScript, ShadCN/UI, and Tailwind CSS.

## Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: ShadCN/UI + Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Query (TanStack Query) + Context API
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # ShadCN/UI components
├── pages/              # Route pages/screens
├── hooks/              # Custom React hooks
├── services/           # API clients and calls
├── types/              # TypeScript types and interfaces
├── utils/              # Utility functions
├── tokens/             # Design system tokens
├── lib/                # Library utilities (e.g., cn for class merging)
└── main.tsx            # Entry point
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build

Build for production:

```bash
npm run build
```

Output is in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Configuration

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Path Aliases

Path aliases are configured in `tsconfig.json` and `vite.config.ts`:

- `@/*` → `./src/*`

Example usage:

```ts
import { Button } from '@/components/ui/button'
import { useDocuments } from '@/hooks/useDocuments'
```

## Design System

### Tokens

Design system tokens are located in the parent `tokens/` folder:

- **Primitives** (`tokens/primitives/`): Raw colors
- **Foundations** (`tokens/foundations/`): Spacing, typography, shadows, borders
- **Semantic** (`tokens/semantic/`): Purpose-driven tokens

Never hardcode colors, spacing, or typography. Always use tokens.

### Components

Use ShadCN/UI components and extend them as needed:

```tsx
import { Button } from '@/components/ui/button'

export function MyButton() {
  return <Button>Click me</Button>
}
```

## API Integration

### Services

API calls are centralized in `src/services/`:

```ts
// src/services/documents.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const getDocuments = async () => {
  const { data } = await api.get('/documents')
  return data
}
```

### React Query

Server state is managed with React Query:

```tsx
import { useQuery } from '@tanstack/react-query'
import { getDocuments } from '@/services/documents'

export function DocumentList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map((doc) => (
        <li key={doc.id}>{doc.name}</li>
      ))}
    </ul>
  )
}
```

## State Management

- **Local State**: Use `useState` within components
- **URL State**: Use `useSearchParams` or `useParams` for route-based state
- **Server State**: Use React Query (queries and mutations)
- **Global State**: Use Context API + `useReducer` if needed (minimize usage)

## TypeScript

All code is strictly typed. Use TypeScript interfaces for API responses:

```ts
// src/types/document.ts
export interface Document {
  id: string
  name: string
  metadata: Record<string, unknown>
  createdAt: string
}
```

## Development Conventions

### Components

- Keep components focused and reusable
- Extract logic into custom hooks
- Use composition over inheritance
- Avoid business logic in UI components

### Files

- Component files: `PascalCase` (e.g., `Button.tsx`)
- Other files: `camelCase` (e.g., `useDocuments.ts`)
- Test files: `*.test.ts` or `*.test.tsx`

### Imports

Use path aliases and absolute imports:

```tsx
// ✓ Good
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ✗ Avoid
import { Button } from '../../../components/ui/button'
```

## Testing

Testing configuration is to be added. Recommended stack:

- Vitest for unit/integration tests
- React Testing Library for component tests

## Performance

- Lazy load routes with `React.lazy()`
- Memoize expensive components with `React.memo`
- Use `useCallback` for memoized callbacks
- Monitor bundle size with `npm run build` output

## Browser Support

Modern browsers (ES2023+). See `tsconfig.json` target.

## Contributing

Follow the git workflow:

- Branch naming: `feat/`, `fix/`, `ux/`, `ds/`
- Descriptive commits in English
- Mandatory code review before merging to main

## License

See root `LICENSE` file.

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [ShadCN/UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

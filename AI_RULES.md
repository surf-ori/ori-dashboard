# AI Rules — ORI Quality Dashboard

## Tech Stack Overview

- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and dev server
- **Tailwind CSS** for utility-first styling with custom brand tokens
- **shadcn/ui** component library (built on Radix UI primitives) for UI components
- **React Router** for client-side routing and navigation
- **Recharts** for data visualization (charts and graphs)
- **TanStack Query** for server state management and caching
- **Lucide React** for consistent iconography
- **Zod** for schema validation and type inference
- **React Hook Form** for form handling with validation

## Component & Library Guidelines

### UI Components (shadcn/ui)
Use shadcn/ui components for all UI elements. They are pre-installed and configured:

| Use Case | Component | Location |
|----------|-----------|----------|
| Buttons | `Button` | `@/components/ui/button` |
| Cards | `Card` | `@/components/ui/card` |
| Forms | `Input`, `Label`, `Select` | `@/components/ui/input`, `@/components/ui/label`, `@/components/ui/select` |
| Tables | `Table` | `@/components/ui/table` |
| Badges | `Badge` | `@/components/ui/badge` |
| Charts | Charts from Recharts | `recharts` |
| Toasts | `Toaster`, `toast()` | `@/components/ui/sonner` |
| Navigation | `Tabs`, `Sidebar` | `@/components/ui/tabs`, `@/components/ui/sidebar` |
| Dialogs | `Dialog`, `Popover` | `@/components/ui/dialog`, `@/components/ui/popover` |

### Icons
Always use **Lucide React** for icons:
```tsx
import { Home, CheckCircle2, Layers } from 'lucide-react';
```

### Charts & Data Visualization
Use **Recharts** for all charts:
- `LineChart` for timelines and trends
- `BarChart` for comparisons
- `ResponsiveContainer` for responsive sizing
- Always provide meaningful tooltips and legends

### Styling Rules
- Use **Tailwind CSS** utility classes exclusively
- Follow the SURF brand color tokens defined in `index.css`
- Use semantic color variables: `--primary`, `--accent`, `--destructive`, `--success`, `--warning`, `--info`
- Maintain responsive design with Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Use `hsl(var(--...))` for theme-aware colors

### State Management
- Use **React Context** for global app state (see `DataContext.tsx`)
- Use **TanStack Query** for server data fetching
- Use **useState** for local component state
- Avoid prop drilling with Context providers

### Routing
- Use **React Router** for navigation
- Keep routes in `src/App.tsx`
- Pages go in `src/pages/`
- Use `NavLink` from `@/components/NavLink` for active state styling

### Data & Types
- Define all types in `src/data/types.ts`
- Use TypeScript strict mode
- Mock data goes in `src/data/mockData.ts`
- Use Context for data sharing between components

### File Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (do not edit)
│   └── dashboard/       # Custom dashboard components
├── data/                # Types, mock data, context
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route pages
└── assets/              # Static assets
```

### Naming Conventions
- **Directories**: lowercase (`src/components`, `src/pages`)
- **Files**: PascalCase for components, camelCase for utilities
- **Components**: Export as default, use named exports for hooks/utils
- **Variables**: camelCase, constants in UPPER_SNAKE_CASE

### Best Practices
1. **Keep components small** — aim for 100 lines or less
2. **Extract reusable logic** into custom hooks
3. **Use TypeScript** for all new code
4. **No partial implementations** — write complete, working code
5. **Use existing patterns** — follow the style of existing components
6. **No server-side code** in Vite apps (use Agent mode for backend)

### Color Palette (SURF Brand)
```css
--primary: 30 100% 45%;      /* Orange #E67300 */
--accent: 203 100% 38%;      /* Blue #0077C0 */
--success: 146 100% 27%;     /* Green #008942 */
--destructive: 4 73% 51%;    /* Red #DF3226 */
--warning: 30 100% 45%;      /* Orange (re-use primary) */
--info: 203 100% 38%;        /* Blue (re-use accent) */
```

### When to Create New Files
- **New component**: Create in `src/components/dashboard/` or `src/components/ui/`
- **New page**: Create in `src/pages/` and add route in `App.tsx`
- **New hook**: Create in `src/hooks/`
- **New utility**: Create in `src/lib/`
- **New type**: Add to `src/data/types.ts`

### Do NOT
- Edit files in `src/components/ui/` (shadcn components)
- Use inline styles — always use Tailwind
- Add server-side code (API routes, database) — use Agent mode
- Install packages without checking `package.json` first
- Create partial implementations or TODO placeholders
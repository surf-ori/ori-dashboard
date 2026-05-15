# AI Rules — ORI Quality Dashboard



## ORI Quality Dashboard — Implementation Plan

A data quality dashboard for Dutch research institutions to assess the quality of Open Research Information across multiple sources (OpenAlex, Crossref, OpenAIRE, CRIS systems). Clean, professional design with mock data.

### Architecture
- **Sidebar navigation** with filters (Organisation, CERIF Entity, Source, Type)
- **Tab bar** across the top for the 5 main screens: Start, Completeness, Coverage, Accuracy, Enrichment
- **Mock data** for ~5 Dutch RPOs (VU Amsterdam, UvA, TU Delft, Utrecht University, University of Groningen) with realistic sources

### Screens

#### 1. Start Screen (Home)
- Welcome text explaining the dashboard purpose (Barcelona Declaration context)
- Summary KPI cards: number of sources, organisations, and aggregate quality scores (completeness %, coverage %, accuracy %)
- Organisation and CERIF Entity selectors as entry point

#### 2. Coverage Screen
- **Filters**: Organisation, Primary Source, Compare Sources (multi-select), CERIF Entity
- **Toggle** between ROR-based and DOI-based comparison
- **Stacked bar chart** comparing primary source against each compare source (records only in primary, in both, only in compared)
- Clicking a bar segment reveals:
  - **Timeline** of coverage over time
  - **Details table** with records
  - **Interventions panel** with effort/impact rating and actionable guidance (e.g., DOI Resolver link)

#### 3. Completeness Screen
- **Filters**: Organisation, Source, Type, CERIF Entity
- **Metric cards** showing % for key fields: Has DOI, Has ORCID, Has ROR, Has Grant DOI, Has ISSN, Has OA Status, Corresponding Author
- **Timeline chart** (line chart) showing completeness of a selected field over time
- **Details section** with a data table showing records missing the selected field, with a mock SQL query display
- **Interventions section** (collapsible)

#### 4. Enrichment Screen (Placeholder)
- See which metadata values you can recover from other sources to enrich the records in your primary source. 
- Each row shows how many of your records are missing a valid value, and how many of those can be filled in from a comparing source.

#### 5. Accuracy Screen (Placeholder)
- Actionable data on records with conflicting information between sources. 
- See where values disagree and how to resolve them, so the institutional record stays consistent across the open research ecosystem.

#### 6. Mock data
Make the data editable for demo purosous.

### Components to Build
- `DashboardLayout` — sidebar + content area with tab navigation
- `FilterPanel` — reusable sidebar filters
- `KPICard` — metric display card with percentage/number
- `TimelineChart` — line chart using Recharts
- `CoverageBarChart` — stacked horizontal bar chart using Recharts
- `DataTable` — sortable table for record details
- `InterventionPanel` — effort/impact display with action guidance
- Mock data module with realistic Dutch RPO data

### Design
- Clean white background, subtle gray borders
- Professional color palette suitable for academic/government context using the SURF design system (for more see https://merkportaal.surf.nl)
- Responsive layout (desktop-first but usable on tablet)

## Core tokens (from `colors_and_type.css`)

```css
--surf-orange: #E67300;   /* primary interaction color */
--surf-black:  #000000;   /* primary structural color */
--surf-grey:   #CCCCCC;

/* Support palette */
--surf-red: #DF3226;  --surf-yellow: #FEDB00;  --surf-blue: #0077C0;
--surf-green-dark: #008942;  --surf-green-light: #B8E3C9;  --surf-purple: #772583;

--font-display: "Nunito", system-ui;      /* headings — 700 / 800 */
--font-body:    "Source Sans Pro", system-ui;  /* body — 400 / 600 */
```

## Signature elements

- **Basiskader** — thick black rounded-rectangle frame (4–5px border, 24–32px radius) wrapping hero compositions and photography. The single most recognisable structural element of the brand.
- **Orange as accent only** — primary buttons, links, eyebrows, focus rings. Never as a body text colour.
- **Sentence-case Dutch headlines** in Nunito 800/900 — verbs and infinitives, no Title Case.
- **Photography over illustration** — warm daylight portraits of students and researchers, framed inside the basiskader.

## Common gotchas

- Don't use emoji. Don't use gradient backgrounds. Don't use bouncy animations.
- Don't write copy in `u`-form Dutch unless writing to boards/executives.
- Don't title-case English headings — sentence case throughout.
- Use the `--surf-orange-700` darker shade for hover; don't lighten on hover.
- Icons are line-only, 2px stroke, rounded ends — never filled, never coloured (except SURF orange).



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
└── assets/              # Static assets; fonts, logos, favico
└── fonts/               # Fonts
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
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

## CONTENT FUNDAMENTALS

SURF's writing voice comes from its public *Schrijfwijzer* (writing guide) plus observation of merkportaal.surf.nl and surf.nl copy.

### Language
- **Default: Nederlands.** Public‑facing copy is in Dutch. English is reserved for international communication, technical documentation aimed at non‑Dutch audiences, and select product UIs.
- **No corporate jargon.** SURF favours plain, accessible language over consultancy‑speak.

### Voice & tone
- **Cooperative, not corporate.** SURF *is* its members — copy reflects that. Use **we / wij / ons / samen** frequently.
- **Direct address.** Use **je / jij / jouw** (informal Dutch "you"), not the formal *u*, unless writing to a board‑level audience. Examples on the merkportaal: *"Hier vind je de lettertypes die we gebruiken bij SURF."* *"Heb je hier vragen over?"*
- **Action‑oriented headlines.** Verbs and infinitives — *"Samen aanjagen van vernieuwing"*, *"Duik in onze richtlijnen…"*. Avoid noun‑stack headlines.
- **Helpful, not promotional.** Body copy explains *what you can do* with the thing, not how impressive SURF is.
- **Confident, never boastful.** SURF is the established cooperative for Dutch research IT — there's no need to oversell. State capabilities calmly.

### Casing & punctuation
- **Sentence case** for headings, buttons and links — *not* Title Case. The brand portal models this: *"Samen aanjagen van vernieuwing"*, *"Voor richtlijnen en templates"*.
- **SURF** is always uppercase. Never "Surf" or "surf" except inside the URL.
- **Member names** capitalised normally (Universiteit Utrecht, TU Delft).
- **No exclamation marks** in product/marketing copy. Enthusiasm comes from the writing, not punctuation.
- Dutch quotation marks: `"…"` is acceptable in digital contexts; the merkportaal uses straight quotes.

### Vocabulary cues
- **Members** = *leden* (or *aangesloten instellingen*).
- **Innovation** = *vernieuwing* (preferred over *innovatie*, which is fine but corporate).
- **Together / collaboration** = *samen*, *samenwerken* — a load‑bearing word for SURF.
- **Education and research** = *onderwijs en onderzoek* — the two‑word pairing is part of the brand's identity.
- Service names are usually plain Dutch nouns: *SURFconext, SURFdrive, SURFsharekit, SURFmailfilter* — lowercased after the `SURF` prefix, no space, no hyphen.

### Emoji & symbols
- **No emoji** in marketing or product UI. The brand portal contains none; SURF's tone is professional.
- Unicode bullet symbols (`•`, `→`) appear sparingly in navigation. Arrows (`→`) are common as a "more" affordance after link text.
- Iconography is delivered as **flat orange/black line icons** — never as emoji substitutes.

### Examples (lifted from merkportaal.surf.nl)
- *"Duik in onze richtlijnen, communicatiemiddelen en templates en draag bij aan een herkenbare en consistente huisstijl van SURF."*
- *"Ons kleurenpallet bepaalt de visuele hiërarchie voor het ontwerp."*
- *"Hier vind je de lettertypes die we gebruiken bij SURF. Het zijn open source fonts. Je kan ze meteen downloaden voor gebruik."*

---

## VISUAL FOUNDATIONS

### Colors
SURF builds on **two base colors**: orange `#E67300` and black `#000000`, padded with a light grey `#CCCCCC` and orange tints. A six‑colour **support palette** adds expression and is used to differentiate or highlight: red `#DF3226`, yellow `#FEDB00`, blue `#0077C0`, dark green `#008942`, light green `#B8E3C9`, purple `#772583`. Each support colour also exists in an **80% transparent** variant, used for overlays, fill‑in shapes and second‑layer compositions on top of imagery.

Orange is the **interaction colour** (links, primary buttons, focus rings, accents). Black is the **structural colour** (text, frames, footer, the brand container). Support colours are used in compositions, illustrations, tags and decorative panels — never for body text.

### Type
- **Headings (Koppen): Nunito** — Bold (700) and Extra Bold (800). Used for all H1–H6, large numerals, and big statements. Tight letterspacing, generous size jumps.
- **Body: Source Sans Pro** (we ship Source Sans 3, the maintained release on Google Fonts) — Regular 400 for paragraphs, Semibold 600 for emphasis/labels, Bold 700 for inline strong.
- **Office templates: Aptos.** Outside the scope of this design system but documented for completeness.

Headings are usually **2× to 3×** the size of body text, and rely on weight + scale, not colour, for hierarchy. Body text sits at ~17px with a `1.5` line‑height for comfortable Dutch reading (Dutch words are long).

### Spacing
A simple 4px‑based scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Sections breathe — SURF compositions are not dense. Vertical rhythm between hero, intro, and content blocks is typically 64–96px on desktop.

### Backgrounds
- **Predominantly white** with black text. Clean and uncluttered.
- **Photography** is the main "filling" device — full‑bleed photos in the hero, mid‑page, and as cards. SURF photography style is warm, human, slightly editorial: students, researchers, classrooms, labs, hands on keyboards, in‑situ portraits. Natural light. Real people, not stock metaphors.
- **No gradients** in flat compositions. The orange is solid.
- **No repeating patterns / textures** as decoration.
- The **SURF basiskader** ("base frame") — a thick black rounded‑rectangle border — is used to contain hero compositions, photos and illustrations. This is the single most distinctive structural element of the brand.

### The "basiskader" and the logo curl
A thick **black, rounded‑rectangle frame** with a corner radius around 24–32px. It wraps featured photographs, brand statements and key UI cards. The **SURF logo itself is a miniature basiskader** — the wordmark sits in a black rounded shape with a distinctive curl that loops out to a smaller rounded square on the right. This curl is the brand's structural signature: the same shape language scales from logo (`assets/logo/SURF_fc.svg`) up to full‑bleed hero containers.

### Animation
SURF uses motion sparingly. When present:
- **Fades and short slides** (200–300ms, ease‑out) for menu reveals, modals, hover transitions.
- **No bouncing**, no spring physics, no parallax. Restraint over flourish.
- Hover transitions on links: colour shift only, no underline animation.

### Interaction states
- **Hover (links / buttons):** darken by ~12% (`--surf-orange-700` for orange surfaces) OR add an underline if not already present. No size change.
- **Press:** drop opacity to ~0.85 or apply `transform: translateY(1px)`. Never scale below 0.97.
- **Focus:** 2px solid `--surf-orange` outline with 2px offset — accessibility is explicit (the brand has a *Digitale toegankelijkheid* guideline page).
- **Disabled:** 50% opacity, no pointer events.

### Borders, shadows, elevation
- Borders are **functional**, not decorative — 1px `#D9D9D9` for inputs and dividers. The black 4px frame (basiskader) is the only "thick" border in the system and is reserved for brand‑level containers.
- **Shadows are minimal.** A faint `0 4px 14px rgba(0,0,0,0.08)` is enough for floating cards and menus. No coloured shadows, no neon glow.
- Inner shadows are not used.

### Capsules vs. gradients for text-on-image
When placing copy over photography, SURF uses **solid orange or black filled containers** (capsules / cards / the basiskader frame), not protection gradients. Text on top of an image is always inside a contained shape.

### Layout
- Centered max‑width content area (~1200–1280px) with generous side padding (24–48px) on desktop.
- The header bar is sticky/fixed and lightweight — wordmark left, primary nav centre/right, search affordance.
- Footer is two‑column on desktop, stacked on mobile, with the wordmark and "Volg ons" socials.

### Transparency & blur
- The **80% transparent support colours** are the main use of transparency — flat colour blocks layered over photography in compositions.
- **Backdrop blur** is not part of the brand. Avoid frosted glass effects.

### Photography
- **Warm**, daylight, real interiors and exteriors of Dutch educational settings.
- People are the focal point — at desks, in labs, in conversation.
- Not heavily filtered. Light grain at most; no heavy colour grading.
- Cropped to fit the rounded basiskader.

### Corner radii
- **Inputs / small chips:** 4–8px.
- **Buttons:** 8–12px (slightly rounded; never full‑pill except for tags).
- **Cards:** 12–20px.
- **Basiskader / hero frames:** 24–32px — the brand's signature radius.

### Cards
Soft white surfaces with a subtle 1px border or a tiny shadow, **never both**. Rounded ~16–20px. Internal padding is generous (24–32px). The orange is used for the affordance — a CTA link with an arrow — not for the whole card chrome.

---

## ICONOGRAPHY

The merkportaal has a dedicated *Iconen* page. SURF's icons are:
- **Flat, line‑based, single‑colour** — almost always **orange (`#E67300`) on white** or **black on white**.
- **Rounded line endings**, ~2px stroke weight at 24px size.
- **No fills** for primary product icons. Decorative/illustrative icons on the homepage and in reports occasionally use a solid orange fill block, but UI icons are line‑only.
- **No emoji.** Ever, in any brand surface.
- **No coloured-square or sticker-style icons.** The system stays calm.

**This skill currently substitutes** a close‑match line icon CDN — **Lucide** — for live previews, because the SURF icon SVGs are only available as a downloadable ZIP behind the merkportaal Downloads page (not directly linkable). Lucide matches the stroke style closely (2px rounded line). When generating production work, prefer the official SURF icon set from the brand portal downloads.

> **⚠️ FLAG:** Icons in previews come from Lucide as a stand‑in. Please drop the official SURF icon set into `assets/icons/` and we'll switch the kit to use it.

---

## ⚠️ Caveats & flags

- **No codebase or Figma supplied.** Everything is from the public brand portal. Surf.nl and other SURF products may have additional UI conventions not captured here.
- **Official logo shipped** in `assets/logo/` — `SURF_fc.svg` is the full‑colour mark (black container + white wordmark with the signature curl); `SURF_diap.svg` is the diapositive (wordmark only) for use on imagery / dark backgrounds.
- **No real icon set.** Lucide is used as a stand‑in (see above).
- **Real photography wired in** from surf.nl: the hero, basiskader preview and photography card now use live CDN images (group on campus, EUR workspace, Eveline Crone portrait). These are hotlinked — if surf.nl rotates the asset URLs, swap them or download locally to `assets/photography/`.
- **Both fonts shipped locally.** Source Sans Pro and Nunito are in `fonts/` (full weight families, OFL).


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
# ORI Quality Dashboard

A data quality dashboard for Dutch research institutions to assess the quality of Open Research Information across multiple sources (OpenAlex, Crossref, OpenAIRE, CRIS systems).

## SURF Design System

This project is aligned with the [SURF Design System](https://github.com/surf-ori/surf-design-system).

### Fonts
- **Display font**: Nunito (for headings)
- **Body font**: Source Sans 3 (for body text)

### Colors
Following SURF brand colors:
- **Primary**: Orange (#E67300)
- **Accent**: Blue (#0077C0)
- **Success**: Green (#008942)
- **Destructive**: Red (#DF3226)

### Icons
Using Lucide React icons with SURF styling.

### Assets
- **Favicon**: Download from [SURF website](https://www.surf.nl/themes/surf/favicons/favicon.ico)
- **Logo**: SURF logo assets in `src/assets/`

## Getting Started

### Prerequisites
- Node.js 18+
- Bun or npm

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── dashboard/       # Dashboard-specific components
├── data/                # Types, mock data, context
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and theme configuration
├── pages/               # Route pages
└── assets/              # Static assets (logos, icons)
```

## Technologies

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Recharts** for data visualization
- **TanStack Query** for state management
- **Lucide React** for icons

## SURF Design System Resources

- [Design System GitHub](https://github.com/surf-ori/surf-design-system)
- [SURF Brand Portal](https://merkportaal.surf.nl)
- [SURF Favicon](https://www.surf.nl/themes/surf/favicons/favicon.ico)

## License

MIT License
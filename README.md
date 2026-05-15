# ORI Quality Dashboard

A data quality dashboard for Dutch research institutions to assess the quality of Open Research Information across multiple sources (OpenAlex, Crossref, OpenAIRE, CRIS systems).

## SURF Design System

This project is fully aligned with the [SURF Design System](https://github.com/surf-ori/surf-design-system).

### Setup Instructions

1. **Copy Font Files**
   - Copy all `.ttf` files from `surf-design-system/fonts/` to `public/fonts/`
   - This includes Nunito and Source Sans Pro font files

2. **Copy Logo Assets**
   - Copy `SURF_fc.svg` and `SURF_diap.svg` from `surf-design-system/assets/logo/` to `public/assets/logo/`

3. **Copy Favicon**
   - Copy `surf-favicon.ico` from `surf-design-system/assets/favicon/` to `public/`

4. **Install Dependencies**
   ```bash
   bun install
   ```

5. **Start Development Server**
   ```bash
   bun dev
   ```

### Design System Features

#### Typography
- **Display font**: Nunito (for headings) - Bold (700) and Extra Bold (800)
- **Body font**: Source Sans Pro (for body text) - Regular (400), Semibold (600), Bold (700)

#### Colors
Following SURF brand colors:
- **Primary**: Orange (#E67300)
- **Accent**: Blue (#0077C0)
- **Success**: Green (#008942)
- **Destructive**: Red (#DF3226)
- **Support palette**: Yellow, Light Green, Purple

#### Key Components
- **Basiskader**: Signature thick black rounded frame (4px border, 32px radius)
- **Buttons**: Primary (orange), Secondary (black), Outline, Text link
- **Cards**: White with subtle border and shadow
- **Eyebrows**: Small orange uppercase labels

#### Iconography
Using Lucide React icons styled to match SURF's flat line icon aesthetic (2px stroke, rounded ends).

### Project Structure

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

public/
├── fonts/               # Nunito and Source Sans Pro fonts
├── assets/
│   └── logo/            # SURF logo files
└── surf-favicon.ico
```

### Technologies

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** with SURF design tokens
- **shadcn/ui** component library
- **React Router** for navigation
- **Recharts** for data visualization
- **TanStack Query** for state management
- **Lucide React** for icons

### SURF Design System Resources

- [Design System GitHub](https://github.com/surf-ori/surf-design-system)
- [SURF Brand Portal](https://merkportaal.surf.nl)
- [SURF Favicon](https://www.surf.nl/themes/surf/favicons/favicon.ico)

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

## License

MIT License
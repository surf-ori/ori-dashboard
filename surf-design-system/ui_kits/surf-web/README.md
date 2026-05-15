# SURF Web UI Kit

A high-fidelity recreation of the **SURF Merkportaal / surf.nl** marketing-website style. Recreates the core patterns you'd find on the brand portal and main corporate site: top nav with breadcrumb sub-nav, hero composition with the **basiskader** brand frame layered over a photograph, content-card grid for services/topics, and the brand footer with cooperative tagline.

## Files
- `index.html` — clickable demo of a full page (home → guideline detail).
- `Header.jsx` — sticky top bar with wordmark, primary nav, search, and login CTA.
- `Hero.jsx` — full-bleed hero with the black basiskader frame and orange overlay.
- `CardGrid.jsx` — three-column content cards used for services / richtlijnen / basiselementen.
- `Breadcrumb.jsx` — secondary nav line (Home / Basiselementen / Kleuren).
- `Footer.jsx` — black/orange footer with cooperative tagline + socials.
- `Buttons.jsx` — primary, secondary, outline, text-link buttons (shared).

## How to use

```html
<link rel="stylesheet" href="../../colors_and_type.css" />
<script type="text/babel" src="Header.jsx"></script>
<script type="text/babel" src="Hero.jsx"></script>
<script type="text/babel" src="CardGrid.jsx"></script>
<script type="text/babel" src="Breadcrumb.jsx"></script>
<script type="text/babel" src="Footer.jsx"></script>
<script type="text/babel" src="Buttons.jsx"></script>
<script type="text/babel" src="app.jsx"></script>
```

Components are exported to `window` at the end of each file so they share scope across `<script>` tags.

## Caveats
- Wordmark is rendered in Nunito 900 — swap for the official SURF SVG when available.
- Icons via Lucide CDN — swap for official SURF icon set when available.
- Photography rendered as warm gradient placeholders.

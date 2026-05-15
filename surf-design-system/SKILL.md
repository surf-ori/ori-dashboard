---
name: surf-design
description: Use this skill to generate well-branded interfaces and assets for SURF (Dutch cooperative IT for education and research, https://www.surf.nl), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with the SURF brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Brand source:** https://merkportaal.surf.nl (Dutch)
- **Tagline:** *"Samen aanjagen van vernieuwing."*
- **Language:** Dutch first. English for international audiences.
- **Voice:** Informal (je/jij/wij), cooperative, plain. Sentence case. No exclamation marks. No emoji.
- **Logo:** Official SVG in `assets/logo/SURF_fc.svg` (full mark with curl) and `assets/logo/SURF_diap.svg` (wordmark only, for dark backgrounds — invert to white). Always uppercase "SURF".

## Files in this skill

| File | Purpose |
|---|---|
| `README.md` | Brand overview, Content Fundamentals, Visual Foundations, Iconography |
| `colors_and_type.css` | All design tokens — colors, type, spacing, radii, shadows, motion |
| `fonts/` | Source Sans Pro (TTF, full weights) — official |
| `preview/` | Single-card HTML examples for the design-system review pane |
| `ui_kits/surf-web/` | Clickable React UI kit recreating the merkportaal style |
| `assets/` | Logos, illustrations, photography (placeholders until replaced) |

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

## When you need more

- Open the brand portal at https://merkportaal.surf.nl for fresh source material.
- Ask the user for the official SURF logo SVG and the official icon set — both are gated downloads on the brand portal and are stand-ins in this skill.

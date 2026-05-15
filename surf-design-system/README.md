# SURF Design System

A working design system rebuilt from the **SURF Merkportaal** (brand portal) for use by design agents producing SURF‑branded artifacts: slides, mocks, prototypes, and production interfaces.

> **Source:** https://merkportaal.surf.nl (public brand portal, in Dutch).
> No codebase or Figma was provided — everything below was extracted from the public brand portal and from observing SURF's communications.

---

## About SURF

SURF is the cooperative IT organisation for **Dutch education and research**. Its members are universities, universities of applied sciences, MBO institutions, university medical centers, and research institutes. SURF provides high‑performance computing, secure cloud, identity, network and collaboration services to its members.

**Tagline:** *"Samen aanjagen van vernieuwing."* — "Together driving innovation."

The brand portal exists to keep all SURF communication — internal and member‑facing — visually and tonally consistent. The portal is organised into:

- **Richtlijnen** (Guidelines) → Schrijfwijzer (writing), Video, Fotografie, Digitale toegankelijkheid
- **Basiselementen** (Foundations) → Logo, Lettertype, Kleuren, Iconen, SURF basiskader
- **Downloads** — templates, fonts, logos
- **Over SURF** — context for partners

The audience is largely Dutch‑speaking: researchers, ICT directors, education staff, students. Communication is **primarily in Dutch**; English is used for international audiences. Tone is professional, plain‑spoken, and cooperative ("we" / "samen" / "jij").

---

## Index — what's in this folder

```
README.md                 ← this file (brand + content + visual foundations)
SKILL.md                  ← cross-compatible skill manifest (Claude Code-ready)
colors_and_type.css       ← CSS custom properties for the full token system
assets/                   ← logos, illustrations, photography placeholders
fonts/                    ← (empty — fonts loaded via Google Fonts)
preview/                  ← cards rendered in the Design System tab
ui_kits/
  surf-web/               ← marketing/portal website kit (index.html + JSX)
```

Cards in the **Design System** tab are organised in groups: Type, Colors, Spacing, Components, Brand.

---

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

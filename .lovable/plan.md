## Update README.md

Rewrite `README.md` with a proper project description for the GitHub repo.

### Steps

1. Copy the uploaded screenshot `ORI-Dashboard_Screenshot_2026-05-22.png` to `docs/screenshot.png` (new `docs/` folder) so GitHub can render it.
2. Replace `README.md` content with:
   - **Title**: ORI Data Quality Dashboard
   - **Intro paragraph**: Short description — a dashboard for Dutch Research Performing Organisations (RPOs) to monitor Open Research Information data quality across sources (OpenAlex, Crossref, OpenAIRE, CRIS), aligned with the Barcelona Declaration. Covers Completeness, Coverage, Accuracy, and Enrichment.
   - **Screenshot**: Markdown image wrapped in a link, so clicking opens the live demo:
     ```
     [![ORI Dashboard screenshot](docs/screenshot.png)](https://ori-dashboard.lovable.app/)
     ```
     Caption underneath (italic): *Live demo: https://ori-dashboard.lovable.app/*
   - **Background section**: Explain this dashboard is a result of the **PID to Portal** project ([link](https://communities.surf.nl/en/open-research-information/article/from-pid-to-portal-strengthening-the-open-research-information)), which is part of the **Open Research Information Program 2025–2030** ([link](https://communities.surf.nl/open-research-information/artikel/open-research-information-program-2025-2030-published)).
   - **Mission blockquote**: > "All information about Dutch publicly funded research and its results are openly available and reusable."
   - **Tech stack note** (brief): React + Vite + Tailwind + Recharts, mock data for demonstration.

### Files

- New: `docs/screenshot.png` (copied from upload)
- Modified: `README.md`

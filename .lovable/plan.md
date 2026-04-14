

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

#### 2. Completeness Screen
- **Filters**: Organisation, Source, Type, CERIF Entity
- **Metric cards** showing % for key fields: Has DOI, Has ORCID, Has ROR, Has Grant DOI, Has ISSN, Has OA Status, Corresponding Author
- **Timeline chart** (line chart) showing completeness of a selected field over time
- **Details section** with a data table showing records missing the selected field, with a mock SQL query display
- **Interventions section** (collapsible)

#### 3. Coverage Screen
- **Filters**: Organisation, Primary Source, Compare Sources (multi-select), CERIF Entity
- **Toggle** between ROR-based and DOI-based comparison
- **Stacked bar chart** comparing primary source against each compare source (records only in primary, in both, only in compared)
- Clicking a bar segment reveals:
  - **Timeline** of coverage over time
  - **Details table** with records
  - **Interventions panel** with effort/impact rating and actionable guidance (e.g., DOI Resolver link)

#### 4. Accuracy Screen (Placeholder)
- Tab accessible, shows "Coming soon" state with brief description of planned functionality

#### 5. Enrichment Screen (Placeholder)
- Tab accessible, shows "Coming soon" state explaining it will show record-level metadata from different sources

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
- Professional color palette suitable for academic/government context
- Responsive layout (desktop-first but usable on tablet)


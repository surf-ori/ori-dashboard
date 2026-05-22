# Extend organisations mock data with record counts

Add four new columns to the `Organisation` records so each row carries CRIS, OpenAlex, and OpenAIRE record counts plus the CRIS repository host.

## Data model changes

In `src/data/types.ts`, extend `Organisation`:

- `crisRecords: number | null` — null means "not in CRIS"
- `crisRepository: string | null` — repository hostname, null when not in CRIS
- `openalexWorks: number | null` — null when unknown ("—")
- `openaireePubs: number | null` — null when unknown ("—")

Using `null` for "—" / "not in CRIS" keeps the type numeric where present and avoids magic strings.

## Mock data updates

In `src/data/mockData.ts`, update every entry in `organisations` with the values from the supplied table. Also correct the KNAW `rorId` to `043c0p156` and SURF `rorId` to `009vhk114` per the table.

## Editable table compatibility

`MockDataScreen` renders organisations through `EditableTable`. The component derives columns from object keys, so new fields will surface automatically. No UI changes required, but verify nullable numeric cells render cleanly (display as empty / "—").

## Out of scope

No new screens, charts, or KPIs that consume these fields — this plan only seeds the data. Downstream visualisations can be wired up in a follow-up.

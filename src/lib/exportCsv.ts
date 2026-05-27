import type { DetailRecord } from '@/data/types';

function escapeCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function triggerDownload(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 80) || 'records';
}

export function exportRecordsToCsv(records: DetailRecord[], title: string) {
  const headers = ['id', 'title', 'doi', 'authors', 'year', 'sources'];
  const rows = records.map(r => [
    r.id,
    r.title,
    r.doi ?? '',
    r.authors,
    r.year,
    r.sources.join('|'),
  ]);
  const csv = [headers, ...rows].map(row => row.map(escapeCell).join(',')).join('\n');
  triggerDownload(csv, `${slugify(title)}.csv`);
}

export function exportCompletenessRecordsToCsv(
  records: DetailRecord[],
  sources: string[],
  selectedField: string,
  title: string,
) {
  const headers = ['id', 'title', 'doi', 'year', ...sources.map(s => `${s}_${selectedField}`)];
  const rows = records.map(r => [
    r.id,
    r.title,
    r.doi ?? '',
    r.year,
    ...sources.map(s => {
      if (!r.sources.includes(s as DetailRecord['sources'][number])) return 'not-in-source';
      const missing = r.missingFieldsBySource?.[s as DetailRecord['sources'][number]] ?? [];
      return missing.includes(selectedField) ? 'missing' : 'present';
    }),
  ]);
  const csv = [headers, ...rows].map(row => row.map(escapeCell).join(',')).join('\n');
  triggerDownload(csv, `${slugify(title)}.csv`);
}

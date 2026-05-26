import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DetailRecord, Source } from '@/data/types';

interface CompletenessRecordsTableProps {
  records: DetailRecord[];
  title: string;
  selectedField: string;
  selectedFieldLabel: string;
  primarySource: Source;
  sqlQuery?: string;
}

const COMPARE_SOURCES: Source[] = ['CRIS', 'OpenAlex', 'OpenAIRE', 'Crossref'];

type Status = 'present' | 'missing' | 'absent';

function statusFor(rec: DetailRecord, src: Source, field: string): Status {
  if (!rec.sources.includes(src)) return 'absent';
  const missing = rec.missingFieldsBySource?.[src] ?? [];
  return missing.includes(field) ? 'missing' : 'present';
}

function StatusCell({ status }: { status: Status }) {
  if (status === 'present') {
    return (
      <span className="inline-flex items-center gap-1 text-success" title="Present in this source">
        <Check className="h-4 w-4" />
        <span className="text-xs font-medium">Present</span>
      </span>
    );
  }
  if (status === 'missing') {
    return (
      <span className="inline-flex items-center gap-1 text-destructive" title="Missing in this source">
        <X className="h-4 w-4" />
        <span className="text-xs font-medium">Missing</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground" title="Record is not present in this source">
      <Minus className="h-4 w-4" />
      <span className="text-xs">Not in source</span>
    </span>
  );
}

export function CompletenessRecordsTable({
  records,
  title,
  selectedField,
  selectedFieldLabel,
  primarySource,
  sqlQuery,
}: CompletenessRecordsTableProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Records where <span className="font-medium">{selectedFieldLabel}</span> is missing in{' '}
          <span className="font-medium">{primarySource}</span>. The per-source columns show whether the
          same field is available elsewhere — a green check means the value can be reused to enrich your{' '}
          {primarySource} record.
        </p>
        {sqlQuery && (
          <pre className="mt-2 rounded bg-muted p-3 text-xs font-mono text-muted-foreground overflow-x-auto">
            {sqlQuery}
          </pre>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[320px]">Title</TableHead>
                <TableHead>DOI</TableHead>
                <TableHead>Year</TableHead>
                {COMPARE_SOURCES.map(src => (
                  <TableHead
                    key={src}
                    className={cn(src === primarySource && 'bg-[hsl(var(--primary-050))] text-primary')}
                  >
                    {src}
                    {src === primarySource && <span className="ml-1 text-[10px] font-normal">(selected)</span>}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-sm max-w-[320px] truncate">{r.title}</TableCell>
                  <TableCell className="text-xs font-mono">
                    {r.doi ?? <span className="text-destructive">—</span>}
                  </TableCell>
                  <TableCell>{r.year}</TableCell>
                  {COMPARE_SOURCES.map(src => (
                    <TableCell
                      key={src}
                      className={cn(src === primarySource && 'bg-[hsl(var(--primary-050))]/40')}
                    >
                      <StatusCell status={statusFor(r, src, selectedField)} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3 + COMPARE_SOURCES.length} className="text-center text-sm text-muted-foreground py-6">
                    No records missing {selectedFieldLabel} in {primarySource}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DetailRecord } from '@/data/types';

interface DataTableProps {
  records: DetailRecord[];
  title: string;
  sqlQuery?: string;
}

export function DataTable({ records, title, sqlQuery }: DataTableProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
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
                <TableHead className="w-[350px]">Title</TableHead>
                <TableHead>DOI</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-sm max-w-[350px] truncate">{r.title}</TableCell>
                  <TableCell className="text-xs font-mono">{r.doi ?? <span className="text-destructive">—</span>}</TableCell>
                  <TableCell className="text-sm">{r.authors}</TableCell>
                  <TableCell>{r.year}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {r.sources.map(s => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

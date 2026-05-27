import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportRecordsToCsv } from '@/lib/exportCsv';
import type { DetailRecord } from '@/data/types';

interface DataTableProps {
  records: DetailRecord[];
  title: string;
}

export function DataTable({ records, title }: DataTableProps) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-start justify-between gap-3 space-y-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportRecordsToCsv(records, title)}
          disabled={records.length === 0}
        >
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Export CSV
        </Button>
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

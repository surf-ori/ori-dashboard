import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface Props<T extends Record<string, any>> {
  rows: T[];
  onChange: (rows: T[]) => void;
  /** Optional explicit column order; defaults to keys of first row */
  columns?: (keyof T & string)[];
}

export function EditableTable<T extends Record<string, any>>({ rows, onChange, columns }: Props<T>) {
  const cols = columns ?? (rows[0] ? (Object.keys(rows[0]) as (keyof T & string)[]) : []);

  const updateCell = (rowIdx: number, key: string, raw: string) => {
    const next = rows.map((r, i) => {
      if (i !== rowIdx) return r;
      const original = (r as any)[key];
      let value: any = raw;
      if (typeof original === 'number') {
        const n = Number(raw);
        value = Number.isFinite(n) ? n : 0;
      } else if (Array.isArray(original) || (original && typeof original === 'object')) {
        try { value = JSON.parse(raw); } catch { value = original; }
      }
      return { ...r, [key]: value };
    });
    onChange(next);
  };

  const deleteRow = (idx: number) => onChange(rows.filter((_, i) => i !== idx));

  const addRow = () => {
    const template = rows[0] ? Object.fromEntries(Object.entries(rows[0]).map(([k, v]) => {
      if (typeof v === 'number') return [k, 0];
      if (Array.isArray(v)) return [k, []];
      if (v && typeof v === 'object') return [k, {}];
      return [k, ''];
    })) : {};
    onChange([...rows, template as T]);
  };

  return (
    <div className="space-y-2">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map(c => (
                <TableHead key={c} className="text-xs font-mono uppercase tracking-wide">{c}</TableHead>
              ))}
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {cols.map(c => {
                  const val = (row as any)[c];
                  const isComplex = val !== null && typeof val === 'object';
                  const display = isComplex ? JSON.stringify(val) : val ?? '';
                  return (
                    <TableCell key={c} className="p-1 align-top">
                      <Input
                        value={String(display)}
                        onChange={e => updateCell(idx, c, e.target.value)}
                        className="h-8 text-xs font-mono"
                      />
                    </TableCell>
                  );
                })}
                <TableCell className="p-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteRow(idx)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
        <Plus className="h-3.5 w-3.5" /> Add row
      </Button>
    </div>
  );
}

export function JsonEditor({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="space-y-1.5">
      <textarea
        value={text}
        onChange={e => {
          setText(e.target.value);
          try { onChange(JSON.parse(e.target.value)); setErr(null); }
          catch (ex: any) { setErr(ex.message); }
        }}
        className="w-full min-h-[200px] rounded-md border bg-card p-3 font-mono text-xs"
      />
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

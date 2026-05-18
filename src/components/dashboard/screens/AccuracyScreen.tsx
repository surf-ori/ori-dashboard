import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useDashboardData } from '@/data/DataContext';
import { DataTable } from '@/components/dashboard/DataTable';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { MatchingMethodSelector } from '@/components/dashboard/MatchingMethodSelector';
import { cn } from '@/lib/utils';
import type { DashboardFilters, MatchingMethod, Source } from '@/data/types';

interface Props {
  filters: DashboardFilters;
  onMatchingMethodChange: (m: MatchingMethod) => void;
}

export function AccuracyScreen({ filters, onMatchingMethodChange }: Props) {
  const { accuracyComparison, coverageComparisons, detailRecords, interventions, completenessTimeline, totalRecords: ctxTotal } = useDashboardData();
  const a = accuracyComparison;
  const primary = filters.source;
  const [compare, setCompare] = useState<Source>(a.compareSource);
  const [selected, setSelected] = useState<{ kind: 'conflict' | 'agreement'; field: string } | null>({
    kind: 'conflict', field: a.conflicts[0].field,
  });

  const matchBy = filters.matchingMethod;

  // Derive record counts: primary = total records (mock data), both/compare from Coverage comparisons.
  const cov = coverageComparisons.find(c => c.compareSource === compare);
  const recordsInPrimary = ctxTotal;
  const recordsInBoth = cov ? cov.inBoth : a.recordsInBoth;
  const recordsInCompare = cov ? cov.inBoth + cov.onlyInCompared : a.recordsInCompare;
  const totalRecords = recordsInPrimary + recordsInCompare - recordsInBoth;

  // Derive absolute conflict/agreement counts from percentage of records in both sources.
  const conflicts = a.conflicts.map(c => ({ ...c, count: Math.round((c.percentage / 100) * recordsInBoth) }));
  const agreements = a.agreements.map(c => ({ ...c, count: Math.round((c.percentage / 100) * recordsInBoth) }));

  const selectedItem = selected
    ? (selected.kind === 'conflict' ? conflicts : agreements).find(c => c.field === selected.field)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-2">Data quality</div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight mb-1">Accuracy</h1>
        <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          Find records where sources disagree, and see where the values line up. A clear view of conflicts
          helps you keep the institutional record consistent across the open research ecosystem.
        </p>
      </div>

      <FilterSummary filters={filters} recordCount={totalRecords} />

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1.5 block">Compare source</Label>
          <Select value={compare} onValueChange={(v) => setCompare(v as Source)}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="OpenAlex">OpenAlex</SelectItem>
              <SelectItem value="OpenAIRE">OpenAIRE</SelectItem>
              <SelectItem value="Crossref">Crossref</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <MatchingMethodSelector value={matchBy} onChange={onMatchingMethodChange} />
      </div>

      <div className="rounded-2xl border border-border-soft bg-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
          <div className="rounded-2xl border border-border-soft bg-card p-6 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight">{(recordsInPrimary / 1000).toFixed(0)}k</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--foreground-2))' }}>records in <strong className="text-foreground">{primary}</strong> (primary)</p>
          </div>
          <ArrowRight className="hidden md:block h-6 w-6 mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <div className="rounded-2xl bg-[hsl(var(--primary-050))] border border-[hsl(var(--primary-100))] p-6 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-primary">{(recordsInBoth / 1000).toFixed(0)}k</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--foreground-2))' }}>records in <strong className="text-foreground">both sources</strong></p>
            <p className="text-[10px] uppercase tracking-[0.08em] mt-1 font-semibold text-primary">matched on {matchBy.toUpperCase()}</p>
          </div>
          <ArrowLeft className="hidden md:block h-6 w-6 mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <div className="rounded-2xl border border-border-soft bg-card p-6 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight">{(recordsInCompare / 1000).toFixed(0)}k</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--foreground-2))' }}>records in <strong className="text-foreground">{compare}</strong> (compare)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border-soft bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h3 className="font-display font-extrabold text-base">Conflicts</h3>
          </div>
          <div className="space-y-2">
            {conflicts.map(c => {
              const active = selected?.kind === 'conflict' && selected.field === c.field;
              return (
                <button
                  key={c.field}
                  onClick={() => setSelected({ kind: 'conflict', field: c.field })}
                  className={cn(
                    'w-full text-left rounded-lg border border-border-soft p-3 transition-all hover:bg-muted/50 flex items-start gap-3',
                    active && 'border-destructive bg-[hsl(var(--tint-red))]'
                  )}
                >
                  <span className={cn(
                    'mt-1 h-3 w-3 rounded-full shrink-0 border-2',
                    active ? 'border-destructive bg-destructive' : 'border-muted-foreground/40'
                  )} />
                  <div className="flex-1 text-sm">
                    <span className="font-bold">{(c.count / 1000).toFixed(0)}k ({c.percentage}%)</span>
                    <span style={{ color: 'hsl(var(--foreground-2))' }}> records have </span>
                    <span className="font-semibold">{c.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <h3 className="font-display font-extrabold text-base">Agreement</h3>
          </div>
          <div className="space-y-2">
            {agreements.map(c => {
              const active = selected?.kind === 'agreement' && selected.field === c.field;
              return (
                <button
                  key={c.field}
                  onClick={() => setSelected({ kind: 'agreement', field: c.field })}
                  className={cn(
                    'w-full text-left rounded-lg border border-border-soft p-3 transition-all hover:bg-muted/50 flex items-start gap-3',
                    active && 'border-success bg-[hsl(var(--tint-green))]'
                  )}
                >
                  <span className={cn(
                    'mt-1 h-3 w-3 rounded-full shrink-0 border-2',
                    active ? 'border-success bg-success' : 'border-muted-foreground/40'
                  )} />
                  <div className="flex-1 text-sm">
                    <span className="font-bold">{(c.count / 1000).toFixed(0)}k ({c.percentage}%)</span>
                    <span style={{ color: 'hsl(var(--foreground-2))' }}> records have </span>
                    <span className="font-semibold">{c.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold">Detail view</h2>
            <Badge variant={selected!.kind === 'conflict' ? 'destructive' : 'default'}>
              {selected!.kind === 'conflict' ? 'Conflict' : 'Agreement'}: {selectedItem.label}
            </Badge>
          </div>

          <TimelineChart
            data={completenessTimeline}
            title={`${selected!.kind === 'conflict' ? 'Conflict' : 'Agreement'} rate over time — ${selectedItem.label}`}
            color={selected!.kind === 'conflict' ? 'hsl(var(--destructive))' : 'hsl(var(--success))'}
          />

          <DataTable
            records={detailRecords.slice(0, 5)}
            title={`Records: ${selectedItem.label}`}
            sqlQuery={`SELECT p.doi, p.${selectedItem.field} AS primary_value, c.${selectedItem.field} AS compare_value\nFROM ${primary.toLowerCase()} p\nJOIN ${compare.toLowerCase()} c ON p.${matchBy} = c.${matchBy}\nWHERE p.${selectedItem.field} ${selected!.kind === 'conflict' ? '!=' : '='} c.${selectedItem.field};`}
          />

          {selected!.kind === 'conflict' && (
            <InterventionPanel interventions={interventions.slice(0, 4)} />
          )}
        </div>
      )}
    </div>
  );
}

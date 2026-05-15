import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const { accuracyComparison, coverageComparisons, detailRecords, interventions, completenessTimeline } = useDashboardData();
  const a = accuracyComparison;
  const primary = filters.source;
  const [compare, setCompare] = useState<Source>(a.compareSource);
  const [selected, setSelected] = useState<{ kind: 'conflict' | 'agreement'; field: string } | null>({
    kind: 'conflict', field: a.conflicts[0].field,
  });

  const matchBy = filters.matchingMethod;

  // Derive record counts from the Coverage comparisons mock table for the selected compare source.
  const cov = coverageComparisons.find(c => c.compareSource === compare);
  const recordsInPrimary = cov ? cov.onlyInPrimary + cov.inBoth : a.recordsInPrimary;
  const recordsInBoth = cov ? cov.inBoth : a.recordsInBoth;
  const recordsInCompare = cov ? cov.inBoth + cov.onlyInCompared : a.recordsInCompare;
  const totalRecords = recordsInPrimary + recordsInCompare - recordsInBoth;

  const selectedItem = selected
    ? (selected.kind === 'conflict' ? a.conflicts : a.agreements).find(c => c.field === selected.field)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Accuracy</h1>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Actionable data on records with conflicting information between sources. See where values disagree and
          how to resolve them, so the institutional record stays consistent across the open research ecosystem.
        </p>
      </div>

      <FilterSummary filters={filters} recordCount={totalRecords} />

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Compare Source</Label>
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

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
            <div className="rounded-xl border-2 border-border bg-card p-6 text-center">
              <p className="text-4xl font-bold tracking-tight">{(recordsInPrimary / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-1">records in <strong className="text-foreground">{primary}</strong> (primary)</p>
            </div>
            <ArrowRight className="hidden md:block h-6 w-6 mx-auto text-muted-foreground" />
            <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-6 text-center">
              <p className="text-4xl font-bold tracking-tight text-primary">{(recordsInBoth / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-1">records in <strong className="text-foreground">both sources</strong></p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">matched on {matchBy.toUpperCase()}</p>
            </div>
            <ArrowLeft className="hidden md:block h-6 w-6 mx-auto text-muted-foreground" />
            <div className="rounded-xl border-2 border-border bg-card p-6 text-center">
              <p className="text-4xl font-bold tracking-tight">{(recordsInCompare / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-1">records in <strong className="text-foreground">{compare}</strong> (compare)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {a.conflicts.map(c => {
              const active = selected?.kind === 'conflict' && selected.field === c.field;
              return (
                <button
                  key={c.field}
                  onClick={() => setSelected({ kind: 'conflict', field: c.field })}
                  className={cn(
                    'w-full text-left rounded-md border p-3 transition-all hover:bg-muted/50 flex items-start gap-3',
                    active && 'border-destructive bg-destructive/5 ring-1 ring-destructive/30'
                  )}
                >
                  <span className={cn(
                    'mt-1 h-3 w-3 rounded-full shrink-0 border-2',
                    active ? 'border-destructive bg-destructive' : 'border-muted-foreground/40'
                  )} />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold">{(c.count / 1000).toFixed(0)}k ({c.percentage}%)</span>
                    <span className="text-muted-foreground"> records have </span>
                    <span className="font-medium">{c.label}</span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {a.agreements.map(c => {
              const active = selected?.kind === 'agreement' && selected.field === c.field;
              return (
                <button
                  key={c.field}
                  onClick={() => setSelected({ kind: 'agreement', field: c.field })}
                  className={cn(
                    'w-full text-left rounded-md border p-3 transition-all hover:bg-muted/50 flex items-start gap-3',
                    active && 'border-success bg-success/5 ring-1 ring-success/30'
                  )}
                >
                  <span className={cn(
                    'mt-1 h-3 w-3 rounded-full shrink-0 border-2',
                    active ? 'border-success bg-success' : 'border-muted-foreground/40'
                  )} />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold">{(c.count / 1000).toFixed(0)}k ({c.percentage}%)</span>
                    <span className="text-muted-foreground"> records have </span>
                    <span className="font-medium">{c.label}</span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
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

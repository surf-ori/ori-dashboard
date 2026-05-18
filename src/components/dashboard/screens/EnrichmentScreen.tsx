import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useDashboardData } from '@/data/DataContext';
import { DataTable } from '@/components/dashboard/DataTable';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { MatchingMethodSelector } from '@/components/dashboard/MatchingMethodSelector';
import { cn } from '@/lib/utils';
import type { DashboardFilters, MatchingMethod } from '@/data/types';

interface Props {
  filters: DashboardFilters;
  onMatchingMethodChange: (m: MatchingMethod) => void;
}

export function EnrichmentScreen({ filters, onMatchingMethodChange }: Props) {
  const { enrichmentEntities, detailRecords, interventions } = useDashboardData();
  const [selected, setSelected] = useState<{ entity: string; source: string } | null>(null);
  const totalRecords = enrichmentEntities.reduce((s, e) => s + e.totalRecords, 0);

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-2">Data quality</div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight mb-1">Enrichment</h1>
        <p className="text-sm max-w-3xl" style={{ color: 'hsl(var(--foreground-2))' }}>
          See which metadata values you can recover from other sources to enrich the records in your primary source.
          Each row shows how many of your records are missing a valid value, and how many of those can be filled in
          from a comparing source.
        </p>
      </div>

      <FilterSummary filters={filters} recordCount={totalRecords} />

      <MatchingMethodSelector value={filters.matchingMethod} onChange={onMatchingMethodChange} />

      <div className="space-y-5">
        {enrichmentEntities.map(e => (
          <div key={e.entity} className="rounded-2xl border border-border-soft bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border-soft bg-secondary/40">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="font-mono uppercase tracking-wider">{e.label}</Badge>
                <span className="font-normal" style={{ color: 'hsl(var(--foreground-2))' }}>Metadata entity</span>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-4 items-stretch">
                <div className="rounded-2xl bg-[hsl(var(--tint-red))] border border-destructive/20 p-5 text-center flex flex-col justify-center">
                  <p className="font-display text-3xl font-extrabold text-destructive">{e.missingPercentage}%</p>
                  <p className="text-xs font-mono text-destructive/80 mt-0.5">({e.missingCount.toLocaleString()})</p>
                  <p className="text-xs mt-2 leading-snug" style={{ color: 'hsl(var(--foreground-2))' }}>
                    of your records are <strong className="text-foreground">missing</strong> a valid {e.label}<br />in your primary source
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {e.recoverable.map(r => {
                    const active = selected?.entity === e.entity && selected?.source === r.source;
                    return (
                      <button
                        key={r.source}
                        onClick={() => setSelected({ entity: e.entity, source: r.source })}
                        className={cn(
                          'rounded-2xl border border-border-soft bg-card p-4 text-left transition-all hover:shadow-surf hover:border-accent group',
                          active && 'border-accent bg-[hsl(var(--tint-blue))]'
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="secondary" className="text-xs">{r.source}</Badge>
                          <Sparkles className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="font-display text-2xl font-extrabold text-accent">+{r.percentage}%</p>
                        <p className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>({r.count.toLocaleString()})</p>
                        <p className="text-xs mt-1.5 leading-snug" style={{ color: 'hsl(var(--foreground-2))' }}>
                          can be recovered from<br />&nbsp;{r.source}
                        </p>
                        <p className="text-[10px] text-accent mt-1.5 uppercase tracking-[0.08em] font-semibold">Click to view records</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Enrichment candidates</h2>
            <Badge>{selected.entity.toUpperCase()}</Badge>
            <Badge variant="outline">from {selected.source}</Badge>
          </div>
          <DataTable
            records={detailRecords.slice(0, 6)}
            title={`Records missing ${selected.entity.toUpperCase()} that can be enriched from ${selected.source}`}
            sqlQuery={`SELECT p.id, p.title, c.${selected.entity} AS proposed_value\nFROM primary_source p\nJOIN ${selected.source.toLowerCase()} c ON p.${filters.matchingMethod} = c.${filters.matchingMethod}\nWHERE p.${selected.entity} IS NULL\n  AND c.${selected.entity} IS NOT NULL;`}
          />
          <InterventionPanel interventions={interventions.slice(0, 3)} />
        </div>
      )}
    </div>
  );
}

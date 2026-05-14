import { useState } from 'react';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { useDashboardData } from '@/data/DataContext';
import { cn } from '@/lib/utils';
import type { DashboardFilters } from '@/data/types';

interface Props { filters: DashboardFilters; }

export function CompletenessScreen({ filters }: Props) {
  const { completenessMetrics, completenessTimeline, detailRecords, interventions } = useDashboardData();
  const [selectedField, setSelectedField] = useState('doi');
  const selectedMetric = completenessMetrics.find(m => m.field === selectedField);
  const filteredRecords = detailRecords.filter(r => r.missingFields.includes(selectedField));
  const totalRecords = completenessMetrics[0]?.total ?? 0;

  const mockQuery = `SELECT * FROM publications\nWHERE organisation = '${filters.organisation}'\n  AND ${selectedField} IS NULL\nORDER BY year DESC\nLIMIT 100;`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Completeness</h1>
        <p className="text-sm text-muted-foreground">
          How complete is the metadata across your records? Click a metric card to drill down.
        </p>
      </div>

      <FilterSummary filters={filters} recordCount={totalRecords} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {completenessMetrics.map(m => (
          <button
            key={m.field}
            onClick={() => setSelectedField(m.field)}
            className={cn(
              'text-left rounded-lg border bg-card p-4 transition-all hover:shadow-md',
              selectedField === m.field && 'ring-2 ring-primary border-primary'
            )}
          >
            <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
            <p className={cn(
              'text-2xl font-bold mt-1',
              m.percentage >= 80 ? 'text-success' : m.percentage >= 50 ? 'text-warning' : 'text-destructive'
            )}>
              {m.percentage}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {m.filled.toLocaleString()} / {m.total.toLocaleString()}
            </p>
          </button>
        ))}
      </div>

      {selectedMetric && (
        <>
          <TimelineChart
            data={completenessTimeline}
            title={`${selectedMetric.label} — Completeness Over Time`}
          />
          <DataTable
            records={filteredRecords}
            title={`Records Missing: ${selectedMetric.label}`}
            sqlQuery={mockQuery}
          />
          <InterventionPanel interventions={interventions.slice(0, 3)} />
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { useDashboardData, useFilteredData } from '@/data/DataContext';
import { cn } from '@/lib/utils';
import type { DashboardFilters, MetadataEntity } from '@/data/types';

interface Props { filters: DashboardFilters; }

const fieldToMetadataEntity: Record<string, MetadataEntity> = {
  doi: 'improveDOI',
  orcid: 'improveORCID',
  ror: 'improveROR',
  grantDoi: 'improveGrantDOI',
  issn: 'improveISSN',
  oaStatus: 'improveOAstatus',
  correspondingAuthor: 'improveCorrespondingAuthor',
};

export function CompletenessScreen({ filters }: Props) {
  const { interventions } = useDashboardData();
  const { completenessMetrics, completenessTimeline, detailRecords } = useFilteredData(filters);
  const [selectedField, setSelectedField] = useState('doi');
  const selectedMetric = completenessMetrics.find(m => m.field === selectedField);
  const filteredRecords = detailRecords.filter(r => r.missingFields.includes(selectedField));
  const totalRecords = completenessMetrics[0]?.total ?? 0;
  const selectedEntity = fieldToMetadataEntity[selectedField];
  const pageInterventions = interventions.filter(
    i => i.page === 'Completeness'
      && i.completenessSource === filters.source
      && i.metadataEntity === selectedEntity,
  );

  const mockQuery = `SELECT * FROM publications\nWHERE organisation = '${filters.organisation}'\n  AND ${selectedField} IS NULL\nORDER BY year DESC\nLIMIT 100;`;

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-2">Data quality</div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight mb-1">Completeness</h1>
        <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          See how complete the metadata is across your records, field by field. Select a metric to look
          closer at the records that still need attention.
        </p>
      </div>

      <FilterSummary filters={filters} recordCount={totalRecords} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {completenessMetrics.map(m => (
          <button
            key={m.field}
            onClick={() => setSelectedField(m.field)}
            className={cn(
              'text-left rounded-2xl border border-border-soft bg-card p-4 transition-all hover:shadow-surf',
              selectedField === m.field && 'border-primary bg-[hsl(var(--primary-050))]'
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">{m.label}</p>
            <p className={cn(
              'font-display text-2xl font-extrabold mt-1.5',
              m.percentage >= 80 ? 'text-success' : m.percentage >= 50 ? 'text-surf-orange-700' : 'text-destructive'
            )}>
              {m.percentage}%
            </p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
          <InterventionPanel interventions={pageInterventions} />
        </>
      )}
    </div>
  );
}

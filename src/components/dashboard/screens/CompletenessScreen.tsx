import { useState } from 'react';
import { CompletenessTimelineChart, FIELD_COLORS } from '@/components/dashboard/CompletenessTimelineChart';
import { CompletenessRecordsTable } from '@/components/dashboard/CompletenessRecordsTable';
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
  const filteredRecords = detailRecords.filter(r => {
    const missingInPrimary = r.missingFieldsBySource?.[filters.source] ?? [];
    return missingInPrimary.includes(selectedField);
  });
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
        {completenessMetrics.map(m => {
          const isSelected = selectedField === m.field;
          const color = FIELD_COLORS[m.field] ?? 'hsl(var(--primary))';
          return (
            <button
              key={m.field}
              onClick={() => setSelectedField(m.field)}
              className={cn(
                'text-left rounded-2xl border bg-card p-4 transition-all hover:shadow-surf border-l-4',
                isSelected ? 'border-primary shadow-surf' : 'border-border-soft',
              )}
              style={{ borderLeftColor: color }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color }}>
                {m.label}
              </p>
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
          );
        })}
      </div>

      {selectedMetric && (
        <>
          <CompletenessRecordsTable
            records={filteredRecords}
            title={`Metadata field missing: where ${filters.source} records have no ${selectedMetric.label}`}
            selectedField={selectedField}
            selectedFieldLabel={selectedMetric.label}
            primarySource={filters.source}
            sqlQuery={mockQuery}
          />
          <InterventionPanel
            interventions={pageInterventions}
            introText={
              <>
                Interventions and their effect over time belong together. The actions below aim to fill
                missing <span className="font-medium">{selectedMetric.label}</span> values in{' '}
                <span className="font-medium">{filters.source}</span> — the timeline shows whether those
                efforts move the line upward across successive harvests and snapshots.
              </>
            }
          >
            <CompletenessTimelineChart
              timeline={completenessTimeline}
              metrics={completenessMetrics}
              selectedField={selectedField}
              primarySource={filters.source}
            />
          </InterventionPanel>
        </>
      )}
    </div>
  );
}

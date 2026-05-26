import { useState } from 'react';
import { CoverageBarChart } from '@/components/dashboard/CoverageBarChart';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { MatchingMethodSelector } from '@/components/dashboard/MatchingMethodSelector';
import { useDashboardData, useFilteredData } from '@/data/DataContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CoverageComparison, DashboardFilters, MatchingMethod } from '@/data/types';

interface Props {
  filters: DashboardFilters;
  onMatchingMethodChange: (m: MatchingMethod) => void;
}

export function CoverageScreen({ filters, onMatchingMethodChange }: Props) {
  const { interventions } = useDashboardData();
  const { coverageComparisons, completenessTimeline, detailRecords } = useFilteredData(filters);
  const primarySource = filters.source;
  const [selectedComparison, setSelectedComparison] = useState<{ comparison: CoverageComparison; segment: string } | null>(null);

  const handleBarClick = (comparison: CoverageComparison, segment: string) => {
    setSelectedComparison({ comparison, segment });
  };

  

  const segmentLabel = selectedComparison
    ? selectedComparison.segment === 'onlyInPrimary'
      ? `Only in ${primarySource} — NOT in ${selectedComparison.comparison.compareSource}`
      : selectedComparison.segment === 'inBoth'
        ? `In both ${primarySource} and ${selectedComparison.comparison.compareSource}`
        : `Only in ${selectedComparison.comparison.compareSource} — NOT in ${primarySource}`
    : '';

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-2">Data quality</div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight mb-1">Coverage</h1>
        <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          Compare which records are present across the open sources you work with. Select a segment in the
          chart to see the records behind the numbers.
        </p>
      </div>

      <FilterSummary filters={filters} />

      <MatchingMethodSelector value={filters.matchingMethod} onChange={onMatchingMethodChange} />

      <CoverageBarChart
        data={coverageComparisons}
        primarySource={primarySource}
        onBarClick={handleBarClick}
      />

      {selectedComparison && (() => {
        const seg = selectedComparison.segment;
        const cmp = selectedComparison.comparison.compareSource;
        const onlyIn = seg === 'onlyInCompared' ? cmp : primarySource;
        const notIn = seg === 'onlyInCompared' ? primarySource : cmp;
        const pageInterventions = interventions.filter(i =>
          i.page === 'Coverage'
          && (seg === 'inBoth'
            ? ((i.coverageOnlyInSource === primarySource && i.coverageNotInCompared === cmp)
              || (i.coverageOnlyInSource === cmp && i.coverageNotInCompared === primarySource))
            : (i.coverageOnlyInSource === onlyIn && i.coverageNotInCompared === notIn)),
        );

        const segmentRecords = detailRecords.filter(r => {
          const has = (s: string) => r.sources.includes(s as typeof r.sources[number]);
          if (seg === 'inBoth') return has(primarySource) && has(cmp);
          return has(onlyIn) && !has(notIn);
        });

        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">Detail View</h2>
              <Badge>{segmentLabel}</Badge>
              <Button variant="ghost" size="sm" onClick={() => setSelectedComparison(null)}>✕ Close</Button>
            </div>
            <p className="text-sm" style={{ color: 'hsl(var(--foreground-2))' }}>
              Showing records that {selectedComparison.segment === 'inBoth'
                ? `appear in BOTH ${primarySource} and ${selectedComparison.comparison.compareSource}.`
                : selectedComparison.segment === 'onlyInPrimary'
                  ? `appear in ${primarySource} but are NOT present in ${selectedComparison.comparison.compareSource}.`
                  : `appear in ${selectedComparison.comparison.compareSource} but are NOT present in ${primarySource}.`}
            </p>

            <TimelineChart
              data={completenessTimeline}
              title={`Coverage Over Time: ${primarySource} ↔ ${selectedComparison.comparison.compareSource}`}
              color="hsl(var(--accent))"
            />

            <DataTable
              records={segmentRecords.slice(0, 10)}
              title={`Records — ${segmentLabel}`}
            />


            <InterventionPanel interventions={pageInterventions} />
          </div>
        );
      })()}
    </div>
  );
}

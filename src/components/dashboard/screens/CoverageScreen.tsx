import { useState } from 'react';
import { CoverageBarChart } from '@/components/dashboard/CoverageBarChart';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { MatchingMethodSelector } from '@/components/dashboard/MatchingMethodSelector';
import { useDashboardData } from '@/data/DataContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CoverageComparison, DashboardFilters, MatchingMethod } from '@/data/types';

interface Props {
  filters: DashboardFilters;
  onMatchingMethodChange: (m: MatchingMethod) => void;
}

export function CoverageScreen({ filters, onMatchingMethodChange }: Props) {
  const { coverageComparisons, completenessTimeline, detailRecords, interventions } = useDashboardData();
  const primarySource = filters.source;
  const [selectedComparison, setSelectedComparison] = useState<{ comparison: CoverageComparison; segment: string } | null>(null);

  const handleBarClick = (comparison: CoverageComparison, segment: string) => {
    setSelectedComparison({ comparison, segment });
  };

  

  const segmentLabel = selectedComparison
    ? selectedComparison.segment === 'onlyInPrimary'
      ? `Only in ${primarySource}`
      : selectedComparison.segment === 'inBoth'
        ? 'In Both Sources'
        : `Only in ${selectedComparison.comparison.compareSource}`
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

      {selectedComparison && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Detail View</h2>
            <Badge>{segmentLabel}</Badge>
            <Badge variant="outline">{selectedComparison.comparison.compareSource}</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedComparison(null)}>✕ Close</Button>
          </div>

          <TimelineChart
            data={completenessTimeline}
            title={`Coverage Over Time: ${primarySource} ↔ ${selectedComparison.comparison.compareSource}`}
            color="hsl(var(--accent))"
          />

          <DataTable
            records={detailRecords.slice(0, 5)}
            title={`Records — ${segmentLabel}`}
          />

          <InterventionPanel interventions={interventions.filter(i => i.effort !== 'High')} />
        </div>
      )}
    </div>
  );
}

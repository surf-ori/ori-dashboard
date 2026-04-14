import { useState } from 'react';
import { CoverageBarChart } from '@/components/dashboard/CoverageBarChart';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { coverageComparisons, completenessTimeline, detailRecords, interventions } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CoverageComparison } from '@/data/types';

export function CoverageScreen() {
  const [primarySource, setPrimarySource] = useState('OpenAlex');
  const [comparisonMode, setComparisonMode] = useState<'ror' | 'doi'>('doi');
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
        <h1 className="text-2xl font-bold tracking-tight mb-1">Coverage</h1>
        <p className="text-sm text-muted-foreground">
          Compare which records are present across different open sources. Click on a bar segment for details.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Primary Source</Label>
          <Select value={primarySource} onValueChange={setPrimarySource}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="OpenAlex">OpenAlex</SelectItem>
              <SelectItem value="Crossref">Crossref</SelectItem>
              <SelectItem value="CRIS">CRIS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Matching Method</Label>
          <div className="flex gap-1">
            <Button
              variant={comparisonMode === 'doi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonMode('doi')}
            >DOI-based</Button>
            <Button
              variant={comparisonMode === 'ror' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonMode('ror')}
            >ROR-based</Button>
          </div>
        </div>
      </div>

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
            color="hsl(174, 52%, 38%)"
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

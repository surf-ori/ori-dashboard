import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { EditableTable, JsonEditor } from '@/components/dashboard/EditableTable';
import { useDashboardData } from '@/data/DataContext';

export function MockDataScreen() {
  const d = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Mock Data</h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            All datasets backing the dashboard. Edit any value inline — changes propagate live to the
            visualisations on the other tabs. Use Reset to restore the bundled defaults.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={d.resetAll} className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Reset all
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Total records</CardTitle>
          <p className="text-xs text-muted-foreground">
            Shown in the filter bar on every screen and used to scale the Coverage chart so
            "Only in {`{primary}`}" + "In Both" sums to this value.
          </p>
        </CardHeader>
        <CardContent>
          <input
            type="number"
            value={d.totalRecords}
            onChange={e => d.setTotalRecords(Number(e.target.value) || 0)}
            className="w-48 rounded-md border bg-background px-3 py-2 text-sm font-mono"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Organisations</CardTitle></CardHeader>
        <CardContent>
          <EditableTable rows={d.organisations} onChange={d.setOrganisations} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Completeness metrics</CardTitle></CardHeader>
        <CardContent>
          <EditableTable rows={d.completenessMetrics} onChange={d.setCompletenessMetrics} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Completeness timeline</CardTitle></CardHeader>
        <CardContent>
          <EditableTable rows={d.completenessTimeline} onChange={d.setCompletenessTimeline} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Coverage comparisons</CardTitle></CardHeader>
        <CardContent>
          <EditableTable rows={d.coverageComparisons} onChange={d.setCoverageComparisons} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Detail records</CardTitle></CardHeader>
        <CardContent>
          <EditableTable rows={d.detailRecords} onChange={d.setDetailRecords} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Interventions</CardTitle></CardHeader>
        <CardContent>
          <EditableTable rows={d.interventions} onChange={d.setInterventions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enrichment entities</CardTitle>
          <p className="text-xs text-muted-foreground">Includes a nested <code className="font-mono">recoverable</code> array — edit as JSON in the cell.</p>
        </CardHeader>
        <CardContent>
          <EditableTable rows={d.enrichmentEntities} onChange={d.setEnrichmentEntities} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accuracy comparison</CardTitle>
          <p className="text-xs text-muted-foreground">Single object — edited as JSON.</p>
        </CardHeader>
        <CardContent>
          <JsonEditor value={d.accuracyComparison} onChange={d.setAccuracyComparison} />
        </CardContent>
      </Card>
    </div>
  );
}

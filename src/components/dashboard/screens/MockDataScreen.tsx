import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RotateCcw } from 'lucide-react';
import { EditableTable, JsonEditor } from '@/components/dashboard/EditableTable';
import { useDashboardData } from '@/data/DataContext';

export function MockDataScreen() {
  const d = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-2">Data quality</div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight mb-1">Data</h1>
          <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
            All datasets behind the dashboard. Edit any value inline and the changes flow straight through
            to the visualisations on the other tabs. Use Reset to restore the bundled defaults.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={d.resetAll} className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Reset all
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Announcement banner</CardTitle>
          <p className="text-xs text-muted-foreground">Shown at the top of every page. Toggle visibility and edit the label and message.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              id="announcement-enabled"
              checked={d.announcement.enabled}
              onCheckedChange={(checked) => d.setAnnouncement({ ...d.announcement, enabled: checked })}
            />
            <Label htmlFor="announcement-enabled" className="cursor-pointer">
              {d.announcement.enabled ? 'Visible on all pages' : 'Hidden'}
            </Label>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="announcement-label">Label</Label>
            <Input
              id="announcement-label"
              value={d.announcement.label}
              onChange={(e) => d.setAnnouncement({ ...d.announcement, label: e.target.value })}
              className="max-w-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="announcement-text">Message</Label>
            <Textarea
              id="announcement-text"
              value={d.announcement.text}
              onChange={(e) => d.setAnnouncement({ ...d.announcement, text: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Organisations</CardTitle>
          <p className="text-xs text-muted-foreground">
            Per-source publication counts (CRIS, OpenAlex, OpenAIRE) drive the record totals
            shown in the filter bar and accuracy comparisons on every screen.
          </p>
        </CardHeader>
        <CardContent>
          <EditableTable rows={d.organisations} onChange={d.setOrganisations} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overview cards</CardTitle>
          <p className="text-xs text-muted-foreground">Shown in the Overview grid on the Start tab.</p>
        </CardHeader>
        <CardContent>
          <EditableTable rows={d.overviewCards} onChange={d.setOverviewCards} />
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
        <CardHeader>
          <CardTitle className="text-base">Coverage timeline</CardTitle>
          <p className="text-xs text-muted-foreground">Progress of overlap segments per compared source over time. Drives the line chart on the Coverage page.</p>
        </CardHeader>
        <CardContent>
          <EditableTable rows={d.coverageTimeline} onChange={d.setCoverageTimeline} />
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

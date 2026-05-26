import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CompletenessMetric, TimelinePoint } from '@/data/types';

interface Props {
  timeline: TimelinePoint[];
  metrics: CompletenessMetric[];
  selectedField: string;
  primarySource: string;
}

// Color per metadata field — kept consistent across cards and chart.
export const FIELD_COLORS: Record<string, string> = {
  doi: 'hsl(203, 100%, 38%)',       // SURF blue
  orcid: 'hsl(146, 60%, 35%)',      // green
  ror: 'hsl(280, 55%, 45%)',        // purple
  grantDoi: 'hsl(30, 100%, 45%)',   // SURF orange
  issn: 'hsl(190, 70%, 40%)',       // teal
  oaStatus: 'hsl(340, 70%, 45%)',   // magenta
  correspondingAuthor: 'hsl(45, 90%, 40%)', // amber
};

export function CompletenessTimelineChart({ timeline, metrics, selectedField, primarySource }: Props) {
  // Pivot rows by date so all field lines share the same X axis.
  const dates = Array.from(new Set(timeline.map(p => p.date))).sort();
  const data = dates.map(date => {
    const row: Record<string, number | string> = { date };
    timeline.filter(p => p.date === date).forEach(p => {
      if (p.field) row[p.field] = p.value;
    });
    return row;
  });

  const fields = metrics.map(m => ({ field: m.field, label: m.label }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Completeness progress over time — by metadata field
        </CardTitle>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          One line per metadata field in <span className="font-medium">{primarySource}</span>. The selected
          card highlights its line; the other fields fade to the background for context. Lines should trend
          upward as interventions add or correct metadata across successive harvests.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" tickFormatter={v => `${v}%`} />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const f = fields.find(x => x.field === name);
                  return [`${(value as number).toFixed(1)}%`, f?.label ?? name];
                }}
              />
              <Legend
                formatter={(value: string) => {
                  const f = fields.find(x => x.field === value);
                  const label = f?.label ?? value;
                  return value === selectedField ? `${label} (selected)` : label;
                }}
              />
              {fields.map(({ field }) => {
                const isSelected = field === selectedField;
                return (
                  <Line
                    key={field}
                    type="monotone"
                    dataKey={field}
                    stroke={FIELD_COLORS[field] ?? 'hsl(215, 15%, 50%)'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    strokeOpacity={isSelected ? 1 : 0.35}
                    dot={isSelected ? { r: 3 } : false}
                    activeDot={isSelected ? { r: 5 } : { r: 3 }}
                    isAnimationActive={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] mt-3 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Timeline is aligned to metadata harvest dates for CRIS and to snapshot release dates for
          OpenAlex, OpenAIRE, and Crossref. Each provider follows its own release cadence.
        </p>
      </CardContent>
    </Card>
  );
}

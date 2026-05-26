import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CoverageTimelinePoint } from '@/data/types';

interface Props {
  data: CoverageTimelinePoint[];
  primarySource: string;
  comparedSource: string;
}

// Match CoverageBarChart palette
const SURF_BLUE = 'hsl(203, 100%, 38%)';
const SURF_ORANGE = 'hsl(30, 100%, 45%)';
const SURF_GREEN = 'hsl(146, 100%, 27%)';

export function CoverageTimelineChart({ data, primarySource, comparedSource }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Progress over time: {primarySource} ↔ {comparedSource}
        </CardTitle>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          Three lines show how the overlap evolves as interventions are applied. The goal is for the
          “In both” share (orange) to go up, while “Only in {primarySource}” (blue) and
          “Only in {comparedSource}” (green) go down.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" tickFormatter={v => `${v}%`} />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const label =
                    name === 'inBoth' ? `In both ${primarySource} & ${comparedSource}`
                    : name === 'onlyInPrimary' ? `Only in ${primarySource}`
                    : `Only in ${comparedSource}`;
                  return [`${(value as number).toFixed(1)}%`, label];
                }}
              />
              <Legend
                formatter={(value: string) =>
                  value === 'inBoth' ? `In both ${primarySource} & ${comparedSource} (should go up)`
                  : value === 'onlyInPrimary' ? `Only in ${primarySource} (should go down)`
                  : `Only in ${comparedSource} (should go down)`
                }
              />
              <Line type="monotone" dataKey="onlyInPrimary" stroke={SURF_BLUE} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="inBoth" stroke={SURF_ORANGE} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="onlyInCompared" stroke={SURF_GREEN} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] mt-3 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Timeline is aligned to metadata harvest dates for CRIS systems and to snapshot release dates for
          OpenAlex, OpenAIRE, and Crossref. Each provider follows its own release cadence.
        </p>
      </CardContent>
    </Card>
  );
}

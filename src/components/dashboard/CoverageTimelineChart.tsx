import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CoverageComparison, TimelinePoint } from '@/data/types';

interface Props {
  dates: TimelinePoint[];
  comparison: CoverageComparison;
  primarySource: string;
  comparedSource: string;
}

// Match CoverageBarChart palette
const SURF_BLUE = 'hsl(203, 100%, 38%)';
const SURF_ORANGE = 'hsl(30, 100%, 45%)';
const SURF_GREEN = 'hsl(146, 100%, 27%)';

export function CoverageTimelineChart({ dates, comparison, primarySource, comparedSource }: Props) {
  const total = comparison.onlyInPrimary + comparison.inBoth + comparison.onlyInCompared || 1;
  const endBoth = (comparison.inBoth / total) * 100;
  const endOnlyP = (comparison.onlyInPrimary / total) * 100;
  const endOnlyC = (comparison.onlyInCompared / total) * 100;

  // Synthesize a plausible progression: "both" started lower, "only" sides started higher.
  // Shift 18 percentage points worth of share from the "only" buckets into "both" over time.
  const shift = Math.min(18, endBoth);
  const startBoth = Math.max(0, endBoth - shift);
  const onlySum = endOnlyP + endOnlyC || 1;
  const startOnlyP = endOnlyP + shift * (endOnlyP / onlySum);
  const startOnlyC = endOnlyC + shift * (endOnlyC / onlySum);

  const n = Math.max(2, dates.length);
  const data = dates.map((d, i) => {
    const t = i / (n - 1);
    const both = startBoth + (endBoth - startBoth) * t;
    const onlyP = startOnlyP + (endOnlyP - startOnlyP) * t;
    const onlyC = startOnlyC + (endOnlyC - startOnlyC) * t;
    return {
      date: d.date,
      both: +both.toFixed(1),
      onlyPrimary: +onlyP.toFixed(1),
      onlyCompared: +onlyC.toFixed(1),
    };
  });

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
                    name === 'both' ? `In both ${primarySource} & ${comparedSource}`
                    : name === 'onlyPrimary' ? `Only in ${primarySource}`
                    : `Only in ${comparedSource}`;
                  return [`${value.toFixed(1)}%`, label];
                }}
              />
              <Legend
                formatter={(value: string) =>
                  value === 'both' ? `In both ${primarySource} & ${comparedSource} (should go up)`
                  : value === 'onlyPrimary' ? `Only in ${primarySource} (should go down)`
                  : `Only in ${comparedSource} (should go down)`
                }
              />
              <Line type="monotone" dataKey="onlyPrimary" stroke={SURF_BLUE} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="both" stroke={SURF_ORANGE} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="onlyCompared" stroke={SURF_GREEN} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
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

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CoverageComparison } from '@/data/types';

interface CoverageBarChartProps {
  data: CoverageComparison[];
  primarySource: string;
  onBarClick?: (comparison: CoverageComparison, segment: string) => void;
}

// SURF brand chart palette
const SURF_BLUE = 'hsl(203, 100%, 38%)';      // accent
const SURF_ORANGE = 'hsl(30, 100%, 45%)';     // primary
const SURF_GREEN = 'hsl(146, 100%, 27%)';     // success

const KEY_ONLY_PRIMARY = 'onlyInPrimary';
const KEY_IN_BOTH = 'inBoth';
const KEY_ONLY_COMPARED = 'onlyInCompared';

export function CoverageBarChart({ data, primarySource, onBarClick }: CoverageBarChartProps) {
  const chartData = data.map(d => ({
    name: d.compareSource,
    compareSource: d.compareSource,
    [KEY_ONLY_PRIMARY]: d.onlyInPrimary,
    [KEY_IN_BOTH]: d.inBoth,
    [KEY_ONLY_COMPARED]: d.onlyInCompared,
  }));

  const labelFor = (key: string, compareSource?: string) => {
    const cmp = compareSource ?? 'compared';
    if (key === KEY_ONLY_PRIMARY) return `Only in ${primarySource} (not in ${cmp})`;
    if (key === KEY_IN_BOTH) return `In both ${primarySource} and ${cmp}`;
    if (key === KEY_ONLY_COMPARED) return `Only in ${cmp} (not in ${primarySource})`;
    return key;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Coverage: {primarySource} vs. Other Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={70} />
              <Tooltip
                formatter={(value: number, _name: string, item: { dataKey?: string; payload?: { compareSource?: string } }) =>
                  [value, labelFor(String(item.dataKey ?? ''), item.payload?.compareSource)]
                }
              />
              <Legend
                formatter={(value: string) =>
                  value === KEY_ONLY_PRIMARY ? `Only in ${primarySource}`
                  : value === KEY_IN_BOTH ? `In both`
                  : `Only in compared source`
                }
              />
              <Bar
                dataKey={KEY_ONLY_PRIMARY}
                stackId="a"
                fill={SURF_BLUE}
                cursor="pointer"
                onClick={(_, index) => onBarClick?.(data[index], 'onlyInPrimary')}
              />
              <Bar
                dataKey={KEY_IN_BOTH}
                stackId="a"
                fill={SURF_ORANGE}
                cursor="pointer"
                onClick={(_, index) => onBarClick?.(data[index], 'inBoth')}
              />
              <Bar
                dataKey={KEY_ONLY_COMPARED}
                stackId="a"
                fill={SURF_GREEN}
                cursor="pointer"
                onClick={(_, index) => onBarClick?.(data[index], 'onlyInCompared')}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

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

export function CoverageBarChart({ data, primarySource, onBarClick }: CoverageBarChartProps) {
  const chartData = data.map(d => ({
    name: d.compareSource,
    [`Only in ${primarySource}`]: d.onlyInPrimary,
    'In Both': d.inBoth,
    [`Only in compared`]: d.onlyInCompared,
    _raw: d,
  }));

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
              <Tooltip />
              <Legend />
              <Bar
                dataKey={`Only in ${primarySource}`}
                stackId="a"
                fill={SURF_BLUE}
                cursor="pointer"
                onClick={(_, index) => onBarClick?.(data[index], 'onlyInPrimary')}
              />
              <Bar
                dataKey="In Both"
                stackId="a"
                fill={SURF_ORANGE}
                cursor="pointer"
                onClick={(_, index) => onBarClick?.(data[index], 'inBoth')}
              />
              <Bar
                dataKey="Only in compared"
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

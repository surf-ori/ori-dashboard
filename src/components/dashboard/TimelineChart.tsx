import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TimelinePoint } from '@/data/types';

interface TimelineChartProps {
  data: TimelinePoint[];
  title: string;
  color?: string;
}

export function TimelineChart({ data, title, color = 'hsl(213, 56%, 33%)' }: TimelineChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Completeness']} />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { organisations } from '@/data/mockData';
import type { DashboardFilters } from '@/data/types';

interface FilterSummaryProps {
  filters: DashboardFilters;
  recordCount: number;
}

export function FilterSummary({ filters, recordCount }: FilterSummaryProps) {
  const org = organisations.find(o => o.id === filters.organisation);
  const orgLabel = org ? org.abbreviation : filters.organisation;

  return (
    <Card className="bg-muted/40 border-dashed">
      <CardContent className="py-3 px-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filters</span>
        <Badge variant="outline">Org: <span className="font-semibold ml-1">{orgLabel}</span></Badge>
        <Badge variant="outline">Source: <span className="font-semibold ml-1">{filters.source}</span></Badge>
        <Badge variant="outline">Entity: <span className="font-semibold ml-1">{filters.cerifEntity}</span></Badge>
        <Badge variant="outline">Type: <span className="font-semibold ml-1">{filters.publicationType}</span></Badge>
        <span className="ml-auto text-muted-foreground">
          → <span className="font-semibold text-foreground">{recordCount.toLocaleString()}</span> records
        </span>
      </CardContent>
    </Card>
  );
}

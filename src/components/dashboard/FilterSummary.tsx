import { Badge } from '@/components/ui/badge';
import { organisations } from '@/data/mockData';
import { useDashboardData } from '@/data/DataContext';
import type { DashboardFilters } from '@/data/types';

interface FilterSummaryProps {
  filters: DashboardFilters;
  recordCount?: number;
}

export function FilterSummary({ filters }: FilterSummaryProps) {
  const { totalRecords } = useDashboardData();
  const org = organisations.find(o => o.id === filters.organisation);
  const orgLabel = org ? org.abbreviation : filters.organisation;

  return (
    <div className="rounded-2xl border border-border-soft bg-card px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">Filters</span>
      <Badge variant="orange">Org: <span className="ml-1 font-bold">{orgLabel}</span></Badge>
      <Badge variant="blue">Source: <span className="ml-1 font-bold">{filters.source}</span></Badge>
      <Badge variant="green">Entity: <span className="ml-1 font-bold">{filters.cerifEntity}</span></Badge>
      <Badge variant="purple">Type: <span className="ml-1 font-bold">{filters.publicationType}</span></Badge>
      <span className="ml-auto text-sm" style={{ color: 'hsl(var(--foreground-2))' }}>
        → <span className="font-display font-extrabold text-foreground">{totalRecords.toLocaleString()}</span> records
      </span>
    </div>
  );
}

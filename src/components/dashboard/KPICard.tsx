import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  variant?: 'default' | 'accent' | 'muted';
}

export function KPICard({ label, value, subtitle, className, variant = 'default' }: KPICardProps) {
  return (
    <Card className={cn(
      'transition-all hover:shadow-sm border-2',
      variant === 'accent' && 'border-primary/40 bg-primary/5',
      variant === 'muted' && 'border-muted bg-muted/30',
      className
    )}>
      <CardContent className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
        <p className="text-3xl font-bold tracking-tight font-display">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
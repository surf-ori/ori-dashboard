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
      'transition-shadow hover:shadow-md',
      variant === 'accent' && 'border-l-4 border-l-accent',
      className
    )}>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
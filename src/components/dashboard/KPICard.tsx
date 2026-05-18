import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  variant?: 'default' | 'accent' | 'muted';
  eyebrowColor?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
}

const eyebrowColorMap = {
  orange: 'text-primary',
  blue: 'text-surf-blue',
  green: 'text-surf-green-dark',
  purple: 'text-surf-purple',
  red: 'text-surf-red',
} as const;

export function KPICard({
  label,
  value,
  subtitle,
  className,
  variant = 'default',
  eyebrowColor = 'orange',
}: KPICardProps) {
  return (
    <div
      className={cn(
        'bg-card rounded-2xl border border-border-soft p-5 transition-shadow',
        variant === 'accent' && 'shadow-surf border-transparent',
        className,
      )}
      style={variant !== 'accent' ? undefined : undefined}
    >
      <div
        className={cn(
          'text-[11px] font-semibold uppercase tracking-[0.08em] mb-2',
          eyebrowColorMap[eyebrowColor],
        )}
      >
        {label}
      </div>
      <p
        className="font-display font-extrabold text-foreground leading-tight"
        style={{ fontSize: '28px' }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-sm mt-1.5" style={{ color: 'hsl(var(--foreground-2))' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

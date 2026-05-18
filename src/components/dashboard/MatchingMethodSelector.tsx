import { cn } from '@/lib/utils';
import type { MatchingMethod } from '@/data/types';

interface MatchingMethodSelectorProps {
  value: MatchingMethod;
  onChange: (v: MatchingMethod) => void;
  className?: string;
}

const methods: { id: MatchingMethod; label: string }[] = [
  { id: 'doi', label: 'DOI-based' },
  { id: 'ror', label: 'ROR-based' },
];

export function MatchingMethodSelector({ value, onChange, className }: MatchingMethodSelectorProps) {
  return (
    <div className={className}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1.5">
        Matching method
      </div>
      <div
        className="inline-flex rounded-lg border border-border bg-card p-1"
        role="tablist"
      >
        {methods.map((m) => {
          const active = value === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(m.id)}
              className={cn(
                'h-9 px-4 rounded-md text-[13px] font-bold transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-[hsl(var(--foreground-2))] hover:text-foreground',
              )}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

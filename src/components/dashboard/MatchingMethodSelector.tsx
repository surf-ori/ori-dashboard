import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
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
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
          Matching method
        </span>
        <HoverCard openDelay={120} closeDelay={80}>
          <HoverCardTrigger asChild>
            <button
              type="button"
              aria-label="About matching methods"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[hsl(var(--foreground-2))] hover:text-foreground transition-colors"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-96 p-0 text-sm">
            <div className="p-4 border-b border-border">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1">
                ROR-based matching
              </div>
              <p className="text-[13px] leading-relaxed text-foreground">
                The <strong>institution-level lens</strong>. Records are linked to your
                organisation through a ROR identifier on the affiliation. Answers:
                <em> which outputs belong to this institution?</em>
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-[hsl(var(--foreground-2))]">
                <strong>Limitation:</strong> outputs can be missed when affiliation metadata
                is absent or untagged with a ROR — not because the record is missing from
                the source.
              </p>
            </div>
            <div className="p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1">
                DOI-based matching
              </div>
              <p className="text-[13px] leading-relaxed text-foreground">
                The <strong>output-level lens</strong>. Records are matched across sources
                by their DOI, enabling deduplication. Answers:
                <em> where does this record appear?</em>
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-[hsl(var(--foreground-2))]">
                <strong>Limitation:</strong> non-DOI outputs (datasets, theses, reports)
                fall outside this view.
              </p>
            </div>
            <div className="px-4 py-2.5 border-t border-border bg-muted/40 text-[12px] leading-relaxed text-[hsl(var(--foreground-2))] rounded-b-md">
              The two methods are <strong>complementary</strong> — use them together for a
              fuller picture of coverage and completeness.
            </div>
          </HoverCardContent>
        </HoverCard>
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

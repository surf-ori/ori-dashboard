import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import type { MatchingMethod } from '@/data/types';

interface MatchingMethodSelectorProps {
  value?: MatchingMethod;
  onChange?: (v: MatchingMethod) => void;
  className?: string;
}

export function MatchingMethodSelector({ className }: MatchingMethodSelectorProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
          ROR &amp; DOI based matching method
        </span>
        <HoverCard openDelay={120} closeDelay={80}>
          <HoverCardTrigger asChild>
            <button
              type="button"
              aria-label="About the matching method"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[hsl(var(--foreground-2))] hover:text-foreground transition-colors"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-96 p-0 text-sm">
            <div className="p-4 border-b border-border">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1">
                Step 1 — Select records by ROR
              </div>
              <p className="text-[13px] leading-relaxed text-foreground">
                <strong>ROR</strong> is used to select the records belonging to the
                organisation across the open sources (OpenAlex, OpenAIRE, Crossref). For
                <strong> CRIS</strong>, no ROR filter is applied — all records in the
                institution's CRIS are considered to be from that organisation.
              </p>
            </div>
            <div className="p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1">
                Step 2 — Match records by DOI
              </div>
              <p className="text-[13px] leading-relaxed text-foreground">
                Once the organisation's records are selected per source, records are
                matched across sources by their <strong>DOI</strong>. This DOI-based match
                is what powers the comparisons for coverage, completeness, enrichment and
                accuracy.
              </p>
            </div>
            <div className="px-4 py-2.5 border-t border-border bg-muted/40 text-[12px] leading-relaxed text-[hsl(var(--foreground-2))] rounded-b-md">
              Non-DOI outputs (datasets, theses, reports) fall outside this matched view.
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

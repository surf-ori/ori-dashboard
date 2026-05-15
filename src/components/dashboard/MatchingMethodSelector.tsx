import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { MatchingMethod } from '@/data/types';

interface MatchingMethodSelectorProps {
  value: MatchingMethod;
  onChange: (v: MatchingMethod) => void;
  className?: string;
}

export function MatchingMethodSelector({ value, onChange, className }: MatchingMethodSelectorProps) {
  return (
    <div className={className}>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
        Matching Method
      </Label>
      <div className="inline-flex rounded-md border-2 bg-muted p-0.5">
        <Button
          type="button"
          variant={value === 'doi' ? 'default' : 'ghost'}
          size="sm"
          className="h-9 text-sm"
          onClick={() => onChange('doi')}
        >DOI-based</Button>
        <Button
          type="button"
          variant={value === 'ror' ? 'default' : 'ghost'}
          size="sm"
          className="h-9 text-sm"
          onClick={() => onChange('ror')}
        >ROR-based</Button>
      </div>
    </div>
  );
}
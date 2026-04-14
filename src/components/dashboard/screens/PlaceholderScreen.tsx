import { Card, CardContent } from '@/components/ui/card';
import { Target, Database } from 'lucide-react';

export function PlaceholderScreen({ type }: { type: 'accuracy' | 'enrichment' }) {
  const isAccuracy = type === 'accuracy';
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md text-center">
        <CardContent className="pt-8 pb-8 px-8 space-y-4">
          {isAccuracy ? <Target className="h-12 w-12 mx-auto text-primary/40" /> : <Database className="h-12 w-12 mx-auto text-primary/40" />}
          <h2 className="text-xl font-bold">
            {isAccuracy ? 'Accuracy' : 'Enrichment'} — Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground">
            {isAccuracy
              ? 'This screen will allow you to assess the correctness of metadata values by comparing fields across sources and flagging inconsistencies (e.g., mismatched author names, incorrect publication years, wrong affiliations).'
              : 'This screen will show record-level metadata from different sources side by side, allowing you to identify enrichment opportunities and decide which source has the most complete or authoritative information for each field.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

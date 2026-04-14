import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { Intervention } from '@/data/types';
import { useState } from 'react';

interface InterventionPanelProps {
  interventions: Intervention[];
}

const effortColors = { Low: 'bg-success/15 text-success', Medium: 'bg-warning/15 text-warning', High: 'bg-destructive/15 text-destructive' };
const impactColors = { Low: 'text-muted-foreground', Medium: 'text-info', High: 'text-success' };

export function InterventionPanel({ interventions }: InterventionPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Interventions & Recommendations</CardTitle>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-3">
            {interventions.map(i => (
              <div key={i.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-medium text-sm">{i.title}</h4>
                  <div className="flex gap-2 shrink-0">
                    <Badge variant="outline" className={effortColors[i.effort]}>Effort: {i.effort}</Badge>
                    <Badge variant="outline" className={impactColors[i.impact]}>Impact: {i.impact}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{i.description}</p>
                {i.actionUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={i.actionUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3" />{i.actionLabel}
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

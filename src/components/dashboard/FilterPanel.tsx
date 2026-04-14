import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { organisations, sources } from '@/data/mockData';
import type { CerifEntity, PublicationType, Source } from '@/data/types';

interface FilterPanelProps {
  organisation: string;
  source: Source | 'All';
  cerifEntity: CerifEntity;
  publicationType: PublicationType | 'All';
  onOrganisationChange: (v: string) => void;
  onSourceChange: (v: Source | 'All') => void;
  onCerifEntityChange: (v: CerifEntity) => void;
  onPublicationTypeChange: (v: PublicationType | 'All') => void;
  showSource?: boolean;
  showType?: boolean;
}

const cerifEntities: CerifEntity[] = ['Publication', 'Person', 'Organisation', 'Project', 'Dataset'];
const publicationTypes: PublicationType[] = ['Journal Article', 'Conference Paper', 'Book Chapter', 'Preprint', 'Thesis', 'Report'];

export function FilterPanel({
  organisation, source, cerifEntity, publicationType,
  onOrganisationChange, onSourceChange, onCerifEntityChange, onPublicationTypeChange,
  showSource = true, showType = true,
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Organisation</Label>
        <Select value={organisation} onValueChange={onOrganisationChange}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Organisations</SelectItem>
            {organisations.map(o => (
              <SelectItem key={o.id} value={o.id}>{o.abbreviation} — {o.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">CERIF Entity</Label>
        <Select value={cerifEntity} onValueChange={v => onCerifEntityChange(v as CerifEntity)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {cerifEntities.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {showSource && (
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Source</Label>
          <Select value={source} onValueChange={v => onSourceChange(v as Source | 'All')}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Sources</SelectItem>
              {sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}

      {showType && (
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Publication Type</Label>
          <Select value={publicationType} onValueChange={v => onPublicationTypeChange(v as PublicationType | 'All')}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              {publicationTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

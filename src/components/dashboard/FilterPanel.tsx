import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { organisations, sources } from '@/data/mockData';
import type { CerifEntity, PublicationType, Source } from '@/data/types';

interface FilterPanelProps {
  organisation: string;
  source: Source;
  cerifEntity: CerifEntity;
  publicationType: PublicationType | 'All';
  onOrganisationChange: (v: string) => void;
  onSourceChange: (v: Source) => void;
  onCerifEntityChange: (v: CerifEntity) => void;
  onPublicationTypeChange: (v: PublicationType | 'All') => void;
}

const cerifEntities: CerifEntity[] = ['Publications', 'Persons', 'Organisations', 'Projects', 'Datasets'];
const publicationTypes: PublicationType[] = ['Journal Article', 'Conference Paper', 'Book Chapter', 'Preprint', 'Thesis', 'Report'];

export function FilterPanel({
  organisation, source, cerifEntity, publicationType,
  onOrganisationChange, onSourceChange, onCerifEntityChange, onPublicationTypeChange,
}: FilterPanelProps) {
  const labelCls = "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block";
  return (
    <div className="space-y-5">
      <div>
        <Label className={labelCls}>Organisation</Label>
        <Select value={organisation} onValueChange={onOrganisationChange}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {organisations.map(o => (
              <SelectItem key={o.id} value={o.id}>{o.abbreviation} — {o.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelCls}>Primary Source</Label>
        <Select value={source} onValueChange={v => onSourceChange(v as Source)}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelCls}>Entity Table</Label>
        <Select value={cerifEntity} onValueChange={v => onCerifEntityChange(v as CerifEntity)}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cerifEntities.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelCls}>Publication Type</Label>
        <Select value={publicationType} onValueChange={v => onPublicationTypeChange(v as PublicationType | 'All')}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {publicationTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
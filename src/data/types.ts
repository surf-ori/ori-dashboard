export interface Organisation {
  id: string;
  name: string;
  rorId: string;
  abbreviation: string;
}

export type CerifEntity = 'Publication' | 'Person' | 'Organisation' | 'Project' | 'Dataset';

export type Source = 'OpenAlex' | 'Crossref' | 'OpenAIRE' | 'CRIS' | 'ORCID' | 'ROR' | 'DataCite';

export type PublicationType = 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Preprint' | 'Thesis' | 'Report';

export interface CompletenessMetric {
  field: string;
  label: string;
  percentage: number;
  total: number;
  filled: number;
}

export interface TimelinePoint {
  date: string;
  value: number;
}

export interface CoverageComparison {
  compareSource: Source;
  onlyInPrimary: number;
  inBoth: number;
  onlyInCompared: number;
  total: number;
}

export interface DetailRecord {
  id: string;
  title: string;
  doi?: string;
  authors: string;
  year: number;
  source: Source;
  missingFields: string[];
}

export interface Intervention {
  id: string;
  title: string;
  description: string;
  effort: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  actionUrl?: string;
  actionLabel?: string;
}

export interface DashboardFilters {
  organisation: string;
  source: Source | 'All';
  cerifEntity: CerifEntity;
  publicationType: PublicationType | 'All';
}

export interface EnrichmentEntity {
  entity: string;
  label: string;
  missingPercentage: number;
  missingCount: number;
  totalRecords: number;
  recoverable: { source: Source; percentage: number; count: number }[];
}

export interface AccuracyComparison {
  primarySource: Source;
  compareSource: Source;
  recordsInPrimary: number;
  recordsInBoth: number;
  recordsInCompare: number;
  conflicts: { field: string; label: string; count: number; percentage: number }[];
  agreements: { field: string; label: string; count: number; percentage: number }[];
}

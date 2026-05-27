export interface Organisation {
  id: string;
  name: string;
  rorId: string;
  abbreviation: string;
  crisPublications: number | null;
  crisRepository: string | null;
  openAlexPublications: number | null;
  openairePublications: number | null;
}

export type CerifEntity = 'Publications' | 'Persons' | 'Organisations' | 'Projects' | 'Datasets';

export type Source = 'OpenAlex' | 'Crossref' | 'OpenAIRE' | 'CRIS' | 'ROR';

export type PublicationType = 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Preprint' | 'Thesis' | 'Report';

export type MatchingMethod = 'doi' | 'ror';

export interface FilterContext {
  filterOrganisationAbbreviation: string;
  filterOrganisationRORID: string;
  filterPrimarySource: string;
  filterEntityTable: string;
  filterType: string;
}

export interface CompletenessMetric extends FilterContext {
  field: string;
  label: string;
  percentage: number;
  total: number;
  filled: number;
}

export interface TimelinePoint extends FilterContext {
  date: string;
  value: number;
  /** Metadata field this point is for (e.g. 'doi', 'orcid'). Omitted for legacy aggregate rows. */
  field?: string;
}

export interface CoverageTimelinePoint extends FilterContext {
  date: string;
  compareSource: Source;
  /** Percentage (0–100) of DOI-matched records that appear in both sources at this point in time. */
  inBoth: number;
  /** Percentage only in the primary source (should trend down with interventions). */
  onlyInPrimary: number;
  /** Percentage only in the compared source (should trend down with interventions). */
  onlyInCompared: number;
}

export interface CoverageComparison extends FilterContext {
  compareSource: Source;
  onlyInPrimary: number;
  inBoth: number;
  onlyInCompared: number;
  total: number;
}

export interface DetailRecord extends FilterContext {
  id: string;
  title: string;
  doi?: string;
  authors: string;
  year: number;
  sources: Source[];
  
  /**
   * For each source where the record exists, which metadata fields are missing in that source.
   * Enables cross-source presence/absence comparison on the Completeness page.
   */
  missingFieldsBySource?: Partial<Record<Source, string[]>>;
}

export type InterventionPage = 'Coverage' | 'Completeness' | 'Enrichment' | 'Accuracy';

export type MetadataEntity =
  | 'improveDOI'
  | 'improveORCID'
  | 'improveROR'
  | 'improveGrantDOI'
  | 'improveISSN'
  | 'improveOAstatus'
  | 'improveCorrespondingAuthor';

export interface Intervention {
  id: string;
  title: string;
  description: string;
  effort: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  actionUrl?: string;
  actionLabel?: string;
  page?: InterventionPage;
  // Coverage-page filtering
  coverageOnlyInSource?: Source;
  coverageNotInCompared?: Source;
  // Completeness-page filtering
  completenessSource?: Source;
  metadataEntity?: MetadataEntity;
  // Enrichment-page filtering
  enrichmentEntity?: 'doi' | 'orcid' | 'ror' | 'grantDoi';
  enrichmentRecoverableFrom?: Source;
  // Accuracy-page filtering — which conflicting field this intervention addresses
  accuracyField?: 'ror' | 'orcid' | 'authors' | 'year' | 'doi';


}

export interface DashboardFilters {
  organisation: string;
  source: Source;
  cerifEntity: CerifEntity;
  publicationType: PublicationType | 'All';
  matchingMethod: MatchingMethod;
}

export interface EnrichmentEntity extends FilterContext {
  entity: string;
  label: string;
  missingPercentage: number;
  missingCount: number;
  totalRecords: number;
  recoverable: { source: Source; percentage: number; count: number }[];
}

export interface OverviewCard {
  title: string;
  value: string;
  details: string;
}

export interface AccuracyComparison extends FilterContext {
  primarySource: Source;
  compareSource: Source;
  recordsInPrimary: number;
  recordsInBoth: number;
  recordsInCompare: number;
  conflicts: { field: string; label: string; count: number; percentage: number }[];
  agreements: { field: string; label: string; count: number; percentage: number }[];
}

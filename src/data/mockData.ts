import type { Organisation, CompletenessMetric, TimelinePoint, CoverageComparison, DetailRecord, Intervention, Source, EnrichmentEntity, AccuracyComparison } from './types';

// Dutch signatories of the Barcelona Declaration on Open Research Information
// Source: https://barcelona-declaration.org/signatories_by_country/
export const organisations: Organisation[] = [
  { id: 'vu', name: 'Vrije Universiteit Amsterdam', rorId: '008xxew50', abbreviation: 'VU Amsterdam' },
  { id: 'uva', name: 'University of Amsterdam', rorId: '04dkp9463', abbreviation: 'UvA' },
  { id: 'tudelft', name: 'Delft University of Technology', rorId: '02e2c7k09', abbreviation: 'TU Delft' },
  { id: 'uu', name: 'Utrecht University', rorId: '04pp8hn57', abbreviation: 'UU' },
  { id: 'rug', name: 'University of Groningen', rorId: '012p63287', abbreviation: 'RUG' },
  { id: 'leiden', name: 'Leiden University', rorId: '027bh9e22', abbreviation: 'Leiden' },
  { id: 'knaw', name: 'Royal Netherlands Academy of Arts and Sciences', rorId: '0566bfb96', abbreviation: 'KNAW' },
  { id: 'nwo', name: 'Dutch Research Council', rorId: '04jsz6e67', abbreviation: 'NWO' },
  { id: 'zonmw', name: 'ZonMw', rorId: '01yaj9a77', abbreviation: 'ZonMw' },
  { id: 'surf', name: 'SURF', rorId: '0234wmv40', abbreviation: 'SURF' },
  { id: 'esciencecenter', name: 'Netherlands eScience Center', rorId: '00rbjv475', abbreviation: 'eScience' },
  { id: 'kb', name: 'KB, National library of the Netherlands', rorId: '02w4jbg70', abbreviation: 'KB' },
  { id: 'unl', name: 'Universities of the Netherlands', rorId: '05hyt2f43', abbreviation: 'UNL' },
  { id: 'vh', name: 'Vereniging Hogescholen', rorId: '00n3w3b58', abbreviation: 'VH' },
  { id: 'sia', name: 'Taskforce for Applied Research SIA', rorId: '03de5wj42', abbreviation: 'SIA' },
  { id: 'dccpo', name: 'Digital Competence Center for Practice-Oriented Research', rorId: '04q3p7m21', abbreviation: 'DCC-PO' },
  { id: 'nlrn', name: 'Dutch Reproducibility Network', rorId: '06y5xv847', abbreviation: 'NLRN' },
];

export const sources: Source[] = ['OpenAlex', 'Crossref', 'OpenAIRE', 'CRIS', 'ORCID', 'ROR', 'DataCite'];

export const completenessMetrics: CompletenessMetric[] = [
  { field: 'doi', label: 'Has DOI', percentage: 87.3, total: 12450, filled: 10869 },
  { field: 'orcid', label: 'Has ORCID', percentage: 62.1, total: 12450, filled: 7731 },
  { field: 'ror', label: 'Has ROR', percentage: 78.5, total: 12450, filled: 9773 },
  { field: 'grantDoi', label: 'Has Grant DOI', percentage: 23.4, total: 12450, filled: 2913 },
  { field: 'issn', label: 'Has ISSN', percentage: 91.2, total: 12450, filled: 11354 },
  { field: 'oaStatus', label: 'Has OA Status', percentage: 84.7, total: 12450, filled: 10545 },
  { field: 'correspondingAuthor', label: 'Corresponding Author', percentage: 45.8, total: 12450, filled: 5702 },
];

export const completenessTimeline: TimelinePoint[] = [
  { date: '2020-Q1', value: 71.2 }, { date: '2020-Q2', value: 72.8 }, { date: '2020-Q3', value: 73.1 }, { date: '2020-Q4', value: 74.5 },
  { date: '2021-Q1', value: 75.3 }, { date: '2021-Q2', value: 76.9 }, { date: '2021-Q3', value: 78.2 }, { date: '2021-Q4', value: 79.1 },
  { date: '2022-Q1', value: 80.4 }, { date: '2022-Q2', value: 81.7 }, { date: '2022-Q3', value: 82.3 }, { date: '2022-Q4', value: 83.6 },
  { date: '2023-Q1', value: 84.1 }, { date: '2023-Q2', value: 85.2 }, { date: '2023-Q3', value: 86.0 }, { date: '2023-Q4', value: 87.3 },
];

// With CRIS as the default primary source, comparison list includes OpenAlex (swapped in for CRIS)
export const coverageComparisons: CoverageComparison[] = [
  { compareSource: 'OpenAlex', onlyInPrimary: 3450, inBoth: 6200, onlyInCompared: 4120, total: 13770 },
  { compareSource: 'Crossref', onlyInPrimary: 1230, inBoth: 8940, onlyInCompared: 560, total: 10730 },
  { compareSource: 'OpenAIRE', onlyInPrimary: 2100, inBoth: 7350, onlyInCompared: 1890, total: 11340 },
  { compareSource: 'ORCID', onlyInPrimary: 4200, inBoth: 5100, onlyInCompared: 2300, total: 11600 },
  { compareSource: 'DataCite', onlyInPrimary: 8900, inBoth: 1250, onlyInCompared: 780, total: 10930 },
];

export const detailRecords: DetailRecord[] = [
  { id: 'rec-001', title: 'Machine Learning Applications in Climate Science: A Systematic Review', doi: '10.1234/ml-climate-2023', authors: 'van der Berg, J.; de Vries, A.', year: 2023, source: 'OpenAlex', missingFields: ['orcid', 'grantDoi'] },
  { id: 'rec-002', title: 'Quantum Computing for Drug Discovery in the Netherlands', doi: undefined, authors: 'Jansen, P.; Bakker, M.; Singh, R.', year: 2023, source: 'CRIS', missingFields: ['doi', 'orcid', 'oaStatus'] },
  { id: 'rec-003', title: 'Sustainable Urban Planning: Amsterdam Case Study', doi: '10.5678/urban-ams-2022', authors: 'de Groot, L.', year: 2022, source: 'OpenAlex', missingFields: ['correspondingAuthor', 'grantDoi'] },
  { id: 'rec-004', title: 'Neural Networks for Dutch Language Processing', doi: '10.9012/nlp-dutch-2023', authors: 'Vermeer, K.; Hendriks, S.', year: 2023, source: 'Crossref', missingFields: ['ror', 'grantDoi'] },
  { id: 'rec-005', title: 'Biodiversity Loss in the Wadden Sea: A Longitudinal Study', doi: '10.3456/wadden-bio-2022', authors: 'Smit, H.; de Jong, R.; Mulder, T.', year: 2022, source: 'OpenAIRE', missingFields: ['orcid', 'correspondingAuthor'] },
  { id: 'rec-006', title: 'Advances in Photovoltaic Cell Efficiency', doi: undefined, authors: 'van Dijk, E.', year: 2023, source: 'CRIS', missingFields: ['doi', 'issn', 'oaStatus'] },
  { id: 'rec-007', title: 'Digital Humanities and the Dutch Golden Age Archives', doi: '10.7890/dh-golden-2023', authors: 'Bosman, J.; Kramer, B.', year: 2023, source: 'OpenAlex', missingFields: ['grantDoi'] },
  { id: 'rec-008', title: 'Water Management Infrastructure Resilience', doi: '10.2345/water-infra-2022', authors: 'Visser, M.; ter Haar, D.', year: 2022, source: 'Crossref', missingFields: ['orcid', 'ror'] },
];

export const interventions: Intervention[] = [
  { id: 'int-001', title: 'Add DOIs via Crossref registration', description: 'Register publications with Crossref to obtain DOIs for records currently missing them. This improves discoverability and linking across systems.', effort: 'Medium', impact: 'High', actionUrl: 'https://www.crossref.org/documentation/', actionLabel: 'Crossref Docs' },
  { id: 'int-002', title: 'Link ORCID profiles to publications', description: 'Encourage researchers to claim their publications in ORCID, or use institutional ORCID integration to auto-link.', effort: 'Low', impact: 'High', actionUrl: 'https://orcid.org/', actionLabel: 'ORCID Portal' },
  { id: 'int-003', title: 'Update ROR affiliations in CRIS', description: 'Ensure all institutional affiliations in CRIS use ROR identifiers for consistent linking.', effort: 'Low', impact: 'Medium', actionUrl: 'https://ror.org/', actionLabel: 'ROR Registry' },
  { id: 'int-004', title: 'Enrich grant metadata via OpenAIRE', description: 'Use OpenAIRE APIs to match publications to funded projects and add grant DOIs.', effort: 'High', impact: 'Medium', actionUrl: 'https://api.openaire.eu/', actionLabel: 'OpenAIRE API' },
  { id: 'int-005', title: 'Resolve DOI conflicts', description: 'Use the DOI resolver to check and fix broken or redirected DOIs in your records.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://doi.org/', actionLabel: 'DOI Resolver' },
];

export const summaryStats = {
  totalSources: 7,
  totalOrganisations: organisations.length,
  totalRecords: 62250,
  avgCompleteness: 67.6,
  avgCoverage: 72.4,
  avgAccuracy: 'N/A' as const,
};

export const enrichmentEntities: EnrichmentEntity[] = [
  {
    entity: 'ror', label: 'ROR', missingPercentage: 74, missingCount: 5403, totalRecords: 7300,
    recoverable: [
      { source: 'OpenAlex', percentage: 10, count: 540 },
      { source: 'OpenAIRE', percentage: 20, count: 1080 },
    ],
  },
  {
    entity: 'orcid', label: 'ORCID', missingPercentage: 66, missingCount: 4281, totalRecords: 6486,
    recoverable: [
      { source: 'OpenAlex', percentage: 10, count: 428 },
      { source: 'OpenAIRE', percentage: 20, count: 856 },
    ],
  },
  {
    entity: 'doi', label: 'DOI', missingPercentage: 37, missingCount: 2392, totalRecords: 6464,
    recoverable: [
      { source: 'OpenAlex', percentage: 10, count: 239 },
      { source: 'Crossref', percentage: 20, count: 478 },
    ],
  },
  {
    entity: 'grantDoi', label: 'Grant DOI', missingPercentage: 81, missingCount: 5912, totalRecords: 7300,
    recoverable: [
      { source: 'OpenAIRE', percentage: 18, count: 1064 },
      { source: 'Crossref', percentage: 7, count: 414 },
    ],
  },
];

export const accuracyComparison: AccuracyComparison = {
  primarySource: 'CRIS',
  compareSource: 'OpenAlex',
  recordsInPrimary: 128000,
  recordsInBoth: 84000,
  recordsInCompare: 152000,
  conflicts: [
    { field: 'ror', label: 'different ROR affiliation id', count: 53000, percentage: 80 },
    { field: 'orcid', label: 'different ORCiD', count: 53000, percentage: 80 },
    { field: 'authors', label: 'different author list', count: 12600, percentage: 15 },
    { field: 'year', label: 'different publication year', count: 4200, percentage: 5 },
  ],
  agreements: [
    { field: 'ror', label: 'same ROR affiliation id', count: 21000, percentage: 20 },
    { field: 'orcid', label: 'same ORCID', count: 21000, percentage: 20 },
    { field: 'authors', label: 'matching author list', count: 71400, percentage: 85 },
    { field: 'year', label: 'matching publication year', count: 79800, percentage: 95 },
  ],
};

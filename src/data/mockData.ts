import type { Organisation, CompletenessMetric, TimelinePoint, CoverageComparison, DetailRecord, Intervention, Source, EnrichmentEntity, AccuracyComparison, OverviewCard } from './types';

// Dutch signatories of the Barcelona Declaration on Open Research Information
// Source: https://barcelona-declaration.org/signatories_by_country/
export const organisations: Organisation[] = [
  { id: 'vu', name: 'Vrije Universiteit Amsterdam', rorId: '008xxew50', abbreviation: 'VU Amsterdam', crisRecords: 214181, crisRepository: 'research.vu.nl', openalexWorks: 128442, openaireePubs: 231500 },
  { id: 'uva', name: 'University of Amsterdam', rorId: '04dkp9463', abbreviation: 'UvA', crisRecords: 227640, crisRepository: 'pure.uva.nl', openalexWorks: 228839, openaireePubs: 245800 },
  { id: 'tudelft', name: 'Delft University of Technology', rorId: '02e2c7k09', abbreviation: 'TU Delft', crisRecords: null, crisRepository: null, openalexWorks: 167597, openaireePubs: 182300 },
  { id: 'uu', name: 'Utrecht University', rorId: '04pp8hn57', abbreviation: 'UU', crisRecords: 284812, crisRepository: 'research-portal.uu.nl', openalexWorks: 225290, openaireePubs: 307400 },
  { id: 'rug', name: 'University of Groningen', rorId: '012p63287', abbreviation: 'RUG', crisRecords: 315857, crisRepository: 'pure.rug.nl', openalexWorks: 174428, openaireePubs: 341200 },
  { id: 'leiden', name: 'Leiden University', rorId: '027bh9e22', abbreviation: 'Leiden', crisRecords: null, crisRepository: null, openalexWorks: 140888, openaireePubs: 158900 },
  { id: 'knaw', name: 'Royal Netherlands Academy of Arts and Sciences', rorId: '043c0p156', abbreviation: 'KNAW', crisRecords: 52534, crisRepository: 'pure.knaw.nl', openalexWorks: 5223, openaireePubs: 57100 },
  { id: 'nwo', name: 'Dutch Research Council', rorId: '04jsz6e67', abbreviation: 'NWO', crisRecords: null, crisRepository: null, openalexWorks: 1124, openaireePubs: 3400 },
  { id: 'zonmw', name: 'ZonMw', rorId: '01yaj9a77', abbreviation: 'ZonMw', crisRecords: null, crisRepository: null, openalexWorks: 369, openaireePubs: 820 },
  { id: 'surf', name: 'SURF', rorId: '009vhk114', abbreviation: 'SURF', crisRecords: null, crisRepository: null, openalexWorks: 124, openaireePubs: 310 },
  { id: 'esciencecenter', name: 'Netherlands eScience Center', rorId: '00rbjv475', abbreviation: 'eScience', crisRecords: null, crisRepository: null, openalexWorks: 5324, openaireePubs: 6100 },
  { id: 'kb', name: 'KB, National library of the Netherlands', rorId: '02w4jbg70', abbreviation: 'KB', crisRecords: null, crisRepository: null, openalexWorks: 1885, openaireePubs: 2200 },
  { id: 'unl', name: 'Universities of the Netherlands', rorId: '05hyt2f43', abbreviation: 'UNL', crisRecords: null, crisRepository: null, openalexWorks: null, openaireePubs: null },
  { id: 'vh', name: 'Vereniging Hogescholen', rorId: '00n3w3b58', abbreviation: 'VH', crisRecords: null, crisRepository: null, openalexWorks: null, openaireePubs: null },
  { id: 'sia', name: 'Taskforce for Applied Research SIA', rorId: '03de5wj42', abbreviation: 'SIA', crisRecords: null, crisRepository: null, openalexWorks: null, openaireePubs: null },
  { id: 'dccpo', name: 'Digital Competence Center for Practice-Oriented Research', rorId: '04q3p7m21', abbreviation: 'DCC-PO', crisRecords: null, crisRepository: null, openalexWorks: null, openaireePubs: null },
  { id: 'nlrn', name: 'Dutch Reproducibility Network', rorId: '06y5xv847', abbreviation: 'NLRN', crisRecords: null, crisRepository: null, openalexWorks: null, openaireePubs: null },
];

export const sources: Source[] = ['OpenAlex', 'Crossref', 'OpenAIRE', 'CRIS', 'ROR'];

export const completenessMetrics: CompletenessMetric[] = [
  { field: 'doi', label: 'Has DOI', percentage: 87.3, total: 216409, filled: 188925 },
  { field: 'orcid', label: 'Has ORCID', percentage: 62.1, total: 216409, filled: 134390 },
  { field: 'ror', label: 'Has ROR', percentage: 78.5, total: 216409, filled: 169881 },
  { field: 'grantDoi', label: 'Has Grant DOI', percentage: 23.4, total: 216409, filled: 50640 },
  { field: 'issn', label: 'Has ISSN', percentage: 91.2, total: 216409, filled: 197365 },
  { field: 'oaStatus', label: 'Has OA Status', percentage: 84.7, total: 216409, filled: 183298 },
  { field: 'correspondingAuthor', label: 'Corresponding Author', percentage: 45.8, total: 216409, filled: 99115 },
];

export const completenessTimeline: TimelinePoint[] = [
  { date: '2020-Q1', value: 71.2 }, { date: '2020-Q2', value: 72.8 }, { date: '2020-Q3', value: 73.1 }, { date: '2020-Q4', value: 74.5 },
  { date: '2021-Q1', value: 75.3 }, { date: '2021-Q2', value: 76.9 }, { date: '2021-Q3', value: 78.2 }, { date: '2021-Q4', value: 79.1 },
  { date: '2022-Q1', value: 80.4 }, { date: '2022-Q2', value: 81.7 }, { date: '2022-Q3', value: 82.3 }, { date: '2022-Q4', value: 83.6 },
  { date: '2023-Q1', value: 84.1 }, { date: '2023-Q2', value: 85.2 }, { date: '2023-Q3', value: 86.0 }, { date: '2023-Q4', value: 87.3 },
];

// With CRIS as the default primary source, comparison list includes OpenAlex (swapped in for CRIS)
export const coverageComparisons: CoverageComparison[] = [
  { compareSource: 'OpenAlex', onlyInPrimary: 77386, inBoth: 139023, onlyInCompared: 41200, total: 257609 },
  { compareSource: 'Crossref', onlyInPrimary: 26164, inBoth: 190245, onlyInCompared: 5600, total: 222009 },
  { compareSource: 'OpenAIRE', onlyInPrimary: 48091, inBoth: 168318, onlyInCompared: 18900, total: 235309 },
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
  totalSources: 5,
  totalOrganisations: organisations.length,
  totalRecords: 216409,
  avgCompleteness: 67.6,
  avgCoverage: 72.4,
  avgAccuracy: 'N/A' as const,
};

export const overviewCards: OverviewCard[] = [
  { title: 'Sources Monitored', value: '4', details: 'OpenAlex, Crossref, OpenAIRE, CRIS' },
  { title: 'Organisations', value: '17', details: 'Dutch Research Performing Organisations' },
  { title: 'Total Records', value: '6,963,012', details: 'Across all sources and organisations' },
  { title: 'Filtered Records', value: '216,409', details: 'Publications, for VU Amsterdam, in CRIS' },
  { title: 'Avg. Coverage', value: '72.4%', details: 'Cross-source record overlap' },
  { title: 'Avg. Completeness', value: '67.6%', details: 'Metadata field coverage per source' },
  { title: 'Avg. Enrichment', value: '90.2%', details: 'Records that can be enriched' },
  { title: 'Avg. Accuracy', value: '80.4%', details: 'Conflict-free shared records' },
];

export const enrichmentEntities: EnrichmentEntity[] = [
  {
    entity: 'ror', label: 'ROR', missingPercentage: 74, missingCount: 160143, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 10, count: 16014 },
      { source: 'OpenAlex', percentage: 10, count: 16014 },
    ],
  },
  {
    entity: 'orcid', label: 'ORCID', missingPercentage: 66, missingCount: 142830, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 20, count: 28566 },
      { source: 'OpenAlex', percentage: 10, count: 14283 },
    ],
  },
  {
    entity: 'doi', label: 'DOI', missingPercentage: 37, missingCount: 80071, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 15, count: 12011 },
      { source: 'OpenAlex', percentage: 10, count: 8007 },
      { source: 'Crossref', percentage: 20, count: 16014 },
    ],
  },
  {
    entity: 'grantDoi', label: 'Grant DOI', missingPercentage: 81, missingCount: 175291, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 18, count: 31552 },
      { source: 'Crossref', percentage: 7, count: 12270 },
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

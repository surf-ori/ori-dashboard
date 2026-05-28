import type { Organisation, CompletenessMetric, TimelinePoint, CoverageComparison, CoverageTimelinePoint, DetailRecord, Intervention, Source, EnrichmentEntity, AccuracyComparison, OverviewCard } from './types';

// Dutch signatories of the Barcelona Declaration on Open Research Information
// Source: https://barcelona-declaration.org/signatories_by_country/
export const organisations: Organisation[] = [
  { id: 'vu', name: 'Vrije Universiteit Amsterdam', rorId: '008xxew50', abbreviation: 'VU Amsterdam', crisPublications: 214181, crisRepository: 'research.vu.nl', openAlexPublications: 128442, openairePublications: 231500 },
  { id: 'uva', name: 'University of Amsterdam', rorId: '04dkp9463', abbreviation: 'UvA', crisPublications: 227640, crisRepository: 'pure.uva.nl', openAlexPublications: 228839, openairePublications: 245800 },
  { id: 'tudelft', name: 'Delft University of Technology', rorId: '02e2c7k09', abbreviation: 'TU Delft', crisPublications: null, crisRepository: null, openAlexPublications: 167597, openairePublications: 182300 },
  { id: 'uu', name: 'Utrecht University', rorId: '04pp8hn57', abbreviation: 'UU', crisPublications: 284812, crisRepository: 'research-portal.uu.nl', openAlexPublications: 225290, openairePublications: 307400 },
  { id: 'rug', name: 'University of Groningen', rorId: '012p63287', abbreviation: 'RUG', crisPublications: 315857, crisRepository: 'pure.rug.nl', openAlexPublications: 174428, openairePublications: 341200 },
  { id: 'leiden', name: 'Leiden University', rorId: '027bh9e22', abbreviation: 'Leiden', crisPublications: null, crisRepository: null, openAlexPublications: 140888, openairePublications: 158900 },
  { id: 'knaw', name: 'Royal Netherlands Academy of Arts and Sciences', rorId: '043c0p156', abbreviation: 'KNAW', crisPublications: 52534, crisRepository: 'pure.knaw.nl', openAlexPublications: 5223, openairePublications: 57100 },
  { id: 'nwo', name: 'Dutch Research Council', rorId: '04jsz6e67', abbreviation: 'NWO', crisPublications: null, crisRepository: null, openAlexPublications: 1124, openairePublications: 3400 },
  { id: 'zonmw', name: 'ZonMw', rorId: '01yaj9a77', abbreviation: 'ZonMw', crisPublications: null, crisRepository: null, openAlexPublications: 369, openairePublications: 820 },
  { id: 'surf', name: 'SURF', rorId: '009vhk114', abbreviation: 'SURF', crisPublications: null, crisRepository: null, openAlexPublications: 124, openairePublications: 310 },
  { id: 'esciencecenter', name: 'Netherlands eScience Center', rorId: '00rbjv475', abbreviation: 'eScience', crisPublications: null, crisRepository: null, openAlexPublications: 5324, openairePublications: 6100 },
  { id: 'kb', name: 'KB, National library of the Netherlands', rorId: '02w4jbg70', abbreviation: 'KB', crisPublications: null, crisRepository: null, openAlexPublications: 1885, openairePublications: 2200 },
  { id: 'unl', name: 'Universities of the Netherlands', rorId: '05hyt2f43', abbreviation: 'UNL', crisPublications: null, crisRepository: null, openAlexPublications: null, openairePublications: null },
  { id: 'vh', name: 'Vereniging Hogescholen', rorId: '00n3w3b58', abbreviation: 'VH', crisPublications: null, crisRepository: null, openAlexPublications: null, openairePublications: null },
  { id: 'sia', name: 'Taskforce for Applied Research SIA', rorId: '03de5wj42', abbreviation: 'SIA', crisPublications: null, crisRepository: null, openAlexPublications: null, openairePublications: null },
  { id: 'dccpo', name: 'Digital Competence Center for Practice-Oriented Research', rorId: '04q3p7m21', abbreviation: 'DCC-PO', crisPublications: null, crisRepository: null, openAlexPublications: null, openairePublications: null },
  { id: 'nlrn', name: 'Dutch Reproducibility Network', rorId: '06y5xv847', abbreviation: 'NLRN', crisPublications: null, crisRepository: null, openAlexPublications: null, openairePublications: null },
];

export const sources: Source[] = ['OpenAlex', 'Crossref', 'OpenAIRE', 'CRIS', 'ROR'];

// Filter context applied to seeded rows — represents the current selection in the sidebar filter bar.
const fc = {
  filterOrganisationAbbreviation: 'VU Amsterdam',
  filterOrganisationRORID: '008xxew50',
  filterPrimarySource: 'CRIS',
  filterEntityTable: 'Publications',
  filterType: 'All Types',
} as const;

const fcRug = {
  filterOrganisationAbbreviation: 'RUG',
  filterOrganisationRORID: '012p63287',
  filterPrimarySource: 'CRIS',
  filterEntityTable: 'Publications',
  filterType: 'All Types',
} as const;

export const completenessMetrics: CompletenessMetric[] = [
  { ...fc, field: 'doi', label: 'Has DOI', percentage: 87.3, total: 216409, filled: 188925 },
  { ...fc, field: 'orcid', label: 'Has ORCID', percentage: 62.1, total: 216409, filled: 134390 },
  { ...fc, field: 'ror', label: 'Has ROR', percentage: 78.5, total: 216409, filled: 169881 },
  { ...fc, field: 'grantDoi', label: 'Has Grant DOI', percentage: 23.4, total: 216409, filled: 50640 },
  { ...fc, field: 'issn', label: 'Has ISSN', percentage: 91.2, total: 216409, filled: 197365 },
  { ...fc, field: 'oaStatus', label: 'Has OA Status', percentage: 84.7, total: 216409, filled: 183298 },
  { ...fc, field: 'correspondingAuthor', label: 'Corresponding Author', percentage: 45.8, total: 216409, filled: 99115 },
  { ...fcRug, field: 'doi', label: 'Has DOI', percentage: 89.1, total: 315857, filled: 281428 },
  { ...fcRug, field: 'orcid', label: 'Has ORCID', percentage: 68.4, total: 315857, filled: 216046 },
  { ...fcRug, field: 'ror', label: 'Has ROR', percentage: 81.2, total: 315857, filled: 256476 },
  { ...fcRug, field: 'grantDoi', label: 'Has Grant DOI', percentage: 27.8, total: 315857, filled: 87808 },
  { ...fcRug, field: 'issn', label: 'Has ISSN', percentage: 92.5, total: 315857, filled: 292168 },
  { ...fcRug, field: 'oaStatus', label: 'Has OA Status', percentage: 86.3, total: 315857, filled: 272585 },
  { ...fcRug, field: 'correspondingAuthor', label: 'Corresponding Author', percentage: 49.2, total: 315857, filled: 155402 },
];

const TIMELINE_DATES = [
  '2020-Q1','2020-Q2','2020-Q3','2020-Q4',
  '2021-Q1','2021-Q2','2021-Q3','2021-Q4',
  '2022-Q1','2022-Q2','2022-Q3','2022-Q4',
  '2023-Q1','2023-Q2','2023-Q3','2023-Q4',
];

// Per-field starting points (pp below the current value at 2020-Q1).
const FIELD_GROWTH_PP: Record<string, number> = {
  doi: 16, orcid: 28, ror: 22, grantDoi: 14, issn: 8, oaStatus: 18, correspondingAuthor: 24,
};

function buildCompletenessTimeline(ctx: typeof fc | typeof fcRug, metrics: CompletenessMetric[]): TimelinePoint[] {
  const out: TimelinePoint[] = [];
  metrics.filter(m => m.filterOrganisationRORID === ctx.filterOrganisationRORID).forEach(m => {
    const end = m.percentage;
    const start = Math.max(0, end - (FIELD_GROWTH_PP[m.field] ?? 15));
    const n = TIMELINE_DATES.length;
    TIMELINE_DATES.forEach((date, i) => {
      const t = i / (n - 1);
      // Gentle ease so the line isn't perfectly linear.
      const eased = t * t * (3 - 2 * t);
      const value = +(start + (end - start) * eased).toFixed(1);
      out.push({ ...ctx, field: m.field, date, value });
    });
  });
  return out;
}

export const completenessTimeline: TimelinePoint[] = [
  ...buildCompletenessTimeline(fc, completenessMetrics),
  ...buildCompletenessTimeline(fcRug, completenessMetrics),
];

// Coverage progress over time — percentage shares of the three overlap segments per
// (organisation, compared source). Interpolated to show interventions improving "in both"
// while "only in primary" / "only in compared" trend downward.
function buildCoverageTimeline(ctx: typeof fc | typeof fcRug, comps: CoverageComparison[]): CoverageTimelinePoint[] {
  const out: CoverageTimelinePoint[] = [];
  comps.filter(c => c.filterOrganisationRORID === ctx.filterOrganisationRORID).forEach(c => {
    const total = c.onlyInPrimary + c.inBoth + c.onlyInCompared || 1;
    const endBoth = (c.inBoth / total) * 100;
    const endOnlyP = (c.onlyInPrimary / total) * 100;
    const endOnlyC = (c.onlyInCompared / total) * 100;
    const shift = Math.min(18, endBoth);
    const startBoth = Math.max(0, endBoth - shift);
    const onlySum = endOnlyP + endOnlyC || 1;
    const startOnlyP = endOnlyP + shift * (endOnlyP / onlySum);
    const startOnlyC = endOnlyC + shift * (endOnlyC / onlySum);
    const n = TIMELINE_DATES.length;
    TIMELINE_DATES.forEach((date, i) => {
      const t = i / (n - 1);
      const eased = t * t * (3 - 2 * t);
      out.push({
        ...ctx,
        compareSource: c.compareSource,
        date,
        inBoth: +(startBoth + (endBoth - startBoth) * eased).toFixed(1),
        onlyInPrimary: +(startOnlyP + (endOnlyP - startOnlyP) * eased).toFixed(1),
        onlyInCompared: +(startOnlyC + (endOnlyC - startOnlyC) * eased).toFixed(1),
      });
    });
  });
  return out;
}

// With CRIS as the default primary source, comparison list includes OpenAlex (swapped in for CRIS)
export const coverageComparisons: CoverageComparison[] = [
  { ...fc, compareSource: 'OpenAlex', onlyInPrimary: 77386, inBoth: 139023, onlyInCompared: 41200, total: 257609 },
  { ...fc, compareSource: 'Crossref', onlyInPrimary: 26164, inBoth: 190245, onlyInCompared: 5600, total: 222009 },
  { ...fc, compareSource: 'OpenAIRE', onlyInPrimary: 48091, inBoth: 168318, onlyInCompared: 18900, total: 235309 },
  { ...fcRug, compareSource: 'OpenAlex', onlyInPrimary: 152429, inBoth: 163428, onlyInCompared: 11000, total: 326857 },
  { ...fcRug, compareSource: 'Crossref', onlyInPrimary: 38214, inBoth: 277643, onlyInCompared: 7800, total: 323657 },
  { ...fcRug, compareSource: 'OpenAIRE', onlyInPrimary: 65872, inBoth: 249985, onlyInCompared: 25400, total: 341257 },
];

export const coverageTimeline: CoverageTimelinePoint[] = [
  ...buildCoverageTimeline(fc, coverageComparisons),
  ...buildCoverageTimeline(fcRug, coverageComparisons),
];

export const detailRecords: DetailRecord[] = [
  { ...fc, id: 'rec-001', title: 'Machine Learning Applications in Climate Science: A Systematic Review', doi: '10.1234/ml-climate-2023', authors: 'van der Berg, J.; de Vries, A.', year: 2023, sources: ['CRIS', 'OpenAlex', 'Crossref', 'OpenAIRE'] },
  { ...fc, id: 'rec-002', title: 'Quantum Computing for Drug Discovery in the Netherlands', doi: '10.1234/qc-drug-2023', authors: 'Jansen, P.; Bakker, M.; Singh, R.', year: 2023, sources: ['CRIS'] },
  { ...fc, id: 'rec-003', title: 'Sustainable Urban Planning: Amsterdam Case Study', doi: '10.5678/urban-ams-2022', authors: 'de Groot, L.', year: 2022, sources: ['OpenAlex', 'Crossref'] },
  { ...fc, id: 'rec-004', title: 'Neural Networks for Dutch Language Processing', doi: '10.9012/nlp-dutch-2023', authors: 'Vermeer, K.; Hendriks, S.', year: 2023, sources: ['CRIS', 'Crossref', 'OpenAIRE'] },
  { ...fc, id: 'rec-005', title: 'Biodiversity Loss in the Wadden Sea: A Longitudinal Study', doi: '10.3456/wadden-bio-2022', authors: 'Smit, H.; de Jong, R.; Mulder, T.', year: 2022, sources: ['CRIS', 'OpenAIRE'] },
  { ...fc, id: 'rec-006', title: 'Advances in Photovoltaic Cell Efficiency', doi: '10.5678/pv-eff-2023', authors: 'van Dijk, E.', year: 2023, sources: ['CRIS', 'OpenAIRE'] },
  { ...fc, id: 'rec-007', title: 'Digital Humanities and the Dutch Golden Age Archives', doi: '10.7890/dh-golden-2023', authors: 'Bosman, J.; Kramer, B.', year: 2023, sources: ['OpenAlex', 'Crossref', 'OpenAIRE'] },
  { ...fc, id: 'rec-008', title: 'Water Management Infrastructure Resilience', doi: '10.2345/water-infra-2022', authors: 'Visser, M.; ter Haar, D.', year: 2022, sources: ['CRIS', 'Crossref'] },
  { ...fc, id: 'rec-009', title: 'Open Science Practices in Dutch Social Sciences', doi: '10.4567/open-soc-2023', authors: 'Peters, R.; van Leeuwen, J.', year: 2023, sources: ['CRIS', 'OpenAlex', 'OpenAIRE'] },
  { ...fc, id: 'rec-010', title: 'AI Ethics Frameworks in European Research', doi: '10.6789/ai-ethics-2022', authors: 'Klein, A.', year: 2022, sources: ['OpenAlex', 'OpenAIRE'] },
  { ...fcRug, id: 'rug-001', title: 'Cold Atom Physics: Precision Measurements at Groningen', doi: '10.1234/cold-atom-2023', authors: 'Wiersma, D.; Postma, J.', year: 2023, sources: ['CRIS', 'OpenAlex', 'Crossref'] },
  { ...fcRug, id: 'rug-002', title: 'Healthy Ageing Cohort Study: 20-Year Follow-up', doi: '10.5678/ageing-rug-2022', authors: 'Bakker, S.; Visser, A.; Dijkstra, T.', year: 2022, sources: ['CRIS', 'OpenAIRE'] },
  { ...fcRug, id: 'rug-003', title: 'Frisian Language Revitalisation in Digital Media', doi: '10.2468/frisian-rug-2023', authors: 'de Boer, F.', year: 2023, sources: ['CRIS'] },
  { ...fcRug, id: 'rug-004', title: 'Sustainable Energy Transition in Northern Netherlands', doi: '10.9012/energy-north-2023', authors: 'Hoekstra, M.; van der Veen, R.', year: 2023, sources: ['CRIS', 'OpenAIRE', 'Crossref'] },
  { ...fcRug, id: 'rug-005', title: 'Archaeological Discoveries in the Terpen Region', doi: '10.3456/terpen-arch-2022', authors: 'Nieuwhof, A.', year: 2022, sources: ['OpenAlex', 'Crossref'] },
  { ...fcRug, id: 'rug-006', title: 'Marine Microbiology of the North Sea', doi: '10.7890/marine-rug-2023', authors: 'Stomp, M.; Huisman, J.', year: 2023, sources: ['CRIS', 'OpenAlex', 'Crossref', 'OpenAIRE'] },
];

// Populate per-source missing fields deterministically so the Completeness page can show
// cross-source presence/absence (e.g. CRIS missing ROR but OpenAlex has it → enrichable).
const ALL_METADATA_FIELDS = ['doi', 'orcid', 'ror', 'grantDoi', 'issn', 'oaStatus', 'correspondingAuthor'] as const;
detailRecords.forEach(rec => {
  const seed = rec.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const bySource: Partial<Record<Source, string[]>> = {};
  rec.sources.forEach((src, sIdx) => {
    const offset = src === 'CRIS' ? 0 : sIdx * 5;
    const missing = ALL_METADATA_FIELDS.filter(
      (_f, fIdx) => ((seed + offset + fIdx * 11) % (src === 'CRIS' ? 4 : 6)) === 0,
    );
    bySource[src] = missing;
  });
  rec.missingFieldsBySource = bySource;
});

export const interventions: Intervention[] = [
  // Accuracy interventions — per conflicting field between the primary source and the comparison source
  { id: 'acc-ror-1', page: 'Accuracy', accuracyField: 'ror', title: 'Reconcile ROR affiliations with the registry', description: 'When CRIS and the comparison source disagree on the institutional ROR id, run both values through ror.org and pick the active canonical id; persist it back into CRIS.', effort: 'Low', impact: 'High', actionUrl: 'https://ror.org/', actionLabel: 'ROR Registry' },
  { id: 'acc-ror-2', page: 'Accuracy', accuracyField: 'ror', title: 'Submit affiliation corrections upstream', description: 'For disagreements where CRIS is right, submit corrections to OpenAlex (institution feedback) or OpenAIRE (Broker) so the wrong ROR does not keep coming back.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://docs.openalex.org', actionLabel: 'OpenAlex feedback' },

  { id: 'acc-orcid-1', page: 'Accuracy', accuracyField: 'orcid', title: 'Verify conflicting ORCID iDs against orcid.org', description: 'ORCID conflicts usually come from author disambiguation in the comparison source. Use the ORCID public API to confirm the iD that owns the work.', effort: 'Low', impact: 'High', actionUrl: 'https://orcid.org/', actionLabel: 'ORCID' },
  { id: 'acc-orcid-2', page: 'Accuracy', accuracyField: 'orcid', title: 'Ask researchers to claim the work in ORCID', description: 'A confirmed ORCID claim propagates to OpenAlex and OpenAIRE within a release cycle and removes the conflict at the source.', effort: 'Low', impact: 'Medium' },

  { id: 'acc-authors-1', page: 'Accuracy', accuracyField: 'authors', title: 'Re-harvest author lists from the publisher record', description: 'Author-list disagreements often trace back to truncated or "et al." lists in one source. Re-harvest from the publisher landing page or Crossref REST and overwrite the shorter list.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://www.crossref.org/documentation/', actionLabel: 'Crossref Docs' },
  { id: 'acc-authors-2', page: 'Accuracy', accuracyField: 'authors', title: 'Normalise author name formats in CRIS', description: 'Standardise on "Family, Given" with full first names; many "different author list" flags are actually formatting drift, not real disagreement.', effort: 'Low', impact: 'Low' },

  { id: 'acc-year-1', page: 'Accuracy', accuracyField: 'year', title: 'Prefer published year over online-first year', description: 'Year conflicts almost always come from one source recording the online-first date and another the issue year. Pick the issued year from Crossref as the canonical value.', effort: 'Low', impact: 'High', actionUrl: 'https://www.crossref.org/documentation/', actionLabel: 'Crossref Docs' },
  { id: 'acc-year-2', page: 'Accuracy', accuracyField: 'year', title: 'Resolve DOI metadata drift', description: 'Cross-check the disagreeing year with doi.org and update CRIS with the resolved metadata.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://doi.org/', actionLabel: 'DOI Resolver' },


  // Enrichment interventions — per missing metadata entity in CRIS and the source it can be recovered from
  { id: 'enr-doi-openaire', page: 'Enrichment', enrichmentEntity: 'doi', enrichmentRecoverableFrom: 'OpenAIRE', title: 'Recover missing DOIs from OpenAIRE', description: 'Match CRIS records to OpenAIRE entries by title and authors, then write back the DOI surfaced by OpenAIRE\'s deduplication pipeline.', effort: 'Medium', impact: 'High', actionUrl: 'https://graph.openaire.eu/', actionLabel: 'OpenAIRE Graph' },
  { id: 'enr-doi-openalex', page: 'Enrichment', enrichmentEntity: 'doi', enrichmentRecoverableFrom: 'OpenAlex', title: 'Recover missing DOIs from OpenAlex', description: 'Query OpenAlex by ROR id and title; persist the DOI returned for matched works back into your CRIS.', effort: 'Low', impact: 'High', actionUrl: 'https://docs.openalex.org', actionLabel: 'OpenAlex Docs' },
  { id: 'enr-doi-crossref', page: 'Enrichment', enrichmentEntity: 'doi', enrichmentRecoverableFrom: 'Crossref', title: 'Recover missing DOIs from Crossref', description: 'Use the Crossref REST API with title + author + year to locate registered DOIs for records that are missing them in CRIS.', effort: 'Medium', impact: 'High', actionUrl: 'https://www.crossref.org/documentation/', actionLabel: 'Crossref Docs' },

  { id: 'enr-orcid-openaire', page: 'Enrichment', enrichmentEntity: 'orcid', enrichmentRecoverableFrom: 'OpenAIRE', title: 'Recover author ORCID iDs from OpenAIRE', description: 'OpenAIRE harvests ORCID claims; join on DOI and copy ORCID values back into the CRIS author table.', effort: 'Low', impact: 'High' },
  { id: 'enr-orcid-openalex', page: 'Enrichment', enrichmentEntity: 'orcid', enrichmentRecoverableFrom: 'OpenAlex', title: 'Recover author ORCID iDs from OpenAlex', description: 'Use OpenAlex authorships endpoint to pull verified ORCID iDs and link them to CRIS researchers.', effort: 'Low', impact: 'High', actionUrl: 'https://docs.openalex.org', actionLabel: 'OpenAlex Docs' },

  { id: 'enr-ror-openaire', page: 'Enrichment', enrichmentEntity: 'ror', enrichmentRecoverableFrom: 'OpenAIRE', title: 'Recover ROR affiliations from OpenAIRE', description: 'OpenAIRE resolves affiliation strings to ROR ids; use this to backfill ROR ids missing from CRIS affiliations.', effort: 'Medium', impact: 'Medium' },
  { id: 'enr-ror-openalex', page: 'Enrichment', enrichmentEntity: 'ror', enrichmentRecoverableFrom: 'OpenAlex', title: 'Recover ROR affiliations from OpenAlex', description: 'OpenAlex returns institution objects with ROR ids on every authorship. Match on DOI to enrich CRIS.', effort: 'Low', impact: 'Medium', actionUrl: 'https://ror.org', actionLabel: 'ROR' },

  { id: 'enr-grant-openaire', page: 'Enrichment', enrichmentEntity: 'grantDoi', enrichmentRecoverableFrom: 'OpenAIRE', title: 'Recover grant DOIs from OpenAIRE', description: 'Use OpenAIRE Project Search and the Crossref Funder Registry to attach grant DOIs to publications in CRIS.', effort: 'High', impact: 'Medium', actionUrl: 'https://api.openaire.eu/', actionLabel: 'OpenAIRE API' },
  { id: 'enr-grant-crossref', page: 'Enrichment', enrichmentEntity: 'grantDoi', enrichmentRecoverableFrom: 'Crossref', title: 'Recover grant DOIs from Crossref', description: 'Crossref exposes funder award ids on registered DOIs; harvest them and persist as grant DOIs in CRIS.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://www.crossref.org/services/funder-registry/', actionLabel: 'Funder Registry' },


  // Coverage interventions — what to do when records appear only in one source and not in the compared one
  { id: 'cov-001', page: 'Coverage', coverageOnlyInSource: 'CRIS', coverageNotInCompared: 'OpenAlex', title: 'Push CRIS-only records to OpenAlex', description: 'Records present in CRIS but missing from OpenAlex usually lack a registered DOI. Mint Crossref DOIs from your CRIS so OpenAlex picks them up automatically.', effort: 'Medium', impact: 'High', actionUrl: 'https://www.crossref.org/', actionLabel: 'Crossref' },
  { id: 'cov-002', page: 'Coverage', coverageOnlyInSource: 'OpenAlex', coverageNotInCompared: 'CRIS', title: 'Ingest OpenAlex-only works into CRIS', description: 'Works that exist in OpenAlex but not in your CRIS often correspond to outputs by visiting researchers or new staff. Run a ROR-based affiliation harvest into CRIS.', effort: 'Medium', impact: 'High' },
  { id: 'cov-003', page: 'Coverage', coverageOnlyInSource: 'CRIS', coverageNotInCompared: 'OpenAIRE', title: 'Expose CRIS records to OpenAIRE', description: 'Register the institutional repository in OpenAIRE Provide and ensure OAI-PMH exports include compliant rights and project metadata.', effort: 'Low', impact: 'Medium', actionUrl: 'https://provide.openaire.eu/', actionLabel: 'OpenAIRE Provide' },
  { id: 'cov-004', page: 'Coverage', coverageOnlyInSource: 'OpenAIRE', coverageNotInCompared: 'CRIS', title: 'Reconcile OpenAIRE-only publications with CRIS', description: 'Use the OpenAIRE Graph API to retrieve missing publications and import them into CRIS via DOI matching.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://graph.openaire.eu/', actionLabel: 'OpenAIRE Graph' },
  { id: 'cov-005', page: 'Coverage', coverageOnlyInSource: 'CRIS', coverageNotInCompared: 'Crossref', title: 'Register CRIS DOIs with Crossref', description: 'CRIS-only records without Crossref entries are typically reports or theses. Mint Crossref or DataCite DOIs to make them globally citable.', effort: 'Medium', impact: 'Medium' },
  { id: 'cov-006', page: 'Coverage', coverageOnlyInSource: 'Crossref', coverageNotInCompared: 'CRIS', title: 'Harvest Crossref-only records into CRIS', description: 'Pull Crossref entries for your ROR id and load them into CRIS as candidate records for librarian review.', effort: 'Low', impact: 'High' },
  { id: 'cov-007', page: 'Coverage', coverageOnlyInSource: 'OpenAlex', coverageNotInCompared: 'OpenAIRE', title: 'Notify OpenAIRE of OpenAlex-only outputs', description: 'OpenAIRE typically incorporates OpenAlex records on a weekly cycle; persistent gaps usually point to licence or rights metadata issues.', effort: 'Low', impact: 'Low' },
  { id: 'cov-008', page: 'Coverage', coverageOnlyInSource: 'OpenAIRE', coverageNotInCompared: 'OpenAlex', title: 'Submit OpenAIRE-only publications to OpenAlex', description: 'Use the OpenAlex correction endpoint to surface theses and project outputs that are only indexed by OpenAIRE today.', effort: 'Medium', impact: 'Medium', actionUrl: 'https://docs.openalex.org', actionLabel: 'OpenAlex Docs' },

  // Completeness interventions — per source, how to improve a specific metadata element
  { id: 'comp-001', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveDOI', title: 'Add DOI lookup to CRIS deposit form', description: 'Block submission of journal articles without a DOI by adding a Crossref auto-lookup step in the CRIS deposit workflow.', effort: 'Medium', impact: 'High' },
  { id: 'comp-002', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveORCID', title: 'Mandate ORCID at staff onboarding', description: 'Require ORCID iD verification when researchers are added to CRIS so all of their deposits inherit it.', effort: 'Low', impact: 'High', actionUrl: 'https://orcid.org', actionLabel: 'ORCID' },
  { id: 'comp-003', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveROR', title: 'Backfill ROR ids on CRIS affiliations', description: 'Run a one-off mapping job from internal organisation codes to ROR ids and persist them on the affiliation table.', effort: 'Low', impact: 'Medium', actionUrl: 'https://ror.org', actionLabel: 'ROR' },
  { id: 'comp-004', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveGrantDOI', title: 'Match grant DOIs from OpenAIRE in CRIS', description: 'Use OpenAIRE Project Search to enrich CRIS funding records with Crossref Funder Registry DOIs.', effort: 'High', impact: 'Medium' },
  { id: 'comp-005', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveISSN', title: 'Validate ISSN against ROAD at deposit', description: 'Use the ROAD ISSN registry as a CRIS validator to ensure ISSNs are well-formed and active.', effort: 'Low', impact: 'Low' },
  { id: 'comp-006', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveOAstatus', title: 'Sync OA status from Unpaywall into CRIS', description: 'Run a nightly Unpaywall lookup keyed on DOI to populate the CRIS oaStatus field consistently.', effort: 'Low', impact: 'High' },
  { id: 'comp-007', page: 'Completeness', completenessSource: 'CRIS', metadataEntity: 'improveCorrespondingAuthor', title: 'Capture corresponding author at deposit', description: 'Add a required radio-button on the CRIS deposit form to mark the corresponding author for every record.', effort: 'Low', impact: 'Medium' },
  { id: 'comp-008', page: 'Completeness', completenessSource: 'OpenAlex', metadataEntity: 'improveDOI', title: 'Submit DOI corrections to OpenAlex', description: 'Use the OpenAlex correction endpoint to add DOIs for your works that lack them.', effort: 'Low', impact: 'High', actionUrl: 'https://docs.openalex.org', actionLabel: 'OpenAlex Docs' },
  { id: 'comp-009', page: 'Completeness', completenessSource: 'OpenAlex', metadataEntity: 'improveORCID', title: 'Claim authorships in OpenAlex', description: 'Encourage authors to claim their OpenAlex profile and link an ORCID iD so it propagates across all of their works.', effort: 'Low', impact: 'High' },
  { id: 'comp-010', page: 'Completeness', completenessSource: 'OpenAlex', metadataEntity: 'improveROR', title: 'Improve institution disambiguation in OpenAlex', description: 'Submit affiliation strings missing a ROR id to OpenAlex feedback so the institution disambiguation model is updated.', effort: 'Low', impact: 'Medium' },
  { id: 'comp-011', page: 'Completeness', completenessSource: 'OpenAIRE', metadataEntity: 'improveGrantDOI', title: 'Push Crossref Funder Registry ids via OpenAIRE Broker', description: 'Provide funder DOIs through the OpenAIRE Broker so they propagate to all aggregators.', effort: 'Medium', impact: 'High', actionUrl: 'https://broker.openaire.eu', actionLabel: 'OpenAIRE Broker' },
  { id: 'comp-012', page: 'Completeness', completenessSource: 'OpenAIRE', metadataEntity: 'improveOAstatus', title: 'Verify OA rights statements at the repository', description: 'OpenAIRE relies on dc:rights values; ensure repositories use COAR / Europeana-compliant access-rights vocabularies.', effort: 'Medium', impact: 'High' },
  { id: 'comp-013', page: 'Completeness', completenessSource: 'Crossref', metadataEntity: 'improveISSN', title: 'Update journal ISSN in Crossref deposits', description: 'Crossref deposits without ISSN are common for new venues. Add ISSN validation to your deposit pipeline before submission.', effort: 'Low', impact: 'Medium' },
  { id: 'comp-014', page: 'Completeness', completenessSource: 'Crossref', metadataEntity: 'improveCorrespondingAuthor', title: 'Mark corresponding authors in Crossref deposits', description: 'The Crossref schema supports a corresponding author flag; ensure publishers include it when registering DOIs.', effort: 'Medium', impact: 'Medium' },
  { id: 'comp-015', page: 'Completeness', completenessSource: 'Crossref', metadataEntity: 'improveDOI', title: 'Resolve unregistered Crossref DOIs', description: 'Audit DOIs that fail to resolve at doi.org and resubmit corrected metadata to Crossref.', effort: 'Medium', impact: 'High' },
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

export const announcement = {
  enabled: true,
  label: 'Demo',
  text: 'This is a mockup version of the dashboard for demonstration purposes — figures and records are illustrative, not live data.',
};

export const enrichmentEntities: EnrichmentEntity[] = [
  {
    ...fc, entity: 'ror', label: 'ROR', missingPercentage: 74, missingCount: 160143, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 10, count: 16014 },
      { source: 'OpenAlex', percentage: 10, count: 16014 },
    ],
  },
  {
    ...fc, entity: 'orcid', label: 'ORCID', missingPercentage: 66, missingCount: 142830, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 20, count: 28566 },
      { source: 'OpenAlex', percentage: 10, count: 14283 },
    ],
  },
  {
    ...fc, entity: 'doi', label: 'DOI', missingPercentage: 37, missingCount: 80071, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 15, count: 12011 },
      { source: 'OpenAlex', percentage: 10, count: 8007 },
      { source: 'Crossref', percentage: 20, count: 16014 },
    ],
  },
  {
    ...fc, entity: 'grantDoi', label: 'Grant DOI', missingPercentage: 81, missingCount: 175291, totalRecords: 216409,
    recoverable: [
      { source: 'OpenAIRE', percentage: 18, count: 31552 },
      { source: 'Crossref', percentage: 7, count: 12270 },
    ],
  },
  {
    ...fcRug, entity: 'ror', label: 'ROR', missingPercentage: 69, missingCount: 217941, totalRecords: 315857,
    recoverable: [
      { source: 'OpenAIRE', percentage: 12, count: 26153 },
      { source: 'OpenAlex', percentage: 11, count: 23974 },
    ],
  },
  {
    ...fcRug, entity: 'orcid', label: 'ORCID', missingPercentage: 58, missingCount: 183197, totalRecords: 315857,
    recoverable: [
      { source: 'OpenAIRE', percentage: 22, count: 40303 },
      { source: 'OpenAlex', percentage: 12, count: 21984 },
    ],
  },
  {
    ...fcRug, entity: 'doi', label: 'DOI', missingPercentage: 31, missingCount: 97916, totalRecords: 315857,
    recoverable: [
      { source: 'OpenAIRE', percentage: 17, count: 16646 },
      { source: 'OpenAlex', percentage: 12, count: 11750 },
      { source: 'Crossref', percentage: 22, count: 21542 },
    ],
  },
  {
    ...fcRug, entity: 'grantDoi', label: 'Grant DOI', missingPercentage: 77, missingCount: 243210, totalRecords: 315857,
    recoverable: [
      { source: 'OpenAIRE', percentage: 20, count: 48642 },
      { source: 'Crossref', percentage: 8, count: 19457 },
    ],
  },
];

export const accuracyComparison: AccuracyComparison[] = [
  {
    ...fc,
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
  },
  {
    ...fcRug,
    primarySource: 'CRIS',
    compareSource: 'OpenAlex',
    recordsInPrimary: 163000,
    recordsInBoth: 112000,
    recordsInCompare: 175000,
    conflicts: [
      { field: 'ror', label: 'different ROR affiliation id', count: 67200, percentage: 75 },
      { field: 'orcid', label: 'different ORCiD', count: 67200, percentage: 75 },
      { field: 'authors', label: 'different author list', count: 14560, percentage: 13 },
      { field: 'year', label: 'different publication year', count: 4480, percentage: 4 },
    ],
    agreements: [
      { field: 'ror', label: 'same ROR affiliation id', count: 28000, percentage: 25 },
      { field: 'orcid', label: 'same ORCID', count: 28000, percentage: 25 },
      { field: 'authors', label: 'matching author list', count: 97440, percentage: 87 },
      { field: 'year', label: 'matching publication year', count: 107520, percentage: 96 },
    ],
  },
];

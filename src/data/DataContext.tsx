import { createContext, useContext, useState, ReactNode } from 'react';
import {
  organisations as defaultOrganisations,
  completenessMetrics as defaultCompletenessMetrics,
  completenessTimeline as defaultCompletenessTimeline,
  coverageComparisons as defaultCoverageComparisons,
  coverageTimeline as defaultCoverageTimeline,
  detailRecords as defaultDetailRecords,
  interventions as defaultInterventions,
  enrichmentEntities as defaultEnrichmentEntities,
  accuracyComparison as defaultAccuracyComparison,
  overviewCards as defaultOverviewCards,
  announcement as defaultAnnouncement,
} from './mockData';
import type {
  Organisation,
  CompletenessMetric,
  TimelinePoint,
  CoverageComparison,
  CoverageTimelinePoint,
  DetailRecord,
  Intervention,
  EnrichmentEntity,
  AccuracyComparison,
  OverviewCard,
  Announcement,
  DashboardFilters,
  FilterContext,
} from './types';

interface DataContextValue {
  organisations: Organisation[];
  setOrganisations: (v: Organisation[]) => void;
  completenessMetrics: CompletenessMetric[];
  setCompletenessMetrics: (v: CompletenessMetric[]) => void;
  completenessTimeline: TimelinePoint[];
  setCompletenessTimeline: (v: TimelinePoint[]) => void;
  coverageComparisons: CoverageComparison[];
  setCoverageComparisons: (v: CoverageComparison[]) => void;
  coverageTimeline: CoverageTimelinePoint[];
  setCoverageTimeline: (v: CoverageTimelinePoint[]) => void;
  detailRecords: DetailRecord[];
  setDetailRecords: (v: DetailRecord[]) => void;
  interventions: Intervention[];
  setInterventions: (v: Intervention[]) => void;
  enrichmentEntities: EnrichmentEntity[];
  setEnrichmentEntities: (v: EnrichmentEntity[]) => void;
  accuracyComparison: AccuracyComparison[];
  setAccuracyComparison: (v: AccuracyComparison[]) => void;
  overviewCards: OverviewCard[];
  setOverviewCards: (v: OverviewCard[]) => void;
  announcement: Announcement;
  setAnnouncement: (v: Announcement) => void;
  resetAll: () => void;
}



const DataContext = createContext<DataContextValue | null>(null);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const [organisations, setOrganisations] = useState<Organisation[]>(defaultOrganisations);
  const [completenessMetrics, setCompletenessMetrics] = useState<CompletenessMetric[]>(defaultCompletenessMetrics);
  const [completenessTimeline, setCompletenessTimeline] = useState<TimelinePoint[]>(defaultCompletenessTimeline);
  const [coverageComparisons, setCoverageComparisons] = useState<CoverageComparison[]>(defaultCoverageComparisons);
  const [coverageTimeline, setCoverageTimeline] = useState<CoverageTimelinePoint[]>(defaultCoverageTimeline);
  const [detailRecords, setDetailRecords] = useState<DetailRecord[]>(defaultDetailRecords);
  const [interventions, setInterventions] = useState<Intervention[]>(defaultInterventions);
  const [enrichmentEntities, setEnrichmentEntities] = useState<EnrichmentEntity[]>(defaultEnrichmentEntities);
  const [accuracyComparison, setAccuracyComparison] = useState<AccuracyComparison[]>(defaultAccuracyComparison);
  const [overviewCards, setOverviewCards] = useState<OverviewCard[]>(defaultOverviewCards);
  const [announcement, setAnnouncement] = useState<Announcement>(defaultAnnouncement);

  const resetAll = () => {
    setOrganisations(defaultOrganisations);
    setCompletenessMetrics(defaultCompletenessMetrics);
    setCompletenessTimeline(defaultCompletenessTimeline);
    setCoverageComparisons(defaultCoverageComparisons);
    setCoverageTimeline(defaultCoverageTimeline);
    setDetailRecords(defaultDetailRecords);
    setInterventions(defaultInterventions);
    setEnrichmentEntities(defaultEnrichmentEntities);
    setAccuracyComparison(defaultAccuracyComparison);
    setOverviewCards(defaultOverviewCards);
    setTotalRecords(DEFAULT_TOTAL_RECORDS);
    setAnnouncement(defaultAnnouncement);
  };

  return (
    <DataContext.Provider
      value={{
        organisations, setOrganisations,
        completenessMetrics, setCompletenessMetrics,
        completenessTimeline, setCompletenessTimeline,
        coverageComparisons, setCoverageComparisons,
        coverageTimeline, setCoverageTimeline,
        detailRecords, setDetailRecords,
        interventions, setInterventions,
        enrichmentEntities, setEnrichmentEntities,
        accuracyComparison, setAccuracyComparison,
        overviewCards, setOverviewCards,
        totalRecords, setTotalRecords,
        announcement, setAnnouncement,
        resetAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDashboardData must be used within DashboardDataProvider');
  return ctx;
}

/**
 * Returns mock-data arrays filtered by the current sidebar selection.
 * Matches rows by RORID, primary source, entity table and type.
 */
export function useFilteredData(filters: DashboardFilters) {
  const ctx = useDashboardData();
  const org = ctx.organisations.find(o => o.id === filters.organisation);
  const orgRor = org?.rorId ?? '';
  const typeMatch = filters.publicationType === 'All' ? 'All Types' : filters.publicationType;

  const matches = (item: FilterContext) =>
    item.filterOrganisationRORID === orgRor &&
    item.filterPrimarySource === filters.source &&
    item.filterEntityTable === filters.cerifEntity &&
    item.filterType === typeMatch;

  return {
    completenessMetrics: ctx.completenessMetrics.filter(matches),
    completenessTimeline: ctx.completenessTimeline.filter(matches),
    coverageComparisons: ctx.coverageComparisons.filter(matches),
    coverageTimeline: ctx.coverageTimeline.filter(matches),
    detailRecords: ctx.detailRecords.filter(matches),
    enrichmentEntities: ctx.enrichmentEntities.filter(matches),
    accuracyComparison: ctx.accuracyComparison.filter(matches),
  };
}

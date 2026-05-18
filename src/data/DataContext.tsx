import { createContext, useContext, useState, ReactNode } from 'react';
import {
  organisations as defaultOrganisations,
  completenessMetrics as defaultCompletenessMetrics,
  completenessTimeline as defaultCompletenessTimeline,
  coverageComparisons as defaultCoverageComparisons,
  detailRecords as defaultDetailRecords,
  interventions as defaultInterventions,
  enrichmentEntities as defaultEnrichmentEntities,
  accuracyComparison as defaultAccuracyComparison,
  overviewCards as defaultOverviewCards,
} from './mockData';
import type {
  Organisation,
  CompletenessMetric,
  TimelinePoint,
  CoverageComparison,
  DetailRecord,
  Intervention,
  EnrichmentEntity,
  AccuracyComparison,
  OverviewCard,
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
  detailRecords: DetailRecord[];
  setDetailRecords: (v: DetailRecord[]) => void;
  interventions: Intervention[];
  setInterventions: (v: Intervention[]) => void;
  enrichmentEntities: EnrichmentEntity[];
  setEnrichmentEntities: (v: EnrichmentEntity[]) => void;
  accuracyComparison: AccuracyComparison;
  setAccuracyComparison: (v: AccuracyComparison) => void;
  totalRecords: number;
  setTotalRecords: (v: number) => void;
  resetAll: () => void;
}

const DEFAULT_TOTAL_RECORDS = 216409;

const DataContext = createContext<DataContextValue | null>(null);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const [organisations, setOrganisations] = useState<Organisation[]>(defaultOrganisations);
  const [completenessMetrics, setCompletenessMetrics] = useState<CompletenessMetric[]>(defaultCompletenessMetrics);
  const [completenessTimeline, setCompletenessTimeline] = useState<TimelinePoint[]>(defaultCompletenessTimeline);
  const [coverageComparisons, setCoverageComparisons] = useState<CoverageComparison[]>(defaultCoverageComparisons);
  const [detailRecords, setDetailRecords] = useState<DetailRecord[]>(defaultDetailRecords);
  const [interventions, setInterventions] = useState<Intervention[]>(defaultInterventions);
  const [enrichmentEntities, setEnrichmentEntities] = useState<EnrichmentEntity[]>(defaultEnrichmentEntities);
  const [accuracyComparison, setAccuracyComparison] = useState<AccuracyComparison>(defaultAccuracyComparison);
  const [totalRecords, setTotalRecords] = useState<number>(DEFAULT_TOTAL_RECORDS);

  const resetAll = () => {
    setOrganisations(defaultOrganisations);
    setCompletenessMetrics(defaultCompletenessMetrics);
    setCompletenessTimeline(defaultCompletenessTimeline);
    setCoverageComparisons(defaultCoverageComparisons);
    setDetailRecords(defaultDetailRecords);
    setInterventions(defaultInterventions);
    setEnrichmentEntities(defaultEnrichmentEntities);
    setAccuracyComparison(defaultAccuracyComparison);
    setTotalRecords(DEFAULT_TOTAL_RECORDS);
  };

  return (
    <DataContext.Provider
      value={{
        organisations, setOrganisations,
        completenessMetrics, setCompletenessMetrics,
        completenessTimeline, setCompletenessTimeline,
        coverageComparisons, setCoverageComparisons,
        detailRecords, setDetailRecords,
        interventions, setInterventions,
        enrichmentEntities, setEnrichmentEntities,
        accuracyComparison, setAccuracyComparison,
        totalRecords, setTotalRecords,
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

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { StartScreen } from '@/components/dashboard/screens/StartScreen';
import { CompletenessScreen } from '@/components/dashboard/screens/CompletenessScreen';
import { CoverageScreen } from '@/components/dashboard/screens/CoverageScreen';
import { EnrichmentScreen } from '@/components/dashboard/screens/EnrichmentScreen';
import { AccuracyScreen } from '@/components/dashboard/screens/AccuracyScreen';
import { MockDataScreen } from '@/components/dashboard/screens/MockDataScreen';
import { DashboardDataProvider } from '@/data/DataContext';
import type { CerifEntity, DashboardFilters, MatchingMethod, PublicationType, Source } from '@/data/types';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { CheckCircle2, Database, Home, Layers, Sparkles, Target } from 'lucide-react';
import { SurfLogo } from '@/components/ui/SurfLogo';

export default function DashboardLayout() {
  const [organisation, setOrganisation] = useState('vu');
  const [source, setSource] = useState<Source>('CRIS');
  const [cerifEntity, setCerifEntity] = useState<CerifEntity>('Publications');
  const [publicationType, setPublicationType] = useState<PublicationType | 'All'>('All');
  const [matchingMethod, setMatchingMethod] = useState<MatchingMethod>('doi');
  const [activeTab, setActiveTab] = useState('start');

  const filters: DashboardFilters = { organisation, source, cerifEntity, publicationType, matchingMethod };

  return (
    <DashboardDataProvider>
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-5 border-b border-sidebar-border">
            <SurfLogo variant="dark" showText={true} />
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-widest mb-2">Filters</SidebarGroupLabel>
              <SidebarGroupContent>
                <FilterPanel
                  organisation={organisation}
                  source={source}
                  cerifEntity={cerifEntity}
                  publicationType={publicationType}
                  onOrganisationChange={setOrganisation}
                  onSourceChange={setSource}
                  onCerifEntityChange={setCerifEntity}
                  onPublicationTypeChange={setPublicationType}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 h-14 flex items-center gap-4 border-b bg-background/95 backdrop-blur px-4">
            <SidebarTrigger />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="bg-muted">
                <TabsTrigger value="start" className="gap-1.5"><Home className="h-3.5 w-3.5" /><span className="hidden sm:inline">About</span></TabsTrigger>
                <TabsTrigger value="coverage" className="gap-1.5"><Layers className="h-3.5 w-3.5" /><span className="hidden sm:inline">Coverage</span></TabsTrigger>
                <TabsTrigger value="completeness" className="gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Completeness</span></TabsTrigger>
                <TabsTrigger value="enrichment" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" /><span className="hidden sm:inline">Enrichment</span></TabsTrigger>
                <TabsTrigger value="accuracy" className="gap-1.5"><Target className="h-3.5 w-3.5" /><span className="hidden sm:inline">Accuracy</span></TabsTrigger>
                <TabsTrigger value="data" className="gap-1.5"><Database className="h-3.5 w-3.5" /><span className="hidden sm:inline">Data</span></TabsTrigger>
              </TabsList>
            </Tabs>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'start' && <StartScreen />}
            {activeTab === 'coverage' && <CoverageScreen filters={filters} onMatchingMethodChange={setMatchingMethod} />}
            {activeTab === 'completeness' && <CompletenessScreen filters={filters} />}
            {activeTab === 'enrichment' && <EnrichmentScreen filters={filters} onMatchingMethodChange={setMatchingMethod} />}
            {activeTab === 'accuracy' && <AccuracyScreen filters={filters} onMatchingMethodChange={setMatchingMethod} />}
            {activeTab === 'data' && <MockDataScreen />}
          </main>
        </div>
      </div>
    </SidebarProvider>
    </DashboardDataProvider>
  );
}
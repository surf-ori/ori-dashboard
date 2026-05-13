import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { StartScreen } from '@/components/dashboard/screens/StartScreen';
import { CompletenessScreen } from '@/components/dashboard/screens/CompletenessScreen';
import { CoverageScreen } from '@/components/dashboard/screens/CoverageScreen';
import { EnrichmentScreen } from '@/components/dashboard/screens/EnrichmentScreen';
import { AccuracyScreen } from '@/components/dashboard/screens/AccuracyScreen';
import type { CerifEntity, DashboardFilters, MatchingMethod, PublicationType, Source } from '@/data/types';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { CheckCircle2, Home, Layers, Sparkles, Target } from 'lucide-react';
import surfLogo from '@/assets/surf-logo-white.svg';

export default function DashboardLayout() {
  const [organisation, setOrganisation] = useState('vu');
  const [source, setSource] = useState<Source>('CRIS');
  const [cerifEntity, setCerifEntity] = useState<CerifEntity>('Publications');
  const [publicationType, setPublicationType] = useState<PublicationType | 'All'>('All');
  const [matchingMethod, setMatchingMethod] = useState<MatchingMethod>('doi');
  const [activeTab, setActiveTab] = useState('start');

  const filters: DashboardFilters = { organisation, source, cerifEntity, publicationType, matchingMethod };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-5 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <img src={surfLogo} alt="SURF" className="h-8 w-auto" />
              <div className="border-l border-sidebar-border pl-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/60 font-semibold">ORI</p>
                <h2 className="font-display font-extrabold text-sm text-sidebar-foreground leading-tight">Quality Dashboard</h2>
              </div>
            </div>
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
              </TabsList>
            </Tabs>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'start' && <StartScreen />}
            {activeTab === 'coverage' && <CoverageScreen filters={filters} onMatchingMethodChange={setMatchingMethod} />}
            {activeTab === 'completeness' && <CompletenessScreen filters={filters} />}
            {activeTab === 'enrichment' && <EnrichmentScreen filters={filters} onMatchingMethodChange={setMatchingMethod} />}
            {activeTab === 'accuracy' && <AccuracyScreen filters={filters} onMatchingMethodChange={setMatchingMethod} />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

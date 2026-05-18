import { useState } from 'react';
import { cn } from '@/lib/utils';
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
    <DashboardDataProvider>
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-5 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <img src={surfLogo} alt="SURF" className="h-9 w-auto" />
              <div className="border-l border-sidebar-border pl-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-sidebar-primary font-bold">
                  Open Research Information
                </p>
                <h2 className="font-display font-extrabold text-sm text-sidebar-foreground leading-tight">
                  Data quality dashboard
                </h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-primary text-[11px] font-semibold uppercase tracking-[0.08em] mb-2">
                Filters
              </SidebarGroupLabel>
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
          <header className="sticky top-0 z-10 flex items-center gap-6 border-b border-border-soft bg-background px-6 h-16">
            <SidebarTrigger className="text-foreground" />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="h-16 bg-transparent p-0 gap-7 rounded-none justify-start">
                {[
                  { value: 'start', label: 'About', Icon: Home },
                  { value: 'coverage', label: 'Coverage', Icon: Layers },
                  { value: 'completeness', label: 'Completeness', Icon: CheckCircle2 },
                  { value: 'enrichment', label: 'Enrichment', Icon: Sparkles },
                  { value: 'accuracy', label: 'Accuracy', Icon: Target },
                  { value: 'data', label: 'Data', Icon: Database },
                ].map(({ value, label, Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={cn(
                      "relative h-16 rounded-none bg-transparent px-0 py-0 text-sm font-semibold text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-px after:h-[3px] after:rounded-t-sm after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:origin-left",
                      value === 'data' && 'ml-auto',
                    )}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </header>

          <main className="flex-1 px-8 py-8 overflow-y-auto bg-background">
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

import { KPICard } from '@/components/dashboard/KPICard';
import { summaryStats } from '@/data/mockData';
import { useDashboardData } from '@/data/DataContext';
import { Sparkles, CheckCircle2, Layers, Target } from 'lucide-react';

export function StartScreen() {
  const { organisations } = useDashboardData();
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">ORI Quality Dashboard</h1>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Gebouwd voor metadata specialists bij de Nederlandse ondertekenaars van de{' '}
          <a href="https://barcelona-declaration.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Barcelona Declaration on Open Research Information
          </a>
          . Dit dashboard laat zien waar de metadata van jouw instelling kan worden verbeterd across de open sources
          met Open Research Information over jouw organisatie — metingen voor{' '}
          <strong>coverage</strong>, <strong>completeness</strong>, <strong>enrichment</strong> potentieel en{' '}
          <strong>accuracy</strong>.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Overzicht</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard label="Sources Monitored" value={summaryStats.totalSources} subtitle="OpenAlex, Crossref, OpenAIRE, CRIS, ORCID, ROR, DataCite" variant="accent" />
          <KPICard label="Organisaties" value={summaryStats.totalOrganisations} subtitle="Nederlandse onderzoeksinstellingen" />
          <KPICard label="Totaal Records" value={summaryStats.totalRecords.toLocaleString()} subtitle="Across all sources and organisations" />
          <KPICard label="Gem. Completeness" value={`${summaryStats.avgCompleteness}%`} subtitle="Metadata field coverage" variant="accent" />
          <KPICard label="Gem. Coverage" value={`${summaryStats.avgCoverage}%`} subtitle="Cross-source record overlap" variant="accent" />
          <KPICard label="Gem. Accuracy" value="80%" subtitle="Conflict-free shared records" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Deelnemende organisaties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {organisations.map(org => (
            <div key={org.id} className="flex items-center gap-3 rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-sm">
                {org.abbreviation.slice(0, 3)}
              </div>
              <div>
                <p className="font-medium text-sm">{org.name}</p>
                <p className="text-xs text-muted-foreground font-mono">ROR: {org.rorId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-3">Aan de slag</h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Gebruik de tabs hierboven om verschillende dimensies van data kwaliteit te verkennen. Selecteer een organisatie en
          entity type vanuit de sidebar filters om je analyse te focussen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <Layers className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Coverage</p>
              <p className="text-muted-foreground">Zijn de records van jouw instelling vertegenwoordigd across de geselecteerde sources?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Completeness</p>
              <p className="text-muted-foreground">Zijn records in de selected sources ingevuld met valid values voor de required fields (DOI, ROR, ORCID)?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Enrichment</p>
              <p className="text-muted-foreground">Welke missing values kunnen worden recovered from comparing sources om jouw primary source te enrichen?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Accuracy</p>
              <p className="text-muted-foreground">Waar zijn values niet consistent between sources, en hoe kunnen conflicts worden opgelost?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
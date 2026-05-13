import { KPICard } from '@/components/dashboard/KPICard';
import { summaryStats, organisations } from '@/data/mockData';
import { Sparkles, CheckCircle2, Layers, Target } from 'lucide-react';

export function StartScreen() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">ORI Quality Dashboard</h1>
        <p className="text-muted-foreground max-w-3xl">
          Built for metadata specialists at the Dutch signatories of the{' '}
          <a href="https://barcelona-declaration.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Barcelona Declaration on Open Research Information
          </a>
          . This dashboard shows where the metadata of your institution can be improved across the open sources
          containing Open Research Information about your organisation — measuring{' '}
          <strong>coverage</strong>, <strong>completeness</strong>, <strong>enrichment</strong> potential and{' '}
          <strong>accuracy</strong>.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard label="Sources Monitored" value={summaryStats.totalSources} subtitle="OpenAlex, Crossref, OpenAIRE, CRIS, ORCID, ROR, DataCite" variant="accent" />
          <KPICard label="Organisations" value={summaryStats.totalOrganisations} subtitle="Dutch Research Performing Organisations" />
          <KPICard label="Total Records" value={summaryStats.totalRecords.toLocaleString()} subtitle="Across all sources and organisations" />
          <KPICard label="Avg. Completeness" value={`${summaryStats.avgCompleteness}%`} subtitle="Metadata field coverage" variant="accent" />
          <KPICard label="Avg. Coverage" value={`${summaryStats.avgCoverage}%`} subtitle="Cross-source record overlap" variant="accent" />
          <KPICard label="Avg. Accuracy" value="80%" subtitle="Conflict-free shared records" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Participating Organisations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {organisations.map(org => (
            <div key={org.id} className="flex items-center gap-3 rounded-lg border bg-card p-4">
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
        <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use the tabs above to explore different dimensions of data quality. Select an organisation and
          entity type from the sidebar filters to focus your analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <Layers className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Coverage</p>
              <p className="text-muted-foreground">Are the records of your institution represented across the selected sources?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Completeness</p>
              <p className="text-muted-foreground">Are records in the selected sources filled with valid values for the required fields (DOI, ROR, ORCID)?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Enrichment</p>
              <p className="text-muted-foreground">Which missing values can be recovered from comparing sources to enrich your primary source?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Accuracy</p>
              <p className="text-muted-foreground">Where do values disagree between sources, and how can the conflicts be resolved?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { KPICard } from '@/components/dashboard/KPICard';
import { useDashboardData } from '@/data/DataContext';
import { Sparkles, CheckCircle2, Layers, Target } from 'lucide-react';

export function StartScreen() {
  const { organisations, overviewCards } = useDashboardData();
  return (
    <div className="space-y-10">
      <div>
        <div className="eyebrow mb-2">Welkom</div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mb-3">ORI Quality Dashboard</h1>
        <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          Built for metadata specialists at the Dutch signatories of the{' '}
          <a
            href="https://barcelona-declaration.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-[hsl(var(--primary-700))]"
          >
            Barcelona Declaration on Open Research Information
          </a>
          . This dashboard shows where the metadata of your institution can be improved across the open sources
          containing Open Research Information about your organisation — measuring{' '}
          <strong>coverage</strong>, <strong>completeness</strong>, <strong>enrichment</strong> potential and{' '}
          <strong>accuracy</strong>.
        </p>
      </div>

      <div>
        <div className="eyebrow mb-2">Overview</div>
        <h2 className="font-display text-xl font-extrabold mb-4">Key metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overviewCards.map((c, i) => (
            <KPICard
              key={c.title}
              label={c.title}
              value={c.value}
              subtitle={c.details}
              eyebrowColor={(['orange', 'blue', 'green', 'purple'] as const)[i % 4]}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="eyebrow mb-2">Members</div>
        <h2 className="font-display text-xl font-extrabold mb-4">Participating organisations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {organisations.map(org => (
            <div key={org.id} className="flex items-center gap-3 rounded-2xl border border-border-soft bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary-050))] text-primary font-bold text-sm">
                {org.abbreviation.slice(0, 3)}
              </div>
              <div>
                <p className="font-semibold text-sm">{org.name}</p>
                <p className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>ROR: {org.rorId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border-soft bg-card p-6">
        <div className="eyebrow mb-2">Aan de slag</div>
        <h2 className="font-display text-xl font-extrabold mb-2">Getting started</h2>
        <p className="text-sm mb-5" style={{ color: 'hsl(var(--foreground-2))' }}>
          Use the tabs above to explore different dimensions of data quality. Select an organisation and
          entity type from the sidebar filters to focus your analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          {[
            { Icon: Layers, label: 'Coverage', color: 'text-surf-blue', desc: 'Are the records of your institution represented across the selected sources?' },
            { Icon: CheckCircle2, label: 'Completeness', color: 'text-surf-green-dark', desc: 'Are records in the selected sources filled with valid values for the required fields (DOI, ROR, ORCID)?' },
            { Icon: Sparkles, label: 'Enrichment', color: 'text-primary', desc: 'Which missing values can be recovered from comparing sources to enrich your primary source?' },
            { Icon: Target, label: 'Accuracy', color: 'text-surf-purple', desc: 'Where do values disagree between sources, and how can the conflicts be resolved?' },
          ].map(({ Icon, label, color, desc }) => (
            <div key={label} className="flex gap-3">
              <Icon className={`h-5 w-5 ${color} shrink-0 mt-0.5`} />
              <div>
                <p className="font-display font-bold">{label}</p>
                <p style={{ color: 'hsl(var(--foreground-2))' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2, Zap, Microscope,
  RefreshCw, Info, ShieldCheck, ChevronLeft, ChevronRight, Check, X, BarChart3,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, Legend,
} from 'recharts';
import { useDashboardData, useFilteredData } from '@/data/DataContext';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { InterventionPanel } from '@/components/dashboard/InterventionPanel';
import { FilterSummary } from '@/components/dashboard/FilterSummary';
import { MatchingMethodSelector } from '@/components/dashboard/MatchingMethodSelector';
import { cn } from '@/lib/utils';
import type { DashboardFilters, MatchingMethod, Source } from '@/data/types';

interface Props {
  filters: DashboardFilters;
  onMatchingMethodChange: (m: MatchingMethod) => void;
}

type Approach = 'proxy' | 'empirical';
type ProxyMethod = 'agreement' | 'presence' | 'extrapolation';
type EmpiricalMethod = 'internal' | 'external';

export function AccuracyScreen({ filters, onMatchingMethodChange }: Props) {
  const [approach, setApproach] = useState<Approach>('proxy');
  const [proxyMethod, setProxyMethod] = useState<ProxyMethod>('agreement');

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-2">Data quality</div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight mb-1">Accuracy</h1>
        <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
          Is the value correct? Pick an approach. Heuristics are cheap and automatable but can inherit
          feedback loops. Empirical validation is slower, but breaks them.
        </p>
      </div>

      <FilterSummary filters={filters} recordCount={216409} />

      <ApproachSelector value={approach} onChange={setApproach} />

      {approach === 'proxy' ? (
        <>
          <ProxyMethodPicker value={proxyMethod} onChange={setProxyMethod} />
          {proxyMethod === 'agreement' && (
            <CrossSourceAgreement
              filters={filters}
              onMatchingMethodChange={onMatchingMethodChange}
              onSwitchToEmpirical={() => setApproach('empirical')}
            />
          )}
          {proxyMethod === 'presence' && <PresenceInNSources />}
          {proxyMethod === 'extrapolation' && <StatisticalExtrapolation />}
        </>
      ) : (
        <EmpiricalValidation truthSource={filters.source} />
      )}

      <WhichApproachFooter />
    </div>
  );
}

/* -------------------------- Approach selector -------------------------- */
function ApproachSelector({ value, onChange }: { value: Approach; onChange: (a: Approach) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ApproachCard
        active={value === 'proxy'}
        onClick={() => onChange('proxy')}
        icon={<Zap className="h-5 w-5" />}
        title="Proxy / heuristic"
        description="Infer accuracy from indirect signals. Cheap, automatable."
        pill={
          <div className="flex items-center gap-2 text-xs rounded-md px-2.5 py-1.5 bg-[hsl(var(--tint-amber,45_100%_92%))]" style={{ color: 'hsl(35 80% 30%)', background: 'hsl(45 100% 94%)' }}>
            <AlertTriangle className="h-3.5 w-3.5" />
            Risk: propagates feedback loops and untested assumptions.
          </div>
        }
      />
      <ApproachCard
        active={value === 'empirical'}
        onClick={() => onChange('empirical')}
        icon={<Microscope className="h-5 w-5" />}
        title="Empirical validation"
        description="Check the value against the truth. Slower, harder to automate."
        pill={
          <div className="flex items-center gap-2 text-xs rounded-md px-2.5 py-1.5 bg-muted" style={{ color: 'hsl(var(--foreground-2))' }}>
            <ShieldCheck className="h-3.5 w-3.5" />
            Breaks feedback loops but only feasible on samples.
          </div>
        }
      />
    </div>
  );
}

function ApproachCard({
  active, onClick, icon, title, description, pill,
}: {
  active: boolean; onClick: () => void; icon: React.ReactNode; title: string; description: string; pill: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-left rounded-2xl border bg-card p-5 transition-all hover:shadow-sm',
        active ? 'border-primary border-2 shadow-surf' : 'border-border-soft',
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={cn(active ? 'text-primary' : 'text-foreground')}>{icon}</span>
        <span className="font-display font-extrabold text-base">{title}</span>
        {active && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-md bg-primary text-primary-foreground">
            Selected
          </span>
        )}
      </div>
      <p className="text-sm mb-3" style={{ color: 'hsl(var(--foreground-2))' }}>{description}</p>
      {pill}
    </button>
  );
}

/* -------------------------- Proxy method picker -------------------------- */
function ProxyMethodPicker({ value, onChange }: { value: ProxyMethod; onChange: (m: ProxyMethod) => void }) {
  const options: { id: ProxyMethod; label: string; sub: string }[] = [
    { id: 'agreement', label: 'Cross-source agreement', sub: 'CRIS vs OpenAlex on the same DOI' },
    { id: 'presence', label: 'Presence in N sources', sub: 'Value confirmed by ≥ k of 4 sources' },
    { id: 'extrapolation', label: 'Statistical extrapolation', sub: 'Estimate true accuracy from a validated sample' },
  ];
  return (
    <div>
      <div className="eyebrow mb-2">Proxy method</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {options.map(o => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className={cn(
                'text-left rounded-lg p-3 border transition-all',
                active
                  ? 'border-primary border-2 bg-[hsl(var(--primary-050))]'
                  : 'border-border-soft bg-card hover:bg-muted/40',
              )}
            >
              <div className={cn('text-sm font-bold', active && 'text-primary')}>{o.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'hsl(var(--foreground-2))' }}>{o.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------- 4a: Cross-source agreement -------------------------- */
function CrossSourceAgreement({
  filters, onMatchingMethodChange, onSwitchToEmpirical,
}: {
  filters: DashboardFilters; onMatchingMethodChange: (m: MatchingMethod) => void; onSwitchToEmpirical: () => void;
}) {
  const { interventions, totalRecords: ctxTotal } = useDashboardData();
  const {
    accuracyComparison, coverageComparisons, detailRecords,
    completenessTimeline,
  } = useFilteredData(filters);
  const a = accuracyComparison[0];
  const primary = filters.source;
  const [compare, setCompare] = useState<Source>(a?.compareSource ?? 'OpenAlex');
  const [selected, setSelected] = useState<{ kind: 'conflict' | 'agreement'; field: string } | null>(
    a ? { kind: 'conflict', field: a.conflicts[0].field } : null,
  );
  const matchBy = filters.matchingMethod;

  if (!a) {
    return (
      <div className="rounded-2xl border border-border-soft bg-card p-6 text-sm" style={{ color: 'hsl(var(--foreground-2))' }}>
        No accuracy data available for the current filter selection.
      </div>
    );
  }

  const cov = coverageComparisons.find(c => c.compareSource === compare);
  const recordsInPrimary = ctxTotal;
  const recordsInBoth = cov ? cov.inBoth : a.recordsInBoth;
  const recordsInCompare = cov ? cov.inBoth + cov.onlyInCompared : a.recordsInCompare;

  const conflicts = a.conflicts.map(c => ({ ...c, count: Math.round((c.percentage / 100) * recordsInBoth) }));
  const agreements = a.agreements.map(c => ({ ...c, count: Math.round((c.percentage / 100) * recordsInBoth) }));

  const selectedItem = selected
    ? (selected.kind === 'conflict' ? conflicts : agreements).find(c => c.field === selected.field)
    : null;

  // Mock presence-in-N pill per record
  const presenceForRecord = (idx: number) => {
    const n = [1, 3, 4, 2, 3][idx % 5];
    if (n === 4) return { label: '4 of 4', cls: 'bg-[hsl(var(--tint-green))] text-success' };
    if (n === 3) return { label: '3 of 4', cls: 'bg-[hsl(var(--primary-050))] text-primary' };
    if (n === 2) return { label: '2 of 4', cls: 'bg-amber-100 text-amber-800' };
    return { label: '1 of 4', cls: 'bg-[hsl(var(--tint-red))] text-destructive' };
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1.5 block">Compare source</Label>
          <Select value={compare} onValueChange={(v) => setCompare(v as Source)}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="OpenAlex">OpenAlex</SelectItem>
              <SelectItem value="OpenAIRE">OpenAIRE</SelectItem>
              <SelectItem value="Crossref">Crossref</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <MatchingMethodSelector value={matchBy} onChange={onMatchingMethodChange} />
      </div>

      <div className="rounded-2xl border border-border-soft bg-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
          <div className="rounded-2xl border border-border-soft bg-card p-6 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight">{(recordsInPrimary / 1000).toFixed(0)}k</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--foreground-2))' }}>records in <strong className="text-foreground">{primary}</strong> (primary)</p>
          </div>
          <ArrowRight className="hidden md:block h-6 w-6 mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <div className="rounded-2xl bg-[hsl(var(--primary-050))] border border-[hsl(var(--primary-100))] p-6 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-primary">{(recordsInBoth / 1000).toFixed(0)}k</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--foreground-2))' }}>records in <strong className="text-foreground">both sources</strong></p>
            <p className="text-[10px] uppercase tracking-[0.08em] mt-1 font-semibold text-primary">matched on {matchBy.toUpperCase()}</p>
          </div>
          <ArrowLeft className="hidden md:block h-6 w-6 mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <div className="rounded-2xl border border-border-soft bg-card p-6 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight">{(recordsInCompare / 1000).toFixed(0)}k</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--foreground-2))' }}>records in <strong className="text-foreground">{compare}</strong> (compare)</p>
          </div>
        </div>
      </div>

      {/* Feedback loop banner */}
      <div
        className="rounded-lg border-l-4 px-4 py-3 text-sm flex items-start gap-3 flex-wrap"
        style={{ background: 'hsl(45 100% 95%)', borderColor: 'hsl(38 92% 50%)', color: 'hsl(35 80% 25%)' }}
      >
        <RefreshCw className="h-4 w-4 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-[260px]">
          <strong className="font-bold">Feedback loop check:</strong>{' '}
          64% of {compare} ROR values for this set were harvested from {primary}-derived sources.
          Treat agreement figures with caution.
        </div>
        <Button size="sm" variant="outline" onClick={onSwitchToEmpirical}>
          Switch to empirical validation →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border-soft bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h3 className="font-display font-extrabold text-base">Conflicts</h3>
          </div>
          <div className="space-y-2">
            {conflicts.map(c => {
              const active = selected?.kind === 'conflict' && selected.field === c.field;
              return (
                <button
                  key={c.field}
                  onClick={() => setSelected({ kind: 'conflict', field: c.field })}
                  className={cn(
                    'w-full text-left rounded-lg border border-border-soft p-3 transition-all hover:bg-muted/50 flex items-start gap-3',
                    active && 'border-destructive bg-[hsl(var(--tint-red))]',
                  )}
                >
                  <span className={cn(
                    'mt-1 h-3 w-3 rounded-full shrink-0 border-2',
                    active ? 'border-destructive bg-destructive' : 'border-muted-foreground/40',
                  )} />
                  <div className="flex-1 text-sm">
                    <span className="font-bold">{(c.count / 1000).toFixed(0)}k ({c.percentage}%)</span>
                    <span style={{ color: 'hsl(var(--foreground-2))' }}> records have </span>
                    <span className="font-semibold">{c.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <h3 className="font-display font-extrabold text-base">Agreement</h3>
          </div>
          <div className="space-y-2">
            {agreements.map(c => {
              const active = selected?.kind === 'agreement' && selected.field === c.field;
              return (
                <button
                  key={c.field}
                  onClick={() => setSelected({ kind: 'agreement', field: c.field })}
                  className={cn(
                    'w-full text-left rounded-lg border border-border-soft p-3 transition-all hover:bg-muted/50 flex items-start gap-3',
                    active && 'border-success bg-[hsl(var(--tint-green))]',
                  )}
                >
                  <span className={cn(
                    'mt-1 h-3 w-3 rounded-full shrink-0 border-2',
                    active ? 'border-success bg-success' : 'border-muted-foreground/40',
                  )} />
                  <div className="flex-1 text-sm">
                    <span className="font-bold">{(c.count / 1000).toFixed(0)}k ({c.percentage}%)</span>
                    <span style={{ color: 'hsl(var(--foreground-2))' }}> records have </span>
                    <span className="font-semibold">{c.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold">Detail view</h2>
            <Badge variant={selected!.kind === 'conflict' ? 'destructive' : 'default'}>
              {selected!.kind === 'conflict' ? 'Conflict' : 'Agreement'}: {selectedItem.label}
            </Badge>
          </div>

          <TimelineChart
            data={completenessTimeline}
            title={`${selected!.kind === 'conflict' ? 'Conflict' : 'Agreement'} rate over time — ${selectedItem.label}`}
            color={selected!.kind === 'conflict' ? 'hsl(var(--destructive))' : 'hsl(var(--success))'}
          />

          {/* Detail table with new "Presence in N" column */}
          <div className="rounded-2xl border border-border-soft bg-card overflow-hidden">
            <div className="p-4 border-b border-border-soft">
              <h3 className="font-display font-extrabold text-base">Records: {selectedItem.label}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr className="text-left">
                    <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Title</th>
                    <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">DOI</th>
                    <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">{primary}</th>
                    <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">{compare}</th>
                    <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Presence in N</th>
                    <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Validate</th>
                  </tr>
                </thead>
                <tbody>
                  {detailRecords.slice(0, 5).map((r, i) => {
                    const p = presenceForRecord(i);
                    return (
                      <tr key={r.id} className="border-t border-border-soft">
                        <td className="px-4 py-2.5 max-w-[280px] truncate">{r.title}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">{r.doi ?? '—'}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">04tavf782</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-destructive">02n6c9938</td>
                        <td className="px-4 py-2.5">
                          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-md', p.cls)}>{p.label}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <a href="#" className="text-xs text-primary hover:underline">→ check publisher</a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {selected!.kind === 'conflict' && (
            <InterventionPanel
              interventions={interventions.filter(
                i => i.page === 'Accuracy' && i.accuracyField === selected!.field,
              )}
            />
          )}

        </div>
      )}
    </div>
  );
}

/* -------------------------- 4b: Presence in N sources -------------------------- */
function PresenceInNSources() {
  const summary = [
    { label: 'In all 4 sources', value: '28k', pct: '20%', color: 'hsl(var(--success))', bg: 'hsl(var(--tint-green))' },
    { label: 'In 3 of 4 sources', value: '63k', pct: '45%', color: 'hsl(var(--primary))', bg: 'hsl(var(--primary-050))' },
    { label: 'In 2 of 4 sources', value: '42k', pct: '30%', color: 'hsl(35 80% 35%)', bg: 'hsl(45 100% 94%)' },
    { label: 'In 1 source only', value: '7k', pct: '5%', color: 'hsl(var(--destructive))', bg: 'hsl(var(--tint-red))' },
  ];

  const fieldData = [
    { field: 'ROR', '4/4': 18, '3/4': 38, '2/4': 28, '1/4': 12, '0/4': 4 },
    { field: 'ORCID', '4/4': 12, '3/4': 30, '2/4': 35, '1/4': 18, '0/4': 5 },
    { field: 'DOI', '4/4': 55, '3/4': 30, '2/4': 10, '1/4': 4, '0/4': 1 },
    { field: 'Grant DOI', '4/4': 8, '3/4': 18, '2/4': 32, '1/4': 30, '0/4': 12 },
    { field: 'OA status', '4/4': 22, '3/4': 40, '2/4': 25, '1/4': 10, '0/4': 3 },
  ];

  const records = [
    { title: 'ML in Climate Science', doi: '10.1234/ml-2023', cris: true, openalex: true, openaire: false, crossref: true, n: 3 },
    { title: 'Quantum Computing for Drug Discovery', doi: '10.1234/qc-2023', cris: true, openalex: true, openaire: true, crossref: true, n: 4 },
    { title: 'Biodiversity in the Wadden Sea', doi: '10.1234/bio-2024', cris: true, openalex: false, openaire: false, crossref: true, n: 2 },
    { title: 'Hydrogen Storage Materials', doi: '10.1234/h2-2024', cris: true, openalex: false, openaire: false, crossref: false, n: 1 },
    { title: 'Neural Architectures for NLP', doi: '10.1234/nlp-2025', cris: true, openalex: true, openaire: true, crossref: false, n: 3 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summary.map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: s.bg }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: s.color }}>{s.label}</div>
            <p className="font-display font-extrabold mt-1" style={{ color: s.color, fontSize: 28 }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: s.color, opacity: 0.85 }}>{s.pct} of records</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border-soft bg-card p-5">
        <h3 className="font-display font-extrabold text-base mb-3">Source coverage by field</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fieldData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="field" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="4/4" stackId="a" fill="hsl(var(--success))" />
              <Bar dataKey="3/4" stackId="a" fill="hsl(var(--primary))" />
              <Bar dataKey="2/4" stackId="a" fill="hsl(38 92% 55%)" />
              <Bar dataKey="1/4" stackId="a" fill="hsl(var(--destructive))" />
              <Bar dataKey="0/4" stackId="a" fill="hsl(215 15% 75%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border-soft bg-card overflow-hidden">
        <div className="p-4 border-b border-border-soft">
          <h3 className="font-display font-extrabold text-base">Records by N-source presence</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Title</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">DOI</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-center">CRIS</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-center">OpenAlex</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-center">OpenAIRE</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-center">Crossref</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Score</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-t border-border-soft">
                  <td className="px-4 py-2.5 max-w-[280px] truncate">{r.title}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{r.doi}</td>
                  {([r.cris, r.openalex, r.openaire, r.crossref]).map((v, j) => (
                    <td key={j} className="px-4 py-2.5 text-center">
                      {v ? <Check className="h-4 w-4 inline text-success" /> : <X className="h-4 w-4 inline text-muted-foreground" />}
                    </td>
                  ))}
                  <td className="px-4 py-2.5">
                    <span className={cn(
                      'text-xs font-semibold px-2 py-0.5 rounded-md',
                      r.n === 4 && 'bg-[hsl(var(--tint-green))] text-success',
                      r.n === 3 && 'bg-[hsl(var(--primary-050))] text-primary',
                      r.n === 2 && 'bg-amber-100 text-amber-800',
                      r.n === 1 && 'bg-[hsl(var(--tint-red))] text-destructive',
                    )}>{r.n} of 4</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- 4c: Statistical extrapolation -------------------------- */
function StatisticalExtrapolation() {
  const [sampleSize, setSampleSize] = useState('500');
  const [field, setField] = useState('ROR affiliation');

  const ciData = useMemo(() => {
    const pts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    return pts.map(n => {
      const half = Math.max(1.5, 12 / Math.sqrt(n));
      return { n, estimate: 81.7, lower: 81.7 - half, upper: 81.7 + half };
    });
  }, []);

  return (
    <div className="space-y-5">
      <div
        className="rounded-lg border-l-4 px-4 py-3 text-sm flex items-start gap-3"
        style={{ background: 'hsl(var(--primary-050))', borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-900, var(--primary)))' }}
      >
        <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
        <div>
          <strong className="font-bold">How this works:</strong>{' '}
          Like the WWII German tank problem, we estimate total accuracy from a small validated
          sample using a capture–recapture estimator (N̂ ≈ m + m/k − 1). Validate a random sample,
          then extrapolate to the full population with a confidence interval.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard label="Sample accuracy" value="82.4%" sub="412 / 500 validated correct" />
        <StatCard
          label="Estimated population accuracy"
          value="81.7%"
          sub="95% CI: 78.3% – 85.1%"
          variant="info"
        />
        <StatCard
          label="Estimated wrong records"
          value="~39,500"
          sub="± 7,300"
          variant="warning"
        />
      </div>

      <div className="rounded-2xl border border-border-soft bg-card p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <Label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1.5 block">Sample size</Label>
            <Select value={sampleSize} onValueChange={setSampleSize}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="250">250</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="1000">1,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-1.5 block">Field</Label>
            <Select value={field} onValueChange={setField}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ROR affiliation">ROR affiliation</SelectItem>
                <SelectItem value="ORCID">ORCID</SelectItem>
                <SelectItem value="Grant DOI">Grant DOI</SelectItem>
                <SelectItem value="OA status">OA status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Run new sample →</Button>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ciData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="n" tick={{ fontSize: 11 }} label={{ value: 'Validated n', position: 'insideBottom', offset: -2, fontSize: 11 }} />
              <YAxis domain={[70, 95]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Area dataKey="upper" stroke="none" fill="hsl(var(--primary))" fillOpacity={0.12} />
              <Area dataKey="lower" stroke="none" fill="hsl(var(--background))" fillOpacity={1} />
              <Line type="monotone" dataKey="estimate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, sub, variant,
}: {
  label: string; value: string; sub: string; variant?: 'info' | 'warning' | 'success';
}) {
  const styles = variant === 'info'
    ? { bg: 'hsl(var(--primary-050))', color: 'hsl(var(--primary))' }
    : variant === 'warning'
      ? { bg: 'hsl(45 100% 94%)', color: 'hsl(35 80% 30%)' }
      : variant === 'success'
        ? { bg: 'hsl(var(--tint-green))', color: 'hsl(var(--success))' }
        : { bg: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' };
  return (
    <div className="rounded-2xl p-5" style={{ background: styles.bg }}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: styles.color }}>{label}</div>
      <p className="font-display font-extrabold mt-1 leading-tight" style={{ color: styles.color, fontSize: 30 }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: styles.color, opacity: 0.85 }}>{sub}</p>
    </div>
  );
}

/* -------------------------- 5: Empirical validation -------------------------- */
function EmpiricalValidation() {
  const [method, setMethod] = useState<EmpiricalMethod>('internal');
  const [recordIdx, setRecordIdx] = useState(0);

  const records = [
    {
      title: 'ML Applications in Climate Science',
      doi: '10.1234/ml-climate-2023',
      cris: { ror: '04tavf782', raw: '"Vrije Univ Amsterdam, Dept of CS"', assigned: 'Assigned: manual, 2023-09' },
      openalex: { ror: '02n6c9938', raw: '"VU University, Amsterdam"', assigned: 'Assigned: string-match algorithm' },
      publisher: { ror: '04tavf782', raw: '"Vrije Universiteit Amsterdam"', source: 'Fetched: Crossref VoR XML' },
      verdict: 'conflict' as const,
    },
    {
      title: 'Quantum Computing for Drug Discovery',
      doi: '10.1234/qc-2023',
      cris: { ror: '04tavf782', raw: '"Vrije Universiteit Amsterdam"', assigned: 'Assigned: manual, 2023-11' },
      openalex: { ror: '04tavf782', raw: '"Vrije Universiteit Amsterdam"', assigned: 'Assigned: string-match algorithm' },
      publisher: { ror: '04tavf782', raw: '"Vrije Universiteit Amsterdam"', source: 'Fetched: Crossref VoR XML' },
      verdict: 'match' as const,
    },
  ];

  const r = records[recordIdx];

  return (
    <div className="space-y-5">
      {/* method picker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MethodCard
          active={method === 'internal'}
          onClick={() => setMethod('internal')}
          title="Internal validation"
          description="Provenance trail · raw affiliation strings · ID assignment process"
        />
        <MethodCard
          active={method === 'external'}
          onClick={() => setMethod('external')}
          title="External validation"
          description="Compare against publisher version of record (Crossref VoR XML)"
        />
      </div>

      {/* Sample status */}
      <div className="rounded-2xl border border-border-soft bg-card p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { v: '216k', l: 'Population', color: 'hsl(var(--foreground))' },
            { v: '500', l: 'Sampled', color: 'hsl(var(--foreground))' },
            { v: '412', l: 'Validated', color: 'hsl(var(--success))' },
            { v: '88', l: 'Disagree', color: 'hsl(35 80% 30%)' },
          ].map(s => (
            <div key={s.l}>
              <p className="font-display font-extrabold leading-tight" style={{ fontSize: 28, color: s.color }}>{s.v}</p>
              <p className="text-[11px] uppercase tracking-[0.08em] font-semibold mt-1" style={{ color: s.color, opacity: 0.8 }}>{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: 'hsl(var(--foreground-2))' }}>
            <span>Validation progress</span>
            <span>412 / 500 (82%)</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-success" style={{ width: '82%' }} />
          </div>
        </div>
      </div>

      {/* Record validation card */}
      <div>
        <div className="eyebrow mb-2">Record validation</div>
        <div className="rounded-2xl border border-border-soft bg-card p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => setRecordIdx((i) => Math.max(0, i - 1))} disabled={recordIdx === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => setRecordIdx((i) => Math.min(records.length - 1, i + 1))} disabled={recordIdx === records.length - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div>
                <div className="font-display font-extrabold text-base">{r.title}</div>
                <div className="text-xs font-mono" style={{ color: 'hsl(var(--foreground-2))' }}>{r.doi}</div>
              </div>
            </div>
            <span className={cn(
              'text-[11px] font-bold uppercase tracking-[0.08em] px-2 py-1 rounded-md',
              r.verdict === 'conflict' ? 'bg-[hsl(var(--tint-red))] text-destructive' : 'bg-[hsl(var(--tint-green))] text-success',
            )}>
              {r.verdict === 'conflict' ? 'Conflict' : 'Match'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <Lane label="CRIS" mono={r.cris.ror} raw={r.cris.raw} meta={r.cris.assigned} />
            <Lane
              label="OpenAlex"
              mono={r.openalex.ror}
              monoDanger={r.verdict === 'conflict'}
              raw={r.openalex.raw}
              meta={r.openalex.assigned}
            />
            <Lane label="Publisher (truth)" mono={r.publisher.ror} raw={r.publisher.raw} meta={r.publisher.source} variant="info" />
            <div className="rounded-lg border border-border-soft p-3">
              <div className="text-[10px] uppercase tracking-[0.05em] font-semibold mb-1.5" style={{ color: 'hsl(var(--foreground-2))' }}>Verdict</div>
              {r.verdict === 'conflict' ? (
                <div className="space-y-1">
                  <div className="text-success flex items-center gap-1"><Check className="h-3 w-3" /> CRIS correct</div>
                  <div className="text-destructive flex items-center gap-1"><X className="h-3 w-3" /> OpenAlex wrong</div>
                  <a href="#" className="text-[11px] text-primary hover:underline block mt-2">→ Report to OpenAlex</a>
                </div>
              ) : (
                <div className="text-success flex items-center gap-1"><Check className="h-3 w-3" /> All sources agree</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Extrapolation */}
      <div className="rounded-2xl border border-border-soft bg-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-4 w-4" style={{ color: 'hsl(var(--foreground-2))' }} />
          <h3 className="font-display font-extrabold text-base">Extrapolate to full population</h3>
          <span className="ml-auto text-[11px]" style={{ color: 'hsl(var(--foreground-2))' }}>capture–recapture estimator</span>
        </div>
        <p className="text-sm mb-4" style={{ color: 'hsl(var(--foreground-2))' }}>
          Based on 412 validated records, infer the true accuracy of the 216k population (German tank–style).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <StatCard label="Sample accuracy" value="82.4%" sub="412 / 500 correct" />
          <StatCard label="Estimated population accuracy" value="81.7%" sub="95% CI: 78.3% – 85.1%" variant="info" />
          <StatCard label="Estimated wrong records" value="~39,500" sub="± 7,300" variant="warning" />
        </div>
      </div>
    </div>
  );
}

function MethodCard({
  active, onClick, title, description,
}: { active: boolean; onClick: () => void; title: string; description: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-left rounded-2xl border bg-card p-4 transition-all hover:shadow-sm',
        active ? 'border-primary border-2 bg-[hsl(var(--primary-050))]' : 'border-border-soft',
      )}
    >
      <div className={cn('font-bold text-sm mb-0.5', active && 'text-primary')}>{title}</div>
      <div className="text-xs" style={{ color: 'hsl(var(--foreground-2))' }}>{description}</div>
    </button>
  );
}

function Lane({
  label, mono, monoDanger, raw, meta, variant,
}: {
  label: string; mono: string; monoDanger?: boolean; raw: string; meta: string; variant?: 'info';
}) {
  const isInfo = variant === 'info';
  return (
    <div
      className={cn('rounded-lg p-3', isInfo ? '' : 'bg-muted/50')}
      style={isInfo ? { background: 'hsl(var(--primary-050))' } : undefined}
    >
      <div
        className="text-[10px] uppercase tracking-[0.05em] font-semibold mb-1.5"
        style={{ color: isInfo ? 'hsl(var(--primary))' : 'hsl(var(--foreground-2))' }}
      >
        {label}
      </div>
      <div className={cn('font-mono text-xs font-semibold', monoDanger && 'text-destructive', isInfo && 'text-primary')}>{mono}</div>
      <div className="text-[11px] mt-1.5 leading-snug" style={{ color: isInfo ? 'hsl(var(--primary))' : 'hsl(var(--foreground-2))', opacity: isInfo ? 0.85 : 1 }}>
        Raw: {raw}
      </div>
      <div className="text-[11px] mt-1" style={{ color: isInfo ? 'hsl(var(--primary))' : 'hsl(var(--foreground-2))', opacity: isInfo ? 0.85 : 0.8 }}>
        {meta}
      </div>
    </div>
  );
}

/* -------------------------- Footer guidance -------------------------- */
function WhichApproachFooter() {
  return (
    <div className="rounded-2xl bg-muted/60 p-5">
      <h3 className="font-display font-extrabold text-base mb-1">Which approach when?</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground-2))' }}>
        Use proxies for continuous monitoring across all records. Use empirical validation for periodic
        audits and when a proxy flags a suspicious feedback loop. Statistical extrapolation bridges the
        two: small samples, population-scale claims.
      </p>
    </div>
  );
}

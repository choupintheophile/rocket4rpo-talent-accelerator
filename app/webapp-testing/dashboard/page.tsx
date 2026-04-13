export const dynamic = "force-dynamic";

import { getCandidates } from "@/lib/candidates";
import { CRITERIA } from "@/lib/r4rpo-constants";
import Link from "next/link";
import {
  BarChart3,
  Users,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Briefcase,
  MapPin,
} from "lucide-react";

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */

function pctLabel(count: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((count / total) * 100)}%`;
}

function topN(arr: string[], n: number): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const t of arr) {
    map.set(t, (map.get(t) || 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([tag, count]) => ({ tag, count }));
}

function distribution(values: (string | null)[]): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const v of values) {
    const key = v || "Non renseigne";
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));
}

function relativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "a l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "hier";
  if (diffD < 30) return `il y a ${diffD}j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

/* ────────────────────────────────────────────
   Sub-components (server, inline)
   ──────────────────────────────────────────── */

function StatCard({
  icon,
  label,
  value,
  sub,
  borderColor = "border-l-rocket-teal",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  borderColor?: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl px-5 py-4 flex flex-col gap-1 border-l-4 ${borderColor} hover:-translate-y-1 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-mono font-semibold text-gray-800">{value}</div>
      {sub && <div className="text-[12px] text-gray-400">{sub}</div>}
    </div>
  );
}

function HBar({
  label,
  count,
  max,
  color = "bg-rocket-teal",
}: {
  label: string;
  count: number;
  max: number;
  color?: string;
}) {
  const w = max > 0 ? Math.max((count / max) * 100, 2) : 0;
  return (
    <div className="flex items-center gap-3 text-[13px]">
      <span className="w-[140px] truncate text-gray-600 shrink-0">{label}</span>
      <div className="flex-1 h-[18px] bg-gray-100 rounded overflow-hidden">
        <div className={`h-full rounded ${color}`} style={{ width: `${w}%` }} />
      </div>
      <span className="font-mono text-[13px] text-gray-500 w-8 text-right shrink-0">{count}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3 mt-8 first:mt-0">
      {children}
    </h2>
  );
}

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */

export default async function DashboardPage() {
  const candidates = await getCandidates();

  /* --- global counters --- */
  const total = candidates.length;
  const evaluated = candidates.filter((c) => c.filled >= 1).length;
  const complete = candidates.filter((c) => c.filled >= 5).length;

  /* --- verdict breakdown --- */
  const verdictCounts = {
    Prioritaire: candidates.filter((c) => c.verdictLevel === "top").length,
    Secondaire: candidates.filter((c) => c.verdictLevel === "mid").length,
    "Non retenu": candidates.filter((c) => c.verdictLevel === "low").length,
    Incomplet: candidates.filter((c) => c.verdictLevel === "nc").length,
  };

  /* --- average score --- */
  const evaluatedCandidates = candidates.filter((c) => c.filled >= 1);
  const avgPct =
    evaluatedCandidates.length > 0
      ? Math.round(evaluatedCandidates.reduce((s, c) => s + c.pct, 0) / evaluatedCandidates.length)
      : 0;

  /* --- per-criterion averages --- */
  const criterionAvgs = CRITERIA.map((crit, i) => {
    let sum = 0;
    let count = 0;
    for (const c of evaluatedCandidates) {
      const scores = (c.scores as Record<string, number>) || {};
      const s = scores[`c${i}`];
      if (s && s > 0) {
        sum += s;
        count++;
      }
    }
    return {
      name: crit.name,
      avg: count > 0 ? +(sum / count).toFixed(1) : 0,
      count,
    };
  });

  /* --- forces / risks --- */
  const allForces: string[] = [];
  const allRisks: string[] = [];
  for (const c of candidates) {
    const f = c.forces as string[] | null;
    const r = c.risks as string[] | null;
    if (f) allForces.push(...f);
    if (r) allRisks.push(...r);
  }
  const topForces = topN(allForces, 5);
  const topRisks = topN(allRisks, 5);

  /* --- distributions --- */
  const sectorDist = distribution(candidates.map((c) => c.sector));
  const contratDist = distribution(candidates.map((c) => c.contrat));
  const dispoDist = distribution(candidates.map((c) => c.dispo));

  /* --- recent activity --- */
  const recent = [...candidates]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  /* --- verdict colors --- */
  const verdictColors: Record<string, string> = {
    Prioritaire: "bg-emerald-500",
    Secondaire: "bg-amber-400",
    "Non retenu": "bg-red-400",
    Incomplet: "bg-gray-300",
  };

  const verdictTextColors: Record<string, string> = {
    Prioritaire: "text-emerald-600",
    Secondaire: "text-amber-600",
    "Non retenu": "text-red-500",
    Incomplet: "text-gray-400",
  };

  /* --- greeting date --- */
  const now = new Date();
  const formattedDate = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const lastActivity = recent.length > 0 ? relativeTime(new Date(recent[0].updatedAt)) : null;

  return (
    <>
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <BarChart3 size={16} className="text-rocket-teal" />
        <span className="text-[15px] font-medium">Analytics</span>
        <span className="text-[12px] text-gray-400">{total} candidat{total > 1 ? "s" : ""}</span>
        {lastActivity && (
          <span className="ml-auto text-[11px] text-gray-400 flex items-center gap-1.5">
            <Clock size={11} />
            Derniere activite : {lastActivity}
          </span>
        )}
      </div>

      <div className="p-7 max-w-[1060px] space-y-2">
        {/* ── Greeting ── */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Bonjour 👋</h1>
          <p className="text-[13px] text-gray-400 capitalize">{formattedDate}</p>
        </div>

        {/* ── KPIs principaux ── */}
        <SectionTitle>Vue d&apos;ensemble</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon={<Users size={13} />}
            label="Total"
            value={total}
            sub={`${evaluated} evalu${evaluated > 1 ? "es" : "e"}`}
            borderColor="border-l-rocket-teal"
          />
          <StatCard
            icon={<CheckCircle2 size={13} />}
            label="Prioritaire"
            value={verdictCounts.Prioritaire}
            sub={`${pctLabel(verdictCounts.Prioritaire, total)} du vivier`}
            borderColor="border-l-emerald-500"
          />
          <StatCard
            icon={<Target size={13} />}
            label="Secondaire"
            value={verdictCounts.Secondaire}
            sub={`${pctLabel(verdictCounts.Secondaire, total)} du vivier`}
            borderColor="border-l-amber-400"
          />
          <StatCard
            icon={<AlertTriangle size={13} />}
            label="Non retenu"
            value={verdictCounts["Non retenu"]}
            sub={`${pctLabel(verdictCounts["Non retenu"], total)} du vivier`}
            borderColor="border-l-red-400"
          />
        </div>

        {/* ── Verdict breakdown ── */}
        <SectionTitle>Repartition des verdicts</SectionTitle>
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          {/* stacked bar */}
          <div className="flex h-5 rounded-full overflow-hidden mb-4">
            {(Object.entries(verdictCounts) as [string, number][]).map(([label, count]) =>
              count > 0 ? (
                <div
                  key={label}
                  className={`${verdictColors[label]} transition-all`}
                  style={{ width: `${(count / total) * 100}%` }}
                  title={`${label}: ${count}`}
                />
              ) : null
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(verdictCounts) as [string, number][]).map(([label, count]) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${verdictColors[label]}`} />
                <div>
                  <span className={`text-[14px] font-mono font-semibold ${verdictTextColors[label]}`}>
                    {count}
                  </span>
                  <span className="text-[12px] text-gray-400 ml-1.5">
                    {label} ({pctLabel(count, total)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scores par critere ── */}
        <SectionTitle>Scores moyens par critere (/5)</SectionTitle>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          {criterionAvgs.map((cr) => {
            const pct = (cr.avg / 5) * 100;
            const color =
              cr.avg >= 4 ? "bg-emerald-500" : cr.avg >= 3 ? "bg-rocket-teal" : cr.avg >= 2 ? "bg-amber-400" : "bg-red-400";
            return (
              <div key={cr.name} className="flex items-center gap-3 text-[13px]">
                <span className="w-[200px] truncate text-gray-600 shrink-0">{cr.name}</span>
                <div className="flex-1 h-[14px] bg-gray-100 rounded overflow-hidden">
                  <div className={`h-full rounded ${color}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="font-mono text-[13px] text-gray-600 w-10 text-right shrink-0">
                  {cr.avg > 0 ? cr.avg : "-"}
                </span>
                <span className="text-[11px] text-gray-300 w-12 text-right shrink-0">
                  ({cr.count})
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Forces & Risques ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Forces */}
          <div>
            <SectionTitle>Top 5 forces</SectionTitle>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              {topForces.length === 0 && (
                <p className="text-[13px] text-gray-300">Aucune donnee</p>
              )}
              {topForces.map((f) => (
                <HBar
                  key={f.tag}
                  label={f.tag}
                  count={f.count}
                  max={topForces[0]?.count || 1}
                  color="bg-emerald-500"
                />
              ))}
            </div>
          </div>
          {/* Risques */}
          <div>
            <SectionTitle>Top 5 risques</SectionTitle>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              {topRisks.length === 0 && (
                <p className="text-[13px] text-gray-300">Aucune donnee</p>
              )}
              {topRisks.map((r) => (
                <HBar
                  key={r.tag}
                  label={r.tag}
                  count={r.count}
                  max={topRisks[0]?.count || 1}
                  color="bg-red-400"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Distributions ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Secteur */}
          <div>
            <SectionTitle>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Secteur
              </span>
            </SectionTitle>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              {sectorDist.length === 0 && (
                <p className="text-[13px] text-gray-300">Aucune donnee</p>
              )}
              {sectorDist.map((s) => (
                <HBar key={s.label} label={s.label} count={s.count} max={sectorDist[0]?.count || 1} />
              ))}
            </div>
          </div>

          {/* Contrat */}
          <div>
            <SectionTitle>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={12} />
                Type de contrat
              </span>
            </SectionTitle>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              {contratDist.length === 0 && (
                <p className="text-[13px] text-gray-300">Aucune donnee</p>
              )}
              {contratDist.map((s) => (
                <HBar key={s.label} label={s.label} count={s.count} max={contratDist[0]?.count || 1} />
              ))}
            </div>
          </div>

          {/* Disponibilite */}
          <div>
            <SectionTitle>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                Disponibilite
              </span>
            </SectionTitle>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              {dispoDist.length === 0 && (
                <p className="text-[13px] text-gray-300">Aucune donnee</p>
              )}
              {dispoDist.map((s) => (
                <HBar key={s.label} label={s.label} count={s.count} max={dispoDist[0]?.count || 1} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Activite recente ── */}
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} />
            Activite recente
          </span>
        </SectionTitle>
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          {recent.length === 0 && (
            <p className="text-[13px] text-gray-300 p-5">Aucun candidat</p>
          )}
          {recent.map((c) => {
            const badgeColor =
              c.verdictLevel === "top"
                ? "bg-emerald-50 text-emerald-700"
                : c.verdictLevel === "mid"
                ? "bg-amber-50 text-amber-700"
                : c.verdictLevel === "low"
                ? "bg-red-50 text-red-600"
                : "bg-gray-50 text-gray-400";
            return (
              <Link
                key={c.id}
                href={`/webapp-testing/candidat/${c.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-rocket-teal/10 text-rocket-teal flex items-center justify-center text-[12px] font-semibold shrink-0">
                  {(c.prenom?.[0] || "").toUpperCase()}
                  {(c.nom?.[0] || "").toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">
                    {c.prenom} {c.nom}
                  </div>
                  <div className="text-[11px] text-gray-400 truncate">
                    {[c.sector, c.contrat, c.tjm].filter(Boolean).join(" - ")}
                  </div>
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
                  {c.verdictLabel}
                </span>
                {c.pct > 0 && (
                  <span className="text-[13px] font-mono text-gray-500">{c.pct}%</span>
                )}
                <span className="text-[11px] text-gray-300 shrink-0 w-20 text-right">
                  {relativeTime(new Date(c.updatedAt))}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ── Footer spacer ── */}
        <div className="h-8" />
      </div>
    </>
  );
}

import { getCandidates } from "@/lib/candidates";
import { CRITERIA, SCORE_COLORS } from "@/lib/r4rpo-constants";
import { VerdictBadge } from "@/components/webapp/VerdictBadge";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClassementPage() {
  const candidates = await getCandidates();

  const sorted = [...candidates]
    .filter((c) => c.filled >= 1)
    .sort((a, b) => b.pct - a.pct || b.filled - a.filled);

  const avgPct =
    sorted.length > 0
      ? Math.round(sorted.reduce((s, c) => s + c.pct, 0) / sorted.length)
      : 0;

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <span className="text-[15px] font-medium">Classement</span>
        <span className="text-[12px] text-gray-400">
          {sorted.length} candidat{sorted.length > 1 ? "s" : ""} {"évalués"} · Moyenne {avgPct}%
        </span>
      </div>

      <div className="p-7">
        {sorted.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            Aucun candidat {"évalué"} pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse bg-white min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 sticky top-14 z-[5]">
                  <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-2.5 text-left w-10">#</th>
                  <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-2.5 text-left min-w-[160px]">Candidat</th>
                  <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-2.5 text-left min-w-[90px]">Score</th>
                  {CRITERIA.map((c, i) => (
                    <th
                      key={i}
                      className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 px-1 py-2.5 text-center min-w-[28px] relative group cursor-help"
                      title={`${c.name} — ${c.desc}`}
                    >
                      <span className="block truncate max-w-[28px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-20 pointer-events-none">
                        <div className="bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                          {c.name}
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-2.5 text-left">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c, idx) => {
                  const scores = (c.scores as Record<string, number>) || {};
                  const rankCls =
                    idx === 0
                      ? "bg-amber-100 text-amber-800"
                      : idx === 1
                        ? "bg-gray-200 text-gray-600"
                        : idx === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-50 text-gray-400";

                  return (
                    <tr key={c.id} className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50/30 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold font-mono ${rankCls}`}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <Link href={`/webapp-testing/candidat/${c.id}`} className="hover:text-rocket-teal transition-colors">
                          <div className="text-[13px] font-medium">{c.prenom} {c.nom}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{[c.sector, c.contrat, c.tjm].filter(Boolean).join(" · ")}</div>
                        </Link>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] font-semibold font-mono text-rocket-teal">{c.pct}%</span>
                          <span className="text-[10px] text-gray-400">{c.filled}/{CRITERIA.length}</span>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden mt-1 w-[70px]">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${c.pct}%`,
                              background: c.pct >= 80 ? "#10b981" : c.pct >= 60 ? "#f59e0b" : "#ef4444",
                            }}
                          />
                        </div>
                      </td>
                      {CRITERIA.map((_, i) => {
                        const s = scores[`c${i}`] || 0;
                        const bg = s > 0 ? SCORE_COLORS[s - 1] : "#f3f4f6";
                        const textColor = s >= 4 ? "#fff" : s > 0 ? "#444" : "#ccc";
                        return (
                          <td key={i} className="px-1 py-2.5 text-center">
                            <div
                              className="w-[22px] h-[22px] rounded inline-flex items-center justify-center text-[10px] font-mono font-semibold mx-auto"
                              style={{ background: bg, color: textColor }}
                            >
                              {s || "·"}
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-3 py-2.5">
                        <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

import { getCandidates } from "@/lib/candidates";
import { CRITERIA, SCORE_COLORS } from "@/lib/r4rpo-constants";
import { VerdictBadge } from "@/components/webapp/VerdictBadge";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClassementPage() {
  const candidates = await getCandidates();

  // Sort by pct desc, then by filled desc
  const sorted = [...candidates]
    .filter((c) => c.filled >= 1)
    .sort((a, b) => b.pct - a.pct || b.filled - a.filled);

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <span className="text-[15px] font-medium">Classement</span>
        <span className="text-[12px] text-gray-400">{sorted.length} candidat{sorted.length > 1 ? "s" : ""} notés</span>
      </div>

      <div className="p-7">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-gray-200 min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3.5 py-2.5 text-left w-10">#</th>
                <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3.5 py-2.5 text-left">Candidat</th>
                <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3.5 py-2.5 text-left">Score</th>
                {CRITERIA.map((c, i) => (
                  <th key={i} className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-2.5 text-center" title={c.name}>
                    {c.name.split(" ")[0].slice(0, 4)}
                  </th>
                ))}
                <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3.5 py-2.5 text-left">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, idx) => {
                const scores = (c.scores as Record<string, number>) || {};
                const rankCls = idx === 0 ? "bg-amber-100 text-amber-800" : idx === 1 ? "bg-gray-100 text-gray-600" : idx === 2 ? "bg-orange-50 text-orange-700" : "bg-gray-50 text-gray-400";

                return (
                  <tr key={c.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50">
                    <td className="px-3.5 py-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold font-mono ${rankCls}`}>
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-3.5 py-3">
                      <Link href={`/webapp-testing/candidat/${c.id}`} className="hover:text-rocket-teal transition-colors">
                        <div className="text-[13px] font-medium">{c.prenom} {c.nom}</div>
                        <div className="text-[11px] text-gray-400">{[c.sector, c.tjm].filter(Boolean).join(" · ")}</div>
                      </Link>
                    </td>
                    <td className="px-3.5 py-3">
                      <div className="text-lg font-medium font-mono text-rocket-teal">{c.pct}%</div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1 min-w-[70px]">
                        <div className="h-full rounded-full bg-rocket-teal" style={{ width: `${c.pct}%` }} />
                      </div>
                    </td>
                    {CRITERIA.map((_, i) => {
                      const s = scores[`c${i}`] || 0;
                      const bg = s > 0 ? SCORE_COLORS[s - 1] : "#e2e2e2";
                      const textColor = s >= 4 ? "#fff" : "#444";
                      return (
                        <td key={i} className="px-2 py-3 text-center">
                          <div
                            className="w-[18px] h-[18px] rounded inline-flex items-center justify-center text-[9px] font-mono font-semibold mx-auto"
                            style={{ background: bg, color: textColor }}
                          >
                            {s || "·"}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-3.5 py-3">
                      <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

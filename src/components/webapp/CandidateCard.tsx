"use client";

import Link from "next/link";
import { initials } from "@/lib/r4rpo-constants";
import { VerdictBadge } from "./VerdictBadge";
import type { CandidateWithVerdict } from "@/lib/candidates";

export function CandidateCard({ candidate: c }: { candidate: CandidateWithVerdict }) {
  const ini = initials(c.prenom, c.nom);
  const meta = [c.sector, c.contrat, c.loc, c.dispo].filter(Boolean).join(" · ");
  const forces = (c.forces as string[] || []).slice(0, 3);

  return (
    <Link
      href={`/webapp-testing/candidat/${c.id}`}
      className="flex items-center gap-3.5 bg-white border border-gray-200 rounded-xl px-4 py-3.5 hover:border-rocket-teal hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full bg-rocket-teal-light text-rocket-teal flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
        {ini}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{c.prenom} {c.nom}</span>
          {c.hasCv && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rocket-teal-light text-rocket-teal font-medium border border-gray-200">
              CV
            </span>
          )}
        </div>
        {(c.email || c.phone) && (
          <div className="mt-0.5">
            {c.email && <span className="text-[11px] text-gray-400 mr-2">{c.email}</span>}
            {c.phone && <span className="text-[11px] text-gray-400">{c.phone}</span>}
          </div>
        )}
        <div className="text-[12px] text-gray-400 mt-0.5">{meta || "—"}</div>
        {forces.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {forces.map((f) => (
              <span key={f} className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 flex-shrink-0">
        {c.filled > 0 && (
          <span className={`text-lg font-medium font-mono ${c.filled < 3 ? "text-gray-400" : "text-rocket-teal"}`}>
            {c.pct}%
          </span>
        )}
        <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
      </div>
    </Link>
  );
}

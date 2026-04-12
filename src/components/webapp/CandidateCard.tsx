"use client";

import Link from "next/link";
import { initials } from "@/lib/r4rpo-constants";
import { VerdictBadge } from "./VerdictBadge";
import type { CandidateWithVerdict } from "@/lib/candidates";

const borderColors: Record<string, string> = {
  top: "border-l-emerald-500",
  mid: "border-l-amber-500",
  low: "border-l-red-500",
  nc: "border-l-gray-300",
};

function formatDate(date: Date | string | null | undefined): string | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return null;
  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function CandidateCard({ candidate: c }: { candidate: CandidateWithVerdict }) {
  const ini = initials(c.prenom, c.nom);
  const meta = [c.sector, c.contrat, c.loc, c.dispo].filter(Boolean).join(" · ");
  const forces = (c.forces as string[] || []).slice(0, 3);
  const risks = (c.risks as string[] || []).slice(0, 2);
  const interviewDate = formatDate(c.date);
  const borderClass = borderColors[c.verdictLevel] || borderColors.nc;

  return (
    <Link
      href={`/webapp-testing/candidat/${c.id}`}
      className={`flex items-center gap-3.5 bg-white border border-gray-200 border-l-[3px] ${borderClass} rounded-xl px-4 py-3.5 hover:border-rocket-teal hover:shadow-sm transition-all cursor-pointer`}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-rocket-teal-light text-rocket-teal flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
        {ini}
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{c.prenom} {c.nom}</span>
          {c.hasCv && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rocket-teal-light text-rocket-teal font-medium border border-gray-200">
              CV
            </span>
          )}
          {interviewDate && (
            <span className="text-[10px] text-gray-400 ml-auto">{interviewDate}</span>
          )}
        </div>

        {(c.email || c.phone) && (
          <div className="mt-0.5">
            {c.email && <span className="text-[11px] text-gray-400 mr-2">{c.email}</span>}
            {c.phone && <span className="text-[11px] text-gray-400">{c.phone}</span>}
          </div>
        )}

        <div className="text-[12px] text-gray-400 mt-0.5">
          {meta || "\u2014"}
          {c.tjm && (
            <span className="ml-2 text-[11px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
              {c.tjm}
            </span>
          )}
        </div>

        {/* Forces tags */}
        {forces.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {forces.map((f) => (
              <span key={f} className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Risk tags */}
        {risks.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {risks.map((r) => (
              <span key={r} className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right side: score + verdict */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0 min-w-[80px]">
        {c.filled > 0 && (
          <div className="flex flex-col items-end gap-0.5">
            <span className={`text-lg font-medium font-mono leading-none ${c.filled < 3 ? "text-gray-400" : "text-rocket-teal"}`}>
              {c.pct}%
            </span>
            {/* Mini progress bar */}
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  c.pct >= 80 ? "bg-emerald-500" : c.pct >= 60 ? "bg-amber-500" : "bg-red-400"
                }`}
                style={{ width: `${Math.min(c.pct, 100)}%` }}
              />
            </div>
          </div>
        )}
        <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
      </div>
    </Link>
  );
}

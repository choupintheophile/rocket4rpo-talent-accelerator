import { Suspense } from "react";
import { getCandidates, getCandidateStats } from "@/lib/candidates";
import { StatsGrid } from "@/components/webapp/StatsGrid";
import { CandidateCard } from "@/components/webapp/CandidateCard";
import { VivierFilters } from "./VivierFilters";

export const dynamic = "force-dynamic";

export default async function VivierPage({ searchParams }: { searchParams: Promise<{ filter?: string; q?: string }> }) {
  const params = await searchParams;
  const filter = params.filter || "all";
  const q = (params.q || "").toLowerCase();

  const [stats, candidates] = await Promise.all([
    getCandidateStats(),
    getCandidates(filter),
  ]);

  const filtered = q
    ? candidates.filter((c) =>
        `${c.prenom} ${c.nom}`.toLowerCase().includes(q) ||
        (c.email?.toLowerCase().includes(q)) ||
        (c.sector?.toLowerCase().includes(q))
      )
    : candidates;

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <span className="text-[15px] font-medium">Vivier candidats</span>
        <span className="text-[12px] text-gray-400">{stats.total} candidat{stats.total > 1 ? "s" : ""}</span>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="/webapp-testing/candidat/nouveau"
            className="px-4 py-1.5 text-[13px] font-medium rounded-lg bg-rocket-teal text-white hover:bg-rocket-teal/90 transition-colors"
          >
            + Nouveau
          </a>
        </div>
      </div>

      <div className="p-7 max-w-[980px]">
        <StatsGrid total={stats.total} prioritaire={stats.prioritaire} secondaire={stats.secondaire} />

        <Suspense fallback={null}>
          <VivierFilters currentFilter={filter} currentQuery={q} />
        </Suspense>

        <div className="flex flex-col gap-1.5">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3 text-gray-200">&#9675;</div>
              <p>{stats.total === 0 ? "Aucun candidat. Cliquez + Nouveau." : "Aucun résultat pour ces filtres."}</p>
            </div>
          ) : (
            filtered.map((c) => <CandidateCard key={c.id} candidate={c} />)
          )}
        </div>
      </div>
    </>
  );
}

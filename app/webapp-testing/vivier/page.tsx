import { getCandidates, getCandidateStats } from "@/lib/candidates";
import { VivierClient } from "./VivierClient";

export const dynamic = "force-dynamic";

export default async function VivierPage() {
  const [stats, candidates] = await Promise.all([
    getCandidateStats(),
    getCandidates(),
  ]);

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
        <VivierClient candidates={candidates} stats={stats} />
      </div>
    </>
  );
}

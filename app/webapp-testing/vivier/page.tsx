import { getCandidates, getCandidateStats } from "@/lib/candidates";
import { VivierClient } from "./VivierClient";
import { Plus } from "lucide-react";

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
        <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
          {stats.total > 0 && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          )}
          {stats.total} candidat{stats.total > 1 ? "s" : ""}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="/webapp-testing/candidat/nouveau"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-rocket-teal text-white hover:bg-rocket-teal/90 shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Nouveau
          </a>
        </div>
      </div>

      <div className="p-7 max-w-[980px]">
        <VivierClient candidates={candidates} stats={stats} />
      </div>
    </>
  );
}

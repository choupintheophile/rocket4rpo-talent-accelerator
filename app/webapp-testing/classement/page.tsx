import { getCandidates } from "@/lib/candidates";
import { SearchEngineClient } from "./SearchEngineClient";

export const dynamic = "force-dynamic";

export default async function ClassementPage() {
  const candidates = await getCandidates();

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-20">
        <span className="text-[15px] font-medium">Classement & recherche</span>
        <span className="text-[12px] text-gray-400">
          {candidates.length} candidat{candidates.length > 1 ? "s" : ""} en base
        </span>
      </div>

      <div className="p-5 lg:p-7">
        <SearchEngineClient candidates={candidates} />
      </div>
    </>
  );
}

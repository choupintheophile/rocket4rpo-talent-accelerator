import { CandidateForm } from "@/components/webapp/CandidateForm";
import Link from "next/link";

export default function NouveauCandidatPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <Link href="/webapp-testing/vivier" className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors">
          &larr; Vivier
        </Link>
        <span className="text-[15px] font-medium">Nouveau candidat</span>
      </div>

      <div className="p-7 max-w-[980px]">
        <CandidateForm />
      </div>
    </>
  );
}

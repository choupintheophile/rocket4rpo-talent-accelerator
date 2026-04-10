import { QUESTIONS } from "@/lib/r4rpo-constants";
import { QuestionsClient } from "./QuestionsClient";

export default function QuestionsPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <span className="text-[15px] font-medium">Grille de questions</span>
        <span className="text-[12px] text-gray-400">{QUESTIONS.length} catégories</span>
      </div>

      <div className="p-7 max-w-[980px]">
        <div className="flex items-center gap-3 text-[12px] text-gray-500 mb-4 pb-3 border-b border-gray-200">
          <span><strong className="text-rocket-teal">&#9679;</strong> Prioritaire</span>
          <span><strong className="text-gray-400">&#9733;</strong> à poser systématiquement</span>
        </div>

        <QuestionsClient questions={QUESTIONS} />
      </div>
    </>
  );
}

import { QUESTIONS, QUESTIONS_EN } from "@/lib/r4rpo-constants";
import { QuestionsClient } from "./QuestionsClient";

const totalQuestions = QUESTIONS.reduce((sum, cat) => sum + cat.questions.length, 0);

export default function QuestionsPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-2.5 sticky top-0 z-10">
        <span className="text-[15px] font-medium">Grille de questions</span>
        <span className="text-[12px] text-gray-400">
          {QUESTIONS.length} categories · {totalQuestions} questions au total
        </span>
      </div>

      <div className="p-7 max-w-[980px]">
        <QuestionsClient questionsFr={QUESTIONS} questionsEn={QUESTIONS_EN} />
      </div>
    </>
  );
}

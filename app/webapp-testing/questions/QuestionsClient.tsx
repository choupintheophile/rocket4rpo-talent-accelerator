"use client";

import { useState } from "react";
import { ChevronDown, Star, CheckCircle, XCircle } from "lucide-react";
import type { QuestionCategory } from "@/lib/r4rpo-constants";

export function QuestionsClient({ questions }: { questions: QuestionCategory[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  function toggle(idx: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  function expandAll() { setOpen(new Set(questions.map((_, i) => i))); }
  function collapseAll() { setOpen(new Set()); }

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={expandAll} className="px-3 py-1.5 text-[12px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Tout deplier
        </button>
        <button onClick={collapseAll} className="px-3 py-1.5 text-[12px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Tout replier
        </button>
        <span className="ml-auto text-[11px] text-gray-400">
          Appuyez sur Entree pour deplier/replier
        </span>
      </div>

      <div className="space-y-2.5">
        {questions.map((cat, idx) => {
          const isOpen = open.has(idx);
          return (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); toggle(idx); } }}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-gray-50 hover:bg-rocket-teal-light/50 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-rocket-teal text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-sm font-medium flex-1">{cat.title}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-gray-200">
                  {cat.questions.map((q, qi) => (
                    <div
                      key={qi}
                      className={`flex gap-2.5 px-4 py-3 border-b border-gray-200 last:border-b-0 ${q.star ? "bg-amber-50 border-l-2 border-l-amber-400" : ""}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${q.star ? "bg-amber-500" : "bg-gray-300"}`} />
                      <p className={`text-[13px] leading-relaxed flex-1 ${q.star ? "font-medium" : ""}`}>{q.q}</p>
                      {q.star && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0 mt-1" />}
                    </div>
                  ))}

                  <div className="px-4 py-3 bg-gray-50/70 border-t border-gray-200 flex gap-4 flex-wrap">
                    <div className="flex gap-1.5 flex-1 min-w-[180px]">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-[12px] text-emerald-700 leading-relaxed">{cat.signalOk}</p>
                    </div>
                    <div className="flex gap-1.5 flex-1 min-w-[180px]">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-[12px] text-red-600 leading-relaxed">{cat.signalKo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

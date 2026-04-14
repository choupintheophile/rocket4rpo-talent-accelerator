"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Star, CheckCircle, XCircle, Languages } from "lucide-react";
import type { QuestionCategory } from "@/lib/r4rpo-constants";

type Lang = "fr" | "en";

const UI_LABELS: Record<Lang, {
  priority: string;
  ask: string;
  expandAll: string;
  collapseAll: string;
  hint: string;
  signalOk: string;
  signalKo: string;
  toggleTitle: string;
}> = {
  fr: {
    priority: "Prioritaire",
    ask: "à poser systématiquement",
    expandAll: "Tout déplier",
    collapseAll: "Tout replier",
    hint: "Appuyez sur Entrée pour déplier/replier",
    signalOk: "Signal positif",
    signalKo: "Signal rouge",
    toggleTitle: "Afficher en anglais",
  },
  en: {
    priority: "Priority",
    ask: "always ask",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    hint: "Press Enter to expand/collapse",
    signalOk: "Positive signal",
    signalKo: "Red flag",
    toggleTitle: "Show in French",
  },
};

export function QuestionsClient({
  questionsFr,
  questionsEn,
}: {
  questionsFr: QuestionCategory[];
  questionsEn: QuestionCategory[];
}) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const [lang, setLang] = useState<Lang>("fr");

  const questions = useMemo(() => (lang === "fr" ? questionsFr : questionsEn), [lang, questionsFr, questionsEn]);
  const labels = UI_LABELS[lang];

  function toggle(idx: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  function expandAll() {
    setOpen(new Set(questions.map((_, i) => i)));
  }
  function collapseAll() {
    setOpen(new Set());
  }

  return (
    <>
      {/* Légende + Toggle langue */}
      <div className="flex items-center gap-3 text-[12px] text-gray-500 mb-4 pb-3 border-b border-gray-200 flex-wrap">
        <span>
          <strong className="text-rocket-teal">&#9679;</strong> {labels.priority}
        </span>
        <span>
          <strong className="text-gray-400">&#9733;</strong> {labels.ask}
        </span>
        <div className="ml-auto flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setLang("fr")}
            className={`flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              lang === "fr" ? "bg-white text-rocket-teal shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Français"
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              lang === "en" ? "bg-white text-rocket-teal shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="English"
          >
            <Languages className="w-3 h-3" />
            EN
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={expandAll}
          className="px-3 py-1.5 text-[12px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {labels.expandAll}
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1.5 text-[12px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {labels.collapseAll}
        </button>
        <span className="ml-auto text-[11px] text-gray-400">{labels.hint}</span>
      </div>

      <div className="space-y-2.5">
        {questions.map((cat, idx) => {
          const isOpen = open.has(idx);
          return (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    toggle(idx);
                  }
                }}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-gray-50 hover:bg-rocket-teal-light/50 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-rocket-teal text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-sm font-medium flex-1">{cat.title}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-gray-200">
                  {cat.questions.map((q, qi) => (
                    <div
                      key={qi}
                      className={`flex gap-2.5 px-4 py-3 border-b border-gray-200 last:border-b-0 ${
                        q.star ? "bg-amber-50 border-l-2 border-l-amber-400" : ""
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                          q.star ? "bg-amber-500" : "bg-gray-300"
                        }`}
                      />
                      <p className={`text-[13px] leading-relaxed flex-1 ${q.star ? "font-medium" : ""}`}>
                        {q.q}
                      </p>
                      {q.star && (
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0 mt-1" />
                      )}
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

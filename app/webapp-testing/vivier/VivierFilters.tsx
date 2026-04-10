"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const segments = [
  { value: "all", label: "Tous" },
  { value: "top", label: "Prioritaire" },
  { value: "mid", label: "Secondaire" },
  { value: "low", label: "Non retenu" },
];

export function VivierFilters({ currentFilter, currentQuery }: { currentFilter: string; currentQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/webapp-testing/vivier?${params.toString()}`);
    });
  }

  return (
    <div className="flex gap-2 mb-4 flex-wrap items-center">
      <input
        type="text"
        placeholder="Rechercher..."
        defaultValue={currentQuery}
        onChange={(e) => updateParams("q", e.target.value)}
        className="px-3 py-1.5 text-[13px] border border-gray-300 rounded-lg max-w-[200px] focus:outline-none focus:border-rocket-teal"
      />

      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        {segments.map((s) => (
          <button
            key={s.value}
            onClick={() => updateParams("filter", s.value)}
            className={`px-3 py-1.5 text-[12px] transition-colors ${
              currentFilter === s.value
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isPending && <span className="text-[11px] text-gray-400">...</span>}
    </div>
  );
}

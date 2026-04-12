"use client";

import { useState } from "react";

export interface VivierFilterValues {
  query: string;
  verdict: string;
  secteur: string;
  contrat: string;
  dispo: string;
  remote: string;
  scoreMin: number;
}

const verdictSegments = [
  { value: "all", label: "Tous" },
  { value: "top", label: "Prioritaire" },
  { value: "mid", label: "Secondaire" },
  { value: "low", label: "Non retenu" },
];

const contratOptions = ["Tous", "TJM Freelance", "CDI", "CDD"];
const dispoOptions = ["Tous", "Immédiate", "1 mois", "2 mois", "3 mois+"];
const remoteOptions = ["Tous", "Full remote", "Hybride", "Onsite"];
const scoreOptions = [
  { label: "Tous", value: 0 },
  { label: "60%+", value: 60 },
  { label: "70%+", value: 70 },
  { label: "80%+", value: 80 },
  { label: "90%+", value: 90 },
];

interface VivierFiltersProps {
  onFilter: (filters: VivierFilterValues) => void;
  filters: VivierFilterValues;
}

export function VivierFilters({ onFilter, filters }: VivierFiltersProps) {
  const [open, setOpen] = useState(false);

  function update(patch: Partial<VivierFilterValues>) {
    onFilter({ ...filters, ...patch });
  }

  const hasAdvancedFilters =
    filters.secteur !== "" ||
    filters.contrat !== "Tous" ||
    filters.dispo !== "Tous" ||
    filters.remote !== "Tous" ||
    filters.scoreMin > 0;

  return (
    <div className="mb-4 space-y-2">
      {/* Row 1: search + verdict toggles */}
      <div className="flex gap-2 flex-wrap items-center">
        <input
          type="text"
          placeholder="Rechercher..."
          value={filters.query}
          onChange={(e) => update({ query: e.target.value })}
          className="px-3 py-1.5 text-[13px] border border-gray-300 rounded-lg max-w-[200px] focus:outline-none focus:border-rocket-teal"
        />

        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          {verdictSegments.map((s) => (
            <button
              key={s.value}
              onClick={() => update({ verdict: s.value })}
              className={`px-3 py-1.5 text-[12px] transition-colors ${
                filters.verdict === s.value
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`px-3 py-1.5 text-[12px] border rounded-lg transition-colors flex items-center gap-1.5 ${
            hasAdvancedFilters
              ? "border-rocket-teal text-rocket-teal bg-rocket-teal-light"
              : "border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
        >
          <svg
            className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Filtres avancés
          {hasAdvancedFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-rocket-teal" />
          )}
        </button>
      </div>

      {/* Row 2: advanced filters (collapsible) */}
      {open && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
          {/* Secteur */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Secteur</label>
            <input
              type="text"
              placeholder="Ex: SaaS, Fintech..."
              value={filters.secteur}
              onChange={(e) => update({ secteur: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:border-rocket-teal bg-white"
            />
          </div>

          {/* Contrat */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Contrat</label>
            <select
              value={filters.contrat}
              onChange={(e) => update({ contrat: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:border-rocket-teal bg-white"
            >
              {contratOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Disponibilité */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Disponibilité</label>
            <select
              value={filters.dispo}
              onChange={(e) => update({ dispo: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:border-rocket-teal bg-white"
            >
              {dispoOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Remote */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Remote</label>
            <select
              value={filters.remote}
              onChange={(e) => update({ remote: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:border-rocket-teal bg-white"
            >
              {remoteOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Score minimum */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Score minimum</label>
            <select
              value={filters.scoreMin}
              onChange={(e) => update({ scoreMin: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:border-rocket-teal bg-white"
            >
              {scoreOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { VivierFilters, type VivierFilterValues } from "./VivierFilters";
import { StatsGrid } from "@/components/webapp/StatsGrid";
import { CandidateCard } from "@/components/webapp/CandidateCard";
import type { CandidateWithVerdict } from "@/lib/candidates";

interface VivierClientProps {
  candidates: CandidateWithVerdict[];
  stats: {
    total: number;
    prioritaire: number;
    secondaire: number;
    nonRetenu: number;
  };
}

const defaultFilters: VivierFilterValues = {
  query: "",
  verdict: "all",
  secteur: "",
  contrat: "Tous",
  dispo: "Tous",
  remote: "Tous",
  scoreMin: 0,
};

export function VivierClient({ candidates, stats }: VivierClientProps) {
  const [filters, setFilters] = useState<VivierFilterValues>(defaultFilters);

  const filtered = useMemo(() => {
    let result = candidates;

    // Verdict filter
    if (filters.verdict !== "all") {
      result = result.filter((c) => c.verdictLevel === filters.verdict);
    }

    // Text search
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (c) =>
          `${c.prenom} ${c.nom}`.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.sector?.toLowerCase().includes(q)
      );
    }

    // Secteur
    if (filters.secteur) {
      const s = filters.secteur.toLowerCase();
      result = result.filter((c) => c.sector?.toLowerCase().includes(s));
    }

    // Contrat
    if (filters.contrat !== "Tous") {
      result = result.filter((c) => {
        if (!c.contrat) return false;
        const contratLower = c.contrat.toLowerCase();
        const filterLower = filters.contrat.toLowerCase();
        return contratLower.includes(filterLower) || filterLower.includes(contratLower);
      });
    }

    // Disponibilité
    if (filters.dispo !== "Tous") {
      result = result.filter((c) => {
        if (!c.dispo) return false;
        const dispoLower = c.dispo.toLowerCase();
        const filterLower = filters.dispo.toLowerCase();
        return dispoLower.includes(filterLower) || filterLower.includes(dispoLower);
      });
    }

    // Remote
    if (filters.remote !== "Tous") {
      result = result.filter((c) => {
        if (!c.remote) return false;
        const remoteLower = c.remote.toLowerCase();
        const filterLower = filters.remote.toLowerCase();
        return remoteLower.includes(filterLower) || filterLower.includes(remoteLower);
      });
    }

    // Score minimum
    if (filters.scoreMin > 0) {
      result = result.filter((c) => c.pct >= filters.scoreMin);
    }

    return result;
  }, [candidates, filters]);

  return (
    <>
      <StatsGrid
        total={stats.total}
        prioritaire={stats.prioritaire}
        secondaire={stats.secondaire}
        nonRetenu={stats.nonRetenu}
      />

      <VivierFilters filters={filters} onFilter={setFilters} />

      <div className="flex flex-col gap-1.5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3 text-gray-200">&#9675;</div>
            <p>
              {stats.total === 0
                ? "Aucun candidat. Cliquez + Nouveau."
                : "Aucun résultat pour ces filtres."}
            </p>
          </div>
        ) : (
          filtered.map((c) => <CandidateCard key={c.id} candidate={c} />)
        )}
      </div>
    </>
  );
}

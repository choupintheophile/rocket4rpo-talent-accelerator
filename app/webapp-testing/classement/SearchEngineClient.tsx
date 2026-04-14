"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  X,
  SlidersHorizontal,
  Download,
  ChevronDown,
  Star,
  Sparkles,
  MapPin,
  Coins,
  Users,
  Compass,
  Brain,
  Flame,
  Heart,
  Languages as LanguagesIcon,
  FileText,
} from "lucide-react";
import {
  CRITERIA,
  SCORE_COLORS,
  SCORING_VISIBLE_ORDER,
  LEVEL_PRESETS,
  QUALIF_PROFILES,
  QUALIF_LEVELS,
  QUALIF_RECRUITED_TYPES,
  LANGUAGES_PRESETS,
  LANGUAGE_LEVELS,
  PROFILE_TYPES_PRESETS,
  COMPANY_TYPES_PRESETS,
} from "@/lib/r4rpo-constants";
import { VerdictBadge } from "@/components/webapp/VerdictBadge";
import type { CandidateWithVerdict } from "@/lib/candidates";

// Alias : la génération Prisma v18/v19 inclut déjà tous les nouveaux champs
type EnrichedCandidate = CandidateWithVerdict;

type SortMode = "score-desc" | "score-asc" | "recent" | "oldest" | "tjm-desc" | "tjm-asc" | "name";

/* ═══════════════════════════════════════════════════════════════════════
   Filter state
   ═══════════════════════════════════════════════════════════════════════ */
interface Filters {
  query: string;
  verdicts: Set<string>; // "top" | "mid" | "low" | "nc"
  scoreMin: number;
  scoreMax: number;
  minFilled: number;
  openCddCdi: Set<"true" | "false" | "null">; // filtre multi
  tjmMin: string;
  tjmMax: string;
  hasCv: "any" | "yes" | "no";
  qualifProfile: Set<string>;
  qualifLevel: Set<string>;
  qualifRecruitedTypes: Set<string>;
  intelligenceLevel: Set<string>;
  motivationLevel: Set<string>;
  sympathyLevel: Set<string>;
  languages: Set<string>; // langues au moins parlées
  minLangLevel: string; // niveau minimum requis
  loc: string;
  profileTypes: Set<string>;
  companyTypes: Set<string>;
  critScores: Record<number, number>; // critIdx → score minimum (0-5)
}

const EMPTY_FILTERS: Filters = {
  query: "",
  verdicts: new Set(),
  scoreMin: 0,
  scoreMax: 100,
  minFilled: 0,
  openCddCdi: new Set(),
  tjmMin: "",
  tjmMax: "",
  hasCv: "any",
  qualifProfile: new Set(),
  qualifLevel: new Set(),
  qualifRecruitedTypes: new Set(),
  intelligenceLevel: new Set(),
  motivationLevel: new Set(),
  sympathyLevel: new Set(),
  languages: new Set(),
  minLangLevel: "",
  loc: "",
  profileTypes: new Set(),
  companyTypes: new Set(),
  critScores: {},
};

/* ═══════════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════════ */
function parseTjmNumber(tjm: string | null | undefined): number | null {
  if (!tjm) return null;
  const m = tjm.match(/(\d{3,5})/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return isNaN(n) ? null : n;
}

function asStringArray(val: unknown): string[] {
  return Array.isArray(val) ? val.filter((v): v is string => typeof v === "string") : [];
}

function langLevelScore(level: string): number {
  // Pour comparer les niveaux de langue : plus haut = meilleur
  const idx = LANGUAGE_LEVELS.indexOf(level as (typeof LANGUAGE_LEVELS)[number]);
  if (idx === -1) return 0;
  return LANGUAGE_LEVELS.length - idx; // inverse : Natif=6, Notions=1
}

/* ═══════════════════════════════════════════════════════════════════════
   Composants UI atomiques
   ═══════════════════════════════════════════════════════════════════════ */

function ChipButton({
  children,
  active,
  onClick,
  color = "teal",
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color?: "teal" | "blue" | "purple" | "amber" | "pink" | "emerald";
}) {
  const activeCls: Record<string, string> = {
    teal: "bg-rocket-teal/10 border-rocket-teal text-rocket-teal",
    blue: "bg-blue-50 border-blue-400 text-blue-700",
    purple: "bg-purple-50 border-purple-400 text-purple-700",
    amber: "bg-amber-50 border-amber-400 text-amber-700",
    pink: "bg-pink-50 border-pink-400 text-pink-700",
    emerald: "bg-emerald-50 border-emerald-400 text-emerald-700",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
        active
          ? `${activeCls[color]} font-medium shadow-sm`
          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0 pb-3 mb-3 last:mb-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 py-1.5 text-left"
      >
        <div className="w-5 h-5 rounded bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 flex-1">
          {title}
        </span>
        {badge !== undefined && badge > 0 && (
          <span className="text-[10px] font-mono tabular-nums bg-rocket-teal/10 text-rocket-teal px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-2 pl-7">{children}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Composant principal
   ═══════════════════════════════════════════════════════════════════════ */
export function SearchEngineClient({ candidates }: { candidates: EnrichedCandidate[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortMode>("score-desc");

  // Helper pour updates
  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleSetValue = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const setField = prev[key];
      if (!(setField instanceof Set)) return prev;
      const next = new Set(setField as Set<string>);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, [key]: next };
    });
  }, []);

  // Filtrage + tri
  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const locQ = filters.loc.trim().toLowerCase();
    const tjmMinN = filters.tjmMin ? parseInt(filters.tjmMin, 10) : null;
    const tjmMaxN = filters.tjmMax ? parseInt(filters.tjmMax, 10) : null;
    const minLangScore = filters.minLangLevel ? langLevelScore(filters.minLangLevel) : 0;

    const result = candidates.filter((c) => {
      // Query full-text
      if (q) {
        const hay = [
          c.prenom,
          c.nom,
          c.email,
          c.phone,
          c.linkedin,
          c.loc,
          c.tjm,
          c.sector,
          c.contrat,
          c.notes,
          c.resumeText,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // Verdict
      if (filters.verdicts.size > 0 && !filters.verdicts.has(c.verdictLevel)) return false;

      // Score range
      if (c.pct < filters.scoreMin || c.pct > filters.scoreMax) return false;

      // Nombre minimum de critères remplis
      if (filters.minFilled > 0 && c.filled < filters.minFilled) return false;

      // Open CDD/CDI
      if (filters.openCddCdi.size > 0) {
        const v =
          c.openCddCdi === true ? "true" : c.openCddCdi === false ? "false" : "null";
        if (!filters.openCddCdi.has(v as "true" | "false" | "null")) return false;
      }

      // TJM min/max (numérique)
      const tjmN = parseTjmNumber(c.tjm);
      if (tjmMinN !== null && (tjmN === null || tjmN < tjmMinN)) return false;
      if (tjmMaxN !== null && (tjmN === null || tjmN > tjmMaxN)) return false;

      // Has CV
      if (filters.hasCv === "yes" && !c.hasCv) return false;
      if (filters.hasCv === "no" && c.hasCv) return false;

      // Qualification profile
      if (filters.qualifProfile.size > 0 && (!c.qualifProfile || !filters.qualifProfile.has(c.qualifProfile)))
        return false;

      // Qualification level
      if (filters.qualifLevel.size > 0 && (!c.qualifLevel || !filters.qualifLevel.has(c.qualifLevel)))
        return false;

      // Qualif recruited types (au moins un match)
      if (filters.qualifRecruitedTypes.size > 0) {
        const types = asStringArray(c.qualifRecruitedTypes);
        const hasMatch = types.some((t) => filters.qualifRecruitedTypes.has(t));
        if (!hasMatch) return false;
      }

      // Intelligence / Motivation / Sympathie levels
      if (filters.intelligenceLevel.size > 0 && (!c.intelligenceLevel || !filters.intelligenceLevel.has(c.intelligenceLevel)))
        return false;
      if (filters.motivationLevel.size > 0 && (!c.motivationLevel || !filters.motivationLevel.has(c.motivationLevel)))
        return false;
      if (filters.sympathyLevel.size > 0 && (!c.sympathyLevel || !filters.sympathyLevel.has(c.sympathyLevel)))
        return false;

      // Langues
      if (filters.languages.size > 0) {
        const spoken = (Array.isArray(c.languagesSpoken) ? c.languagesSpoken : []) as Array<{ lang: string; level: string }>;
        // Doit parler TOUTES les langues demandées (AND)
        for (const reqLang of filters.languages) {
          const found = spoken.find((s) => s.lang === reqLang);
          if (!found) return false;
          // Si un niveau min est requis
          if (minLangScore > 0 && langLevelScore(found.level) < minLangScore) return false;
        }
      }

      // Localisation
      if (locQ) {
        const locHay = (c.loc || "").toLowerCase();
        if (!locHay.includes(locQ)) return false;
      }

      // Profile types (auto) — au moins un match
      if (filters.profileTypes.size > 0) {
        const ptypes = asStringArray(c.profileTypes);
        const hasMatch = ptypes.some((t) => filters.profileTypes.has(t));
        if (!hasMatch) return false;
      }

      // Company types (auto) — au moins un match
      if (filters.companyTypes.size > 0) {
        const ctypes = asStringArray(c.companyTypes);
        const hasMatch = ctypes.some((t) => filters.companyTypes.has(t));
        if (!hasMatch) return false;
      }

      // Scores min par critère visible
      const scores = (c.scores as Record<string, number>) || {};
      for (const [idxStr, minScore] of Object.entries(filters.critScores)) {
        const idx = parseInt(idxStr, 10);
        const s = scores[`c${idx}`] || 0;
        if (s < minScore) return false;
      }

      return true;
    });

    // Tri
    result.sort((a, b) => {
      switch (sort) {
        case "score-desc":
          return b.pct - a.pct || b.filled - a.filled;
        case "score-asc":
          return a.pct - b.pct || a.filled - b.filled;
        case "recent":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "oldest":
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case "tjm-desc":
          return (parseTjmNumber(b.tjm) || 0) - (parseTjmNumber(a.tjm) || 0);
        case "tjm-asc":
          return (parseTjmNumber(a.tjm) || Infinity) - (parseTjmNumber(b.tjm) || Infinity);
        case "name":
          return `${a.prenom} ${a.nom}`.localeCompare(`${b.prenom} ${b.nom}`);
        default:
          return 0;
      }
    });

    return result;
  }, [candidates, filters, sort]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.query) count++;
    count += filters.verdicts.size;
    if (filters.scoreMin > 0) count++;
    if (filters.scoreMax < 100) count++;
    if (filters.minFilled > 0) count++;
    count += filters.openCddCdi.size;
    if (filters.tjmMin) count++;
    if (filters.tjmMax) count++;
    if (filters.hasCv !== "any") count++;
    count += filters.qualifProfile.size + filters.qualifLevel.size + filters.qualifRecruitedTypes.size;
    count += filters.intelligenceLevel.size + filters.motivationLevel.size + filters.sympathyLevel.size;
    count += filters.languages.size;
    if (filters.minLangLevel) count++;
    if (filters.loc) count++;
    count += filters.profileTypes.size + filters.companyTypes.size;
    count += Object.keys(filters.critScores).length;
    return count;
  }, [filters]);

  function resetFilters() {
    setFilters(EMPTY_FILTERS);
  }

  function exportCsv() {
    const rows = [
      [
        "Prénom", "Nom", "Email", "Phone", "LinkedIn", "Localisation",
        "TJM", "Contrat", "Ouvert CDD/CDI", "Qualif profil", "Qualif niveau",
        "Score %", "Critères remplis", "Verdict", "Intelligence", "Motivation",
        "Sympathie", "Langues", "CV",
      ],
      ...filtered.map((c) => {
        const langs = (Array.isArray(c.languagesSpoken) ? c.languagesSpoken : []) as Array<{ lang: string; level: string }>;
        return [
          c.prenom, c.nom, c.email || "", c.phone || "", c.linkedin || "", c.loc || "",
          c.tjm || "", c.contrat || "",
          c.openCddCdi === true ? "Oui" : c.openCddCdi === false ? "Non" : "",
          c.qualifProfile || "", c.qualifLevel || "",
          `${c.pct}%`, `${c.filled}/${CRITERIA.length}`, c.verdictLabel,
          c.intelligenceLevel || "", c.motivationLevel || "", c.sympathyLevel || "",
          langs.map((l) => `${l.lang} (${l.level})`).join(" / "),
          c.hasCv ? "Oui" : "Non",
        ];
      }),
    ];
    const csv = rows
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `classement-candidats-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-full">
      {/* ═══ SIDEBAR FILTRES ═══ */}
      <aside className="lg:w-[340px] lg:flex-shrink-0">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm lg:sticky lg:top-20 lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-rocket-teal/10 text-rocket-teal flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <h2 className="text-[13px] font-semibold text-gray-800 flex-1">Filtres</h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                {activeFilterCount}
              </button>
            )}
          </div>

          {/* RECHERCHE TEXTE LIBRE */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                placeholder="Nom, email, résumé, notes..."
                className="w-full pl-9 pr-8 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-rocket-teal focus:ring-2 focus:ring-rocket-teal/10 transition-all"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => updateFilter("query", "")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* VERDICT */}
          <FilterGroup title="Verdict" icon={<Star className="w-3 h-3" />} badge={filters.verdicts.size}>
            <div className="flex flex-wrap gap-1">
              {[
                { v: "top", label: "Prioritaire", color: "emerald" as const },
                { v: "mid", label: "Secondaire", color: "amber" as const },
                { v: "low", label: "Non retenu", color: "pink" as const },
                { v: "nc", label: "Incomplet", color: "blue" as const },
              ].map(({ v, label, color }) => (
                <ChipButton
                  key={v}
                  active={filters.verdicts.has(v)}
                  onClick={() => toggleSetValue("verdicts", v)}
                  color={color}
                >
                  {label}
                </ChipButton>
              ))}
            </div>
          </FilterGroup>

          {/* SCORE % */}
          <FilterGroup title="Score %" icon={<Sparkles className="w-3 h-3" />} badge={(filters.scoreMin > 0 ? 1 : 0) + (filters.scoreMax < 100 ? 1 : 0)}>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                value={filters.scoreMin || ""}
                onChange={(e) => updateFilter("scoreMin", Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                placeholder="0"
                className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-rocket-teal"
              />
              <span className="text-gray-400 text-[11px]">→</span>
              <input
                type="number"
                min={0}
                max={100}
                value={filters.scoreMax === 100 ? "" : filters.scoreMax}
                onChange={(e) => updateFilter("scoreMax", Math.max(0, Math.min(100, parseInt(e.target.value) || 100)))}
                placeholder="100"
                className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-rocket-teal"
              />
            </div>
            <div className="mt-2">
              <label className="text-[10px] text-gray-500 flex items-center gap-1">
                Min critères remplis :
                <input
                  type="number"
                  min={0}
                  max={CRITERIA.length}
                  value={filters.minFilled || ""}
                  onChange={(e) => updateFilter("minFilled", Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="0"
                  className="w-14 px-1.5 py-0.5 text-[11px] border border-gray-200 rounded"
                />
              </label>
            </div>
          </FilterGroup>

          {/* CONTRAT + TJM */}
          <FilterGroup title="Contrat & TJM" icon={<Coins className="w-3 h-3" />} badge={filters.openCddCdi.size + (filters.tjmMin ? 1 : 0) + (filters.tjmMax ? 1 : 0) + (filters.hasCv !== "any" ? 1 : 0)}>
            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Ouvert CDD/CDI ?</div>
                <div className="flex gap-1">
                  <ChipButton
                    active={filters.openCddCdi.has("true")}
                    onClick={() => toggleSetValue("openCddCdi", "true")}
                    color="emerald"
                  >
                    Oui
                  </ChipButton>
                  <ChipButton
                    active={filters.openCddCdi.has("false")}
                    onClick={() => toggleSetValue("openCddCdi", "false")}
                    color="pink"
                  >
                    Non
                  </ChipButton>
                  <ChipButton
                    active={filters.openCddCdi.has("null")}
                    onClick={() => toggleSetValue("openCddCdi", "null")}
                  >
                    —
                  </ChipButton>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">TJM (€/j)</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.tjmMin}
                    onChange={(e) => updateFilter("tjmMin", e.target.value)}
                    placeholder="Min"
                    className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-rocket-teal"
                  />
                  <span className="text-gray-400 text-[11px]">→</span>
                  <input
                    type="number"
                    value={filters.tjmMax}
                    onChange={(e) => updateFilter("tjmMax", e.target.value)}
                    placeholder="Max"
                    className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-rocket-teal"
                  />
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">CV</div>
                <div className="flex gap-1">
                  <ChipButton active={filters.hasCv === "any"} onClick={() => updateFilter("hasCv", "any")}>
                    Tous
                  </ChipButton>
                  <ChipButton
                    active={filters.hasCv === "yes"}
                    onClick={() => updateFilter("hasCv", "yes")}
                    color="emerald"
                  >
                    Avec CV
                  </ChipButton>
                  <ChipButton
                    active={filters.hasCv === "no"}
                    onClick={() => updateFilter("hasCv", "no")}
                    color="pink"
                  >
                    Sans CV
                  </ChipButton>
                </div>
              </div>
            </div>
          </FilterGroup>

          {/* LOCALISATION */}
          <FilterGroup title="Localisation" icon={<MapPin className="w-3 h-3" />} badge={filters.loc ? 1 : 0}>
            <input
              type="text"
              value={filters.loc}
              onChange={(e) => updateFilter("loc", e.target.value)}
              placeholder="Paris, Lyon, Remote..."
              className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-rocket-teal"
            />
          </FilterGroup>

          {/* QUALIFICATION */}
          <FilterGroup
            title="Qualification"
            icon={<Compass className="w-3 h-3" />}
            badge={filters.qualifProfile.size + filters.qualifLevel.size + filters.qualifRecruitedTypes.size}
          >
            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Profil</div>
                <div className="flex flex-wrap gap-1">
                  {QUALIF_PROFILES.map((p) => (
                    <ChipButton
                      key={p}
                      active={filters.qualifProfile.has(p)}
                      onClick={() => toggleSetValue("qualifProfile", p)}
                      color="purple"
                    >
                      {p}
                    </ChipButton>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Niveau</div>
                <div className="flex flex-wrap gap-1">
                  {QUALIF_LEVELS.map((l) => (
                    <ChipButton
                      key={l}
                      active={filters.qualifLevel.has(l)}
                      onClick={() => toggleSetValue("qualifLevel", l)}
                      color="purple"
                    >
                      {l}
                    </ChipButton>
                  ))}
                </div>
              </div>
              {/* Types recrutés : montrer tous (3 profils fusionnés) */}
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Types recrutés (union des 3 profils)</div>
                <div className="flex flex-wrap gap-1 max-h-[150px] overflow-y-auto">
                  {Array.from(
                    new Set(
                      [
                        ...QUALIF_RECRUITED_TYPES["Généraliste"],
                        ...QUALIF_RECRUITED_TYPES["Sales"],
                        ...QUALIF_RECRUITED_TYPES["IT"],
                      ],
                    ),
                  ).map((t) => (
                    <ChipButton
                      key={t}
                      active={filters.qualifRecruitedTypes.has(t)}
                      onClick={() => toggleSetValue("qualifRecruitedTypes", t)}
                      color="blue"
                    >
                      {t}
                    </ChipButton>
                  ))}
                </div>
              </div>
            </div>
          </FilterGroup>

          {/* ÉVALUATION HUMAINE */}
          <FilterGroup
            title="Évaluation humaine"
            icon={<Heart className="w-3 h-3" />}
            badge={filters.intelligenceLevel.size + filters.motivationLevel.size + filters.sympathyLevel.size}
          >
            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-amber-500" /> Intelligence
                </div>
                <div className="flex gap-1 flex-wrap">
                  {LEVEL_PRESETS.map((l) => (
                    <ChipButton
                      key={l}
                      active={filters.intelligenceLevel.has(l)}
                      onClick={() => toggleSetValue("intelligenceLevel", l)}
                      color="amber"
                    >
                      {l}
                    </ChipButton>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" /> Motivation
                </div>
                <div className="flex gap-1 flex-wrap">
                  {LEVEL_PRESETS.map((l) => (
                    <ChipButton
                      key={l}
                      active={filters.motivationLevel.has(l)}
                      onClick={() => toggleSetValue("motivationLevel", l)}
                      color="amber"
                    >
                      {l}
                    </ChipButton>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-500" /> Sympathie
                </div>
                <div className="flex gap-1 flex-wrap">
                  {LEVEL_PRESETS.map((l) => (
                    <ChipButton
                      key={l}
                      active={filters.sympathyLevel.has(l)}
                      onClick={() => toggleSetValue("sympathyLevel", l)}
                      color="pink"
                    >
                      {l}
                    </ChipButton>
                  ))}
                </div>
              </div>
            </div>
          </FilterGroup>

          {/* LANGUES */}
          <FilterGroup
            title="Langues"
            icon={<LanguagesIcon className="w-3 h-3" />}
            badge={filters.languages.size + (filters.minLangLevel ? 1 : 0)}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {LANGUAGES_PRESETS.map((lang) => (
                  <ChipButton
                    key={lang}
                    active={filters.languages.has(lang)}
                    onClick={() => toggleSetValue("languages", lang)}
                    color="blue"
                  >
                    {lang}
                  </ChipButton>
                ))}
              </div>
              {filters.languages.size > 0 && (
                <div>
                  <div className="text-[10px] text-gray-500 mb-1">Niveau minimum requis</div>
                  <select
                    value={filters.minLangLevel}
                    onChange={(e) => updateFilter("minLangLevel", e.target.value)}
                    className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-rocket-teal"
                  >
                    <option value="">Tous niveaux</option>
                    {LANGUAGE_LEVELS.map((l) => (
                      <option key={l} value={l}>
                        ≥ {l}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </FilterGroup>

          {/* PROFILS RECRUTÉS (auto-détectés) */}
          <FilterGroup
            title="Profils recrutés (auto)"
            icon={<Users className="w-3 h-3" />}
            badge={filters.profileTypes.size}
          >
            <div className="flex flex-wrap gap-1">
              {PROFILE_TYPES_PRESETS.map((p) => (
                <ChipButton
                  key={p}
                  active={filters.profileTypes.has(p)}
                  onClick={() => toggleSetValue("profileTypes", p)}
                  color="teal"
                >
                  {p}
                </ChipButton>
              ))}
            </div>
          </FilterGroup>

          {/* TYPE DE BOÎTE (auto-détectés) */}
          <FilterGroup
            title="Type de boîte (auto)"
            icon={<FileText className="w-3 h-3" />}
            badge={filters.companyTypes.size}
            defaultOpen={false}
          >
            <div className="flex flex-wrap gap-1">
              {COMPANY_TYPES_PRESETS.map((c) => (
                <ChipButton
                  key={c}
                  active={filters.companyTypes.has(c)}
                  onClick={() => toggleSetValue("companyTypes", c)}
                  color="blue"
                >
                  {c}
                </ChipButton>
              ))}
            </div>
          </FilterGroup>

          {/* SCORES MIN PAR CRITÈRE */}
          <FilterGroup
            title="Scores minimum par critère"
            icon={<Sparkles className="w-3 h-3" />}
            badge={Object.keys(filters.critScores).length}
            defaultOpen={false}
          >
            <div className="space-y-1.5">
              {SCORING_VISIBLE_ORDER.map((idx) => {
                const crit = CRITERIA[idx];
                const current = filters.critScores[idx] || 0;
                return (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-600 flex-1 truncate" title={crit.name}>
                      {crit.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() =>
                            updateFilter("critScores", {
                              ...filters.critScores,
                              ...(v === 0
                                ? Object.fromEntries(Object.entries(filters.critScores).filter(([k]) => parseInt(k, 10) !== idx))
                                : { [idx]: v }),
                            })
                          }
                          className={`w-5 h-5 rounded text-[9px] font-mono font-bold transition-all ${
                            current === v
                              ? v === 0
                                ? "bg-gray-200 text-gray-600"
                                : "bg-rocket-teal text-white"
                              : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                          }`}
                        >
                          {v === 0 ? "—" : `≥${v}`}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </FilterGroup>
        </div>
      </aside>

      {/* ═══ RÉSULTATS ═══ */}
      <main className="flex-1 min-w-0">
        {/* Header résultats */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-3 flex-wrap">
          <div className="flex items-baseline gap-2">
            <span className="text-[20px] font-bold text-gray-900 font-mono tabular-nums">
              {filtered.length}
            </span>
            <span className="text-[12px] text-gray-500">
              candidat{filtered.length > 1 ? "s" : ""} / {candidates.length}
            </span>
          </div>

          {activeFilterCount > 0 && (
            <span className="text-[11px] text-rocket-teal bg-rocket-teal/10 px-2 py-0.5 rounded-full font-medium">
              {activeFilterCount} filtre{activeFilterCount > 1 ? "s" : ""} actif{activeFilterCount > 1 ? "s" : ""}
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <label className="text-[11px] text-gray-500">Trier par :</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="text-[12px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-rocket-teal bg-white cursor-pointer"
            >
              <option value="score-desc">Score ↓</option>
              <option value="score-asc">Score ↑</option>
              <option value="recent">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="tjm-desc">TJM ↓</option>
              <option value="tjm-asc">TJM ↑</option>
              <option value="name">Nom A→Z</option>
            </select>
            <button
              type="button"
              onClick={exportCsv}
              disabled={filtered.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg border border-gray-200 text-gray-600 hover:border-rocket-teal hover:text-rocket-teal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>

        {/* Liste des résultats */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-200/80 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-[14px] text-gray-600 font-medium mb-1">Aucun candidat ne correspond</p>
            <p className="text-[12px] text-gray-400">Essayez d&apos;élargir ou de réinitialiser vos filtres.</p>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 text-[12px] font-medium rounded-lg bg-rocket-teal text-white hover:bg-rocket-teal/90 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((c, idx) => (
              <CandidateCard key={c.id} candidate={c} rank={idx + 1} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Carte candidat individuelle
   ═══════════════════════════════════════════════════════════════════════ */
function CandidateCard({ candidate: c, rank }: { candidate: EnrichedCandidate; rank: number }) {
  const scores = (c.scores as Record<string, number>) || {};
  const langs = (Array.isArray(c.languagesSpoken) ? c.languagesSpoken : []) as Array<{
    lang: string;
    level: string;
  }>;
  const profileTypes = asStringArray(c.profileTypes);
  const companyTypes = asStringArray(c.companyTypes);
  const qualifRecruited = asStringArray(c.qualifRecruitedTypes);

  const rankCls =
    rank === 1
      ? "bg-amber-100 text-amber-800 border-amber-300"
      : rank === 2
        ? "bg-gray-100 text-gray-700 border-gray-300"
        : rank === 3
          ? "bg-orange-100 text-orange-700 border-orange-300"
          : "bg-gray-50 text-gray-500 border-gray-200";

  return (
    <Link
      href={`/webapp-testing/candidat/${c.id}`}
      className="block bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-rocket-teal/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Rank */}
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[13px] font-bold font-mono flex-shrink-0 ${rankCls}`}>
          {rank}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <div className="text-[14px] font-semibold text-gray-900 group-hover:text-rocket-teal transition-colors">
              {c.prenom} {c.nom}
            </div>
            <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
            {c.hasCv && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                CV
              </span>
            )}
            {c.openCddCdi === true && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                CDI ok
              </span>
            )}
          </div>

          <div className="text-[11px] text-gray-500 flex items-center gap-2 flex-wrap">
            {c.loc && (
              <span className="inline-flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                {c.loc}
              </span>
            )}
            {c.tjm && <span>💰 {c.tjm}</span>}
            {c.qualifProfile && (
              <span className="text-purple-600">
                {c.qualifProfile}
                {c.qualifLevel && ` · ${c.qualifLevel}`}
              </span>
            )}
            {c.email && <span className="truncate">{c.email}</span>}
          </div>

          {/* Tags contextuels */}
          {(qualifRecruited.length > 0 || profileTypes.length > 0 || companyTypes.length > 0) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {qualifRecruited.slice(0, 4).map((t, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {t}
                </span>
              ))}
              {profileTypes.slice(0, 3).map((t, i) => (
                <span key={`p-${i}`} className="text-[10px] px-1.5 py-0.5 rounded-full bg-rocket-teal/10 text-rocket-teal border border-rocket-teal/20">
                  {t}
                </span>
              ))}
              {companyTypes.slice(0, 3).map((t, i) => (
                <span key={`c-${i}`} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                  {t}
                </span>
              ))}
              {langs.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  <LanguagesIcon className="w-2.5 h-2.5 inline mr-0.5" />
                  {langs.map((l) => l.lang).slice(0, 3).join(" · ")}
                  {langs.length > 3 && ` +${langs.length - 3}`}
                </span>
              )}
            </div>
          )}

          {/* I / M / S levels */}
          {(c.intelligenceLevel || c.motivationLevel || c.sympathyLevel) && (
            <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
              {c.intelligenceLevel && (
                <span className="inline-flex items-center gap-1">
                  <Brain className="w-2.5 h-2.5 text-amber-500" />
                  <span className="font-medium text-gray-700">{c.intelligenceLevel}</span>
                </span>
              )}
              {c.motivationLevel && (
                <span className="inline-flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5 text-orange-500" />
                  <span className="font-medium text-gray-700">{c.motivationLevel}</span>
                </span>
              )}
              {c.sympathyLevel && (
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 text-pink-500" />
                  <span className="font-medium text-gray-700">{c.sympathyLevel}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Scores à droite */}
        <div className="flex-shrink-0 text-right">
          <div className="text-[20px] font-bold font-mono text-rocket-teal tabular-nums">{c.pct}%</div>
          <div className="text-[10px] text-gray-400 mb-2">
            {c.filled}/{CRITERIA.length}
          </div>

          {/* Mini scoring : 8 critères visibles en dots */}
          <div className="flex gap-0.5 justify-end">
            {SCORING_VISIBLE_ORDER.map((critIdx) => {
              const s = scores[`c${critIdx}`] || 0;
              const bg = s > 0 ? SCORE_COLORS[s - 1] : "#f3f4f6";
              const color = s >= 4 ? "#fff" : s > 0 ? "#444" : "#ccc";
              return (
                <div
                  key={critIdx}
                  className="w-5 h-5 rounded text-[9px] font-mono font-bold flex items-center justify-center"
                  style={{ background: bg, color }}
                  title={CRITERIA[critIdx].name}
                >
                  {s || "·"}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

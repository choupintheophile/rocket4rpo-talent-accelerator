"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
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
  LayoutGrid,
  Table as TableIcon,
  Keyboard,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Zap,
  GitCompare,
  Trash2,
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
  verdicts: Set<string>;
  scoreMin: number;
  scoreMax: number;
  minFilled: number;
  openCddCdi: Set<"true" | "false" | "null">;
  tjmMin: string;
  tjmMax: string;
  hasCv: "any" | "yes" | "no";
  qualifProfile: Set<string>;
  qualifLevel: Set<string>;
  qualifRecruitedTypes: Set<string>;
  intelligenceLevel: Set<string>;
  motivationLevel: Set<string>;
  sympathyLevel: Set<string>;
  languages: Set<string>;
  minLangLevel: string;
  loc: string;
  profileTypes: Set<string>;
  companyTypes: Set<string>;
  critScores: Record<number, number>;
  // v20.5
  forces: Set<string>; // au moins une force présente (AND-ish → OR simple)
  risks: Set<string>; // au moins une alerte présente
  interviewSince: number; // jours ("entretien <= X jours")
  updatedSince: number; // jours (mis à jour <= X jours)
  onlyShortlist: boolean;
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
  forces: new Set(),
  risks: new Set(),
  interviewSince: 0,
  updatedSince: 0,
  onlyShortlist: false,
};

const SHORTLIST_LS_KEY = "r4rpo_shortlist_v1";
const VIEW_LS_KEY = "r4rpo_classement_view_v1";

// Presets rapides — bookmarks de filtres
const QUICK_PRESETS: { id: string; label: string; emoji: string; apply: (f: Filters) => Filters }[] = [
  {
    id: "favorites",
    label: "Favoris",
    emoji: "⭐",
    apply: (f) => ({ ...EMPTY_FILTERS, query: f.query, onlyShortlist: true }),
  },
  {
    id: "stars",
    label: "Stars ≥85%",
    emoji: "🏆",
    apply: (f) => ({ ...EMPTY_FILTERS, query: f.query, scoreMin: 85, minFilled: 5 }),
  },
  {
    id: "sales-sr",
    label: "Sales senior",
    emoji: "💼",
    apply: (f) => ({
      ...EMPTY_FILTERS,
      query: f.query,
      qualifProfile: new Set(["Sales"]),
      qualifLevel: new Set(["Senior (6-10 ans)", "Expert (10+ ans)"]),
    }),
  },
  {
    id: "it-sr",
    label: "IT senior",
    emoji: "💻",
    apply: (f) => ({
      ...EMPTY_FILTERS,
      query: f.query,
      qualifProfile: new Set(["IT"]),
      qualifLevel: new Set(["Senior (6-10 ans)", "Expert (10+ ans)"]),
    }),
  },
  {
    id: "open-cdi",
    label: "Ouvert CDI",
    emoji: "✓",
    apply: (f) => ({ ...EMPTY_FILTERS, query: f.query, openCddCdi: new Set(["true"]) }),
  },
  {
    id: "this-week",
    label: "Cette semaine",
    emoji: "📅",
    apply: (f) => ({ ...EMPTY_FILTERS, query: f.query, updatedSince: 7 }),
  },
  {
    id: "intl",
    label: "Profil international",
    emoji: "🌍",
    apply: (f) => ({
      ...EMPTY_FILTERS,
      query: f.query,
      languages: new Set(["Anglais"]),
      minLangLevel: "Courant (C1-C2)",
    }),
  },
];

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
  const [view, setView] = useState<"cards" | "table">("cards");
  const [shortlist, setShortlist] = useState<Set<string>>(new Set());
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Charger shortlist + vue depuis localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SHORTLIST_LS_KEY);
      if (stored) setShortlist(new Set(JSON.parse(stored)));
      const storedView = window.localStorage.getItem(VIEW_LS_KEY);
      if (storedView === "cards" || storedView === "table") setView(storedView);
    } catch {}
  }, []);

  // Persister shortlist
  useEffect(() => {
    try {
      window.localStorage.setItem(SHORTLIST_LS_KEY, JSON.stringify(Array.from(shortlist)));
    } catch {}
  }, [shortlist]);

  // Persister vue
  useEffect(() => {
    try {
      window.localStorage.setItem(VIEW_LS_KEY, view);
    } catch {}
  }, [view]);

  // Raccourcis clavier globaux
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT";

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && !isTyping) {
        setFilters(EMPTY_FILTERS);
        setActivePreset(null);
      } else if (e.key === "?" && !isTyping) {
        e.preventDefault();
        setShowShortcuts((v) => !v);
      } else if (e.key.toLowerCase() === "c" && !isTyping && !e.ctrlKey && !e.metaKey) {
        setCompareMode((v) => !v);
      } else if (e.key === "v" && !isTyping && !e.ctrlKey && !e.metaKey) {
        setView((v) => (v === "cards" ? "table" : "cards"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleShortlist(id: string) {
    setShortlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCompareId(id: string) {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 4) {
        next.add(id);
      }
      return next;
    });
  }

  function applyPreset(preset: (typeof QUICK_PRESETS)[number]) {
    if (activePreset === preset.id) {
      // Toggle off
      setFilters(EMPTY_FILTERS);
      setActivePreset(null);
    } else {
      setFilters(preset.apply(filters));
      setActivePreset(preset.id);
    }
  }

  // Helper pour updates
  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null); // reset preset si on modifie manuellement
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

      // v20.5 — Forces (au moins une match)
      if (filters.forces.size > 0) {
        const cForces = asStringArray(c.forces);
        const hasMatch = cForces.some((f) => filters.forces.has(f));
        if (!hasMatch) return false;
      }

      // v20.5 — Risques (au moins un match)
      if (filters.risks.size > 0) {
        const cRisks = asStringArray(c.risks);
        const hasMatch = cRisks.some((r) => filters.risks.has(r));
        if (!hasMatch) return false;
      }

      // v20.5 — Date entretien (candidats entretenus il y a ≤ N jours)
      if (filters.interviewSince > 0 && c.date) {
        const days = Math.floor((Date.now() - new Date(c.date).getTime()) / (1000 * 60 * 60 * 24));
        if (days > filters.interviewSince) return false;
      }

      // v20.5 — Date update (dernière modif ≤ N jours)
      if (filters.updatedSince > 0) {
        const days = Math.floor((Date.now() - new Date(c.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
        if (days > filters.updatedSince) return false;
      }

      // v20.5 — Shortlist only
      if (filters.onlyShortlist && !shortlist.has(c.id)) return false;

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
  }, [candidates, filters, sort, shortlist]);

  // Stats dashboard
  const stats = useMemo(() => {
    const total = candidates.length;
    const evaluated = candidates.filter((c) => c.filled >= 1).length;
    const priorities = candidates.filter((c) => c.verdictLevel === "top").length;
    const secondaries = candidates.filter((c) => c.verdictLevel === "mid").length;
    const noRetained = candidates.filter((c) => c.verdictLevel === "low").length;
    const incompletes = candidates.filter((c) => c.verdictLevel === "nc").length;
    const sumPct = candidates.reduce((s, c) => s + c.pct, 0);
    const avgPct = evaluated > 0 ? Math.round(sumPct / evaluated) : 0;
    const favorites = shortlist.size;

    // Distribution qualif profile
    const qualifDist: Record<string, number> = { Généraliste: 0, Sales: 0, IT: 0 };
    candidates.forEach((c) => {
      if (c.qualifProfile && c.qualifProfile in qualifDist) qualifDist[c.qualifProfile]++;
    });

    // Top langues
    const langCount: Record<string, number> = {};
    candidates.forEach((c) => {
      const langs = (Array.isArray(c.languagesSpoken) ? c.languagesSpoken : []) as Array<{ lang: string; level: string }>;
      langs.forEach((l) => {
        langCount[l.lang] = (langCount[l.lang] || 0) + 1;
      });
    });
    const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { total, evaluated, priorities, secondaries, noRetained, incompletes, avgPct, favorites, qualifDist, topLangs };
  }, [candidates, shortlist]);

  // Collecter forces/risques uniques pour proposer en filtres
  const allForces = useMemo(() => {
    const s = new Set<string>();
    candidates.forEach((c) => asStringArray(c.forces).forEach((f) => s.add(f)));
    return Array.from(s).sort();
  }, [candidates]);

  const allRisks = useMemo(() => {
    const s = new Set<string>();
    candidates.forEach((c) => asStringArray(c.risks).forEach((r) => s.add(r)));
    return Array.from(s).sort();
  }, [candidates]);

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
    // v20.5
    count += filters.forces.size + filters.risks.size;
    if (filters.interviewSince > 0) count++;
    if (filters.updatedSince > 0) count++;
    if (filters.onlyShortlist) count++;
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
    <div className="space-y-5">
      {/* ═══ STATS DASHBOARD ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard label="Total" value={stats.total} sub="en base" color="gray" icon={<Users className="w-4 h-4" />} />
        <StatCard
          label="Évalués"
          value={stats.evaluated}
          sub={`${Math.round((stats.evaluated / Math.max(1, stats.total)) * 100)}%`}
          color="blue"
          icon={<CheckCircle2 className="w-4 h-4" />}
        />
        <StatCard label="Score moyen" value={`${stats.avgPct}%`} sub="sur évalués" color="teal" icon={<Sparkles className="w-4 h-4" />} />
        <StatCard label="Prioritaires" value={stats.priorities} sub="≥80%" color="emerald" icon={<Star className="w-4 h-4" />} />
        <StatCard label="Favoris" value={stats.favorites} sub="shortlist" color="amber" icon={<Star className="w-4 h-4 fill-current" />} />
        <StatCard
          label="Qualif"
          value={Object.values(stats.qualifDist).reduce((a, b) => a + b, 0)}
          sub={`S:${stats.qualifDist.Sales} · IT:${stats.qualifDist.IT} · G:${stats.qualifDist["Généraliste"]}`}
          color="purple"
          icon={<Compass className="w-4 h-4" />}
        />
      </div>

      {/* ═══ PRESETS RAPIDES ═══ */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-600">
            Recherches rapides
          </span>
          <span className="text-[10px] text-gray-400">· clic pour activer / désactiver</span>
          <button
            type="button"
            onClick={() => setShowShortcuts((v) => !v)}
            className="ml-auto text-[10px] text-gray-500 hover:text-rocket-teal flex items-center gap-1"
            title="Raccourcis clavier"
          >
            <Keyboard className="w-3 h-3" />
            Raccourcis
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PRESETS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`text-[12px] px-3 py-1.5 rounded-full border-2 transition-all font-medium ${
                  isActive
                    ? "bg-gradient-to-br from-rocket-teal to-rocket-teal/90 border-rocket-teal text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-rocket-teal/50 hover:bg-rocket-teal/5"
                }`}
              >
                <span className="mr-1">{preset.emoji}</span>
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ SHORTCUTS OVERLAY ═══ */}
      {showShortcuts && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Keyboard className="w-4 h-4" />
            <span className="text-[13px] font-semibold">Raccourcis clavier</span>
            <button onClick={() => setShowShortcuts(false)} className="ml-auto text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
            <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono">/</kbd> Focus recherche</div>
            <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono">Esc</kbd> Reset filtres</div>
            <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono">c</kbd> Mode comparaison</div>
            <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono">v</kbd> Toggle vue</div>
            <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono">?</kbd> Cette popup</div>
          </div>
        </div>
      )}

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
                ref={searchInputRef}
                type="text"
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                placeholder="Nom, email, résumé, notes... (/ pour focus)"
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

          {/* FORCES détectées */}
          {allForces.length > 0 && (
            <FilterGroup
              title="Forces détectées"
              icon={<CheckCircle2 className="w-3 h-3" />}
              badge={filters.forces.size}
              defaultOpen={false}
            >
              <div className="flex flex-wrap gap-1">
                {allForces.map((f) => (
                  <ChipButton
                    key={f}
                    active={filters.forces.has(f)}
                    onClick={() => toggleSetValue("forces", f)}
                    color="emerald"
                  >
                    {f}
                  </ChipButton>
                ))}
              </div>
            </FilterGroup>
          )}

          {/* ALERTES détectées */}
          {allRisks.length > 0 && (
            <FilterGroup
              title="Alertes détectées"
              icon={<AlertTriangle className="w-3 h-3" />}
              badge={filters.risks.size}
              defaultOpen={false}
            >
              <div className="flex flex-wrap gap-1">
                {allRisks.map((r) => (
                  <ChipButton
                    key={r}
                    active={filters.risks.has(r)}
                    onClick={() => toggleSetValue("risks", r)}
                    color="pink"
                  >
                    {r}
                  </ChipButton>
                ))}
              </div>
            </FilterGroup>
          )}

          {/* DATES */}
          <FilterGroup
            title="Dates"
            icon={<Calendar className="w-3 h-3" />}
            badge={(filters.interviewSince > 0 ? 1 : 0) + (filters.updatedSince > 0 ? 1 : 0)}
            defaultOpen={false}
          >
            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Entretien il y a ≤</div>
                <div className="flex gap-1 flex-wrap">
                  {[0, 7, 30, 90, 180].map((d) => (
                    <ChipButton
                      key={d}
                      active={filters.interviewSince === d && d > 0}
                      onClick={() => updateFilter("interviewSince", filters.interviewSince === d ? 0 : d)}
                      color="blue"
                    >
                      {d === 0 ? "Tous" : d === 7 ? "1 sem" : d === 30 ? "1 mois" : d === 90 ? "3 mois" : "6 mois"}
                    </ChipButton>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Modifié il y a ≤</div>
                <div className="flex gap-1 flex-wrap">
                  {[0, 7, 30, 90].map((d) => (
                    <ChipButton
                      key={d}
                      active={filters.updatedSince === d && d > 0}
                      onClick={() => updateFilter("updatedSince", filters.updatedSince === d ? 0 : d)}
                      color="blue"
                    >
                      {d === 0 ? "Tous" : d === 7 ? "1 sem" : d === 30 ? "1 mois" : "3 mois"}
                    </ChipButton>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 text-[11px] text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onlyShortlist}
                  onChange={(e) => updateFilter("onlyShortlist", e.target.checked)}
                  className="accent-rocket-teal"
                />
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                Uniquement les favoris
              </label>
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

          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {/* Toggle vue Cards / Table */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setView("cards")}
                title="Vue cards"
                className={`p-1.5 rounded transition-all ${view === "cards" ? "bg-white shadow-sm text-rocket-teal" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setView("table")}
                title="Vue tableau"
                className={`p-1.5 rounded transition-all ${view === "table" ? "bg-white shadow-sm text-rocket-teal" : "text-gray-400 hover:text-gray-600"}`}
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toggle mode comparaison */}
            <button
              type="button"
              onClick={() => setCompareMode((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                compareMode
                  ? "border-rocket-teal bg-rocket-teal/10 text-rocket-teal"
                  : "border-gray-200 text-gray-600 hover:border-rocket-teal hover:text-rocket-teal"
              }`}
              title="Comparer 2-4 candidats (c)"
            >
              <GitCompare className="w-3.5 h-3.5" />
              Comparer
            </button>

            <label className="text-[11px] text-gray-500">Tri :</label>
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
        ) : view === "cards" ? (
          <div className="space-y-2.5">
            {filtered.map((c, idx) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                rank={idx + 1}
                isFavorite={shortlist.has(c.id)}
                onToggleFavorite={() => toggleShortlist(c.id)}
                compareMode={compareMode}
                isSelected={compareIds.has(c.id)}
                onToggleCompare={() => toggleCompareId(c.id)}
              />
            ))}
          </div>
        ) : (
          <CompactTable
            candidates={filtered}
            shortlist={shortlist}
            onToggleShortlist={toggleShortlist}
            compareMode={compareMode}
            compareIds={compareIds}
            onToggleCompare={toggleCompareId}
          />
        )}
      </main>
      </div>

      {/* Footer flottant pour mode comparaison */}
      {compareMode && compareIds.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 z-30 border border-white/10">
          <GitCompare className="w-4 h-4 text-rocket-teal" />
          <span className="text-[12px] font-medium">
            {compareIds.size} candidat{compareIds.size > 1 ? "s" : ""} sélectionné{compareIds.size > 1 ? "s" : ""}
            <span className="text-gray-400 ml-1">(max 4)</span>
          </span>
          <button
            type="button"
            onClick={() => setShowCompare(true)}
            disabled={compareIds.size < 2}
            className="px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-rocket-teal hover:bg-rocket-teal/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Comparer →
          </button>
          <button
            type="button"
            onClick={() => setCompareIds(new Set())}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Modal comparaison */}
      {showCompare && compareIds.size >= 2 && (
        <ComparisonModal
          candidates={candidates.filter((c) => compareIds.has(c.id))}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   StatCard — bloc statistique du dashboard
   ═══════════════════════════════════════════════════════════════════════ */
function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: "gray" | "blue" | "teal" | "emerald" | "amber" | "purple";
  icon?: React.ReactNode;
}) {
  const colorCls: Record<string, string> = {
    gray: "bg-gray-50 text-gray-600 border-gray-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    teal: "bg-rocket-teal/10 text-rocket-teal border-rocket-teal/20",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-1.5">
        {icon && (
          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${colorCls[color]}`}>
            {icon}
          </div>
        )}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[22px] font-bold font-mono tabular-nums text-gray-900">{value}</span>
      </div>
      {sub && <div className="text-[10px] text-gray-400 mt-0.5 truncate">{sub}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Carte candidat individuelle (avec star favoris + checkbox compare)
   ═══════════════════════════════════════════════════════════════════════ */
function CandidateCard({
  candidate: c,
  rank,
  isFavorite,
  onToggleFavorite,
  compareMode,
  isSelected,
  onToggleCompare,
}: {
  candidate: EnrichedCandidate;
  rank: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  compareMode: boolean;
  isSelected: boolean;
  onToggleCompare: () => void;
}) {
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

  const cardCls = `relative block bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group ${
    isSelected ? "border-rocket-teal ring-2 ring-rocket-teal/20" : "border-gray-200/80 hover:border-rocket-teal/30"
  }`;

  const content = (
    <>
      <div className="flex items-start gap-4">
        {/* Checkbox compare (mode actif) */}
        {compareMode && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare();
            }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
              isSelected
                ? "bg-rocket-teal border-rocket-teal text-white"
                : "bg-white border-gray-300 hover:border-rocket-teal"
            }`}
            title="Cocher pour comparer"
          >
            {isSelected && <CheckCircle2 className="w-3 h-3" />}
          </button>
        )}

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

      {/* Bouton favori (top-right absolue) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all ${
          isFavorite
            ? "text-amber-500 hover:bg-amber-50"
            : "text-gray-300 hover:text-amber-500 hover:bg-amber-50 opacity-0 group-hover:opacity-100"
        }`}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Star className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>
    </>
  );

  // En mode compare, la carte toggle la sélection ; sinon ouvre le candidat
  if (compareMode) {
    return (
      <div
        onClick={onToggleCompare}
        className={`${cardCls} cursor-pointer`}
      >
        {content}
      </div>
    );
  }
  return (
    <Link href={`/webapp-testing/candidat/${c.id}`} className={cardCls}>
      {content}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Vue tableau compacte (alternative aux cards)
   ═══════════════════════════════════════════════════════════════════════ */
function CompactTable({
  candidates,
  shortlist,
  onToggleShortlist,
  compareMode,
  compareIds,
  onToggleCompare,
}: {
  candidates: EnrichedCandidate[];
  shortlist: Set<string>;
  onToggleShortlist: (id: string) => void;
  compareMode: boolean;
  compareIds: Set<string>;
  onToggleCompare: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-2 py-2.5 text-center w-8">{compareMode ? "✓" : "★"}</th>
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-2 py-2.5 text-center w-10">#</th>
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 text-left">Candidat</th>
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 text-left">Qualif</th>
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 text-left">TJM</th>
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 text-center w-20">Score</th>
              {SCORING_VISIBLE_ORDER.map((idx, disp) => (
                <th
                  key={idx}
                  className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 px-1 py-2.5 text-center w-8"
                  title={CRITERIA[idx].name}
                >
                  {String(disp + 1).padStart(2, "0")}
                </th>
              ))}
              <th className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 text-left">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, idx) => {
              const scores = (c.scores as Record<string, number>) || {};
              const isFav = shortlist.has(c.id);
              const isSel = compareIds.has(c.id);
              return (
                <tr
                  key={c.id}
                  className={`border-b border-gray-100 last:border-b-0 transition-colors ${
                    isSel ? "bg-rocket-teal/5" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-2 py-2 text-center">
                    {compareMode ? (
                      <button
                        type="button"
                        onClick={() => onToggleCompare(c.id)}
                        className={`w-4 h-4 rounded border-2 inline-flex items-center justify-center transition-colors ${
                          isSel ? "bg-rocket-teal border-rocket-teal text-white" : "border-gray-300 hover:border-rocket-teal"
                        }`}
                      >
                        {isSel && <CheckCircle2 className="w-2.5 h-2.5" />}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onToggleShortlist(c.id)}
                        className={`p-1 rounded transition-colors ${isFav ? "text-amber-500" : "text-gray-300 hover:text-amber-500"}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
                      </button>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center text-[11px] text-gray-500 font-mono">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <Link href={`/webapp-testing/candidat/${c.id}`} className="hover:text-rocket-teal transition-colors">
                      <div className="text-[12px] font-medium truncate max-w-[200px]">
                        {c.prenom} {c.nom}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[200px]">{c.loc || "—"}</div>
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-[11px]">
                    {c.qualifProfile ? (
                      <span className="text-purple-700">
                        {c.qualifProfile}
                        {c.qualifLevel && <span className="text-gray-400"> · {c.qualifLevel.split(" ")[0]}</span>}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-gray-700 font-mono">{c.tjm || "—"}</td>
                  <td className="px-3 py-2 text-center">
                    <div className="text-[13px] font-bold text-rocket-teal font-mono">{c.pct}%</div>
                    <div className="text-[9px] text-gray-400">{c.filled}/{CRITERIA.length}</div>
                  </td>
                  {SCORING_VISIBLE_ORDER.map((critIdx) => {
                    const s = scores[`c${critIdx}`] || 0;
                    const bg = s > 0 ? SCORE_COLORS[s - 1] : "#f3f4f6";
                    const color = s >= 4 ? "#fff" : s > 0 ? "#444" : "#ccc";
                    return (
                      <td key={critIdx} className="px-1 py-2 text-center">
                        <div
                          className="w-5 h-5 rounded inline-flex items-center justify-center text-[9px] font-mono font-bold"
                          style={{ background: bg, color }}
                        >
                          {s || "·"}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2">
                    <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Modal de comparaison — côte à côte 2-4 candidats
   ═══════════════════════════════════════════════════════════════════════ */
function ComparisonModal({
  candidates,
  onClose,
}: {
  candidates: EnrichedCandidate[];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-[1400px] w-full max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-9 h-9 rounded-xl bg-rocket-teal/10 text-rocket-teal flex items-center justify-center">
            <GitCompare className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h2 className="text-[15px] font-semibold text-gray-900">Comparaison de {candidates.length} candidats</h2>
            <p className="text-[11px] text-gray-500">Identifiez les forces et différences critère par critère</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          <div className={`grid gap-3`} style={{ gridTemplateColumns: `180px repeat(${candidates.length}, minmax(200px, 1fr))` }}>
            {/* Ligne : identité */}
            <ComparisonRow label="Nom" />
            {candidates.map((c) => (
              <div key={c.id} className="bg-gradient-to-br from-rocket-teal/5 to-transparent border border-rocket-teal/20 rounded-xl p-3">
                <div className="text-[13px] font-semibold text-gray-900">{c.prenom} {c.nom}</div>
                {c.loc && <div className="text-[10px] text-gray-500 mt-0.5">📍 {c.loc}</div>}
              </div>
            ))}

            <ComparisonRow label="Score global" />
            {candidates.map((c) => (
              <div key={c.id} className="flex items-center gap-2 p-2 border border-gray-100 rounded-lg">
                <div className="text-[24px] font-bold font-mono text-rocket-teal tabular-nums">{c.pct}%</div>
                <div>
                  <VerdictBadge level={c.verdictLevel} label={c.verdictLabel} />
                  <div className="text-[10px] text-gray-400 mt-0.5">{c.filled}/{CRITERIA.length}</div>
                </div>
              </div>
            ))}

            <ComparisonRow label="Qualification" />
            {candidates.map((c) => (
              <div key={c.id} className="p-2 border border-gray-100 rounded-lg text-[12px]">
                {c.qualifProfile ? (
                  <>
                    <div className="font-medium text-purple-700">{c.qualifProfile}</div>
                    {c.qualifLevel && <div className="text-[11px] text-gray-600 mt-0.5">{c.qualifLevel}</div>}
                    {Array.isArray(c.qualifRecruitedTypes) && c.qualifRecruitedTypes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {(c.qualifRecruitedTypes as string[]).slice(0, 4).map((t, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">{t}</span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </div>
            ))}

            <ComparisonRow label="TJM / Contrat" />
            {candidates.map((c) => (
              <div key={c.id} className="p-2 border border-gray-100 rounded-lg text-[12px]">
                <div className="font-medium">{c.tjm || <span className="text-gray-300">—</span>}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {c.openCddCdi === true && <span className="text-emerald-600">✓ CDI ok</span>}
                  {c.openCddCdi === false && <span className="text-gray-500">✗ Freelance only</span>}
                  {c.openCddCdi === null && <span className="text-gray-300">—</span>}
                </div>
              </div>
            ))}

            {/* Évaluation humaine */}
            <ComparisonRow label="Intelligence" />
            {candidates.map((c) => (
              <LevelCell key={c.id} level={c.intelligenceLevel} />
            ))}

            <ComparisonRow label="Motivation" />
            {candidates.map((c) => (
              <LevelCell key={c.id} level={c.motivationLevel} />
            ))}

            <ComparisonRow label="Sympathie" />
            {candidates.map((c) => (
              <LevelCell key={c.id} level={c.sympathyLevel} />
            ))}

            {/* Langues */}
            <ComparisonRow label="Langues" />
            {candidates.map((c) => {
              const langs = (Array.isArray(c.languagesSpoken) ? c.languagesSpoken : []) as Array<{ lang: string; level: string }>;
              return (
                <div key={c.id} className="p-2 border border-gray-100 rounded-lg text-[11px]">
                  {langs.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {langs.map((l, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 text-[10px]">
                          {l.lang}
                          {l.level && <span className="text-sky-400 ml-0.5">· {l.level.split(" ")[0]}</span>}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
              );
            })}

            {/* Scoring par critère */}
            {SCORING_VISIBLE_ORDER.map((critIdx) => {
              const crit = CRITERIA[critIdx];
              return (
                <React.Fragment key={critIdx}>
                  <ComparisonRow label={crit.name} small />
                  {candidates.map((c) => {
                    const scores = (c.scores as Record<string, number>) || {};
                    const s = scores[`c${critIdx}`] || 0;
                    const bg = s > 0 ? SCORE_COLORS[s - 1] : "#f3f4f6";
                    const color = s >= 4 ? "#fff" : s > 0 ? "#444" : "#ccc";
                    return (
                      <div key={c.id} className="p-2 border border-gray-100 rounded-lg flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono font-bold"
                          style={{ background: bg, color }}
                        >
                          {s || "·"}
                        </div>
                        <span className="text-[11px] text-gray-500">/5</span>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}

            {/* Forces / Alertes */}
            <ComparisonRow label="Forces" />
            {candidates.map((c) => {
              const f = asStringArray(c.forces);
              return (
                <div key={c.id} className="p-2 border border-gray-100 rounded-lg text-[10px]">
                  {f.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {f.map((x, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {x}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
              );
            })}

            <ComparisonRow label="Alertes" />
            {candidates.map((c) => {
              const r = asStringArray(c.risks);
              return (
                <div key={c.id} className="p-2 border border-gray-100 rounded-lg text-[10px]">
                  {r.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {r.map((x, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                          {x}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center gap-2">
          <div className="text-[11px] text-gray-500">
            Clique en dehors ou sur <kbd className="bg-white border px-1.5 py-0.5 rounded font-mono text-[10px]">Esc</kbd> pour fermer
          </div>
          <div className="ml-auto flex gap-2">
            {candidates.map((c) => (
              <Link
                key={c.id}
                href={`/webapp-testing/candidat/${c.id}`}
                className="text-[11px] px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:border-rocket-teal hover:text-rocket-teal transition-colors"
              >
                Ouvrir {c.prenom} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonRow({ label, small = false }: { label: string; small?: boolean }) {
  return (
    <div className={`flex items-center font-medium text-gray-600 border-r border-gray-100 pr-3 ${small ? "text-[11px]" : "text-[12px]"}`}>
      {label}
    </div>
  );
}

function LevelCell({ level }: { level?: string | null }) {
  if (!level) {
    return <div className="p-2 border border-gray-100 rounded-lg text-[11px] text-gray-300">—</div>;
  }
  const bg =
    level === "Exceptionnel"
      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
      : level === "Fort"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : level === "Moyen"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-red-50 text-red-700 border-red-200";
  return (
    <div className="p-2 border border-gray-100 rounded-lg">
      <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${bg}`}>{level}</span>
    </div>
  );
}

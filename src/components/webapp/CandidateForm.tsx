"use client";

import { useState, useTransition, useEffect, useMemo, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  CRITERIA,
  NB_CRIT,
  SCORE_COLORS,
  INTELLIGENCE_TYPES_PRESETS,
  MOTIVATION_TYPES_PRESETS,
  SYMPATHY_TYPES_PRESETS,
  LEVEL_PRESETS,
  SCORING_VISIBLE_ORDER,
  QUALIF_PROFILES,
  QUALIF_LEVELS,
  QUALIF_RECRUITED_TYPES,
  QUALIF_CONTEXT_BY_PROFILE,
  calcScore,
  getVerdict,
  autoScore,
  exportScoringText,
  type AutoScoreDetails,
} from "@/lib/r4rpo-constants";
import { createCandidate, updateCandidate, deleteCandidate } from "@/lib/candidates";
import type { Candidate } from "@prisma/client";

interface CandidateFormProps {
  candidate?: Candidate | null;
}

const MIN_CHARS = 150;
const LS_KEY = "r4rpo_last_resume_v1";

export function CandidateForm({ candidate }: CandidateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEdit = !!candidate;

  // Form state
  const [prenom, setPrenom] = useState(candidate?.prenom || "");
  const [nom, setNom] = useState(candidate?.nom || "");
  const [email, setEmail] = useState(candidate?.email || "");
  const [phone, setPhone] = useState(candidate?.phone || "");
  const [linkedin, setLinkedin] = useState(candidate?.linkedin || "");
  const [date, setDate] = useState(candidate?.date ? new Date(candidate.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
  const [loc, setLoc] = useState(candidate?.loc || "");
  const [tjm, setTjm] = useState(candidate?.tjm || "");
  const [notes, setNotes] = useState(candidate?.notes || "");
  const [resumeText, setResumeText] = useState(candidate?.resumeText || "");

  // v18 — Ouverture CDD/CDI
  const candidateWithV18 = candidate as (Candidate & {
    openCddCdi?: boolean | null;
    qualifProfile?: string | null;
    qualifLevel?: string | null;
    qualifRecruitedTypes?: string[] | null;
    qualifContext?: Record<string, string[]> | null;
    intelligenceLevel?: string | null;
    motivationTypes?: string[] | null;
    motivationLevel?: string | null;
    sympathyTypes?: string[] | null;
    sympathyLevel?: string | null;
  }) | null | undefined;
  const [openCddCdi, setOpenCddCdi] = useState<boolean | null>(
    candidateWithV18?.openCddCdi ?? null
  );

  // v18 — Chemin de qualification (étapes 1-3)
  const [qualifProfile, setQualifProfile] = useState<string>(candidateWithV18?.qualifProfile || "");
  const [qualifLevel, setQualifLevel] = useState<string>(candidateWithV18?.qualifLevel || "");
  const [qualifRecruitedTypes, setQualifRecruitedTypes] = useState<Set<string>>(
    () => new Set(candidateWithV18?.qualifRecruitedTypes || [])
  );
  const [qualifContext, setQualifContext] = useState<Record<string, Set<string>>>(() => {
    const stored = candidateWithV18?.qualifContext || {};
    const result: Record<string, Set<string>> = {};
    for (const [key, val] of Object.entries(stored)) {
      if (Array.isArray(val)) result[key] = new Set(val);
    }
    return result;
  });

  // v18 — Intelligence / Motivation / Sympathie avec niveau
  const [intelligenceLevel, setIntelligenceLevel] = useState<string>(candidateWithV18?.intelligenceLevel || "");
  const [motivationTypes, setMotivationTypes] = useState<Set<string>>(
    () => new Set(candidateWithV18?.motivationTypes || [])
  );
  const [motivationLevel, setMotivationLevel] = useState<string>(candidateWithV18?.motivationLevel || "");
  const [sympathyTypes, setSympathyTypes] = useState<Set<string>>(
    () => new Set(candidateWithV18?.sympathyTypes || [])
  );
  const [sympathyLevel, setSympathyLevel] = useState<string>(candidateWithV18?.sympathyLevel || "");

  // Scoring
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const sc = (candidate?.scores as Record<string, number>) || {};
    return { ...sc };
  });

  // CV
  const [hasCv, setHasCv] = useState(candidate?.hasCv || false);
  const [cvPath, setCvPath] = useState(candidate?.cvPath || "");
  const [cvUploading, setCvUploading] = useState(false);

  // Tags
  const [forces, setForces] = useState<Set<string>>(() => new Set((candidate?.forces as string[]) || []));
  const [risks, setRisks] = useState<Set<string>>(() => new Set((candidate?.risks as string[]) || []));

  // v17 — Taxonomies multi-select
  const [profileTypes, setProfileTypes] = useState<Set<string>>(
    () => new Set((candidate as { profileTypes?: string[] } | null | undefined)?.profileTypes || [])
  );
  const [companyTypes, setCompanyTypes] = useState<Set<string>>(
    () => new Set((candidate as { companyTypes?: string[] } | null | undefined)?.companyTypes || [])
  );
  const [profileStyle, setProfileStyle] = useState<Set<string>>(
    () => new Set((candidate as { profileStyle?: string[] } | null | undefined)?.profileStyle || [])
  );
  const [intelligenceTypes, setIntelligenceTypes] = useState<Set<string>>(
    () => new Set((candidate as { intelligenceTypes?: string[] } | null | undefined)?.intelligenceTypes || [])
  );

  // v16 — UX analyse
  const [skipInternational, setSkipInternational] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<AutoScoreDetails | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "ok">("idle");
  const [lsLoaded, setLsLoaded] = useState(false);

  // Persistance localStorage — restauration au mount uniquement pour "nouveau" (pas édition)
  useEffect(() => {
    if (isEdit) {
      setLsLoaded(true);
      return;
    }
    try {
      const stored = window.localStorage.getItem(LS_KEY);
      if (stored && !resumeText) {
        const parsed = JSON.parse(stored);
        if (parsed.resumeText && typeof parsed.resumeText === "string") {
          setResumeText(parsed.resumeText);
        }
      }
    } catch {
      // ignore
    }
    setLsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  // Sauvegarde localStorage (throttled via useEffect normal, updates quick)
  useEffect(() => {
    if (!lsLoaded || isEdit) return;
    if (!resumeText) {
      try {
        window.localStorage.removeItem(LS_KEY);
      } catch {}
      return;
    }
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify({ resumeText, updatedAt: Date.now() }));
    } catch {}
  }, [resumeText, lsLoaded, isEdit]);

  // Computed score — v18 : calculé uniquement sur les 8 critères visibles
  const sc = useMemo(() => {
    const visibleScores: Record<string, number> = {};
    for (const idx of SCORING_VISIBLE_ORDER) {
      const key = `c${idx}`;
      if (scores[key]) visibleScores[key] = scores[key];
    }
    return calcScore(visibleScores);
  }, [scores]);
  const verdict = getVerdict(sc.pct, sc.filled);
  const visibleCount = SCORING_VISIBLE_ORDER.length;

  const charCount = resumeText.trim().length;
  const canAnalyze = charCount >= MIN_CHARS;
  const progressPct = Math.min(100, Math.round((charCount / MIN_CHARS) * 100));

  function setScore(critIdx: number, value: number) {
    const key = `c${critIdx}`;
    setScores((prev) => {
      const next = { ...prev };
      if (next[key] === value) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  }

  function toggleForce(tag: string) {
    setForces((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function toggleRisk(tag: string) {
    setRisks((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function toggleSet(setter: Dispatch<SetStateAction<Set<string>>>) {
    return (tag: string) => {
      setter((prev) => {
        const next = new Set(prev);
        next.has(tag) ? next.delete(tag) : next.add(tag);
        return next;
      });
    };
  }
  const toggleProfileType = toggleSet(setProfileTypes);
  const toggleCompanyType = toggleSet(setCompanyTypes);
  const toggleProfileStyle = toggleSet(setProfileStyle);
  const toggleIntelligence = toggleSet(setIntelligenceTypes);

  function handleAnalyze() {
    if (!canAnalyze) return;
    const result = autoScore(resumeText, { skipInternational });

    // Merge scores — priorise l'écriture pour qu'aucune valeur résiduelle ne persiste (Fix Bug 4)
    setScores((prev) => {
      const merged = { ...prev };
      for (const [key, val] of Object.entries(result.scores)) {
        // Override seulement si l'utilisateur n'a pas manuellement défini un score
        const manual = prev[key];
        if (!manual || manual === 0) {
          if (val > 0) merged[key] = val;
          else delete merged[key];
        }
      }
      return merged;
    });

    // Merge forces (remplace — les forces sont auto-détectées)
    if (result.forces.length > 0) {
      setForces((prev) => {
        const next = new Set(prev);
        result.forces.forEach((f) => next.add(f));
        return next;
      });
    }

    // Merge risks
    if (result.risks.length > 0) {
      setRisks((prev) => {
        const next = new Set(prev);
        result.risks.forEach((r) => next.add(r));
        return next;
      });
    }

    // Auto-fill identity — n'écrase JAMAIS les champs déjà remplis
    const id = result.identity;
    if (id.email && !email.trim()) setEmail(id.email);
    if (id.phone && !phone.trim()) setPhone(id.phone);
    if (id.linkedin && !linkedin.trim()) setLinkedin(id.linkedin);
    if (id.tjm && !tjm.trim()) setTjm(id.tjm);
    if (id.loc && !loc.trim()) setLoc(id.loc);
    if (id.prenom && !prenom.trim()) setPrenom(id.prenom);
    if (id.nom && !nom.trim()) setNom(id.nom);

    // v18 — Auto-fill openCddCdi selon le contrat détecté par autoScore
    if (openCddCdi === null) {
      if (result.contrat === "CDI" || result.contrat === "CDD" || result.contrat === "Les deux") {
        setOpenCddCdi(true);
      }
      // Si "TJM Freelance" seul, on laisse null (indéterminé sans info explicite)
    }

    // v17 — Merger les 4 taxonomies (ADD sans remove, préserve les choix manuels)
    if (result.profileTypes.length > 0) {
      setProfileTypes((prev) => {
        const next = new Set(prev);
        result.profileTypes.forEach((t) => next.add(t));
        return next;
      });
    }
    if (result.companyTypes.length > 0) {
      setCompanyTypes((prev) => {
        const next = new Set(prev);
        result.companyTypes.forEach((t) => next.add(t));
        return next;
      });
    }
    if (result.profileStyle.length > 0) {
      setProfileStyle((prev) => {
        const next = new Set(prev);
        result.profileStyle.forEach((t) => next.add(t));
        return next;
      });
    }
    if (result.intelligenceTypes.length > 0) {
      setIntelligenceTypes((prev) => {
        const next = new Set(prev);
        result.intelligenceTypes.forEach((t) => next.add(t));
        return next;
      });
    }

    setLastAnalysis(result);
  }

  async function handleCopyScoring() {
    const text = exportScoringText(scores, Array.from(forces), Array.from(risks), {
      prenom,
      nom,
      email,
      phone,
      linkedin,
      loc,
      tjm,
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("ok");
      setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      // Fallback : ouvrir une alerte avec le texte
      alert(text);
    }
  }

  function handleSave() {
    if (!prenom.trim() && !nom.trim()) return;

    // Sérialiser qualifContext Set → string[]
    const contextSerialized: Record<string, string[]> = {};
    for (const [key, set] of Object.entries(qualifContext)) {
      if (set.size > 0) contextSerialized[key] = Array.from(set);
    }

    const data = {
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      phone: phone.trim(),
      linkedin: linkedin.trim(),
      date,
      tjm: tjm.trim(),
      loc: loc.trim(),
      notes: notes.trim(),
      resumeText: resumeText.trim(),
      scores,
      forces: Array.from(forces),
      risks: Array.from(risks),
      profileTypes: Array.from(profileTypes),
      companyTypes: Array.from(companyTypes),
      profileStyle: Array.from(profileStyle),
      intelligenceTypes: Array.from(intelligenceTypes),
      // v18
      openCddCdi: openCddCdi ?? undefined,
      qualifProfile: qualifProfile || undefined,
      qualifLevel: qualifLevel || undefined,
      qualifRecruitedTypes: Array.from(qualifRecruitedTypes),
      qualifContext: contextSerialized,
      intelligenceLevel: intelligenceLevel || undefined,
      motivationTypes: Array.from(motivationTypes),
      motivationLevel: motivationLevel || undefined,
      sympathyTypes: Array.from(sympathyTypes),
      sympathyLevel: sympathyLevel || undefined,
      hasCv,
      cvPath: cvPath || null,
    };

    startTransition(async () => {
      if (isEdit && candidate) {
        await updateCandidate(candidate.id, data);
      } else {
        await createCandidate(data);
        // Clean localStorage after successful creation
        try {
          window.localStorage.removeItem(LS_KEY);
        } catch {}
      }
      router.push("/webapp-testing/vivier");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!candidate || !confirm("Supprimer ce candidat ? Action irréversible.")) return;
    startTransition(async () => {
      await deleteCandidate(candidate.id);
      router.push("/webapp-testing/vivier");
      router.refresh();
    });
  }

  // Nombre de matches/non-matches pour l'affichage du panneau debug
  const debugStats = useMemo(() => {
    if (!lastAnalysis) return null;
    let totalMatched = 0;
    let totalGroups = 0;
    Object.values(lastAnalysis.matchedKeywords).forEach((v) => {
      totalMatched += v.matched.length;
      totalGroups += v.matched.length + v.missing.length;
    });
    return { totalMatched, totalGroups };
  }, [lastAnalysis]);

  const inputCls = "px-3 py-2 text-[13px] border border-gray-300 rounded-lg w-full focus:outline-none focus:border-rocket-teal transition-colors";
  const labelCls = "text-[11px] text-gray-500 font-medium";

  return (
    <div className="space-y-6">
      {/* CV Upload */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">
          CV du candidat
        </h3>
        {hasCv && cvPath ? (
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">📄</div>
            <div className="flex-1">
              <a href={cvPath} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald-700 hover:underline">
                Voir le CV
              </a>
              <p className="text-[11px] text-emerald-600/60">Fichier uploadé</p>
            </div>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cvPath }) });
                setHasCv(false);
                setCvPath("");
              }}
              className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Supprimer
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              disabled={cvUploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setCvUploading(true);
                try {
                  const fd = new FormData();
                  fd.append("file", file);
                  fd.append("candidateId", candidate?.id || "new-" + Date.now());
                  const res = await fetch("/api/upload", { method: "POST", body: fd });
                  const data = await res.json();
                  if (res.ok && data.cvPath) {
                    setCvPath(data.cvPath);
                    setHasCv(true);
                  } else {
                    alert(data.error || "Erreur upload");
                  }
                } catch { alert("Erreur de connexion"); }
                setCvUploading(false);
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rocket-teal/10 file:text-rocket-teal hover:file:bg-rocket-teal/20 file:cursor-pointer cursor-pointer disabled:opacity-50"
            />
            {cvUploading && <p className="text-xs text-gray-400 mt-1 animate-pulse">Upload en cours...</p>}
            <p className="text-[10px] text-gray-400 mt-1">PDF, DOC ou DOCX · Max 10 Mo</p>
          </div>
        )}
      </section>

      {/* Resume + Auto-scoring */}
      <section>
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Résumé d&apos;entretien
          </h3>
          <label className="flex items-center gap-1.5 text-[11px] text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={skipInternational}
              onChange={(e) => setSkipInternational(e.target.checked)}
              className="accent-rocket-teal"
            />
            Profil France-only (skip International)
          </label>
        </div>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder={"Collez ici le compte-rendu d'entretien, vos notes ou tout contexte sur le candidat...\n\nExemple : \"Jean Dupont — jean.dupont@email.com — Paris — 600 €/j. Profil senior avec 8 ans d'expérience en sourcing SaaS. Maîtrise Sales Navigator et booléen. Autonome, a géré des missions RPO chez 3 clients. TTF moyen de 25 jours. Closing efficace, a géré plusieurs contre-offres.\""}
          className={`${inputCls} min-h-[160px] resize-y font-mono text-[12px]`}
        />

        {/* Progress bar + compteur */}
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full transition-all ${canAnalyze ? "bg-rocket-teal" : "bg-amber-400"}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className={`text-[10px] font-mono tabular-nums ${canAnalyze ? "text-rocket-teal" : "text-gray-400"}`}>
            {charCount} / {MIN_CHARS}
          </span>
        </div>

        {/* Bouton analyse + aide contextuelle */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className={`inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-lg transition-all ${
              canAnalyze
                ? "bg-rocket-teal text-white hover:bg-rocket-teal/90 hover:scale-[1.02]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            ⚡ Analyser et pré-remplir le scoring
          </button>
          {!canAnalyze && charCount > 0 && (
            <span className="text-[10px] text-gray-400">
              Ajoutez {MIN_CHARS - charCount} caractère{MIN_CHARS - charCount > 1 ? "s" : ""} pour activer l&apos;analyse
            </span>
          )}
          {lastAnalysis && (
            <button
              type="button"
              onClick={() => setShowDebug((v) => !v)}
              className="text-[11px] text-gray-500 hover:text-rocket-teal underline decoration-dotted"
            >
              {showDebug ? "Masquer" : "Voir"} les mots-clés détectés
            </button>
          )}
        </div>

        {/* Résultat dernière analyse — bandeau compact */}
        {lastAnalysis && (
          <div className="mt-3 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Confiance</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      lastAnalysis.confidenceLevel === "haute"
                        ? "bg-emerald-500"
                        : lastAnalysis.confidenceLevel === "moyenne"
                        ? "bg-amber-400"
                        : "bg-red-400"
                    }`}
                  />
                  <span className="font-medium capitalize">{lastAnalysis.confidenceLevel}</span>
                  <span className="text-gray-400">({lastAnalysis.wordCount} mots)</span>
                </div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Groupes matchés</div>
                <div className="font-mono tabular-nums">
                  {debugStats?.totalMatched || 0} / {debugStats?.totalGroups || 0}
                </div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Forces détectées</div>
                <div className="font-mono tabular-nums">{lastAnalysis.forces.length} / 5</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Alertes détectées</div>
                <div className="font-mono tabular-nums">{lastAnalysis.risks.length}</div>
              </div>
            </div>
            {/* v17 — Récap des taxonomies détectées */}
            <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-3 text-[11px]">
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Contrat</div>
                <div className="font-medium">{lastAnalysis.contrat || "—"}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Profils recrutés</div>
                <div className="font-mono tabular-nums">{lastAnalysis.profileTypes.length} / 10</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Type de boîte</div>
                <div className="font-mono tabular-nums">{lastAnalysis.companyTypes.length} / 7</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Style</div>
                <div className="font-mono tabular-nums">{lastAnalysis.profileStyle.length} / 6</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider font-semibold text-[9px] mb-1">Intelligence</div>
                <div className="font-mono tabular-nums">{lastAnalysis.intelligenceTypes.length} / 5</div>
              </div>
            </div>

            {/* v17.4 — Highlights : infos extraites détaillées */}
            {(lastAnalysis.identity.age ||
              lastAnalysis.identity.yearsExperience ||
              lastAnalysis.identity.mobility ||
              lastAnalysis.identity.availability ||
              lastAnalysis.identity.tjmMax ||
              lastAnalysis.identity.languages.length > 0 ||
              lastAnalysis.identity.tools.length > 0 ||
              lastAnalysis.identity.methodologies.length > 0 ||
              lastAnalysis.identity.companies.length > 0 ||
              lastAnalysis.speakerSegmented) && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                  Highlights extraits
                </div>
                {/* Stats rapides */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {lastAnalysis.speakerSegmented && (
                    <span className="px-2 py-0.5 rounded bg-rocket-teal/10 text-rocket-teal border border-rocket-teal/30">
                      🎙 Transcription segmentée — {Math.round(lastAnalysis.recruiterRatio * 100)}% recruteur filtré
                    </span>
                  )}
                  {lastAnalysis.identity.age && (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                      🎂 {lastAnalysis.identity.age}
                    </span>
                  )}
                  {lastAnalysis.identity.yearsExperience && (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                      ⏳ {lastAnalysis.identity.yearsExperience} d&apos;expérience
                    </span>
                  )}
                  {lastAnalysis.identity.tjmMax && (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                      💶 Fourchette TJM : {lastAnalysis.identity.tjm} → {lastAnalysis.identity.tjmMax}
                    </span>
                  )}
                  {lastAnalysis.identity.mobility && (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                      🏢 {lastAnalysis.identity.mobility}
                    </span>
                  )}
                  {lastAnalysis.identity.availability && (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                      📅 Dispo : {lastAnalysis.identity.availability}
                    </span>
                  )}
                </div>
                {/* Langues */}
                {lastAnalysis.identity.languages.length > 0 && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Langues :</span>
                    <span className="ml-2 text-[11px]">
                      {lastAnalysis.identity.languages.map((l, i) => (
                        <span key={i} className="inline-block mr-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {l}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {/* Outils */}
                {lastAnalysis.identity.tools.length > 0 && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Outils ({lastAnalysis.identity.tools.length}) :</span>
                    <span className="ml-2 text-[11px]">
                      {lastAnalysis.identity.tools.slice(0, 12).map((t, i) => (
                        <span key={i} className="inline-block mr-1.5 mb-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          {t}
                        </span>
                      ))}
                      {lastAnalysis.identity.tools.length > 12 && (
                        <span className="text-gray-400">+{lastAnalysis.identity.tools.length - 12}</span>
                      )}
                    </span>
                  </div>
                )}
                {/* Méthodologies */}
                {lastAnalysis.identity.methodologies.length > 0 && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Méthodologies :</span>
                    <span className="ml-2 text-[11px]">
                      {lastAnalysis.identity.methodologies.map((m, i) => (
                        <span key={i} className="inline-block mr-1.5 mb-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          {m}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {/* Entreprises mentionnées */}
                {lastAnalysis.identity.companies.length > 0 && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Entreprises mentionnées ({lastAnalysis.identity.companies.length}) :</span>
                    <span className="ml-2 text-[11px]">
                      {lastAnalysis.identity.companies.slice(0, 10).map((c, i) => (
                        <span key={i} className="inline-block mr-1.5 mb-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {c}
                        </span>
                      ))}
                      {lastAnalysis.identity.companies.length > 10 && (
                        <span className="text-gray-400">+{lastAnalysis.identity.companies.length - 10}</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}

            {lastAnalysis.confidenceLevel === "faible" && (
              <p className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                ⚠ Résumé court — fiabilité du scoring limitée. Complétez pour un résultat plus précis.
              </p>
            )}
          </div>
        )}

        {/* Panneau debug mots-clés rétractable */}
        {lastAnalysis && showDebug && (
          <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4 max-h-[360px] overflow-y-auto">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Détection mot-clés par critère
            </h4>
            <div className="space-y-2.5">
              {CRITERIA.map((crit, i) => {
                const km = lastAnalysis.matchedKeywords[`c${i}`];
                if (!km) return null;
                const score = lastAnalysis.scores[`c${i}`] || 0;
                const isSkipped = skipInternational && i === 3;
                return (
                  <div key={i} className="text-[11px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-700">{crit.name}</span>
                      {isSkipped ? (
                        <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Skipped</span>
                      ) : (
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: score > 0 ? SCORE_COLORS[score - 1] : "#f3f4f6",
                            color: score >= 4 ? "#fff" : "#444",
                          }}
                        >
                          {score}/5
                        </span>
                      )}
                    </div>
                    {!isSkipped && (
                      <div className="flex flex-wrap gap-1">
                        {km.matched.map((kw, j) => (
                          <span
                            key={`m-${j}`}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200"
                          >
                            ✓ {kw}
                          </span>
                        ))}
                        {km.missing.map((kw, j) => (
                          <span
                            key={`miss-${j}`}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-400 border border-gray-200 line-through"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Identity */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">Identité</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Prénom <span className="text-red-500">*</span></label>
            <input value={prenom} onChange={(e) => setPrenom(e.target.value)} className={inputCls} placeholder="Prénom" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Nom <span className="text-red-500">*</span></label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} className={inputCls} placeholder="Nom" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} placeholder="email@exemple.com" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Téléphone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className={inputCls} placeholder="+33 6 ..." />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className={labelCls}>LinkedIn</label>
            <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className={inputCls} placeholder="linkedin.com/in/..." />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Date entretien</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Localisation</label>
            <input value={loc} onChange={(e) => setLoc(e.target.value)} className={inputCls} placeholder="Paris, Lyon..." />
          </div>
        </div>
      </section>

      {/* v18 — Ouvert CDD/CDI + TJM */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">
          Contrat & rémunération
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Ouvert à un CDD / CDI ?</label>
            <div className="flex gap-1.5">
              {[
                { label: "Oui", value: true },
                { label: "Non", value: false },
                { label: "—", value: null },
              ].map((opt) => {
                const isActive = openCddCdi === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => setOpenCddCdi(opt.value)}
                    className={`flex-1 px-3 py-2 text-[13px] font-medium rounded-lg border transition-colors ${
                      isActive
                        ? opt.value === true
                          ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                          : opt.value === false
                          ? "bg-red-50 border-red-300 text-red-700"
                          : "bg-gray-100 border-gray-300 text-gray-600"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>TJM / Salaire</label>
            <input value={tjm} onChange={(e) => setTjm(e.target.value)} className={inputCls} placeholder="ex: 600 €/j" />
          </div>
        </div>
      </section>

      {/* v18 — Chemin de qualification (arbre pieuvre : profil → niveau + types → précisions) */}
      <section>
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Qualification du candidat
            <span className="ml-2 font-normal text-gray-400 normal-case tracking-normal">
              · à remplir pendant la visio
            </span>
          </h3>
          {qualifProfile && (
            <span className="text-[11px] text-rocket-teal font-medium">
              {qualifProfile}
              {qualifLevel && ` · ${qualifLevel}`}
              {qualifRecruitedTypes.size > 0 && ` · ${qualifRecruitedTypes.size} type${qualifRecruitedTypes.size > 1 ? "s" : ""}`}
            </span>
          )}
        </div>

        {/* Étape 1 : Type de profil */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            1. Type de profil
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {QUALIF_PROFILES.map((profile) => {
              const isActive = qualifProfile === profile;
              return (
                <button
                  key={profile}
                  type="button"
                  onClick={() => {
                    if (isActive) {
                      // Désélectionner : reset tout l'arbre
                      setQualifProfile("");
                      setQualifLevel("");
                      setQualifRecruitedTypes(new Set());
                      setQualifContext({});
                    } else {
                      setQualifProfile(profile);
                      // Reset l'étape 2 et 3 quand on change de profil
                      setQualifRecruitedTypes(new Set());
                      setQualifContext({});
                    }
                  }}
                  className={`px-3 py-2.5 text-[13px] font-medium rounded-lg border transition-colors ${
                    isActive
                      ? "bg-rocket-teal/10 border-rocket-teal text-rocket-teal"
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {profile}
                </button>
              );
            })}
          </div>
        </div>

        {/* Étape 2 : Niveau + Types recrutés (affiché si étape 1 sélectionnée) */}
        {qualifProfile && (
          <div className="mb-4 space-y-3 pl-4 border-l-2 border-rocket-teal/30">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                2a. Niveau d&apos;expertise
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
                {QUALIF_LEVELS.map((level) => {
                  const isActive = qualifLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setQualifLevel(isActive ? "" : level)}
                      className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                        isActive
                          ? "bg-rocket-teal/10 border-rocket-teal text-rocket-teal"
                          : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                2b. Profils qu&apos;il a chassés (multi-select)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUALIF_RECRUITED_TYPES[qualifProfile as keyof typeof QUALIF_RECRUITED_TYPES]?.map((t) => {
                  const isActive = qualifRecruitedTypes.has(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setQualifRecruitedTypes((prev) => {
                          const next = new Set(prev);
                          next.has(t) ? next.delete(t) : next.add(t);
                          return next;
                        });
                      }}
                      className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                        isActive
                          ? "bg-blue-50 border-blue-400 text-blue-700 font-medium"
                          : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Étape 3 : Précisions contextuelles (affiché si étape 1 sélectionnée) */}
        {qualifProfile && (
          <div className="space-y-3 pl-4 border-l-2 border-rocket-teal/30">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              3. Précisions contextuelles
            </div>
            {QUALIF_CONTEXT_BY_PROFILE[qualifProfile as keyof typeof QUALIF_CONTEXT_BY_PROFILE]?.map((group) => (
              <div key={group.title}>
                <div className="text-[11px] text-gray-600 mb-1.5">{group.title}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.options.map((opt) => {
                    const setForGroup = qualifContext[group.title] || new Set<string>();
                    const isActive = setForGroup.has(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setQualifContext((prev) => {
                            const prevSet = prev[group.title] || new Set<string>();
                            const nextSet = new Set(prevSet);
                            nextSet.has(opt) ? nextSet.delete(opt) : nextSet.add(opt);
                            return { ...prev, [group.title]: nextSet };
                          });
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                          isActive
                            ? "bg-purple-50 border-purple-400 text-purple-700"
                            : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

{/* v18 : les 4 taxonomies (profileTypes, companyTypes, profileStyle) sont
          auto-détectées et persistées en DB, mais plus affichées dans le form.
          intelligenceTypes reste utilisé dans la section Intelligence ci-dessus. */}

      {/* Scoring */}
      <section>
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Scoring — <span className="font-normal text-gray-400">Cliquer une note 1→5 · recliquer pour effacer</span>
          </h3>
          <button
            type="button"
            onClick={handleCopyScoring}
            disabled={sc.filled === 0}
            className={`text-[11px] font-semibold px-3 py-1 rounded-md border transition-colors ${
              sc.filled === 0
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : copyStatus === "ok"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-gray-300 text-gray-600 hover:border-rocket-teal hover:text-rocket-teal"
            }`}
          >
            {copyStatus === "ok" ? "✓ Copié !" : "📋 Copier le scoring"}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {SCORING_VISIBLE_ORDER.map((critIdx, displayIdx) => {
            const crit = CRITERIA[critIdx];
            const currentScore = scores[`c${critIdx}`] || 0;
            return (
              <div
                key={critIdx}
                className="flex items-start gap-3 px-3 py-2.5 border rounded-lg transition-colors border-gray-200 bg-white hover:border-gray-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium flex items-center gap-1.5">
                    <span className="text-gray-300 font-mono tabular-nums text-[10px]">
                      {String(displayIdx + 1).padStart(2, "0")}
                    </span>
                    {crit.name}
                    {currentScore >= 4 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">
                        Top
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                    <span className="font-semibold text-gray-600">Pour un 5/5 : </span>
                    {crit.desc}
                  </div>
                </div>
                <div className="flex gap-0.5 flex-shrink-0 items-center">
                  {[1, 2, 3, 4, 5].map((v) => {
                    const isActive = currentScore >= v;
                    const bg = isActive ? SCORE_COLORS[v - 1] : "white";
                    const color = isActive && v >= 4 ? "#fff" : isActive ? "#444" : "#888";
                    return (
                      <button
                        key={v}
                        onClick={() => setScore(critIdx, v)}
                        className="w-[28px] h-[28px] rounded-md border text-[12px] font-mono flex items-center justify-center transition-all hover:border-rocket-teal hover:text-rocket-teal"
                        style={{
                          background: bg,
                          color,
                          borderColor: isActive ? (v === 5 ? "#124944" : SCORE_COLORS[v - 1]) : "#d1d5db",
                          fontWeight: isActive && v === 5 ? 600 : 400,
                        }}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Score summary — v18 : basé sur 8 critères visibles */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-2xl font-medium font-mono text-rocket-teal">
              {sc.total}<span className="text-[13px] text-gray-400">/{sc.max}</span>
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              points ({sc.filled > 0 ? `sur ${sc.filled} critère${sc.filled > 1 ? "s" : ""}` : "aucun critère noté"})
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-2xl font-medium font-mono text-blue-600">{sc.pct}%</div>
            <div className="text-[11px] text-gray-400 mt-0.5">score sur critères notés</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-2xl font-medium font-mono">{sc.filled}<span className="text-sm text-gray-400"> /{visibleCount}</span></div>
            <div className="text-[11px] text-gray-400 mt-0.5">critères évalués</div>
          </div>
        </div>

        {/* Verdict */}
        {sc.filled >= 5 && (
          <div className={`rounded-lg p-3 flex items-center gap-3 mb-4 ${
            verdict.level === "top" ? "bg-emerald-50 border border-emerald-300" :
            verdict.level === "mid" ? "bg-amber-50 border border-amber-300" :
            "bg-red-50 border border-red-300"
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              verdict.level === "top" ? "bg-emerald-600" : verdict.level === "mid" ? "bg-amber-600" : "bg-red-600"
            }`} />
            <div>
              <div className={`text-[13px] font-medium ${
                verdict.level === "top" ? "text-emerald-800" : verdict.level === "mid" ? "text-amber-800" : "text-red-700"
              }`}>{verdict.label}</div>
              <div className="text-[12px] text-gray-500 mt-0.5">{verdict.description}</div>
            </div>
          </div>
        )}
      </section>

      {/* v18 — Intelligence : type + niveau */}
      <section>
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Intelligence
            <span className="ml-2 font-normal text-gray-400 normal-case tracking-normal">
              · type(s) dominant(s) & niveau global
            </span>
          </h3>
          {intelligenceLevel && (
            <span className="text-[11px] text-rocket-teal font-medium">{intelligenceLevel}</span>
          )}
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Types (multi)</div>
            <div className="flex flex-wrap gap-1.5">
              {INTELLIGENCE_TYPES_PRESETS.map((t) => {
                const isActive = intelligenceTypes.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleIntelligence(t)}
                    className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                      isActive
                        ? "bg-amber-50 border-amber-400 text-amber-800 font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Niveau global</div>
            <div className="grid grid-cols-4 gap-1.5">
              {LEVEL_PRESETS.map((lvl) => {
                const isActive = intelligenceLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setIntelligenceLevel(isActive ? "" : lvl)}
                    className={`px-2.5 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                      isActive
                        ? lvl === "Exceptionnel"
                          ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                          : lvl === "Fort"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : lvl === "Moyen"
                          ? "bg-amber-50 border-amber-300 text-amber-700"
                          : "bg-red-50 border-red-300 text-red-700"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* v18 — Motivation : type + niveau */}
      <section>
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Motivation & posture
            <span className="ml-2 font-normal text-gray-400 normal-case tracking-normal">
              · sharp / hungry / ambition…
            </span>
          </h3>
          {motivationLevel && (
            <span className="text-[11px] text-rocket-teal font-medium">{motivationLevel}</span>
          )}
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Types (multi)</div>
            <div className="flex flex-wrap gap-1.5">
              {MOTIVATION_TYPES_PRESETS.map((t) => {
                const isActive = motivationTypes.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setMotivationTypes((prev) => {
                        const next = new Set(prev);
                        next.has(t) ? next.delete(t) : next.add(t);
                        return next;
                      })
                    }
                    className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                      isActive
                        ? "bg-purple-50 border-purple-400 text-purple-700 font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Niveau global</div>
            <div className="grid grid-cols-4 gap-1.5">
              {LEVEL_PRESETS.map((lvl) => {
                const isActive = motivationLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMotivationLevel(isActive ? "" : lvl)}
                    className={`px-2.5 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                      isActive
                        ? lvl === "Exceptionnel"
                          ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                          : lvl === "Fort"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : lvl === "Moyen"
                          ? "bg-amber-50 border-amber-300 text-amber-700"
                          : "bg-red-50 border-red-300 text-red-700"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* v18 — Sympathie : type + niveau */}
      <section>
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Sympathie & gentillesse
            <span className="ml-2 font-normal text-gray-400 normal-case tracking-normal">
              · posture humaine perçue
            </span>
          </h3>
          {sympathyLevel && (
            <span className="text-[11px] text-rocket-teal font-medium">{sympathyLevel}</span>
          )}
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Types (multi)</div>
            <div className="flex flex-wrap gap-1.5">
              {SYMPATHY_TYPES_PRESETS.map((t) => {
                const isActive = sympathyTypes.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setSympathyTypes((prev) => {
                        const next = new Set(prev);
                        next.has(t) ? next.delete(t) : next.add(t);
                        return next;
                      })
                    }
                    className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                      isActive
                        ? "bg-pink-50 border-pink-400 text-pink-700 font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Niveau global</div>
            <div className="grid grid-cols-4 gap-1.5">
              {LEVEL_PRESETS.map((lvl) => {
                const isActive = sympathyLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSympathyLevel(isActive ? "" : lvl)}
                    className={`px-2.5 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                      isActive
                        ? lvl === "Exceptionnel"
                          ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                          : lvl === "Fort"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : lvl === "Moyen"
                          ? "bg-amber-50 border-amber-300 text-amber-700"
                          : "bg-red-50 border-red-300 text-red-700"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">Notes libres</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observations, points à revalider..."
          className={`${inputCls} min-h-[80px] resize-y`}
        />
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        {isEdit && (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-4 py-2 text-[13px] font-medium rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            Supprimer
          </button>
        )}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => router.push("/webapp-testing/vivier")}
            className="px-4 py-2 text-[13px] font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={isPending || (!prenom.trim() && !nom.trim())}
            className="px-4 py-2 text-[13px] font-medium rounded-lg bg-rocket-teal text-white hover:bg-rocket-teal/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

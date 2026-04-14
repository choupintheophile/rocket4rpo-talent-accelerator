"use client";

import { useState, useTransition, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CRITERIA,
  NB_CRIT,
  FORCE_PRESETS,
  RISK_PRESETS,
  SCORE_COLORS,
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
  const [remote, setRemote] = useState(candidate?.remote || "");
  const [days, setDays] = useState(candidate?.days || "");
  const [dispo, setDispo] = useState(candidate?.dispo || "");
  const [contrat, setContrat] = useState(candidate?.contrat || "");
  const [tjm, setTjm] = useState(candidate?.tjm || "");
  const [sector, setSector] = useState(candidate?.sector || "");
  const [notes, setNotes] = useState(candidate?.notes || "");
  const [resumeText, setResumeText] = useState(candidate?.resumeText || "");

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

  // Computed score
  const sc = calcScore(scores);
  const verdict = getVerdict(sc.pct, sc.filled);

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

    const data = {
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      phone: phone.trim(),
      linkedin: linkedin.trim(),
      date,
      contrat,
      tjm: tjm.trim(),
      dispo,
      loc: loc.trim(),
      remote,
      days,
      sector: sector.trim(),
      notes: notes.trim(),
      resumeText: resumeText.trim(),
      scores,
      forces: Array.from(forces),
      risks: Array.from(risks),
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Télétravail</label>
            <select value={remote} onChange={(e) => setRemote(e.target.value)} className={inputCls}>
              <option value="">—</option>
              <option>Full remote</option>
              <option>Hybride</option>
              <option>Onsite</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Jours/semaine</label>
            <select value={days} onChange={(e) => setDays(e.target.value)} className={inputCls}>
              <option value="">—</option>
              <option>1j</option><option>2j</option><option>3j</option><option>4j</option><option>5j</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Disponibilité</label>
            <select value={dispo} onChange={(e) => setDispo(e.target.value)} className={inputCls}>
              <option value="">—</option>
              <option>Immédiate</option>
              <option>1 mois</option>
              <option>2 mois</option>
              <option>3 mois+</option>
            </select>
          </div>
        </div>
      </section>

      {/* Contract */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">Contrat</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Type</label>
            <select value={contrat} onChange={(e) => setContrat(e.target.value)} className={inputCls}>
              <option value="">—</option>
              <option>TJM Freelance</option>
              <option>CDI</option>
              <option>CDD</option>
              <option>Les deux</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>TJM / Salaire</label>
            <input value={tjm} onChange={(e) => setTjm(e.target.value)} className={inputCls} placeholder="ex: 600 €/j" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Spécialisation secteur</label>
            <input value={sector} onChange={(e) => setSector(e.target.value)} className={inputCls} placeholder="ex: SaaS, ESN, Fintech..." />
          </div>
        </div>
      </section>

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {CRITERIA.map((crit, i) => {
            const currentScore = scores[`c${i}`] || 0;
            const isIntl = i === 3;
            const isSkipped = skipInternational && isIntl;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg transition-colors ${
                  isSkipped ? "border-gray-200 bg-gray-50 opacity-60" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium truncate flex items-center gap-1.5">
                    {crit.name}
                    {isSkipped && <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">Skipped</span>}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">{crit.desc}</div>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((v) => {
                    const isActive = currentScore >= v;
                    const bg = isActive ? SCORE_COLORS[v - 1] : "white";
                    const color = isActive && v >= 4 ? "#fff" : isActive ? "#444" : "#888";
                    return (
                      <button
                        key={v}
                        onClick={() => setScore(i, v)}
                        disabled={isSkipped}
                        className="w-[26px] h-[26px] rounded-md border text-[11px] font-mono flex items-center justify-center transition-all hover:border-rocket-teal hover:text-rocket-teal disabled:cursor-not-allowed"
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

        {/* Score summary */}
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
            <div className="text-2xl font-medium font-mono">{sc.filled}<span className="text-sm text-gray-400"> /{NB_CRIT}</span></div>
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

      {/* Forces */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">
          Impression entretien — points positifs
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {FORCE_PRESETS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleForce(tag)}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                forces.has(tag)
                  ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                  : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Risks */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">
          Alertes
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {RISK_PRESETS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleRisk(tag)}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                risks.has(tag)
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
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

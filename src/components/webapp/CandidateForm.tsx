"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CRITERIA, NB_CRIT, FORCE_PRESETS, RISK_PRESETS, IMPRESSION_POSITIVES, IMPRESSION_NEGATIVES, SCORE_COLORS, calcScore, getVerdict } from "@/lib/r4rpo-constants";
import { createCandidate, updateCandidate, deleteCandidate } from "@/lib/candidates";
import type { Candidate } from "@prisma/client";

interface CandidateFormProps {
  candidate?: Candidate | null;
}

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

  // Tags
  const [forces, setForces] = useState<Set<string>>(() => new Set((candidate?.forces as string[]) || []));
  const [risks, setRisks] = useState<Set<string>>(() => new Set((candidate?.risks as string[]) || []));

  // Computed score
  const sc = calcScore(scores);
  const verdict = getVerdict(sc.pct, sc.filled);

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
    };

    startTransition(async () => {
      if (isEdit && candidate) {
        await updateCandidate(candidate.id, data);
      } else {
        await createCandidate(data);
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

  const inputCls = "px-3 py-2 text-[13px] border border-gray-300 rounded-lg w-full focus:outline-none focus:border-rocket-teal transition-colors";
  const labelCls = "text-[11px] text-gray-500 font-medium";

  return (
    <div className="space-y-6">
      {/* Resume */}
      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">
          Résumé d&apos;entretien
        </h3>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Collez ici le compte-rendu d'entretien, les notes, ou tout contexte sur le candidat..."
          className={`${inputCls} min-h-[120px] resize-y`}
        />
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
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5 pb-2 border-b border-gray-200">
          Scoring — <span className="font-normal text-gray-400">Cliquer une note 1→5 · recliquer pour effacer</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {CRITERIA.map((crit, i) => {
            const currentScore = scores[`c${i}`] || 0;
            return (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium truncate">{crit.name}</div>
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
                        className="w-[26px] h-[26px] rounded-md border text-[11px] font-mono flex items-center justify-center transition-all hover:border-rocket-teal hover:text-rocket-teal"
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
        <div className="flex flex-wrap gap-1.5 mb-2">
          {FORCE_PRESETS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleForce(tag)}
              className={`text-[12px] px-3 py-1 rounded-full border transition-colors ${
                forces.has(tag)
                  ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                  : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {IMPRESSION_POSITIVES.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleForce(tag)}
              className={`text-[12px] px-3 py-1 rounded-full border transition-colors ${
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
          Impression entretien — alertes
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {RISK_PRESETS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleRisk(tag)}
              className={`text-[12px] px-3 py-1 rounded-full border transition-colors ${
                risks.has(tag)
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {IMPRESSION_NEGATIVES.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleRisk(tag)}
              className={`text-[12px] px-3 py-1 rounded-full border transition-colors ${
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

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  Search,
  Target,
  Briefcase,
  Building2,
  Zap,
  Star,
  MessageCircle,
} from "lucide-react";

const HUBSPOT_URL = "https://meetings.hubspot.com/theophile-choupin/rpo";

type Step = "besoin" | "profil" | "rdv";

export default function RdvClient() {
  const [step, setStep] = useState<Step>("besoin");
  const [answers, setAnswers] = useState({
    postes: "",
    secteur: "",
    urgence: "",
    format: "",
  });
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  function select(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function getRecommandation() {
    const nb = parseInt(answers.postes) || 0;
    if (nb >= 10) return { format: "RPO temps plein", desc: "Avec 10+ postes, un TA dédié à temps plein est la solution la plus efficace.", tjm: "Nous consulter" };
    if (nb >= 4) return { format: "RPO temps partagé", desc: "Pour 4-9 postes, un TA 2-3 jours/semaine offre le meilleur rapport qualité-prix.", tjm: "À partir de 550€/jour" };
    if (answers.urgence === "urgent") return { format: "Mission ponctuelle", desc: "Pour un besoin urgent et ciblé, une mission courte avec un TA senior.", tjm: "Sur devis" };
    return { format: "RPO temps partagé", desc: "Un TA Specialist intégré à votre équipe 1-3 jours/semaine.", tjm: "À partir de 550€/jour" };
  }

  const reco = getRecommandation();

  return (
    <>
      <Breadcrumbs items={[{ label: "Trouver votre TA" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[140px]" />
          <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative container-wide py-14 md:py-20">
          <motion.div ref={heroRef} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
              <Users className="w-3.5 h-3.5" />
              Trouvez votre TA idéal
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]">
              Parlez-nous de vos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                besoins
              </span>
              , on trouve le{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                recruteur parfait
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/50 leading-relaxed">
              3 questions pour comprendre votre besoin, puis réservez un créneau avec un expert qui vous recommandera le TA idéal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps indicator */}
      <div className="bg-white border-b border-border/40">
        <div className="container-wide py-4">
          <div className="flex items-center justify-center gap-3">
            {[
              { id: "besoin" as Step, label: "Votre besoin", num: 1 },
              { id: "profil" as Step, label: "Profil recherché", num: 2 },
              { id: "rdv" as Step, label: "Réserver un créneau", num: 3 },
            ].map((s, i) => {
              const isCurrent = s.id === step;
              const isDone = (step === "profil" && i === 0) || (step === "rdv" && i <= 1);
              return (
                <div key={s.id} className="flex items-center gap-3">
                  {i > 0 && <div className={`w-8 h-px ${isDone || isCurrent ? "bg-primary" : "bg-border"}`} />}
                  <button
                    onClick={() => {
                      if (isDone) setStep(s.id);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isCurrent ? "bg-primary text-white" : isDone ? "bg-primary/10 text-primary cursor-pointer" : "bg-gray-100 text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold">{s.num}</span>}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding">
        <div className="container-tight max-w-2xl">
          <AnimatePresence mode="wait">

            {/* STEP 1 — Besoin */}
            {step === "besoin" && (
              <motion.div key="besoin" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-2">Quel est votre besoin en recrutement ?</h2>
                <p className="text-muted-foreground mb-8">Aidez-nous à comprendre votre situation pour vous proposer le bon profil.</p>

                <div className="space-y-6">
                  {/* Nombre de postes */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Combien de postes devez-vous recruter ?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["1-3", "4-9", "10-20", "20+"].map((v) => (
                        <button
                          key={v}
                          onClick={() => select("postes", v)}
                          className={`p-4 rounded-xl border-2 text-center font-semibold transition-all ${
                            answers.postes === v
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border/60 hover:border-primary/30 hover:bg-gray-50"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Secteur */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Quel type de profils recrutez-vous ?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { v: "tech", label: "Tech / IT", icon: Zap },
                        { v: "sales", label: "Sales / Business", icon: Target },
                        { v: "product", label: "Product / Design", icon: Star },
                        { v: "finance", label: "Finance / Ops", icon: Building2 },
                        { v: "marketing", label: "Marketing", icon: MessageCircle },
                        { v: "multi", label: "Multi-profils", icon: Users },
                      ].map((s) => (
                        <button
                          key={s.v}
                          onClick={() => select("secteur", s.v)}
                          className={`p-4 rounded-xl border-2 flex items-center gap-3 text-left transition-all ${
                            answers.secteur === s.v
                              ? "border-primary bg-primary/5"
                              : "border-border/60 hover:border-primary/30 hover:bg-gray-50"
                          }`}
                        >
                          <s.icon className={`w-5 h-5 shrink-0 ${answers.secteur === s.v ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-sm font-medium">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urgence */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Quel est votre niveau d{"'"}urgence ?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { v: "urgent", label: "Urgent", desc: "< 2 semaines" },
                        { v: "normal", label: "Normal", desc: "1-2 mois" },
                        { v: "planifie", label: "Planifié", desc: "3+ mois" },
                      ].map((u) => (
                        <button
                          key={u.v}
                          onClick={() => select("urgence", u.v)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            answers.urgence === u.v
                              ? "border-primary bg-primary/5"
                              : "border-border/60 hover:border-primary/30 hover:bg-gray-50"
                          }`}
                        >
                          <div className="text-sm font-semibold">{u.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{u.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { if (answers.postes && answers.secteur && answers.urgence) setStep("profil"); }}
                  disabled={!answers.postes || !answers.secteur || !answers.urgence}
                  className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuer <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2 — Profil recommandé */}
            {step === "profil" && (
              <motion.div key="profil" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-2">Notre recommandation pour vous</h2>
                <p className="text-muted-foreground mb-8">Basée sur vos réponses, voici le format qui vous convient le mieux.</p>

                {/* Recommandation card */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-rocket-dark to-rocket-navy-soft text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-rocket-teal/10 rounded-full blur-[80px]" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/20 text-primary mb-4">
                      <CheckCircle2 className="w-3 h-3" /> Recommandé pour vous
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{reco.format}</h3>
                    <p className="text-white/60 leading-relaxed mb-6">{reco.desc}</p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-lg font-bold text-primary">{answers.postes}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">postes</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-lg font-bold text-primary">
                          {answers.secteur === "tech" ? "Tech" : answers.secteur === "sales" ? "Sales" : answers.secteur === "product" ? "Product" : answers.secteur === "finance" ? "Finance" : answers.secteur === "marketing" ? "Marketing" : "Multi"}
                        </div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">profils</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-lg font-bold text-primary">{reco.tjm.includes("550") ? "550€/j" : "Devis"}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">à partir de</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Votre TA idéal */}
                <div className="mt-8 p-6 rounded-2xl border border-border/40 bg-white">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" />
                    Le profil de votre TA idéal
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Expert en recrutement <strong>{answers.secteur === "tech" ? "Tech/IT" : answers.secteur === "sales" ? "Sales/Business" : answers.secteur === "product" ? "Product/Design" : answers.secteur === "multi" ? "multi-secteurs" : answers.secteur}</strong></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Évalué sur <strong>7 critères</strong> (sourcing, outils, autonomie, KPIs, qualification, conseil, RPO)</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Score minimum <strong>80%+</strong> sur notre grille d{"'"}évaluation</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Opérationnel en <strong>1 semaine</strong>, première shortlist en 5-7 jours</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep("besoin")} className="flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl border border-border/60 hover:bg-gray-50 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Modifier
                  </button>
                  <button
                    onClick={() => setStep("rdv")}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
                  >
                    Réserver un créneau pour en discuter <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — RDV */}
            {step === "rdv" && (
              <motion.div key="rdv" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-2">Choisissez votre créneau</h2>
                <p className="text-muted-foreground mb-6">30 minutes pour échanger sur votre besoin et trouver le TA idéal pour votre équipe.</p>

                {/* Summary */}
                <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-primary" /> {answers.postes} postes</span>
                  <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-primary" /> {answers.secteur === "tech" ? "Tech" : answers.secteur === "sales" ? "Sales" : answers.secteur === "multi" ? "Multi" : answers.secteur}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {answers.urgence === "urgent" ? "Urgent" : answers.urgence === "normal" ? "1-2 mois" : "3+ mois"}</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {reco.format}</span>
                </div>

                {/* HubSpot iframe */}
                <div className="rounded-2xl border border-border/40 overflow-hidden bg-white shadow-sm">
                  <iframe
                    src={HUBSPOT_URL}
                    className="w-full border-0"
                    style={{ height: "700px" }}
                    title="Réserver un rendez-vous"
                  />
                </div>

                <button onClick={() => setStep("profil")} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Revenir à la recommandation
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

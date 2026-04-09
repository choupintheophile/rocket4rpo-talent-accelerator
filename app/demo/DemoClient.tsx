"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Target,
  TrendingUp,
  FileText,
  Search,
  BarChart3,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const mockCandidates = [
  { name: "A. Martin", role: "AE SaaS", company: "Scale-up Fintech", experience: "4 ans", score: 94 },
  { name: "S. Dubois", role: "Senior AE", company: "Éditeur SaaS", experience: "6 ans", score: 91 },
  { name: "M. Laurent", role: "AE Mid-Market", company: "Start-up B2B", experience: "3 ans", score: 88 },
  { name: "T. Bernard", role: "AE Enterprise", company: "Licorne Tech", experience: "5 ans", score: 85 },
  { name: "L. Petit", role: "AE SaaS", company: "Scale-up RH Tech", experience: "4 ans", score: 82 },
];

const steps = [
  { label: "Brief & Scorecard", icon: FileText },
  { label: "Sourcing", icon: Search },
  { label: "Shortlist", icon: Users },
  { label: "Résultats", icon: BarChart3 },
];

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Score badge                                                        */
/* ------------------------------------------------------------------ */

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "text-green-400 bg-green-400/10 border-green-400/30"
      : score >= 85
        ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
        : "text-orange-400 bg-orange-400/10 border-orange-400/30";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${color}`}>
      {score}%
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Brief & Scorecard                                         */
/* ------------------------------------------------------------------ */

function StepBrief({ onNext }: { onNext: () => void }) {
  const [jobTitle, setJobTitle] = useState("Account Executive SaaS");
  const [criteria, setCriteria] = useState({
    saas: true,
    fullCycle: true,
    midMarket: false,
    hunter: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">Brief du poste</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Intitulé du poste
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Critères clés
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries({
                saas: "Expérience SaaS",
                fullCycle: "Full-cycle",
                midMarket: "Mid-Market",
                hunter: "Profil hunter",
              }).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() =>
                    setCriteria((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    criteria[key as keyof typeof criteria]
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-background/60 border-border text-muted-foreground"
                  }`}
                >
                  {criteria[key as keyof typeof criteria] && (
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  )}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        Lancer le sourcing <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — Sourcing                                                  */
/* ------------------------------------------------------------------ */

function StepSourcing({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (visibleCount < mockCandidates.length) {
      const timeout = setTimeout(() => setVisibleCount((c) => c + 1), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      {/* Progress bar */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Sourcing en cours...</span>
          </div>
          <span className="text-sm text-muted-foreground">{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Candidate cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {mockCandidates.slice(0, visibleCount).map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.role} &middot; {c.company} &middot; {c.experience}
                  </p>
                </div>
              </div>
              <ScoreBadge score={c.score} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount >= mockCandidates.length && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Voir la shortlist <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Shortlist                                                 */
/* ------------------------------------------------------------------ */

function StepShortlist({ onNext }: { onNext: () => void }) {
  const shortlisted = mockCandidates.slice(0, 3);
  const notes = [
    "Excellent track record — +140% quota atteint 2 ans de suite",
    "Forte expertise SaaS Mid-Market, référencé par son VP Sales",
    "Profil hunter, expérience prospection outbound B2B",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-6">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">48h écoulées</span>
        </div>
        <p className="text-sm text-muted-foreground">Votre shortlist qualifiée est prête.</p>
      </div>

      <div className="space-y-3">
        {shortlisted.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.role} &middot; {c.company} &middot; {c.experience}
                  </p>
                </div>
              </div>
              <ScoreBadge score={c.score} />
            </div>
            <p className="text-xs text-muted-foreground italic pl-13">{notes[i]}</p>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        Voir les résultats <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Results                                                   */
/* ------------------------------------------------------------------ */

function StepResults() {
  const kpis = [
    { label: "Time-to-hire", value: 28, suffix: "j", icon: Clock },
    { label: "Candidats présentés", value: 12, suffix: "", icon: Users },
    { label: "Entretiens finaux", value: 4, suffix: "", icon: Target },
    { label: "Offre acceptée", value: 1, suffix: "", icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
            className="rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 p-5 text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
              <kpi.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl font-bold">
              <AnimatedCounter target={kpi.value} suffix={kpi.suffix} />
            </p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-primary/20 p-6 text-center space-y-4">
        <h3 className="text-lg font-bold">Prêt à vivre ça pour de vrai ?</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Nos clients recrutent leur premier Sales en 28 jours en moyenne. Réservez un appel de 15
          min pour voir comment on peut faire pareil pour vous.
        </p>
        <a
          href="https://meetings.hubspot.com/theophile-choupin/rpo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Parler à un expert <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DemoClient() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 3));

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container-wide max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
            Démo interactive
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Vivez le process RPO{" "}
            <span className="text-gradient">en 4 étapes</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Découvrez comment nous trouvons vos meilleurs candidats en 48h, du brief
            initial à la shortlist qualifiée.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : i < currentStep
                      ? "bg-primary/15 text-primary cursor-pointer"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <step.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`w-6 h-0.5 rounded-full transition-colors ${
                    i < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && <StepBrief key="brief" onNext={next} />}
          {currentStep === 1 && <StepSourcing key="sourcing" onNext={next} />}
          {currentStep === 2 && <StepShortlist key="shortlist" onNext={next} />}
          {currentStep === 3 && <StepResults key="results" />}
        </AnimatePresence>
      </div>
    </main>
  );
}

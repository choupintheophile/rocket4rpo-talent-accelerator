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
  Zap,
  Star,
  MessageSquare,
  CalendarCheck,
  Radar,
  Sparkles,
  ChevronRight,
  Award,
  Timer,
  ArrowDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const mockCandidates = [
  { name: "A. Martin", role: "AE SaaS", company: "Scale-up Fintech", experience: "4 ans", score: 94 },
  { name: "S. Dubois", role: "Senior AE", company: "Editeur SaaS", experience: "6 ans", score: 91 },
  { name: "M. Laurent", role: "AE Mid-Market", company: "Start-up B2B", experience: "3 ans", score: 88 },
  { name: "T. Bernard", role: "AE Enterprise", company: "Licorne Tech", experience: "5 ans", score: 85 },
  { name: "L. Petit", role: "AE SaaS", company: "Scale-up RH Tech", experience: "4 ans", score: 82 },
];

const steps = [
  { label: "Brief & Scorecard", icon: FileText },
  { label: "Sourcing", icon: Search },
  { label: "Shortlist", icon: Users },
  { label: "Resultats", icon: BarChart3 },
];

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Fast counter (for sourcing profiles scanned)                       */
/* ------------------------------------------------------------------ */

function FastCounter({ target, duration = 3000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <span>{count.toLocaleString("fr-FR")}</span>;
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
/*  Score bar (mini horizontal bar for shortlist comparison)            */
/* ------------------------------------------------------------------ */

function ScoreBar({
  label,
  value,
  maxValue = 100,
  color,
}: {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Radar pulse animation (for sourcing step)                          */
/* ------------------------------------------------------------------ */

function RadarPulse() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <Radar className="w-5 h-5 text-primary" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Context card (side panel on desktop)                               */
/* ------------------------------------------------------------------ */

function ContextCard({ currentStep }: { currentStep: number }) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-32 space-y-4">
        {/* Brief summary card */}
        <div className="rounded-2xl bg-rocket-dark/60 backdrop-blur-xl border border-border/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <h4 className="text-sm font-bold">Votre brief</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-muted-foreground block mb-0.5">Poste</span>
              <span className="font-medium">Account Executive SaaS</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-0.5">Seniority</span>
              <span className="font-medium">Mid-Senior (3-6 ans)</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-0.5">Criteres actifs</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {["SaaS", "Full-cycle", "Hunter"].map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress card */}
        <div className="rounded-2xl bg-rocket-dark/60 backdrop-blur-xl border border-border/40 p-5 space-y-3">
          <h4 className="text-sm font-bold">Progression</h4>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    i < currentStep
                      ? "bg-green-500/20 text-green-400"
                      : i === currentStep
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  )}
                </div>
                <span
                  className={
                    i <= currentStep ? "font-medium" : "text-muted-foreground"
                  }
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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

  const criteriaLabels: Record<string, string> = {
    saas: "Experience SaaS",
    fullCycle: "Full-cycle",
    midMarket: "Mid-Market",
    hunter: "Profil hunter",
  };

  const activeCriteria = Object.entries(criteria).filter(([, v]) => v);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      {/* Brief form */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold">Brief du poste</h3>
              <p className="text-xs text-muted-foreground">
                Definissez le profil ideal en quelques clics
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Job title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Intitule du poste
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-rocket-dark/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* Criteria chips */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Target className="w-3.5 h-3.5 text-primary" />
              Criteres cles
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(criteriaLabels).map(([key, label]) => {
                const active = criteria[key as keyof typeof criteria];
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCriteria((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof prev],
                      }))
                    }
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      active
                        ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_12px_rgba(var(--primary-rgb,99,102,241),0.15)]"
                        : "bg-rocket-dark/20 border-border/40 text-muted-foreground hover:border-border/80"
                    }`}
                  >
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block mr-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 inline" />
                      </motion.span>
                    )}
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scorecard preview */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-rocket-teal-light/5 to-transparent border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rocket-teal-light/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-rocket-teal-glow" />
            </div>
            <div>
              <h3 className="text-base font-bold">Apercu Scorecard</h3>
              <p className="text-xs text-muted-foreground">
                Votre grille d&apos;evaluation se construit automatiquement
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {activeCriteria.length > 0 ? (
              activeCriteria.map(([key], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rocket-dark/20 border border-border/30"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    {criteriaLabels[key]}
                  </span>
                  <div className="ml-auto flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className={`w-2 h-2 rounded-full ${
                          n <= 3
                            ? "bg-primary/40"
                            : "bg-muted/30"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Selectionnez des criteres pour construire votre scorecard
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
      >
        Lancer le sourcing <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — Sourcing                                                  */
/* ------------------------------------------------------------------ */

function StepSourcing({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [profilesScanned, setProfilesScanned] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setProfilesScanned((p) => {
        if (p >= 2847) {
          clearInterval(interval);
          return 2847;
        }
        return p + Math.floor(Math.random() * 40 + 15);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const scoreColor = (score: number) =>
    score >= 90
      ? "from-green-500/50 to-green-500/10"
      : score >= 85
        ? "from-yellow-500/50 to-yellow-500/10"
        : "from-orange-500/50 to-orange-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      {/* Radar + scanning panel */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center gap-5">
          <RadarPulse />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">Sourcing en cours...</span>
            </div>
            <p className="text-2xl font-bold text-primary tabular-nums">
              <FastCounter target={2847} duration={3500} />
              <span className="text-sm font-normal text-muted-foreground ml-2">
                profils analyses
              </span>
            </p>
            {/* Progress bar */}
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>LinkedIn, bases internes, referrals</span>
                <span className="font-mono">{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate cards with gradient border */}
      <div className="space-y-3">
        <AnimatePresence>
          {mockCandidates.slice(0, visibleCount).map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden"
            >
              {/* Score gradient border left */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${scoreColor(c.score)}`}
              />

              <div className="p-4 pl-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.role} &middot; {c.company} &middot; {c.experience}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  >
                    <ScoreBadge score={c.score} />
                  </motion.div>
                  <Sparkles className="w-3.5 h-3.5 text-primary/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount >= mockCandidates.length && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
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
    "Forte expertise SaaS Mid-Market, reference par son VP Sales",
    "Profil hunter, experience prospection outbound B2B",
  ];

  const candidateScores = [
    { saas: 97, closing: 92, hunting: 88, culture: 95 },
    { saas: 94, closing: 89, hunting: 85, culture: 90 },
    { saas: 86, closing: 91, hunting: 93, culture: 84 },
  ];

  const scoreBarColors = [
    "bg-green-500",
    "bg-primary",
    "bg-yellow-500",
    "bg-rocket-teal-glow",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      {/* 48h badge */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-5">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(var(--primary-rgb,99,102,241), 0.3)",
                "0 0 20px 4px rgba(var(--primary-rgb,99,102,241), 0.15)",
                "0 0 0 0 rgba(var(--primary-rgb,99,102,241), 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0"
          >
            <Timer className="w-7 h-7 text-primary" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg font-bold text-primary">48h ecoulees</span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/30"
              >
                LIVREE
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre shortlist qualifiee de 3 candidats est prete.
            </p>
          </div>
        </div>
      </div>

      {/* Candidate comparison cards */}
      <div className="space-y-4">
        {shortlisted.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden"
          >
            {/* Card header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.role} &middot; {c.company} &middot; {c.experience}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ScoreBadge score={c.score} />
                {i === 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold border border-yellow-500/30 flex items-center gap-1">
                    <Star className="w-2.5 h-2.5" />
                    TOP
                  </span>
                )}
              </div>
            </div>

            {/* Score bars + notes */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Mini bar chart */}
              <div className="space-y-2.5">
                {[
                  { label: "Expertise SaaS", value: candidateScores[i].saas },
                  { label: "Closing", value: candidateScores[i].closing },
                  { label: "Hunting", value: candidateScores[i].hunting },
                  { label: "Culture fit", value: candidateScores[i].culture },
                ].map((metric, mi) => (
                  <ScoreBar
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    color={scoreBarColors[mi]}
                  />
                ))}
              </div>

              {/* TA Notes */}
              <div className="rounded-xl bg-rocket-dark/20 border border-border/30 p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Notes du TA
                  </span>
                </div>
                <p className="text-xs leading-relaxed italic text-foreground/80">
                  &ldquo;{notes[i]}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
      >
        Voir les resultats <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Results                                                   */
/* ------------------------------------------------------------------ */

function StepResults() {
  const kpis = [
    { label: "Time-to-hire", value: 28, suffix: "j", icon: Clock, desc: "Du brief au contrat signe" },
    { label: "Candidats presentes", value: 12, suffix: "", icon: Users, desc: "Profils qualifies envoyes" },
    { label: "Entretiens finaux", value: 4, suffix: "", icon: Target, desc: "Candidats shortlistes" },
    { label: "Offre acceptee", value: 1, suffix: "", icon: TrendingUp, desc: "Recrutement confirme" },
  ];

  const timelineSteps = [
    { label: "Brief", day: "J0", icon: FileText },
    { label: "Shortlist", day: "J2", icon: Users },
    { label: "Entretiens", day: "J14", icon: MessageSquare },
    { label: "Offre", day: "J25", icon: Award },
    { label: "Signe", day: "J28", icon: CalendarCheck },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-5 md:p-6 text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <kpi.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              <AnimatedCounter target={kpi.value} suffix={kpi.suffix} />
            </p>
            <div>
              <p className="text-sm font-semibold">{kpi.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline visualization */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-6">
        <h4 className="text-sm font-bold mb-5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Timeline du recrutement
        </h4>
        <div className="relative flex items-center justify-between">
          {/* Connecting line */}
          <div className="absolute top-5 left-6 right-6 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-primary/30" />

          {timelineSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-background border-2 border-primary/40 flex items-center justify-center mb-2">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-bold text-primary">{step.day}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison: Vous vs Marche */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-6"
      >
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Vous vs Marche
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
            <p className="text-3xl font-bold text-primary">28j</p>
            <p className="text-xs text-muted-foreground mt-1">Avec Rocket4Sales</p>
            <div className="mt-2 flex justify-center">
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/30">
                -46%
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-muted/20 border border-border/30 p-4 text-center">
            <p className="text-3xl font-bold text-muted-foreground">52j</p>
            <p className="text-xs text-muted-foreground mt-1">Moyenne du marche</p>
            <div className="mt-2 flex justify-center">
              <span className="px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground text-[10px] font-bold border border-border/30">
                Standard
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-rocket-teal-light/10 border border-primary/20 p-8 text-center space-y-5"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold">
          Pret a vivre ca pour de vrai ?
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Nos clients recrutent leur premier Sales en 35 jours en moyenne.
          Reservez un appel de 15 min pour voir comment on peut faire pareil
          pour vous.
        </p>
        <a
          href="https://meetings.hubspot.com/theophile-choupin/rpo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
        >
          Parler a un expert
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-[11px] text-muted-foreground">
          Appel gratuit &middot; 15 min &middot; Sans engagement
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step navigation timeline                                           */
/* ------------------------------------------------------------------ */

function StepTimeline({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <button
            onClick={() => i <= currentStep && onStepClick(i)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
              i === currentStep
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : i < currentStep
                  ? "bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                  : "bg-muted/20 text-muted-foreground cursor-default"
            }`}
          >
            {i < currentStep ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <step.icon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>

          {i < steps.length - 1 && (
            <div className="flex items-center mx-1.5">
              <div
                className={`w-8 h-0.5 rounded-full transition-all duration-500 ${
                  i < currentStep
                    ? "bg-primary"
                    : "bg-border/40"
                }`}
              />
              <ChevronRight
                className={`w-3 h-3 -ml-1 transition-colors ${
                  i < currentStep ? "text-primary" : "text-border/40"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DemoClient() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 3));

  return (
    <main className="min-h-screen">
      {/* Dark gradient hero header */}
      <div className="relative bg-gradient-to-b from-rocket-dark via-rocket-navy-soft to-background pt-28 pb-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-rocket-teal-light/5 rounded-full blur-3xl" />
        </div>

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3" />
              Demo interactive
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Vivez le process RPO{" "}
              <span className="text-gradient">en 4 etapes</span>
            </h1>

            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Decouvrez comment nous trouvons vos meilleurs candidats en 48h,
              du brief initial a la shortlist qualifiee.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground mx-auto animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content area */}
      <div className="container-wide max-w-6xl mx-auto px-4 -mt-4 pb-20">
        {/* Step timeline */}
        <StepTimeline currentStep={currentStep} onStepClick={setCurrentStep} />

        {/* Main content grid with context card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Step content */}
          <div>
            <AnimatePresence mode="wait">
              {currentStep === 0 && <StepBrief key="brief" onNext={next} />}
              {currentStep === 1 && <StepSourcing key="sourcing" onNext={next} />}
              {currentStep === 2 && <StepShortlist key="shortlist" onNext={next} />}
              {currentStep === 3 && <StepResults key="results" />}
            </AnimatePresence>
          </div>

          {/* Context card (desktop sidebar) */}
          <ContextCard currentStep={currentStep} />
        </div>
      </div>
    </main>
  );
}

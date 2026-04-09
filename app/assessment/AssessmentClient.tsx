"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ClipboardCheck,
  Users,
  Clock,
  Search,
  Heart,
  BarChart3,
  Briefcase,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Question {
  id: string;
  icon: React.ElementType;
  question: string;
  options: string[];
  recommendation: string;
}

const questions: Question[] = [
  {
    id: "process",
    icon: ClipboardCheck,
    question: "Comment qualifieriez-vous votre processus de recrutement ?",
    options: ["Inexistant", "Basique", "Structure", "Optimise"],
    recommendation:
      "Mettez en place un processus structure avec des etapes claires, des responsabilites definies et des criteres d'evaluation objectifs.",
  },
  {
    id: "scorecards",
    icon: CheckCircle2,
    question: "Avez-vous des scorecards pour evaluer vos candidats ?",
    options: ["Jamais", "Parfois", "Souvent", "Systematiquement"],
    recommendation:
      "Adoptez des scorecards structurees pour chaque poste afin de reduire les biais et d'ameliorer la qualite de vos recrutements.",
  },
  {
    id: "tth",
    icon: Clock,
    question: "Quel est votre time-to-hire moyen ?",
    options: ["> 60 jours", "45-60 jours", "30-45 jours", "< 30 jours"],
    recommendation:
      "Optimisez votre pipeline en identifiant les goulots d'etranglement et en parallelisant les etapes d'entretien.",
  },
  {
    id: "sourcing",
    icon: Search,
    question: "Utilisez-vous des outils de sourcing avances ?",
    options: ["Non", "LinkedIn basique", "LinkedIn Recruiter", "Multi-canal"],
    recommendation:
      "Diversifiez vos canaux de sourcing (LinkedIn Recruiter, GitHub, meetups, cooptation) pour atteindre les talents passifs.",
  },
  {
    id: "retention",
    icon: Heart,
    question: "Quel est votre taux de retention a 12 mois ?",
    options: ["< 70 %", "70-80 %", "80-90 %", "> 90 %"],
    recommendation:
      "Ameliorez votre onboarding et alignez mieux les attentes candidat/entreprise des la phase de recrutement.",
  },
  {
    id: "kpi",
    icon: BarChart3,
    question: "Avez-vous un suivi KPI de votre recrutement ?",
    options: ["Aucun", "Basique", "Dashboard", "Temps reel"],
    recommendation:
      "Mettez en place un dashboard avec les KPIs essentiels : time-to-hire, taux de conversion, cout par recrutement, qualite du sourcing.",
  },
  {
    id: "volume",
    icon: Briefcase,
    question: "Combien de postes recrutez-vous par trimestre ?",
    options: ["1-3", "4-10", "11-20", "20+"],
    recommendation:
      "A votre volume, un TA Specialist dedie pourrait considerablement accelerer vos recrutements et reduire vos couts.",
  },
];

const grades = [
  { label: "Debutant", min: 0, max: 7, color: "text-red-500", bg: "bg-red-500" },
  { label: "En progression", min: 8, max: 13, color: "text-amber-500", bg: "bg-amber-500" },
  { label: "Performant", min: 14, max: 17, color: "text-emerald-500", bg: "bg-emerald-500" },
  { label: "Expert", min: 18, max: 21, color: "text-primary", bg: "bg-primary" },
] as const;

function getGrade(score: number) {
  return grades.find((g) => score >= g.min && score <= g.max) ?? grades[0];
}

/* ------------------------------------------------------------------ */
/*  Slide variants                                                     */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Phase = "intro" | "quiz" | "results";

export default function AssessmentClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1);

  const handleStart = useCallback(() => {
    setAnswers([]);
    setCurrent(0);
    setDirection(1);
    setPhase("quiz");
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      const next = [...answers, optionIndex];
      setAnswers(next);
      setDirection(1);
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setPhase("results");
      }
    },
    [answers, current],
  );

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setAnswers([]);
    setCurrent(0);
  }, []);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const grade = getGrade(totalScore);

  // Get top 3 weakest areas for recommendations
  const weakest = answers
    .map((score, i) => ({ score, index: i }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-wide max-w-3xl mx-auto px-4">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ----- INTRO ----- */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 md:py-24"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Votre recrutement est-il performant ?
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-3">
                7 questions, 2 minutes, resultat immediat.
              </p>
              <p className="text-muted-foreground max-w-lg mx-auto mb-10">
                Evaluez votre maturite Talent Acquisition et recevez des recommandations personnalisees pour ameliorer vos recrutements.
              </p>
              <Button size="lg" onClick={handleStart} className="gap-2 text-base px-8 py-6">
                Commencer le diagnostic <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* ----- QUIZ ----- */}
          {phase === "quiz" && (
            <motion.div
              key={`q-${current}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="py-12 md:py-20"
            >
              {/* Progress bar */}
              <div className="mb-10">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>
                    Question {current + 1} / {questions.length}
                  </span>
                  <span>{Math.round(((current + 1) / questions.length) * 100)} %</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: `${(current / questions.length) * 100}%` }}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="text-center mb-8">
                {(() => {
                  const Icon = questions[current].icon;
                  return (
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  );
                })()}
                <h2 className="text-xl md:text-2xl font-bold">{questions[current].question}</h2>
              </div>

              {/* Options */}
              <div className="grid gap-3 max-w-lg mx-auto">
                {questions[current].options.map((opt, i) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors font-medium text-sm md:text-base"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-xs font-bold mr-3">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ----- RESULTS ----- */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 md:py-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">Votre resultat</h2>
                <p className="text-muted-foreground">
                  Voici votre diagnostic de maturite recrutement.
                </p>
              </div>

              {/* Score gauge */}
              <div className="flex flex-col items-center mb-12">
                <div className="relative w-48 h-48 mb-6">
                  {/* Background circle */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-secondary"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className={grade.color.replace("text-", "stroke-")}
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 42 - (totalScore / 21) * 2 * Math.PI * 42,
                      }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-4xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {totalScore}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">/ 21</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-lg ${grade.bg}/10 ${grade.color}`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${grade.bg}`}
                  />
                  {grade.label}
                </motion.div>
              </div>

              {/* Recommendations */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Vos 3 axes d&apos;amelioration prioritaires
                </h3>
                <div className="grid gap-4">
                  {weakest.map(({ index }, rank) => {
                    const q = questions[index];
                    const Icon = q.icon;
                    return (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + rank * 0.15 }}
                        className="flex gap-4 p-5 rounded-xl border border-border bg-card"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">{q.question}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {q.recommendation}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 px-8 py-6 text-base">
                  <Link href="/contact">
                    Recevoir votre rapport detaille <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 px-8 py-6 text-base">
                  <Link href="/contact">Parler a un expert</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleRestart} className="gap-2 mt-2 sm:mt-0">
                  <RotateCcw className="w-4 h-4" /> Recommencer
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

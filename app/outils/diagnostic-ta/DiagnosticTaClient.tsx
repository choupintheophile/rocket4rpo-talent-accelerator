"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

type Answer = 0 | 1 | 2 | 3; // 0 = pire, 3 = meilleur

const QUESTIONS: { q: string; cat: string; choices: string[] }[] = [
  {
    q: "Votre process de recrutement est-il documenté et standardisé ?",
    cat: "Process",
    choices: [
      "Aucune doc, chaque manager improvise",
      "Documentation partielle, peu suivie",
      "Process clair pour les rôles principaux",
      "Process documenté + formé + appliqué partout",
    ],
  },
  {
    q: "Comment briefez-vous un nouveau poste avec le hiring manager ?",
    cat: "Brief",
    choices: [
      "Pas de brief structuré, on en parle au feeling",
      "Réunion brief mais sans template fixe",
      "Template de brief utilisé systématiquement",
      "Template + scorecard pondérée + critères must-have/nice-to-have",
    ],
  },
  {
    q: "Quels canaux de sourcing utilisez-vous ?",
    cat: "Sourcing",
    choices: [
      "Uniquement jobboards classiques",
      "Jobboards + LinkedIn occasionnel",
      "LinkedIn Recruiter actif + cooptation organisée",
      "Mix multi-canal piloté (LinkedIn, communautés, référents, vivier)",
    ],
  },
  {
    q: "Combien de temps pour avoir une première shortlist qualifiée ?",
    cat: "Vitesse",
    choices: [
      "Plus de 3 semaines",
      "2-3 semaines",
      "1 semaine",
      "48 à 72 heures",
    ],
  },
  {
    q: "Comment évaluez-vous les candidats en entretien ?",
    cat: "Évaluation",
    choices: [
      "Discussions libres, ressenti des intervieweurs",
      "Quelques questions clés mais pas standardisées",
      "Questions structurées (méthode STAR) par compétence",
      "STAR + scorecard partagée + debrief structuré multi-évaluateurs",
    ],
  },
  {
    q: "Suivez-vous des KPIs recrutement mesurables ?",
    cat: "KPIs",
    choices: [
      "Aucun KPI suivi",
      "Time-to-hire global, calculé manuellement",
      "5-6 KPIs (TTH, OAR, source, coût, qualité)",
      "Dashboard live 12+ KPIs, reporting mensuel COMEX",
    ],
  },
  {
    q: "Comment intégrez-vous les nouveaux arrivants ?",
    cat: "Onboarding",
    choices: [
      "Pas de plan, le manager se débrouille",
      "Onboarding RH léger (admin uniquement)",
      "Plan onboarding 30 jours documenté",
      "Plan 30-60-90 + buddy + bilans formels par phase",
    ],
  },
  {
    q: "Quelle est votre approche RGPD pour les candidats ?",
    cat: "Conformité",
    choices: [
      "Aucune politique formalisée",
      "Information basique sur le formulaire de candidature",
      "Politique candidat + registre des traitements",
      "Politique + registre + audit annuel + DPO référent",
    ],
  },
  {
    q: "Mesurez-vous la diversité de vos recrutements ?",
    cat: "Inclusion",
    choices: [
      "Non, pas de mesure",
      "Index égalité H/F obligatoire uniquement",
      "Index + scorecard objective limitant les biais",
      "Index + scorecard + sourcing diversifié + formation managers",
    ],
  },
  {
    q: "Quel est votre taux de rétention à 12 mois ?",
    cat: "Qualité",
    choices: [
      "Inconnu ou < 70 %",
      "70-80 %",
      "80-90 %",
      "Plus de 90 %",
    ],
  },
];

const PLANS = {
  debutant: {
    label: "Débutant",
    color: "from-red-500 to-orange-500",
    bg: "from-red-500/10 to-orange-500/5",
    border: "border-red-500/30",
    text: "text-red-400",
    desc: "Process en construction. Beaucoup de leviers à activer rapidement.",
    actions: [
      "Mettre en place un template de brief de poste systématique",
      "Choisir et déployer un ATS simple (Workable, Lever, Recruitee)",
      "Définir 5 KPIs minimum à suivre dès maintenant (TTH, OAR, source, qualité, rétention)",
      "Former hiring managers à la méthode STAR pour les entretiens",
      "Prendre 30 min de diagnostic externe pour structurer la roadmap",
    ],
    resources: [
      { title: "Brief de poste — Template", href: "/ressources/template-brief-poste.pdf" },
      { title: "50 questions d'entretien STAR", href: "/ressources/questions-entretien-structure.pdf" },
      { title: "12 KPIs essentiels", href: "/ressources/guide-kpis-recrutement.pdf" },
    ],
  },
  initie: {
    label: "Initié",
    color: "from-amber-500 to-yellow-500",
    bg: "from-amber-500/10 to-yellow-500/5",
    border: "border-amber-500/30",
    text: "text-amber-400",
    desc: "Bonnes bases mais incohérences. Le mix process + outils + KPIs est à muscler.",
    actions: [
      "Rendre le brief obligatoire avant tout sourcing (gate)",
      "Diversifier le sourcing : ajouter LinkedIn Recruiter + cooptation organisée",
      "Mettre en place une scorecard pondérée partagée pour objectiver",
      "Lancer un onboarding 30-60-90 documenté",
      "Auditer la conformité RGPD (registre des traitements, politique candidat)",
    ],
    resources: [
      { title: "Sourcing multicanal — Guide", href: "/ressources/guide-sourcing-multicanal.pdf" },
      { title: "Scorecard de recrutement", href: "/ressources/scorecard-recrutement.pdf" },
      { title: "Plan onboarding 30-60-90", href: "/ressources/guide-plan-30-60-90.pdf" },
    ],
  },
  solide: {
    label: "Solide",
    color: "from-emerald-500 to-teal-500",
    bg: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    desc: "Process structuré et appliqué. Le passage à l'excellence demande de l'optimisation continue.",
    actions: [
      "Passer en pilotage data : dashboard live + reporting COMEX mensuel",
      "Industrialiser le sourcing (vivier qualifié, séquences automatisées)",
      "Mettre en place un programme inclusion formel (sourcing + biais + KPIs diversité)",
      "Auditer la performance par source (cost-per-hire, qualité)",
      "Préparer la scalabilité : RPO complémentaire pour gérer les pics",
    ],
    resources: [
      { title: "Reporting COMEX — Template", href: "/ressources/template-reporting-comex.pdf" },
      { title: "Recrutement inclusif — Guide", href: "/ressources/guide-recrutement-inclusif.pdf" },
      { title: "RPO vs cabinet vs interne", href: "/ressources/guide-rpo-vs-cabinet.pdf" },
    ],
  },
  excellence: {
    label: "Excellence",
    color: "from-emerald-400 to-cyan-400",
    bg: "from-emerald-400/15 to-cyan-400/10",
    border: "border-emerald-400/40",
    text: "text-emerald-300",
    desc: "Vous êtes dans le top 10 % du marché. Optimisation marginale + démultiplication impact.",
    actions: [
      "Industrialiser via IA (qualification CV, génération offres, debrief auto)",
      "Optimiser le candidate experience (NPS candidat > 70)",
      "Documenter et partager votre playbook (talent brand interne/externe)",
      "Anticiper la scalabilité internationale du process",
      "Devenir un benchmark de référence sur votre vertical",
    ],
    resources: [
      { title: "IA en recrutement — 20 prompts", href: "/ressources/guide-ia-recrutement.pdf" },
      { title: "Benchmark RPO France 2026", href: "/ressources/benchmark-rpo-france-2026.pdf" },
      { title: "KPIs avancés + dashboards", href: "/ressources/guide-kpis-recrutement.pdf" },
    ],
  },
};

export default function DiagnosticTaClient() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const score = useMemo(() => {
    if (answers.length === 0) return 0;
    const total = answers.reduce((acc, a) => acc + a, 0);
    const max = QUESTIONS.length * 3;
    return Math.round((total / max) * 100);
  }, [answers]);

  const plan = useMemo(() => {
    if (score < 30) return PLANS.debutant;
    if (score < 60) return PLANS.initie;
    if (score < 85) return PLANS.solide;
    return PLANS.excellence;
  }, [score]);

  const handleAnswer = (a: Answer) => {
    const newAnswers = [...answers, a];
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("result");
    }
  };

  const reset = () => {
    setAnswers([]);
    setCurrentQ(0);
    setStep("intro");
  };

  const back = () => {
    if (currentQ > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentQ(currentQ - 1);
    }
  };

  // Gauge SVG
  const gaugeAngle = -90 + (score / 100) * 180;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(220,20%,8%)] via-[hsl(220,18%,12%)] to-[hsl(220,20%,8%)] text-white">
      <div className="container-wide pt-8 pb-20">
        <div className="text-white/70 mb-4">
          <Breadcrumbs
            items={[{ label: "Outils" }, { label: "Diagnostic TA" }]}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* INTRO */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-2xl mx-auto mt-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5">
                <ClipboardCheck className="w-3.5 h-3.5" />
                Diagnostic gratuit · 5 minutes
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Quel est votre niveau de
                <br />
                <span className="text-gradient bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  maturité Talent Acquisition ?
                </span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                10 questions pour évaluer votre process. Score sur 100, plan
                d'action personnalisé, ressources adaptées à votre niveau.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {Object.values(PLANS).map((p) => (
                  <div
                    key={p.label}
                    className={`p-4 rounded-xl border ${p.border} bg-gradient-to-br ${p.bg}`}
                  >
                    <div className={`text-xs font-bold ${p.text} uppercase tracking-wider mb-1`}>
                      {p.label}
                    </div>
                    <div className="text-2xl font-bold tabular-nums">
                      {p.label === "Débutant"
                        ? "0-30"
                        : p.label === "Initié"
                        ? "30-60"
                        : p.label === "Solide"
                        ? "60-85"
                        : "85-100"}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep("quiz")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 transition-all hover:scale-[1.02]"
              >
                Démarrer le diagnostic
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-white/40 mt-4">
                Aucune création de compte · Pas d'email demandé · Anonyme
              </p>
            </motion.div>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto mt-8"
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-white/50 mb-2">
                  <span>
                    Question {currentQ + 1} / {QUESTIONS.length}
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {QUESTIONS[currentQ].cat}
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 leading-tight">
                  {QUESTIONS[currentQ].q}
                </h2>
                <div className="space-y-3">
                  {QUESTIONS[currentQ].choices.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i as Answer)}
                      className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 hover:bg-emerald-500/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold group-hover:border-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm text-white/90 group-hover:text-white">
                          {choice}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Back */}
              {currentQ > 0 && (
                <button
                  onClick={back}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Question précédente
                </button>
              )}
            </motion.div>
          )}

          {/* RESULT */}
          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mt-8"
            >
              {/* Gauge */}
              <div className="text-center mb-8">
                <p className="text-sm text-white/50 uppercase tracking-wider font-semibold mb-2">
                  Votre score
                </p>

                <div className="relative inline-block">
                  <svg viewBox="0 0 300 180" className="w-72 h-44">
                    <g transform="translate(150,150)">
                      <path
                        d="M -120,0 A 120,120 0 0,1 120,0"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                      <path
                        d="M -120,0 A 120,120 0 0,1 -60,-104"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="20"
                      />
                      <path
                        d="M -60,-104 A 120,120 0 0,1 0,-120"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="20"
                      />
                      <path
                        d="M 0,-120 A 120,120 0 0,1 60,-104"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="20"
                      />
                      <path
                        d="M 60,-104 A 120,120 0 0,1 120,0"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="20"
                      />
                      <motion.line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-100"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: gaugeAngle }}
                        transition={{ duration: 1, type: "spring", stiffness: 60 }}
                      />
                      <circle cx="0" cy="0" r="10" fill="white" />
                    </g>
                  </svg>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-5xl font-black tabular-nums">
                      {score}
                    </div>
                    <div className="text-xs text-white/50">/ 100</div>
                  </div>
                </div>

                <div className={`inline-flex items-center gap-2 mt-2 px-5 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white font-bold uppercase tracking-wider text-sm`}>
                  <Award className="w-4 h-4" />
                  Niveau {plan.label}
                </div>
              </div>

              {/* Verdict */}
              <div className={`rounded-2xl border ${plan.border} bg-gradient-to-br ${plan.bg} p-6 mb-6`}>
                <p className="text-base text-white/90 leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              {/* Action plan */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  5 actions prioritaires pour vous
                </h3>
                <ul className="space-y-3">
                  {plan.actions.map((a, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <CheckCircle2 className={`w-5 h-5 ${plan.text} flex-shrink-0 mt-0.5`} />
                      <span className="text-white/85">{a}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Recommended resources */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Ressources recommandées pour votre niveau
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {plan.resources.map((r) => (
                    <a
                      key={r.title}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-emerald-400/40 hover:bg-emerald-500/[0.05] transition-all group"
                    >
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        Télécharger →
                      </div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300 leading-snug">
                        {r.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-center shadow-2xl shadow-emerald-500/20">
                <h2 className="text-2xl font-bold mb-2">
                  Vous voulez aller plus loin ?
                </h2>
                <p className="text-white/85 mb-6 max-w-xl mx-auto">
                  30 minutes avec un expert RPO pour traduire ce score en
                  roadmap concrète sur 90 jours.
                </p>
                <Link
                  href="/rdv"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl bg-white text-emerald-700 hover:bg-white/90 transition-all hover:scale-[1.02]"
                >
                  Réserver un diagnostic gratuit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <button
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
                Refaire le diagnostic
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

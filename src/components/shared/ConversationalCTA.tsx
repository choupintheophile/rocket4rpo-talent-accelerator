"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, CheckCircle } from "lucide-react";

import { usePathname } from "next/navigation";

const steps = [
  {
    question: "Quel est votre besoin principal ?",
    options: [
      { label: "Recruter des Sales/commerciaux", value: "sales", next: 1 },
      { label: "Recruter des profils Tech/IT", value: "tech", next: 1 },
      {
        label: "Structurer mon process recrutement",
        value: "enablement",
        next: 1,
      },
      { label: "Autre besoin", value: "other", next: 1 },
    ],
  },
  {
    question: "Combien de postes à pourvoir ?",
    options: [
      { label: "1 à 3 postes", value: "1-3", next: 2 },
      { label: "4 à 10 postes", value: "4-10", next: 2 },
      { label: "Plus de 10 postes", value: "10+", next: 2 },
    ],
  },
  {
    question: "Quel est votre délai ?",
    options: [
      { label: "Urgent (< 1 mois)", value: "urgent", next: 3 },
      { label: "Normal (1-3 mois)", value: "normal", next: 3 },
      { label: "Pas pressé", value: "relaxed", next: 3 },
    ],
  },
];

function getRecommendation(answers: string[]): {
  title: string;
  description: string;
} {
  const [need, volume, urgency] = answers;

  if (need === "enablement") {
    return {
      title: "TA Enablement",
      description:
        "Nous structurons votre process recrutement pour le rendre scalable et efficace.",
    };
  }

  if (volume === "10+" || urgency === "urgent") {
    return {
      title: "TA Specialist temps plein",
      description:
        "Un recruteur senior dédié à 100% intégré dans votre équipe pour absorber le volume.",
    };
  }

  return {
    title: "TA Specialist temps partagé",
    description:
      "Un expert TA senior 2 à 3 jours/semaine, parfait pour votre volumétrie actuelle.",
  };
}

export function ConversationalCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const pathname = usePathname();

  // Don't show on /contact page
  if (pathname === "/contact") return null;

  useEffect(() => {
    // Restore previous answers from sessionStorage
    const saved = sessionStorage.getItem("conversational-cta-answers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          setAnswers(parsed);
          setIsComplete(true);
          setCurrentStep(3);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleAnswer = (value: string, nextStep: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (nextStep >= steps.length) {
      setIsComplete(true);
      setCurrentStep(nextStep);
      sessionStorage.setItem(
        "conversational-cta-answers",
        JSON.stringify(newAnswers)
      );
    } else {
      setCurrentStep(nextStep);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentStep(0);
    setIsComplete(false);
    sessionStorage.removeItem("conversational-cta-answers");
  };

  const recommendation = isComplete ? getRecommendation(answers) : null;

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors font-semibold text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Qualifier mon besoin</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-up panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] rounded-2xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Rocket4RPO
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Trouvez la formule adaptée
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-muted">
              <motion.div
                className="h-full bg-primary"
                animate={{
                  width: `${((isComplete ? 3 : currentStep) / 3) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Bot message bubble */}
                    <div className="flex gap-2 mb-5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MessageCircle className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px]">
                        <p className="text-sm font-medium text-foreground">
                          {steps[currentStep].question}
                        </p>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-2 pl-9">
                      {steps[currentStep].options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleAnswer(option.value, option.next)
                          }
                          className="text-left px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm text-foreground group"
                        >
                          <span className="flex items-center justify-between">
                            <span>{option.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Step indicator */}
                    <p className="text-xs text-muted-foreground mt-4 pl-9">
                      Question {currentStep + 1} sur {steps.length}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Success state */}
                    <div className="text-center mb-5">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Notre recommandation
                      </p>
                    </div>

                    {recommendation && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-5">
                        <p className="text-base font-bold text-foreground mb-2">
                          {recommendation.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {recommendation.description}
                        </p>
                      </div>
                    )}

                    <a
                      href="https://meetings.hubspot.com/theophile-choupin/rpo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                    >
                      Réserver mon diagnostic gratuit
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Recommencer
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

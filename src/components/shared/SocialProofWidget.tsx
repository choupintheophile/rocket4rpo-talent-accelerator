"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, TrendingUp, X } from "lucide-react";

const notifications = [
  { icon: CheckCircle, text: "Nouvelle mission RPO lancée — Scale-up SaaS, 6 postes Sales", time: "il y a 2h" },
  { icon: Users, text: "3 recrutements finalisés cette semaine — Fintech, équipe Engineering", time: "il y a 5h" },
  { icon: TrendingUp, text: "Temps moyen de recrutement ce mois : 28 jours (-35%)", time: "il y a 1 jour" },
  { icon: CheckCircle, text: "Nouveau client dans le secteur HealthTech — 4 postes Marketing", time: "il y a 3 jours" },
  { icon: Users, text: "92% de rétention à 12 mois sur les 50 derniers placements", time: "ce mois" },
];

export const SocialProofWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [started, setStarted] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem("social-proof-dismissed") === "true") {
      setDismissed(true);
    }
  }, []);

  // Initial delay of 5 seconds before starting the cycle
  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setStarted(true), 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Cycle: show for 3s, hide for 5s (total 8s cycle)
  useEffect(() => {
    if (!started || dismissed) return;

    // Show immediately when started
    setVisible(true);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, [started, dismissed]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("social-proof-dismissed", "true");
  }, []);

  if (dismissed) return null;

  const notification = notifications[currentIndex];
  const Icon = notification.icon;

  return (
    <div className="hidden lg:block fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-sm bg-card border border-border rounded-xl shadow-lg p-4 pr-10 cursor-pointer"
            onClick={dismiss}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="absolute top-2 right-2 p-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground"
              aria-label="Fermer la notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">
                  {notification.text}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

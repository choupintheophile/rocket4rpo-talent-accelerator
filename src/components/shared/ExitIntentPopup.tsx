"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { trackExitIntentShown, trackExitIntentClick } from "@/lib/analytics";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("exit-popup-shown");
    if (shown) return;

    const docHandler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        trackExitIntentShown();
        sessionStorage.setItem("exit-popup-shown", "true");
        document.removeEventListener("mouseout", docHandler);
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener("mouseout", docHandler);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseout", docHandler);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setShow(false)}
            aria-hidden="true"
          />
          {/* Popup */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Diagnostic gratuit avant de partir"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] bg-background rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
          >
            <button
              onClick={() => setShow(false)}
              aria-label="Fermer la popup"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-2">Avant de partir...</h3>
            <p className="text-muted-foreground mb-4">
              Recevez un diagnostic gratuit de votre process de recrutement en
              2 minutes. Sans engagement.
            </p>
            <div className="flex gap-3">
              <Link
                href="/assessment"
                onClick={() => { trackExitIntentClick("Faire le diagnostic (2 min)", "/assessment"); setShow(false); }}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Faire le diagnostic (2 min)
              </Link>
              <a
                href="/rdv"
                onClick={() => { trackExitIntentClick("Parler à un expert", "/rdv"); setShow(false); }}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg border border-border hover:bg-secondary"
              >
                Parler à un expert
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Gratuit · Sans engagement · Résultat immédiat
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

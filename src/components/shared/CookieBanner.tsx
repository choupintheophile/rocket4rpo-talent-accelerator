"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
    // Disable GTM by removing dataLayer
    window.dataLayer = [];
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-foreground/95 backdrop-blur-lg border-t border-border">
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-background/80">
          Ce site utilise des cookies pour mesurer l'audience et améliorer votre expérience.{" "}
          <a href="/politique-confidentialite" className="underline text-primary">En savoir plus</a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={reject} className="px-4 py-2 text-sm font-medium rounded-lg border border-background/20 text-background/70 hover:text-background transition-colors">
            Refuser
          </button>
          <button onClick={accept} className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";
import { X } from "lucide-react";

export const UrgencyBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm relative">
      <span className="font-medium">
        Diagnostic gratuit — Réservez votre créneau
      </span>
      <span className="hidden sm:inline"> — </span>
      <a
        href="https://meetings.hubspot.com/theophile-choupin/rpo"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-semibold hidden sm:inline"
      >
        Réserver maintenant
      </a>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer la bannière"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-md"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

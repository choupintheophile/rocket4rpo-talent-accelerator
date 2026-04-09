"use client";

import { useState } from "react";
import { X } from "lucide-react";

export const UrgencyBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm relative">
      <span className="font-medium">
        Avril 2026 : 3 créneaux de mission disponibles sur 15
      </span>
      <span className="hidden sm:inline"> — </span>
      <a
        href="/contact"
        className="underline font-semibold hidden sm:inline"
      >
        Réserver maintenant
      </a>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

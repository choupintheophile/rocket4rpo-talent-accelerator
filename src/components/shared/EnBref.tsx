"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface EnBrefProps {
  bullets: string[];
  /** Theme : dark pour fond sombre, light pour fond clair */
  theme?: "dark" | "light";
  className?: string;
}

/**
 * "En bref" — citation capsule AEO-ready.
 * À placer directement sous le H1 des pages piliers.
 * Format : 3-5 bullets factuels, extraction-friendly par les LLMs.
 */
export const EnBref = ({ bullets, theme = "dark", className = "" }: EnBrefProps) => {
  const isDark = theme === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`mt-6 p-5 md:p-6 rounded-2xl border ${
        isDark
          ? "bg-white/[0.04] border-white/[0.08] backdrop-blur-xl"
          : "bg-gradient-to-br from-emerald-50 to-white border-emerald-200/60"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-[0.15em] ${
          isDark ? "text-emerald-400" : "text-emerald-700"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        En bref
      </div>
      <ul className={`space-y-2 text-sm md:text-[15px] leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full ${
                isDark ? "bg-emerald-400" : "bg-emerald-600"
              }`}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

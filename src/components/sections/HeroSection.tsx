"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, Database, Clock, Target } from "lucide-react";
import type { HeroContent } from "@/lib/personalization";

const stats = [
  { icon: Database, value: "40 000", label: "profils Sales pré-qualifiés" },
  { icon: Clock, value: "48h", label: "première shortlist garantie" },
  { icon: Target, value: "~44K€", label: "pour 10 recrutements (vs 60-200K€ cabinet)" },
];

const defaultContent: HeroContent = {
  badge: "Le seul RPO en France 100\u00a0% spécialisé Sales SaaS",
  headline: "Vos postes Sales SaaS restent ouverts trop longtemps\u00a0? ",
  highlightedText: "Première shortlist en 48h.",
  subtitle:
    "Chaque semaine sans votre Sales coûte en pipeline et en croissance. Rocket4RPO intègre un expert TA senior dans votre équipe, avec accès à 40\u00a0000 profils Sales pré-qualifiés. Résultat concret\u00a0: time-to-hire divisé par 2, coût 3x inférieur aux cabinets, 92\u00a0% de rétention à 12 mois.",
};

export const HeroSection = ({ content }: { content?: HeroContent }) => {
  const hero = content || defaultContent;

  return (
    <section className="relative overflow-hidden bg-foreground text-background section-padding pt-28 md:pt-36 lg:pt-44">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/15 text-primary border border-primary/20">
              {hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
          >
            {hero.headline}{" "}
            <span className="text-gradient-animated">{hero.highlightedText}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-background/60 leading-relaxed max-w-3xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* Mini-stats pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/5 border border-background/10"
              >
                <s.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-background">{s.value}</span>
                <span className="text-sm text-background/50">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Double CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://meetings.hubspot.com/theophile-choupin/rpo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {"Réserver mon diagnostic gratuit →"} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/calculateur"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-background/20 text-background hover:bg-background/10 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              {"Calculer mes économies"}
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 text-sm text-background/40"
          >
            {"Sans engagement. Diagnostic gratuit. Réponse sous 24h. — Issu de Rocket4Sales, 7 ans d\u2019expertise et 200+ recrutements réalisés."}
          </motion.p>

          {/* Urgency indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 flex items-center gap-2 text-sm text-background/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>12 missions RPO actives au T2 2026 — 3 créneaux disponibles ce mois</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, CheckCircle, Clock, Target } from "lucide-react";
import type { HeroContent } from "@/lib/personalization";

const stats = [
  { icon: CheckCircle, value: "200+", label: "recrutements réalisés" },
  { icon: Clock, value: "48h", label: "première shortlist" },
  { icon: Target, value: "92%", label: "rétention à 12 mois" },
];

const defaultContent: HeroContent = {
  badge: "RPO — Recrutement externalisé sur-mesure",
  headline: "Vos recrutements freinent votre ",
  highlightedText: "croissance\u00a0?",
  subtitle:
    "Première shortlist qualifiée en 48h. 92\u00a0% de rétention à 12 mois. ~44\u00a0000\u00a0€ pour 10 recrutements.",
};

export const HeroSection = ({ content }: { content?: HeroContent }) => {
  const hero = content || defaultContent;

  return (
    <section className="relative overflow-hidden bg-foreground text-background section-padding pt-28 md:pt-36 lg:pt-44">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
          >
            {hero.headline}
            {hero.highlightedText}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-background/60 leading-relaxed max-w-3xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* Mini-stats pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-background/5 border border-background/10"
              >
                <s.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-base font-bold text-background">{s.value}</span>
                <span className="text-sm text-background/50">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Double CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex flex-col items-start">
              <a
                href="https://meetings.hubspot.com/theophile-choupin/rpo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              >
                {"Réserver un diagnostic gratuit"} <ArrowRight className="w-4 h-4" />
              </a>
              <span className="mt-2 text-xs text-background/40">Gratuit · 30 min · Sans engagement</span>
            </div>
            <a
              href="/calculateur"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-background/20 text-background hover:bg-background/10 transition-colors duration-200"
            >
              <Calculator className="w-4 h-4" />
              {"Calculer mes économies"}
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-sm text-background/40"
          >
            {"Déjà 200+ entreprises accompagnées. Réponse sous 24h."}
          </motion.p>

          {/* Urgency indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-4 flex items-center gap-2 text-sm text-background/40"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span>3 créneaux restants en avril</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

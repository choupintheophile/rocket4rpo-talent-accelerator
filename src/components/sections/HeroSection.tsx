"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, Database, Clock, Target } from "lucide-react";

const stats = [
  { icon: Database, value: "40 000", label: "profils Sales pr\u00e9-qualifi\u00e9s" },
  { icon: Clock, value: "48h", label: "premi\u00e8re shortlist garantie" },
  { icon: Target, value: "~44K\u20ac", label: "pour 10 recrutements (vs 60-200K\u20ac cabinet)" },
];

export const HeroSection = () => (
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
            {"Le seul RPO en France 100\u00a0% sp\u00e9cialis\u00e9 Sales SaaS"}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
        >
          {"Vos postes Sales SaaS restent ouverts trop longtemps\u00a0? "}
          <span className="text-gradient">{"Premi\u00e8re shortlist en 48h."}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-background/60 leading-relaxed max-w-3xl"
        >
{"Chaque semaine sans votre Sales co\u00fbte en pipeline et en croissance. Rocket4RPO int\u00e8gre un expert TA senior dans votre \u00e9quipe, avec acc\u00e8s \u00e0 40\u00a0000 profils Sales pr\u00e9-qualifi\u00e9s. R\u00e9sultat concret\u00a0: time-to-hire divis\u00e9 par 2, co\u00fbt 3x inf\u00e9rieur aux cabinets, 92\u00a0% de r\u00e9tention \u00e0 12 mois."}
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
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {"R\u00e9server mon diagnostic gratuit \u2192"} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/calculateur"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-background/20 text-background hover:bg-background/10 transition-colors"
          >
            <Calculator className="w-4 h-4" />
            {"Calculer mes \u00e9conomies"}
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-sm text-background/40"
        >
{"Sans engagement. Diagnostic gratuit. R\u00e9ponse sous 24h. \u2014 Issu de Rocket4Sales, 7 ans d\u2019expertise et 200+ recrutements r\u00e9alis\u00e9s."}
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

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-foreground text-background section-padding pt-28 md:pt-36 lg:pt-44">
    {/* Subtle gradient orb */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

    <div className="container-wide relative z-10">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Rocket className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-background/60">Groupe Rocket4GTM · Filiale de <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">Rocket4Sales</a></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight">
            Talent Acquisition RPO pour{" "}
            <span className="text-gradient">entreprises Tech</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl text-background/60 leading-relaxed max-w-3xl"
        >
          Rocket4RPO met à disposition des Talent Acquisition Specialists experts de la chasse de candidat, de la gestion de candidature à fort volume, du marché de la Tech et de la structuration du recrutement, pour accompagner vos recrutements de Sales, IT, Marketing et fonctions supports (Finance, Chief of Staff, C-level)
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://bit.ly/4bJGsuZ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Parler à un expert <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/offre/talent-acquisition-temps-partage"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-background/20 text-background hover:bg-background/10 transition-colors"
          >
            Découvrir l'offre
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

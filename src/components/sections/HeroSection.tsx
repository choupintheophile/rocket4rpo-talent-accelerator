"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-foreground text-background section-padding pt-28 md:pt-36 lg:pt-44">
    <div className="container-wide relative z-10">
      <div className="max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
        >
          {"Vos recrutements ne devraient pas "}
          <span className="text-gradient">freiner votre croissance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl text-background/60 leading-relaxed max-w-3xl"
        >
          {"Rocket4RPO int\u00e8gre des Talent Acquisition Specialists seniors directement dans vos \u00e9quipes. R\u00e9sultat\u00a0: des recrutements 40\u00a0% plus rapides, des profils mieux qualifi\u00e9s, et un co\u00fbt ma\u00eetris\u00e9."}
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
            {"Parler \u00e0 un expert"} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#cas-clients"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-background/20 text-background hover:bg-background/10 transition-colors"
          >
            {"Voir nos r\u00e9sultats"}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center gap-2 text-sm text-background/50"
        >
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span>
            {"D\u00e9j\u00e0 200+ recrutements r\u00e9alis\u00e9s pour des scale-ups Tech en France"}
          </span>
        </motion.div>
      </div>
    </div>
  </section>
);

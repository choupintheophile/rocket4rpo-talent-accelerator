"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export const CTASection = ({
  title = "Vos prochains recrutements méritent mieux qu\u2019un cabinet à 20\u00a0%",
  subtitle = "30 minutes de diagnostic gratuit. Sans engagement. Première shortlist en 48h.",
  ctaLabel = "Réserver mon diagnostic gratuit",
}: Props) => {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container-tight text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://meetings.hubspot.com/theophile-choupin/rpo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-background/40">
            Pas de frais cachés. Pas de relance non souhaitée. Juste des résultats.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  title?: string;
  gradientWord?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export const CTASection = ({
  title = "Prêt à accélérer vos recrutements\u00a0?",
  gradientWord = "accélérer",
  subtitle = "30 minutes de diagnostic gratuit. Sans engagement. Première shortlist en 48h.",
  ctaLabel = "Réserver mon diagnostic gratuit",
}: Props) => {
  return (
    <section className="section-padding bg-rocket-navy-soft text-background">
      <div className="container-tight text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        >
          {gradientWord && title.includes(gradientWord)
            ? <>
                {title.split(gradientWord)[0]}
                <span className="text-gradient">{gradientWord}</span>
                {title.split(gradientWord)[1]}
              </>
            : title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg text-background/85 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://meetings.hubspot.com/theophile-choupin/rpo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-rocket-navy-soft"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Risk reversal */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-sm text-background/70"
        >
          Pas de frais cachés. Pas de relance non souhaitée. Juste des résultats.
        </motion.p>
      </div>
    </section>
  );
};

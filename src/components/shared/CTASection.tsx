"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SplitText } from "@/components/shared/SplitText";

const akaru = [0.165, 0.84, 0.44, 1] as const;

interface Props {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export const CTASection = ({
  title = "Prêt à accélérer vos recrutements\u00a0?",
  subtitle = "30 minutes de diagnostic gratuit. Sans engagement. Première shortlist en 48h.",
  ctaLabel = "Réserver mon diagnostic gratuit",
}: Props) => {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container-tight text-center">
        {/* Title — SplitText with skewY reveal */}
        <SplitText
          text={title}
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        />

        {/* Subtitle — fades in after title */}
        <ScrollReveal delay={0.2}>
          <motion.p
            initial={{ opacity: 0, y: 30, skewY: 1 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: akaru }}
            className="mt-4 text-lg text-background/60 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </ScrollReveal>

        {/* CTA button — btn-reveal hover effect */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://meetings.hubspot.com/theophile-choupin/rpo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: akaru }}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:text-primary-foreground transition-colors overflow-hidden"
              data-cursor
            >
              {/* Btn-reveal background sweep */}
              <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="relative z-10 inline-flex items-center gap-2">
                {ctaLabel}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>
          </div>
        </ScrollReveal>

        {/* Risk reversal — fades in last */}
        <ScrollReveal delay={0.5}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: akaru }}
            className="mt-4 text-sm text-background/40"
          >
            Pas de frais cachés. Pas de relance non souhaitée. Juste des résultats.
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
};

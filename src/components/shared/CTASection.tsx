"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SplitText } from "@/components/shared/SplitText";

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
        <SplitText
          text={title}
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        />
        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://meetings.hubspot.com/theophile-choupin/rpo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reveal inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:text-primary-foreground transition-colors"
              data-cursor
            >
              <span className="inline-flex items-center gap-2">
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <p className="mt-4 text-sm text-background/40">
            Pas de frais cachés. Pas de relance non souhaitée. Juste des résultats.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

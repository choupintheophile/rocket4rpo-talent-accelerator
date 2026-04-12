"use client";

import { ArrowRight } from "lucide-react";

interface Props {
  title?: string;
  gradientWord?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export const CTASection = ({
  title = "Prêt à accélérer vos recrutements\ ?",
  gradientWord = "accélérer",
  subtitle = "30 minutes de diagnostic gratuit. Sans engagement. Première shortlist en 5-7 jours.",
  ctaLabel = "Réserver mon diagnostic gratuit",
}: Props) => {
  return (
    <section className="section-padding bg-rocket-navy-soft text-background">
      <div className="container-tight text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {gradientWord && title.includes(gradientWord)
            ? <>
                {title.split(gradientWord)[0]}
                <span className="text-gradient">{gradientWord}</span>
                {title.split(gradientWord)[1]}
              </>
            : title}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-background/85 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* CTA button */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/rdv"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-rocket-navy-soft"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Risk reversal */}
        <p className="mt-4 text-sm text-background/70">
          Pas de frais cachés. Pas de relance non souhaitée. Juste des résultats.
        </p>
      </div>
    </section>
  );
};

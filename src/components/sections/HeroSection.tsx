"use client";

import { ArrowRight, Calculator, CheckCircle, Clock, Target } from "lucide-react";
import type { HeroContent } from "@/lib/personalization";

const stats = [
  { icon: CheckCircle, value: "200+", label: "recrutements" },
  { icon: Clock, value: "48h", label: "shortlist" },
  { icon: Target, value: "92%", label: "rétention" },
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
    <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-[hsl(var(--rocket-navy-soft))] text-background py-10 md:py-14 lg:py-16">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--rocket-teal)/0.08),transparent_60%)]" />
      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/15 text-primary border border-primary/20">
            {hero.badge}
          </span>

          {/* Headline — no animation, immediately visible */}
          <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight">
            {hero.headline}
            <span className="text-gradient">{hero.highlightedText}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg md:text-xl text-background/85 leading-relaxed max-w-3xl">
            {hero.subtitle}
          </p>

          {/* Stats + CTAs in a row */}
          <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Double CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://meetings.hubspot.com/theophile-choupin/rpo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Réserver un diagnostic gratuit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/calculateur"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg border border-background/20 text-background hover:bg-background/10 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Calculer mes économies
              </a>
            </div>

            {/* Mini stats */}
            <div className="flex gap-6">
              {stats.map((s) => (
                <div key={s.value} className="text-center">
                  <div className="flex items-center gap-1.5">
                    <s.icon className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold">{s.value}</span>
                  </div>
                  <p className="text-xs text-background/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social proof line */}
          <p className="mt-6 text-xs text-background/60">
            Gratuit · 30 min · Sans engagement · Réponse sous 24h
          </p>
        </div>
      </div>
    </section>
  );
};

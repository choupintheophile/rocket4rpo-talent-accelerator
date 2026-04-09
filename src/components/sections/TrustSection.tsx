"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Rocket, TrendingUp, Landmark, Heart, ShoppingCart, Store } from "lucide-react";

const industries = [
  { icon: Rocket, label: "Scale-ups" },
  { icon: Landmark, label: "ETI" },
  { icon: TrendingUp, label: "Startups" },
  { icon: Heart, label: "Grands groupes" },
  { icon: ShoppingCart, label: "PME innovantes" },
  { icon: Store, label: "Entreprises Tech" },
];

const metrics = [
  { target: 200, suffix: "+", label: "recrutements r\u00e9alis\u00e9s tous secteurs" },
  { target: 92, suffix: "%", label: "de r\u00e9tention \u00e0 12 mois (vs 70\u00a0% en moyenne march\u00e9)" },
  { target: 48, suffix: "h", label: "pour recevoir votre premi\u00e8re shortlist qualifi\u00e9e" },
];

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${done ? "scale-110" : ""}`}
      onTransitionEnd={() => setDone(false)}
    >
      {count}
      {suffix}
    </span>
  );
}

export const TrustSection = () => (
  <section className="py-12 md:py-16 border-b border-border">
    <div className="container-wide">
      {/* Section title */}
      <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
        {"Des entreprises comme la v\u00f4tre nous font d\u00e9j\u00e0 confiance"}
      </p>

      {/* Industry badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
        {industries.map((ind, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-muted/50 transition-all duration-200 hover:bg-muted hover:scale-105 hover:shadow-md cursor-default"
          >
            <ind.icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {ind.label}
            </span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {metrics.map((m, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              <AnimatedCounter
                target={m.target}
                suffix={m.suffix}
                duration={2}
              />
            </p>
            <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Heritage line */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {"7 ans d\u2019expertise en recrutement Tech, Sales, Finance, Marketing et fonctions support."}
      </p>

      {/* Separator */}
      <div className="mt-10 border-t border-border" />
    </div>
  </section>
);

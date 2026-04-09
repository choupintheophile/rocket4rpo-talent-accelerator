"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Rocket, TrendingUp, Landmark, Heart, ShoppingCart, Store } from "lucide-react";

const industries = [
  { icon: Rocket, label: "Scale-ups SaaS" },
  { icon: Landmark, label: "Fintech" },
  { icon: TrendingUp, label: "\u00c9diteurs logiciel" },
  { icon: Heart, label: "HealthTech" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Store, label: "Marketplace" },
];

const metrics = [
  { target: 200, suffix: "+", label: "recrutements Sales & Tech" },
  { target: 92, suffix: "%", label: "r\u00e9tention 12 mois" },
  { target: 48, suffix: "h", label: "premi\u00e8re shortlist" },
];

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, Math.max(stepTime, 16));
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
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
        {"Ils nous font confiance"}
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
            <p className="text-3xl md:text-4xl font-bold text-primary">
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
        {"H\u00e9ritier de 7 ans d\u2019expertise Rocket4Sales dans le recrutement commercial Tech"}
      </p>

      {/* Separator */}
      <div className="mt-10 border-t border-border" />
    </div>
  </section>
);

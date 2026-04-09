"use client";

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
  { value: "200+", label: "recrutements Sales & Tech" },
  { value: "92%", label: "r\u00e9tention 12 mois" },
  { value: "48h", label: "premi\u00e8re shortlist" },
];

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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-muted/50 hover:bg-muted transition-colors"
          >
            <ind.icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{ind.label}</span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {metrics.map((m, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">
              {m.value}
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

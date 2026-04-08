"use client";

const logos = Array.from({ length: 7 }, (_, i) => `Client ${i + 1}`);

const metrics = [
  { value: "200+", label: "recrutements" },
  { value: "92%", label: "r\u00e9tention 12 mois" },
  { value: "6 sem.", label: "d\u00e9lai moyen" },
];

export const TrustSection = () => (
  <section className="py-12 md:py-16 border-b border-border">
    <div className="container-wide">
      {/* Client logos row */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
        {logos.map((name, i) => (
          <div
            key={i}
            className="w-28 h-10 rounded-md bg-muted flex items-center justify-center"
          >
            <span className="text-xs text-muted-foreground font-medium">
              Logo {name}
            </span>
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

      {/* Separator */}
      <div className="mt-10 border-t border-border" />
    </div>
  </section>
);

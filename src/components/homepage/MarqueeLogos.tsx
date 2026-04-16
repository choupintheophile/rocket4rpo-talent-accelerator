"use client";

const ITEMS = [
  "SaaS B2B", "Scale-ups", "FinTech", "HealthTech", "PME Tech", "ESN",
  "E-commerce", "Industrie", "DeepTech", "EdTech", "PropTech", "Cybersécurité",
];

/**
 * v26 — Infinite marquee of client sectors.
 * Pure CSS animation, no JS. Duplicated for seamless loop.
 */
export function MarqueeLogos() {
  return (
    <div className="relative overflow-hidden py-6">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 text-sm md:text-base font-medium text-white/20 uppercase tracking-[0.2em] select-none"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

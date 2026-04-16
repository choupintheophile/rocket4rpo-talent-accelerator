"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ORBIT_ITEMS = [
  { label: "SaaS B2B", emoji: "🚀" },
  { label: "Scale-ups", emoji: "📈" },
  { label: "FinTech", emoji: "💳" },
  { label: "HealthTech", emoji: "🏥" },
  { label: "PME Tech", emoji: "💼" },
  { label: "ESN", emoji: "🖥️" },
  { label: "E-commerce", emoji: "🛒" },
  { label: "Industrie", emoji: "⚙️" },
];

/**
 * Logos/badges orbiting around a central counter.
 * Pure CSS animation — no JS physics.
 */
export function OrbitLogos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] mx-auto">
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-white/5" />
      <div className="absolute inset-8 md:inset-12 rounded-full border border-white/5" />
      <div className="absolute inset-16 md:inset-24 rounded-full border border-rocket-teal/10" />

      {/* Orbiting items */}
      {ORBIT_ITEMS.map((item, i) => {
        const angle = (360 / ORBIT_ITEMS.length) * i;
        const duration = 30 + i * 2; // Slightly different speeds
        const radius = 42; // % from center

        return (
          <motion.div
            key={item.label}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(${radius}%) rotate(-${angle}deg)`,
              animation: inView ? `orbit-${i} ${duration}s linear infinite` : "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs md:text-sm font-medium text-white/80 whitespace-nowrap hover:bg-white/10 hover:border-rocket-teal/30 transition-all">
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Central element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            200+
          </div>
          <div className="text-sm md:text-base text-white/50 mt-1 font-medium">
            recrutements
          </div>
        </motion.div>
      </div>

      {/* Orbit keyframes */}
      <style>{`
        ${ORBIT_ITEMS.map(
          (_, i) => `
          @keyframes orbit-${i} {
            from { transform: rotate(${(360 / ORBIT_ITEMS.length) * i}deg) translateX(42%) rotate(-${(360 / ORBIT_ITEMS.length) * i}deg); }
            to { transform: rotate(${(360 / ORBIT_ITEMS.length) * i + 360}deg) translateX(42%) rotate(-${(360 / ORBIT_ITEMS.length) * i + 360}deg); }
          }`,
        ).join("\n")}
      `}</style>
    </div>
  );
}

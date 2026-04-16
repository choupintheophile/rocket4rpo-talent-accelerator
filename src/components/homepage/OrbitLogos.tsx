"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SECTORS = [
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
 * v26.2 — Redesigned orbit: static positioned badges around a central counter.
 * Uses absolute positioning with trigonometry for reliable placement.
 * No CSS @keyframes orbit (was overlapping).
 */
export function OrbitLogos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Container size
  const size = 650; // px (desktop)
  const radius = 270; // px from center

  return (
    <div ref={ref} className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Orbit rings (decorative) */}
      <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
      <div className="absolute inset-[60px] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[130px] rounded-full border border-rocket-teal/[0.08]" />

      {/* Rotating subtle ring */}
      <motion.div
        className="absolute inset-[30px] rounded-full border border-dashed border-white/[0.04]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Sector badges — positioned with trigonometry */}
      {SECTORS.map((sector, i) => {
        const angle = (2 * Math.PI * i) / SECTORS.length - Math.PI / 2; // start from top
        const x = Math.cos(angle) * radius + size / 2;
        const y = Math.sin(angle) * radius + size / 2;

        return (
          <motion.div
            key={sector.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-white/70 whitespace-nowrap hover:bg-white/[0.08] hover:border-rocket-teal/30 hover:text-white transition-all cursor-default select-none">
              <span className="text-base">{sector.emoji}</span>
              <span>{sector.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Central counter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <div
            className="text-7xl md:text-8xl font-bold text-white"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(20,184,166,0.1)",
            }}
          >
            200+
          </div>
          <div className="text-base text-white/40 mt-2 font-medium tracking-wide">
            recrutements signés
          </div>
        </motion.div>
      </div>
    </div>
  );
}

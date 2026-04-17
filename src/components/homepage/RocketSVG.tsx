"use client";

import { motion } from "framer-motion";

interface RocketSVGProps {
  /** 0 = grounded, 1 = launched */
  launchProgress: number;
  className?: string;
}

/**
 * Stylized rocket SVG that launches on scroll or on CTA hover.
 *
 * v24.5.4 — après 3 tentatives CSS inline infructueuses (computed transform
 * restait identity malgré style attribute correct, origine encore non
 * identifiée), on passe sur motion.div avec `animate` prop. Framer Motion
 * utilise l'API Web Animations (WAAPI), ce qui contourne les conflits
 * inline/classes CSS.
 */
export function RocketSVG({ launchProgress, className = "" }: RocketSVGProps) {
  const y = -launchProgress * 600;
  const scale = 1 + launchProgress * 0.3;
  const flameOpacity = 0.3 + launchProgress * 0.7;
  const flameScale = 1 + launchProgress * 2;
  const glowSize = 20 + launchProgress * 60;

  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: `drop-shadow(0 0 ${glowSize}px rgba(20, 184, 166, ${0.3 + launchProgress * 0.5}))`,
        transition: "filter 0.3s ease",
      }}
    >
      <motion.div
        initial={false}
        animate={{ y, scale }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center bottom" }}
      >
      <svg
        width="120"
        height="180"
        viewBox="0 0 120 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-30 md:w-28 md:h-42"
      >
        {/* Body */}
        <path
          d="M60 10 C60 10, 85 50, 85 100 C85 130, 75 145, 60 150 C45 145, 35 130, 35 100 C35 50, 60 10, 60 10Z"
          fill="url(#bodyGrad)"
          stroke="rgba(20, 184, 166, 0.6)"
          strokeWidth="1.5"
        />

        {/* Window */}
        <circle cx="60" cy="70" r="12" fill="url(#windowGrad)" stroke="rgba(20, 184, 166, 0.8)" strokeWidth="1.5" />
        <circle cx="60" cy="70" r="6" fill="rgba(20, 184, 166, 0.3)" />

        {/* Fins */}
        <path d="M35 120 L15 155 L38 140Z" fill="url(#finGrad)" opacity="0.9" />
        <path d="M85 120 L105 155 L82 140Z" fill="url(#finGrad)" opacity="0.9" />

        {/* Nose tip glow */}
        <circle cx="60" cy="15" r="4" fill="rgba(20, 184, 166, 0.8)">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Flame */}
        <g
          style={{
            opacity: flameOpacity,
            transform: `scaleY(${flameScale})`,
            transformOrigin: "60px 150px",
          }}
        >
          <ellipse cx="60" cy="168" rx="14" ry="18" fill="url(#flameGrad)">
            <animate attributeName="rx" values="12;16;12" dur="0.15s" repeatCount="indefinite" />
            <animate attributeName="ry" values="16;22;16" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="165" rx="8" ry="12" fill="rgba(255, 255, 255, 0.8)">
            <animate attributeName="rx" values="6;10;6" dur="0.12s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="bodyGrad" x1="60" y1="10" x2="60" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(160, 84%, 42%)" />
            <stop offset="50%" stopColor="hsl(160, 60%, 25%)" />
            <stop offset="100%" stopColor="hsl(220, 20%, 15%)" />
          </linearGradient>
          <radialGradient id="windowGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="hsl(200, 90%, 70%)" />
            <stop offset="100%" stopColor="hsl(220, 60%, 20%)" />
          </radialGradient>
          <linearGradient id="finGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 84%, 35%)" />
            <stop offset="100%" stopColor="hsl(220, 20%, 12%)" />
          </linearGradient>
          <radialGradient id="flameGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="30%" stopColor="rgba(250, 204, 21, 0.9)" />
            <stop offset="60%" stopColor="rgba(249, 115, 22, 0.8)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
          </radialGradient>
        </defs>
      </svg>
      </motion.div>
    </div>
  );
}

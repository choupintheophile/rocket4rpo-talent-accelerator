"use client";

import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * v26 — Card with interactive glow that follows cursor position.
 * Creates a spotlight effect on hover.
 */
export function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setGlow({ x: 50, y: 50, active: false })}
      className={`relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 ${
        glow.active ? "border-white/20 scale-[1.02]" : ""
      } ${className}`}
      style={{
        background: glow.active
          ? `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(20,184,166,0.08) 0%, transparent 60%)`
          : "rgba(255,255,255,0.03)",
      }}
    >
      {children}
    </div>
  );
}

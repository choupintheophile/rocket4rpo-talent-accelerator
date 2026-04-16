"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

interface StarFieldProps {
  /** 0 = normal, 1 = warp speed */
  warpFactor?: number;
  /** Number of stars */
  count?: number;
  className?: string;
}

/**
 * Animated starfield using Canvas 2D.
 * Lightweight (~3KB), no Three.js dependency.
 * Stars accelerate when warpFactor increases (scroll-linked).
 */
export function StarField({ warpFactor = 0, count = 600, className = "" }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init stars
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: count }, () => {
        const z = Math.random() * 1000;
        return { x: (Math.random() - 0.5) * 2000, y: (Math.random() - 0.5) * 2000, z, pz: z };
      });
    }

    const stars = starsRef.current;
    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;

    let running = true;
    const draw = () => {
      if (!running) return;
      // Full black background (opaque) — never transparent
      ctx.fillStyle = `rgba(0, 0, 0, ${0.15 + (1 - warpFactor) * 0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Speed: normal=1.5 (slow drift), warp=25 (hyperspace)
      const speed = 1.5 + warpFactor * 23;

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = 1000;
          star.pz = 1000;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        // Project
        const sx = (star.x / star.z) * 400 + cx();
        const sy = (star.y / star.z) * 400 + cy();
        const px = (star.x / star.pz) * 400 + cx();
        const py = (star.y / star.pz) * 400 + cy();

        // Size based on closeness
        const size = Math.max(0, (1 - star.z / 1000) * 3);

        // Color: white to teal based on warp
        const brightness = Math.min(255, Math.round((1 - star.z / 1000) * 255));
        const r = Math.round(brightness * (1 - warpFactor * 0.8));
        const g = brightness;
        const b = Math.round(brightness * (1 - warpFactor * 0.5));

        // Draw trail (longer during warp)
        if (warpFactor > 0.1) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + warpFactor * 0.5})`;
          ctx.lineWidth = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }

        // Draw star
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 + (1 - star.z / 1000) * 0.5})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [warpFactor, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

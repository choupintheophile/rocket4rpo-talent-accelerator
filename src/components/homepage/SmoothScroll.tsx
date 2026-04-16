"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * v26 — Smooth scroll provider using Lenis.
 * Creates a buttery-smooth scroll experience (like Awwwards sites).
 * Automatically integrates with framer-motion via RAF.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackRageClick,
} from "@/lib/analytics";

/**
 * v24 — Composant global de tracking comportemental.
 *
 * Injecté une seule fois dans providers.tsx. Gère automatiquement :
 *   - Page view enrichi (UTM params) à chaque navigation
 *   - Scroll depth (25%, 50%, 75%, 100%)
 *   - Time on page (15s, 30s, 60s, 120s, 300s)
 *   - Rage clicks (3+ clics en <800ms sur le même zone)
 */

// Seuils de scroll depth à tracker (%)
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

// Seuils de temps à tracker (secondes)
const TIME_THRESHOLDS = [15, 30, 60, 120, 300];

// Rage click : nombre de clics minimum et fenêtre de temps (ms)
const RAGE_CLICK_COUNT = 3;
const RAGE_CLICK_WINDOW = 800;

export function AnalyticsTracker() {
  const pathname = usePathname();
  const scrollTracked = useRef(new Set<number>());
  const timeTracked = useRef(new Set<number>());
  const clickLog = useRef<{ x: number; y: number; time: number }[]>([]);

  // ── Page view enrichi ─────────────────────────────────────────────
  useEffect(() => {
    trackPageView();
    // Reset trackers on navigation
    scrollTracked.current = new Set();
    timeTracked.current = new Set();
  }, [pathname]);

  // ── Scroll depth tracking ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !scrollTracked.current.has(threshold)) {
          scrollTracked.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    // Throttle scroll events (~100ms)
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // ── Time on page tracking ─────────────────────────────────────────
  useEffect(() => {
    let elapsed = 0;
    const interval = setInterval(() => {
      // Ne compte que si l'onglet est visible
      if (document.visibilityState !== "visible") return;
      elapsed += 1;

      for (const threshold of TIME_THRESHOLDS) {
        if (elapsed >= threshold && !timeTracked.current.has(threshold)) {
          timeTracked.current.add(threshold);
          trackTimeOnPage(threshold);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pathname]);

  // ── Rage click detection ──────────────────────────────────────────
  const handleClick = useCallback((e: MouseEvent) => {
    const now = Date.now();
    const entry = { x: e.clientX, y: e.clientY, time: now };

    // Garde seulement les clics récents
    clickLog.current = clickLog.current
      .filter((c) => now - c.time < RAGE_CLICK_WINDOW)
      .concat(entry);

    // Détecte rage click : N+ clics proches dans la fenêtre
    if (clickLog.current.length >= RAGE_CLICK_COUNT) {
      const recent = clickLog.current.slice(-RAGE_CLICK_COUNT);
      // Vérifie que tous les clics sont dans un rayon de 50px
      const first = recent[0];
      const allClose = recent.every(
        (c) => Math.abs(c.x - first.x) < 50 && Math.abs(c.y - first.y) < 50,
      );

      if (allClose) {
        // Identifie l'élément cliqué
        const target = e.target as HTMLElement;
        const tag = target.tagName?.toLowerCase() || "unknown";
        const text = target.textContent?.slice(0, 30) || "";
        const cls = target.className?.toString().slice(0, 50) || "";
        trackRageClick(`${tag}[${cls}] "${text}"`);
        // Reset pour ne pas spammer
        clickLog.current = [];
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  // Ce composant ne rend rien visuellement
  return null;
}

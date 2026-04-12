"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EXCLUDED_PATHS = ["/contact", "/calculateur"];
const SCROLL_THRESHOLD = 300;

export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const isExcluded = EXCLUDED_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isExcluded) return;

    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExcluded]);

  if (isExcluded) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-background/95 backdrop-blur-lg border-t border-border px-4 py-2 flex items-center gap-2 h-14"
          >
            <a
              href="/rdv"
              className="flex-1 inline-flex items-center justify-center h-10 px-4 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Diagnostic gratuit
            </a>
            <Link
              href="/calculateur"
              className="flex-1 inline-flex items-center justify-center h-10 px-4 text-sm font-semibold rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Calculer ROI
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HUBSPOT = "/rdv";

const mainLinks = [
  { href: "/offre", label: "Notre offre" },
  { href: "/outils", label: "Nos simulateurs" },
  { href: "/ressources", label: "Nos outils" },
  { href: "/blog", label: "Nos conseils" },
];

const rightLinks = [
  { href: "/recrutement", label: "Postuler" },
  { href: "/webapp-testing", label: "Se connecter" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => path !== "#" && pathname.startsWith(path);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_3px_0_rgb(0_0_0/0.02)]">
      <div className="container-wide flex items-center justify-between h-20 lg:h-24">
        <Link href="/" onClick={scrollTop} className="flex items-center">
          <Image src="/logo-rocket4rpo.webp" alt="Rocket4RPO — Accueil" width={384} height={256} sizes="(max-width: 1024px) 160px, 200px" className="h-28 lg:h-32 w-auto" priority />
        </Link>

        {/* Desktop nav — liens principaux */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            href="/rdv"
            onClick={scrollTop}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Nos talents
          </Link>
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={scrollTop}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isActive(l.href) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop nav — liens secondaires */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/recrutement"
            onClick={scrollTop}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-border/60 text-foreground/70 hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Postuler
          </Link>
          <Link
            href="/webapp-testing"
            onClick={scrollTop}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-foreground/[0.06] border border-border/40 text-foreground/80 hover:text-foreground hover:bg-foreground/[0.1] hover:border-primary/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Se connecter
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container-wide py-4 space-y-1">
              <div className="px-3 pb-3">
                <Link
                  href="/rdv"
                  onClick={() => { setMobileOpen(false); scrollTop(); }}
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground"
                >
                  Nos talents
                </Link>
              </div>
              <div className="border-t border-border my-2" />
              {mainLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => { setMobileOpen(false); scrollTop(); }} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              {rightLinks.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => { setMobileOpen(false); scrollTop(); }} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

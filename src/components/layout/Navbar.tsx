"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const mainLinks = [
  { href: "/offre", label: "Notre offre" },
  { href: "/outils", label: "Outils" },
  { href: "/blog", label: "Blog" },
  { href: "/ressources", label: "Ressources" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-wide flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center">
          <Image src="/logo-rocket4rpo.webp" alt="Rocket4RPO — Talent Acquisition RPO pour entreprises Tech" width={384} height={256} className="h-20 lg:h-24 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive(l.href) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/recrutement" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Nous rejoindre
          </Link>
          <a
            href="https://meetings.hubspot.com/theophile-choupin/rpo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Parler à un expert
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
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
              {mainLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <Link href="/recrutement" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                Nous rejoindre
              </Link>
              <div className="pt-2 px-3">
                <a
                  href="https://meetings.hubspot.com/theophile-choupin/rpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground"
                >
                  Parler à un expert
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

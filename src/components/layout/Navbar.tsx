import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logoRocket4RPO from "@/assets/logo-rocket4rpo.png";
import { motion, AnimatePresence } from "framer-motion";

const offerLinks = [
  { to: "/offre/talent-acquisition-temps-partage", label: "TA temps partagé" },
  { to: "/offre/talent-acquisition-temps-plein", label: "TA temps plein" },
  { to: "/offre/recrutement-talent-acquisition", label: "Recrutement de TA" },
  { to: "/offre/outils-sourcing-enablement", label: "Outils & enablement" },
];

const industryLinks = [
  { to: "/metiers/recrutement-sales", label: "Sales" },
  { to: "/metiers/recrutement-it", label: "IT / Tech" },
  { to: "/metiers/recrutement-finance", label: "Finance" },
  { to: "/metiers/recrutement-marketing", label: "Marketing" },
  { to: "/metiers/recrutement-support", label: "Support" },
];

const mainLinks = [
  { to: "/cas-clients", label: "Cas clients" },
  { to: "/blog", label: "Blog" },
  { to: "/equipe", label: "Équipe" },
  { to: "/rocket4gtm", label: "Rocket4GTM" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-wide flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center">
          <img src={logoRocket4RPO} alt="Rocket4RPO" className="h-24 lg:h-30 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen("offre")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${isActive("/offre") ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
              Offre <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {dropdownOpen === "offre" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 w-64 bg-card border border-border rounded-lg shadow-xl p-2 mt-1"
                >
                  {offerLinks.map((l) => (
                    <Link key={l.to} to={l.to} className="block px-3 py-2.5 text-sm rounded-md hover:bg-secondary transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen("metiers")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${isActive("/metiers") ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
              Métiers <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {dropdownOpen === "metiers" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 w-56 bg-card border border-border rounded-lg shadow-xl p-2 mt-1"
                >
                  {industryLinks.map((l) => (
                    <Link key={l.to} to={l.to} className="block px-3 py-2.5 text-sm rounded-md hover:bg-secondary transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive(l.to) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/recrutement" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Nous rejoindre
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Parler à un expert
          </Link>
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
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-2 pb-1">Offre</p>
              {offerLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-4 pb-1">Métiers</p>
              {industryLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              {mainLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <Link to="/recrutement" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm rounded-md hover:bg-secondary">
                Nous rejoindre
              </Link>
              <div className="pt-2 px-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground"
                >
                  Parler à un expert
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

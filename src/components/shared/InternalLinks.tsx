import Link from "next/link";
import { Calculator, ClipboardCheck, Play, GitCompare, FileText, BookOpen, ArrowRight, HelpCircle, Coins, Library } from "lucide-react";

const ALL_LINKS = [
  { href: "/calculateur", label: "Calculateur ROI RPO", desc: "Estimez vos économies en passant au RPO", icon: Calculator, color: "text-emerald-400" },
  { href: "/assessment", label: "Diagnostic recrutement", desc: "Évaluez la maturité de votre Talent Acquisition", icon: ClipboardCheck, color: "text-blue-400" },
  { href: "/demo", label: "Démo interactive", desc: "Simulez un recrutement RPO en temps réel", icon: Play, color: "text-violet-400" },
  { href: "/rpo-vs-cabinet", label: "RPO vs Cabinet", desc: "Comparez les modèles de recrutement", icon: GitCompare, color: "text-amber-400" },
  { href: "/rpo-vs-interim", label: "RPO vs Intérim", desc: "Quel modèle choisir pour vos recrutements ?", icon: GitCompare, color: "text-orange-400" },
  { href: "/rpo-vs-recrutement-interne", label: "RPO vs Interne", desc: "Externaliser ou recruter en interne ?", icon: GitCompare, color: "text-rose-400" },
  { href: "/offre", label: "Notre offre RPO", desc: "TA intégrés à vos équipes en 1 semaine", icon: FileText, color: "text-teal-400" },
  { href: "/blog", label: "Blog & conseils", desc: "Articles et bonnes pratiques recrutement", icon: BookOpen, color: "text-cyan-400" },
  { href: "/ressources", label: "Guides & templates", desc: "Ressources gratuites à télécharger", icon: FileText, color: "text-indigo-400" },
  // v22.3 — Pages piliers SEO (ajoutées au pool d'internal links)
  { href: "/qu-est-ce-que-le-rpo", label: "Qu'est-ce que le RPO ?", desc: "Guide complet : définition, fonctionnement, avantages", icon: HelpCircle, color: "text-sky-400" },
  { href: "/combien-coute-un-rpo", label: "Combien coûte un RPO ?", desc: "Tarifs détaillés et calcul du ROI", icon: Coins, color: "text-yellow-400" },
  { href: "/glossaire-rpo", label: "Glossaire RPO", desc: "15 termes essentiels du recrutement", icon: Library, color: "text-fuchsia-400" },
] as const;

interface InternalLinksProps {
  /** Current page path — will be excluded from the list */
  currentPath: string;
  /** Title of the section */
  title?: string;
  /** Max number of links to show */
  max?: number;
  /** Specific paths to show (if not set, shows all except currentPath) */
  paths?: string[];
}

export function InternalLinks({ currentPath, title = "À découvrir aussi", max = 4, paths }: InternalLinksProps) {
  let links = ALL_LINKS.filter((l) => l.href !== currentPath);

  if (paths) {
    links = links.filter((l) => paths.includes(l.href));
  }

  links = links.slice(0, max);

  if (links.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container-wide">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <link.icon className={`w-5 h-5 ${link.color} mb-3`} />
              <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                {link.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{link.desc}</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary/70 group-hover:text-primary transition-colors">
                Découvrir <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, ArrowRight, Linkedin } from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

export const Footer = () => (
  <footer className="bg-foreground text-background">
    {/* Gradient border top */}
    <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    {/* CTA Banner */}
    <div className="container-wide pt-16 pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-xl bg-background/5 border border-background/10">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display">Prêt à accélérer vos recrutements ?</h3>
          <p className="mt-1 text-sm text-background/70">30 min de diagnostic gratuit. Sans engagement.</p>
        </div>
        <a
          href={HUBSPOT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
        >
          Parler à un expert <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>

    {/* Main grid */}
    <div className="container-wide pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center">
            <Image src="/logo-rocket4rpo-white.webp" alt="Rocket4RPO" width={384} height={256} sizes="(max-width: 768px) 120px, 144px" className="h-28 md:h-32 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-background/70 leading-relaxed max-w-xs">
            Talent Acquisition Specialists intégrés à vos équipes pour recruter mieux, plus vite et moins cher.
          </p>
          <div className="mt-5 space-y-2 text-xs text-background/60">
            <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> 22 rue de l&apos;Échiquier, 75010 Paris</p>
            <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> 70 cours Tolstoï, 69100 Villeurbanne</p>
            <p className="flex items-start gap-2"><Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" /> contact@rocket4rpo.com</p>
          </div>
        </div>

        {/* Découvrir */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-5 text-background/90">Découvrir</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/offre" className="hover:text-primary transition-colors">Notre offre RPO</Link></li>
            <li><a href={HUBSPOT} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Parler à un expert</a></li>
            <li><Link href="/recrutement" className="hover:text-primary transition-colors">Devenir freelance TA</Link></li>
            <li><Link href="/rocket4gtm" className="hover:text-primary transition-colors">Le groupe Rocket4GTM</Link></li>
          </ul>
        </div>

        {/* Outils & Ressources */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-5 text-background/90">Outils & Ressources</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/outils" className="hover:text-primary transition-colors">Nos simulateurs</Link></li>
            <li><Link href="/ressources" className="hover:text-primary transition-colors">Guides & templates</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & conseils</Link></li>
            <li><Link href="/comparateur" className="hover:text-primary transition-colors">RPO vs Cabinet vs Interne</Link></li>
            <li><Link href="/rpo-vs-cabinet" className="hover:text-primary transition-colors">RPO vs Cabinet</Link></li>
            <li><Link href="/rpo-vs-interim" className="hover:text-primary transition-colors">RPO vs Intérim</Link></li>
            <li><Link href="/rpo-vs-recrutement-interne" className="hover:text-primary transition-colors">RPO vs Recrutement interne</Link></li>
            <li><Link href="/demo" className="hover:text-primary transition-colors">Démo</Link></li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-5 text-background/90">Légal</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link></li>
            <li><Link href="/cgu" className="hover:text-primary transition-colors">CGU</Link></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-background/10">
      <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-background/50">
          © {new Date().getFullYear()} Rocket4RPO — Filiale de{" "}
          <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Rocket4Sales</a>
          {" "}· Groupe Rocket4GTM
        </p>
        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/company/rocket4rpo" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-primary transition-colors" aria-label="LinkedIn Rocket4RPO">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-primary transition-colors text-xs">
            Rocket4Sales
          </a>
          <Link href="/sitemap.xml" className="text-background/50 hover:text-primary transition-colors text-xs">
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

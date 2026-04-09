import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container-wide section-padding">
      {/* Main grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Brand + addresses */}
        <div className="col-span-2 mb-4 lg:mb-0">
          <Link href="/" className="flex items-center">
            <Image src="/logo-rocket4rpo-white.webp" alt="Rocket4RPO — experts Talent Acquisition intégrés" width={384} height={256} className="h-10 md:h-12 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-background/60 leading-relaxed max-w-xs">
            Talent Acquisition experts intégrés à vos équipes pour accélérer vos recrutements.
          </p>
          <div className="mt-4 space-y-2 text-xs text-background/40">
            <p className="flex items-start gap-1.5"><MapPin className="w-3 h-3 mt-0.5 shrink-0" /> 22 rue de l&apos;Échiquier, 75010 Paris</p>
            <p className="flex items-start gap-1.5"><MapPin className="w-3 h-3 mt-0.5 shrink-0" /> 70 cours Tolstoï, 69100 Villeurbanne</p>
          </div>
          <p className="mt-3 text-xs text-background/40">
            Filiale de <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">Rocket4Sales</a> · Groupe Rocket4GTM
          </p>
        </div>

        {/* Offre */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Offre</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link href="/offre/talent-acquisition-temps-partage" className="hover:text-primary transition-colors">TA temps partagé</Link></li>
            <li><Link href="/offre/talent-acquisition-temps-plein" className="hover:text-primary transition-colors">TA temps plein</Link></li>
            <li><Link href="/offre/recrutement-talent-acquisition" className="hover:text-primary transition-colors">Recrutement de TA</Link></li>
            <li><Link href="/offre/outils-sourcing-enablement" className="hover:text-primary transition-colors">Outils & enablement</Link></li>
          </ul>
        </div>

        {/* Ressources */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Ressources</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link href="/comparateur" className="hover:text-primary transition-colors">Comparateur RPO</Link></li>
            <li><Link href="/calculateur" className="hover:text-primary transition-colors">Calculateur ROI</Link></li>
            <li><Link href="/demo" className="hover:text-primary transition-colors">Démo interactive</Link></li>
            <li><Link href="/assessment" className="hover:text-primary transition-colors">Diagnostic recrutement</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/ressources" className="hover:text-primary transition-colors">Guides & templates</Link></li>
          </ul>
        </div>

        {/* Contact + Legal */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
            <li><Link href="/recrutement" className="hover:text-primary transition-colors">Nous rejoindre</Link></li>
          </ul>
          <h4 className="font-semibold text-sm mb-4 mt-6">Légal</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link></li>
            <li><Link href="/cgu" className="hover:text-primary transition-colors">CGU</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-background/40">© {new Date().getFullYear()} Rocket4RPO. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/company/rocket4rpo" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-primary transition-colors text-sm">
            LinkedIn
          </a>
          <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-primary transition-colors text-sm">
            Rocket4Sales
          </a>
          <Link href="/sitemap.xml" className="text-background/40 hover:text-primary transition-colors text-sm">
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

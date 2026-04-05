import { Link } from "react-router-dom";
import logoRocket4RPO from "@/assets/logo-rocket4rpo-white.webp";

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container-wide section-padding">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
          <Link to="/" className="flex items-center">
            <img src={logoRocket4RPO} alt="Rocket4RPO" className="h-36 md:h-[11.25rem] w-auto" />
          </Link>
          <p className="mt-4 text-sm text-background/60 leading-relaxed max-w-xs">
            Talent Acquisition experts intégrés à vos équipes pour accélérer vos recrutements.
          </p>
          <p className="mt-4 text-xs text-background/40">
            Filiale de <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">Rocket4Sales</a> · Groupe Rocket4GTM
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Offre</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/offre/talent-acquisition-temps-partage" className="hover:text-primary transition-colors">Talent Acquisition à temps partagé</Link></li>
            <li><Link to="/offre/talent-acquisition-temps-plein" className="hover:text-primary transition-colors">Talent Acquisition à temps plein</Link></li>
            <li><Link to="/offre/recrutement-talent-acquisition" className="hover:text-primary transition-colors">Recrutement de Recruteurs</Link></li>
            <li><Link to="/offre/outils-sourcing-enablement" className="hover:text-primary transition-colors">Outils & enablement</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Métiers</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/metiers/recrutement-sales" className="hover:text-primary transition-colors">Sales</Link></li>
            <li><Link to="/metiers/recrutement-it" className="hover:text-primary transition-colors">IT / Tech</Link></li>
            <li><Link to="/metiers/recrutement-finance" className="hover:text-primary transition-colors">Finance</Link></li>
            <li><Link to="/metiers/recrutement-marketing" className="hover:text-primary transition-colors">Marketing</Link></li>
            <li><Link to="/metiers/recrutement-support" className="hover:text-primary transition-colors">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Ressources</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/cas-clients" className="hover:text-primary transition-colors">Cas clients</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/equipe" className="hover:text-primary transition-colors">Équipe</Link></li>
            <li><Link to="/rocket4gtm" className="hover:text-primary transition-colors">Rocket4GTM</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
            <li><Link to="/recrutement" className="hover:text-primary transition-colors">Nous rejoindre</Link></li>
          </ul>
          <h4 className="font-semibold text-sm mb-4 mt-6">Légal</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link></li>
            <li><Link to="/politique-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link></li>
            <li><Link to="/cgu" className="hover:text-primary transition-colors">CGU</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-background/40">© {new Date().getFullYear()} Rocket4RPO. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/company/rocket4rpo" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-primary transition-colors text-sm">
            LinkedIn
          </a>
          <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-primary transition-colors text-sm">
            Rocket4Sales
          </a>
        </div>
      </div>
    </div>
  </footer>
);

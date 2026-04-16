"use client";

import Link from "next/link";
import { trackFooterLinkClick } from "@/lib/analytics";
import Image from "next/image";
import { MapPin, Mail, ArrowRight, Linkedin } from "lucide-react";

const HUBSPOT = "/rdv";

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
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
            <li><Link href="/offre" onClick={() => trackFooterLinkClick("Notre offre RPO", "/offre")} className="hover:text-primary transition-colors">Notre offre RPO</Link></li>
            <li><Link href="/a-propos" onClick={() => trackFooterLinkClick("À propos", "/a-propos")} className="hover:text-primary transition-colors">À propos</Link></li>
            <li><Link href="/rdv" onClick={() => trackFooterLinkClick("Parler à un expert", "/rdv")} className="hover:text-primary transition-colors">Parler à un expert</Link></li>
            <li><Link href="/contact" onClick={() => trackFooterLinkClick("Nous contacter", "/contact")} className="hover:text-primary transition-colors">Nous contacter</Link></li>
            <li><Link href="/recrutement" onClick={() => trackFooterLinkClick("Devenir freelance TA", "/recrutement")} className="hover:text-primary transition-colors">Devenir freelance TA</Link></li>
            <li><Link href="/rocket4gtm" onClick={() => trackFooterLinkClick("Le groupe Rocket4GTM", "/rocket4gtm")} className="hover:text-primary transition-colors">Le groupe Rocket4GTM</Link></li>
          </ul>
        </div>

        {/* Guides RPO — pages piliers SEO */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-5 text-background/90">Guides RPO</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/qu-est-ce-que-le-rpo" onClick={() => trackFooterLinkClick("Qu'est-ce que le RPO ?", "/qu-est-ce-que-le-rpo")} className="hover:text-primary transition-colors">Qu&apos;est-ce que le RPO ?</Link></li>
            <li><Link href="/combien-coute-un-rpo" onClick={() => trackFooterLinkClick("Combien coûte un RPO ?", "/combien-coute-un-rpo")} className="hover:text-primary transition-colors">Combien coûte un RPO ?</Link></li>
            <li><Link href="/glossaire-rpo" onClick={() => trackFooterLinkClick("Glossaire RPO", "/glossaire-rpo")} className="hover:text-primary transition-colors">Glossaire RPO</Link></li>
            <li><Link href="/blog" onClick={() => trackFooterLinkClick("Blog & conseils", "/blog")} className="hover:text-primary transition-colors">Blog & conseils</Link></li>
            <li><Link href="/ressources" onClick={() => trackFooterLinkClick("Guides & templates", "/ressources")} className="hover:text-primary transition-colors">Guides & templates</Link></li>
          </ul>
        </div>

        {/* Outils gratuits */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-5 text-background/90">Outils gratuits</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/calculateur" onClick={() => trackFooterLinkClick("Calculateur ROI RPO", "/calculateur")} className="hover:text-primary transition-colors">Calculateur ROI RPO</Link></li>
            <li><Link href="/assessment" onClick={() => trackFooterLinkClick("Diagnostic recrutement", "/assessment")} className="hover:text-primary transition-colors">Diagnostic recrutement</Link></li>
            <li><Link href="/demo" onClick={() => trackFooterLinkClick("Démo interactive", "/demo")} className="hover:text-primary transition-colors">Démo interactive</Link></li>
            <li><Link href="/simulateurs" onClick={() => trackFooterLinkClick("Tous les simulateurs", "/simulateurs")} className="hover:text-primary transition-colors">Tous les simulateurs</Link></li>
          </ul>
        </div>

        {/* Comparer */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-5 text-background/90">Comparer</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/comparateur" onClick={() => trackFooterLinkClick("RPO vs Cabinet vs Interne", "/comparateur")} className="hover:text-primary transition-colors">RPO vs Cabinet vs Interne</Link></li>
            <li><Link href="/rpo-vs-cabinet" onClick={() => trackFooterLinkClick("RPO vs Cabinet", "/rpo-vs-cabinet")} className="hover:text-primary transition-colors">RPO vs Cabinet</Link></li>
            <li><Link href="/rpo-vs-interim" onClick={() => trackFooterLinkClick("RPO vs Intérim", "/rpo-vs-interim")} className="hover:text-primary transition-colors">RPO vs Intérim</Link></li>
            <li><Link href="/rpo-vs-recrutement-interne" onClick={() => trackFooterLinkClick("RPO vs Recrutement interne", "/rpo-vs-recrutement-interne")} className="hover:text-primary transition-colors">RPO vs Recrutement interne</Link></li>
          </ul>
          <h4 className="font-display text-sm font-semibold mb-4 mt-8 text-background/90">Légal</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link href="/mentions-legales" onClick={() => trackFooterLinkClick("Mentions légales", "/mentions-legales")} className="hover:text-primary transition-colors">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite" onClick={() => trackFooterLinkClick("Confidentialité", "/politique-confidentialite")} className="hover:text-primary transition-colors">Confidentialité</Link></li>
            <li><Link href="/cgu" onClick={() => trackFooterLinkClick("CGU", "/cgu")} className="hover:text-primary transition-colors">CGU</Link></li>
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
          <Link href="/sitemap.xml" onClick={() => trackFooterLinkClick("Sitemap", "/sitemap.xml")} className="text-background/50 hover:text-primary transition-colors text-xs">
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

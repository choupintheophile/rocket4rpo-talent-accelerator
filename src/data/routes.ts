export interface SitemapRoute {
  path: string;
  label: string;
  category: string;
  priority?: number;
}

export const sitemapRoutes: SitemapRoute[] = [
  { path: "/", label: "Accueil", category: "Principal", priority: 1.0 },
  { path: "/offre/talent-acquisition-temps-partage", label: "Talent Acquisition à temps partagé", category: "Offre", priority: 0.9 },
  { path: "/offre/talent-acquisition-temps-plein", label: "Talent Acquisition à temps plein", category: "Offre", priority: 0.9 },
  { path: "/offre/recrutement-talent-acquisition", label: "Recrutement de Talent Acquisition", category: "Offre", priority: 0.9 },
  { path: "/offre/outils-sourcing-enablement", label: "Outils de sourcing & Enablement", category: "Offre", priority: 0.9 },
  { path: "/metiers/recrutement-sales", label: "Recrutement Sales", category: "Métiers", priority: 0.8 },
  { path: "/metiers/recrutement-it", label: "Recrutement IT & Tech", category: "Métiers", priority: 0.8 },
  { path: "/metiers/recrutement-finance", label: "Recrutement Finance", category: "Métiers", priority: 0.8 },
  { path: "/metiers/recrutement-marketing", label: "Recrutement Marketing", category: "Métiers", priority: 0.8 },
  { path: "/metiers/recrutement-support", label: "Recrutement fonctions support", category: "Métiers", priority: 0.8 },
  { path: "/cas-clients", label: "Cas clients", category: "Ressources", priority: 0.7 },
  { path: "/blog", label: "Blog", category: "Ressources", priority: 0.7 },
  { path: "/equipe", label: "Équipe", category: "Ressources", priority: 0.7 },
  { path: "/rocket4gtm", label: "Rocket4GTM", category: "Ressources", priority: 0.6 },
  { path: "/comparateur", label: "Comparateur RPO vs Cabinet vs Interne", category: "Ressources", priority: 0.8 },
  { path: "/calculateur", label: "Calculateur ROI RPO", category: "Ressources", priority: 0.7 },
  { path: "/assessment", label: "Diagnostic recrutement", category: "Ressources", priority: 0.7 },
  { path: "/contact", label: "Nous contacter", category: "Contact", priority: 0.7 },
  { path: "/recrutement", label: "Nous rejoindre", category: "Contact", priority: 0.7 },
];

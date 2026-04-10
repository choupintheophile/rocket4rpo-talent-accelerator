export interface SitemapRoute {
  path: string;
  label: string;
  category: string;
  priority?: number;
}

export const sitemapRoutes: SitemapRoute[] = [
  { path: "/", label: "Accueil", category: "Principal", priority: 1.0 },
  { path: "/offre/rpo", label: "RPO — Recruteur intégré à votre équipe", category: "Offre", priority: 0.9 },
  { path: "/offre/recrutement-ta", label: "Recrutez votre futur Talent Acquisition", category: "Offre", priority: 0.9 },
  { path: "/offre/audit-recrutement", label: "Audit & structuration de votre recrutement", category: "Offre", priority: 0.9 },
  { path: "/blog", label: "Blog", category: "Ressources", priority: 0.7 },
  { path: "/rocket4gtm", label: "Rocket4GTM", category: "Ressources", priority: 0.6 },
  { path: "/comparateur", label: "Comparateur RPO vs Cabinet vs Interne", category: "Ressources", priority: 0.8 },
  { path: "/rpo-vs-cabinet", label: "RPO vs Cabinet de recrutement", category: "Comparatifs", priority: 0.8 },
  { path: "/rpo-vs-recrutement-interne", label: "RPO vs Recrutement interne", category: "Comparatifs", priority: 0.8 },
  { path: "/rpo-vs-interim", label: "RPO vs Intérim", category: "Comparatifs", priority: 0.8 },
  { path: "/calculateur", label: "Calculateur ROI RPO", category: "Ressources", priority: 0.7 },
  { path: "/assessment", label: "Diagnostic recrutement", category: "Ressources", priority: 0.7 },
  { path: "/ressources", label: "Ressources", category: "Ressources", priority: 0.7 },
  { path: "/demo", label: "Démo interactive RPO", category: "Ressources", priority: 0.7 },
  { path: "/contact", label: "Nous contacter", category: "Contact", priority: 0.7 },
  { path: "/recrutement", label: "Nous rejoindre", category: "Contact", priority: 0.7 },
];

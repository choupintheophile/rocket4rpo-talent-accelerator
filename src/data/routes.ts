export interface SitemapRoute {
  path: string;
  label: string;
  category: string;
  priority?: number;
}

export const sitemapRoutes: SitemapRoute[] = [
  { path: "/", label: "Accueil", category: "Principal", priority: 1.0 },
  { path: "/offre", label: "Notre offre RPO", category: "Offre", priority: 0.9 },
  { path: "/simulateurs", label: "Outils RPO gratuits", category: "Ressources", priority: 0.8 },
  { path: "/blog", label: "Blog", category: "Ressources", priority: 0.7 },
  { path: "/comparateur", label: "Comparateur RPO vs Cabinet vs Interne", category: "Ressources", priority: 0.8 },
  { path: "/rpo-vs-cabinet", label: "RPO vs Cabinet de recrutement", category: "Comparatifs", priority: 0.8 },
  { path: "/rpo-vs-recrutement-interne", label: "RPO vs Recrutement interne", category: "Comparatifs", priority: 0.8 },
  { path: "/rpo-vs-interim", label: "RPO vs Intérim", category: "Comparatifs", priority: 0.8 },
  { path: "/calculateur", label: "Calculateur ROI RPO", category: "Ressources", priority: 0.8 },
  { path: "/assessment", label: "Diagnostic recrutement", category: "Ressources", priority: 0.8 },
  { path: "/ressources", label: "Ressources", category: "Ressources", priority: 0.7 },
  { path: "/demo", label: "Démo interactive RPO", category: "Ressources", priority: 0.7 },
  { path: "/contact", label: "Nous contacter", category: "Contact", priority: 0.7 },
  { path: "/recrutement", label: "Nous rejoindre", category: "Contact", priority: 0.7 },
  { path: "/rocket4gtm", label: "Rocket4GTM", category: "Ressources", priority: 0.6 },
  { path: "/qu-est-ce-que-le-rpo", label: "Qu'est-ce que le RPO", category: "Ressources", priority: 0.9 },
  { path: "/combien-coute-un-rpo", label: "Combien coûte un RPO", category: "Ressources", priority: 0.9 },
  { path: "/a-propos", label: "À propos", category: "Principal", priority: 0.8 },
  { path: "/glossaire-rpo", label: "Glossaire RPO", category: "Ressources", priority: 0.7 },
];

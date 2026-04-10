import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Old offer subpages → single offer page
      { source: "/offre/rpo", destination: "/offre", permanent: true },
      { source: "/offre/recrutement-ta", destination: "/offre", permanent: true },
      { source: "/offre/audit-recrutement", destination: "/offre", permanent: true },
      { source: "/offre/talent-acquisition-temps-partage", destination: "/offre", permanent: true },
      { source: "/offre/talent-acquisition-temps-plein", destination: "/offre", permanent: true },
      { source: "/offre/recrutement-talent-acquisition", destination: "/offre", permanent: true },
      { source: "/offre/outils-sourcing-enablement", destination: "/offre", permanent: true },
      // Legacy short URLs
      { source: "/rpo-temps-partage", destination: "/offre", permanent: true },
      { source: "/rpo-temps-plein", destination: "/offre", permanent: true },
      { source: "/recrutement-tech-startup", destination: "/offre", permanent: true },
    ];
  },
};

export default nextConfig;

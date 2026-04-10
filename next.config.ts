import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Old offer pages → new structure
      {
        source: "/offre/talent-acquisition-temps-partage",
        destination: "/offre/rpo",
        permanent: true,
      },
      {
        source: "/offre/talent-acquisition-temps-plein",
        destination: "/offre/rpo",
        permanent: true,
      },
      {
        source: "/offre/recrutement-talent-acquisition",
        destination: "/offre/recrutement-ta",
        permanent: true,
      },
      {
        source: "/offre/outils-sourcing-enablement",
        destination: "/offre/audit-recrutement",
        permanent: true,
      },
      // Legacy short URLs
      {
        source: "/rpo-temps-partage",
        destination: "/offre/rpo",
        permanent: true,
      },
      {
        source: "/rpo-temps-plein",
        destination: "/offre/rpo",
        permanent: true,
      },
      {
        source: "/recrutement-tech-startup",
        destination: "/metiers/recrutement-it",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

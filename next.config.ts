import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/rpo-temps-partage",
        destination: "/offre/talent-acquisition-temps-partage",
        permanent: true,
      },
      {
        source: "/rpo-temps-plein",
        destination: "/offre/talent-acquisition-temps-plein",
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/offre/rpo", destination: "/offre", permanent: true },
      { source: "/offre/recrutement-ta", destination: "/offre", permanent: true },
      { source: "/offre/audit-recrutement", destination: "/offre", permanent: true },
      { source: "/offre/talent-acquisition-temps-partage", destination: "/offre", permanent: true },
      { source: "/offre/talent-acquisition-temps-plein", destination: "/offre", permanent: true },
      { source: "/offre/recrutement-talent-acquisition", destination: "/offre", permanent: true },
      { source: "/offre/outils-sourcing-enablement", destination: "/offre", permanent: true },
      { source: "/rpo-temps-partage", destination: "/offre", permanent: true },
      { source: "/rpo-temps-plein", destination: "/offre", permanent: true },
      { source: "/recrutement-tech-startup", destination: "/offre", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

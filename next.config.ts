import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // v23.6 — AVIF en priorité puis WebP, fallback JPEG/PNG automatique.
    // Next négocie via Accept header : -30 à -50% de poids vs JPEG sur navigateurs modernes.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
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
      // Rename /outils → /simulateurs
      { source: "/outils", destination: "/simulateurs", permanent: true },
      // Outils retirés / fusionnés
      { source: "/outils/diagnostic-ta", destination: "/assessment", permanent: true },
      { source: "/outils/tjm-freelance", destination: "/ressources", permanent: true },
      { source: "/outils/cout-recrutement-rate", destination: "/calculateur", permanent: true },
      // Fix 404 from old site / external links
      { source: "/metiers/recrutement-it", destination: "/offre", permanent: true },
      { source: "/metiers/:slug*", destination: "/offre", permanent: true },
      { source: "/cas-clients", destination: "/offre", permanent: true },
      { source: "/cas-clients/:slug*", destination: "/offre", permanent: true },
      { source: "/equipe", destination: "/recrutement", permanent: true },
      // /a-propos : désormais une vraie page dédiée — redirect retiré.
      { source: "/about", destination: "/a-propos", permanent: true },
      { source: "/pricing", destination: "/offre", permanent: true },
      { source: "/tarifs", destination: "/offre", permanent: true },
      { source: "/services", destination: "/offre", permanent: true },
      { source: "/services/:slug*", destination: "/offre", permanent: true },
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
      // v23.6 — Cache long pour les assets statiques (PDFs, logos, favicon)
      // Ces fichiers sont immuables entre les deploys → 1 an + immutable.
      {
        source: "/resources/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:file(favicon\\.ico|favicon\\.svg|favicon-32x32\\.png|logo-rocket4rpo.*\\.webp|og-default\\.(?:png|svg))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

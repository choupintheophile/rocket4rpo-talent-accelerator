import { ogImage, OG_SIZE } from "@/lib/og-helpers";
export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Rocket4RPO — Diagnostic recrutement";
export default async function OGImage() {
  return ogImage({ title: "Diagnostic recrutement — 7 dimensions en 1 minute", subtitle: "Évaluez la maturité de votre Talent Acquisition avec recommandations personnalisées", badge: "Diagnostic gratuit", badgeEmoji: "📊" });
}

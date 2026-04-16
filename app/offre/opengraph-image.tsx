import { ogImage, OG_SIZE } from "@/lib/og-helpers";
export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Rocket4RPO — Notre offre RPO";
export default async function OGImage() {
  return ogImage({ title: "RPO, CDD & CDI — Le top 1% des recruteurs de France", subtitle: "TA intégré en 1 semaine · 200+ recrutements · Diagnostic gratuit", badge: "Notre offre", badgeEmoji: "📋" });
}

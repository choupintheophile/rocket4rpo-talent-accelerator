import { ogImage, OG_SIZE } from "@/lib/og-helpers";
export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Rocket4RPO — Calculateur ROI RPO";
export default async function OGImage() {
  return ogImage({ title: "Calculateur ROI RPO — Estimez vos économies", subtitle: "Comparez en temps réel : RPO vs cabinet vs recrutement interne", badge: "Outil gratuit", badgeEmoji: "🧮" });
}

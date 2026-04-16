import { ogImage, OG_SIZE } from "@/lib/og-helpers";
export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Combien coûte un RPO ? — Tarifs France 2026 Rocket4RPO";
export default async function OGImage() {
  return ogImage({ title: "Combien coûte un RPO en France ?", subtitle: "Prix, modèles de facturation, scénario 10 recrutements. Guide tarifs 2026.", badge: "Tarifs RPO", badgeEmoji: "💰" });
}

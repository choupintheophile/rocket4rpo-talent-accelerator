import { ogImage, OG_SIZE } from "@/lib/og-helpers";
export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Qu'est-ce que le RPO ? — Guide complet Rocket4RPO";
export default async function OGImage() {
  return ogImage({ title: "Qu'est-ce que le RPO ? Définition et guide complet", subtitle: "Fonctionnement, avantages, cas d'usage et tarification du Recruitment Process Outsourcing", badge: "Guide RPO", badgeEmoji: "📖" });
}

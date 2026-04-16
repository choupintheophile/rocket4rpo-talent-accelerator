import type { Metadata } from "next";
export const revalidate = 3600;
import HomepageImmersive from "./HomepageImmersive";

export const metadata: Metadata = {
  title: { absolute: "RPO France — Recruteur intégré en 1 semaine | Rocket4RPO" },
  description:
    "Recruteur senior intégré en 1 semaine, 5x moins cher qu'un cabinet. 200+ recrutements réalisés pour startups, scale-ups et ETI tech. Diagnostic gratuit.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomepageImmersive />;
}

import type { Metadata } from "next";
import DemoClient from "./DemoClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Démo interactive RPO — Process en 4 étapes",
  description:
    "Explorez notre processus de recrutement RPO en 4 étapes interactives. Voyez comment nous trouvons vos meilleurs candidats en 48h.",
  alternates: { canonical: "/demo" },
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Démo interactive RPO Rocket4RPO",
      description: "Vivez le processus RPO en 4 étapes : brief, sourcing, shortlist, résultats. Simulation interactive gratuite.",
      url: "https://rocket4rpo.com/demo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      provider: { "@type": "Organization", name: "Rocket4RPO", url: "https://rocket4rpo.com" },
    },
    breadcrumbSchema([{ name: "Démo interactive", url: "/demo" }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <DemoClient />
    </>
  );
}

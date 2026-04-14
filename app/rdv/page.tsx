import type { Metadata } from "next";
import RdvClient from "./RdvClient";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trouvez votre TA idéal — Diagnostic gratuit",
  description:
    "Décrivez votre besoin en 3 questions et trouvez le Talent Acquisition Specialist parfait pour votre équipe. Diagnostic gratuit.",
  alternates: { canonical: "/rdv" },
};

export default function Page() {
  const contactPoint = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Diagnostic RPO gratuit — Rocket4RPO",
    description: "Réservez un diagnostic gratuit de 30 minutes avec un expert RPO pour trouver le Talent Acquisition Specialist idéal.",
    url: "https://rocket4rpo.com/rdv",
    mainEntity: organizationSchema,
  };
  const reserveAction = {
    "@context": "https://schema.org",
    "@type": "ReserveAction",
    name: "Réserver un diagnostic RPO",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rocket4rpo.com/rdv",
      inLanguage: "fr-FR",
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
    result: {
      "@type": "Reservation",
      name: "Diagnostic RPO 30 minutes",
    },
  };
  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Diagnostic gratuit", url: "/rdv" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([contactPoint, reserveAction, breadcrumb]) }} />
      <RdvClient />
    </>
  );
}

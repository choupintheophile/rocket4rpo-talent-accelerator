import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/seo";
import GlossaireRpoClient from "./GlossaireRpoClient";
import { GLOSSARY_TERMS } from "./terms";

export const metadata: Metadata = {
  title: "Glossaire RPO & Recrutement — 15 termes (2026)",
  description:
    "Glossaire RPO : 15 définitions essentielles (RPO, TA, time-to-hire, sourcing, ATS, cooptation, scorecard) pour comprendre le recrutement moderne.",
  alternates: { canonical: "/glossaire-rpo" },
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "Glossaire RPO & Recrutement",
      description:
        "Glossaire des 15 termes essentiels du RPO et du recrutement en entreprise : définitions et exemples concrets.",
      url: "https://rocket4rpo.com/glossaire-rpo",
      hasDefinedTerm: GLOSSARY_TERMS.map((term) => ({
        "@type": "DefinedTerm",
        name: term.term,
        alternateName: term.alternate || undefined,
        description: term.definition,
        url: `https://rocket4rpo.com/glossaire-rpo#${term.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Glossaire RPO & Recrutement — 15 termes essentiels",
      description:
        "Glossaire RPO : définitions de RPO, Talent Acquisition, Time-to-hire, Sourcing, ATS, Scorecard, Cooptation et 8 autres termes clés du recrutement.",
      image: {
        "@type": "ImageObject",
        url: "https://rocket4rpo.com/opengraph-image",
        width: 1200,
        height: 630,
      },
      inLanguage: "fr-FR",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://rocket4rpo.com/glossaire-rpo",
      },
      author: {
        "@type": "Person",
        name: "Clément Martin",
        jobTitle: "CEO, Rocket4Sales",
        url: "https://www.linkedin.com/in/clement-martin-rocket4sales/",
        worksFor: { "@type": "Organization", name: "Rocket4RPO" },
      },
      publisher: {
        "@type": "Organization",
        name: "Rocket4RPO",
        url: "https://rocket4rpo.com",
        logo: {
          "@type": "ImageObject",
          url: "https://rocket4rpo.com/logo-rocket4rpo.webp",
          width: 600,
          height: 60,
        },
      },
      datePublished: "2026-04-14",
      dateModified: "2026-04-14",
      about: GLOSSARY_TERMS.map((term) => ({
        "@type": "DefinedTerm",
        name: term.term,
      })),
    },
    breadcrumbSchema([{ name: "Glossaire RPO", url: "/glossaire-rpo" }]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <GlossaireRpoClient />
    </>
  );
}

// Schema helpers for JSON-LD structured data
// The old SEO component using react-helmet-async is removed.
// Use Next.js metadata API in page files instead.

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rocket4RPO",
  url: "https://rocket4rpo.com",
  logo: "https://rocket4rpo.com/logo-rocket4rpo.webp",
  description: "Talent Acquisition à temps partagé ou à temps plein pour accélérer vos recrutements",
  parentOrganization: {
    "@type": "Organization",
    name: "Rocket4GTM",
  },
  sameAs: ["https://www.linkedin.com/company/rocket4rpo"],
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rocket4RPO",
  description: "Cabinet spécialisé en Recruitment Process Outsourcing (RPO). Talent Acquisition externalisé à temps partagé ou à temps plein pour startups, scale-ups et entreprises tech.",
  url: "https://rocket4rpo.com",
  logo: "https://rocket4rpo.com/logo-rocket4rpo.webp",
  image: "https://rocket4rpo.com/logo-rocket4rpo.webp",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "22 rue de l'Échiquier",
      postalCode: "75010",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "70 cours Tolstoï",
      postalCode: "69100",
      addressLocality: "Villeurbanne",
      addressCountry: "FR",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  serviceType: "Recruitment Process Outsourcing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Offre RPO Rocket4RPO",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "RPO — Recruteur externalisé intégré à votre équipe",
          description: "Un Talent Acquisition Specialist senior intégré dans vos équipes de 1 à 5 jours par semaine. Première shortlist en 5-7 jours, tous types de postes, à partir de 550€/jour.",
          url: "https://rocket4rpo.com/offre",
        },
      },
    ],
  },
  priceRange: "€€",
  sameAs: ["https://www.linkedin.com/company/rocket4rpo"],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `https://rocket4rpo.com${item.url}`,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const serviceSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `https://rocket4rpo.com${url}`,
  provider: organizationSchema,
});

export const personSchema = (name: string, jobTitle: string, description: string, linkedin?: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  jobTitle,
  description,
  worksFor: organizationSchema,
  ...(linkedin && { sameAs: [linkedin] }),
});

// Schema helpers for JSON-LD structured data
// The old SEO component using react-helmet-async is removed.
// Use Next.js metadata API in page files instead.

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://rocket4rpo.com/#organization",
  name: "Rocket4RPO",
  alternateName: ["Rocket 4 RPO", "R4RPO"],
  url: "https://rocket4rpo.com",
  logo: "https://rocket4rpo.com/logo-rocket4rpo.webp",
  description: "Talent Acquisition à temps partagé ou à temps plein pour accélérer vos recrutements. Cabinet RPO France depuis 2020, 200+ recrutements réalisés.",
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Clément Martin",
    jobTitle: "CEO & Founder",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Rocket4GTM",
    url: "https://rocket4rpo.com/rocket4gtm",
  },
  // v23 SEO audit — telephone + contactPoint (Rich Results)
  telephone: "+33-1-00-00-00-00",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "contact@rocket4rpo.com",
    availableLanguage: ["French", "English"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 rue de l'Échiquier",
    postalCode: "75010",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  // v23 SEO audit — knowsAbout pour E-E-A-T
  knowsAbout: [
    "Recruitment Process Outsourcing",
    "Talent Acquisition",
    "Sourcing Tech",
    "Recrutement B2B SaaS",
  ],
  areaServed: { "@type": "Country", name: "France" },
  sameAs: [
    "https://www.linkedin.com/company/rocket4rpo",
    "https://www.rocket4sales.com",
  ],
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://rocket4rpo.com/#service",
  name: "Rocket4RPO",
  description: "Cabinet spécialisé en Recruitment Process Outsourcing (RPO). Talent Acquisition externalisé à temps partagé ou à temps plein pour startups, scale-ups et entreprises tech.",
  url: "https://rocket4rpo.com",
  logo: "https://rocket4rpo.com/logo-rocket4rpo.webp",
  image: "https://rocket4rpo.com/logo-rocket4rpo.webp",
  // v23 SEO audit — geo coordinates pour Google Maps / Local SEO
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
  geo: [
    { "@type": "GeoCoordinates", latitude: 48.8716, longitude: 2.3514 },
    { "@type": "GeoCoordinates", latitude: 45.7676, longitude: 4.8788 },
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
          description: "Un Talent Acquisition Specialist senior intégré dans vos équipes de 1 à 5 jours par semaine. Première shortlist en 48h, tous types de postes. Tarification sur devis.",
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
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://rocket4rpo.com/",
    },
    ...items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: item.name,
      item: `https://rocket4rpo.com${item.url}`,
    })),
  ],
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
  // v23 SEO fix — référence par @id au lieu d'imbriquer le @context
  provider: { "@type": "Organization", "@id": "https://rocket4rpo.com/#organization" },
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

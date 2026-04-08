// Schema helpers for JSON-LD structured data
// The old SEO component using react-helmet-async is removed.
// Use Next.js metadata API in page files instead.

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rocket4RPO",
  url: "https://rocket4rpo.com",
  logo: "https://rocket4rpo.com/logo.png",
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
  logo: "https://rocket4rpo.com/logo.png",
  image: "https://rocket4rpo.com/logo.png",
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
    name: "Offres RPO Rocket4RPO",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "RPO à temps partagé",
          description: "Un Talent Acquisition Specialist senior intégré quelques jours par semaine pour piloter vos recrutements avec méthode et exigence.",
          url: "https://rocket4rpo.com/rpo-temps-partage",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "RPO à temps plein",
          description: "Un recruteur RPO dédié à 100% intégré dans vos équipes pour structurer, accélérer et piloter l'ensemble de vos recrutements.",
          url: "https://rocket4rpo.com/rpo-temps-plein",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recrutement de Talent Acquisition",
          description: "Nous recrutons pour vous des Talent Acquisition Managers et Specialists adaptés à vos enjeux de croissance.",
          url: "https://rocket4rpo.com/offre/recrutement-talent-acquisition",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Outils de sourcing & enablement",
          description: "Sélection d'outils de sourcing, formation de vos équipes et optimisation de votre stack recrutement.",
          url: "https://rocket4rpo.com/offre/outils-sourcing-enablement",
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

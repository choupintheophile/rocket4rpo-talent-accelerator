import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export const SEO = ({ title, description, canonical, ogImage, schema, noindex }: SEOProps) => {
  const siteUrl = "https://rocket4rpo.com";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullTitle = `${title} | Rocket4RPO`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  );
};

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
  telephone: "+33 1 00 00 00 00",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
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

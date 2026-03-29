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

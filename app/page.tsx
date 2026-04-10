import type { Metadata } from "next";
export const revalidate = 3600; // revalidate every hour
import { organizationSchema, professionalServiceSchema, faqSchema } from "@/lib/seo";
import { getBlogPosts } from "@/lib/db";
import { detectSegment, heroContent } from "@/lib/personalization";
import { HeroSection } from "@/components/sections/HeroSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FAQSection } from "@/components/shared/FAQSection";
import { CTASection } from "@/components/shared/CTASection";
import HomepageSections from "./HomepageSections";

export const metadata: Metadata = {
  title: { absolute: "RPO France — Recruteur intégré dès 48h | Rocket4RPO" },
  description:
    "Recruteur senior intégré dès 48h, 5x moins cher qu'un cabinet. 200+ recrutements, dès 550€/j. Diagnostic gratuit →",
  alternates: { canonical: "/" },
};

const homepageFaqs = [
  { question: "En quoi le RPO est différent d'un cabinet de recrutement ?", answer: "Le RPO (Recruitment Process Outsourcing) consiste à intégrer un recruteur externe directement dans votre équipe. Il utilise vos outils, participe à vos rituels et recrute au nom de votre entreprise — pas au nom de Rocket4RPO." },
  { question: "Combien ça coûte ?", answer: "À partir de 550€/jour. Pour 10 recrutements sur 4 mois, comptez environ 44 000€. Un cabinet classique facturerait entre 120 000 et 200 000€ pour les mêmes recrutements." },
  { question: "Combien de temps pour démarrer ?", answer: "48h. Le Talent Acquisition Specialist rejoint vos outils et vos équipes sous 48h. Première shortlist qualifiée le même jour." },
  { question: "Quels postes pouvez-vous recruter ?", answer: "Tous. Sales, Tech, Finance, Marketing, Support, Product, Data, Management. Nos TA sont des généralistes expérimentés." },
  { question: "Et si le recruteur ne convient pas ?", answer: "On le remplace sous 48h. Notre réseau de freelances TA seniors nous permet de réagir immédiatement." },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const segment = detectSegment(params);
  const hero = heroContent[segment];

  const blogPosts = await getBlogPosts();

  const serializedPosts = blogPosts.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
    readTime: p.readTime,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, professionalServiceSchema]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(homepageFaqs)),
        }}
      />

      <HeroSection content={hero} />
      <HomepageSections />
      <BlogPreview posts={serializedPosts} />
      <section className="bg-rocket-cream">
        <FAQSection faqs={homepageFaqs} />
      </section>
      <CTASection
        title="Votre prochain recrutement commence ici"
        subtitle="30 min de diagnostic gratuit avec un expert RPO. On analyse votre besoin, on vous dit honnêtement si le RPO est fait pour vous."
        ctaLabel="Réserver mon créneau"
      />
    </>
  );
}

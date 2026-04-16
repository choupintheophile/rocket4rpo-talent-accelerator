import type { Metadata } from "next";
export const revalidate = 3600;
import { faqSchema } from "@/lib/seo";
import { getLatestBlogPosts } from "@/lib/db";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FAQSection } from "@/components/shared/FAQSection";
import { InternalLinks } from "@/components/shared/InternalLinks";
import HomepageImmersive from "./HomepageImmersive";

export const metadata: Metadata = {
  title: { absolute: "RPO France — Recruteur intégré en 1 semaine | Rocket4RPO" },
  description:
    "Recruteur senior intégré en 1 semaine, 5x moins cher qu'un cabinet. 200+ recrutements réalisés pour startups, scale-ups et ETI tech. Diagnostic gratuit.",
  alternates: { canonical: "/" },
};

const homepageFaqs = [
  { question: "En quoi le RPO est différent d'un cabinet de recrutement ?", answer: "Le RPO (Recruitment Process Outsourcing) consiste à intégrer un recruteur externe directement dans votre équipe. Il utilise vos outils, participe à vos rituels et recrute au nom de votre entreprise — pas au nom de Rocket4RPO." },
  { question: "Combien ça coûte ?", answer: "Tarification sur devis, adaptée à votre volume et à la nature des postes. Jusqu'à 5x moins cher qu'un cabinet classique qui facturerait entre 120 000 et 200 000€ pour 10 recrutements. Réservez un diagnostic gratuit pour un chiffrage précis." },
  { question: "Combien de temps pour démarrer ?", answer: "1 semaine. Le Talent Acquisition Specialist rejoint vos outils et vos équipes sous 1 semaine. Première shortlist qualifiée en 48h." },
  { question: "Quels postes pouvez-vous recruter ?", answer: "Tous. Sales, Tech, Finance, Marketing, Support, Product, Data, Management. Nos TA sont des généralistes expérimentés." },
  { question: "Et si le recruteur ne convient pas ?", answer: "On le remplace sous 1 semaine. Notre réseau de freelances TA seniors nous permet de réagir immédiatement." },
];

export default async function HomePage() {
  const blogPosts = await getLatestBlogPosts(3);

  const serializedPosts = blogPosts.map((p) => ({
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
          __html: JSON.stringify(faqSchema(homepageFaqs)),
        }}
      />

      {/* v25 — Homepage immersive : 5 actes narratifs avec starfield 3D */}
      <HomepageImmersive />

      {/* Gradient transition dark → light */}
      <div className="relative z-10 h-32 bg-gradient-to-b from-black to-background" />

      {/* Sections classiques sous l'expérience immersive */}
      <div className="relative z-10 bg-background">
        <BlogPreview posts={serializedPosts} />
        <section className="bg-rocket-cream">
          <FAQSection faqs={homepageFaqs} />
        </section>
        <InternalLinks
          currentPath="/"
          paths={["/qu-est-ce-que-le-rpo", "/combien-coute-un-rpo", "/calculateur", "/assessment"]}
          title="Explorez nos ressources"
        />
      </div>
    </>
  );
}

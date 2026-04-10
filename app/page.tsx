import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { OffersSection } from "@/components/sections/OffersSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { organizationSchema, professionalServiceSchema, faqSchema } from "@/lib/seo";
import { getBlogPosts } from "@/lib/db";
import { detectSegment, heroContent } from "@/lib/personalization";

export const metadata: Metadata = {
  title: "Rocket4RPO — Talent Acquisition RPO pour entreprises Tech",
  description:
    "Recruteur RPO dédié pour startups et scale-ups tech. Talent Acquisition à temps partagé ou plein. Réduisez vos coûts de recrutement de 40%.",
  alternates: { canonical: "/" },
};

const homepageFaqs = [
  {
    question: "Qu'est-ce que le RPO (Recruitment Process Outsourcing) ?",
    answer:
      "Le RPO consiste à externaliser tout ou partie de votre processus de recrutement auprès d'un expert Talent Acquisition intégré à votre équipe. Contrairement à un cabinet, le RPO travaille en continu depuis vos outils (ATS, Slack) et participe à vos rituels d'équipe.",
  },
  {
    question: "Combien coûte un RPO ?",
    answer:
      "Chez Rocket4RPO, le tarif est un TJM de 550 €/jour, ajustable de 1 à 4 jours par semaine. Pour 10 recrutements, cela représente environ 44 000 €, contre 60 000 à 200 000 € pour un cabinet facturant 15-25 % du salaire annuel.",
  },
  {
    question: "Quelle est la différence entre un RPO et un cabinet de recrutement ?",
    answer:
      "Le RPO s'intègre dans votre équipe et travaille en continu sur vos recrutements avec vos outils. Le cabinet intervient ponctuellement, mission par mission, sans intégration à vos process internes. Le RPO offre plus de flexibilité et un coût prévisible.",
  },
  {
    question: "En combien de temps un RPO peut-il démarrer ?",
    answer:
      "Chez Rocket4RPO, le démarrage se fait en 48 h après signature. Votre recruteur RPO dédié est opérationnel immédiatement grâce à une méthodologie éprouvée sur 200+ recrutements.",
  },
  {
    question: "Le RPO remplace-t-il mon équipe RH interne ?",
    answer:
      "Non, le RPO complète votre équipe RH. Il prend en charge le sourcing, la pré-qualification et la coordination des entretiens, permettant à vos RH de se concentrer sur les sujets stratégiques (marque employeur, onboarding, rétention).",
  },
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

      {/* Citation capsule — AI search optimization */}
      <section className="py-4">
        <div className="container-tight">
          <div className="p-6 rounded-xl bg-rocket-cream border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">En bref</p>
            <p className="text-foreground font-medium">
              Rocket4RPO est un cabinet RPO (Recruitment Process Outsourcing) qui intègre des Talent Acquisition Specialists seniors dans les entreprises pour accélérer leurs recrutements. Avec 200+ recrutements réalisés et 92% de rétention à 12 mois, Rocket4RPO accompagne les startups, scale-ups et ETI dans le recrutement de tous types de profils.
            </p>
          </div>
        </div>
      </section>

      <TrustSection />
      <ProblemSection />
      <OffersSection />
      <MethodSection />
      <ComparisonSection />
      <BlogPreview posts={serializedPosts} />
      <section className="bg-rocket-cream">
        <FAQSection faqs={homepageFaqs} />
      </section>
      <CTASection />
    </>
  );
}

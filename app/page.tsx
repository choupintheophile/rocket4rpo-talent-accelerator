import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { OffersSection } from "@/components/sections/OffersSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTASection } from "@/components/shared/CTASection";
import { organizationSchema, professionalServiceSchema } from "@/lib/seo";
import { getTestimonials, getBlogPosts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Rocket4RPO — Talent Acquisition RPO pour entreprises Tech",
  description:
    "Recruteur RPO dédié pour startups et scale-ups tech. Talent Acquisition à temps partagé ou plein. Réduisez vos coûts de recrutement de 40%.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [testimonials, blogPosts] = await Promise.all([
    getTestimonials(),
    getBlogPosts(),
  ]);

  const serializedTestimonials = testimonials.map((t) => ({
    id: t.id,
    quote: t.quote,
    name: t.name,
    role: t.role,
    company: t.company,
    rating: t.rating,
  }));

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
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <OffersSection />
      <MethodSection />
      <ComparisonSection />
      <TestimonialsSection testimonials={serializedTestimonials} />
      <CaseStudiesPreview />
      <BlogPreview posts={serializedPosts} />
      <CTASection />
    </>
  );
}

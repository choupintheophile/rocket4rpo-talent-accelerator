import type { Metadata } from "next";
export const revalidate = 3600;
import { prisma } from "@/lib/db";
import { blogCategories } from "@/data/blog";
import { getCanonicalForSlug } from "@/lib/blog-canonicals";
import { breadcrumbSchema } from "@/lib/seo";
import BlogPageClient from "./PageClient";

const SITE_URL = "https://rocket4rpo.com";

export const metadata: Metadata = {
  title: "Blog RPO & Recrutement Tech",
  description:
    "Articles, guides et analyses sur le Talent Acquisition, le RPO et le sourcing. Par les experts Rocket4RPO, 200+ recrutements.",
  alternates: { canonical: "/blog" },
};

export default async function Page() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { date: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      date: true,
      readTime: true,
      imageUrl: true,
    },
  });

  // Filter out canonical-overridden posts from the listing (they no longer
  // belong as standalone blog entries). Thin `-\d+` and `p2-` posts stay in
  // the UI — they're noindexed but still browsable by users.
  const visiblePosts = posts.filter((p) => !getCanonicalForSlug(p.slug));

  // SSR: only send the first 24 posts to reduce initial HTML payload (~490 KB → ~30 KB).
  // The client component still handles "load more" but starts from this subset.
  const SSR_LIMIT = 24;
  const limitedPosts = visiblePosts.slice(0, SSR_LIMIT);

  const serializedPosts = limitedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: p.readTime,
    imageUrl: p.imageUrl || null,
  }));

  // Schema.org Blog with the 10 most recent posts as blogPost[].
  // Using Blog + CollectionPage gives Google a richer hint than CollectionPage alone.
  const recentForSchema = visiblePosts.slice(0, 10);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Blog Rocket4RPO",
    description:
      "Articles sur le Talent Acquisition, le RPO et le recrutement Tech",
    url: `${SITE_URL}/blog`,
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "Rocket4RPO",
      url: SITE_URL,
    },
    blogPost: recentForSchema.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date.toISOString(),
      ...(p.imageUrl && { image: p.imageUrl }),
      author: {
        "@type": "Person",
        name: "Clément Martin",
      },
    })),
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogSchema, breadcrumb]) }}
      />
      <BlogPageClient posts={serializedPosts} categories={blogCategories} />
    </>
  );
}

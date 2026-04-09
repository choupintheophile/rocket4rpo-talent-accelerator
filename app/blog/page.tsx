import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { getBlogPosts } from "@/lib/db";
import { blogCategories } from "@/data/blog";
import BlogPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Blog — Talent Acquisition, RPO, sourcing et recrutement Tech",
  description: "Articles, guides et analyses sur le Talent Acquisition, le RPO, le sourcing et le recrutement dans l'écosystème Tech. Par les experts Rocket4RPO.",
  alternates: { canonical: "/blog" },
};

export default async function Page() {
  const posts = await getBlogPosts();
  const serializedPosts = posts.map((p) => ({
    ...p,
    date: p.date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Rocket4RPO",
    description: "Articles sur le Talent Acquisition, le RPO et le recrutement Tech",
    url: "https://www.rocket4rpo.com/blog",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogPageClient posts={serializedPosts} categories={blogCategories} />
    </>
  );
}

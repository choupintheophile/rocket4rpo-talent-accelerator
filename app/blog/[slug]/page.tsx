import type { Metadata } from "next";
export const revalidate = 3600;
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/db";
import BlogArticleClient from "./BlogArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article non trouvé" };

  const isStub = !post.content || post.content.length < 200;

  const canonicalOverrides: Record<string, string> = {
    "rpo-vs-cabinet-recrutement-comparatif": "/rpo-vs-cabinet",
  };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalOverrides[post.slug] || `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: ["Clément Martin"],
    },
    ...(isStub && { robots: { index: false } }),
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Clément Martin",
      jobTitle: "CEO, Rocket4Sales",
      url: "https://www.linkedin.com/in/clement-martin-rocket4sales/",
    },
    publisher: {
      "@type": "Organization",
      name: "Rocket4RPO",
      url: "https://rocket4rpo.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rocket4rpo.com/blog/${post.slug}`,
    },
  };

  const serializedPost = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
    readTime: post.readTime,
    content: post.content,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogArticleClient post={serializedPost} />
    </>
  );
}

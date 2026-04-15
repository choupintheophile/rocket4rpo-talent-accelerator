import type { Metadata } from "next";
export const revalidate = 3600;
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/db";
import { getCanonicalForSlug, isAutoGenThin } from "@/lib/blog-canonicals";
import BlogArticleClient from "./BlogArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://rocket4rpo.com";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(plainText: string): number {
  return plainText.split(/\s+/).filter(Boolean).length;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article non trouvé" };

  const plainText = stripHtml(post.content || "");
  const thin = isAutoGenThin(post.slug, plainText);
  const canonicalOverride = getCanonicalForSlug(post.slug);

  // Canonical: override → pillar URL (absolute), otherwise /blog/{slug}
  const canonical = canonicalOverride ?? `/blog/${post.slug}`;

  // Robots (v22 — SEO assoupli) :
  //   - Thin (<300 mots) → noindex, follow (vrais stubs, pas de valeur)
  //   - Canonical-override → INDEXABLE (canonical tag seul suffit pour Google
  //     à signaler la page pilier comme version primaire — cf. Google Search
  //     Central: "canonical is a strong hint, not a directive")
  const shouldNoindex = thin;

  const ogImage = post.imageUrl
    ? [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["Clément Martin"],
      ...(ogImage && { images: ogImage }),
    },
    ...(shouldNoindex && { robots: { index: false, follow: true } }),
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const plainText = stripHtml(post.content || "");
  const wordCount = countWords(plainText);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "fr-FR",
    wordCount,
    ...(post.imageUrl && { image: post.imageUrl }),
    author: {
      "@type": "Person",
      name: "Clément Martin",
      jobTitle: "CEO, Rocket4Sales",
      url: "https://www.linkedin.com/in/clement-martin-rocket4sales/",
    },
    publisher: {
      "@type": "Organization",
      name: "Rocket4RPO",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
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
    imageUrl: post.imageUrl || null,
    author: post.author || "Clément Martin",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogArticleClient post={serializedPost} />
    </>
  );
}

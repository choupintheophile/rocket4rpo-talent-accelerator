import type { Metadata } from "next";
export const revalidate = 3600;
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/db";
import { getCanonicalForSlug, isAutoGenThin } from "@/lib/blog-canonicals";
import {
  extractFAQs,
  faqPageSchema,
  breadcrumbSchemaForBlog,
  findRelatedArticles,
} from "@/lib/blog-seo-helpers";
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
      siteName: "Rocket4RPO",
      locale: "fr_FR",
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(ogImage && { images: ogImage.map((i) => i.url) }),
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

  // v22 — Schemas SEO enrichis : BlogPosting + BreadcrumbList + FAQPage (si Q/A détectées)
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "fr-FR",
    wordCount,
    ...(post.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: post.imageUrl,
        width: 1200,
        height: 630,
      },
    }),
    // v22.3 — Author schema enrichi (E-E-A-T : Expertise, Authoritativeness, Trust)
    author: {
      "@type": "Person",
      name: "Clément Martin",
      jobTitle: "CEO, Rocket4Sales",
      url: "https://www.linkedin.com/in/clement-martin-rocket4sales/",
      sameAs: [
        "https://www.linkedin.com/in/clement-martin-rocket4sales/",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Rocket4RPO",
        url: SITE_URL,
      },
      knowsAbout: [
        "Recruitment Process Outsourcing",
        "Talent Acquisition",
        "Recrutement B2B",
        "RPO France",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Rocket4RPO",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-rocket4rpo.webp`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    // v23.3 — keywords enrichis (catégorie + mots-clés extraits du slug)
    keywords: [
      post.category,
      "RPO",
      "recrutement",
      "Talent Acquisition",
      ...post.slug
        .replace(/^(p2|extra)-/, "")
        .replace(/-\d+$/, "")
        .split("-")
        .filter((w: string) => w.length > 3)
        .slice(0, 5),
    ].join(", "),
  };

  const breadcrumb = breadcrumbSchemaForBlog(
    SITE_URL,
    post.title,
    post.slug,
    post.category,
  );

  const faqs = extractFAQs(post.content || "");
  const faqSchema = faqPageSchema(faqs);

  const schemas = [blogPostingSchema, breadcrumb, ...(faqSchema ? [faqSchema] : [])];

  // v22 — Articles similaires (topic cluster) — améliore le maillage interne SEO
  let relatedPosts: Array<{ slug: string; title: string; category: string; excerpt: string }> = [];
  try {
    const allPosts = await getBlogPosts();
    const pool = allPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
    }));
    relatedPosts = findRelatedArticles(post.slug, post.category, pool, 4);
  } catch {
    // Silencieux : pas de related en cas d'erreur DB
  }

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
    relatedPosts,
    hasFaqs: faqs.length >= 2,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogArticleClient post={serializedPost} />
    </>
  );
}

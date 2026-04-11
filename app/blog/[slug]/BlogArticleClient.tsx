"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  imageUrl?: string | null;
  author?: string | null;
}

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  const author = post.author || "Clément Martin";
  const authorInitials = author.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="section-padding pt-8 bg-[hsl(var(--rocket-cream))]">
        <div className="container-tight">
          {/* Header */}
          <header>
            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {post.date} · {post.readTime}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{authorInitials}</span>
              </div>
              <span>
                Par{" "}
                <a
                  href="https://www.linkedin.com/in/clement-martin-rocket4sales/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {author}
                </a>
                , CEO Rocket4Sales
              </span>
            </div>

            {/* Hero image */}
            {post.imageUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-border/40">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-[300px] md:h-[420px] object-cover"
                  loading="eager"
                />
              </div>
            )}
          </header>

          {/* Key Takeaways */}
          {post.excerpt && (
            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm font-semibold text-primary mb-2">En bref</p>
              <p className="text-foreground font-medium leading-relaxed">{post.excerpt}</p>
            </div>
          )}

          {/* Article content — supports HTML */}
          <div
            className="mt-10 prose prose-lg max-w-none text-foreground
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-ul:pl-6 prose-ol:my-4 prose-ol:pl-6
              prose-li:mb-2 prose-li:leading-relaxed
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              prose-img:rounded-xl prose-img:border prose-img:border-border/40 prose-img:my-8
              prose-table:border-collapse prose-th:bg-primary/5 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-border/40"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related articles CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border border-primary/10 text-center">
            <p className="font-semibold mb-2">Envie d&apos;aller plus loin ?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Découvrez nos outils gratuits pour optimiser votre recrutement.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/calculateur" className="text-sm font-medium text-primary hover:underline">
                Calculateur ROI →
              </Link>
              <Link href="/assessment" className="text-sm font-medium text-primary hover:underline">
                Diagnostic recrutement →
              </Link>
              <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
                Tous les articles →
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}

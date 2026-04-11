"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Linkedin, Share2 } from "lucide-react";

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
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      {/* Dark hero header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative container-tight py-16 md:py-20">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
              <BookOpen className="w-3 h-3" />
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] text-white max-w-3xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{authorInitials}</span>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/clement-martin-rocket4sales/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white/80 hover:text-primary transition-colors"
                  >
                    {author}
                  </a>
                  <span className="text-white/40"> · CEO Rocket4Sales</span>
                </div>
              </div>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      {post.imageUrl && (
        <div className="container-tight -mt-6 relative z-10 mb-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/40">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[280px] md:h-[400px] object-cover"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <article className="bg-white">
        <div className="container-tight py-12 md:py-16">

          {/* Key Takeaways box */}
          {post.excerpt && (
            <div className="mb-10 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border border-primary/15 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-sm font-bold text-primary uppercase tracking-wider">En bref</p>
              </div>
              <p className="text-foreground font-medium leading-relaxed text-[15px]">{post.excerpt}</p>
            </div>
          )}

          {/* Article content */}
          <div
            className="prose prose-lg max-w-none text-foreground
              prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
              prose-h2:text-[1.55rem] prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-primary/20
              prose-h3:text-[1.2rem] prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-primary/90
              prose-p:leading-[1.8] prose-p:mb-5 prose-p:text-[15px]
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-5 prose-ul:pl-6 prose-ol:my-5 prose-ol:pl-6
              prose-li:mb-2.5 prose-li:leading-[1.75] prose-li:text-[15px]
              prose-li:marker:text-primary
              prose-blockquote:border-l-[3px] prose-blockquote:border-l-primary prose-blockquote:bg-gradient-to-r prose-blockquote:from-primary/5 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-8
              prose-img:rounded-2xl prose-img:border prose-img:border-border/40 prose-img:my-10 prose-img:shadow-lg
              prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden prose-table:border prose-table:border-border/40 prose-table:shadow-sm prose-table:my-8
              prose-th:bg-rocket-dark prose-th:text-white prose-th:px-4 prose-th:py-3 prose-th:text-xs prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider prose-th:text-left
              prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-border/30 prose-td:text-sm
              prose-hr:border-primary/10 prose-hr:my-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & author section */}
          <div className="mt-14 pt-8 border-t border-border/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{authorInitials}</span>
                </div>
                <div>
                  <p className="font-semibold">{author}</p>
                  <p className="text-sm text-muted-foreground">CEO Rocket4Sales · Expert RPO</p>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Partager :</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-primary/10 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </a>
                <button
                  onClick={() => navigator.clipboard?.writeText(shareUrl)}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-primary/10 flex items-center justify-center transition-colors"
                  title="Copier le lien"
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Related resources */}
          <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-rocket-dark to-rocket-navy-soft text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rocket-teal/10 rounded-full blur-[80px]" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Aller plus loin</p>
              <h3 className="text-xl font-bold mb-2">Optimisez votre recrutement</h3>
              <p className="text-white/55 text-sm mb-6">
                Utilisez nos outils gratuits pour passer de la théorie à la pratique.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculateur"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Calculateur ROI <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-colors"
                >
                  Diagnostic recrutement
                </Link>
                <Link
                  href="/ressources"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-colors"
                >
                  Guides & templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}

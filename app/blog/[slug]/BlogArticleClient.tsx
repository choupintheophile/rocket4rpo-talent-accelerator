"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Linkedin, Share2, ChevronRight } from "lucide-react";

interface RelatedPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
}

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
  relatedPosts?: RelatedPost[];
  hasFaqs?: boolean;
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

      {/* Dark hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[120px]" />
          <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative container-tight py-16 md:py-20 lg:py-24">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20">
                <BookOpen className="w-3 h-3" />
                {post.category}
              </span>
              <span className="text-xs text-white/30">·</span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] text-white max-w-3xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 text-sm text-white/45">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image — overlapping */}
      {post.imageUrl && (
        <div className="container-tight -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-border/30"
          >
            {/* v22 — LCP optimization : fetchPriority high + decoding sync + width/height pour éviter CLS */}
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[260px] md:h-[400px] lg:h-[440px] object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={440}
            />
          </motion.div>
        </div>
      )}

      {/* Article body */}
      <article className="bg-white">
        <div className="container-tight py-12 md:py-16 lg:py-20">

          {/* Key takeaway */}
          {post.excerpt && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/[0.04] via-emerald-500/[0.03] to-primary/[0.04] border border-primary/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-emerald-500 rounded-l-2xl" />
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">En bref</p>
                  <p className="text-foreground font-medium leading-relaxed">{post.excerpt}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content with premium prose */}
          <div
            className="article-content prose prose-lg max-w-none text-foreground

              [&>h2]:text-[1.5rem] [&>h2]:font-extrabold [&>h2]:text-foreground [&>h2]:tracking-tight
              [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:pb-4
              [&>h2]:border-b-2 [&>h2]:border-primary/15
              [&>h2]:flex [&>h2]:items-center [&>h2]:gap-3
              [&>h2]:before:content-[''] [&>h2]:before:w-1 [&>h2]:before:h-7 [&>h2]:before:bg-primary [&>h2]:before:rounded-full [&>h2]:before:shrink-0

              [&>h3]:text-[1.15rem] [&>h3]:font-bold [&>h3]:text-primary/90 [&>h3]:tracking-tight
              [&>h3]:mt-8 [&>h3]:mb-3
              [&>h3]:pl-4 [&>h3]:border-l-[3px] [&>h3]:border-primary/40

              [&>p]:text-[15px] [&>p]:leading-[1.85] [&>p]:mb-5 [&>p]:text-muted-foreground

              [&_a]:text-primary [&_a]:font-medium [&_a]:no-underline hover:[&_a]:underline [&_a]:transition-colors

              [&_strong]:text-foreground [&_strong]:font-semibold

              [&>ul]:my-6 [&>ul]:pl-0 [&>ul]:list-none [&>ul]:space-y-2
              [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-3 [&>ul>li]:text-[15px] [&>ul>li]:leading-relaxed [&>ul>li]:text-muted-foreground
              [&>ul>li]:pl-4 [&>ul>li]:border-l-2 [&>ul>li]:border-primary/20 [&>ul>li]:py-1

              [&>ol]:my-6 [&>ol]:pl-0 [&>ol]:list-none [&>ol]:space-y-3 [&>ol]:counter-reset-[item]
              [&>ol>li]:flex [&>ol>li]:items-start [&>ol>li]:gap-4 [&>ol>li]:text-[15px] [&>ol>li]:leading-relaxed
              [&>ol>li]:counter-increment-[item]
              [&>ol>li]:before:content-[counter(item)] [&>ol>li]:before:w-7 [&>ol>li]:before:h-7
              [&>ol>li]:before:rounded-full [&>ol>li]:before:bg-primary/10 [&>ol>li]:before:text-primary
              [&>ol>li]:before:text-xs [&>ol>li]:before:font-bold [&>ol>li]:before:flex [&>ol>li]:before:items-center
              [&>ol>li]:before:justify-center [&>ol>li]:before:shrink-0 [&>ol>li]:before:mt-0.5

              [&_blockquote]:border-l-[3px] [&_blockquote]:border-l-primary [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-primary/[0.04] [&_blockquote]:to-transparent
              [&_blockquote]:py-5 [&_blockquote]:px-7 [&_blockquote]:rounded-r-2xl [&_blockquote]:not-italic [&_blockquote]:my-10
              [&_blockquote]:relative
              [&_blockquote_p]:text-foreground [&_blockquote_p]:font-medium [&_blockquote_p]:text-[15px] [&_blockquote_p]:leading-relaxed [&_blockquote_p]:mb-0

              [&_img]:rounded-2xl [&_img]:border [&_img]:border-border/30 [&_img]:my-10 [&_img]:shadow-xl [&_img]:shadow-black/5

              [&_table]:border-collapse [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-border/30 [&_table]:shadow-sm [&_table]:my-10 [&_table]:w-full
              [&_th]:bg-rocket-dark [&_th]:text-white [&_th]:px-5 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-left
              [&_td]:px-5 [&_td]:py-3.5 [&_td]:border-b [&_td]:border-border/20 [&_td]:text-sm [&_td]:text-muted-foreground
              [&_td:first-child]:font-medium [&_td:first-child]:text-foreground
              [&_tr:nth-child(even)_td]:bg-gray-50/50
              [&_tr:last-child_td]:border-b-0

              [&_hr]:border-primary/10 [&_hr]:my-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="mt-16 pt-8 border-t-2 border-border/30 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Publié par <strong className="text-foreground">Rocket4RPO</strong></span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Partager</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-primary/10 hover:border-primary/20 border border-transparent flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4 text-gray-500" />
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-primary/10 hover:border-primary/20 border border-transparent flex items-center justify-center transition-all"
                title="Copier le lien"
              >
                <Share2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-48 h-48 bg-rocket-teal/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/8 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Passez à l{"'"}action</p>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Optimisez votre recrutement maintenant</h3>
              <p className="text-white/50 text-sm mb-8 max-w-lg leading-relaxed">
                Calculez vos économies, évaluez votre maturité ou téléchargez nos templates. Tout est gratuit, sans inscription.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculateur"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Calculateur ROI <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-colors"
                >
                  Diagnostic recrutement
                </Link>
                <Link
                  href="/ressources"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-colors"
                >
                  Guides & templates
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* v22 — Articles associés (topic cluster SEO + engagement) */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="bg-gray-50/70 border-t border-gray-200">
          <div className="container-tight py-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4 text-rocket-teal" />
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Articles associés
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {post.relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-rocket-teal/40 hover:shadow-md transition-all"
                >
                  <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-rocket-teal/10 text-rocket-teal mb-3">
                    {rp.category}
                  </span>
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rocket-teal transition-colors">
                    {rp.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 line-clamp-3">{rp.excerpt}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-rocket-teal">
                    Lire l&apos;article
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Animated card wrapper (staggered entrance via IntersectionObserver)*/
/* ------------------------------------------------------------------ */

function AnimatedCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function BlogPageClient({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const gridRef = useRef<HTMLDivElement>(null);

  /* -- Derived data ------------------------------------------------ */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: posts.length };
    for (const cat of categories) {
      counts[cat] = posts.filter((p) => p.category === cat).length;
    }
    return counts;
  }, [posts, categories]);

  const filteredPosts = useMemo(
    () =>
      activeCategory === "Tous"
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [posts, activeCategory],
  );

  const [featuredPost, ...gridPosts] = filteredPosts;

  /* -- Handlers ---------------------------------------------------- */
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <>
      {/* ── Breadcrumbs ── */}
      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[hsl(var(--rocket-navy-soft))] text-background">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--rocket-teal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--rocket-teal)) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Orb 1 */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[hsl(var(--rocket-teal)/0.08)] blur-[120px] animate-pulse" />
          {/* Orb 2 */}
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[hsl(var(--rocket-teal)/0.06)] blur-[100px] animate-pulse [animation-delay:2s]" />
          {/* Accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[hsl(var(--rocket-teal)/0.15)] to-transparent" />
        </div>

        <div className="relative container-wide section-padding pb-16">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20">
                <BookOpen className="w-3.5 h-3.5" />
                Blog & conseils
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.12] tracking-tight"
            >
              L&apos;expertise recrutement,{" "}
              <span className="text-gradient">en&nbsp;acces&nbsp;libre</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 text-lg md:text-xl text-background/70 leading-relaxed max-w-2xl"
            >
              On partage tout ce qu&apos;on apprend sur le terrain.
              Talent Acquisition, RPO, sourcing, structuration : les
              enseignements de 200+ recrutements pour les entreprises Tech.
            </motion.p>

            {/* Trust stat */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background/5 border border-background/10 text-sm text-background/60"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>
                {posts.length} article{posts.length > 1 ? "s" : ""} &middot;
                Par des experts avec 200+ recrutements
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Category filter bar (sticky) ── */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/60">
        <div className="container-wide">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />

            {["Tous", ...categories].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    relative shrink-0 px-4 py-2 text-sm font-medium rounded-full
                    transition-all duration-200 cursor-pointer
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }
                  `}
                >
                  {cat}
                  <span
                    className={`ml-1.5 text-xs ${
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"
                    }`}
                  >
                    ({categoryCounts[cat] ?? 0})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Posts section ── */}
      <section className="section-padding" ref={gridRef}>
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              /* ── Empty state ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Aucun article dans cette categorie
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Nous n&apos;avons pas encore publie d&apos;article dans la
                  categorie &laquo;&nbsp;{activeCategory}&nbsp;&raquo;.
                  Revenez bientot ou explorez les autres categories.
                </p>
                <button
                  onClick={() => setActiveCategory("Tous")}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Voir tous les articles
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* ── Featured post (first) ── */}
                {featuredPost && (
                  <AnimatedCard index={0}>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="group relative block rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 mb-12"
                    >
                      {/* Gradient accent left bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-[hsl(var(--rocket-teal-glow))] to-primary/40 rounded-l-2xl" />

                      <div className="flex flex-col md:flex-row">
                        {/* Left: decorative area */}
                        <div className="relative md:w-2/5 min-h-[200px] md:min-h-[280px] bg-gradient-to-br from-[hsl(var(--rocket-navy-soft))] to-[hsl(var(--rocket-dark-soft))] flex items-center justify-center overflow-hidden">
                          {/* Decorative pattern */}
                          <div className="absolute inset-0 opacity-10" aria-hidden="true">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at 2px 2px, hsl(var(--rocket-teal)) 1px, transparent 0)",
                                backgroundSize: "24px 24px",
                              }}
                            />
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-3 p-8">
                            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                              <BookOpen className="w-8 h-8 text-primary" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-background/50">
                              Article vedette
                            </span>
                          </div>
                        </div>

                        {/* Right: content */}
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                          <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
                            {featuredPost.category}
                          </span>

                          <h2 className="text-2xl md:text-3xl font-bold leading-snug group-hover:text-primary transition-colors duration-200">
                            {featuredPost.title}
                          </h2>

                          <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-3">
                            {featuredPost.excerpt}
                          </p>

                          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {featuredPost.date}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {featuredPost.readTime}
                            </span>
                          </div>

                          <div className="mt-6">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                              Lire l&apos;article
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedCard>
                )}

                {/* ── Post grid (remaining) ── */}
                {gridPosts.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post, i) => (
                      <AnimatedCard key={post.slug} index={i + 1}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group relative flex flex-col h-full p-6 rounded-xl border border-border/60 bg-background hover:-translate-y-1 hover:shadow-lg hover:border-primary/25 transition-all duration-300"
                        >
                          {/* Category pill */}
                          <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
                            {post.category}
                          </span>

                          {/* Title */}
                          <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-200 mb-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>

                          {/* Hover accent bar at bottom */}
                          <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                      </AnimatedCard>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Newsletter / CTA ── */}
      <section className="border-t border-border/40">
        <div className="container-wide section-padding">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-[hsl(var(--rocket-navy-soft))] text-background p-8 md:p-12 lg:p-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scaleIn}
          >
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 blur-[60px]" />
            </div>

            <div className="relative max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Newsletter
              </span>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Ne manquez{" "}
                <span className="text-gradient">rien</span>
              </h2>

              <p className="mt-4 text-base md:text-lg text-background/70 leading-relaxed">
                Recevez nos analyses et guides directement dans votre boite mail.
                Pas de spam, que du contenu actionnable pour vos recrutements.
              </p>

              <div className="mt-8">
                <a
                  href="https://meetings.hubspot.com/theophile-choupin/rpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2"
                >
                  S&apos;inscrire a la newsletter
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <p className="mt-4 text-xs text-background/50">
                Desabonnement en un clic. Pas de partage de vos donnees.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <CTASection />
    </>
  );
}

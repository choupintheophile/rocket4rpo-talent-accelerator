"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} custom={index} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

const RESULTS_PER_PAGE = 30;

export default function BlogPageClient({
  posts,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      const text = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [posts, query]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleClear() {
    setQuery("");
    setVisibleCount(RESULTS_PER_PAGE);
  }

  function handleSearch(value: string) {
    setQuery(value);
    setVisibleCount(RESULTS_PER_PAGE);
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[hsl(var(--rocket-navy-soft))] text-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(hsl(var(--rocket-teal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--rocket-teal)) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[hsl(var(--rocket-teal)/0.08)] blur-[120px] animate-pulse" />
        </div>

        <div className="relative container-wide section-padding pb-12">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20">
              <BookOpen className="w-3.5 h-3.5" />
              Blog & conseils
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight">
              L&apos;expertise recrutement,{" "}
              <span className="text-gradient">en accès libre</span>
            </h1>

            <p className="mt-5 text-lg text-background/70 leading-relaxed max-w-2xl">
              {posts.length} articles sur le Talent Acquisition, le RPO, le sourcing et le recrutement Tech. Par des experts avec 200+ recrutements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search bar (sticky) */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/60">
        <div className="container-wide py-3">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher un article... (ex: RPO, sourcing LinkedIn, salaires tech)"
              className="w-full pl-11 pr-10 py-3 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-muted-foreground/60"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          {query && (
            <p className="mt-2 text-xs text-muted-foreground">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""} pour « {query} »
            </p>
          )}
        </div>
      </div>

      {/* Posts */}
      <section className="section-padding" ref={gridRef}>
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
                <p className="text-muted-foreground max-w-md">
                  Aucun article ne correspond à « {query} ». Essayez avec d&apos;autres mots-clés.
                </p>
                <button onClick={handleClear} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Voir tous les articles
                </button>
              </motion.div>
            ) : (
              <motion.div key={query || "all"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

                {/* Featured post (only when no search) */}
                {!query && displayed[0] && (
                  <AnimatedCard index={0}>
                    <Link
                      href={`/blog/${displayed[0].slug}`}
                      className="group relative block rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 mb-12"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-[hsl(var(--rocket-teal-glow))] to-primary/40 rounded-l-2xl" />
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-2/5 min-h-[200px] md:min-h-[280px] bg-gradient-to-br from-[hsl(var(--rocket-navy-soft))] to-[hsl(var(--rocket-dark-soft))] flex items-center justify-center overflow-hidden">
                          <div className="relative z-10 flex flex-col items-center gap-3 p-8">
                            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                              <BookOpen className="w-8 h-8 text-primary" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-background/50">Article vedette</span>
                          </div>
                        </div>
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                          <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">{displayed[0].category}</span>
                          <h2 className="text-2xl md:text-3xl font-bold leading-snug group-hover:text-primary transition-colors">{displayed[0].title}</h2>
                          <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-3">{displayed[0].excerpt}</p>
                          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{displayed[0].date}</span>
                            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{displayed[0].readTime}</span>
                          </div>
                          <div className="mt-6">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">Lire l&apos;article <ArrowRight className="w-4 h-4" /></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedCard>
                )}

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(query ? displayed : displayed.slice(1)).map((post, i) => (
                    <AnimatedCard key={post.slug} index={i + 1}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group relative flex flex-col h-full p-6 rounded-xl border border-border/60 bg-background hover:-translate-y-1 hover:shadow-lg hover:border-primary/25 transition-all duration-300"
                      >
                        <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">{post.category}</span>
                        <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                        <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                          <span className="inline-flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((v) => v + RESULTS_PER_PAGE)}
                      className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold rounded-xl border border-border bg-background hover:bg-muted transition-colors"
                    >
                      Charger plus d&apos;articles ({filtered.length - visibleCount} restants)
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border/40">
        <div className="container-wide section-padding">
          <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--rocket-navy-soft))] text-background p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
            </div>
            <div className="relative max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Newsletter
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">Ne manquez <span className="text-gradient">rien</span></h2>
              <p className="mt-4 text-base text-background/70 leading-relaxed">
                Recevez nos analyses et guides directement dans votre boîte mail.
              </p>
              <div className="mt-8">
                <a href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  S&apos;inscrire <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

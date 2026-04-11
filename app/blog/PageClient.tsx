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
  TrendingUp,
  Users,
  Target,
  ChevronRight,
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
  imageUrl?: string | null;
}

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.06, duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const RESULTS_PER_PAGE = 24;

export default function BlogPageClient({
  posts,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      const text = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [posts, query]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[140px]" />
          <div className="absolute bottom-0 left-[15%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative container-wide py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Blog & conseils
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
              L{"'"}expertise recrutement,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                en accès libre
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/55 leading-relaxed max-w-2xl">
              Guides pratiques, analyses de marché et retours d{"'"}expérience issus de nos 200+ recrutements. Tout ce qu{"'"}il faut pour recruter mieux.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { icon: BookOpen, value: `${posts.length}`, label: "articles publiés" },
              { icon: Target, value: "24", label: "catégories" },
              { icon: TrendingUp, value: "200+", label: "recrutements d'expérience" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-rocket-teal-glow" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{stat.value}</div>
                  <div className="text-white/35 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH BAR (sticky) ── */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container-wide py-3.5">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisibleCount(RESULTS_PER_PAGE); }}
              placeholder="Rechercher un article par mot-clé, sujet ou catégorie..."
              className="w-full pl-12 pr-10 py-3.5 text-sm rounded-2xl border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
            />
            {query && (
              <button onClick={() => { setQuery(""); setVisibleCount(RESULTS_PER_PAGE); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          {query && (
            <p className="mt-2 text-xs text-muted-foreground">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""} pour « <strong>{query}</strong> »
            </p>
          )}
        </div>
      </div>

      {/* ── ARTICLES ── */}
      <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <h3 className="text-xl font-bold mb-2">Aucun article trouvé</h3>
                <p className="text-muted-foreground max-w-md text-sm">
                  Aucun article ne correspond à « {query} ». Essayez avec d{"'"}autres mots-clés.
                </p>
                <button onClick={() => { setQuery(""); setVisibleCount(RESULTS_PER_PAGE); }} className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Voir tous les articles
                </button>
              </motion.div>
            ) : (
              <motion.div key={query || "all"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

                {/* Featured post */}
                {!query && displayed[0] && (
                  <AnimatedCard index={0}>
                    <Link
                      href={`/blog/${displayed[0].slug}`}
                      className="group relative block rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 mb-14 border border-border/40"
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Image */}
                        <div className="relative lg:w-[45%] h-[240px] lg:h-auto bg-gradient-to-br from-rocket-dark to-rocket-navy-soft overflow-hidden">
                          {displayed[0].imageUrl ? (
                            <img src={displayed[0].imageUrl} alt={displayed[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-white/10" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent lg:bg-gradient-to-l" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white shadow-lg">Article vedette</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center bg-white">
                          <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">{displayed[0].category}</span>
                          <h2 className="text-2xl lg:text-3xl font-bold leading-snug group-hover:text-primary transition-colors">{displayed[0].title}</h2>
                          <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">{displayed[0].excerpt}</p>
                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{displayed[0].date}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{displayed[0].readTime}</span>
                            </div>
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                              Lire <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedCard>
                )}

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                  {(query ? displayed : displayed.slice(1)).map((post, i) => (
                    <AnimatedCard key={post.slug} index={i}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group relative flex flex-col h-full rounded-2xl border border-border/40 bg-white overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/20 transition-all duration-400"
                      >
                        {/* Card image */}
                        {post.imageUrl && (
                          <div className="relative h-[180px] overflow-hidden">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/90 text-foreground backdrop-blur-sm">{post.category}</span>
                          </div>
                        )}

                        {!post.imageUrl && (
                          <div className="px-6 pt-6">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{post.category}</span>
                          </div>
                        )}

                        {/* Card content */}
                        <div className="flex flex-col flex-1 p-6 pt-4">
                          <h3 className="text-[15px] font-bold leading-snug group-hover:text-primary transition-colors mb-2.5 line-clamp-2">{post.title}</h3>
                          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                          <div className="mt-4 pt-3.5 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                          </div>
                        </div>

                        {/* Hover accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-14 text-center">
                    <button
                      onClick={() => setVisibleCount((v) => v + RESULTS_PER_PAGE)}
                      className="inline-flex items-center gap-2 px-10 py-3.5 text-sm font-semibold rounded-2xl border-2 border-border/60 bg-white hover:bg-gray-50 hover:border-primary/20 transition-all shadow-sm"
                    >
                      Voir plus d{"'"}articles
                      <span className="text-xs text-muted-foreground ml-1">({filtered.length - visibleCount} restants)</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="border-t border-border/30">
        <div className="container-wide section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white p-8 md:p-12 lg:p-16"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-emerald-500/8 blur-[60px]" />
            </div>
            <div className="relative max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Restez informé
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Ne manquez <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal to-emerald-400">rien</span>
              </h2>
              <p className="mt-4 text-base text-white/55 leading-relaxed">
                Recevez nos analyses, guides et templates directement par email. Pas de spam, que du contenu actionnable.
              </p>
              <div className="mt-8">
                <a href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg">
                  Réserver un échange <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

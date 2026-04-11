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
  imageUrl?: string | null;
}

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

const PER_PAGE = 24;

export default function BlogPageClient({ posts }: { posts: BlogPost[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const words = query.toLowerCase().trim().split(/\s+/);
    return posts.filter((p) => {
      const t = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return words.every((w) => t.includes(w));
    });
  }, [posts, query]);

  const shown = filtered.slice(0, count);
  const featured = !query ? shown[0] : null;
  const grid = !query ? shown.slice(1) : shown;

  return (
    <>
      <Breadcrumbs items={[{ label: "Nos conseils" }]} />

      {/* Hero — blog style */}
      <section className="bg-white border-b border-border/40">
        <div className="container-wide py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-5">
              <BookOpen className="w-3 h-3" /> Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Nos conseils
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {posts.length} articles pour recruter mieux, plus vite et moins cher.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search sticky */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-border/40">
        <div className="container-wide py-3">
          <div className="relative max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCount(PER_PAGE); }}
              placeholder="Rechercher un article..."
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-lg border border-border/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            {query && (
              <button onClick={() => { setQuery(""); setCount(PER_PAGE); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          {query && <p className="mt-1.5 text-xs text-muted-foreground">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</p>}
        </div>
      </div>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 text-center">
                <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-semibold mb-1">Aucun résultat</p>
                <p className="text-sm text-muted-foreground mb-6">Essayez d{"'"}autres mots-clés.</p>
                <button onClick={() => { setQuery(""); setCount(PER_PAGE); }} className="text-sm font-medium text-primary hover:underline">Voir tous les articles</button>
              </motion.div>
            ) : (
              <motion.div key={query || "all"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* Featured */}
                {featured && (
                  <AnimatedCard index={0}>
                    <Link href={`/blog/${featured.slug}`} className="group block mb-14">
                      <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/40 hover:shadow-xl transition-shadow duration-500">
                        <div className="relative h-[260px] lg:h-[380px] overflow-hidden bg-gray-100">
                          {featured.imageUrl ? (
                            <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-emerald-500/10 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-primary/20" />
                            </div>
                          )}
                        </div>
                        <div className="p-8 lg:p-10 flex flex-col justify-center bg-white">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-primary/10 text-primary">{featured.category}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold leading-snug group-hover:text-primary transition-colors">{featured.title}</h2>
                          <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">{featured.excerpt}</p>
                          <div className="mt-6 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                            <span className="text-sm font-semibold text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Lire <ArrowRight className="w-3.5 h-3.5" /></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedCard>
                )}

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grid.map((post, i) => (
                    <AnimatedCard key={post.slug} index={i}>
                      <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-xl overflow-hidden border border-border/40 bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        {post.imageUrl && (
                          <div className="h-[170px] overflow-hidden bg-gray-100">
                            <img src={post.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                          </div>
                        )}
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary">{post.category}</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{post.readTime}</span>
                          </div>
                          <h3 className="text-[15px] font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">{post.title}</h3>
                          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                          <div className="mt-4 pt-3 border-t border-border/30 text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />{post.date}
                          </div>
                        </div>
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>

                {count < filtered.length && (
                  <div className="mt-12 text-center">
                    <button onClick={() => setCount((c) => c + PER_PAGE)} className="px-8 py-3 text-sm font-semibold rounded-xl border border-border/60 hover:bg-gray-50 transition-colors">
                      Voir plus ({filtered.length - count} restants)
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </>
  );
}

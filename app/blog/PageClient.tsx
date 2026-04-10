"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export default function BlogPageClient({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Blog Talent Acquisition, RPO & Recrutement Tech</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Analyses, guides et retours d&apos;expérience sur le Talent Acquisition et le recrutement Tech.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">Tous</span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1.5 text-sm font-medium rounded-full bg-secondary text-secondary-foreground cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/blog/${post.slug}`} className="group block p-6 rounded-xl border border-border/60 bg-background hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 transition-all duration-200 h-full">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3">{post.category}</span>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    {post.date} · {post.readTime}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { motion } from "framer-motion";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="section-padding pt-8">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
            <p className="mt-4 text-muted-foreground">
              {post.date} · {post.readTime}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">CM</span>
              </div>
              <span>Par <a href="https://www.linkedin.com/in/clement-martin-rocket4sales/" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">Clément Martin</a>, CEO Rocket4Sales</span>
            </div>

            {/* Key Takeaways box — AI citation optimization */}
            {post.excerpt && (
              <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2">En bref</p>
                <p className="text-foreground font-medium leading-relaxed">{post.excerpt}</p>
              </div>
            )}

            <div className="mt-8 prose prose-lg max-w-none text-foreground">
              <p className="text-lg leading-relaxed">{post.content}</p>
            </div>
          </motion.div>
        </div>
      </article>

      <CTASection />
    </>
  );
}

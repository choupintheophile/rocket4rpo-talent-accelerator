"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
}

interface Props {
  posts: BlogPost[];
}

export const BlogPreview = ({ posts }: Props) => (
  <section className="section-padding bg-muted/30">
    <div className="container-wide">
      <SectionHeading
        badge="Blog"
        title={
          <>
            {"Derni\u00e8res "}
            <span className="text-gradient">ressources</span>
          </>
        }
      />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          {"Nos articles arrivent bient\u00f4t. Restez connect\u00e9s\u00a0!"}
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              >
                <span className="inline-block self-start px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-muted-foreground">
                    {post.date}
                    {post.readTime && ` · ${post.readTime}`}
                  </time>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    {"Lire \u2192"}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          {"Voir toutes les ressources"} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

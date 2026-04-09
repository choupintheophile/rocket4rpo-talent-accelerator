"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const akaru = [0.165, 0.84, 0.44, 1] as const;

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
            {"Dernières "}
            <span className="text-gradient">ressources</span>
          </>
        }
      />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          {"Nos articles arrivent bientôt. Restez connectés\u00a0!"}
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 60, skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: akaru,
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden"
              >
                {/* Category badge with scale bounce */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.15 + 0.3,
                    ease: akaru,
                    scale: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: i * 0.15 + 0.3,
                    },
                  }}
                  className="inline-block self-start px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4"
                >
                  {post.category}
                </motion.span>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: akaru }}
        className="mt-10 text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          {"Voir toutes les ressources"} <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

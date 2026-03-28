import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { blogPosts } from "@/data/blog";
import { motion } from "framer-motion";

const BlogArticle = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="section-padding container-tight text-center">
          <h1 className="text-3xl font-bold">Article non trouvé</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          publisher: { "@type": "Organization", name: "Rocket4RPO" },
        }}
      />
      <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />

      <article className="section-padding pt-8">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
            <p className="mt-4 text-muted-foreground">{post.date} · {post.readTime}</p>
            <div className="mt-8 prose prose-lg max-w-none text-foreground">
              <p className="text-lg leading-relaxed">{post.content}</p>
              <p className="text-muted-foreground mt-6">Cet article sera complété prochainement avec un contenu détaillé. Revenez bientôt !</p>
            </div>
          </motion.div>
        </div>
      </article>

      <CTASection />
    </Layout>
  );
};

export default BlogArticle;

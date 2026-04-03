import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/lib/seo";
import { sitemapRoutes } from "@/data/routes";
import { MapIcon } from "lucide-react";
import { useMemo } from "react";

const Sitemap = () => {
  const grouped = useMemo(() => {
    const categories = new globalThis.Map<string, typeof sitemapRoutes>();
    sitemapRoutes.forEach((route) => {
      if (!categories.has(route.category)) categories.set(route.category, []);
      categories.get(route.category)!.push(route);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <Layout>
      <SEO
        title="Plan du site"
        description="Retrouvez l'ensemble des pages de Rocket4RPO : offres, métiers, ressources et informations légales."
        canonical="/sitemap"
        noindex
      />

      <section className="pt-32 pb-20">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <Map className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Plan du site
            </h1>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Accédez rapidement à l'ensemble des pages de Rocket4RPO.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {grouped.map(([category, routes]) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {category}
                </h2>
                <ul className="space-y-2">
                  {routes.map((route) => (
                    <li key={route.path}>
                      <Link
                        to={route.path}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sitemap;

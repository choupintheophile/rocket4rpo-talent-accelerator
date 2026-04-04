import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";

const TalentAcquisitionTempsPartage = lazy(() => import("./pages/offers/TalentAcquisitionTempsPartage"));
const TalentAcquisitionTempsPlein = lazy(() => import("./pages/offers/TalentAcquisitionTempsPlein"));
const RecrutementTalentAcquisition = lazy(() => import("./pages/offers/RecrutementTalentAcquisition"));
const OutilsSourcingEnablement = lazy(() => import("./pages/offers/OutilsSourcingEnablement"));
const RecrutementSales = lazy(() => import("./pages/industries/RecrutementSales"));
const RecrutementIT = lazy(() => import("./pages/industries/RecrutementIT"));
const RecrutementFinance = lazy(() => import("./pages/industries/RecrutementFinance"));
const RecrutementMarketing = lazy(() => import("./pages/industries/RecrutementMarketing"));
const RecrutementSupport = lazy(() => import("./pages/industries/RecrutementSupport"));
const CasClients = lazy(() => import("./pages/CasClients"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Equipe = lazy(() => import("./pages/Equipe"));
const Recrutement = lazy(() => import("./pages/Recrutement"));
const Rocket4GTM = lazy(() => import("./pages/Rocket4GTM"));
const Contact = lazy(() => import("./pages/Contact"));
const MentionsLegales = lazy(() => import("./pages/legal/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/legal/PolitiqueConfidentialite"));
const CGU = lazy(() => import("./pages/legal/CGU"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { sitemapRoutes } from "./data/routes";

const helmetContext = {};

export async function prerender(data: { url: string }) {
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={data.url}>
            <Suspense fallback={<div />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/offre/talent-acquisition-temps-partage" element={<TalentAcquisitionTempsPartage />} />
                <Route path="/offre/talent-acquisition-temps-plein" element={<TalentAcquisitionTempsPlein />} />
                <Route path="/offre/recrutement-talent-acquisition" element={<RecrutementTalentAcquisition />} />
                <Route path="/offre/outils-sourcing-enablement" element={<OutilsSourcingEnablement />} />
                <Route path="/metiers/recrutement-sales" element={<RecrutementSales />} />
                <Route path="/metiers/recrutement-it" element={<RecrutementIT />} />
                <Route path="/metiers/recrutement-finance" element={<RecrutementFinance />} />
                <Route path="/metiers/recrutement-marketing" element={<RecrutementMarketing />} />
                <Route path="/metiers/recrutement-support" element={<RecrutementSupport />} />
                <Route path="/cas-clients" element={<CasClients />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/equipe" element={<Equipe />} />
                <Route path="/recrutement" element={<Recrutement />} />
                <Route path="/rocket4gtm" element={<Rocket4GTM />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    html,
    links: sitemapRoutes.map((r) => r.path),
  };
}

import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import { sitemapRoutes } from "./data/routes";

// Lazy imports won't resolve in sync renderToString, so we import them eagerly for prerendering
import TalentAcquisitionTempsPartage from "./pages/offers/TalentAcquisitionTempsPartage";
import TalentAcquisitionTempsPlein from "./pages/offers/TalentAcquisitionTempsPlein";
import RecrutementTalentAcquisition from "./pages/offers/RecrutementTalentAcquisition";
import OutilsSourcingEnablement from "./pages/offers/OutilsSourcingEnablement";
import RecrutementSales from "./pages/industries/RecrutementSales";
import RecrutementIT from "./pages/industries/RecrutementIT";
import RecrutementFinance from "./pages/industries/RecrutementFinance";
import RecrutementMarketing from "./pages/industries/RecrutementMarketing";
import RecrutementSupport from "./pages/industries/RecrutementSupport";
import CasClients from "./pages/CasClients";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Equipe from "./pages/Equipe";
import Recrutement from "./pages/Recrutement";
import Rocket4GTM from "./pages/Rocket4GTM";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/legal/MentionsLegales";
import PolitiqueConfidentialite from "./pages/legal/PolitiqueConfidentialite";
import CGU from "./pages/legal/CGU";
import Sitemap from "./pages/Sitemap";

const helmetContext = {} as { helmet?: { title?: { toString(): string }; meta?: { toString(): string }; link?: { toString(): string }; script?: { toString(): string } } };

export async function prerender(data: { url: string }) {
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MemoryRouter initialEntries={[data.url]}>
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
            </Routes>
          </MemoryRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  // Inject helmet head tags
  const { helmet } = helmetContext;
  let head = "";
  if (helmet) {
    head = [
      helmet.title?.toString(),
      helmet.meta?.toString(),
      helmet.link?.toString(),
      helmet.script?.toString(),
    ]
      .filter(Boolean)
      .join("\n");
  }

  return {
    html,
    head,
    links: sitemapRoutes.map((r) => r.path),
  };
}

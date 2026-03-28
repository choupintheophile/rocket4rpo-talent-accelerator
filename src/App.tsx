import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

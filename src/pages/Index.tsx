import { Layout } from "@/components/layout/Layout";
import { SEO, organizationSchema } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { OffersSection } from "@/components/sections/OffersSection";
import { WhySection } from "@/components/sections/WhySection";
import { ScopeSection } from "@/components/sections/ScopeSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { JoinSection } from "@/components/sections/JoinSection";
import { CTASection } from "@/components/shared/CTASection";

const Index = () => (
  <Layout>
    <SEO
      title="Rocket4RPO — Talent Acquisition RPO pour entreprises Tech"
      description="Recruteur RPO dédié pour startups et scale-ups tech. Talent Acquisition à temps partagé ou plein. Réduisez vos coûts de recrutement de 40%."
      canonical="/"
      schema={organizationSchema}
    />
    <HeroSection />
    <TrustSection />
    <OffersSection />
    <WhySection />
    <ScopeSection />
    <MethodSection />
    <CaseStudiesPreview />
    <TeamPreview />
    <JoinSection />
    <CTASection />
  </Layout>
);

export default Index;

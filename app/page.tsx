import type { Metadata } from "next";
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
import { organizationSchema, professionalServiceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rocket4RPO — Talent Acquisition RPO pour entreprises Tech",
  description:
    "Recruteur RPO dédié pour startups et scale-ups tech. Talent Acquisition à temps partagé ou plein. Réduisez vos coûts de recrutement de 40%.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, professionalServiceSchema]),
        }}
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
    </>
  );
}

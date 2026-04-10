"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyCTA } from "@/components/shared/StickyCTA";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { ConversationalCTA } from "@/components/shared/ConversationalCTA";
import { CookieBanner } from "@/components/shared/CookieBanner";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWebapp = pathname.startsWith("/webapp-testing");

  if (isWebapp) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1 pt-20 lg:pt-24">{children}</main>
        <Footer />
      </div>
      <StickyCTA />
      <div className="hidden lg:block">
        <ExitIntentPopup />
      </div>
      <div className="hidden lg:block">
        <ConversationalCTA />
      </div>
      <CookieBanner />
    </>
  );
}

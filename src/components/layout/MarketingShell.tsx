"use client";

import { usePathname } from "next/navigation";

export function MarketingShell({
  children,
  navbar,
  footer,
  extras,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  extras: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWebapp = pathname.startsWith("/webapp-testing");
  const isHome = pathname === "/";

  if (isWebapp) {
    return <>{children}</>;
  }

  // v29 — Homepage = vitrine pure : pas de footer, pas d'extras (StickyCTA, ConversationalCTA, ExitIntentPopup, CookieBanner)
  if (isHome) {
    return (
      <div className="min-h-screen flex flex-col">
        {navbar}
        <main id="main-content" className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {navbar}
        <main id="main-content" className="flex-1 pt-20 lg:pt-24">{children}</main>
        {footer}
      </div>
      {extras}
    </>
  );
}

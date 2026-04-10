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

  if (isWebapp) {
    return <>{children}</>;
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

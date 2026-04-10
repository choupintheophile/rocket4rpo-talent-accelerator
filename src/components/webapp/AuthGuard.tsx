"use client";

import { usePathname } from "next/navigation";

// The middleware.ts handles server-side auth redirection.
// This component just provides the correct layout wrapper.
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page renders without sidebar
  if (pathname === "/webapp-testing/login") {
    return <>{children}</>;
  }

  // All other pages are protected by middleware — just render children
  return <>{children}</>;
}

"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/webapp/AppSidebar";
import { AuthGuard } from "@/components/webapp/AuthGuard";

export default function WebappLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/webapp-testing/login";

  return (
    <AuthGuard>
      {isLogin ? (
        // Login page: no sidebar, no chrome
        <>{children}</>
      ) : (
        // App pages: sidebar + main content
        <div className="flex min-h-screen bg-[#f7f7f5]">
          <AppSidebar />
          <main className="mt-14 lg:mt-0 lg:ml-[220px] flex-1">{children}</main>
        </div>
      )}
    </AuthGuard>
  );
}

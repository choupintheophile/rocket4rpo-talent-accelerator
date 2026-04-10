"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === "/webapp-testing/login") {
      setChecked(true);
      setAuthed(true);
      return;
    }

    const auth = getCookie("r4rpo_auth");
    if (auth === "1") {
      setAuthed(true);
    } else {
      router.replace("/webapp-testing/login");
    }
    setChecked(true);
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!authed) return null;

  return <>{children}</>;
}

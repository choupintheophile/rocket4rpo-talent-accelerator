"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { AnalyticsTracker } from "@/components/shared/AnalyticsTracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* v24 — Tracking comportemental global (scroll, time, rage clicks, page view) */}
      <AnalyticsTracker />
      {children}
    </TooltipProvider>
  );
}

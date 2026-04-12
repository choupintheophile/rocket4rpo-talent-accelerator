"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart3, HelpCircle, LogOut, Menu, X, PieChart, Plus } from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/webapp-testing/dashboard", label: "Dashboard", icon: PieChart },
  { href: "/webapp-testing/vivier", label: "Vivier", icon: LayoutGrid },
  { href: "/webapp-testing/classement", label: "Classement", icon: BarChart3 },
  { href: "/webapp-testing/questions", label: "Questions", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      {/* Quick action */}
      <div className="px-4 pt-3 pb-1">
        <Link
          href="/webapp-testing/candidat/nouveau"
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-[12px] font-semibold rounded-lg bg-rocket-teal text-white hover:bg-rocket-teal/90 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Nouveau candidat
        </Link>
      </div>

      <nav className="flex-1 py-2">
        {navItems.map((item) => {
          const active =
            item.href === "/webapp-testing/vivier"
              ? pathname === "/webapp-testing/vivier" || pathname === "/webapp-testing" || pathname.startsWith("/webapp-testing/candidat")
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-[13px] border-l-[3px] transition-all ${
                active
                  ? "text-white bg-white/10 border-l-white/55"
                  : "text-white/60 border-l-transparent hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-[15px] h-[15px] flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10">
        <button
          onClick={async () => {
            if (!confirm("Se déconnecter ?")) return;
            await fetch("/api/auth", { method: "DELETE" });
            window.location.href = "/webapp-testing/login";
          }}
          className="flex items-center gap-2.5 px-5 py-3 text-[12px] text-red-400/70 hover:text-red-400 transition-colors w-full text-left"
        >
          <LogOut className="w-[14px] h-[14px]" />
          <span>Déconnexion</span>
        </button>
      </div>

      <div className="border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] text-white/30 hover:text-white/50 transition-colors"
        >
          <span>{"← Retour au site"}</span>
        </Link>
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] text-white/20">
        v15.0 · R4RPO · 15 critères
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-rocket-dark h-14 flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/70 hover:text-white p-1">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="text-[13px] font-semibold text-white tracking-wide">ROCKET4RPO</span>
        <span className="text-[11px] text-white/40">Vivier TA/TAM</span>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed top-14 left-0 bottom-0 w-[220px] bg-rocket-dark flex flex-col z-50">
            {navContent}
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[220px] bg-rocket-dark flex-col fixed top-0 left-0 bottom-0 z-50">
        <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
          <Image src="/logo-rocket4rpo.webp" alt="R4RPO" width={120} height={80} className="h-10 w-auto" />
        </div>
        {navContent}
      </aside>
    </>
  );
}

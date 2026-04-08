import type { Metadata } from "next";
import BlogPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Blog — Talent Acquisition, RPO, sourcing et recrutement Tech",
  description: "Articles, guides et analyses sur le Talent Acquisition, le RPO, le sourcing et le recrutement dans l'écosystème Tech. Par les experts Rocket4RPO.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogPageClient />;
}

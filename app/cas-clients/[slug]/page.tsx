import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/db";
import CaseStudyClient from "./CaseStudyClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Cas client non trouvé" };

  return {
    title: `${study.company} — cas client RPO | Rocket4RPO`,
    description: study.challenge,
    alternates: { canonical: `/cas-clients/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const metrics = study.metrics as { value: string; label: string }[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.company} — cas client RPO`,
    description: study.challenge,
    publisher: { "@type": "Organization", name: "Rocket4RPO" },
  };

  const serialized = {
    slug: study.slug,
    company: study.company,
    industry: study.industry,
    challenge: study.challenge,
    intervention: study.intervention,
    metrics,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CaseStudyClient study={serialized} />
    </>
  );
}

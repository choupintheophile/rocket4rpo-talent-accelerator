"use client";

import { personSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  shortBio: string;
  fullBio: string;
  photoUrl: string | null;
  linkedin: string | null;
}

const bioOverrides: Record<string, string> = {
  "Théophile Choupin":
    "Théophile pilote le développement commercial de Rocket4RPO auprès des scale-ups et ETI Tech. Fort de 5 ans d\u2019expérience en business development B2B, il accompagne les dirigeants dans la structuration de leur stratégie de recrutement et les aide à identifier le bon modèle d\u2019intervention RPO.",
  "Julien Regnacq":
    "Julien développe le portefeuille clients de Rocket4RPO sur le segment des startups et PME innovantes. Fort de son expertise en recrutement, il accompagne les fondateurs et DRH pour accélérer leurs recrutements clés.",
};

const taSpecialists = [
  { initials: "LC", name: "L. Carpentier", specialty: "Commercial & Business Development \u00b7 SDR, AE, Sales Manager", experience: "6 ans d\u2019expérience en recrutement commercial" },
  { initials: "AB", name: "A. Benoist", specialty: "IT & Engineering \u00b7 Backend, DevOps, Data", experience: "5 ans d\u2019expérience en sourcing tech" },
  { initials: "SR", name: "S. Renaud", specialty: "Marketing & Growth \u00b7 CMO, Growth, PMM", experience: "4 ans d\u2019expérience en recrutement marketing digital" },
];

export default function EquipePageClient({ members }: { members: TeamMember[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(members.map((m) => personSchema(m.name, m.role, m.shortBio, m.linkedin || undefined))),
        }}
      />
      <Breadcrumbs items={[{ label: "Équipe" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              L&apos;équipe <span className="text-gradient">Rocket4RPO</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">Des experts qui vivent le recrutement Tech au quotidien.</p>
          </div>

          <div className="space-y-12 max-w-3xl">
            {members.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-border"
              >
                {m.photoUrl && (
                  <Image
                    src={m.photoUrl}
                    alt={`${m.name} — ${m.role} chez Rocket4RPO`}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{m.name}</h2>
                  <p className="text-sm text-primary font-medium">{m.role}</p>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {bioOverrides[m.name] || m.fullBio}
                  </p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:underline"
                    >
                      <Linkedin className="w-4 h-4" /> Voir le profil LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Nos Talent Acquisition Specialists ── */}
          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Nos Talent Acquisition Specialists</h2>
            <p className="text-muted-foreground mb-8">
              Nos TA Specialists sont des recruteurs seniors avec 3 à 8 ans d&apos;expérience, spécialisés par métier et intégrés directement dans vos équipes.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {taSpecialists.map((ta) => (
                <motion.div
                  key={ta.initials}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-border text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {ta.initials}
                  </div>
                  <h3 className="font-bold">{ta.name}</h3>
                  <p className="text-sm text-primary mt-1">{ta.specialty}</p>
                  <p className="text-xs text-muted-foreground mt-2">{ta.experience}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

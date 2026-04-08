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
                  <p className="mt-3 text-muted-foreground leading-relaxed">{m.fullBio}</p>
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
        </div>
      </section>

      <CTASection />
    </>
  );
}

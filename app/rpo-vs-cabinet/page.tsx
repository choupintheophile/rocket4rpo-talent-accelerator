import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Minus, Rocket } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RPO vs Cabinet de recrutement — quel modèle choisir ?",
  description:
    "Comparatif détaillé RPO vs cabinet de recrutement : coûts, délais, flexibilité et intégration. Découvrez quel modèle convient à vos recrutements Sales & Tech.",
  alternates: { canonical: "/rpo-vs-cabinet" },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  cabinet: string;
  rpoIcon: "check" | "x" | "minus";
  cabinetIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Cou\u0302t pour 10 recrutements",
    rpo: "~44 000 \u20ac (TJM 550 \u20ac/j)",
    cabinet: "60 000 \u2013 200 000 \u20ac (15-25 % du salaire)",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Mod\u00e8le de facturation",
    rpo: "TJM pr\u00e9visible, ajustable",
    cabinet: "Success fee au pourcentage",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "D\u00e9lai premi\u00e8re shortlist",
    rpo: "48 h",
    cabinet: "2-3 semaines",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Int\u00e9gration \u00e9quipe",
    rpo: "Totale (rituels, outils, Slack)",
    cabinet: "Externe ponctuel",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert recrutement tous secteurs + m\u00e9thodologie \u00e9prouv\u00e9e",
    cabinet: "G\u00e9n\u00e9raliste ou niche",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "Flexibilit\u00e9",
    rpo: "1-4 jours/sem, ajustable chaque mois",
    cabinet: "Par mission, engagement fixe",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "Suivi et reporting",
    rpo: "KPIs hebdomadaires, dashboard partag\u00e9",
    cabinet: "Reporting ponctuel",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "D\u00e9marrage",
    rpo: "48 h apr\u00e8s signature",
    cabinet: "1-3 semaines",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
];

const faqs = [
  {
    question: "Quelle est la principale diff\u00e9rence entre un RPO et un cabinet de recrutement ?",
    answer:
      "Le RPO s\u2019int\u00e8gre directement dans votre \u00e9quipe et travaille en continu sur vos recrutements, comme un recruteur interne externalis\u00e9. Le cabinet intervient ponctuellement, mission par mission, sans int\u00e9gration \u00e0 vos process internes.",
  },
  {
    question: "Le RPO est-il moins cher qu\u2019un cabinet de recrutement ?",
    answer:
      "Oui, en g\u00e9n\u00e9ral. Pour 10 recrutements, un RPO co\u00fbte environ 44 000 \u20ac (TJM 550 \u20ac/j) contre 60 000 \u00e0 200 000 \u20ac pour un cabinet facturant 15-25 % du salaire annuel brut. Plus le volume est \u00e9lev\u00e9, plus l\u2019\u00e9cart se creuse en faveur du RPO.",
  },
  {
    question: "Peut-on combiner RPO et cabinet de recrutement ?",
    answer:
      "Absolument. Beaucoup d\u2019entreprises utilisent un RPO pour le flux r\u00e9current (commerciaux, d\u00e9veloppeurs) et un cabinet pour des profils rares ou C-level. Les deux approches sont compl\u00e9mentaires.",
  },
  {
    question: "Quelle est la dur\u00e9e minimum d\u2019un engagement RPO ?",
    answer:
      "Chez Rocket4RPO, nous recommandons un minimum de 3 mois pour avoir un impact mesurable. Le cabinet, lui, fonctionne mission par mission sans dur\u00e9e minimum fixe.",
  },
  {
    question: "Le RPO a-t-il acc\u00e8s \u00e0 mes outils internes (ATS, Slack, etc.) ?",
    answer:
      "Oui, c\u2019est m\u00eame l\u2019un des principes fondamentaux du RPO. Le recruteur RPO utilise vos outils (ATS, Slack, outils de sourcing) et participe \u00e0 vos rituels d\u2019\u00e9quipe comme un collaborateur interne.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Icon({ type }: { type: "check" | "x" | "minus" }) {
  if (type === "check") return <Check className="w-4 h-4 text-green-500 shrink-0" />;
  if (type === "x") return <X className="w-4 h-4 text-red-500 shrink-0" />;
  return <Minus className="w-4 h-4 text-amber-500 shrink-0" />;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RpoVsCabinetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <Breadcrumbs items={[{ label: "RPO vs Cabinet" }]} />

      {/* Hero */}
      <section className="section-padding pt-8">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            RPO vs Cabinet de recrutement : le guide d&eacute;cisif
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Vous h&eacute;sitez entre externaliser vos recrutements via un RPO ou
            mandater un cabinet ? Co&ucirc;ts, d&eacute;lais, int&eacute;gration,
            flexibilit&eacute; : ce comparatif factuel vous aide &agrave; choisir le
            mod&egrave;le le plus adapt&eacute; &agrave; votre contexte.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[28%]">
                    Crit&egrave;re
                  </th>
                  <th className="text-left py-4 px-4 font-bold w-[36%] border-x-2 border-primary bg-primary/5 rounded-t-lg">
                    <span className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" />
                      RPO Rocket4RPO
                    </span>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[36%]">
                    Cabinet classique
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium">{row.criteria}</td>
                    <td className="py-3.5 px-4 border-x-2 border-primary bg-primary/5">
                      <span className="flex items-center gap-2">
                        <Icon type={row.rpoIcon} />
                        {row.rpo}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Icon type={row.cabinetIcon} />
                        {row.cabinet}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to choose */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* RPO */}
            <div className="rounded-xl border-2 border-primary p-6 bg-primary/5">
              <h2 className="text-xl font-bold mb-4">Quand choisir un RPO</h2>
              <ul className="space-y-3">
                {[
                  "Vous avez 5 \u00e0 15+ recrutements \u00e0 r\u00e9aliser sur 3-6 mois",
                  "Vous recherchez une expertise sectorielle cibl\u00e9e",
                  "Vous souhaitez un d\u00e9marrage rapide (48 h) sans processus d\u2019achat long",
                  "Vous voulez un suivi KPI hebdomadaire et une transparence totale",
                  "Votre budget ne permet pas un success fee de 15-25 % par poste",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cabinet */}
            <div className="rounded-xl border-2 border-muted-foreground/30 p-6 bg-card">
              <h2 className="text-xl font-bold mb-4">Quand choisir un cabinet</h2>
              <ul className="space-y-3">
                {[
                  "Vous avez 1 \u00e0 2 recrutements ponctuels uniquement",
                  "Vous recherchez des profils tr\u00e8s rares ou C-level",
                  "Le budget success-fee (15-25 %) n\u2019est pas un frein",
                  "Vous n\u2019avez pas besoin d\u2019int\u00e9gration aux outils internes",
                  "Vous pr\u00e9f\u00e9rez d\u00e9l\u00e9guer enti\u00e8rement sans pilotage quotidien",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cost comparison */}
      <section className="section-padding bg-secondary/30">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Comparatif co&ucirc;ts : RPO vs Cabinet
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
              <h3 className="font-bold text-lg mb-2">RPO Rocket4RPO</h3>
              <p className="text-3xl font-bold text-primary">~44 000 &euro;</p>
              <p className="text-sm text-muted-foreground mt-1">Pour 10 recrutements (TJM 550 &euro;/j)</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Co&ucirc;t pr&eacute;visible et fixe</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Pas de surprise sur la facture</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Plus le volume augmente, plus le co&ucirc;t unitaire baisse</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg mb-2">Cabinet classique</h3>
              <p className="text-3xl font-bold">60 000 &ndash; 200 000 &euro;</p>
              <p className="text-sm text-muted-foreground mt-1">Pour 10 recrutements (15-25 % du salaire)</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Minus className="w-4 h-4 text-amber-500" /> Co&ucirc;t variable selon le salaire du candidat</li>
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Facture potentiellement tr&egrave;s &eacute;lev&eacute;e sur profils seniors</li>
                <li className="flex items-center gap-2"><Minus className="w-4 h-4 text-amber-500" /> Pas d&rsquo;&eacute;conomie d&rsquo;&eacute;chelle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pas s&ucirc;r ? R&eacute;servez un diagnostic gratuit
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            En 30 minutes, un expert Rocket4RPO analyse votre contexte de recrutement
            et vous recommande le mod&egrave;le le plus adapt&eacute;.
          </p>
          <a
            href="https://meetings.hubspot.com/theophile-choupin/rpo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            R&eacute;server mon diagnostic gratuit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Questions fr&eacute;quentes : RPO vs Cabinet
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-border bg-card p-4">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

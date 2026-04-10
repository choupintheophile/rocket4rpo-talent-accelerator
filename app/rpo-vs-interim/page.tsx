import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Minus, Rocket } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RPO vs Int\u00e9rim / Staffing — quelle solution de recrutement ?",
  description:
    "RPO ou int\u00e9rim ? Comparez int\u00e9gration, expertise, mod\u00e8le de co\u00fbt et flexibilit\u00e9 pour choisir la meilleure solution d\u2019externalisation de vos recrutements.",
  alternates: { canonical: "/rpo-vs-interim" },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  interim: string;
  rpoIcon: "check" | "x" | "minus";
  interimIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Int\u00e9gration \u00e9quipe",
    rpo: "Totale \u2014 rituels, outils, Slack",
    interim: "Externe temporaire, peu int\u00e9gr\u00e9",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert recrutement tous secteurs + m\u00e9thodologie \u00e9prouv\u00e9e",
    interim: "G\u00e9n\u00e9raliste multi-secteurs",
    rpoIcon: "check",
    interimIcon: "minus",
  },
  {
    criteria: "Mod\u00e8le de co\u00fbt",
    rpo: "TJM 550 \u20ac/j, pr\u00e9visible",
    interim: "TJM × coefficient 1.8 à 2.2 (80-120 % de marge)",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Dur\u00e9e de mission",
    rpo: "3-12 mois, renouvelable",
    interim: "Court terme (1-6 mois typique)",
    rpoIcon: "check",
    interimIcon: "minus",
  },
  {
    criteria: "Pilotage du process",
    rpo: "Le RPO pilote le process de A \u00e0 Z",
    interim: "L\u2019int\u00e9rimaire ex\u00e9cute les t\u00e2ches assign\u00e9es",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Suivi KPIs",
    rpo: "Hebdomadaire, dashboard partag\u00e9",
    interim: "Reporting minimal",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Transfert de comp\u00e9tences",
    rpo: "Documentation process, formation \u00e9quipe",
    interim: "Peu ou pas de transfert",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "D\u00e9marrage",
    rpo: "48 h apr\u00e8s signature",
    interim: "1-2 semaines",
    rpoIcon: "check",
    interimIcon: "minus",
  },
];

const faqs = [
  {
    question: "Quelle est la diff\u00e9rence entre un RPO et un int\u00e9rimaire en recrutement ?",
    answer:
      "Le RPO est un expert Talent Acquisition int\u00e9gr\u00e9 \u00e0 votre \u00e9quipe qui pilote le process de recrutement de A \u00e0 Z (strat\u00e9gie, sourcing, entretiens, n\u00e9gociation). L\u2019int\u00e9rimaire ex\u00e9cute des t\u00e2ches assign\u00e9es sans autonomie sur le process global.",
  },
  {
    question: "Le RPO co\u00fbte-t-il plus cher que l\u2019int\u00e9rim ?",
    answer:
      "Pas forc\u00e9ment. Le TJM d\u2019un RPO (550 \u20ac/j) est transparent et sans marge cach\u00e9e. L\u2019int\u00e9rim applique un coefficient de 1.8 \u00e0 2.2 (soit 80 \u00e0 120 % de marge), ce qui peut revenir plus cher pour un niveau d\u2019expertise \u00e9quivalent.",
  },
  {
    question: "Peut-on utiliser un RPO pour un besoin court terme ?",
    answer:
      "Oui. Chez Rocket4RPO, l\u2019engagement minimum recommand\u00e9 est de 3 mois, mais le RPO peut \u00eatre utilis\u00e9 sur des p\u00e9riodes courtes (3-6 mois) contrairement \u00e0 un recruteur en CDI.",
  },
  {
    question: "Le RPO apporte-t-il un vivier de candidats ?",
    answer:
      "Oui. Rocket4RPO s\u2019appuie sur une m\u00e9thodologie de sourcing \u00e9prouv\u00e9e, avec une \u00e9quipe cumulant 200+ recrutements tous secteurs. L\u2019int\u00e9rimaire ne dispose g\u00e9n\u00e9ralement pas de cette expertise.",
  },
  {
    question: "L\u2019int\u00e9rim est-il adapt\u00e9 pour recruter des profils sp\u00e9cialis\u00e9s ?",
    answer:
      "L\u2019int\u00e9rim est peu adapt\u00e9 au recrutement de profils sp\u00e9cialis\u00e9s. Ces profils demandent une connaissance approfondie du march\u00e9, des comp\u00e9tences de sourcing avanc\u00e9es et un r\u00e9seau sectoriel que seul un RPO exp\u00e9riment\u00e9 peut offrir.",
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

export default function RpoVsInterimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <Breadcrumbs items={[{ label: "RPO vs Int\u00e9rim" }]} />

      {/* Hero */}
      <section className="section-padding pt-8">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            RPO vs Int&eacute;rim : quel mod&egrave;le d&rsquo;externalisation choisir ?
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            RPO int&eacute;gr&eacute; ou int&eacute;rimaire d&eacute;tach&eacute; ? Les deux
            externalisent le recrutement, mais les approches sont radicalement
            diff&eacute;rentes. Ce comparatif vous aide &agrave; choisir en connaissance de cause.
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
                    Int&eacute;rim / Staffing
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
                        <Icon type={row.interimIcon} />
                        {row.interim}
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
                  "Vous avez besoin d\u2019un expert qui pilote le process de recrutement",
                  "L\u2019int\u00e9gration \u00e0 votre \u00e9quipe et vos outils est essentielle",
                  "Vous recrutez des profils sp\u00e9cialis\u00e9s (Tech, Sales, Finance, Marketing)",
                  "Vous voulez un suivi KPI structur\u00e9 et un transfert de comp\u00e9tences",
                  "Vous recherchez un partenaire strat\u00e9gique, pas un ex\u00e9cutant",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interim */}
            <div className="rounded-xl border-2 border-muted-foreground/30 p-6 bg-card">
              <h2 className="text-xl font-bold mb-4">Quand choisir l&rsquo;int&eacute;rim</h2>
              <ul className="space-y-3">
                {[
                  "Vous avez besoin de renfort op\u00e9rationnel ponctuel",
                  "Les postes \u00e0 pourvoir sont g\u00e9n\u00e9ralistes et peu sp\u00e9cialis\u00e9s",
                  "Votre process de recrutement est d\u00e9j\u00e0 structur\u00e9 en interne",
                  "Vous avez simplement besoin de bras suppl\u00e9mentaires temporaires",
                  "Le budget int\u00e9rim est d\u00e9j\u00e0 pr\u00e9vu et valid\u00e9",
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
            Comparatif co&ucirc;ts : RPO vs Int&eacute;rim
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
              <h3 className="font-bold text-lg mb-2">RPO Rocket4RPO</h3>
              <p className="text-3xl font-bold text-primary">550 &euro;/jour</p>
              <p className="text-sm text-muted-foreground mt-1">TJM transparent, sans marge cach&eacute;e</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Expert s&eacute;nior d&eacute;di&eacute;</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Pilotage autonome du process</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> \u00c9quipe cumulant 200+ recrutements d\u2019exp\u00e9rience</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg mb-2">Int&eacute;rim / Staffing</h3>
              <p className="text-3xl font-bold">TJM × coeff. 1.8-2.2</p>
              <p className="text-sm text-muted-foreground mt-1">Co&ucirc;t r&eacute;el souvent opaque</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Marge agence significative</li>
                <li className="flex items-center gap-2"><Minus className="w-4 h-4 text-amber-500" /> Profil g&eacute;n&eacute;raliste, ex&eacute;cutant</li>
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Pas de vivier propre</li>
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
            En 30 minutes, un expert Rocket4RPO analyse votre contexte et vous
            recommande la solution la plus adapt&eacute;e.
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
            Questions fr&eacute;quentes : RPO vs Int&eacute;rim
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

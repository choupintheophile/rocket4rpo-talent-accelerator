import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Minus, Rocket } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RPO vs Recrutement interne — quelle solution pour votre entreprise ?",
  description:
    "RPO ou recruteur interne en CDI ? Comparez coûts, délais de démarrage, flexibilité et expertise pour faire le bon choix de recrutement.",
  alternates: { canonical: "/rpo-vs-recrutement-interne" },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  interne: string;
  rpoIcon: "check" | "x" | "minus";
  interneIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Co\u00fbt annuel",
    rpo: "TJM 550 \u20ac/j \u2014 flexible selon le besoin",
    interne: "40-55 K\u20ac/an + charges (60-75 K\u20ac co\u00fbt total)",
    rpoIcon: "check",
    interneIcon: "minus",
  },
  {
    criteria: "D\u00e9lai de d\u00e9marrage",
    rpo: "48 h apr\u00e8s signature",
    interne: "2-3 mois (recrutement du recruteur)",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Flexibilit\u00e9",
    rpo: "1-4 jours/sem, ajustable chaque mois",
    interne: "CDI temps plein, engagement p\u00e9renne",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert recrutement tous secteurs + m\u00e9thodologie \u00e9prouv\u00e9e",
    interne: "D\u00e9pend du profil recrut\u00e9",
    rpoIcon: "check",
    interneIcon: "minus",
  },
  {
    criteria: "Int\u00e9gration \u00e9quipe",
    rpo: "Totale (rituels, outils, Slack)",
    interne: "Totale (collaborateur interne)",
    rpoIcon: "check",
    interneIcon: "check",
  },
  {
    criteria: "Risque employeur",
    rpo: "Aucun \u2014 prestation externalis\u00e9e",
    interne: "CDI \u2014 charges sociales, rupture co\u00fbteuse",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Mont\u00e9e en charge",
    rpo: "Imm\u00e9diate, +1 recruteur en 48 h",
    interne: "Lente (nouveau recrutement n\u00e9cessaire)",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Suivi KPIs",
    rpo: "Hebdomadaire, dashboard partag\u00e9",
    interne: "Variable selon la culture interne",
    rpoIcon: "check",
    interneIcon: "minus",
  },
];

const faqs = [
  {
    question: "Le RPO peut-il remplacer un recruteur interne ?",
    answer:
      "Oui, un RPO peut assurer exactement les m\u00eames missions qu\u2019un recruteur interne (sourcing, pr\u00e9-qualification, coordination des entretiens, n\u00e9gociation) tout en apportant une expertise sectorielle et un vivier de candidats imm\u00e9diatement mobilisable.",
  },
  {
    question: "Combien co\u00fbte un RPO par rapport \u00e0 un recruteur en CDI ?",
    answer:
      "Un RPO \u00e0 2 jours/semaine co\u00fbte environ 4 400 \u20ac/mois (TJM 550 \u20ac). Un recruteur en CDI co\u00fbte 60-75 K\u20ac/an charges comprises, soit 5 000-6 250 \u20ac/mois. Le RPO est plus \u00e9conomique si votre flux de recrutement ne justifie pas un temps plein permanent.",
  },
  {
    question: "En combien de temps un RPO peut-il d\u00e9marrer ?",
    answer:
      "Chez Rocket4RPO, le d\u00e9marrage se fait en 48 h apr\u00e8s signature. Recruter un recruteur interne prend en moyenne 2 \u00e0 3 mois (offre, entretiens, pr\u00e9avis).",
  },
  {
    question: "Que se passe-t-il si mon besoin de recrutement diminue ?",
    answer:
      "Avec un RPO, vous ajustez le nombre de jours par semaine ou mettez la mission en pause. Avec un CDI, vous continuez \u00e0 payer le salaire m\u00eame sans besoin de recrutement, ou vous engagez une rupture co\u00fbteuse.",
  },
  {
    question: "Le RPO est-il adapt\u00e9 pour une startup qui recrute ses premiers commerciaux ?",
    answer:
      "C\u2019est m\u00eame le cas d\u2019usage id\u00e9al. La startup b\u00e9n\u00e9ficie imm\u00e9diatement d\u2019un expert recrutement sans prendre le risque d\u2019un CDI recruteur, avec une flexibilit\u00e9 totale pour adapter la mission \u00e0 sa croissance.",
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

export default function RpoVsRecrutementInternePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <Breadcrumbs items={[{ label: "RPO vs Recrutement interne" }]} />

      {/* Hero */}
      <section className="section-padding pt-8">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            RPO vs Recrutement interne : quel mod&egrave;le choisir ?
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Recruter un recruteur en CDI ou faire appel &agrave; un RPO externalis&eacute; ?
            Co&ucirc;t, d&eacute;lai de d&eacute;marrage, flexibilit&eacute; et risque employeur :
            voici un comparatif objectif pour vous aider &agrave; trancher.
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
                    Recruteur interne (CDI)
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
                        <Icon type={row.interneIcon} />
                        {row.interne}
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
                  "Votre besoin de recrutement est temporaire ou fluctuant (3-12 mois)",
                  "Vous ne pouvez pas attendre 2-3 mois pour recruter un recruteur",
                  "Vous avez besoin d\u2019une expertise recrutement imm\u00e9diate",
                  "Votre budget ne justifie pas un CDI \u00e0 temps plein",
                  "Vous voulez pouvoir scaler ou r\u00e9duire rapidement",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Internal */}
            <div className="rounded-xl border-2 border-muted-foreground/30 p-6 bg-card">
              <h2 className="text-xl font-bold mb-4">Quand choisir un recruteur interne</h2>
              <ul className="space-y-3">
                {[
                  "Votre flux de recrutement est constant (10+ postes/mois)",
                  "Vous disposez d\u2019un budget RH structur\u00e9 et p\u00e9renne",
                  "Vous visez le long terme avec une culture recrutement forte",
                  "Vous pouvez attendre 2-3 mois le temps de recruter ce profil",
                  "Vous souhaitez capitaliser sur la connaissance interne",
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
            Comparatif co&ucirc;ts : RPO vs Recruteur interne
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
              <h3 className="font-bold text-lg mb-2">RPO Rocket4RPO</h3>
              <p className="text-3xl font-bold text-primary">550 &euro;/jour</p>
              <p className="text-sm text-muted-foreground mt-1">Flexible : 1 &agrave; 4 jours/semaine</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> D&eacute;marrage en 48 h</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Z&eacute;ro charge sociale ou patronale</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Ajustable ou arr&ecirc;table chaque mois</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg mb-2">Recruteur interne (CDI)</h3>
              <p className="text-3xl font-bold">40-55 K&euro;/an</p>
              <p className="text-sm text-muted-foreground mt-1">+ charges patronales = 60-75 K&euro; co&ucirc;t total</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> 2-3 mois avant le d&eacute;marrage effectif</li>
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Engagement CDI permanent</li>
                <li className="flex items-center gap-2"><Minus className="w-4 h-4 text-amber-500" /> Rupture co&ucirc;teuse si le besoin diminue</li>
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
            recommande la solution la plus adapt&eacute;e entre RPO et recruteur interne.
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
      <section className="section-padding bg-secondary/30">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Questions fr&eacute;quentes : RPO vs Recrutement interne
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

"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Brain,
  TrendingUp,
  ShieldCheck,
  Clock,
  UserCheck,
  Settings,
  Briefcase,
  Users,
  Building2,
  HeartHandshake,
  Layers,
  Cog,
  Scale,
  Search,
  Puzzle,
  Rocket,
} from "lucide-react";

const faqs = [
  { question: "Quels profils fonctions support recrutez-vous ?", answer: "Nous recrutons l'ensemble des profils support : Office Manager, RH / People Ops, Legal / Juridique, Operations Manager, Executive Assistant, Responsable administratif, Responsable des achats, et Coordinateur de projets transverses." },
  { question: "Pourquoi les fonctions support sont-elles stratégiques ?", answer: "Les fonctions support structurent l'organisation, fluidifient les process et permettent aux équipes opérationnelles de se concentrer sur leur cœur de métier. Sans elles, la croissance est freinée par le désordre organisationnel." },
  { question: "Comment évaluez-vous un profil support ?", answer: "Nous évaluons la polyvalence, la fiabilité, la capacité d'adaptation au contexte de l'entreprise, la rigueur opérationnelle et l'aptitude à prendre en charge des responsabilités transverses." },
  { question: "Recrutez-vous des profils RH ?", answer: "Oui. Nous recrutons des profils People Ops, HR Business Partner, Responsable RH et Talent Manager capables de structurer la fonction RH dans des environnements en croissance." },
  { question: "Recrutez-vous des Office Managers ?", answer: "Oui. L'Office Manager est un rôle clé en entreprise. Nous identifions des profils autonomes, organisés et capables de gérer simultanément l'administratif, la logistique et la coordination interne." },
  { question: "Recrutez-vous des profils Legal ?", answer: "Oui. Nous identifions des juristes et responsables juridiques capables de comprendre les enjeux business, de sécuriser les contrats et de structurer la conformité dans des environnements exigeants." },
  { question: "Quelle est la différence avec un cabinet généraliste ?", answer: "Un cabinet généraliste traite les fonctions support comme des postes secondaires. Nous évaluons l'impact organisationnel de chaque profil, sa capacité à structurer et sa compatibilité avec votre contexte spécifique." },
  { question: "Combien de temps prend un recrutement support ?", answer: "Vous recevez une shortlist qualifiée sous 2 à 3 semaines. Le process complet se déroule en 3 à 5 semaines selon la spécificité du poste et le niveau de séniorité." },
  { question: "Cette expertise support est-elle utilisée dans vos missions RPO ?", answer: "Oui. Nos Talent Acquisition capables de recruter des profils support sont déployés dans les missions Rocket4RPO. Ils apportent une compréhension des enjeux organisationnels qui améliore la qualité des recrutements." },
  { question: "Comment démarrer un recrutement support avec Rocket4RPO ?", answer: "Contactez-nous pour un échange de cadrage. Nous analysons votre besoin, votre organisation, vos outils et vos attentes pour vous proposer les profils les plus adaptés. Premier échange sans engagement." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const roles = [
  { icon: Users, title: "Office Manager", text: "Profils autonomes et organisés, capables de gérer la coordination interne, la logistique, l'accueil et le suivi administratif au quotidien." },
  { icon: HeartHandshake, title: "RH / People Ops", text: "HR Business Partners, People Ops Managers et Responsables RH capables de structurer la fonction RH et d'accompagner la croissance." },
  { icon: Scale, title: "Legal / Juridique", text: "Juristes et responsables juridiques maîtrisant les contrats, la conformité, le RGPD et les enjeux réglementaires propres à votre secteur." },
  { icon: Cog, title: "Operations Manager", text: "Profils transverses capables de structurer les process, piloter l'efficacité opérationnelle et coordonner les équipes." },
  { icon: Briefcase, title: "Executive Assistant", text: "Assistants de direction rigoureux, discrets et proactifs, capables de gérer des agendas complexes et de fluidifier le quotidien des dirigeants." },
  { icon: Layers, title: "Coordinateur de projets", text: "Profils organisés et méthodiques, capables de piloter des projets transverses, de coordonner les parties prenantes et de garantir les délais." },
];

const organizationalChallenges = [
  { icon: Building2, title: "Structuration de l'organisation", text: "Mettre en place les process, les outils et les routines qui permettent à l'entreprise de fonctionner efficacement à mesure qu'elle grandit." },
  { icon: Puzzle, title: "Polyvalence requise", text: "Les profils support doivent souvent couvrir plusieurs périmètres simultanément, ce qui exige adaptabilité et autonomie." },
  { icon: ShieldCheck, title: "Fiabilité et rigueur", text: "Les fonctions support manipulent des données sensibles, des contrats et des process critiques. La fiabilité est non négociable." },
  { icon: Target, title: "Impact sur la performance", text: "Des fonctions support efficaces libèrent du temps aux équipes opérationnelles et accélèrent la prise de décision." },
  { icon: Settings, title: "Mise en place des outils", text: "SIRH, outils de gestion, plateformes juridiques, ERP : les profils support doivent maîtriser et déployer les bons outils." },
  { icon: TrendingUp, title: "Accompagnement de la croissance", text: "À chaque étape de croissance, les besoins support évoluent. Il faut des profils capables de s'adapter et d'anticiper." },
];

const qualificationSteps = [
  { step: "01", title: "Analyse du contexte organisationnel", text: "Compréhension de votre stade de maturité, de votre organisation actuelle, de vos outils et de vos besoins prioritaires en fonctions support." },
  { step: "02", title: "Évaluation de la polyvalence", text: "Au-delà des compétences techniques, nous évaluons la capacité à gérer plusieurs périmètres, à prioriser et à s'adapter au contexte." },
  { step: "03", title: "Vérification de la fiabilité", text: "Nous vérifions la rigueur, la discrétion, la capacité à gérer des informations sensibles et à respecter les process établis." },
  { step: "04", title: "Alignement avec votre culture", text: "Nous vérifions la compatibilité avec votre culture d'entreprise, votre rythme de croissance et les attentes de votre direction." },
];

const benefits = [
  "Des recrutements plus précis, adaptés à votre contexte organisationnel",
  "Des shortlists de profils évalués sur leur impact réel, pas uniquement leur CV",
  "Un gain de temps significatif sur vos recrutements fonctions support",
  "Une réduction des erreurs de casting sur des postes clés",
  "Des profils capables de structurer et d'accompagner votre croissance",
];

export default function RecrutementSupportPageClient() {
  const schemas = [
      serviceSchema("Recrutement fonctions support", "Rocket4RPO recrute vos profils fonctions support avec des Talent Acquisition capables d'évaluer l'impact organisationnel de chaque profil.", "/metiers/recrutement-support"),
      faqSchema(faqs),
      breadcrumbSchema([
        { name: "Accueil", url: "https://rocket4rpo.com" },
        { name: "Métiers", url: "https://rocket4rpo.com/metiers/recrutement-support" },
        { name: "Recrutement fonctions support", url: "https://rocket4rpo.com/metiers/recrutement-support" },
      ]),
    ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
<Breadcrumbs items={[{ label: "Métiers", href: "/metiers/recrutement-support" }, { label: "Recrutement fonctions support" }]} />

    {/* CONTEXTUALIZATION */}
    <section className="py-4">
      <div className="container-wide">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Les fonctions support sont le socle opérationnel qui permet à vos équipes Sales, Tech et Marketing de performer. Nos TA Specialists recrutent les profils qui structurent votre organisation en phase de scaling.
          </p>
        </div>
      </div>
    </section>

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Métiers — Fonctions support</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement de profils <span className="text-gradient">fonctions support</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Structurer votre organisation avec des profils fiables, polyvalents et adaptés à votre contexte.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Recruter un profil support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* INTRO */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Les fonctions support ne sont pas secondaires</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>RH, Office Management, Legal, Operations, Administration : ces fonctions sont le socle sur lequel repose toute l'organisation. Sans elles, les équipes opérationnelles perdent en efficacité, les process se désorganisent et la croissance ralentit.</p>
              <p>Pourtant, le recrutement de profils support est souvent traité de manière superficielle. Un CV ne suffit pas à évaluer la polyvalence, la fiabilité et la capacité d'un candidat à structurer une organisation.</p>
              <p className="font-semibold text-foreground">Rocket4RPO s'appuie sur des Talent Acquisition capables de recruter des profils support avec une compréhension fine de leur rôle dans l'organisation.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ROLES */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Expertise fonctions support</span>
          <h2 className="text-3xl md:text-4xl font-bold">Les profils que nous recrutons</h2>
          <p className="mt-4 text-lg text-muted-foreground">Des profils évalués sur leur impact organisationnel, pas uniquement sur leur parcours.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div key={role.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <role.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{role.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ORGANIZATIONAL CHALLENGES */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Rôle structurant</span>
          <h2 className="text-3xl md:text-4xl font-bold">Comprendre le rôle structurant des fonctions support</h2>
          <p className="mt-4 text-lg text-muted-foreground">Les fonctions support sont essentielles à la structuration et à la performance de l'entreprise.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizationalChallenges.map((item, i) => (
            <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-xl border bg-card">
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* IMPACT ON SALES PERFORMANCE */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Impact business</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">L&apos;impact des fonctions support sur la performance Sales</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Les fonctions support ne sont pas des centres de coût isolés. Elles sont directement connectées à la performance commerciale de votre entreprise. Un Office Manager qui structure l&apos;onboarding réduit le ramp-up des commerciaux. Un People Ops qui gère le comp &amp; benefits améliore la rétention des top performers. Un Legal qui accélère la revue des contrats raccourcit le cycle de vente.</p>
              <p>Dans une scale-up, chaque friction organisationnelle coûte du revenu. Les fonctions support éliminent ces frictions et créent les conditions de la performance.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { role: "Office Manager", impact: "Structure l'onboarding et réduit le ramp-up commercial de 30%" },
                { role: "People / RH Ops", impact: "Pilote le comp & benefits pour retenir les top performers Sales" },
                { role: "Legal", impact: "Accélère la revue contractuelle et raccourcit le cycle de vente" },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-5 rounded-xl border border-primary/20 bg-primary/5">
                  <p className="text-sm font-bold text-primary mb-2">{item.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.impact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* MOST SOUGHT-AFTER SUPPORT PROFILES */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Tendances</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Profils support les plus recherchés en scale-up</h2>
            <p className="text-muted-foreground mb-8">Classement basé sur le volume de demandes reçues par Rocket4RPO au T1 2026.</p>
            <div className="space-y-3">
              {[
                { rank: 1, title: "People / RH Ops", detail: "Structuration de la fonction RH, onboarding, comp & benefits, culture" },
                { rank: 2, title: "Office Manager multi-site", detail: "Coordination logistique, gestion administrative, accueil sur plusieurs bureaux" },
                { rank: 3, title: "Legal (contrats SaaS)", detail: "Revue contractuelle, RGPD, CGV/CGU, négociation fournisseurs et clients" },
                { rank: 4, title: "Operations Manager", detail: "Process, efficacité opérationnelle, coordination transverse, outils internes" },
                { rank: 5, title: "Executive Assistant bilingue", detail: "Support C-level, gestion d'agendas complexes, coordination internationale" },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                  <span className="text-3xl font-black text-primary/20 w-10 text-center shrink-0">{item.rank}</span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* VERSATILITY */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Polyvalence et adaptabilité</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">La polyvalence : la compétence clé des fonctions support</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Un profil support efficace n'est pas simplement exécutant. Il est capable de gérer plusieurs périmètres, de prioriser dans l'urgence, de collaborer avec toutes les équipes et de prendre des initiatives pour améliorer l'organisation.</p>
              <p>Nos recruteurs évaluent cette polyvalence en profondeur : capacité à gérer l'imprévu, autonomie, rigueur dans le suivi, aptitude à jongler entre des sujets variés — RH, administratif, juridique, logistique — tout en maintenant un niveau de qualité élevé.</p>
              <p className="font-semibold text-foreground">Résultat : des profils immédiatement opérationnels, capables de s'adapter à votre contexte et de structurer votre organisation dès leur arrivée.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* QUALIFICATION METHODOLOGY */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Méthodologie de qualification</span>
          <h2 className="text-3xl md:text-4xl font-bold">Notre approche en 4 étapes</h2>
          <p className="mt-4 text-lg text-muted-foreground">Une méthodologie structurée pour identifier les profils support à fort impact.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualificationSteps.map((step, i) => (
            <motion.div key={step.step} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative">
              <span className="text-6xl font-black text-primary/10">{step.step}</span>
              <div className="pb-10">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CONTEXT ADAPTATION */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Adaptation au contexte</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Chaque entreprise a ses propres besoins support</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Une startup en phase de structuration n'a pas les mêmes besoins qu'une scale-up en hypercroissance ou qu'un grand groupe en transformation. Les profils support doivent être recrutés en fonction du contexte précis de l'entreprise.</p>
              <p>Nos recruteurs analysent votre stade de maturité, votre organisation actuelle, vos outils en place et vos priorités pour identifier des profils qui s'intègrent naturellement et apportent une valeur immédiate.</p>
              <p className="font-semibold text-foreground">Nous ne recrutons pas un CV. Nous recrutons un profil capable de structurer votre organisation dans votre contexte spécifique.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* RPO INTEGRATION */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Expertise Rocket4RPO</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Une expertise intégrée dans chaque mission RPO</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>L'expertise fonctions support de Rocket4RPO n'est pas un service isolé. Elle est intégrée dans chaque mission de Recruitment Process Outsourcing que nous réalisons.</p>
              <p>Concrètement, cela signifie que nos Talent Acquisition spécialisés en fonctions support interviennent avec :</p>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Un cadrage précis avec les hiring managers sur les enjeux organisationnels",
                "Une qualification approfondie sur la polyvalence et la fiabilité",
                "Une lecture métier lors des debriefs et des comités de sélection",
                "Une collaboration renforcée avec les équipes RH et Direction",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>

    {/* BENEFITS */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Ce que vous gagnez</span>
          <h2 className="text-3xl md:text-4xl font-bold">Les bénéfices concrets de notre expertise</h2>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <motion.li key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground font-medium">{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <FAQSection faqs={faqs} />

    {/* CTA */}
    <CTASection title="Structurer votre organisation" subtitle="Échangeons sur vos besoins en recrutement fonctions support. Premier échange sans engagement." ctaLabel="Structurer mon recrutement" />

    {/* INTERNAL LINKS */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-8">
          <h2 className="text-2xl font-bold">Découvrez nos autres expertises métiers</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Recrutement Sales", href: "/metiers/recrutement-sales" },
            { label: "Recrutement IT & Tech", href: "/metiers/recrutement-it" },
            { label: "Recrutement Marketing", href: "/metiers/recrutement-marketing" },
            { label: "Recrutement Finance", href: "/metiers/recrutement-finance" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow group">
              <span className="font-medium">{link.label}</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

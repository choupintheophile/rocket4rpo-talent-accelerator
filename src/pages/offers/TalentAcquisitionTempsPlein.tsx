import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Timer,
  Zap,
  Brain,
  Handshake,
  BarChart3,
  Search,
  FileCheck,
  MessageSquare,
  Activity,
  Building2,
  Rocket,
  Layers,
  ShieldCheck,
  Users,
  TrendingUp,
  Briefcase,
  Settings,
} from "lucide-react";

const faqs = [
  {
    question: "Qu'est-ce qu'un Talent Acquisition à temps plein ?",
    answer: "C'est un Talent Acquisition Specialist expérimenté qui s'intègre à 100 % dans votre organisation. Il pilote l'ensemble de vos recrutements au quotidien : cadrage des besoins, sourcing, qualification, coordination avec les managers et pilotage de la performance. Contrairement à un recruteur freelance ponctuel, il est pleinement immergé dans votre culture, vos outils et vos enjeux business.",
  },
  {
    question: "Dans quels cas choisir un Talent Acquisition à temps plein ?",
    answer: "Ce modèle est pertinent lorsque votre volume de recrutement est élevé ou constant, lorsque vous devez structurer durablement votre fonction recrutement, ou lorsque vos managers ont besoin d'un interlocuteur dédié capable de gérer plusieurs recrutements en parallèle avec méthode et exigence.",
  },
  {
    question: "Pourquoi choisir un profil expérimenté plutôt qu'un Talent Acquisition junior à bas TJM ?",
    answer: "Un TJM bas crée une illusion d'économie. Un profil junior nécessite plus d'encadrement, produit des qualifications moins fines, allonge les délais et génère des allers-retours coûteux avec les managers. Un TA senior crée une performance de recrutement réelle : shortlists plus justes, exécution plus rapide, meilleure collaboration avec les opérationnels et structuration durable des process.",
  },
  {
    question: "Quelle différence entre Talent Acquisition à temps plein et Talent Acquisition à temps partagé ?",
    answer: "Le temps plein est conçu pour les entreprises avec un volume de recrutement important ou constant, qui ont besoin d'une ressource dédiée au quotidien. Le temps partagé convient aux entreprises avec des besoins récurrents mais plus limités, qui souhaitent accéder à une expertise senior quelques jours par semaine. Les deux modèles offrent le même niveau d'exigence et de méthodologie.",
  },
  {
    question: "Quels types de recrutements pouvez-vous prendre en charge ?",
    answer: "Nos Talent Acquisition Specialists couvrent l'ensemble des fonctions clés : Tech, Sales, Finance, Marketing, Support, Opérations. Leur expérience multi-sectorielle leur permet d'adapter rapidement leur approche à chaque métier et à chaque contexte d'entreprise.",
  },
  {
    question: "Le Talent Acquisition à temps plein peut-il travailler avec nos managers directement ?",
    answer: "Absolument, c'est même l'un des principaux leviers de performance. Le TA Specialist travaille en binôme avec vos hiring managers : cadrage des besoins, debriefs structurés, feedback loop, suivi des priorités. Cette collaboration directe garantit des recrutements plus rapides et mieux alignés.",
  },
  {
    question: "Combien de temps faut-il pour être opérationnel ?",
    answer: "Notre process d'onboarding est structuré pour garantir une montée en puissance rapide. En quelques jours, le TA Specialist maîtrise votre contexte, vos outils et vos enjeux. Il est pleinement opérationnel dès la première semaine et produit des résultats concrets dès les premières semaines.",
  },
  {
    question: "Est-ce une alternative à une embauche interne ?",
    answer: "Oui. Vous bénéficiez immédiatement d'une expertise senior sans les délais et les coûts d'un recrutement interne (sourcing, onboarding, période d'essai). Si la collaboration fonctionne, une transition vers un CDI est envisageable.",
  },
  {
    question: "Pouvez-vous aussi structurer nos outils et notre méthode ?",
    answer: "Oui. Au-delà de l'exécution des recrutements, nos TA Specialists peuvent vous aider à structurer vos outils de sourcing, vos process d'évaluation, vos rituels de recrutement et votre pilotage de performance. Découvrez également notre offre Sourcing & Enablement.",
  },
  {
    question: "Intervenez-vous uniquement dans la Tech ?",
    answer: "Non. Nos Talent Acquisition Specialists interviennent dans tous les secteurs : Tech, SaaS, Industrie, Services, Finance, Santé, Retail. Notre méthodologie s'adapte à chaque marché et à ses spécificités.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const TalentAcquisitionTempsPlein = () => (
  <Layout>
    <SEO
      title="Talent Acquisition à temps plein — RPO dédié externalisé"
      description="Un Talent Acquisition Specialist expérimenté dédié à 100 % à vos recrutements. Structuration, sourcing senior, exécution rapide et collaboration managériale. RPO haute performance par Rocket4RPO."
      canonical="/offre/talent-acquisition-temps-plein"
      schema={[
        serviceSchema(
          "Talent Acquisition à temps plein",
          "Un Talent Acquisition Specialist senior intégré à 100 % dans vos équipes pour piloter vos recrutements avec exigence, rapidité et méthode.",
          "/offre/talent-acquisition-temps-plein"
        ),
        faqSchema(faqs),
        breadcrumbSchema([
          { name: "Offres", url: "/offre/talent-acquisition-temps-plein" },
          { name: "Talent Acquisition à temps plein", url: "/offre/talent-acquisition-temps-plein" },
        ]),
      ]}
    />
    <Breadcrumbs
      items={[
        { label: "Offres", to: "/offre/talent-acquisition-temps-plein" },
        { label: "Talent Acquisition à temps plein" },
      ]}
    />

    {/* ── 1. HERO ── */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Talent Acquisition externalisé — Temps plein
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Talent Acquisition à temps plein : une capacité de recrutement experte{" "}
              <span className="text-gradient">pour accompagner votre croissance</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO met à disposition des Talent Acquisition Specialists expérimentés à temps plein pour piloter vos recrutements avec exigence, rapidité et méthode. Vous bénéficiez d'une ressource dédiée, capable de structurer vos process, d'accélérer vos recrutements et de collaborer efficacement avec vos équipes opérationnelles.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="https://bit.ly/4bJGsuZ" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#notre-vision"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors"
              >
                Découvrir notre approche
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 2. INTRODUCTION ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Le vrai coût d'un recrutement sous-dimensionné
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Face à une croissance soutenue, beaucoup d'entreprises font le choix de recruter des profils juniors de Talent Acquisition ou de confier leurs recrutements à des prestataires à bas TJM. L'intention est compréhensible : contenir les coûts tout en augmentant la capacité de recrutement.
              </p>
              <p>
                En pratique, cette approche crée des{" "}
                <strong className="text-foreground">inefficiences cachées qui coûtent bien plus cher</strong> que l'économie réalisée sur le TJM : une qualification des besoins trop superficielle, un sourcing peu ciblé, des shortlists qui ne convainquent pas les managers, des entretiens multipliés sans impact, et des recrutements qui s'éternisent.
              </p>
              <p>
                Le résultat ?{" "}
                <strong className="text-foreground">
                  Les managers perdent du temps, les postes restent ouverts plus longtemps et le coût total du recrutement explose silencieusement.
                </strong>
              </p>
              <p>
                Quand le volume de recrutement est élevé, la réponse n'est pas un recruteur moins cher. C'est{" "}
                <strong className="text-foreground">
                  un Talent Acquisition Specialist expérimenté, dédié à 100 %, capable de créer une vraie performance de recrutement
                </strong>{" "}
                — en structurant les process, en accélérant l'exécution et en élevant la qualité des profils présentés.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 3. NOTRE VISION ── */}
    <section id="notre-vision" className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Notre vision
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Notre vision du Talent Acquisition à temps plein
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Chez Rocket4RPO, nous croyons que la performance recrutement se construit avec de l'expertise et de la méthode, pas avec du volume à bas coût.
          </p>
        </motion.div>

        <div className="grid gap-12 md:gap-16">
          {/* Sub-section 1 */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Le faux bon choix du Talent Acquisition junior à bas coût
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Un TJM bas ne signifie pas un recrutement performant. Un profil junior en Talent Acquisition a besoin de plus d'encadrement, produit des qualifications moins fines et crée davantage de friction avec les équipes opérationnelles.
                </p>
                <p>
                  Le temps passé par les managers à reformuler les briefs, à revoir des profils non pertinents et à multiplier les entretiens improductifs représente un coût invisible mais considérable — surtout quand le volume de recrutement est élevé.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-secondary border border-border">
              <h4 className="font-bold text-lg mb-4 text-foreground">Les coûts cachés du recrutement sous-dimensionné</h4>
              <ul className="space-y-3">
                {[
                  "Qualification approximative des besoins réels",
                  "Sourcing peu ciblé, volume de CVs sans pertinence",
                  "Multiplication des entretiens non concluants",
                  "Temps opérationnel gaspillé par les managers",
                  "Allongement significatif des délais de recrutement",
                  "Shortlists décalées par rapport aux attentes",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1 w-2 h-2 rounded-full bg-destructive shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sub-section 2 */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                À temps plein, il faut une vraie capacité de delivery
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Un Talent Acquisition à temps plein doit être en mesure de gérer simultanément plusieurs recrutements (8 à 15), de prioriser en fonction des enjeux business et de maintenir un niveau d'exécution constant dans la durée.
                </p>
                <p>
                  C'est une capacité que seul un profil expérimenté peut offrir : autonomie, rigueur méthodologique, maîtrise du sourcing avancé et capacité à construire une relation de confiance durable avec les hiring managers.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 md:order-1">
              <h4 className="font-bold text-lg mb-4 text-foreground">Ce qu'apporte un TA senior dédié</h4>
              <ul className="space-y-3">
                {[
                  "Gestion d'important volume de recrutement",
                  "Priorisation stratégique des postes ouverts",
                  "Sourcing ciblé et chasse directe efficace",
                  "Shortlists pertinentes dès les premiers jours",
                  "Collaboration structurée avec les managers",
                  "Pilotage continu de la performance recrutement",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="mt-0.5 w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sub-section 3 */}
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Une fonction recrutement au service de la performance business
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Le recrutement n'est pas une fonction support. C'est un vrai levier de croissance. Un Talent Acquisition Specialist senior transforme votre capacité de recrutement en avantage concurrentiel : meilleure qualité de profils, time-to-hire réduit, managers libérés du recrutement opérationnel et processus qui s'améliorent continuellement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 4. QUAND CHOISIR LE TEMPS PLEIN ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Quand choisir le Talent Acquisition à temps plein
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un modèle conçu pour les entreprises qui ont besoin de puissance de recrutement et de structuration durable.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: TrendingUp,
              title: "Votre volume de recrutement est élevé",
              text: "Vous avez plusieurs postes ouverts simultanément et avez besoin d'une ressource capable de gérer le rythme, la priorisation et la qualité d'exécution au quotidien.",
            },
            {
              icon: Layers,
              title: "Vous devez structurer durablement votre recrutement",
              text: "Au-delà de l'exécution, vous avez besoin de poser les fondations d'une fonction recrutement performante : méthodes, outils, rituels, indicateurs de pilotage.",
            },
            {
              icon: Handshake,
              title: "Vos managers ont besoin d'un vrai partenaire",
              text: "Vos hiring managers veulent un interlocuteur qui comprend leurs enjeux, challenge les briefs, filtre les candidatures et coordonne le process sans leur faire perdre de temps.",
            },
            {
              icon: Zap,
              title: "Vous devez accélérer sans perdre en qualité",
              text: "La pression pour recruter vite ne doit pas compromettre la pertinence des profils. Un TA senior dédié combine vitesse d'exécution et rigueur de qualification.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-background border border-border"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 5. NOTRE DÉMARCHE ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Méthodologie
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Notre démarche</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus structuré en 6 étapes pour garantir la performance de chaque recrutement.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              step: "01",
              title: "Comprendre votre contexte de croissance",
              text: "Nous analysons votre organisation, vos enjeux business, votre culture et vos priorités de recrutement pour adapter notre intervention à votre réalité terrain.",
            },
            {
              icon: FileCheck,
              step: "02",
              title: "Prioriser et cadrer les recrutements",
              text: "Nous définissons avec vos managers les postes prioritaires, construisons des scorecards précises et alignons les critères d'évaluation pour éviter les approximations.",
            },
            {
              icon: Search,
              step: "03",
              title: "Construire une stratégie de sourcing adaptée",
              text: "Approche directe, chasse de profils passifs, activation de réseaux ciblés : chaque stratégie de sourcing est conçue pour atteindre les profils pertinents, pas pour accumuler du volume.",
            },
            {
              icon: ShieldCheck,
              step: "04",
              title: "Exécuter avec rigueur",
              text: "Qualification approfondie, entretiens structurés, évaluation des compétences et de l'adéquation culturelle. Nous ne transmettons que des profils que nous recommandons.",
            },
            {
              icon: MessageSquare,
              step: "05",
              title: "Fluidifier la collaboration avec les managers",
              text: "Debriefs systématiques, feedback loop structuré, suivi des délais et des décisions. Les managers gagnent du temps et prennent de meilleures décisions de recrutement.",
            },
            {
              icon: Activity,
              step: "06",
              title: "Piloter la performance dans la durée",
              text: "Reporting régulier, suivi des KPIs clés (time-to-hire, taux de conversion, qualité des shortlists), optimisation continue des process et des résultats.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="relative p-8 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-colors"
            >
              <span className="absolute top-6 right-6 text-5xl font-bold text-muted/30 select-none">
                {item.step}
              </span>
              <item.icon className="w-7 h-7 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-3 pr-12">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-8 text-center">
          <p className="text-muted-foreground">
            Vous souhaitez en savoir plus sur notre méthodologie ?{" "}
            <Link
              to="/offre/recrutement-talent-acquisition"
              className="text-primary font-medium hover:underline"
            >
              Découvrez notre offre de recrutement de Talent Acquisition
            </Link>
          </p>
        </motion.div>
      </div>
    </section>

    {/* ── 6. CE QUE VOUS GAGNEZ ── */}
    <section className="section-padding bg-foreground text-background">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Ce que vous gagnez concrètement
          </h2>
          <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">
            Des résultats mesurables sur vos recrutements, pas des promesses.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "Une ressource dédiée à vos enjeux de recrutement",
            "Une meilleure capacité à gérer plusieurs recrutements simultanément",
            "Une meilleure coordination entre RH, managers et direction",
            "Une amélioration de la qualité des shortlists",
            "Une exécution plus rapide et mieux structurée",
            "Une charge opérationnelle allégée pour les managers",
            "Une structuration durable de la fonction recrutement",
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-5 rounded-xl bg-background/5 border border-background/10"
            >
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-background/90 font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 7. AVANTAGES ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Les avantages du Talent Acquisition à temps plein
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "Capacité dédiée",
              text: "Une ressource pleinement mobilisée sur vos recrutements, capable de gérer le volume, le rythme et les priorités de votre organisation.",
            },
            {
              icon: Brain,
              title: "Expertise opérationnelle",
              text: "Des Talent Acquisition Specialists expérimentés, capables d'intervenir rapidement sur des recrutements complexes et structurants.",
            },
            {
              icon: Timer,
              title: "Accélération du time-to-hire",
              text: "Une exécution plus fluide, un meilleur suivi candidat et des process mieux cadencés pour recruter plus vite.",
            },
            {
              icon: Settings,
              title: "Structuration durable",
              text: "Au-delà de l'exécution, nous aidons à professionnaliser votre fonction recrutement, vos rituels et vos méthodes de pilotage.",
            },
            {
              icon: Briefcase,
              title: "Gain de temps pour les managers",
              text: "Un interlocuteur qui cadre, filtre, challenge et coordonne, afin que les opérationnels se concentrent sur les bonnes décisions.",
            },
            {
              icon: BarChart3,
              title: "Meilleure qualité de recrutement",
              text: "Des profils mieux sourcés, mieux qualifiés et plus cohérents avec vos besoins réels et votre contexte de croissance.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 8. À QUI S'ADRESSE ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Pour qui ?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              À qui s'adresse le Talent Acquisition à temps plein ?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Notre modèle de Talent Acquisition dédié s'adresse aux entreprises qui ont besoin d'une véritable puissance de recrutement, avec un niveau d'exécution et d'exigence professionnels.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="space-y-4">
              {[
                {
                  icon: Rocket,
                  label: "Startups en forte croissance",
                  desc: "qui doivent recruter rapidement et en volume pour accompagner leur développement, quel que soit leur secteur.",
                },
                {
                  icon: TrendingUp,
                  label: "Scale-ups",
                  desc: "qui structurent leur organisation et ont besoin d'un TA senior capable de gérer la montée en charge de leurs recrutements.",
                },
                {
                  icon: Layers,
                  label: "Entreprises avec plusieurs postes ouverts",
                  desc: "qui ont besoin d'une ressource dédiée pour piloter simultanément plusieurs recrutements avec méthode.",
                },
                {
                  icon: Building2,
                  label: "Organisations structurant leur fonction People",
                  desc: "qui veulent professionnaliser leur recrutement, poser des process durables et installer une culture de la performance.",
                },
                {
                  icon: ShieldCheck,
                  label: "Renfort senior immédiat",
                  desc: "pour les entreprises qui ont besoin de résultats rapides sans les délais d'un recrutement interne.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                  <item.icon className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">{item.label}</span>
                    <span className="text-muted-foreground"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Internal links */}
        <motion.div {...fadeUp} className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-muted-foreground mb-6">
            Découvrez également nos autres expertises
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Talent Acquisition à temps partagé", to: "/offre/talent-acquisition-temps-partage" },
              { label: "Recrutement de Recruteurs", to: "/offre/recrutement-talent-acquisition" },
              { label: "Sourcing & Enablement", to: "/offre/outils-sourcing-enablement" },
              { label: "Cas clients", to: "/cas-clients" },
              { label: "Nous contacter", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background text-foreground hover:border-primary/30 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── 9. FAQ ── */}
    <FAQSection faqs={faqs} />

    {/* ── 10. CTA ── */}
    <CTASection
      title="Besoin de structurer ou d'accélérer vos recrutements ?"
      subtitle="Échangeons sur le bon niveau d'intervention pour vos enjeux de recrutement."
      ctaLabel="Parler à Rocket4RPO"
    />
  </Layout>
);

export default TalentAcquisitionTempsPlein;

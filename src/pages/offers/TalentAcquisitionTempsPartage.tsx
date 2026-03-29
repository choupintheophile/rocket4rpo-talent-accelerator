import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
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
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const faqs = [
  {
    question: "Qu'est-ce que le Talent Acquisition à temps partagé ?",
    answer: "C'est un modèle dans lequel un Talent Acquisition Specialist expérimenté intervient au sein de votre entreprise quelques jours par semaine. Il pilote vos recrutements avec la même rigueur qu'un TA interne, mais sans le coût d'un poste à temps plein. C'est une solution pensée pour les entreprises qui veulent une expertise senior immédiate, sans surdimensionner leurs coûts de recrutement.",
  },
  {
    question: "Combien de jours par semaine un TA à temps partagé est-il disponible ?",
    answer: "Le format est entièrement modulable : de 1 à 4 jours par semaine, selon votre volumétrie de recrutement et vos priorités business. Nous ajustons le rythme en fonction de vos besoins réels, sans engagement rigide.",
  },
  {
    question: "Pourquoi choisir un TA senior à temps partagé plutôt qu'un profil junior à bas TJM ?",
    answer: "Un profil junior avec un TJM bas semble économique, mais génère souvent des coûts cachés : qualification plus faible, allers-retours plus nombreux, entretiens moins bien préparés, temps opérationnel perdu pour les managers. Un TA senior à temps partagé produit une performance de recrutement mesurable : shortlists plus justes, meilleure compréhension des enjeux métier, exécution plus rapide et collaboration fluide avec les hiring managers.",
  },
  {
    question: "Quels types de postes un TA à temps partagé peut-il recruter ?",
    answer: "Nos Talent Acquisition Specialists couvrent les fonctions Sales, IT, Finance, Marketing et Support. Leur expérience terrain leur permet de comprendre rapidement les enjeux spécifiques de chaque métier et d'adapter leur approche de sourcing en conséquence.",
  },
  {
    question: "Le Talent Acquisition à temps partagé remplace-t-il un recruteur interne ?",
    answer: "Il peut compléter une équipe existante ou intervenir en l'absence de ressource interne dédiée. Dans les deux cas, le TA à temps partagé apporte une méthodologie structurée, une capacité de sourcing avancée et un regard extérieur qui enrichit le processus de recrutement.",
  },
  {
    question: "Quelle est la durée minimale d'engagement ?",
    answer: "Nous recommandons un engagement de 3 mois minimum. Ce délai permet au TA Specialist de s'immerger dans votre culture, de maîtriser vos enjeux métier et de produire des résultats concrets et durables.",
  },
  {
    question: "Comment se passe l'onboarding ?",
    answer: "Notre process d'onboarding est structuré pour être rapide et efficace : immersion dans votre organisation, compréhension de vos enjeux de recrutement, prise en main de vos outils, rencontre avec les hiring managers. En quelques jours, le TA Specialist est pleinement opérationnel.",
  },
  {
    question: "Le temps partagé est-il adapté à une entreprise qui recrute peu ?",
    answer: "Oui, c'est précisément l'un des cas d'usage les plus pertinents. Si vous avez quelques recrutements stratégiques à mener sans justifier un poste à temps plein, le temps partagé vous donne accès à une expertise senior au juste niveau d'intervention.",
  },
  {
    question: "Intervenez-vous uniquement sur des recrutements Tech ?",
    answer: "Non. Nos TA Specialists interviennent sur l'ensemble des fonctions clés : Sales, IT, Finance, Marketing, Support. Notre expertise couvre les environnements Tech et SaaS, mais aussi les entreprises en transformation digitale ou en structuration de leurs équipes.",
  },
  {
    question: "Pouvez-vous aussi nous aider sur les outils de sourcing ?",
    answer: "Absolument. En complément de nos missions de Talent Acquisition, nous proposons un accompagnement sur les outils de sourcing et d'enablement recrutement. Découvrez notre offre dédiée pour optimiser votre stack de recrutement.",
  },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };

const TalentAcquisitionTempsPartage = () => (
  <Layout>
    <SEO
      title="Talent Acquisition à temps partagé — Recruteur senior externalisé"
      description="Intégrez un Talent Acquisition Specialist expérimenté quelques jours par semaine. Recrutement plus rapide, shortlists plus justes, expertise senior sans coût fixe à temps plein. RPO flexible par Rocket4RPO."
      canonical="/offre/talent-acquisition-temps-partage"
      schema={[
        serviceSchema("Talent Acquisition à temps partagé", "Un Talent Acquisition Specialist senior intégré à vos équipes quelques jours par semaine pour piloter vos recrutements avec méthode et exigence.", "/offre/talent-acquisition-temps-partage"),
        faqSchema(faqs),
        breadcrumbSchema([
          { name: "Offres", url: "/offre/talent-acquisition-temps-partage" },
          { name: "Talent Acquisition à temps partagé", url: "/offre/talent-acquisition-temps-partage" },
        ]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Offres", to: "/offre/talent-acquisition-temps-partage" }, { label: "Talent Acquisition à temps partagé" }]} />

    {/* ── 1. HERO ── */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Talent Acquisition externalisé
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Talent Acquisition à temps partagé : recruter mieux, plus vite,{" "}
              <span className="text-gradient">sans surdimensionner vos coûts</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO met à disposition des Talent Acquisition Specialists expérimentés, capables de piloter vos recrutements avec méthode, exigence et compréhension du marché. Vous bénéficiez d'une expertise senior, sans supporter immédiatement le coût d'un recrutement interne à temps plein.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#notre-vision" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le coût réel d'un recrutement mal exécuté</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Beaucoup d'entreprises pensent optimiser leur budget recrutement en faisant appel à des profils juniors de Talent Acquisition avec des TJM attractifs. Sur le papier, le calcul semble simple : un coût journalier bas, donc un recrutement moins cher.
              </p>
              <p>
                En réalité, cette approche génère des <strong className="text-foreground">coûts cachés significatifs</strong> : une exécution plus lente, une qualification plus faible des candidats, des allers-retours plus nombreux avec les hiring managers, des entretiens moins bien préparés, et des shortlists qui ne correspondent pas aux attentes réelles du poste.
              </p>
              <p>
                Le résultat ? <strong className="text-foreground">Les managers perdent du temps, les recrutements s'allongent et le coût final dépasse largement l'économie initiale.</strong>
              </p>
              <p>
                Le Talent Acquisition à temps partagé avec un profil senior est un modèle plus intelligent : il permet de <strong className="text-foreground">maîtriser le budget tout en augmentant la vitesse d'exécution, la qualité des profils et l'expérience des opérationnels</strong>.
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Notre vision du Talent Acquisition</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Chez Rocket4RPO, nous croyons que la performance recrutement se construit avec de l'expertise, pas avec du volume à bas coût.
          </p>
        </motion.div>

        <div className="grid gap-12 md:gap-16">
          {/* Sub-section 1 */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Le faux bon calcul du recrutement junior à bas coût</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Un TJM bas ne signifie pas un recrutement économique. Un profil junior en Talent Acquisition a besoin de plus d'encadrement, produit des qualifications moins fines et génère davantage de friction avec les équipes opérationnelles.
                </p>
                <p>
                  Le temps passé par les managers à reformuler les briefs, à revoir des profils non pertinents et à multiplier les entretiens improductifs représente un coût souvent invisible, mais bien réel.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-secondary border border-border">
              <h4 className="font-bold text-lg mb-4 text-foreground">Les coûts cachés du recrutement junior</h4>
              <ul className="space-y-3">
                {[
                  "Qualification approximative des candidats",
                  "Multiplication des entretiens non concluants",
                  "Temps manager gaspillé en allers-retours",
                  "Allongement des délais de recrutement",
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Le temps partagé senior : un modèle plus intelligent</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Le modèle de Talent Acquisition à temps partagé permet d'intégrer un recruteur senior externalisé dans vos équipes, quelques jours par semaine, avec un niveau d'exigence et une capacité d'exécution immédiatement opérationnels.
                </p>
                <p>
                  Vous contrôlez votre budget sans sacrifier la qualité. Vous accédez à une expertise de sourcing avancé, de qualification structurée et de pilotage de processus, sans recruter en interne à temps plein.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 md:order-1">
              <h4 className="font-bold text-lg mb-4 text-foreground">Ce qu'apporte un TA senior</h4>
              <ul className="space-y-3">
                {[
                  "Compréhension immédiate des enjeux métier",
                  "Sourcing ciblé et chasse directe efficace",
                  "Shortlists pertinentes dès les premiers jours",
                  "Relation de confiance avec les hiring managers",
                  "Pilotage structuré de la performance",
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Une valeur immédiate pour les opérationnels</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              L'enjeu du recrutement ne se résume pas au coût du recruteur. Ce qui compte, c'est le temps gagné par les managers, la justesse des profils présentés et la fluidité du processus de bout en bout. Un Talent Acquisition Specialist senior crée cette valeur dès les premières semaines d'intervention.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 4. POURQUOI LE TEMPS PARTAGÉ FONCTIONNE ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Pourquoi le temps partagé fonctionne</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un modèle conçu pour les entreprises qui veulent de la performance sans rigidité.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Layers,
              title: "Pas besoin d'un TA à temps plein pour bien recruter",
              text: "Toutes les entreprises n'ont pas un flux de recrutement qui justifie un poste interne dédié. Le temps partagé vous donne accès à l'expertise dont vous avez besoin, au bon niveau d'intervention, sans créer de surcoût structurel.",
            },
            {
              icon: Brain,
              title: "L'expertise prime sur le volume",
              text: "Ce n'est pas la quantité de CVs sourcés qui fait la différence, c'est la capacité à identifier, qualifier et présenter les bons profils. Un TA senior produit des résultats en moins de temps qu'un junior, avec moins de bruit.",
            },
            {
              icon: Zap,
              title: "Accélérer sans surdimensionner",
              text: "Le temps partagé permet de monter en puissance rapidement sur vos recrutements sans engager les coûts et les délais d'un recrutement interne. Vous gagnez en réactivité tout en gardant le contrôle de vos ressources.",
            },
            {
              icon: Handshake,
              title: "Comprendre le marché et les managers",
              text: "Un recruteur senior externalisé sait lire un marché, adapter son approche et construire une relation de confiance avec les hiring managers. Cette compréhension mutuelle est le socle d'un recrutement qui performe.",
            },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-background border border-border">
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
              title: "Cadrer le besoin avec précision",
              text: "Nous analysons chaque poste en profondeur avec le hiring manager : enjeux du rôle, compétences critiques, contexte d'équipe, critères de succès. Un brief structuré élimine les approximations dès le départ.",
            },
            {
              icon: FileCheck,
              step: "02",
              title: "Définir une scorecard claire",
              text: "Nous construisons une scorecard de recrutement partagée avec les opérationnels. Elle aligne les critères d'évaluation et garantit une lecture cohérente des candidatures tout au long du process.",
            },
            {
              icon: Search,
              step: "03",
              title: "Lancer un sourcing ciblé et une chasse directe efficace",
              text: "Approche directe multicanale, identification de talents passifs, activation de réseaux : notre sourcing cible les profils pertinents au lieu de multiplier les candidatures non qualifiées.",
            },
            {
              icon: ShieldCheck,
              step: "04",
              title: "Qualifier réellement les candidats",
              text: "Chaque candidat présenté a été évalué sur ses compétences techniques, son adéquation culturelle et sa motivation réelle. Nous ne transmettons que des profils que nous recommandons.",
            },
            {
              icon: MessageSquare,
              step: "05",
              title: "Fluidifier la relation avec les managers",
              text: "Nous structurons la communication entre le recrutement et les opérationnels : debriefs systématiques, feedback loop, suivi des délais. Les managers gagnent du temps et prennent de meilleures décisions.",
            },
            {
              icon: Activity,
              step: "06",
              title: "Piloter la performance recrutement",
              text: "Reporting régulier, suivi des KPIs clés (time-to-hire, taux de conversion, qualité des shortlists), ajustements en continu. Nous pilotons le recrutement comme un levier de performance business.",
            },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="relative p-8 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-colors">
              <span className="absolute top-6 right-6 text-5xl font-bold text-muted/30 select-none">{item.step}</span>
              <item.icon className="w-7 h-7 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-3 pr-12">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-8 text-center">
          <p className="text-muted-foreground">
            Vous souhaitez en savoir plus sur notre méthodologie ?{" "}
            <Link to="/offre/recrutement-talent-acquisition" className="text-primary font-medium hover:underline">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Ce que vous gagnez concrètement</h2>
          <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">
            Des résultats mesurables, pas des promesses.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "Des recrutements mieux cadrés dès le brief initial",
            "Une shortlist plus juste, alignée avec les attentes réelles",
            "Un meilleur usage du temps des managers opérationnels",
            "Une exécution plus rapide grâce à l'expertise senior",
            "Une expertise senior sans coût fixe à temps plein",
            "Une méthode robuste et adaptable à chaque contexte",
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="flex items-start gap-3 p-5 rounded-xl bg-background/5 border border-background/10">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Les avantages du temps partagé</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "Flexibilité", text: "1 à 4 jours par semaine, ajustables selon vos besoins de recrutement et vos priorités business." },
            { icon: Users, title: "Expertise senior", text: "Des Talent Acquisition Specialists expérimentés, capables de sourcer, qualifier et piloter des recrutements exigeants." },
            { icon: TrendingUp, title: "Coût optimisé", text: "Vous bénéficiez d'une expertise de haut niveau sans supporter immédiatement le coût d'un poste interne à temps plein." },
            { icon: Timer, title: "Intégration rapide", text: "Opérationnel en quelques jours grâce à une phase d'onboarding structurée et une méthode immédiatement activable." },
            { icon: FileCheck, title: "Meilleure qualité de shortlist", text: "Des profils plus pertinents, mieux qualifiés et plus alignés avec les attentes du poste et du manager." },
            { icon: BarChart3, title: "Gain de temps pour les opérationnels", text: "Un TA senior structure le process, filtre les candidatures et évite aux managers des entretiens inutiles." },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors">
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
              À qui s'adresse le Talent Acquisition à temps partagé ?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Notre modèle de recruteur senior externalisé s'adapte aux entreprises qui ont besoin de performance de recrutement sans rigidité structurelle.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="space-y-4">
              {[
                { icon: Rocket, label: "Startups en croissance", desc: "qui doivent recruter vite et bien, sans avoir encore structuré leur fonction TA en interne." },
                { icon: TrendingUp, label: "Scale-ups", desc: "qui accélèrent leurs recrutements et ont besoin d'un renfort senior immédiat." },
                { icon: Building2, label: "Entreprises Tech", desc: "qui structurent leur hiring et veulent une méthodologie éprouvée dès le départ." },
                { icon: RefreshCw, label: "Besoins récurrents mais non constants", desc: "qui ne justifient pas un poste de TA interne à temps plein." },
                { icon: ShieldCheck, label: "Renfort senior immédiat", desc: "pour des organisations qui ont besoin de résultats rapides sur des recrutements stratégiques." },
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
          <p className="text-center text-muted-foreground mb-6">Découvrez également nos autres expertises</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Nos offres", to: "/offre/talent-acquisition-temps-plein" },
              { label: "Recrutement de Talent Acquisition", to: "/offre/recrutement-talent-acquisition" },
              { label: "Sourcing & Enablement", to: "/offre/outils-sourcing-enablement" },
              { label: "Cas clients", to: "/cas-clients" },
              { label: "Nous contacter", to: "/contact" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background text-foreground hover:border-primary/30 hover:text-primary transition-colors">
                {link.label}
              </Link>
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

export default TalentAcquisitionTempsPartage;

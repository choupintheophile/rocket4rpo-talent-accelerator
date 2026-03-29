import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, UserPlus, Search, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const offers = [
  {
    icon: Users,
    title: "TA à temps partagé",
    description: "Vous êtes exigeants, nous aussi, nous mettons la barre très haute pour être certain de vous proposer les meilleurs  Talent Acquisition Specialist qui seront intégrés à vos équipes quelques jours par semaine. Flexibilité maximale, expertise immédiate.",
    to: "/offre/talent-acquisition-temps-partage",
  },
  {
    icon: UserPlus,
    title: "TA à temps plein",
    description: "Un expert Talent Acquisition dédié à 100% à vos recrutements. Immersion totale dans votre culture et vos processus pour une forte croissance de vos effectifs",
    to: "/offre/talent-acquisition-temps-plein",
  },
  {
    icon: Search,
    title: "Recrutement de Talent Acquisition",
    description: "Nous recrutons pour vous des Talent Acquisition Managers et Specialists adaptés à vos enjeux de croissance.",
    to: "/offre/recrutement-talent-acquisition",
  },
  {
    icon: Wrench,
    title: "Outils de sourcing & enablement",
    description: "Sélection d'outils de sourcing abordables, formation de vos équipes et optimisation de votre stack recrutement.",
    to: "/offre/outils-sourcing-enablement",
  },
];

export const OffersSection = () => (
  <section className="section-padding">
    <div className="container-wide">
      <SectionHeading
        badge="Notre offre"
        title={<>Des solutions de Talent Acquisition <span className="text-gradient">adaptées à chaque besoin</span></>}
        description="Du temps partagé au recrutement en passant par l'outillage, nous couvrons l'ensemble de vos besoins en Talent Acquisition."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={offer.to}
              className="group block p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <offer.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{offer.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

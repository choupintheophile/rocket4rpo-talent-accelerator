import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const testimonials = [
  {
    name: "S.D.",
    role: "VP People",
    company: "Scale-up SaaS B2B (120 pers.)",
    quote:
      "En 4 mois, 8 postes Sales pourvus. Le TA Rocket4RPO s'est intégré à nos rituels comme un membre de l'équipe. La qualité des shortlists grâce à leur base de profils Sales est incomparable.",
    rating: 5,
    industry: "SaaS",
    order: 0,
  },
  {
    name: "M.L.",
    role: "CTO",
    company: "Fintech (60 pers.)",
    quote:
      "Sans fonction TA en interne, nous étions bloqués. Le modèle temps partagé nous a permis de recruter 5 développeurs en 6 mois avec un sourcing ciblé. Le premier CV pertinent est arrivé en 3 jours.",
    rating: 5,
    industry: "Fintech",
    order: 1,
  },
  {
    name: "J.M.",
    role: "DRH",
    company: "Éditeur logiciel (200 pers.)",
    quote:
      "La méthodologie structurée (scorecards, KPIs hebdomadaires, debriefs systématiques) nous a donné une visibilité inédite sur notre pipeline. 4 recrutements marketing signés en 5 semaines.",
    rating: 5,
    industry: "Software",
    order: 2,
  },
  {
    name: "T.B.",
    role: "CEO",
    company: "Start-up HealthTech (30 pers.)",
    quote:
      "En phase de scaling, on avait besoin de recruter vite ET bien. Premier shortlist en 48h, 3 postes pourvus en 6 semaines. Le ROI est évident quand on compare au coût d'un cabinet.",
    rating: 5,
    industry: "HealthTech",
    order: 3,
  },
];

async function main() {
  // Delete all existing testimonials
  const deleted = await prisma.testimonial.deleteMany();
  console.log(`Deleted ${deleted.count} existing testimonials`);

  // Insert new testimonials
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`Created ${testimonials.length} new testimonials`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

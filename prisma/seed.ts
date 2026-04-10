import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed Blog Posts
  const blogPosts = [
    {
      slug: "rpo-definition-avantages-entreprises-tech",
      title: "RPO : définition, avantages et pourquoi les entreprises Tech l'adoptent",
      excerpt: "Le Recruitment Process Outsourcing (RPO) s'impose comme un levier stratégique pour les entreprises Tech en croissance. Décryptage complet.",
      category: "RPO",
      date: new Date("2026-03-15"),
      readTime: "8 min",
      content: "Le RPO, ou Recruitment Process Outsourcing, consiste à externaliser tout ou partie de votre processus de recrutement à un partenaire spécialisé...",
    },
    {
      slug: "talent-acquisition-temps-partage-guide-complet",
      title: "Talent Acquisition à temps partagé : le guide complet pour les scale-ups",
      excerpt: "Comment un TA à temps partagé peut transformer votre capacité de recrutement sans exploser votre budget. Guide pratique.",
      category: "Talent Acquisition",
      date: new Date("2026-03-10"),
      readTime: "6 min",
      content: "Le modèle de Talent Acquisition à temps partagé séduit de plus en plus de scale-ups Tech...",
    },
    {
      slug: "sourcing-tech-techniques-avancees-2026",
      title: "Sourcing Tech en 2026 : techniques avancées pour trouver les meilleurs développeurs",
      excerpt: "Les techniques de sourcing classiques ne suffisent plus. Voici les méthodes avancées pour identifier les profils tech les plus recherchés.",
      category: "Sourcing",
      date: new Date("2026-03-05"),
      readTime: "7 min",
      content: "Le marché tech reste tendu et les techniques de sourcing évoluent rapidement...",
    },
    {
      slug: "structurer-processus-recrutement-startup",
      title: "Comment structurer son processus de recrutement en startup",
      excerpt: "Scorecard, pipeline, KPIs : les fondamentaux pour passer d'un recrutement opportuniste à une machine de recrutement efficace.",
      category: "Structuration du recrutement",
      date: new Date("2026-02-28"),
      readTime: "9 min",
      content: "Structurer son processus de recrutement est un enjeu critique pour les startups en croissance...",
    },
    {
      slug: "marque-employeur-tech-guide-pratique",
      title: "Marque employeur Tech : guide pratique pour attirer les meilleurs talents",
      excerpt: "Comment construire une marque employeur authentique et différenciante dans l'écosystème Tech français.",
      category: "Marque employeur",
      date: new Date("2026-02-20"),
      readTime: "6 min",
      content: "La marque employeur n'est pas qu'un sujet de communication...",
    },
    {
      slug: "recruter-account-executive-saas",
      title: "Recruter un Account Executive SaaS : les critères qui comptent vraiment",
      excerpt: "Au-delà du CV, quels sont les vrais indicateurs de succès d'un Account Executive SaaS ? Notre grille d'évaluation.",
      category: "Recrutement Tech",
      date: new Date("2026-02-15"),
      readTime: "5 min",
      content: "Recruter un Account Executive performant dans le SaaS est un exercice qui demande une méthodologie rigoureuse...",
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  // Seed Case Studies
  const caseStudies = [
    {
      slug: "saas-scale-up-sales",
      company: "Scale-up SaaS B2B — 120 collaborateurs",
      industry: "SaaS / Sales",
      challenge: "Recruter 8 profils Sales (AE, SDR, Sales Manager) en 4 mois pour accompagner une levée de fonds Série B.",
      intervention: "Intégration d'un TA Specialist à temps plein pendant 5 mois. Structuration du processus de recrutement Sales, mise en place de scorecards, sourcing direct sur LinkedIn et approche réseau.",
      metrics: [
        { value: "8", label: "recrutements" },
        { value: "6 mois", label: "délai moyen" },
        { value: "92%", label: "rétention à 12 mois" },
      ],
    },
    {
      slug: "fintech-engineering",
      company: "Fintech — 60 collaborateurs",
      industry: "IT / Engineering",
      challenge: "Constituer une équipe Engineering de 5 développeurs (Backend, Full-Stack, DevOps) sans fonction TA interne.",
      intervention: "Mission TA à temps partagé (3j/semaine) pendant 6 mois. Création de la marque employeur technique, sourcing ciblé sur GitHub et communautés tech, coordination avec le CTO.",
      metrics: [
        { value: "5", label: "recrutements" },
        { value: "120 jours", label: "time-to-hire moyen" },
        { value: "100%", label: "rétention à 6 mois" },
      ],
    },
    {
      slug: "editeur-logiciel-marketing",
      company: "Éditeur logiciel — 200 collaborateurs",
      industry: "Marketing / Growth",
      challenge: "Recruter un Head of Marketing, un Growth Manager et 2 Content Managers pour structurer le département Marketing.",
      intervention: "Recrutement de profils Marketing via approche directe et sélection rigoureuse. Accompagnement du DRH dans la définition des fiches de poste et des grilles de rémunération marché.",
      metrics: [
        { value: "4", label: "recrutements" },
        { value: "5 semaines", label: "délai moyen" },
        { value: "100%", label: "satisfaction client" },
      ],
    },
  ];

  for (const study of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: study,
      create: study,
    });
  }
  console.log(`Seeded ${caseStudies.length} case studies`);

  // Seed Team Members
  const teamMembers = [
    {
      name: "Clément Martin",
      initials: "CM",
      role: "CEO, Rocket4Sales",
      shortBio: "Fondateur de Rocket4Sales, 7+ ans d'expertise en recrutement Tech & SaaS. Architecte de la vision Rocket4GTM.",
      fullBio: "Clément a fondé Rocket4Sales avec la conviction que le recrutement de talents commerciaux dans la Tech méritait une approche radicalement différente. Après 7 ans à structurer des équipes Sales pour les scale-ups les plus ambitieuses, il lance Rocket4RPO pour étendre cette expertise au Talent Acquisition en tant que service.",
      photoUrl: "/team/clement-martin.webp",
      linkedin: "https://www.linkedin.com/in/clement-martin-rocket4sales/",
      order: 0,
    },
    {
      name: "Théophile Choupin",
      initials: "TC",
      role: "Sales Director",
      shortBio: "Expert en développement commercial B2B et en structuration d'offres de services RH pour l'écosystème Tech.",
      fullBio: "Théophile pilote le développement commercial de Rocket4RPO. Sa connaissance fine des enjeux de croissance des entreprises Tech lui permet d'identifier les besoins en Talent Acquisition et de proposer des modèles d'intervention adaptés à chaque contexte.",
      photoUrl: "/team/theophile-choupin.webp",
      linkedin: "https://www.linkedin.com/in/theophile-choupin/",
      order: 1,
    },
    {
      name: "Julien Regnacq",
      initials: "JR",
      role: "Sales Director",
      shortBio: "Expert en développement commercial B2B et en structuration d'offres de services RH pour l'écosystème Tech.",
      fullBio: "Julien pilote le développement commercial de Rocket4RPO. Sa connaissance fine des enjeux de croissance des entreprises Tech lui permet d'identifier les besoins en Talent Acquisition et de proposer des modèles d'intervention adaptés à chaque contexte.",
      photoUrl: "/team/julien-regnacq.webp",
      linkedin: "https://www.linkedin.com/in/julien-regnacq-a3a6851a6/",
      order: 2,
    },
    {
      name: "Marion Longo",
      initials: "ML",
      role: "Chief of Staff",
      shortBio: "Garante de l'excellence opérationnelle, de la coordination des équipes et de la qualité de service Rocket4RPO.",
      fullBio: "Marion assure la coordination opérationnelle entre les TA Specialists, les clients et les équipes internes. Son approche structurée et orientée résultats garantit un niveau de service irréprochable sur chaque mission.",
      photoUrl: "/team/marion-longo.webp",
      linkedin: "https://www.linkedin.com/in/marion-longo/",
      order: 3,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.name.toLowerCase().replace(/\s/g, "-") },
      update: member,
      create: { id: member.name.toLowerCase().replace(/\s/g, "-"), ...member },
    });
  }
  console.log(`Seeded ${teamMembers.length} team members`);

  // Seed Candidates from R4RPO JSON
  await seedCandidates(prisma);
}

const NB_CRIT = 7;

function migrateScores(sc: Record<string, number> | null, mode?: string): Record<string, number> {
  if (!sc) return {};
  if (sc["c0"] !== undefined) {
    const out: Record<string, number> = {};
    for (let i = 0; i < NB_CRIT; i++) {
      if (sc[`c${i}`]) out[`c${i}`] = sc[`c${i}`];
    }
    return out;
  }
  const m = mode || "ESN";
  const MAP = [1, 3, 6, 2, 4, 5, 11];
  const out: Record<string, number> = {};
  for (let i = 0; i < MAP.length; i++) {
    const oldKey = m + MAP[i];
    if (sc[oldKey]) out[`c${i}`] = sc[oldKey];
  }
  return out;
}

function calcScoreFromScores(scores: Record<string, number>): { total: number; max: number; filled: number; pct: number } {
  let total = 0, filled = 0;
  for (let i = 0; i < NB_CRIT; i++) {
    const s = scores[`c${i}`] || 0;
    total += s;
    if (s > 0) filled++;
  }
  const max = filled * 5;
  return { total, max, filled, pct: max > 0 ? Math.round((total / max) * 100) : 0 };
}

async function seedCandidates(prisma: PrismaClient) {
  const possiblePaths = [
    path.resolve(__dirname, "../data/R4RPO_16candidats_2026-04-09.json"),
    "C:/Users/choup/OneDrive/Bureau/Rocket4Sales/TA.outils/sauvegardes/R4RPO_16candidats_2026-04-09.json",
  ];

  let jsonData: { candidates: any[] } | null = null;
  for (const p of possiblePaths) {
    try {
      const raw = fs.readFileSync(p, "utf-8");
      jsonData = JSON.parse(raw);
      console.log(`\nLoaded ${jsonData!.candidates.length} candidates from ${p}`);
      break;
    } catch { continue; }
  }

  if (!jsonData) {
    console.log("\nCandidate JSON not found, skipping candidate seed");
    return;
  }

  await prisma.candidate.deleteMany();

  for (const c of jsonData.candidates) {
    const scores = migrateScores(c.sc, c.mode || c.sector);
    const calc = calcScoreFromScores(scores);

    await prisma.candidate.create({
      data: {
        prenom: c.prenom || "",
        nom: c.nom || "",
        email: c.email || null,
        phone: c.phone || null,
        linkedin: c.li || null,
        date: c.date ? new Date(c.date) : null,
        contrat: c.contrat || null,
        tjm: c.tjm || null,
        dispo: c.dispo || null,
        loc: c.loc || null,
        remote: c.remote || null,
        days: c.days || null,
        sector: c.sector || c.mode || null,
        notes: c.notes || null,
        resumeText: c.resumeText || null,
        scores,
        forces: c.forces || [],
        risks: c.risks || [],
        score: calc.total,
        maxScore: calc.max,
        pct: calc.pct,
        filled: calc.filled,
        hasCv: c.hasCv || false,
      },
    });
    console.log(`  + ${c.prenom} ${c.nom} (${calc.pct}%)`);
  }

  console.log(`Seeded ${jsonData.candidates.length} candidates`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

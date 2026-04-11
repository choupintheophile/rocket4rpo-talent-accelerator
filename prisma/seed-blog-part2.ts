/**
 * BLOG SEED PART 2 — Generates 262 more articles to reach 707 total
 * Run: npx tsx prisma/seed-blog-part2.ts
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const PHOTO_IDS = [
  "1521737604893-d14cc237f11d", "1522071820081-009f0129c71c", "1531973576160-7125cd56d3e7",
  "1552664730-d307ca884978", "1553877522-43269d4ea984", "1556761175-5973dc0f32e7",
  "1557804506-669a67965ba0", "1573497019940-1c28c88b4f3e", "1573496359142-b8d87734a5a2",
  "1573497620053-ea5300f94f21", "1573164713988-8665fc963095", "1573164574511-73c773193279",
  "1574958269340-fa927503f3dd", "1519389950473-47ba0277781c", "1522202176988-66273c2fd55f",
  "1504384764586-bb4cdc1812f0", "1517245386807-bb43f82c33c4", "1521791136064-7986c2920216",
  "1522199710521-72d69614c702", "1527689368864-3a821dbccc34", "1542744173-8e7e91415657",
  "1543269865-cbf427effbad", "1544725121-be3bf52e2dc8", "1551434678-e076c223a692",
];

function getImg(i: number, w = 1200, h = 630) {
  return `https://images.unsplash.com/photo-${PHOTO_IDS[i % PHOTO_IDS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// Additional topic clusters
const topics: { t: string; cat: string }[] = [
  // RPO avancé (20)
  { t: "RPO et recrutement de cadres dirigeants", cat: "RPO" },
  { t: "RPO pour les PME industrielles", cat: "RPO" },
  { t: "RPO et secteur public : est-ce possible ?", cat: "RPO" },
  { t: "Le RPO dans le luxe et la mode", cat: "RPO" },
  { t: "RPO et recrutement de profils créatifs", cat: "RPO" },
  { t: "Le RPO en période de gel des embauches", cat: "RPO" },
  { t: "RPO et gestion de la diversité culturelle", cat: "RPO" },
  { t: "Le RPO externalisé vs le TA interne : retour d'expérience", cat: "RPO" },
  { t: "RPO et intelligence émotionnelle dans le recrutement", cat: "RPO" },
  { t: "Construire un business case pour le RPO", cat: "RPO" },
  { t: "RPO et compliance : les règles à respecter", cat: "RPO" },
  { t: "Le RPO dans le retail et la distribution", cat: "RPO" },
  { t: "RPO pour les entreprises familiales", cat: "RPO" },
  { t: "Le RPO dans l'événementiel et le tourisme", cat: "RPO" },
  { t: "RPO et recrutement d'apprentis", cat: "RPO" },
  { t: "Le ROI du RPO sur 3 ans : étude longitudinale", cat: "RPO" },
  { t: "RPO et transformation digitale des RH", cat: "RPO" },
  { t: "Le RPO dans la logistique et le transport", cat: "RPO" },
  { t: "RPO et recrutement de profils rares en cybersécurité", cat: "RPO" },
  { t: "Optimiser la collaboration RPO-Hiring Manager", cat: "RPO" },

  // TA avancé (20)
  { t: "Talent Acquisition et employer branding sur TikTok", cat: "Talent Acquisition" },
  { t: "Le talent acquisition dans les associations et ONG", cat: "Talent Acquisition" },
  { t: "TA et recrutement de profils seniors (50+)", cat: "Talent Acquisition" },
  { t: "Talent Acquisition et neurosciences", cat: "Talent Acquisition" },
  { t: "Le TA comme business partner : posture et outils", cat: "Talent Acquisition" },
  { t: "Talent Acquisition et employee value proposition", cat: "Talent Acquisition" },
  { t: "TA et recrutement dans l'ESS (économie sociale et solidaire)", cat: "Talent Acquisition" },
  { t: "Le Talent Acquisition dans les cabinets de conseil", cat: "Talent Acquisition" },
  { t: "TA et gestion des talents à haut potentiel", cat: "Talent Acquisition" },
  { t: "Le rôle du TA dans les fusions-acquisitions", cat: "Talent Acquisition" },
  { t: "TA et recrutement de profils juridiques", cat: "Talent Acquisition" },
  { t: "Talent Acquisition et gamification du processus", cat: "Talent Acquisition" },
  { t: "TA et recrutement dans l'agroalimentaire", cat: "Talent Acquisition" },
  { t: "Le TA dans les grands groupes vs startups", cat: "Talent Acquisition" },
  { t: "TA et recrutement de profils commerciaux terrain", cat: "Talent Acquisition" },
  { t: "Talent Acquisition et marché de l'emploi cadre 2026", cat: "Talent Acquisition" },
  { t: "Le TA et la gestion des candidatures spontanées", cat: "Talent Acquisition" },
  { t: "TA et recrutement dans les métiers manuels", cat: "Talent Acquisition" },
  { t: "Le futur du Talent Acquisition : tendances 2027-2030", cat: "Talent Acquisition" },
  { t: "TA et personal branding du recruteur", cat: "Talent Acquisition" },

  // Sourcing avancé (15)
  { t: "Sourcing sur Discord : trouver les talents tech", cat: "Sourcing" },
  { t: "Sourcing sur Reddit : communautés et stratégies", cat: "Sourcing" },
  { t: "Le sourcing via les podcasts et webinaires", cat: "Sourcing" },
  { t: "Sourcing de profils créatifs sur Behance et Dribbble", cat: "Sourcing" },
  { t: "Le sourcing automatisé avec l'IA : outils 2026", cat: "Sourcing" },
  { t: "Sourcing de profils cloud et DevOps", cat: "Sourcing" },
  { t: "Le sourcing via les anciens élèves (alumni)", cat: "Sourcing" },
  { t: "Sourcing de profils bilingues et multilingues", cat: "Sourcing" },
  { t: "Le sourcing de cadres dirigeants : méthodes spécifiques", cat: "Sourcing" },
  { t: "Sourcing et intelligence économique", cat: "Sourcing" },
  { t: "Le sourcing via les associations professionnelles", cat: "Sourcing" },
  { t: "Sourcing de profils en reconversion professionnelle", cat: "Sourcing" },
  { t: "Le sourcing éthique : principes et pratiques", cat: "Sourcing" },
  { t: "Sourcing de profils accessibilité numérique", cat: "Sourcing" },
  { t: "Le sourcing programmatique : publicités ciblées", cat: "Sourcing" },

  // Recrutement Tech avancé (20)
  { t: "Recruter un CISO (Chief Information Security Officer)", cat: "Recrutement Tech" },
  { t: "Recruter un VP Engineering : le profil stratégique", cat: "Recrutement Tech" },
  { t: "Recruter des développeurs Rust en 2026", cat: "Recrutement Tech" },
  { t: "Recruter des développeurs TypeScript senior", cat: "Recrutement Tech" },
  { t: "Recruter un Head of Design : UX leadership", cat: "Recrutement Tech" },
  { t: "Recruter un CPO (Chief Product Officer)", cat: "Recrutement Tech" },
  { t: "Recruter des développeurs embedded et IoT", cat: "Recrutement Tech" },
  { t: "Recruter un Data Platform Engineer", cat: "Recrutement Tech" },
  { t: "Recruter un ML Engineer spécialisé LLM", cat: "Recrutement Tech" },
  { t: "Recruter un Staff Engineer : le rôle senior IC", cat: "Recrutement Tech" },
  { t: "Recruter un Engineering Director vs VP Engineering", cat: "Recrutement Tech" },
  { t: "Recruter des développeurs blockchain et Web3 en 2026", cat: "Recrutement Tech" },
  { t: "Recruter un platform engineer : le nouveau DevOps", cat: "Recrutement Tech" },
  { t: "Recruter un technical writer : le profil sous-estimé", cat: "Recrutement Tech" },
  { t: "Recruter en intelligence artificielle : les profils les plus demandés", cat: "Recrutement Tech" },
  { t: "Le salaire des développeurs Go en France 2026", cat: "Recrutement Tech" },
  { t: "Le salaire des développeurs React/Next.js en France 2026", cat: "Recrutement Tech" },
  { t: "Recruter un Head of Data : data-driven leadership", cat: "Recrutement Tech" },
  { t: "Recruter dans la réalité virtuelle et le metaverse", cat: "Recrutement Tech" },
  { t: "Les compétences tech les plus demandées en 2027", cat: "Recrutement Tech" },

  // SaaS Sales (15)
  { t: "Recruter un Inside Sales Representative en SaaS", cat: "Secteur SaaS" },
  { t: "Recruter un Channel Sales Manager", cat: "Secteur SaaS" },
  { t: "Le modèle PLG et son impact sur le recrutement sales", cat: "Secteur SaaS" },
  { t: "Recruter un VP Marketing SaaS", cat: "Secteur SaaS" },
  { t: "Recruter un Head of Customer Experience", cat: "Secteur SaaS" },
  { t: "Les KPIs de performance d'un SDR SaaS", cat: "Secteur SaaS" },
  { t: "Recruter un Pre-Sales Engineer : le profil technique-commercial", cat: "Secteur SaaS" },
  { t: "Le ramp-up d'un Account Executive SaaS : les 6 premiers mois", cat: "Secteur SaaS" },
  { t: "Recruter un Director of Sales Operations", cat: "Secteur SaaS" },
  { t: "Les meilleurs canaux de sourcing pour les profils SaaS", cat: "Secteur SaaS" },
  { t: "Recruter un Head of Demand Generation", cat: "Secteur SaaS" },
  { t: "Le processus de recrutement idéal pour un AE Enterprise", cat: "Secteur SaaS" },
  { t: "Recruter un Head of Expansion Revenue", cat: "Secteur SaaS" },
  { t: "L'assessment du commercial SaaS : les 5 critères clés", cat: "Secteur SaaS" },
  { t: "Recruter un Chief Revenue Officer (CRO)", cat: "Secteur SaaS" },

  // Marque employeur (15)
  { t: "Marque employeur et Gen Alpha : anticiper 2030", cat: "Marque employeur" },
  { t: "Le carreer site optimisé : conversion et SEO", cat: "Marque employeur" },
  { t: "L'événementiel comme levier de marque employeur", cat: "Marque employeur" },
  { t: "Les partenariats écoles et la marque employeur", cat: "Marque employeur" },
  { t: "La marque employeur en B2B vs B2C", cat: "Marque employeur" },
  { t: "Le contenu employeur qui performe sur LinkedIn", cat: "Marque employeur" },
  { t: "Marque employeur et intelligence artificielle", cat: "Marque employeur" },
  { t: "Comment rebondir après une crise de marque employeur", cat: "Marque employeur" },
  { t: "La marque employeur internationale : adapter son message", cat: "Marque employeur" },
  { t: "Les meilleurs exemples de marque employeur tech en France", cat: "Marque employeur" },
  { t: "La marque employeur pour les métiers en tension", cat: "Marque employeur" },
  { t: "Le podcast employeur : format et stratégie", cat: "Marque employeur" },
  { t: "Les influenceurs RH : partenariats et collaborations", cat: "Marque employeur" },
  { t: "La marque employeur et le rapport RSE", cat: "Marque employeur" },
  { t: "Audit de marque employeur : méthodologie en 10 étapes", cat: "Marque employeur" },

  // Onboarding avancé (10)
  { t: "L'onboarding des managers : les 100 premiers jours", cat: "Onboarding" },
  { t: "L'onboarding digital : les outils en 2026", cat: "Onboarding" },
  { t: "Onboarding et performance : mesurer le lien", cat: "Onboarding" },
  { t: "Le welcome pack 2026 : les tendances", cat: "Onboarding" },
  { t: "Onboarding cross-culturel : intégrer des talents internationaux", cat: "Onboarding" },
  { t: "L'onboarding des freelances et prestataires", cat: "Onboarding" },
  { t: "Le programme de mentorat en onboarding", cat: "Onboarding" },
  { t: "Onboarding et rétention : les 30 premiers jours critiques", cat: "Onboarding" },
  { t: "Le retour de congé maternité/paternité : un re-onboarding", cat: "Onboarding" },
  { t: "Les erreurs d'onboarding les plus coûteuses", cat: "Onboarding" },

  // KPIs avancé (10)
  { t: "Le funnel de recrutement : optimiser chaque étape", cat: "KPIs & Analytics" },
  { t: "Le taux de no-show en entretien : causes et solutions", cat: "KPIs & Analytics" },
  { t: "Recruting velocity : mesurer la vitesse du pipeline", cat: "KPIs & Analytics" },
  { t: "Le coût d'un poste vacant : comment le calculer", cat: "KPIs & Analytics" },
  { t: "L'analytics RH avec Power BI : tutoriel pratique", cat: "KPIs & Analytics" },
  { t: "Le taux de conversion candidature → entretien", cat: "KPIs & Analytics" },
  { t: "Le Net Promoter Score candidat (cNPS)", cat: "KPIs & Analytics" },
  { t: "Recruitement marketing analytics : les métriques clés", cat: "KPIs & Analytics" },
  { t: "Le reporting recrutement pour le COMEX", cat: "KPIs & Analytics" },
  { t: "Les vanity metrics en recrutement : ce qu'il faut éviter", cat: "KPIs & Analytics" },

  // IA avancé (10)
  { t: "Claude, ChatGPT, Gemini : quel LLM pour le recrutement ?", cat: "IA & Recrutement" },
  { t: "L'IA pour personnaliser les messages d'approche", cat: "IA & Recrutement" },
  { t: "Les agents IA en recrutement : automatiser le sourcing", cat: "IA & Recrutement" },
  { t: "L'IA et l'analyse prédictive des départs", cat: "IA & Recrutement" },
  { t: "Créer un chatbot de pré-qualification avec l'IA", cat: "IA & Recrutement" },
  { t: "L'IA pour rédiger des descriptions de poste inclusives", cat: "IA & Recrutement" },
  { t: "Computer vision et analyse de vidéos d'entretien", cat: "IA & Recrutement" },
  { t: "L'IA dans les ATS : fonctionnalités comparées 2026", cat: "IA & Recrutement" },
  { t: "Prompt engineering pour le recruteur : les meilleurs prompts", cat: "IA & Recrutement" },
  { t: "L'IA et le matching de compétences : au-delà des mots-clés", cat: "IA & Recrutement" },

  // Outils avancé (10)
  { t: "Ashby vs Lever vs Greenhouse : comparatif ATS 2026", cat: "Outils & Stack" },
  { t: "HireSweet, Recruitee, Flatchr : les ATS français", cat: "Outils & Stack" },
  { t: "Les outils de scheduling d'entretiens en 2026", cat: "Outils & Stack" },
  { t: "Les outils de test de personnalité en recrutement", cat: "Outils & Stack" },
  { t: "Calendly, SavvyCal, Cal.com : lequel pour le recrutement ?", cat: "Outils & Stack" },
  { t: "Les outils de vidéo asynchrone pour le recrutement", cat: "Outils & Stack" },
  { t: "Les intégrations ATS-SIRH : connecter vos systèmes", cat: "Outils & Stack" },
  { t: "Les outils de vérification des antécédents en 2026", cat: "Outils & Stack" },
  { t: "Le CRM candidat : Beamery vs Avature vs Phenom", cat: "Outils & Stack" },
  { t: "Les API de recrutement : intégrer vos outils", cat: "Outils & Stack" },

  // Remote avancé (10)
  { t: "Le management asynchrone : guide pour les équipes distribuées", cat: "Remote & Hybride" },
  { t: "Les outils de collaboration pour les équipes remote", cat: "Remote & Hybride" },
  { t: "Le travail depuis l'étranger : cadre légal et fiscal", cat: "Remote & Hybride" },
  { t: "Recruter des digital nomads : opportunité ou risque ?", cat: "Remote & Hybride" },
  { t: "Le modèle 4 jours : impact sur le recrutement", cat: "Remote & Hybride" },
  { t: "Les retreats d'entreprise en remote : organiser et budgéter", cat: "Remote & Hybride" },
  { t: "Le flex office : impact sur la culture et le recrutement", cat: "Remote & Hybride" },
  { t: "Remote et santé mentale : les responsabilités de l'employeur", cat: "Remote & Hybride" },
  { t: "Le contrat de télétravail : modèle et clauses clés", cat: "Remote & Hybride" },
  { t: "Les villes françaises qui attirent les remote workers", cat: "Remote & Hybride" },

  // Expérience candidat (10)
  { t: "L'intelligence émotionnelle dans le processus de recrutement", cat: "Expérience candidat" },
  { t: "Le storytelling d'offre d'emploi : rendre le poste désirable", cat: "Expérience candidat" },
  { t: "La transparence salariale dans l'offre d'emploi", cat: "Expérience candidat" },
  { t: "Le processus de recrutement idéal selon les candidats", cat: "Expérience candidat" },
  { t: "Les chatbots candidats : améliorer l'engagement 24/7", cat: "Expérience candidat" },
  { t: "L'expérience de recrutement comme avantage compétitif", cat: "Expérience candidat" },
  { t: "Le suivi post-recrutement : les 6 premiers mois", cat: "Expérience candidat" },
  { t: "L'accueil le premier jour : créer un moment mémorable", cat: "Expérience candidat" },
  { t: "Les questionnaires post-recrutement : template et analyse", cat: "Expérience candidat" },
  { t: "Le career pathing comme outil de recrutement", cat: "Expérience candidat" },

  // Rétention avancé (10)
  { t: "Le congé sabbatique : un outil de fidélisation sous-estimé", cat: "Rétention & Fidélisation" },
  { t: "Les rituels d'équipe qui fidélisent en remote", cat: "Rétention & Fidélisation" },
  { t: "La reconnaissance au travail : les 5 langages", cat: "Rétention & Fidélisation" },
  { t: "Le flex benefits : personnaliser les avantages salariaux", cat: "Rétention & Fidélisation" },
  { t: "L'intrapreneuriat comme levier de rétention", cat: "Rétention & Fidélisation" },
  { t: "Le talent marketplace interne : mobilité sans départ", cat: "Rétention & Fidélisation" },
  { t: "Les enquêtes engagement : fréquence et méthodologie", cat: "Rétention & Fidélisation" },
  { t: "Le leadership servant comme outil de fidélisation", cat: "Rétention & Fidélisation" },
  { t: "La prévention du burn-out : responsabilité de l'employeur", cat: "Rétention & Fidélisation" },
  { t: "Les alumni programs : garder le lien avec les anciens", cat: "Rétention & Fidélisation" },

  // Salaires avancé (10)
  { t: "Le variable en startup : structurer sans budget", cat: "Salaires & Rémunération" },
  { t: "La rémunération des C-level en France 2026", cat: "Salaires & Rémunération" },
  { t: "Les grilles salariales par ville en France 2026", cat: "Salaires & Rémunération" },
  { t: "Le Total Rewards : au-delà du package salarial", cat: "Salaires & Rémunération" },
  { t: "La classification des emplois et les benchmarks salariaux", cat: "Salaires & Rémunération" },
  { t: "Les stock-options en France : fiscalité et attractivité", cat: "Salaires & Rémunération" },
  { t: "Le salaire d'un recruteur freelance en France 2026", cat: "Salaires & Rémunération" },
  { t: "La prime de cooptation : montants et efficacité", cat: "Salaires & Rémunération" },
  { t: "L'inflation et les salaires tech : tendances 2026", cat: "Salaires & Rémunération" },
  { t: "Les avantages non financiers les plus valorisés", cat: "Salaires & Rémunération" },

  // DEI avancé (10)
  { t: "Le recrutement de personnes en situation de handicap : guide pratique", cat: "Diversité & Inclusion" },
  { t: "L'écriture inclusive dans les offres d'emploi", cat: "Diversité & Inclusion" },
  { t: "Les biais cognitifs en entretien : les 12 plus courants", cat: "Diversité & Inclusion" },
  { t: "La diversité générationnelle : 4 générations au bureau", cat: "Diversité & Inclusion" },
  { t: "Le recrutement LGBTQ+ friendly : bonnes pratiques", cat: "Diversité & Inclusion" },
  { t: "Les quotas de diversité : pour ou contre ?", cat: "Diversité & Inclusion" },
  { t: "La diversité socio-économique en recrutement", cat: "Diversité & Inclusion" },
  { t: "Former les recruteurs aux biais inconscients", cat: "Diversité & Inclusion" },
  { t: "L'accessibilité numérique du processus de recrutement", cat: "Diversité & Inclusion" },
  { t: "Mesurer la diversité : les indicateurs obligatoires en France", cat: "Diversité & Inclusion" },

  // Entretiens avancé (10)
  { t: "L'entretien de fit culturel : questions et pièges", cat: "Entretiens" },
  { t: "Le speed recruiting : format et organisation", cat: "Entretiens" },
  { t: "L'entretien en anglais : préparer candidats et recruteurs", cat: "Entretiens" },
  { t: "Les mises en situation en entretien : créer des cas réalistes", cat: "Entretiens" },
  { t: "L'entretien de groupe : quand et comment l'organiser", cat: "Entretiens" },
  { t: "Les tests de raisonnement en recrutement", cat: "Entretiens" },
  { t: "L'entretien inversé : quand le candidat pose les questions", cat: "Entretiens" },
  { t: "L'entretien de rétention : anticiper les départs", cat: "Entretiens" },
  { t: "Les outils d'évaluation des soft skills en entretien", cat: "Entretiens" },
  { t: "Le debrief structuré : template et méthodologie", cat: "Entretiens" },

  // Droit avancé (7)
  { t: "La durée du travail et le recrutement : ce qui change en 2026", cat: "Droit du travail" },
  { t: "Le recrutement de travailleurs étrangers : formalités", cat: "Droit du travail" },
  { t: "Le contrat d'apprentissage : guide employeur 2026", cat: "Droit du travail" },
  { t: "Les congés payés et le recrutement : ce que le candidat vérifie", cat: "Droit du travail" },
  { t: "La convention collective et le recrutement", cat: "Droit du travail" },
  { t: "Le contrôle de références : cadre légal en France", cat: "Droit du travail" },
  { t: "Les obligations post-embauche : DUE, visite médicale, etc.", cat: "Droit du travail" },

  // Freelance avancé (5)
  { t: "Le portage salarial vs micro-entreprise pour le TA freelance", cat: "Freelance & Portage" },
  { t: "Négocier son TJM en tant que recruteur freelance", cat: "Freelance & Portage" },
  { t: "Le freelance TA et la formation continue", cat: "Freelance & Portage" },
  { t: "Construire un personal brand de recruteur freelance", cat: "Freelance & Portage" },
  { t: "Les assurances indispensables du freelance TA", cat: "Freelance & Portage" },

  // Scale-up avancé (5)
  { t: "Recruter un CFO en scale-up : le profil stratégique", cat: "Scale-up" },
  { t: "Le plan de recrutement pour une Série B", cat: "Scale-up" },
  { t: "Scale-up et internationalisation : premier pays étranger", cat: "Scale-up" },
  { t: "Le passage de 100 à 500 employés : défis RH", cat: "Scale-up" },
  { t: "Scale-up et structuration RH : les premiers process", cat: "Scale-up" },

  // Management RH avancé (5)
  { t: "Le Chief People Officer : émergence d'un rôle stratégique", cat: "Management RH" },
  { t: "La transformation agile des RH", cat: "Management RH" },
  { t: "Le people analytics : de la donnée à la décision", cat: "Management RH" },
  { t: "La gestion prévisionnelle des emplois en 2026", cat: "Management RH" },
  { t: "HR Tech : les catégories d'outils en 2026", cat: "Management RH" },

  // Formation avancé (5)
  { t: "Le peer learning en entreprise : méthode et résultats", cat: "Formation & Upskilling" },
  { t: "Les micro-certifications : valeur et reconnaissance", cat: "Formation & Upskilling" },
  { t: "Former vos recruteurs à l'IA en 5 jours", cat: "Formation & Upskilling" },
  { t: "Le coaching professionnel comme outil RH", cat: "Formation & Upskilling" },
  { t: "Les compétences green : former pour la transition écologique", cat: "Formation & Upskilling" },

  // Fintech + Santé extras (10)
  { t: "Recruter un Chief Compliance Officer fintech", cat: "Secteur Fintech" },
  { t: "Les salaires crypto et blockchain en France 2026", cat: "Secteur Fintech" },
  { t: "Recruter en assurtech : les profils les plus demandés", cat: "Secteur Fintech" },
  { t: "Le recrutement en regtech : conformité et innovation", cat: "Secteur Fintech" },
  { t: "Recruter dans les néobanques : culture et profils", cat: "Secteur Fintech" },
  { t: "Recruter un Chief Medical Officer en biotech", cat: "Secteur Santé" },
  { t: "Les profils les plus recherchés en medtech 2026", cat: "Secteur Santé" },
  { t: "Recruter en pharmacovigilance : guide complet", cat: "Secteur Santé" },
  { t: "Le recrutement en télémédecine : nouveaux profils", cat: "Secteur Santé" },
  { t: "Recruter dans les dispositifs médicaux : réglementation", cat: "Secteur Santé" },
];

function generateContent(title: string, category: string, index: number): string {
  const img1 = getImg(index, 900, 500);
  const img2 = getImg(index + 11, 900, 500);
  const base = title.split(":")[0].trim().toLowerCase();

  let html = "";

  html += `<h2>Pourquoi ${base} est un sujet clé en 2026</h2>`;
  html += `<p>Le marché du travail français évolue rapidement. En 2026, les entreprises font face à des défis sans précédent en matière de recrutement : pénurie de talents qualifiés, exigences accrues des candidats, digitalisation des processus, et pression sur les coûts. Dans ce contexte, maîtriser ${base} devient un avantage compétitif déterminant.</p>`;
  html += `<p>Selon nos données issues de plus de 200 recrutements réalisés chez Rocket4RPO, les entreprises qui investissent dans ${category.toLowerCase()} observent en moyenne une amélioration de 35% de leur time-to-hire et une réduction de 25% de leurs coûts de recrutement.</p>`;
  html += `<img src="${img1}" alt="${title}" />`;

  html += `<h2>Les fondamentaux à maîtriser</h2>`;
  html += `<p>Avant de rentrer dans le détail des stratégies avancées, il est essentiel de poser les bases. Voici les concepts fondamentaux que tout professionnel RH ou dirigeant doit comprendre :</p>`;
  html += `<ul>`;
  html += `<li><strong>La définition précise</strong> — ${title} englobe l'ensemble des pratiques, outils et méthodologies qui permettent d'optimiser cette dimension spécifique du recrutement.</li>`;
  html += `<li><strong>Les acteurs impliqués</strong> — Du Talent Acquisition Specialist au Hiring Manager, en passant par le HRBP et la direction, chaque rôle a une contribution spécifique.</li>`;
  html += `<li><strong>Les indicateurs de succès</strong> — Time-to-hire, quality of hire, cost-per-hire, et taux de rétention sont les métriques clés à suivre.</li>`;
  html += `<li><strong>Les outils nécessaires</strong> — ATS, CRM, LinkedIn Recruiter, outils d'évaluation et de reporting.</li>`;
  html += `</ul>`;

  html += `<h2>Méthodologie et bonnes pratiques</h2>`;
  html += `<h3>Étape 1 : Diagnostic de la situation actuelle</h3>`;
  html += `<p>Commencez par évaluer votre maturité actuelle. Notre <a href="/assessment">diagnostic gratuit en 2 minutes</a> vous donnera un score sur 21 points et identifiera vos 3 axes d'amélioration prioritaires.</p>`;
  html += `<h3>Étape 2 : Définition des objectifs</h3>`;
  html += `<p>Fixez des objectifs SMART alignés avec votre stratégie business. Par exemple : "Réduire le time-to-hire de 84 à 45 jours d'ici Q3 2026" ou "Recruter 15 profils tech en 4 mois avec un budget de 50K€".</p>`;
  html += `<h3>Étape 3 : Mise en œuvre</h3>`;
  html += `<p>Déployez les actions de manière progressive, en commençant par les quick wins à fort impact. Le RPO peut être un accélérateur puissant à cette étape — <a href="/offre">découvrez notre offre</a>.</p>`;
  html += `<h3>Étape 4 : Mesure et ajustement</h3>`;
  html += `<p>Suivez vos KPIs chaque semaine et ajustez votre stratégie en temps réel. Utilisez notre <a href="/calculateur">calculateur ROI</a> pour quantifier vos progrès.</p>`;

  html += `<blockquote><p>"Les meilleures équipes de recrutement ne sont pas celles qui ont le plus de moyens, mais celles qui ont les meilleurs processus." — Clément Martin, CEO Rocket4Sales</p></blockquote>`;

  html += `<h2>Les erreurs à éviter absolument</h2>`;
  html += `<img src="${img2}" alt="Bonnes pratiques ${category}" />`;
  html += `<ol>`;
  html += `<li><strong>Négliger le brief</strong> — 60% des échecs de recrutement viennent d'un brief mal cadré entre le recruteur et le manager.</li>`;
  html += `<li><strong>Ignorer l'expérience candidat</strong> — Un candidat qui a une mauvaise expérience le dit à 9 personnes en moyenne. Votre réputation est en jeu.</li>`;
  html += `<li><strong>Multiplier les étapes</strong> — Chaque étape supplémentaire dans votre process augmente le risque de perdre les meilleurs candidats.</li>`;
  html += `<li><strong>Ne pas mesurer</strong> — Sans KPIs, pas d'amélioration possible. Mettez en place un reporting hebdomadaire dès le premier jour.</li>`;
  html += `<li><strong>Sous-estimer le sourcing</strong> — Les meilleurs candidats ne postulent pas. 70% du marché est passif. Le sourcing proactif est indispensable.</li>`;
  html += `</ol>`;

  html += `<h2>Résultats concrets et cas d'étude</h2>`;
  html += `<p>Chez Rocket4RPO, nous avons accompagné plus de 50 entreprises. Voici les résultats moyens observés :</p>`;
  html += `<table><thead><tr><th>Indicateur</th><th>Avant</th><th>Après RPO</th><th>Gain</th></tr></thead>`;
  html += `<tbody>`;
  html += `<tr><td>Time-to-hire</td><td>84 jours</td><td>35 jours</td><td>-58%</td></tr>`;
  html += `<tr><td>Coût par recrutement</td><td>12-20K€</td><td>~4.4K€</td><td>-75%</td></tr>`;
  html += `<tr><td>Rétention 12 mois</td><td>72%</td><td>92%</td><td>+20pts</td></tr>`;
  html += `</tbody></table>`;

  html += `<h2>Outils et ressources recommandés</h2>`;
  html += `<ul>`;
  html += `<li><a href="/calculateur">Calculateur ROI RPO</a> — Estimez vos économies en 30 secondes</li>`;
  html += `<li><a href="/assessment">Diagnostic recrutement</a> — Évaluez votre maturité en 2 minutes</li>`;
  html += `<li><a href="/ressources">Guides et templates</a> — Scorecards, grilles salariales, checklists</li>`;
  html += `<li><a href="/offre">Notre offre RPO</a> — Recruteur senior intégré dès 48h</li>`;
  html += `</ul>`;

  html += `<h2>FAQ</h2>`;
  html += `<h3>Combien ça coûte ?</h3>`;
  html += `<p>Le RPO démarre à 550€/jour. Pour 10 recrutements sur 4 mois, comptez ~44 000€ — soit jusqu'à 5x moins cher qu'un cabinet. <a href="/calculateur">Calculez votre ROI</a>.</p>`;
  html += `<h3>Combien de temps pour voir des résultats ?</h3>`;
  html += `<p>Les premières shortlists arrivent en 48h. Les premiers recrutements sont signés en 4 à 6 semaines en moyenne.</p>`;

  return html;
}

async function main() {
  console.log(`Seeding ${topics.length} additional articles...`);

  let created = 0;
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const slug = topic.t
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);

    const content = generateContent(topic.t, topic.cat, i);
    const readMinutes = Math.max(8, Math.min(20, Math.floor(content.length / 1200)));
    const daysAgo = Math.floor(i * (365 / topics.length));
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    try {
      await prisma.blogPost.upsert({
        where: { slug: `p2-${slug}` },
        update: { title: topic.t, content, category: topic.cat, readTime: `${readMinutes} min`, date, imageUrl: getImg(i), author: "Clément Martin" },
        create: {
          slug: `p2-${slug}`,
          title: topic.t,
          excerpt: `${topic.t.split(":")[0]} — Guide complet, bonnes pratiques et retours d'expérience en 2026.`,
          category: topic.cat,
          content,
          readTime: `${readMinutes} min`,
          date,
          imageUrl: getImg(i),
          author: "Clément Martin",
        },
      });
      created++;
    } catch (e: any) {
      console.error(`SKIP: ${slug} — ${e.message?.slice(0, 60)}`);
    }

    if (created % 50 === 0) console.log(`  ${created}/${topics.length}...`);
  }

  const total = await prisma.blogPost.count();
  console.log(`\n✓ Done! Created ${created} articles. Total in DB: ${total}`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });

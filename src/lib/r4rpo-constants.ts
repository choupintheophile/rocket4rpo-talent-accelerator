// R4RPO v16 — 15 universal criteria, preset tags, interview questions
// v16 : refonte du moteur autoScore — bugs fixés + matching tolérant + extraction identité
//        + forces conditionnelles + score de confiance + debug matches + export texte

export const CRITERIA = [
  {
    name: "Sourcing & identification",
    desc: "Approche directe ≥10/sem, booléen avancé, multicanal (LinkedIn + Github + cooptation), automatisation",
  },
  {
    name: "Qualification candidat",
    desc: "Grille de scorecard structurée, mise en situation, calibration brief HM, évaluation soft + hard skills",
  },
  {
    name: "Spécialisation sectorielle",
    desc: "Connaît les codes du secteur (SaaS/Fintech/HealthTech/Deeptech), comprend les jobs sans formation",
  },
  {
    name: "International",
    desc: "Anglais opérationnel C1+, chasse cross-border (UK/DACH/Nordics/US), gestion fuseaux horaires",
  },
  {
    name: "Structure de chasse",
    desc: "Plan de chasse documenté A→Z, KPIs intermédiaires (taux retour, conversion), process réplicable",
  },
  {
    name: "Outils & stack",
    desc: "Maîtrise ATS (Greenhouse/Lever/Welcome), Sales Nav avancé, automation (Lemlist/LGM/Phantom), config autonome",
  },
  {
    name: "Connaissance marché",
    desc: "Top boîtes du secteur (top 20), salaires/grilles à jour, veille active, réseau direct activable",
  },
  {
    name: "Autonomie & ownership",
    desc: "Pushback HM si brief flou, décisions seul sans validation, refuse missions hors cible, drive son pipe",
  },
  {
    name: "Pilotage & KPIs",
    desc: "TTF cible, taux d'acceptation > 85%, ratio CV/closing, reporting hebdo data-driven, dashboard maintenu",
  },
  {
    name: "Closing & négo",
    desc: "Gestion contre-offres, négo package, posture conseil HM, traitement objections, clôture sous 7j",
  },
  {
    name: "Expérience RPO/embedded",
    desc: "≥1 mission embedded chez client, comprend différence cabinet/RPO, plug & play en 5 jours, immersion",
  },
  {
    name: "Storytelling & exemples",
    desc: "STAR (Situation/Tâche/Action/Résultat) sur 3+ recrutements, chiffres précis, du brief au closing",
  },
  {
    name: "Disponibilité & flexibilité",
    desc: "Démarrage ≤ 2 sem, 3-5 j/sem, ajustement scope en cours de mission, présence onsite ponctuelle OK",
  },
  {
    name: "Type de profils recrutés",
    desc: "Sales US/EMEA, Tech (back/front/data), Product, C-level, Mid → Sr → Executive, B2B SaaS prioritaire",
  },
  {
    name: "Fit culturel R4RPO",
    desc: "Énergie haute, posture premium, exigence qualité, transparence, ambition long terme, drive entrepreneur",
  },
] as const;

export const NB_CRIT = CRITERIA.length;

export const FORCE_PRESETS = [
  "Sourcing proactif fort",
  "Chiffres précis spontanés",
  "Autonomie démontrée",
  "Closing efficace",
  "Fit RPO évident",
] as const;

export const RISK_PRESETS = [
  "Manque de chiffres",
  "Peu autonome",
  "Pas de fit RPO",
  "Communication floue",
  "Outils mal maîtrisés",
] as const;

/* ═══════════════════════════════════════════════════════════════════════
   v17 — Taxonomies multi-select (cases à cocher)
   Présets organisés par groupes pour faciliter le scoring qualitatif
   ═══════════════════════════════════════════════════════════════════════ */

/** Type de profils que le candidat a déjà recrutés (multi-select, flat, haut niveau) */
export const PROFILE_TYPES_PRESETS = [
  "Sales",
  "Tech",
  "Data & ML",
  "Product & Design",
  "Marketing",
  "Customer Success",
  "Ops / RevOps",
  "Finance",
  "Direction / C-level",
  "International",
] as const;

/** Type de boîte pour laquelle il a travaillé (multi-select, flat, haut niveau) */
export const COMPANY_TYPES_PRESETS = [
  "Startup (<50p)",
  "Scale-up (50-300p)",
  "Licorne / 300+p",
  "ETI / Grand groupe",
  "SaaS / Tech produit",
  "Services / Conseil / ESN",
  "RPO / Recrutement",
] as const;

/** Style / personnalité du recruteur (multi-select, flat, haut niveau) */
export const PROFILE_STYLE_PRESETS = [
  "Sharp",
  "Hunter",
  "Farmer",
  "Structuré",
  "Hands-on",
  "Premium / Senior",
] as const;

/** Type d'intelligence dominante (multi-select, flat, haut niveau) */
export const INTELLIGENCE_TYPES_PRESETS = [
  "Analytique",
  "Émotionnelle",
  "Stratégique",
  "Relationnelle",
  "Opérationnelle",
] as const;

export const SCORE_COLORS = ["#EF9A9A", "#FFD54F", "#AED581", "#66BB6A", "#124944"] as const;

export interface QuestionCategory {
  title: string;
  questions: { q: string; star?: boolean }[];
  signalOk: string;
  signalKo: string;
}

export const QUESTIONS: QuestionCategory[] = [
  // ── 1. Sourcing & identification ──
  {
    title: "Sourcing & identification",
    questions: [
      { q: "Comment tu identifies un profil senior qui n'est pas en recherche active ? Méthode step by step.", star: true },
      { q: "En dehors de LinkedIn, tu sources où ?", star: true },
      { q: "Donne-moi une recherche booléenne pour un profil tech senior. On regarde ta logique." },
      { q: "Combien de messages d'approche tu envoies par semaine ? Quel taux de retour ?" },
      { q: "Tu sais identifier via automatisation ? Quelle volumétrie ? Donne-moi des chiffres précis." },
    ],
    signalOk: "Méthode décrite étape par étape, multicanal, booléen maîtrisé, volume quantifié.",
    signalKo: "Je poste une annonce — pas de méthode proactive, pas de chiffres.",
  },
  // ── 2. Qualification candidat ──
  {
    title: "Qualification candidat",
    questions: [
      { q: "Comment tu évalues un profil senior sans être expert de son domaine ?", star: true },
      { q: "Quelles questions tu poses au hiring manager pour calibrer le niveau attendu ?", star: true },
      { q: "Un candidat te dit qu'il est expert sur un sujet. Comment tu vérifies sans être technique ?" },
      { q: "Qualification IT, SalesOps, Sales — comment tu adaptes ton approche ? Sales = 70% des jobs.", star: true },
    ],
    signalOk: "Grille de questions, sourcing secondaire, validation croisée avec manager.",
    signalKo: "Je fais confiance au CV — délègue entièrement, pas de grille propre.",
  },
  // ── 3. Spécialisation sectorielle ──
  {
    title: "Spécialisation sectorielle",
    questions: [
      { q: "T'es plutôt spécialisé ESN, HR Tech, Fintech, HealthTech ou autre ? Pourquoi ?", star: true },
      { q: "Quelles sont les différences de recrutement entre ESN et SaaS ? Donne des exemples concrets.", star: true },
      { q: "Comment tu te prépares avant un meeting avec un client dans un secteur que tu connais moins ?" },
      { q: "Quelles infos tu choppes sur LinkedIn avant le premier échange avec un candidat ?", star: true },
    ],
    signalOk: "Secteur maîtrisé, différences ESN/SaaS claires, préparation LinkedIn systématique.",
    signalKo: "Je fais tout, pas de spécialisation, pas de préparation secteur.",
  },
  // ── 4. International ──
  {
    title: "International",
    questions: [
      { q: "Tu as déjà fait de la chasse internationale ? Quels marchés ? Quels résultats ?", star: true },
      { q: "Quelles langues tu parles ? À quel niveau opérationnel ?", star: true },
      { q: "Comment tu adaptes ton approche pour un candidat basé à l'étranger vs en France ?" },
      { q: "Tu as des exemples de recrutements cross-border réussis ?" },
    ],
    signalOk: "Expérience multi-pays, langues opérationnelles, méthode adaptée.",
    signalKo: "Jamais recruté hors de France, une seule langue, pas d'intérêt.",
  },
  // ── 5. Structure de chasse ──
  {
    title: "Structure de chasse",
    questions: [
      { q: "Comment tu structures ta chasse candidat de A à Z ? Décris ton process complet.", star: true },
      { q: "Structuration process : t'es plutôt suiveur ou tu prends des décisions ? Donne un exemple.", star: true },
      { q: "Comment tu gères un pipe de 50+ candidats en parallèle sans rien laisser tomber ?" },
      { q: "Ton process est-il réplicable d'une mission à l'autre ? Comment tu l'adaptes ?" },
    ],
    signalOk: "Process décrit étape par étape, réplicable, structuré, décisions assumées.",
    signalKo: "Pas de méthode, au feeling, suit les instructions sans initiative.",
  },
  // ── 6. Outils & stack ──
  {
    title: "Outils & stack",
    questions: [
      { q: "Décris ta stack complète. Tu as configuré toi-même les outils ou tu les utilises juste ?", star: true },
      { q: "Qu'est-ce que tu as automatisé dans ton sourcing ? Quel gain concret ?", star: true },
      { q: "Quel CRM tu utilises ? Sales Navigator ? Comment exactement ?" },
      { q: "Comment tu utilises Sales Navigator ou LI Recruiter spécifiquement ?" },
    ],
    signalOk: "Stack précise, configuration autonome, gains quantifiés, usage avancé.",
    signalKo: "J'utilise LinkedIn — n'a jamais configuré, pas de gains mesurés.",
  },
  // ── 7. Connaissance marché ──
  {
    title: "Connaissance marché",
    questions: [
      { q: "Cite-moi les top boîtes / leaders du marché dans ton secteur. Crédibilité directe.", star: true },
      { q: "Quels sont les salaires moyens sur les postes que tu recrutes ? Fourchettes précises.", star: true },
      { q: "Comment tu te tiens informé des tendances marché et des mouvements de postes ?" },
      { q: "Un client te demande un benchmark salarial. Tu fais comment ?" },
    ],
    signalOk: "Noms de boîtes spontanés, fourchettes salariales précises, veille active.",
    signalKo: "Connaissance vague, pas de noms, pas de chiffres marché.",
  },
  // ── 8. Autonomie & ownership ──
  {
    title: "Autonomie & ownership",
    questions: [
      { q: "Donne-moi une décision prise seul sur un recrutement, contre l'avis du client. Qu'est-ce qui s'est passé ?", star: true },
      { q: "Tu as refusé de présenter un candidat malgré la pression. Raconte.", star: true },
      { q: "Day 1 en mission RPO sans process TA. Tu fais quoi en priorité ?" },
    ],
    signalOk: "Exemples précis, narration assumée, décisions défendues avec conviction.",
    signalKo: "Je fais ce que le client demande — aucun exemple, évite la question.",
  },
  // ── 9. Pilotage & KPIs ──
  {
    title: "Pilotage & KPIs",
    questions: [
      { q: "Sur tes 12 derniers mois : combien de postes closés ? TTF moyen ? Taux d'acceptation ? Chiffres exacts.", star: true },
      { q: "Quel est ton ratio approches / présentations client ?", star: true },
      { q: "Comment tu suis et présentes tes KPIs à ton client RPO ?" },
    ],
    signalOk: "Chiffres précis spontanés, TTF/TTH/taux nommés, cohérents entre eux.",
    signalKo: "Ça dépend, environ — absence de chiffres = signal rouge.",
  },
  // ── 10. Closing & négo ──
  {
    title: "Closing & négo",
    questions: [
      { q: "Un hiring manager te donne un brief irréaliste. Tu fais quoi ?", star: true },
      { q: "Raconte ton meilleur closing difficile : candidat hésitant, contre-offre employeur.", star: true },
      { q: "Comment tu pitches un poste peu attractif à un candidat senior qui a 3 offres ?" },
      { q: "Comment tu gères 3 hiring managers avec des styles de décision très différents ?" },
    ],
    signalOk: "Push-back structuré, techniques de closing explicites, négo offre maîtrisée.",
    signalKo: "Accepte tout sans challenge, pas de technique de closing, subit la contre-offre.",
  },
  // ── 11. Expérience RPO/embedded ──
  {
    title: "Expérience RPO/embedded",
    questions: [
      { q: "Différence concrète entre RPO et cabinet de recrutement. Qu'est-ce qui t'attire dans le RPO ?", star: true },
      { q: "Tu démarres une mission RPO lundi : qu'est-ce que tu fais les 3 premiers jours ?", star: true },
      { q: "Comment tu gères la pression d'un HM qui veut 5 profils en 3 semaines avec un brief vague ?" },
    ],
    signalOk: "Comprend la différence, plan J1 concret, gestion autonome de la pression.",
    signalKo: "Confond RPO et cabinet, attend un cadrage, dépendance hiérarchique.",
  },
  // ── 12. Storytelling & exemples ──
  {
    title: "Storytelling & exemples",
    questions: [
      { q: "Raconte-moi ton meilleur recrutement. Du brief au closing, step by step.", star: true },
      { q: "Quel cycle de vente et panier moyen dans les boîtes où tu as bossé ?", star: true },
      { q: "Donne-moi un exemple de recrutement raté. Qu'est-ce que tu as appris ?" },
      { q: "Comment tu convaincs un candidat passif de bouger ? Ton pitch type." },
    ],
    signalOk: "Narration fluide, chiffres intégrés, leçons tirées des échecs.",
    signalKo: "Pas d'exemple concret, reste vague, pas de chiffres dans l'histoire.",
  },
  // ── 13. Disponibilité & flexibilité ──
  {
    title: "Disponibilité & flexibilité",
    questions: [
      { q: "Dispo actuelle pour bosser ? Combien de jours par semaine ?", star: true },
      { q: "TJM ou CDI ou CDD ? Quelle est ta préférence et pourquoi ?", star: true },
      { q: "Localisation + télétravail : comment tu fonctionnes ?" },
      { q: "Tu peux démarrer quand ? Délai de prévenance actuel ?" },
    ],
    signalOk: "Dispo claire, flexible sur le format, délai court, transparent.",
    signalKo: "Pas dispo avant 3 mois, rigide sur le format, flou sur les dates.",
  },
  // ── 14. Type de profils recrutés ──
  {
    title: "Type de profils recrutés",
    questions: [
      { q: "Dans quel type de boîte tu as bossé ? Plutôt tech US / Sales / autre ?", star: true },
      { q: "Quel cycle de vente + panier moyen dans les boîtes où tu as recruté ?", star: true },
      { q: "Tu recrutes plutôt des profils tech, sales, ops ? Répartition ?" },
      { q: "Comment tu adaptes ta qualification pour un profil Sales vs un profil DevOps ?" },
    ],
    signalOk: "Profils variés, compréhension du cycle de vente, adaptation par type.",
    signalKo: "Un seul type de profil, pas de compréhension business, pas d'adaptation.",
  },
  // ── 15. Fit culturel R4RPO ──
  {
    title: "Fit culturel R4RPO",
    questions: [
      { q: "Qu'est-ce qui te motive dans le recrutement ? Pourquoi tu fais ce métier ?", star: true },
      { q: "C'est quoi pour toi un recruteur top 1% ? Comment tu te positionnes ?", star: true },
      { q: "Structuration process : pas de suiveur, des motivés qui prennent des décisions. Donne un exemple.", star: true },
      { q: "Comment tu réagis quand un client te met la pression sur un délai impossible ?" },
    ],
    signalOk: "Motivé, structuré, prend des initiatives, posture premium, énergie positive.",
    signalKo: "Passif, attend les consignes, pas de vision, motivation floue.",
  },
];

// Verdict calculation
export type VerdictLevel = "top" | "mid" | "low" | "nc";

export interface VerdictInfo {
  level: VerdictLevel;
  label: string;
  description: string;
}

export function getVerdict(pct: number, filled: number): VerdictInfo {
  if (filled < 5) return { level: "nc", label: "Incomplet", description: "" };
  if (pct >= 80) return { level: "top", label: "Prioritaire", description: "Profil opérationnel — niveau haut de gamme R4RPO" };
  if (pct >= 60) return { level: "mid", label: "Secondaire", description: "Potentiel présent — recontacter sur mission précise" };
  return { level: "low", label: "Non retenu", description: "Insuffisant pour le positionnement Rocket4RPO" };
}

export function calcScore(scores: Record<string, number> | null): { total: number; max: number; filled: number; pct: number } {
  if (!scores) return { total: 0, max: 0, filled: 0, pct: 0 };
  let total = 0;
  let filled = 0;
  for (let i = 0; i < NB_CRIT; i++) {
    const s = scores[`c${i}`] || 0;
    total += s;
    if (s > 0) filled++;
  }
  const max = filled * 5;
  return { total, max, filled, pct: max > 0 ? Math.round((total / max) * 100) : 0 };
}

export function initials(prenom: string, nom: string): string {
  return ((prenom?.[0] || "").toUpperCase() + (nom?.[0] || "").toUpperCase()) || "?";
}

/* ═══════════════════════════════════════════════════════════════════════
   AUTO-SCORING ENGINE v16 — keyword matching avec tolérance + extraction
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Normalise un texte pour un matching tolérant :
 * - lowercase
 * - enlève les accents (à → a, é → e, etc.)
 * - supprime le "s" final des mots de 4+ caractères (stemming minimal)
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/\b(\w{4,})s\b/g, "$1"); // pluriels simples
}

const SCORING_KEYWORDS: { keywords: string[] }[][] = [
  // c0: Sourcing & identification (3 groupes)
  [
    { keywords: ["sourcing", "approche directe", "chasse", "booleen", "linkedin recruiter", "multicanal", "vivier", "inmail", "approche proactive"] },
    { keywords: ["volume", "taux de retour", "messages par semaine", "pipe", "pipeline sourcing"] },
    { keywords: ["github", "stackoverflow", "meetup", "cooptation", "reseau"] },
  ],
  // c1: Qualification candidat (3 groupes)
  [
    { keywords: ["qualification", "grille", "scorecard", "evaluer", "calibr", "entretien structure", "fit culturel", "soft skill"] },
    { keywords: ["technique", "test technique", "case study", "mise en situation"] },
    { keywords: ["hiring manager", "brief", "calibration", "profil ideal"] },
  ],
  // c2: Spécialisation sectorielle (3 groupes)
  [
    { keywords: ["saas", "esn", "fintech", "healthtech", "hr tech", "biotech", "edtech", "cybersecurite"] },
    { keywords: ["secteur", "industrie", "vertical", "marche", "specialise", "expertise sectorielle"] },
    { keywords: ["startup", "scale-up", "scale up", "grand compte", "pme", "licorne"] },
  ],
  // c3: International (3 groupes — AJOUT du 3e groupe pour fix Bug 2)
  [
    { keywords: ["international", "anglais", "bilingue", "multilingue", "cross-border", "cross border", "europe", "remote international"] },
    { keywords: ["langue", "espagnol", "allemand", "italien", "portugais", "marche etranger", "recrutement international"] },
    { keywords: ["pays nordique", "dach", "benelux", "expansion geographique", "relocation", "us", "uk", "usa", "etats-unis", "royaume-uni"] },
  ],
  // c4: Structure de chasse (3 groupes)
  [
    { keywords: ["process", "methodologie", "structure", "etape", "workflow", "process de chasse", "plan de chasse"] },
    { keywords: ["replicable", "scalable", "template", "playbook", "systeme"] },
    { keywords: ["autonome", "organise", "rigueur", "planification", "priorisation"] },
  ],
  // c5: Outils & stack (3 groupes)
  [
    { keywords: ["ats", "crm", "sales navigator", "linkedin recruiter", "salesforce", "hubspot", "lever", "greenhouse", "workable"] },
    { keywords: ["automatisation", "zapier", "make", "lemlist", "la growth machine", "phantom", "waalaxy"] },
    { keywords: ["configure", "parametre", "maitrise", "stack", "outil"] },
  ],
  // c6: Connaissance marché (3 groupes)
  [
    { keywords: ["marche", "benchmark", "salaire", "remuneration", "fourchette", "grille salariale"] },
    { keywords: ["leader", "top boite", "concurrence", "tendance", "veille"] },
    { keywords: ["credible", "connaissance", "reseau sectoriel", "ecosysteme"] },
  ],
  // c7: Autonomie & ownership (3 groupes)
  [
    { keywords: ["autonome", "decision", "initiative", "ownership", "proactif", "sans supervision"] },
    { keywords: ["pushback", "challenger", "refuse", "assume", "conviction"] },
    { keywords: ["responsable", "prise de decision", "seul", "independant"] },
  ],
  // c8: Pilotage & KPIs (3 groupes)
  [
    { keywords: ["kpi", "reporting", "ttf", "time to fill", "time to hire", "taux de conversion", "pipe", "dashboard"] },
    { keywords: ["chiffre", "metrique", "data", "suivi", "sla", "objectif"] },
    { keywords: ["poste close", "recrutement realise", "ratio", "taux d'acceptation", "volume"] },
  ],
  // c9: Closing & négo (3 groupes)
  [
    { keywords: ["closing", "negociation", "offre", "contre-offre", "contre offre", "package", "remuneration"] },
    { keywords: ["convaincre", "pitch", "vendre", "closer", "signer", "acceptation"] },
    { keywords: ["conseil", "accompagn", "hiring manager", "aide a la decision"] },
  ],
  // c10: Expérience RPO/embedded (3 groupes)
  [
    { keywords: ["rpo", "embedded", "integre chez", "chez le client", "mission externalisee", "externalise"] },
    { keywords: ["cabinet", "freelance", "difference", "modele rpo", "plug and play", "plug & play"] },
    { keywords: ["jour 1", "j1", "demarrage", "onboarding client", "immersion"] },
  ],
  // c11: Storytelling & exemples (3 groupes)
  [
    { keywords: ["exemple", "raconte", "histoire", "anecdote", "cas concret", "meilleur recrutement"] },
    { keywords: ["etape par etape", "step by step", "du brief au closing", "succe"] },
    { keywords: ["echec", "appris", "lecon", "erreur", "experience marquante"] },
  ],
  // c12: Disponibilité & flexibilité (3 groupes)
  [
    { keywords: ["disponible", "immediat", "des maintenant", "libre", "dispo"] },
    { keywords: ["jours par semaine", "temps partiel", "temps plein", "flexible", "adaptable"] },
    { keywords: ["demarrage rapide", "preavis", "1 semaine", "sous 15 jour"] },
  ],
  // c13: Type de profils recrutés (3 groupes)
  [
    { keywords: ["sales", "tech", "dev", "product", "marketing", "ops", "sdr", "account executive", "csm"] },
    { keywords: ["cycle de vente", "panier moyen", "b2b", "b2c", "enterprise", "mid-market", "smb"] },
    { keywords: ["profil senior", "management", "c-level", "head of", "vp", "directeur"] },
  ],
  // c14: Fit culturel R4RPO (3 groupes)
  [
    { keywords: ["motive", "energie", "passionne", "engage", "drive", "ambition"] },
    { keywords: ["premium", "exigent", "qualite", "excellence", "top", "haut niveau"] },
    { keywords: ["structure", "organise", "professionnel", "fiable", "transparent"] },
  ],
];

export interface AutoScoreDetails {
  scores: Record<string, number>;
  forces: string[];
  risks: string[];
  /** Mots-clés matchés par critère (index c0..c14) — pour panneau debug */
  matchedKeywords: Record<string, { matched: string[]; missing: string[] }>;
  /** Champs identité extraits du texte */
  identity: {
    email?: string;
    phone?: string;
    linkedin?: string;
    tjm?: string;
    loc?: string;
    prenom?: string;
    nom?: string;
  };
  /** Score de confiance 0-100 basé sur la longueur du texte */
  confidence: number;
  /** Niveau de confiance lisible */
  confidenceLevel: "faible" | "moyenne" | "haute";
  /** Nombre de mots du texte analysé */
  wordCount: number;
}

export interface AutoScoreOptions {
  /** Si true, le critère "International" (c3) est considéré optionnel (profils France-only) */
  skipInternational?: boolean;
}

/**
 * Extrait les champs identité (email, téléphone, LinkedIn, TJM, localisation, prénom/nom)
 */
function extractIdentity(text: string): AutoScoreDetails["identity"] {
  const out: AutoScoreDetails["identity"] = {};

  // Email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) out.email = emailMatch[0].trim();

  // Téléphone (FR — 0X XX XX XX XX, +33 X XX XX XX XX)
  const phoneMatch = text.match(/(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}/);
  if (phoneMatch) out.phone = phoneMatch[0].replace(/\s+/g, " ").trim();

  // LinkedIn (lien complet ou slug)
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w\-À-ÿ]+\/?/i);
  if (linkedinMatch) out.linkedin = linkedinMatch[0].trim();

  // TJM (500€/j, 650 € / jour, 700/j, 800 EUR jour, etc.)
  const tjmMatch = text.match(/(\d{3,4})\s*(?:€|eur|euros?)?\s*[/\\-]?\s*j(?:our|\b)/i);
  if (tjmMatch) out.tjm = `${tjmMatch[1]} €/j`;

  // Localisation (villes françaises principales)
  const villes = [
    "Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Lille", "Nice",
    "Strasbourg", "Rennes", "Montpellier", "Grenoble", "Aix-en-Provence", "Aix",
    "Dijon", "Angers", "Reims", "Le Havre", "Saint-Étienne", "Brest", "Clermont-Ferrand",
    "Tours", "Toulon", "Nancy", "Orléans", "Caen", "Besançon", "Perpignan", "Metz",
    "Nîmes", "Rouen", "Mulhouse", "Limoges", "Annecy", "Avignon", "Biarritz", "La Rochelle",
  ];
  for (const ville of villes) {
    const re = new RegExp(`\\b${ville.replace(/-/g, "[-\\s]")}\\b`, "i");
    if (re.test(text)) {
      out.loc = ville;
      break;
    }
  }

  // Prénom/Nom — formats : "Je m'appelle X Y" / "Prénom Nom —" / "Candidat : X Y"
  const nameMatch =
    text.match(/(?:je\s+m['']appelle|candidat\s*:?\s*|je\s+suis)\s+([A-ZÀ-ÿ][a-zà-ÿ]+)\s+([A-ZÀ-ÿ][A-Za-zà-ÿ\-]+)/) ||
    text.match(/^([A-ZÀ-ÿ][a-zà-ÿ]+)\s+([A-ZÀ-ÿ][A-Za-zà-ÿ\-]+)\s*[—\-|,]/m);
  if (nameMatch) {
    out.prenom = nameMatch[1];
    out.nom = nameMatch[2];
  }

  return out;
}

/**
 * Analyse un résumé d'entretien et retourne un scoring détaillé.
 * v16 : matching tolérant (accents, pluriels), extraction identité, forces
 * conditionnelles au score du critère, score de confiance, debug matches.
 */
export function autoScore(text: string, options: AutoScoreOptions = {}): AutoScoreDetails {
  const normalized = normalize(text);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const scores: Record<string, number> = {};
  const matchedKeywords: AutoScoreDetails["matchedKeywords"] = {};

  // Scoring par critère
  for (let i = 0; i < SCORING_KEYWORDS.length; i++) {
    // Skip International si option activée
    if (i === 3 && options.skipInternational) {
      matchedKeywords[`c${i}`] = { matched: [], missing: [] };
      continue;
    }

    const groups = SCORING_KEYWORDS[i];
    let matchCount = 0;
    const matched: string[] = [];
    const missing: string[] = [];

    for (const group of groups) {
      const normalizedKws = group.keywords.map((kw) => normalize(kw));
      const found = group.keywords.find((_, idx) => normalized.includes(normalizedKws[idx]));
      if (found) {
        matchCount++;
        matched.push(found);
      } else {
        // Ajouter le premier mot-clé du groupe manquant comme référence
        missing.push(group.keywords[0]);
      }
    }

    matchedKeywords[`c${i}`] = { matched, missing };

    // Convert match ratio to 0-5 score
    // Fix Bug 1 (score 2 mort) : supprimé — on saute directement de 1 à 3
    // Fix Bug 4 : on écrit TOUJOURS un score (0 inclus) pour éviter résidu React
    const ratio = matchCount / groups.length;
    let score: number;
    if (ratio >= 0.9) score = 5;
    else if (ratio >= 0.66) score = 4;
    else if (ratio >= 0.33) score = 3;
    else if (ratio > 0) score = 2;
    else score = 0;

    scores[`c${i}`] = score;
  }

  // Fix Bug 3 : Forces conditionnelles — liées au score du critère correspondant
  // Chaque force n'est déclenchée que si le critère lié a un score ≥ 4
  const detectedForces: string[] = [];
  // Tableau : [phrase_trigger_normalisée, label, critère_min_score ≥ 4]
  const forceTriggers: [string, string, number][] = [
    ["sourcing proactif", "Sourcing proactif fort", 0],
    ["chiffre precis", "Chiffres précis spontanés", 8],
    ["demontre son autonomie", "Autonomie démontrée", 7],
    ["closing reussi", "Closing efficace", 9],
    ["experience rpo", "Fit RPO évident", 10],
  ];

  for (const [trigger, label, critIdx] of forceTriggers) {
    const triggerNormalized = normalize(trigger);
    if (normalized.includes(triggerNormalized) && scores[`c${critIdx}`] >= 4) {
      detectedForces.push(label);
    }
  }

  // Fallback : si aucune force conditionnelle mais mots simples présents + score c14 ≥ 4
  if (detectedForces.length === 0) {
    if (normalized.includes(normalize("autonome")) && scores.c7 >= 4) {
      detectedForces.push("Autonomie démontrée");
    }
    if (normalized.includes("closing") && scores.c9 >= 4) {
      detectedForces.push("Closing efficace");
    }
  }

  // Risques : triggers plus spécifiques (phrases) pour éviter faux positifs
  const detectedRisks: string[] = [];
  const riskTriggers: [string, string][] = [
    ["pas de chiffre", "Manque de chiffres"],
    ["aucun chiffre", "Manque de chiffres"],
    ["communication floue", "Communication floue"],
    ["reponse vague", "Communication floue"],
    ["reste vague", "Communication floue"],
    ["peu autonome", "Peu autonome"],
    ["manque d'autonomie", "Peu autonome"],
    ["ne connait pas le rpo", "Pas de fit RPO"],
    ["pas fait de rpo", "Pas de fit RPO"],
    ["outil mal maitrise", "Outils mal maîtrisés"],
    ["stack mal maitrisee", "Outils mal maîtrisés"],
  ];

  const uniqueRisks = new Set<string>();
  for (const [trigger, label] of riskTriggers) {
    if (normalized.includes(normalize(trigger))) {
      uniqueRisks.add(label);
    }
  }
  detectedRisks.push(...uniqueRisks);

  // Extraction identité
  const identity = extractIdentity(text);

  // Score de confiance
  const confidence = Math.min(
    100,
    Math.round((wordCount / 250) * 100) // 250 mots = 100%
  );
  const confidenceLevel: "faible" | "moyenne" | "haute" =
    wordCount < 80 ? "faible" : wordCount < 200 ? "moyenne" : "haute";

  return {
    scores,
    forces: detectedForces,
    risks: detectedRisks,
    matchedKeywords,
    identity,
    confidence,
    confidenceLevel,
    wordCount,
  };
}

/**
 * Génère un résumé texte structuré du scoring pour export / copier-coller.
 */
export function exportScoringText(
  scores: Record<string, number>,
  forces: string[],
  risks: string[],
  identity: {
    prenom?: string;
    nom?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    loc?: string;
    tjm?: string;
  } = {}
): string {
  const sc = calcScore(scores);
  const verdict = getVerdict(sc.pct, sc.filled);

  const lines: string[] = [];

  // Header
  const fullName = [identity.prenom, identity.nom].filter(Boolean).join(" ");
  if (fullName) lines.push(`CANDIDAT : ${fullName}`);
  lines.push(`SCORE GLOBAL : ${sc.total}/${sc.max} (${sc.pct}%) — ${verdict.label}`);
  if (verdict.description) lines.push(`${verdict.description}`);
  lines.push("");

  // Identity
  const idLines: string[] = [];
  if (identity.email) idLines.push(`Email : ${identity.email}`);
  if (identity.phone) idLines.push(`Téléphone : ${identity.phone}`);
  if (identity.linkedin) idLines.push(`LinkedIn : ${identity.linkedin}`);
  if (identity.loc) idLines.push(`Localisation : ${identity.loc}`);
  if (identity.tjm) idLines.push(`TJM : ${identity.tjm}`);
  if (idLines.length > 0) {
    lines.push("━━━ IDENTITÉ ━━━");
    lines.push(...idLines);
    lines.push("");
  }

  // Scores par critère
  lines.push("━━━ SCORING DÉTAILLÉ ━━━");
  CRITERIA.forEach((crit, i) => {
    const score = scores[`c${i}`] || 0;
    if (score > 0) {
      const stars = "★".repeat(score) + "☆".repeat(5 - score);
      lines.push(`${crit.name.padEnd(32)} ${stars} (${score}/5)`);
    }
  });
  lines.push("");

  // Forces
  if (forces.length > 0) {
    lines.push("━━━ POINTS POSITIFS ━━━");
    forces.forEach((f) => lines.push(`✓ ${f}`));
    lines.push("");
  }

  // Risques
  if (risks.length > 0) {
    lines.push("━━━ ALERTES ━━━");
    risks.forEach((r) => lines.push(`⚠ ${r}`));
    lines.push("");
  }

  // Footer
  lines.push(
    `Généré par Rocket4RPO · ${new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`
  );

  return lines.join("\n");
}

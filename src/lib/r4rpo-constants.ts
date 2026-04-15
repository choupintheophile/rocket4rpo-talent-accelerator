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

/* ═══════════════════════════════════════════════════════════════════════
   v18 — Nouveaux presets pour l'entretien live
   ═══════════════════════════════════════════════════════════════════════ */

/** Types de motivation (multi-select) */
export const MOTIVATION_TYPES_PRESETS = [
  "Sharp / Brillant",
  "Hungry / Affamé",
  "Ambitieux",
  "Drivé par le challenge",
  "Drivé par l'impact",
  "Calme et posé",
] as const;

/** Types de sympathie (multi-select) */
export const SYMPATHY_TYPES_PRESETS = [
  "Chaleureux",
  "Bienveillant",
  "Direct / cash",
  "Enthousiaste",
  "Humble",
  "Charismatique",
] as const;

/** Niveaux (single-select) utilisés pour Intelligence / Motivation / Sympathie */
export const LEVEL_PRESETS = ["Faible", "Moyen", "Fort", "Exceptionnel"] as const;
export type Level = (typeof LEVEL_PRESETS)[number];

/** v19 — Langues principales proposées dans l'identité (multi-select avec niveau) */
export const LANGUAGES_PRESETS = [
  "Français",
  "Anglais",
  "Espagnol",
  "Allemand",
  "Italien",
  "Portugais",
  "Néerlandais",
  "Arabe",
  "Chinois",
  "Russe",
] as const;

/** v19 — Niveaux de langue CEFR-friendly */
export const LANGUAGE_LEVELS = [
  "Natif",
  "Bilingue",
  "Courant (C1-C2)",
  "Opérationnel (B2)",
  "Intermédiaire (B1)",
  "Notions",
] as const;
export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number];

export interface SpokenLanguage {
  lang: string;
  level: LanguageLevel | "";
}

/** Index des 8 critères visibles dans le scoring (ordre narratif du process RPO)
 *  Mapping vers CRITERIA (c0-c14) :
 *  c0  = Sourcing & identification  (étape 1 : trouver les profils)
 *  c1  = Qualification candidat      (étape 2 : les évaluer)
 *  c5  = Outils & stack              (avec quels outils)
 *  c7  = Autonomie & ownership       (savoir bosser seul)
 *  c8  = Pilotage & KPIs             (être data-driven)
 *  c9  = Closing & négo              (fin de process)
 *  c11 = Storytelling & exemples     (savoir démontrer)
 *  c10 = Expérience RPO/embedded     (fit final) */
export const SCORING_VISIBLE_ORDER = [0, 1, 5, 7, 8, 9, 11, 10] as const;

/** Chemin de qualification — étape 1 */
export const QUALIF_PROFILES = ["Généraliste", "Sales", "IT"] as const;

/** Chemin de qualification — étape 2 : niveau d'expertise (tous profils) */
export const QUALIF_LEVELS = ["Junior", "Mid (3-5 ans)", "Senior (6-10 ans)", "Expert (10+ ans)"] as const;

/** Chemin de qualification — étape 2 : types recrutés selon profil (multi-select) */
export const QUALIF_RECRUITED_TYPES: Record<(typeof QUALIF_PROFILES)[number], readonly string[]> = {
  "Généraliste": [
    "Finance / Comptabilité",
    "RH / People",
    "Marketing / Communication",
    "Direction / C-level",
    "Ops / Administratif",
    "Legal / Juridique",
    "Customer / CSM",
    "Product / Design",
    "Métiers support",
  ],
  "Sales": [
    "SDR / BDR",
    "Account Executive",
    "Account Manager",
    "Sales Manager",
    "VP Sales",
    "CRO",
    "Sales Engineer",
    "Pre-Sales / Solutions",
    "Customer Success",
    "Business Developer",
  ],
  "IT": [
    "Dev front",
    "Dev back",
    "Fullstack",
    "DevOps / SRE",
    "Data Engineer",
    "Data Scientist / ML",
    "Engineering Manager",
    "CTO / VP Eng",
    "Product Manager",
    "Product Designer",
    "Cybersécurité",
    "Mobile (iOS/Android)",
  ],
};

/** Chemin de qualification — étape 3 : précisions contextuelles (multi-select) */
export const QUALIF_CONTEXT_BY_PROFILE: Record<(typeof QUALIF_PROFILES)[number], {
  title: string;
  options: readonly string[];
}[]> = {
  "Généraliste": [
    {
      title: "Taille d'entreprise chassée",
      options: ["TPE / PME", "ETI", "Grand groupe", "Startup / Scale-up"],
    },
    {
      title: "Secteur dominant",
      options: ["Industrie", "Santé", "Finance / Banque", "Retail / Luxe", "Public / ONG", "BTP", "Services", "Autre"],
    },
    {
      title: "Séniorité moyenne",
      options: ["Junior", "Middle", "Senior", "Executive / C-level"],
    },
    {
      title: "International",
      options: ["France uniquement", "Europe", "Monde entier"],
    },
  ],
  "Sales": [
    {
      title: "Cycle de vente",
      options: ["Transactionnel (cycle court)", "Mid-market", "Enterprise (cycle long)"],
    },
    {
      title: "Taille de contrats",
      options: ["SMB (<50K ARR)", "Mid-market (50-500K ARR)", "Enterprise (500K+ ARR)"],
    },
    {
      title: "Modèle business des clients",
      options: ["SaaS B2B", "SaaS B2C", "Marketplace", "Services / ESN", "E-commerce", "Industrie"],
    },
    {
      title: "Géographie",
      options: ["France", "Europe (DACH/UK/Nordics)", "US / Amérique", "Monde entier"],
    },
  ],
  "IT": [
    {
      title: "Stack principale",
      options: ["JS / TS / React", "Python / Django / FastAPI", "Java / JVM", "Go / Rust", ".NET / C#", "Mobile natif", "Polyvalent"],
    },
    {
      title: "Domaine",
      options: ["Produit / Startup", "Infrastructure / Cloud", "Data / IA", "Cybersécurité", "Embedded / IoT", "Gaming / 3D"],
    },
    {
      title: "Environnement",
      options: ["Startup early", "Scale-up", "Grand groupe", "ESN / Consulting", "RPO / Embedded"],
    },
    {
      title: "International",
      options: ["France uniquement", "Europe", "US / Monde", "Full remote distribué"],
    },
  ],
};

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

/** Version anglaise de QUESTIONS — mêmes catégories, même structure, traduites.
 *  L'index correspond exactement à QUESTIONS (même ordre, mêmes star flags). */
export const QUESTIONS_EN: QuestionCategory[] = [
  // ── 1. Sourcing & identification ──
  {
    title: "Sourcing & identification",
    questions: [
      { q: "How do you identify a senior profile who isn't actively looking? Walk me through your method step by step.", star: true },
      { q: "Outside of LinkedIn, where do you source?", star: true },
      { q: "Give me a Boolean search for a senior tech profile. Let's see your logic." },
      { q: "How many outreach messages do you send per week? What's your reply rate?" },
      { q: "Do you use automation for sourcing? What volume? Give me exact numbers." },
    ],
    signalOk: "Method described step by step, multi-channel, Boolean mastered, volume quantified.",
    signalKo: "I post a job ad — no proactive method, no numbers.",
  },
  // ── 2. Candidate qualification ──
  {
    title: "Candidate qualification",
    questions: [
      { q: "How do you assess a senior profile without being an expert in their domain?", star: true },
      { q: "What questions do you ask the hiring manager to calibrate the expected level?", star: true },
      { q: "A candidate claims to be an expert on a topic. How do you verify without being technical?" },
      { q: "IT, SalesOps, Sales qualification — how do you adapt your approach? Sales = 70% of jobs.", star: true },
    ],
    signalOk: "Question framework, secondary sourcing, cross-validation with manager.",
    signalKo: "I trust the CV — fully delegates, no clean framework.",
  },
  // ── 3. Sector specialization ──
  {
    title: "Sector specialization",
    questions: [
      { q: "Are you more specialized in IT Services, HR Tech, Fintech, HealthTech or other? Why?", star: true },
      { q: "What are the recruitment differences between IT Services and SaaS? Give concrete examples.", star: true },
      { q: "How do you prepare before a meeting with a client in a sector you're less familiar with?" },
      { q: "What info do you grab from LinkedIn before the first exchange with a candidate?", star: true },
    ],
    signalOk: "Sector mastered, clear Services/SaaS differences, systematic LinkedIn preparation.",
    signalKo: "I do everything, no specialization, no sector prep.",
  },
  // ── 4. International ──
  {
    title: "International",
    questions: [
      { q: "Have you done international hunting? Which markets? What results?", star: true },
      { q: "What languages do you speak? At what operational level?", star: true },
      { q: "How do you adapt your approach for a candidate based abroad vs. in France?" },
      { q: "Do you have examples of successful cross-border hires?" },
    ],
    signalOk: "Multi-country experience, operational languages, adapted method.",
    signalKo: "Never recruited outside France, only one language, no interest.",
  },
  // ── 5. Hunting structure ──
  {
    title: "Hunting structure",
    questions: [
      { q: "How do you structure your candidate hunt A-to-Z? Describe your full process.", star: true },
      { q: "Process structuring: are you more of a follower or do you make decisions? Give an example.", star: true },
      { q: "How do you manage a pipe of 50+ candidates in parallel without dropping anyone?" },
      { q: "Is your process replicable from one mission to another? How do you adapt it?" },
    ],
    signalOk: "Process described step by step, replicable, structured, decisions owned.",
    signalKo: "No method, gut feeling, follows instructions without initiative.",
  },
  // ── 6. Tools & stack ──
  {
    title: "Tools & stack",
    questions: [
      { q: "Describe your full stack. Did you configure the tools yourself or just use them?", star: true },
      { q: "What have you automated in your sourcing? What concrete gain?", star: true },
      { q: "Which CRM do you use? Sales Navigator? How exactly?" },
      { q: "How specifically do you use Sales Navigator or LinkedIn Recruiter?" },
    ],
    signalOk: "Precise stack, autonomous configuration, quantified gains, advanced usage.",
    signalKo: "I use LinkedIn — never configured anything, no measured gains.",
  },
  // ── 7. Market knowledge ──
  {
    title: "Market knowledge",
    questions: [
      { q: "Name me the top companies / leaders in your sector. Immediate credibility.", star: true },
      { q: "What are the average salaries for the roles you recruit for? Precise ranges.", star: true },
      { q: "How do you stay informed about market trends and talent moves?" },
      { q: "A client asks you for a salary benchmark. How do you handle it?" },
    ],
    signalOk: "Company names spontaneously, precise salary ranges, active market watch.",
    signalKo: "Vague knowledge, no names, no market figures.",
  },
  // ── 8. Autonomy & ownership ──
  {
    title: "Autonomy & ownership",
    questions: [
      { q: "Give me a decision you made alone on a hire, against the client's view. What happened?", star: true },
      { q: "You refused to present a candidate despite the pressure. Tell me.", star: true },
      { q: "Day 1 on an RPO mission with no TA process in place. What do you prioritize?" },
    ],
    signalOk: "Precise examples, confident narration, decisions defended with conviction.",
    signalKo: "I do what the client asks — no examples, avoids the question.",
  },
  // ── 9. KPIs & reporting ──
  {
    title: "KPIs & reporting",
    questions: [
      { q: "Over your last 12 months: how many roles closed? Average TTF? Acceptance rate? Exact numbers.", star: true },
      { q: "What's your outreach-to-client-submission ratio?", star: true },
      { q: "How do you track and present your KPIs to your RPO client?" },
    ],
    signalOk: "Precise numbers spontaneously, TTF/TTH/rates named, consistent with each other.",
    signalKo: "It depends, around — absence of numbers = red flag.",
  },
  // ── 10. Closing & negotiation ──
  {
    title: "Closing & negotiation",
    questions: [
      { q: "A hiring manager gives you an unrealistic brief. What do you do?", star: true },
      { q: "Tell me about your best tough closing: hesitant candidate, employer counter-offer.", star: true },
      { q: "How do you pitch an unattractive role to a senior candidate who has 3 offers?" },
      { q: "How do you manage 3 hiring managers with very different decision styles?" },
    ],
    signalOk: "Structured push-back, explicit closing techniques, mastered offer negotiation.",
    signalKo: "Accepts everything without challenge, no closing technique, loses to counter-offers.",
  },
  // ── 11. RPO/embedded experience ──
  {
    title: "RPO/embedded experience",
    questions: [
      { q: "Concrete difference between RPO and a recruitment agency. What attracts you to RPO?", star: true },
      { q: "You start an RPO mission on Monday: what do you do in the first 3 days?", star: true },
      { q: "How do you handle pressure from an HM who wants 5 profiles in 3 weeks with a vague brief?" },
    ],
    signalOk: "Understands the difference, concrete Day-1 plan, autonomous pressure management.",
    signalKo: "Confuses RPO with agency, waits for framing, hierarchical dependency.",
  },
  // ── 12. Storytelling & examples ──
  {
    title: "Storytelling & examples",
    questions: [
      { q: "Tell me about your best hire. From brief to closing, step by step.", star: true },
      { q: "What sales cycle and average deal size in the companies where you worked?", star: true },
      { q: "Give me an example of a failed hire. What did you learn?" },
      { q: "How do you convince a passive candidate to move? Your go-to pitch." },
    ],
    signalOk: "Fluent narration, integrated numbers, lessons drawn from failures.",
    signalKo: "No concrete example, stays vague, no numbers in the story.",
  },
  // ── 13. Availability & flexibility ──
  {
    title: "Availability & flexibility",
    questions: [
      { q: "Current availability to work? How many days per week?", star: true },
      { q: "Day-rate (freelance) or permanent / fixed-term? What's your preference and why?", star: true },
      { q: "Location + remote work: how do you operate?" },
      { q: "When can you start? Current notice period?" },
    ],
    signalOk: "Clear availability, flexible on format, short notice, transparent.",
    signalKo: "Not available before 3 months, rigid on format, fuzzy on dates.",
  },
  // ── 14. Profile types recruited ──
  {
    title: "Profile types recruited",
    questions: [
      { q: "What type of companies have you worked for? More US Tech / Sales / other?", star: true },
      { q: "What sales cycle + average deal size in the companies where you recruited?", star: true },
      { q: "Do you recruit more tech, sales, ops profiles? Breakdown?" },
      { q: "How do you adapt your qualification for a Sales profile vs a DevOps profile?" },
    ],
    signalOk: "Varied profiles, sales cycle understanding, adaptation by type.",
    signalKo: "Single profile type, no business understanding, no adaptation.",
  },
  // ── 15. R4RPO culture fit ──
  {
    title: "R4RPO culture fit",
    questions: [
      { q: "What motivates you in recruitment? Why do you do this job?", star: true },
      { q: "What's a top 1% recruiter to you? How do you position yourself?", star: true },
      { q: "Process structuring: no followers, only motivated people who make decisions. Give an example.", star: true },
      { q: "How do you react when a client puts pressure on you with an impossible deadline?" },
    ],
    signalOk: "Motivated, structured, takes initiative, premium posture, positive energy.",
    signalKo: "Passive, waits for instructions, no vision, fuzzy motivation.",
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
 * - remplace ponctuation par espaces (pour matches de mots courts : "dev,", "tech.")
 * - supprime le "s" final des mots de 4+ caractères (stemming minimal)
 * - collapse les espaces multiples
 * - ajoute un espace au début et à la fin pour matches avec bordure
 */
function normalize(text: string): string {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[.,;:!?()[\]{}"'`]/g, " ") // ponctuation → espace
    .replace(/\b(\w{4,})s\b/g, "$1") // pluriels simples
    .replace(/\s+/g, " ") // collapse espaces
    .trim();
  return ` ${normalized} `;
}

/**
 * v17.4 — Sépare le texte du candidat de celui du recruteur (Théophile / Théo).
 * Détecte les patterns "Nom Prénom à HH:MM" en début de ligne.
 * Si pas de structure reconnue, retourne le texte intégral.
 */
export interface SplitTranscriptResult {
  /** Texte du candidat uniquement (sans Théophile) */
  candidate: string;
  /** Texte complet original */
  full: string;
  /** true si la structure "Speaker à HH:MM" a été détectée */
  hasSpeakers: boolean;
  /** Proportion 0-1 du texte attribué à Théophile (si structuré) */
  recruiterRatio: number;
}

export function splitTranscript(text: string): SplitTranscriptResult {
  const speakerPattern = /^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm;
  const matches = [...text.matchAll(speakerPattern)];

  if (matches.length < 2) {
    return { candidate: text, full: text, hasSpeakers: false, recruiterRatio: 0 };
  }

  // Split : [intro, speaker1, content1, speaker2, content2, ...]
  const parts = text.split(speakerPattern);
  const candidateSegments: string[] = [];
  let theoLen = 0;
  let candidateLen = 0;

  for (let i = 1; i < parts.length; i += 2) {
    const speaker = (parts[i] || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const content = (parts[i + 1] || "").trim();

    const isRecruiter =
      speaker.includes("theophile") ||
      speaker.startsWith("theo ") ||
      speaker === "theo";

    if (isRecruiter) {
      theoLen += content.length;
    } else {
      candidateSegments.push(content);
      candidateLen += content.length;
    }
  }

  const totalLen = theoLen + candidateLen;
  const recruiterRatio = totalLen > 0 ? theoLen / totalLen : 0;

  return {
    candidate: candidateSegments.join("\n\n").trim() || text,
    full: text,
    hasSpeakers: true,
    recruiterRatio,
  };
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
    /** v17.4 — TJM max détecté si fourchette (ex: "entre 500 et 600") */
    tjmMax?: string;
    loc?: string;
    prenom?: string;
    nom?: string;
    /** v17.4 — extensions */
    age?: string;
    yearsExperience?: string;
    languages: string[];
    tools: string[];
    methodologies: string[];
    companies: string[];
    mobility?: "Full remote" | "Hybride" | "Présentiel";
    availability?: "Immédiate" | "Court-terme (<1 mois)" | "Moyen-terme (1-3 mois)" | "Long-terme (3 mois+)";
  };
  /** v17 — Type de contrat détecté (single) */
  contrat?: "TJM Freelance" | "CDI" | "CDD" | "Les deux";
  /** v17 — Taxonomies multi-select détectées */
  profileTypes: string[];
  companyTypes: string[];
  profileStyle: string[];
  intelligenceTypes: string[];
  /** v17.4 — Méta : transcription segmentée par speaker ? */
  speakerSegmented: boolean;
  /** v17.4 — Ratio 0-1 du texte attribué au recruteur (Théophile) */
  recruiterRatio: number;
  /** v20 — Parser de résumé structuré (sections [Critère XX], [Ressenti], etc.) */
  /** Ouverture CDD/CDI dérivée du contrat ou des formulations explicites */
  openCddCdi?: boolean;
  /** Qualification — profil (Généraliste / Sales / IT) */
  qualifProfile?: string;
  /** Qualification — niveau (Junior / Mid... / Senior... / Expert...) */
  qualifLevel?: string;
  /** Qualification — types recrutés (SDR, AE, DevOps, etc.) */
  qualifRecruitedTypes: string[];
  /** Qualification — contexte (Record<groupe, valeurs[]>) */
  qualifContext: Record<string, string[]>;
  /** Niveau global Intelligence (Faible / Moyen / Fort / Exceptionnel) */
  intelligenceLevel?: string;
  /** Niveau global Motivation */
  motivationLevel?: string;
  /** Niveau global Sympathie */
  sympathyLevel?: string;
  /** Langues parlées avec niveau (depuis identity.languages → structuré) */
  languagesSpoken: { lang: string; level: string }[];
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

/* ═══════════════════════════════════════════════════════════════════════
   v17.4 — Listes de détection étendues
   ═══════════════════════════════════════════════════════════════════════ */

/** Outils du recrutement / productivité / IA (référentiel curé) */
const TOOLS_CATALOG = [
  // ATS & CRM
  "LinkedIn Recruiter", "LinkedIn recruteur", "Sales Navigator", "Sales Nav",
  "Greenhouse", "Lever", "Welcome to the Jungle", "Smart Recruiter",
  "SmartRecruiters", "Talent Link", "TalentLink", "Flatchr", "Flatcher",
  "Hello Work", "HelloWork", "Teamtailor", "Workable", "Ashby",
  "Notion", "Airtable", "HubSpot", "Salesforce",
  // Sourcing / outreach
  "Apollo", "Lemlist", "La Growth Machine", "LGM ", "Phantom Buster",
  "PhantomBuster", "Waalaxy", "Kaspr", "Lusha", "RocketReach",
  "Full & Rich", "Dropcontact", "Hunter.io",
  // Boards
  "APEC", "France Travail", "Malt", "Collectif Work", "Collectif",
  "Welcome to the Jungle", "Monster", "Jobteaser", "Indeed",
  // Dev
  "GitHub", "GitLab", "Stack Overflow", "StackOverflow",
  // Communication / meeting
  "Slack", "Microsoft Teams", "Zoom", "Google Meet",
  "Fireflies", "Modjo", "Nouta", "Nota ", "Loom",
  // IA
  "ChatGPT", "Claude", "Cursor", "GitHub Copilot", "Copilot", "Manus",
  "Perplexity", "Gemini",
  // Process
  "Calent", "Covalent", "Calendly",
];

/** Méthodologies / concepts recrutement */
const METHODOLOGIES_CATALOG = [
  "STAR", "Scorecard", "Scorecards", "Agile", "Scrum", "Kanban",
  "Plan de chasse", "Booléen", "Boolean", "Multicanal", "Multi-canal",
  "Cooptation", "ATS", "Talent review", "NPS",
  "Kick-off", "Kickoff", "Retainer", "Success fee",
  "Mapping", "Market intelligence", "Talent intelligence",
  "OKR", "KPI", "Dashboard", "Funnel", "Pipeline",
  "Employer branding", "Marque employeur",
  "Onboarding", "Preboarding", "Offboarding",
  "Interview guide", "Guide d'entretien",
  "Embedded recruitment", "RPO",
];

/** Catalogue de boîtes (grandes + startups/scale-up FR connues)
 *  Note : LinkedIn / Salesforce / HubSpot / SAP retirés pour éviter doublon avec outils */
const COMPANIES_CATALOG = [
  // GAFAM + géants tech
  "Amazon", "Microsoft", "Google", "Apple", "Meta", "Facebook",
  "Adobe", "Oracle", "IBM", "Intel", "AMD", "NVIDIA",
  "Netflix", "Uber", "Airbnb", "Spotify", "Twitter", "TikTok",
  // Consulting / ESN
  "Accenture", "Capgemini", "Sopra", "Sopra Steria", "Deloitte", "BCG",
  "McKinsey", "KPMG", "PwC", "EY", "Atos", "Altran", "Wavestone",
  "Davidson", "Excelsior", "YouMake", "Sully Group", "Pragmatan",
  "AFD Tech", "Calictus", "Insight Conseil", "Sword", "iTech Solutions",
  "Fed", "FedAfrica", "Cloud International", "Allegis",
  // Luxe / retail FR
  "LVMH", "L'Oréal", "Hermès", "Kering", "Chanel", "Dior", "Louis Vuitton",
  "Publicis", "Havas", "Carrefour", "Auchan", "Leclerc", "Decathlon",
  "Aubert", "Casino", "Monoprix",
  // Grand groupe FR
  "Air France", "Accor", "BNP", "BNP Paribas", "Société Générale",
  "Crédit Agricole", "Orange", "SFR", "Bouygues", "Free", "Total", "TotalEnergies",
  "Airbus", "Renault", "Peugeot", "Stellantis", "Alstom", "Thales",
  "Dassault", "Naval Group", "Safran", "Michelin", "Schneider",
  "Roquette", "Sanofi", "Pfizer", "Valeo", "Faurecia",
  // Santé / industrie
  "Euris", "Biotech",
  // Startups / scale-up FR
  "Doctolib", "Alan", "Back Market", "Aircall", "Mirakl", "PayFit",
  "Spendesk", "Agicap", "Qonto", "Lemonway", "Alma", "Swile",
  "Blablacar", "Contentsquare", "Pigment", "Dataiku", "Ledger",
  "PrestaShop", "Ankama", "Deezer", "Criteo", "OVH", "OVHcloud",
  "Wind", "Tech4Kin", "Pixies", "Volt",
  // Rocket & ecosystem (retire "Rocket" seul car mentionné par Théophile en contexte)
  "Rocket4Sales", "Rocket4RPO", "Rocket for Sales", "Rocket for RPO",
  "Evoa", "Walix",
  "Monotov TV", "iMedia", "Allopass", "Oberture Technologie",
  "Adyen", "Stripe", "Revolut", "N26", "Mistral AI", "Mistraliers",
  // Hôtellerie / voyage
  "Booking", "Expedia", "Wordia", "Bayredo", "LVB",
  // Institutions
  "AFD", "Agence Française de Développement", "Accord", "iPay",
  // Finance / insurance
  "Allianz", "Axa", "Generali",
];

/**
 * Extrait les champs identité (email, téléphone, LinkedIn, TJM, localisation, prénom/nom)
 * v17.4 : + âge, années d'exp, langues, outils, méthodologies, boîtes, mobilité, dispo
 */
function extractIdentity(text: string): AutoScoreDetails["identity"] {
  const out: AutoScoreDetails["identity"] = {
    languages: [],
    tools: [],
    methodologies: [],
    companies: [],
  };

  // Email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) out.email = emailMatch[0].trim();

  // Téléphone (FR — 0X XX XX XX XX, +33 X XX XX XX XX)
  const phoneMatch = text.match(/(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}/);
  if (phoneMatch) out.phone = phoneMatch[0].replace(/\s+/g, " ").trim();

  // LinkedIn (lien complet ou slug)
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w\-À-ÿ]+\/?/i);
  if (linkedinMatch) out.linkedin = linkedinMatch[0].trim();

  // TJM — v17 : matching élargi
  // Priorité 1 : "500€/j", "650 €/jour", "700/j", "800 EUR jour"
  let tjmValue: string | undefined;
  const tjmSlashMatch = text.match(/(\d{3,4})\s*(?:€|eur|euros?)?\s*[/\\-]?\s*j(?:our|\b)/i);
  if (tjmSlashMatch) tjmValue = tjmSlashMatch[1];

  // Priorité 2 : "TJM ... 550", "TJM de 600", "TJM à 500", "tarif journalier ... 450"
  if (!tjmValue) {
    const tjmCtxMatch = text.match(/(?:tjm|tarif\s+journalier|taux\s+journalier|tgm|t\.j\.m)[^0-9€]{0,30}(\d{3,4})/i);
    if (tjmCtxMatch) tjmValue = tjmCtxMatch[1];
  }

  // Priorité 3 : "je suis à 550", "à 500 euros", "autour de 600" — uniquement si contexte freelance
  if (!tjmValue && /(?:freelance|independ|à mon compte|auto.entrepreneur|tjm)/i.test(text)) {
    const tjmAroundMatch = text.match(/(?:a|à|autour de|plutot a|idealement|ideal(?:ement)?|environ|minimum|max(?:imum)?)\s+(\d{3,4})\s*(?:€|eur|euros)?/i);
    if (tjmAroundMatch) {
      const n = parseInt(tjmAroundMatch[1], 10);
      if (n >= 200 && n <= 1500) tjmValue = tjmAroundMatch[1];
    }
  }

  if (tjmValue) out.tjm = `${tjmValue} €/j`;

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
  // v17.4 : + détection via pattern "Speaker à HH:MM" si transcription structurée
  const nameMatch =
    text.match(/(?:je\s+m['']appelle|candidat\s*:?\s*|je\s+suis)\s+([A-ZÀ-ÿ][a-zà-ÿ]+)\s+([A-ZÀ-ÿ][A-Za-zà-ÿ\-]+)/) ||
    text.match(/^([A-ZÀ-ÿ][a-zà-ÿ]+)\s+([A-ZÀ-ÿ][A-Za-zà-ÿ\-]+)\s*[—\-|,]/m);
  if (nameMatch) {
    out.prenom = nameMatch[1];
    out.nom = nameMatch[2];
  } else {
    // Fallback : premier speaker "Nom Prénom à HH:MM" qui n'est PAS Théophile
    const speakerMatches = [...text.matchAll(/^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm)];
    for (const m of speakerMatches) {
      const name = m[1].trim();
      const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (!normalized.includes("theo")) {
        const parts = name.split(/\s+/);
        if (parts.length >= 2) {
          out.prenom = parts[0];
          out.nom = parts.slice(1).join(" ");
          break;
        }
      }
    }
  }

  // v17.4 — Fourchette TJM (ex: "entre 500 et 600", "500 à 600")
  const tjmRangeMatch = text.match(/entre\s+(\d{3,4})\s+et\s+(\d{3,4})|(\d{3,4})\s*[-à]\s*(\d{3,4})\s*(?:€|eur|euros)?\s*(?:\/|par|au)\s*j/i);
  if (tjmRangeMatch) {
    const min = tjmRangeMatch[1] || tjmRangeMatch[3];
    const max = tjmRangeMatch[2] || tjmRangeMatch[4];
    if (min && max && parseInt(min) >= 200 && parseInt(max) <= 1500) {
      if (!out.tjm) out.tjm = `${min} €/j`;
      out.tjmMax = `${max} €/j`;
    }
  }

  // v17.4 — Âge (exclut "j'ai X ans d'expérience", "X ans de métier", etc.)
  const ageMatch = text.match(/j['']ai\s+(\d{2})\s+ans\b(?!\s+(?:d['']|de\s+(?:metier|m[eé]tier|recrutement|cabinet|anciennet|experience|exp)))/i);
  if (ageMatch) {
    const age = parseInt(ageMatch[1], 10);
    if (age >= 18 && age <= 75) out.age = `${age} ans`;
  }

  // v17.4 — Années d'expérience
  // "X ans d'expérience", "ça fait X ans", "depuis X ans", "plus de X ans"
  const yearsPatterns = [
    /(\d{1,2})\s+ans?\s+d['']exp(?:erience)?/i,
    /ca\s+fait\s+(\d{1,2})\s+ans?/i,
    /depuis\s+(\d{1,2})\s+an(?:nee)?s?/i,
    /plus\s+de\s+(\d{1,2})\s+ans?/i,
  ];
  let yearsExp: number | null = null;
  for (const pattern of yearsPatterns) {
    const m = text.match(pattern);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= 40 && (yearsExp === null || n > yearsExp)) {
        yearsExp = n;
      }
    }
  }
  if (yearsExp !== null) out.yearsExperience = `${yearsExp} ans`;

  // v17.4 — Langues avec niveau
  const languagesCatalog = [
    { name: "Anglais", keywords: ["anglais"] },
    { name: "Espagnol", keywords: ["espagnol"] },
    { name: "Allemand", keywords: ["allemand"] },
    { name: "Italien", keywords: ["italien"] },
    { name: "Portugais", keywords: ["portugais"] },
    { name: "Chinois", keywords: ["chinois", "mandarin"] },
    { name: "Arabe", keywords: ["arabe"] },
    { name: "Néerlandais", keywords: ["neerlandais", "hollandais"] },
    { name: "Russe", keywords: ["russe"] },
  ];
  const levelKeywords = [
    { re: /bilingue/i, level: "bilingue" },
    { re: /\bfluent\b|\bcourant\b|\bcourante\b|c[12]/i, level: "courant" },
    { re: /op[eé]rationnel/i, level: "opérationnel" },
    { re: /\bb[12]\b/i, level: "intermédiaire" },
    { re: /notion|debutant|scolaire/i, level: "notions" },
  ];
  const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const detectedLangs = new Set<string>();
  for (const lang of languagesCatalog) {
    for (const kw of lang.keywords) {
      const re = new RegExp(`\\b${kw}\\b`, "i");
      if (re.test(normalizedText)) {
        // Cherche le niveau dans un rayon de 60 chars autour du keyword
        const idx = normalizedText.indexOf(kw);
        const window = normalizedText.slice(Math.max(0, idx - 30), Math.min(normalizedText.length, idx + kw.length + 40));
        let level: string | null = null;
        for (const lvl of levelKeywords) {
          if (lvl.re.test(window)) {
            level = lvl.level;
            break;
          }
        }
        detectedLangs.add(level ? `${lang.name} (${level})` : lang.name);
        break;
      }
    }
  }
  out.languages = Array.from(detectedLangs);

  // v17.4 — Outils détectés
  const detectedTools = new Set<string>();
  for (const tool of TOOLS_CATALOG) {
    const re = new RegExp(`\\b${tool.replace(/[.&+*?^$()[\]{}|\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) {
      detectedTools.add(tool.trim());
    }
  }
  out.tools = Array.from(detectedTools).slice(0, 15); // cap à 15 pour lisibilité

  // v17.4 — Méthodologies détectées
  const detectedMethodologies = new Set<string>();
  for (const method of METHODOLOGIES_CATALOG) {
    const re = new RegExp(`\\b${method.replace(/[.&+*?^$()[\]{}|\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) {
      detectedMethodologies.add(method);
    }
  }
  out.methodologies = Array.from(detectedMethodologies).slice(0, 12);

  // v17.4 — Entreprises détectées
  const detectedCompanies = new Set<string>();
  for (const company of COMPANIES_CATALOG) {
    const re = new RegExp(`\\b${company.replace(/[.&+*?^$()[\]{}|\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) {
      detectedCompanies.add(company);
    }
  }
  out.companies = Array.from(detectedCompanies).slice(0, 12);

  // v17.4 — Mobilité (télétravail / présentiel)
  if (/full\s+remote|100\s*%\s*t[eé]l[eé]travail|full\s+t[eé]l[eé]travail|t[eé]l[eé]travail\s+total/i.test(text)) {
    out.mobility = "Full remote";
  } else if (/hybride|2\s+jours\s+sur\s+place|3\s+jours\s+sur\s+place|2\s*-\s*3\s+jours|mix.*bureau|flex.*bureau/i.test(text)) {
    out.mobility = "Hybride";
  } else if (/full\s+pr[eé]sentiel|5\s+jours\s+sur\s+place|tous\s+les\s+jours\s+au\s+bureau/i.test(text)) {
    out.mobility = "Présentiel";
  }

  // v17.4 — Disponibilité
  if (/dispo(?:nible)?\s+(?:de suite|imm[eé]diat|tout\s+de\s+suite|asap)|imm[eé]diatement|d[eè]s\s+(?:maintenant|demain)|disponible\s+imm[eé]diat/i.test(text)) {
    out.availability = "Immédiate";
  } else if (/sous\s+(?:une?\s+semaine|2\s+semaines?|15\s+jours?)|pr[eé]avis\s+(?:d['']une?\s+semaine|court)|dans\s+quelques\s+semaines/i.test(text)) {
    out.availability = "Court-terme (<1 mois)";
  } else if (/fin\s+(?:de\s+)?mission\s+(?:en|dans)|dans\s+(?:un|2|deux|3|trois)\s+moi?s|pr[eé]avis\s+(?:de\s+)?(?:1|2|un|deux)\s+moi?s|janvier|f[eé]vrier|mars|avril|mai|juin|juillet|ao[uû]t|septembre|octobre|novembre|d[eé]cembre/i.test(text) &&
             /(?:je suis|je termine|la mission|mission se termine|mission finit|jusqu'[àa])/i.test(text)) {
    out.availability = "Moyen-terme (1-3 mois)";
  }

  return out;
}

/* ═══════════════════════════════════════════════════════════════════════
   v17 — Détection des taxonomies multi-select + type de contrat
   Match par any-keyword (seuil : 1 match → tag appliqué) sur texte normalisé
   ═══════════════════════════════════════════════════════════════════════ */

/** Keywords pour détecter le type de contrat (single-select)
 *  Note : pour bien capturer le freelance ACTUEL (vs un CDI historique),
 *  on prioritise les indicateurs forts comme "TJM", "à mon compte", "auto-entrepreneur". */
const CONTRAT_DETECTION: { label: "TJM Freelance" | "CDI" | "CDD"; keywords: string[] }[] = [
  {
    label: "TJM Freelance",
    keywords: [
      " freelance ", " independant ", " independante ", "a mon compte",
      "a mon propre compte", "mon propre compte", "auto-entrepreneur",
      "auto entrepreneur", " tjm ", " t j m ", "tarif journalier",
      "taux journalier", " tgm ", " t g m ", "ma societe",
      " ma boite ", " mon cabinet ", "en freelance", "en independ",
      "portage salarial", "je suis en mission", "euros au jour",
      "euros par jour", "€/j", "euros la journee", "a la journee",
      "ma structure", "tarif de",
    ],
  },
  {
    label: "CDI",
    keywords: [
      "je suis en cdi", "je suis salarie", "je suis salariee",
      "en poste chez", "salarie en interne", "en interne chez",
      "ma derniere experience en cdi", "mon cdi",
    ],
  },
  {
    label: "CDD",
    keywords: ["je suis en cdd", "contrat a duree determinee", "cdd de"],
  },
];

/** Keywords pour les 10 familles de profils recrutés (multi-select)
 *  Format : mots entourés d'espaces = mot entier (ex: " tech " matche "tech" mais pas "technique") */
const PROFILE_TYPES_DETECTION: Record<string, string[]> = {
  "Sales": [
    " sales ", " commercial ", " commerciale ", " sdr ", " bdr ",
    "account executive", "account manager", "business developer",
    "vp sales", " cro ", "ingenieur commercial", "inside sales",
    "sales manager", "sales engineer", "profil sales",
  ],
  "Tech": [
    " tech ", " dev ", " devs ", " it ", "developpeur", "dev front",
    "dev back", "fullstack", "full stack", "devops", " sre ",
    "cybersecurite", "ingenieur logiciel", "ingenieur systeme",
    "ingenieur reseau", "j2ee", "javascript", " java ", " python ",
    " linux ", "embarque", "infrastructure", "back-end", "front-end",
    " qa ", "software engineering", " sde ",
  ],
  "Data & ML": [
    "data analyst", "data scientist", "data engineer", "data manager",
    "machine learning", " dba ", "intelligence artificielle", "data science",
    "analyst data", " data ", " ia ", " ml ",
  ],
  "Product & Design": [
    "product manager", "product owner", "product designer", " ux ", " ui ",
    " cpo ", "head of product", "directeur produit", "chef de produit",
    " po ", " pm ",
  ],
  "Marketing": [
    " growth ", " cmo ", " seo ", " sea ", "content manager",
    "brand manager", "growth marketing", "acquisition paye",
    "marketing digital", "marketing produit", "marketing operationnel",
    "inbound marketing", "outbound marketing",
  ],
  "Customer Success": [
    "customer success", " csm ", "pre-sales", "presales", "solutions engineer",
    "pre sales",
  ],
  "Ops / RevOps": [
    " revops ", " salesops ", "people ops", "operations manager",
    "operations engineer",
  ],
  "Finance": [
    " daf ", " cfo ", "controleur de gestion", "controleur gestion",
    " fp&a ", "compliance", "conformite", "controlling", " finance ",
    " financier ", " financiere ",
  ],
  "Direction / C-level": [
    "c-level", " ceo ", " cto ", " coo ", " vp ", "head of", " director ",
    " directeur ", " directrice ", " founder ", " cofounder ", " co-founder ",
    "cofondateur", "cofondatrice", "top management", "middle management",
    "executive search", "comite de direction", " comex ", "hiring manager",
    " drh ",
  ],
  "International": [
    "international", "cross-border", "cross border", " uk ", " dach ",
    "nordics", " usa ", "etats-unis", "royaume-uni", "continent africain",
    " afrique ", " chine ", " inde ", "expatriation", "multilingue",
    "bilingue", " anglais ", "angleterre", " londres ", "luxembourg",
    "benelux", " europe ", "marche americain", "marche us",
  ],
};

/** Keywords pour les 7 types de boîte (multi-select) */
const COMPANY_TYPES_DETECTION: Record<string, string[]> = {
  "Startup (<50p)": [
    " startup ", " startups ", "start-up", "start up", " seed ", "pre-seed",
    "pre seed", "early stage", "jeune pousse", "amorcage",
  ],
  "Scale-up (50-300p)": [
    "scale-up", "scale up", " scaleup ", "serie a", "serie b",
    "levee de fonds", "levee de fond", "post-levee", "post levee",
    "hyper-croissance", "hyper croissance",
  ],
  "Licorne / 300+p": [
    " licorne ", " unicorn ", "serie c", "serie d", "post-ipo",
  ],
  "ETI / Grand groupe": [
    "grand groupe", "grand compte", "grands groupe", " corporate ",
    " eti ", "groupe cote", "cote en bourse", "bourse de paris",
    "multinationale", "entreprise familiale",
    " lvmh ", " amazon ", " adobe ", " accor ", " publicis ", " allianz ",
    " alstom ", " roquette ", " capgemini ", " microsoft ", " google ",
    " oracle ", " bnp ", " orange ",
  ],
  "SaaS / Tech produit": [
    " saas ", "editeur de logiciel", "editeur logiciel",
    "editeur de logiciels", " software ", "produit software",
    "plateforme saas", "entreprise tech",
  ],
  "Services / Conseil / ESN": [
    " esn ", " ss2i ", " ssii ", "societe de service", "societe de conseil",
    "cabinet de conseil", " consulting ", "prestation de service",
    "assistance technique", " sopra ", " accenture ",
  ],
  "RPO / Recrutement": [
    " rpo ", "cabinet de recrutement", "chasse de tete", "executive search",
    "mission rpo", "modele rpo", "cabinet recrutement",
    "cabinet de chasse", "boutique de recrutement",
  ],
};

/** Keywords pour les 6 styles de profil (multi-select) */
const PROFILE_STYLE_DETECTION: Record<string, string[]> = {
  "Sharp": [
    "sharp", "brillant", "intellectuel", "vif d'esprit", "vive d'esprit",
    "analytique pointu", "esprit affute",
  ],
  "Hunter": [
    "chasse de tete", "chasseur", "chasseuse", "hunter",
    "chasse agressive", "prospection intensive", "new business",
    "sales hunter", "chasse proactive",
  ],
  "Farmer": [
    "farmer", "relation long terme", "fidelisation", "account management",
    "gestion de compte", "suivi clientele", "gestion portefeuille",
  ],
  "Structuré": [
    "structure", "methodique", "rigoureux", "rigoureuse", "rigueur",
    "organise", "organisee", "process", "methodologie", "planification",
    "scorecard", "tableau kpi", "reporting hebdo",
  ],
  "Hands-on": [
    "hands-on", "hands on", "operationnel", "operationnelle",
    "pragmatique", "terrain", "execution", "get things done",
    "pragmatique pragmatique",
  ],
  "Premium / Senior": [
    "senior", "experimente", "experimentee", "expertise confirmee",
    "expert metier", "15 ans d'experience", "20 ans d'experience",
    "10 ans d'experience", "haut de gamme", "premium",
  ],
};

/** Keywords pour les 5 types d'intelligence (multi-select) */
const INTELLIGENCE_TYPES_DETECTION: Record<string, string[]> = {
  "Analytique": [
    "analytique", "data-driven", "data driven", "chiffre precis",
    "raisonnement", "metrique", "tableau kpi", "kpi",
    "data analysis",
  ],
  "Émotionnelle": [
    "empathie", "empathique", "empathiquement", "lecture",
    "ecoute active", "ressenti", "soft skill",
    "intelligence emotionnelle", "humain avant tout",
    "ecouter", "bienveillance",
  ],
  "Stratégique": [
    "strategie", "vision strategique", "anticipation", "long terme",
    "strategique", "vision long terme", "reflexion strategique",
    "business partner", "enjeu strategique",
  ],
  "Relationnelle": [
    "reseau", "charisme", "networking", "contact humain",
    "relation client", "capacite relationnelle",
    "intelligence relationnelle", "cercle de contact",
  ],
  "Opérationnelle": [
    "execution", "delivery", "operationnel", "operationnelle",
    "action", "mise en oeuvre", "exemple concret", "sur le terrain",
    "en mode operationnel",
  ],
};

/**
 * Détection du type de contrat — single-select avec règles de priorité :
 * - freelance + CDI → "Les deux"
 * - freelance seul → "TJM Freelance"
 * - CDI seul → "CDI"
 * - CDD seul → "CDD"
 */
function detectContrat(normalized: string): AutoScoreDetails["contrat"] {
  const matches = new Set<string>();
  for (const { label, keywords } of CONTRAT_DETECTION) {
    for (const kw of keywords) {
      if (normalized.includes(normalize(kw))) {
        matches.add(label);
        break;
      }
    }
  }
  if (matches.has("TJM Freelance") && matches.has("CDI")) return "Les deux";
  if (matches.has("TJM Freelance")) return "TJM Freelance";
  if (matches.has("CDI")) return "CDI";
  if (matches.has("CDD")) return "CDD";
  return undefined;
}

/**
 * Détection multi-select générique : 1 keyword matché → tag appliqué.
 * Retourne la liste des tags détectés dans l'ordre de la map.
 */
function detectMultiSelect(
  normalized: string,
  keywordMap: Record<string, string[]>,
): string[] {
  const detected: string[] = [];
  for (const [tag, keywords] of Object.entries(keywordMap)) {
    for (const kw of keywords) {
      const normalizedKw = normalize(kw);
      if (normalized.includes(normalizedKw)) {
        detected.push(tag);
        break;
      }
    }
  }
  return detected;
}

/* ═══════════════════════════════════════════════════════════════════════
   v20 — Parser de résumé structuré
   Reconnaît explicitement les sections du prompt Rocket4RPO :
   - "Profil de recruteur : [Sales/IT/Généraliste]"
   - "Niveau [Junior/Mid/Senior/Expert]"
   - Liste de types recrutés après "J'ai recruté des X, Y, Z"
   - "Contexte : cycle de vente X, taille contrats Y, ..."
   - Section [Ressenti] : "Intelligence [X]", "Motivation [X]", "Sympathie [X]"
   - "Langues : français (natif), anglais courant (C1), espagnol bilingue..."
   - [Profil recruté détecté] / [Type de boîte] / [Mobilité & dispo]
   - "Ouvert(e) au CDI" / "les deux m'intéressent"
   ═══════════════════════════════════════════════════════════════════════ */

interface StructuredParse {
  openCddCdi?: boolean;
  qualifProfile?: string;
  qualifLevel?: string;
  qualifRecruitedTypes: string[];
  qualifContext: Record<string, string[]>;
  intelligenceLevel?: string;
  motivationLevel?: string;
  sympathyLevel?: string;
  languagesSpoken: { lang: string; level: string }[];
  explicitProfileTypes: string[];
  explicitCompanyTypes: string[];
  explicitMobility?: "Full remote" | "Hybride" | "Présentiel";
  explicitAvailability?: "Immédiate" | "Court-terme (<1 mois)" | "Moyen-terme (1-3 mois)" | "Long-terme (3 mois+)";
  explicitForces: string[];
  explicitRisks: string[];
}

function parseStructuredSummary(text: string): StructuredParse {
  const out: StructuredParse = {
    qualifRecruitedTypes: [],
    qualifContext: {},
    languagesSpoken: [],
    explicitProfileTypes: [],
    explicitCompanyTypes: [],
    explicitForces: [],
    explicitRisks: [],
  };

  // ─── 1. Profil de recruteur ───
  const profileMatch = text.match(/profil(?:\s+de\s+recruteur)?\s*:\s*(g[eé]n[eé]raliste|sales|it)\b/i);
  if (profileMatch) {
    const p = profileMatch[1].toLowerCase();
    if (p.includes("g") && p.includes("n")) out.qualifProfile = "Généraliste";
    else if (p === "sales") out.qualifProfile = "Sales";
    else if (p === "it") out.qualifProfile = "IT";
  }

  // ─── 2. Niveau d'expertise ───
  // "Niveau Senior (6-10 ans)" / "niveau Expert" / "Senior (6-10 ans)"
  const levelPatterns: { re: RegExp; value: string }[] = [
    { re: /\bniveau\s+expert\b|\bexpert\s*\(10\+\s*an/i, value: "Expert (10+ ans)" },
    { re: /\bniveau\s+senior\b|\bsenior\s*\(6-10\s*an/i, value: "Senior (6-10 ans)" },
    { re: /\bniveau\s+mid\b|\bmid\s*\(3-5\s*an/i, value: "Mid (3-5 ans)" },
    { re: /\bniveau\s+junior\b/i, value: "Junior" },
  ];
  for (const p of levelPatterns) {
    if (p.re.test(text)) {
      out.qualifLevel = p.value;
      break;
    }
  }

  // ─── 3. Types recrutés (cherche dans "J'ai recruté des X, des Y") ───
  const allTypes = Array.from(
    new Set([
      ...QUALIF_RECRUITED_TYPES["Généraliste"],
      ...QUALIF_RECRUITED_TYPES["Sales"],
      ...QUALIF_RECRUITED_TYPES["IT"],
    ]),
  );
  const foundTypes = new Set<string>();
  for (const type of allTypes) {
    // Match tolérant : "SDR", "Account Executive", "Dev front", etc.
    const re = new RegExp(`\\b${type.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) foundTypes.add(type);
  }
  out.qualifRecruitedTypes = Array.from(foundTypes);

  // ─── 4. Contexte détaillé (cycle de vente, stack, taille entreprise, etc.) ───
  const lowerText = text.toLowerCase();
  const context: Record<string, string[]> = {};

  // Détection pour chaque profil des 3 branches
  const profileForContext = out.qualifProfile as keyof typeof QUALIF_CONTEXT_BY_PROFILE;
  if (profileForContext && QUALIF_CONTEXT_BY_PROFILE[profileForContext]) {
    for (const group of QUALIF_CONTEXT_BY_PROFILE[profileForContext]) {
      const matches: string[] = [];
      for (const opt of group.options) {
        const optLow = opt.toLowerCase();
        // Chercher la phrase exacte OU ses composants clés
        if (lowerText.includes(optLow)) {
          matches.push(opt);
        } else {
          // Match par keywords essentiels (ex: "cycle long" matche "Enterprise (cycle long)")
          const coreKeywords = opt.match(/\w+/g) || [];
          const significantKws = coreKeywords.filter((k) => k.length > 3);
          if (significantKws.length >= 1 && significantKws.every((k) => lowerText.includes(k.toLowerCase()))) {
            matches.push(opt);
          }
        }
      }
      if (matches.length > 0) context[group.title] = matches;
    }
  }
  out.qualifContext = context;

  // ─── 5. Évaluation humaine (Intelligence / Motivation / Sympathie) ───
  const levelWords = ["Faible", "Moyen", "Fort", "Exceptionnel"];
  function findLevel(dimension: string): string | undefined {
    // Pattern 1 : "Intelligence Fort", "Motivation : Exceptionnel"
    const re1 = new RegExp(
      `${dimension}\\s*(?::|—|-)?\\s*(${levelWords.join("|")})\\b`,
      "i",
    );
    const m1 = text.match(re1);
    if (m1) {
      const found = m1[1];
      return levelWords.find((l) => l.toLowerCase() === found.toLowerCase());
    }
    // Pattern 2 : "Intelligence [Fort]"
    const re2 = new RegExp(
      `${dimension}\\s*\\[(${levelWords.join("|")})\\]`,
      "i",
    );
    const m2 = text.match(re2);
    if (m2) {
      return levelWords.find((l) => l.toLowerCase() === m2[1].toLowerCase());
    }
    return undefined;
  }
  out.intelligenceLevel = findLevel("Intelligence");
  out.motivationLevel = findLevel("Motivation");
  out.sympathyLevel = findLevel("Sympathie");

  // ─── 6. Langues parlées avec niveau ───
  // Format attendu : "français (natif), anglais courant (C1), espagnol bilingue, italien notions"
  const langPresets = [
    "Français", "Anglais", "Espagnol", "Allemand", "Italien",
    "Portugais", "Néerlandais", "Arabe", "Chinois", "Russe",
  ];
  const levelKeywords: { re: RegExp; level: string }[] = [
    { re: /natif|natal/i, level: "Natif" },
    { re: /bilingue/i, level: "Bilingue" },
    { re: /c1|c2|courant(?:e)?|fluent/i, level: "Courant (C1-C2)" },
    { re: /b2|op[eé]rationnel/i, level: "Opérationnel (B2)" },
    { re: /b1|interm[eé]diaire/i, level: "Intermédiaire (B1)" },
    { re: /notion|scolaire|d[eé]butant/i, level: "Notions" },
  ];
  const normalText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const foundLangs: { lang: string; level: string }[] = [];
  // Pour limiter la fenêtre de recherche : stop à la prochaine virgule, point, ou nom d'une autre langue
  const langPresetsNorm = langPresets.map((l) => l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  for (const lang of langPresets) {
    const langNorm = lang.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const reLang = new RegExp(`\\b${langNorm}\\b`, "i");
    const match = reLang.exec(normalText);
    if (match) {
      // Fenêtre = depuis la langue jusqu'à : virgule, point, prochaine langue, ou max 35 chars
      const startIdx = match.index + langNorm.length;
      const remaining = normalText.slice(startIdx, Math.min(normalText.length, startIdx + 50));
      // Trouver la position du prochain stopper
      const stopRe = /[,.;()]|\b(francai|anglai|espagnol|allemand|italien|portugai|neerlandai|arabe|chinoi|russe)\b/i;
      const stopMatch = stopRe.exec(remaining);
      const window = stopMatch ? remaining.slice(0, stopMatch.index) : remaining.slice(0, 35);
      let level = "";
      for (const lvl of levelKeywords) {
        if (lvl.re.test(window)) {
          level = lvl.level;
          break;
        }
      }
      foundLangs.push({ lang, level });
    }
  }
  // Garde-fou : retire les doublons (au cas où)
  void langPresetsNorm;
  const seen = new Set<string>();
  out.languagesSpoken = foundLangs.filter((l) => {
    if (seen.has(l.lang)) return false;
    seen.add(l.lang);
    return true;
  });

  // ─── 7. Section explicite [Profil recruté détecté] ───
  const profileSectionMatch = text.match(/\[\s*Profil\s+recrut[eé]\s+d[eé]tect[eé]\s*\]\s*[:\n]?([^[\n]+)/i);
  if (profileSectionMatch) {
    const section = profileSectionMatch[1];
    for (const tag of PROFILE_TYPES_PRESETS) {
      const re = new RegExp(`\\b${tag.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
      if (re.test(section)) out.explicitProfileTypes.push(tag);
    }
  }

  // ─── 8. Section explicite [Type de boîte] ───
  const companySectionMatch = text.match(/\[\s*Type\s+de\s+bo[iî]te\s*\]\s*[:\n]?([^[\n]+)/i);
  if (companySectionMatch) {
    const section = companySectionMatch[1];
    for (const tag of COMPANY_TYPES_PRESETS) {
      const re = new RegExp(`\\b${tag.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
      if (re.test(section)) out.explicitCompanyTypes.push(tag);
    }
  }

  // ─── 9. Mobilité explicite ───
  if (/full\s*remote|100\s*%\s*t[eé]l[eé]travail|full\s*t[eé]l[eé]travail/i.test(text)) {
    out.explicitMobility = "Full remote";
  } else if (/hybride|mix\s*bureau|2\s+jours\s+sur\s+place|3\s+jours\s+sur\s+place|2-3\s+jours/i.test(text)) {
    out.explicitMobility = "Hybride";
  } else if (/full\s*pr[eé]sentiel|5\s+jours\s+sur\s+place/i.test(text)) {
    out.explicitMobility = "Présentiel";
  }

  // ─── 10. Disponibilité explicite ───
  if (/imm[eé]diate|dispo\s+(?:de\s+suite|imm[eé]diat)|asap|d[eè]s\s+maintenant/i.test(text)) {
    out.explicitAvailability = "Immédiate";
  } else if (/court[\s-]terme|sous\s+(?:une?\s+semaine|2\s+semaines|15\s+jours)|pr[eé]avis\s+(?:court|\d+\s+semaines?)/i.test(text)) {
    out.explicitAvailability = "Court-terme (<1 mois)";
  } else if (/moyen[\s-]terme|1-3\s+mois|dans\s+(?:un|1|2|3)\s+mois|pr[eé]avis\s+de\s+(?:1|2|3)\s+mois/i.test(text)) {
    out.explicitAvailability = "Moyen-terme (1-3 mois)";
  } else if (/long[\s-]terme|3\s+mois\+|long\s+pr[eé]avis/i.test(text)) {
    out.explicitAvailability = "Long-terme (3 mois+)";
  }

  // ─── 11. Section explicite [Forces détectées] ───
  const forcesSectionMatch = text.match(/\[\s*Forces\s+d[eé]tect[eé]e?s?\s*\]\s*[:\n]?([\s\S]*?)(?=\[|\n\s*\n|$)/i);
  if (forcesSectionMatch) {
    const section = forcesSectionMatch[1];
    const forcesCatalog = [
      "Sourcing proactif fort", "Chiffres précis spontanés", "Autonomie démontrée",
      "Closing efficace", "Fit RPO évident", "Management d'équipe",
      "Leadership TA senior", "Profil élite", "Fort réseau mobilisable",
      "Structurateur de process", "Fort volume de placement",
      "Deliverer (atteint ses KPI)", "Expérience en top boîte",
      "Bilingue / profil international", "Senior 15+ ans",
      "Expertise executive search",
    ];
    for (const force of forcesCatalog) {
      // Match par keywords principaux (minuscule, tolérant)
      const core = force.toLowerCase().split(/[()/'-]/)[0].trim();
      if (core.length > 3 && section.toLowerCase().includes(core)) {
        out.explicitForces.push(force);
      }
    }
  }

  // ─── 12. Section explicite [Alertes] ou [Red flags] ───
  const risksSectionMatch = text.match(/\[\s*(?:Alertes|Red\s*flags|Risques)\s*\]\s*[:\n]?([\s\S]*?)(?=\[|\n\s*\n|$)/i);
  if (risksSectionMatch) {
    const section = risksSectionMatch[1];
    const risksCatalog = [
      "Manque de chiffres", "Communication floue", "Peu autonome",
      "Pas de fit RPO", "Outils mal maîtrisés", "Reconversion (profil à valider)",
      "Rupture conventionnelle récente", "Mission courte (< 3 mois)",
      "Echec de placement récent", "Expérience négative récente",
      "Contexte difficile évoqué", "Poste supprimé récemment",
      "Manque de budget/outils", "Refus client(s) reporté(s)",
      "Pipe commercial faible", "Activité irrégulière", "Marché limité",
    ];
    for (const risk of risksCatalog) {
      const core = risk.toLowerCase().split(/[()/'-]/)[0].trim();
      if (core.length > 3 && section.toLowerCase().includes(core)) {
        out.explicitRisks.push(risk);
      }
    }
  }

  // ─── 13. Ouverture CDD/CDI ───
  if (/ouvert[e]?\s+au\s+c?di|les\s+deux\s+m['']int[eé]ressent|ouverte?\s+(?:aussi\s+)?au\s+(?:cdd|cdi)/i.test(text)) {
    out.openCddCdi = true;
  } else if (/uniquement\s+freelance|que\s+du\s+freelance|pas\s+de\s+cdi|ferm[eé]\s+au\s+cdi/i.test(text)) {
    out.openCddCdi = false;
  }

  return out;
}

/**
 * Analyse un résumé d'entretien et retourne un scoring détaillé.
 * v16 : matching tolérant (accents, pluriels), extraction identité, forces
 * conditionnelles au score du critère, score de confiance, debug matches.
 * v17 : + détection contrat + 4 taxonomies multi-select.
 * v17.4 : + séparation candidat/recruteur, extraction étendue (âge, exp, langues,
 *          outils, méthodologies, entreprises, mobilité, dispo).
 * v20 : + parseStructuredSummary() qui reconnaît le format du prompt structuré
 *        et pré-remplit qualif path, levels I/M/S, langues avec niveau, etc.
 */
export function autoScore(text: string, options: AutoScoreOptions = {}): AutoScoreDetails {
  // v17.4 — Sépare candidat vs Théophile si structure détectée
  const split = splitTranscript(text);
  // Scoring uniquement sur la partie candidat (si disponible), extractions sur tout
  const scoringText = split.hasSpeakers ? split.candidate : text;
  const normalized = normalize(scoringText);
  const wordCount = scoringText.trim().split(/\s+/).filter(Boolean).length;

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

  // v17.4 — Forces étendues (conditionnelles au score du critère lié quand applicable)
  const uniqueForces = new Set<string>();
  // Tableau : [phrase_trigger, label, critère_min_score (0 = toujours)]
  const forceTriggers: [string, string, number][] = [
    // Sourcing
    ["sourcing proactif", "Sourcing proactif fort", 0],
    ["approche directe", "Sourcing proactif fort", 0],
    ["chasse directe", "Sourcing proactif fort", 0],
    ["booleen maitrise", "Sourcing proactif fort", 0],
    ["automatisation", "Sourcing proactif fort", 0],
    // Chiffres
    ["chiffre precis", "Chiffres précis spontanés", 0],
    ["taux de conversion", "Chiffres précis spontanés", 0],
    ["time to hire", "Chiffres précis spontanés", 0],
    ["ratio cv", "Chiffres précis spontanés", 0],
    ["kpi suivi", "Chiffres précis spontanés", 0],
    // Autonomie
    ["demontre son autonomie", "Autonomie démontrée", 0],
    ["a monte sa boite", "Autonomie démontrée", 0],
    ["autonome", "Autonomie démontrée", 7],
    ["a son compte", "Autonomie démontrée", 0],
    ["a mon compte", "Autonomie démontrée", 0],
    ["mon propre cabinet", "Autonomie démontrée", 0],
    ["ma structure", "Autonomie démontrée", 0],
    ["refuse des mission", "Autonomie démontrée", 0],
    // Closing
    ["closing reussi", "Closing efficace", 0],
    ["contre offre", "Closing efficace", 0],
    ["contre-offre", "Closing efficace", 0],
    ["negociation salariale", "Closing efficace", 0],
    ["taux d'acceptation", "Closing efficace", 0],
    // RPO
    ["experience rpo", "Fit RPO évident", 0],
    ["embedded chez", "Fit RPO évident", 0],
    ["integre dans l'equipe", "Fit RPO évident", 0],
    ["plug and play", "Fit RPO évident", 0],
    ["plug & play", "Fit RPO évident", 0],
    // Nouvelles forces v17.4
    ["manage une equipe", "Management d'équipe", 0],
    ["manager une equipe", "Management d'équipe", 0],
    ["manage des recruteurs", "Management d'équipe", 0],
    ["equipe de recruteurs", "Management d'équipe", 0],
    ["forme des recruteurs", "Management d'équipe", 0],
    ["head of talent", "Leadership TA senior", 0],
    ["directrice recrutement", "Leadership TA senior", 0],
    ["directeur recrutement", "Leadership TA senior", 0],
    ["responsable recrutement", "Leadership TA senior", 0],
    ["top 5%", "Profil élite", 0],
    ["top 1%", "Profil élite", 0],
    ["meilleur de sa generation", "Profil élite", 0],
    ["mon reseau", "Fort réseau mobilisable", 0],
    ["9000 contact", "Fort réseau mobilisable", 0],
    ["8000 contact", "Fort réseau mobilisable", 0],
    ["5000 contact", "Fort réseau mobilisable", 0],
    ["reseau activable", "Fort réseau mobilisable", 0],
    ["mis en place un process", "Structurateur de process", 0],
    ["mis en place des process", "Structurateur de process", 0],
    ["structuration du pole", "Structurateur de process", 0],
    ["cree un pole", "Structurateur de process", 0],
    ["monte un pole", "Structurateur de process", 0],
    ["a recrute 100", "Fort volume de placement", 0],
    ["une centaine de", "Fort volume de placement", 0],
    ["130 recrutement", "Fort volume de placement", 0],
    ["200 recrutement", "Fort volume de placement", 0],
    ["40 recrutement par an", "Fort volume de placement", 0],
    ["objectif atteint", "Deliverer (atteint ses KPI)", 0],
    ["toujours atteint", "Deliverer (atteint ses KPI)", 0],
    ["je depasse", "Deliverer (atteint ses KPI)", 0],
    ["depasser les objectif", "Deliverer (atteint ses KPI)", 0],
    ["amazon", "Expérience en top boîte", 0],
    ["accenture", "Expérience en top boîte", 0],
    ["doctolib", "Expérience en top boîte", 0],
    ["adobe", "Expérience en top boîte", 0],
    ["lvmh", "Expérience en top boîte", 0],
    ["bilingue", "Bilingue / profil international", 0],
    ["15 ans d'exp", "Senior 15+ ans", 0],
    ["16 ans", "Senior 15+ ans", 0],
    ["17 ans", "Senior 15+ ans", 0],
    ["20 ans d'exp", "Senior 15+ ans", 0],
    ["executive search", "Expertise executive search", 0],
    ["c-level", "Expertise executive search", 0],
    ["top management", "Expertise executive search", 0],
  ];

  for (const [trigger, label, critIdx] of forceTriggers) {
    const triggerNormalized = normalize(trigger);
    if (normalized.includes(triggerNormalized)) {
      // Si critIdx > 0 et score du critère < 4, on skip
      if (critIdx > 0 && (scores[`c${critIdx}`] || 0) < 4) continue;
      uniqueForces.add(label);
    }
  }
  const detectedForces = Array.from(uniqueForces);

  // v17.4 — Risques étendus
  const uniqueRisks = new Set<string>();
  const riskTriggers: [string, string][] = [
    // Communication
    ["pas de chiffre", "Manque de chiffres"],
    ["aucun chiffre", "Manque de chiffres"],
    ["sans chiffre", "Manque de chiffres"],
    ["communication floue", "Communication floue"],
    ["reponse vague", "Communication floue"],
    ["reste vague", "Communication floue"],
    ["reponses vagues", "Communication floue"],
    ["floue", "Communication floue"],
    // Autonomie
    ["peu autonome", "Peu autonome"],
    ["manque d'autonomie", "Peu autonome"],
    ["n'est pas autonome", "Peu autonome"],
    ["pas assez autonome", "Peu autonome"],
    // RPO
    ["ne connait pas le rpo", "Pas de fit RPO"],
    ["pas fait de rpo", "Pas de fit RPO"],
    ["jamais fait de rpo", "Pas de fit RPO"],
    ["pas d'experience rpo", "Pas de fit RPO"],
    // Outils
    ["outil mal maitrise", "Outils mal maîtrisés"],
    ["stack mal maitrisee", "Outils mal maîtrisés"],
    ["pas les bons outil", "Outils mal maîtrisés"],
    // Nouveaux risques v17.4
    ["en reconversion", "Reconversion (profil à valider)"],
    ["sortait de rupture", "Rupture conventionnelle récente"],
    ["rupture conventionnelle", "Rupture conventionnelle récente"],
    ["mission de 2 mois", "Mission courte (< 3 mois)"],
    ["mission d'un mois", "Mission courte (< 3 mois)"],
    ["tres court", "Mission courte (< 3 mois)"],
    ["pas reussi a placer", "Echec de placement récent"],
    ["n'a pas reussi", "Echec de placement récent"],
    ["ca ne s'est pas bien passe", "Expérience négative récente"],
    ["mal passe", "Expérience négative récente"],
    ["compliqu", "Contexte difficile évoqué"],
    ["a ete suppim", "Poste supprimé récemment"],
    ["on m'a supprime", "Poste supprimé récemment"],
    ["poste supprim", "Poste supprimé récemment"],
    ["supprime mon poste", "Poste supprimé récemment"],
    ["n'a pas de licence", "Manque de budget/outils"],
    ["pas de licence", "Manque de budget/outils"],
    ["pas de budget", "Manque de budget/outils"],
    ["refus client", "Refus client(s) reporté(s)"],
    ["le client a refuse", "Refus client(s) reporté(s)"],
    ["pas de mission", "Pipe commercial faible"],
    ["pas de client en direct", "Pipe commercial faible"],
    ["difficile d'avoir les client", "Pipe commercial faible"],
    ["dernier placement", "Activité irrégulière"],
    ["pas regulier", "Activité irrégulière"],
    ["tres peu de poste", "Marché limité"],
    ["marche tendu", "Marché limité"],
    ["ressenti marche tendu", "Marché limité"],
  ];

  for (const [trigger, label] of riskTriggers) {
    if (normalized.includes(normalize(trigger))) {
      uniqueRisks.add(label);
    }
  }
  const detectedRisks = Array.from(uniqueRisks);

  // Extraction identité (sur tout le texte, pas juste candidat — extrait mieux)
  const identity = extractIdentity(text);

  // v17 — Détection contrat + 4 taxonomies multi-select (sur partie candidat)
  const contrat = detectContrat(normalized);
  const profileTypes = detectMultiSelect(normalized, PROFILE_TYPES_DETECTION);
  const companyTypes = detectMultiSelect(normalized, COMPANY_TYPES_DETECTION);
  const profileStyle = detectMultiSelect(normalized, PROFILE_STYLE_DETECTION);
  const intelligenceTypes = detectMultiSelect(normalized, INTELLIGENCE_TYPES_DETECTION);

  // v20 — Parser de résumé structuré (priorité sur détections génériques)
  const structured = parseStructuredSummary(text);

  // Merge : les profileTypes/companyTypes explicites complètent les détections auto
  const finalProfileTypes = Array.from(new Set([...profileTypes, ...structured.explicitProfileTypes]));
  const finalCompanyTypes = Array.from(new Set([...companyTypes, ...structured.explicitCompanyTypes]));

  // Mobilité / dispo explicites écrasent les détections d'extractIdentity
  if (structured.explicitMobility) identity.mobility = structured.explicitMobility;
  if (structured.explicitAvailability) identity.availability = structured.explicitAvailability;

  // Langues structurées si disponibles, sinon fallback sur identity.languages (format "Lang (niveau)")
  const languagesSpokenFinal: { lang: string; level: string }[] =
    structured.languagesSpoken.length > 0
      ? structured.languagesSpoken
      : identity.languages.map((l) => {
          const m = l.match(/^(.+?)\s*\((.+)\)$/);
          if (m) {
            const levelRaw = m[2].toLowerCase();
            let level = "";
            if (levelRaw.includes("natif")) level = "Natif";
            else if (levelRaw.includes("bilingue")) level = "Bilingue";
            else if (levelRaw.includes("courant")) level = "Courant (C1-C2)";
            else if (levelRaw.includes("op")) level = "Opérationnel (B2)";
            else if (levelRaw.includes("interm")) level = "Intermédiaire (B1)";
            else if (levelRaw.includes("notion")) level = "Notions";
            return { lang: m[1], level };
          }
          return { lang: l, level: "" };
        });

  // Merge forces/risques explicites (du parser) avec ceux détectés automatiquement
  const finalForces = Array.from(new Set([...detectedForces, ...structured.explicitForces]));
  const finalRisks = Array.from(new Set([...detectedRisks, ...structured.explicitRisks]));

  // Score de confiance
  const confidence = Math.min(
    100,
    Math.round((wordCount / 250) * 100) // 250 mots = 100%
  );
  const confidenceLevel: "faible" | "moyenne" | "haute" =
    wordCount < 80 ? "faible" : wordCount < 200 ? "moyenne" : "haute";

  return {
    scores,
    forces: finalForces,
    risks: finalRisks,
    matchedKeywords,
    identity,
    contrat,
    profileTypes: finalProfileTypes,
    companyTypes: finalCompanyTypes,
    profileStyle,
    intelligenceTypes,
    speakerSegmented: split.hasSpeakers,
    recruiterRatio: split.recruiterRatio,
    // v20 — Champs structurés
    openCddCdi: structured.openCddCdi,
    qualifProfile: structured.qualifProfile,
    qualifLevel: structured.qualifLevel,
    qualifRecruitedTypes: structured.qualifRecruitedTypes,
    qualifContext: structured.qualifContext,
    intelligenceLevel: structured.intelligenceLevel,
    motivationLevel: structured.motivationLevel,
    sympathyLevel: structured.sympathyLevel,
    languagesSpoken: languagesSpokenFinal,
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

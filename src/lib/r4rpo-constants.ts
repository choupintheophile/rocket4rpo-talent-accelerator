// R4RPO v15 — 15 universal criteria, preset tags, interview questions

export const CRITERIA = [
  { name: "Sourcing & identification", desc: "Volume, approche directe, booléen, multicanal" },
  { name: "Qualification candidat", desc: "Évaluer tech/fit/sales sans être expert du domaine" },
  { name: "Spécialisation sectorielle", desc: "ESN, SaaS, Fintech, HealthTech, HR Tech" },
  { name: "International", desc: "Chasse internationale, langues, marchés étrangers" },
  { name: "Structure de chasse", desc: "Méthodologie A→Z, process réplicable et structuré" },
  { name: "Outils & stack", desc: "CRM, Sales Nav, ATS, automatisation, configuration autonome" },
  { name: "Connaissance marché", desc: "Top boîtes, leaders, crédibilité sectorielle directe" },
  { name: "Autonomie & ownership", desc: "Décisions seul, pushback HM, pas suiveur" },
  { name: "Pilotage & KPIs", desc: "Chiffres précis, TTF, taux de conversion, reporting structuré" },
  { name: "Closing & négo", desc: "Posture conseil HM, contre-offre, négo offre, closing" },
  { name: "Expérience RPO/embedded", desc: "Déjà intégré chez client, connaît le modèle, plug & play" },
  { name: "Storytelling & exemples", desc: "Meilleur recrutement, exemples concrets, narration convaincante" },
  { name: "Disponibilité & flexibilité", desc: "Jours/semaine, délai démarrage, souplesse" },
  { name: "Type de profils recrutés", desc: "Tech US, Sales, Ops, cycle de vente, panier moyen" },
  { name: "Fit culturel R4RPO", desc: "Motivation, énergie, posture premium, structuré" },
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

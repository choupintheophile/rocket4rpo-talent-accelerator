// R4RPO v7 — 7 universal criteria, preset tags, interview questions

export const CRITERIA = [
  { name: "Chasse & sourcing", desc: "Approche directe, booléen, multicanal, volume de contacts, vivier" },
  { name: "Outils & stack", desc: "ATS, CRM, LI Recruiter, automatisation, configuration autonome" },
  { name: "Autonomie & ownership", desc: "Prise de brief seul, pushback HM, décisions sans validation" },
  { name: "Pilotage & KPIs", desc: "TTF, pipe, taux de conversion, reporting structuré, SLA" },
  { name: "Qualification candidat", desc: "Évaluer technique/fit sans être dev, grilles, tests, calibration" },
  { name: "Posture conseil HM", desc: "Accompagnement manager, négo offre, gestion contre-offre, closing" },
  { name: "Expérience RPO/embedded", desc: "Déjà intégré chez un client, connaît le modèle, plug & play" },
] as const;

export const NB_CRIT = CRITERIA.length;

export const FORCE_PRESETS = [
  "Sourcing proactif fort",
  "Chiffres précis spontanés",
  "Autonomie démontrée",
  "Stack outils maîtrisée",
  "Réseau crédible",
  "Qualification pointue",
  "Storytelling convaincant",
  "Fit RPO évident",
  "International opérationnel",
  "Process structuré A→Z",
  "Closing efficace",
  "KPIs & reporting rigoureux",
  "Bilingue / multilingue",
  "Multi-secteurs ESN + SaaS",
  "Disponible immédiatement",
] as const;

export const RISK_PRESETS = [
  "Manque de chiffres",
  "Peu autonome",
  "Réseau limité",
  "Qualification superficielle",
  "Faible connaissance marché",
  "Pas de fit RPO",
  "Expérience sectorielle faible",
  "Communication floue",
  "Instabilité / mobilité courte",
  "Trop généraliste",
  "Se survend",
  "Outils mal maîtrisés",
  "Pas de closing",
  "Faible volume recrutements",
  "Vague & généraliste",
] as const;

export const IMPRESSION_POSITIVES = [
  "Ponctuel & préparé",
  "Conversation fluide",
  "Écoute active",
  "Concis & structuré",
  "Énergie & motivation",
  "Humble & transparent",
  "Exemples concrets",
] as const;

export const IMPRESSION_NEGATIVES = [
  "En retard / pas prêt",
  "Conversation laborieuse",
  "Parle trop / hors-sujet",
  "Vague & généraliste",
  "Peu motivé / passif",
  "Se survend",
  "Rigide / défensif",
] as const;

export const SCORE_COLORS = ["#EF9A9A", "#FFD54F", "#AED581", "#66BB6A", "#124944"] as const;

export interface QuestionCategory {
  title: string;
  questions: { q: string; star?: boolean }[];
  signalOk: string;
  signalKo: string;
}

export const QUESTIONS: QuestionCategory[] = [
  {
    title: "Chasse & sourcing",
    questions: [
      { q: "Comment tu identifies un profil senior qui n'est pas en recherche active ? Méthode step by step.", star: true },
      { q: "En dehors de LinkedIn, tu sources où ?", star: true },
      { q: "Donne-moi une recherche booléenne pour un profil tech senior. On regarde ta logique." },
      { q: "Combien de messages d'approche tu envoies par semaine ? Quel taux de retour ?" },
    ],
    signalOk: "Méthode décrite étape par étape, multicanal, booléen maîtrisé, volume quantifié.",
    signalKo: "Je poste une annonce — pas de méthode proactive, pas de chiffres.",
  },
  {
    title: "Outils & stack",
    questions: [
      { q: "Décris ta stack complète. Tu as configuré toi-même les outils ou tu les utilises juste ?", star: true },
      { q: "Qu'est-ce que tu as automatisé dans ton sourcing ? Quel gain concret ?", star: true },
      { q: "Comment tu utilises Sales Navigator ou LI Recruiter spécifiquement ?" },
    ],
    signalOk: "Stack précise, configuration autonome, gains quantifiés, usage avancé.",
    signalKo: "J'utilise LinkedIn — n'a jamais configuré, pas de gains mesurés.",
  },
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
  {
    title: "Qualification candidat",
    questions: [
      { q: "Comment tu évalues un profil senior sans être expert de son domaine ?", star: true },
      { q: "Quelles questions tu poses au hiring manager pour calibrer le niveau attendu ?", star: true },
      { q: "Un candidat te dit qu'il est expert sur un sujet. Comment tu vérifies sans être technique ?" },
    ],
    signalOk: "Grille de questions, sourcing secondaire, validation croisée avec manager.",
    signalKo: "Je fais confiance au CV — délègue entièrement, pas de grille propre.",
  },
  {
    title: "Posture conseil HM",
    questions: [
      { q: "Un hiring manager te donne un brief irréaliste. Tu fais quoi ?", star: true },
      { q: "Raconte ton meilleur closing difficile : candidat hésitant, contre-offre employeur.", star: true },
      { q: "Comment tu pitches un poste peu attractif à un candidat senior qui a 3 offres ?" },
      { q: "Comment tu gères 3 hiring managers avec des styles de décision très différents ?" },
    ],
    signalOk: "Push-back structuré, techniques de closing explicites, négo offre maîtrisée.",
    signalKo: "Accepte tout sans challenge, pas de technique de closing, subit la contre-offre.",
  },
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
];

// Verdict calculation
export type VerdictLevel = "top" | "mid" | "low" | "nc";

export interface VerdictInfo {
  level: VerdictLevel;
  label: string;
  description: string;
}

export function getVerdict(pct: number, filled: number): VerdictInfo {
  if (filled < 3) return { level: "nc", label: "Incomplet", description: "" };
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

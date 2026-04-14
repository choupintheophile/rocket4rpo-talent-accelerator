// Server-safe glossary data — shared between server page.tsx (for JSON-LD schema)
// and client GlossaireRpoClient.tsx (for rendering).

export interface GlossaryTerm {
  id: string;
  term: string;
  alternate?: string;
  category: string;
  definition: string;
  example: string;
  internalLink?: { href: string; label: string };
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "rpo",
    term: "RPO",
    alternate: "Recruitment Process Outsourcing",
    category: "Modèle",
    definition:
      "Externalisation du processus de recrutement à un prestataire qui intègre ses recruteurs directement dans l'entreprise cliente. Modèle alternatif au cabinet, avec un coût forfaitaire prévisible jusqu'à 5x moins cher.",
    example:
      "Une scale-up qui recrute 10 profils sur 6 mois fait appel à un RPO 4 jours/semaine plutôt qu'à un cabinet.",
    internalLink: { href: "/qu-est-ce-que-le-rpo", label: "Qu'est-ce que le RPO" },
  },
  {
    id: "ta",
    term: "Talent Acquisition Specialist",
    alternate: "TA",
    category: "Rôle",
    definition:
      "Recruteur spécialisé dans l'acquisition de talents, responsable du sourcing, de la qualification et du closing des candidats. Il peut être interne, en cabinet, ou en RPO intégré à l'équipe.",
    example:
      "Un TA senior prend en charge de 3 à 8 postes simultanés selon leur complexité et la séniorité recherchée.",
  },
  {
    id: "time-to-hire",
    term: "Time-to-hire",
    alternate: "TTH / TTF / Time-to-fill",
    category: "KPI",
    definition:
      "Délai entre l'ouverture d'un poste et la signature du contrat d'un candidat. KPI majeur du recrutement qui mesure l'efficacité du process. Moyenne française : 40 à 60 jours selon le secteur.",
    example:
      "Un time-to-hire de 30 jours sur un poste Tech est considéré comme excellent en 2026.",
  },
  {
    id: "sourcing",
    term: "Sourcing multicanal",
    category: "Méthode",
    definition:
      "Identification et contact de candidats via plusieurs canaux complémentaires : LinkedIn Recruiter, jobboards, approches directes, cooptation, réseaux communautaires. L'efficacité dépend de la diversification.",
    example:
      "Un sourcing équilibré combine 40% LinkedIn, 20% jobboards, 20% approches directes, 20% cooptation.",
  },
  {
    id: "scorecard",
    term: "Scorecard",
    category: "Outil",
    definition:
      "Grille de notation structurée utilisée pour évaluer les candidats sur des critères prédéfinis (compétences, culture fit, motivation). Permet d'objectiver les décisions et de comparer les candidats de manière équitable.",
    example:
      "Une scorecard Tech typique note sur 5 : compétences techniques, communication, autonomie, curiosité, alignement culturel.",
  },
  {
    id: "cooptation",
    term: "Cooptation",
    alternate: "Referral",
    category: "Canal",
    definition:
      "Pratique consistant à recruter via les recommandations de collaborateurs internes, souvent associée à une prime. Génère des candidats de meilleure qualité avec une rétention supérieure, à un coût réduit.",
    example:
      "Chez les scale-ups Tech, la cooptation génère 20 à 40% des recrutements, avec une prime de 500 à 3000€.",
  },
  {
    id: "pipeline",
    term: "Pipeline candidats",
    category: "Process",
    definition:
      "Ensemble des candidats à différents stades du processus de recrutement (sourcés, qualifiés, entretien, offre). Un pipeline sain contient 3-5x plus de candidats que de postes à pourvoir.",
    example:
      "Pour 10 recrutements à pourvoir, un pipeline sain compte 30-50 candidats qualifiés en parallèle.",
  },
  {
    id: "ats",
    term: "ATS",
    alternate: "Applicant Tracking System",
    category: "Outil",
    definition:
      "Logiciel de suivi des candidatures qui centralise les candidats, les échanges et les décisions tout au long du processus de recrutement. Indispensable au-delà de 5-10 recrutements par an.",
    example:
      "Les ATS les plus utilisés en France : Greenhouse, Lever, Recruitee, Teamtailor, Welcome Kit.",
  },
  {
    id: "employer-branding",
    term: "Employer branding",
    alternate: "Marque employeur",
    category: "Stratégie",
    definition:
      "Ensemble des perceptions et de la réputation d'une entreprise en tant qu'employeur. Impacte directement l'attractivité, la qualité des candidats et les taux d'acceptation des offres.",
    example:
      "Une page carrière soignée, des témoignages collaborateurs et une politique de rémunération transparente renforcent l'employer branding.",
  },
  {
    id: "onboarding",
    term: "Onboarding",
    alternate: "Intégration",
    category: "Process",
    definition:
      "Processus d'intégration d'un nouveau collaborateur, de la signature du contrat à son autonomie complète. Un onboarding structuré réduit de 50% le risque de départ précoce dans les 6 premiers mois.",
    example:
      "Un onboarding Tech typique dure 3 à 6 mois : semaine 1 setup, mois 1 shadowing, mois 3 premier projet, mois 6 autonomie.",
  },
  {
    id: "hiring-manager",
    term: "Hiring manager",
    alternate: "Manager recruteur",
    category: "Rôle",
    definition:
      "Manager opérationnel responsable du recrutement pour son équipe. Décisionnaire final sur les candidats, il travaille en binôme avec le TA tout au long du processus.",
    example:
      "Un bon alignement TA / hiring manager démarre par un brief de cadrage de 45-60 minutes en début de mission.",
  },
  {
    id: "boolean",
    term: "Boolean search",
    alternate: "Recherche booléenne",
    category: "Technique",
    definition:
      "Technique de recherche candidats utilisant des opérateurs logiques (AND, OR, NOT, guillemets, parenthèses) pour affiner les résultats sur LinkedIn, Google ou les jobboards.",
    example:
      "(\"Software Engineer\" OR \"Développeur\") AND (Python OR Django) AND Paris NOT senior cible les devs Python juniors à Paris.",
  },
  {
    id: "cph",
    term: "Cost-per-hire",
    alternate: "CPH",
    category: "KPI",
    definition:
      "Coût total moyen pour réaliser un recrutement, incluant les salaires des recruteurs, les licences d'outils, les jobboards et les frais annexes. Permet de comparer objectivement les modèles (interne, RPO, cabinet).",
    example:
      "Un CPH moyen en interne est de 3000-5000€, contre 15000-30000€ via un cabinet au success fee.",
  },
  {
    id: "oar",
    term: "Offer acceptance rate",
    alternate: "OAR / Taux d'acceptation",
    category: "KPI",
    definition:
      "Pourcentage de candidats qui acceptent l'offre d'embauche qui leur est faite. KPI clé de l'efficacité du closing. Un OAR inférieur à 70% signale un problème sur la rémunération, la marque employeur ou le process.",
    example:
      "Un OAR de 85% est considéré comme excellent et indique un bon alignement offre / candidat tout au long du process.",
  },
  {
    id: "retention",
    term: "Retention rate",
    alternate: "Taux de rétention",
    category: "KPI",
    definition:
      "Pourcentage de collaborateurs qui restent en poste au-delà d'une période donnée (6 mois, 1 an, 2 ans). KPI final qui mesure la qualité globale du recrutement et de l'onboarding.",
    example:
      "Un taux de rétention à 12 mois supérieur à 90% est excellent. En dessous de 75%, cela signale un problème de fit ou d'onboarding.",
  },
];

export const CATEGORIES = Array.from(new Set(GLOSSARY_TERMS.map((t) => t.category)));

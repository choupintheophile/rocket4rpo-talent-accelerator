// Test splitTranscript + extractIdentity v17.4
// Usage : node scripts/test-split.mjs

function splitTranscript(text) {
  const speakerPattern = /^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm;
  const matches = [...text.matchAll(speakerPattern)];

  if (matches.length < 2) {
    return { candidate: text, full: text, hasSpeakers: false, recruiterRatio: 0 };
  }

  const parts = text.split(speakerPattern);
  const candidateSegments = [];
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

// Test sur extrait Florence
const florenceTranscript = `Théophile Choupin à 00:01

Le profil, tac, tac, tac. Vous connaissez un peu Rocket ou pas forcément ?

Florence Fleuret à 00:07

J'ai regardé un petit peu le cabinet, j'ai regardé un petit peu votre site en fait. Vous êtes un site spécialisé, enfin un cabinet de recrutement spécialisé dans les talents d'acquisition de manager, c'est ça ?

Théophile Choupin à 00:23

Alors, on fait un peu les deux. Oui, c'est ça.

Florence Fleuret à 05:53

J'ai 20 ans d'expérience dans le domaine du recrutement. À la base, moi je viens du monde du sport, j'ai fait STAPS. J'ai découvert le monde du recrutement, donc j'avais 23 ans. J'ai fait une alternance au sein de la cabinet de recrutement qui était spécialisée dans la finance de marché. Je me suis formée chez eux pendant trois ans et je me suis spécialisée dans l'IT. Ensuite, j'ai monté mon propre cabinet de recrutement, donc 2009. Je suis bilingue en espagnol. L'anglais, je maîtrise. Ça remonte à 25 ans.

Théophile Choupin à 06:59

Ok très intéressant.

Florence Fleuret à 07:05

J'ai travaillé pour des startups aussi. À l'époque, Monotov TV, c'était une startup. J'ai travaillé un petit peu pour Le Bon Coin. J'ai travaillé pour Walix, qui était à l'époque une société dans le domaine de la cybersécurité. J'ai travaillé pour Oberture Technologie, qui était un grand groupe. J'ai écrit des articles sur LinkedIn en 2016. L'aventure a duré 12 ans. J'avais mes propres locaux dans le premier arrondissement de Paris. J'étais talent acquisition de manager. J'ai monté mon propre cabinet. Tu es basé à Lyon, non ? Je suis basée sur Paris. J'utilise LinkedIn Recruiter, Sales Navigator. Je fais beaucoup d'approches, l'approche via LinkedIn. J'ai 9000 contacts dans mon réseau. J'ai créé une équipe, donc j'ai recruté une centaine d'ingénieurs études et développement, DBA, le domaine du web.`;

console.log("=== Test splitTranscript ===\n");
const split = splitTranscript(florenceTranscript);
console.log(`hasSpeakers: ${split.hasSpeakers}`);
console.log(`recruiterRatio: ${(split.recruiterRatio * 100).toFixed(1)}%`);
console.log(`\n--- CANDIDAT SEULEMENT ---`);
console.log(split.candidate.slice(0, 500) + "...");
console.log(`\n--- Taille candidat: ${split.candidate.length} chars ---`);
console.log(`--- Taille total: ${split.full.length} chars ---`);

// Test extractions identity basiques
function extractAge(text) {
  const m = text.match(/j['']ai\s+(\d{2})\s+ans\b(?!\s+(?:d['']|de\s+(?:metier|m[eé]tier|recrutement|cabinet|anciennet|experience|exp)))/i);
  if (!m) return undefined;
  const age = parseInt(m[1], 10);
  return age >= 18 && age <= 75 ? `${age} ans` : undefined;
}

function extractYearsExp(text) {
  const patterns = [
    /(\d{1,2})\s+ans?\s+d['']exp(?:erience)?/i,
    /ca\s+fait\s+(\d{1,2})\s+ans?/i,
    /depuis\s+(\d{1,2})\s+an(?:nee)?s?/i,
  ];
  let max = null;
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= 40 && (max === null || n > max)) max = n;
    }
  }
  return max ? `${max} ans` : undefined;
}

const TOOLS_CATALOG = [
  "LinkedIn Recruiter", "Sales Navigator", "Greenhouse", "Lever",
  "Welcome to the Jungle", "Smart Recruiter", "HubSpot", "Notion",
  "GitHub", "Malt", "Apollo", "Lemlist",
];

function extractTools(text) {
  const detected = new Set();
  for (const tool of TOOLS_CATALOG) {
    const re = new RegExp(`\\b${tool.replace(/[.&+*?^$()[\]{}|\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) detected.add(tool);
  }
  return Array.from(detected);
}

const COMPANIES_CATALOG = [
  "Amazon", "Google", "Adobe", "LVMH", "Accor", "Doctolib",
  "Le Bon Coin", "Monotov TV", "Walix", "Oberture Technologie",
  "Rocket", "LinkedIn",
];

function extractCompanies(text) {
  const detected = new Set();
  for (const co of COMPANIES_CATALOG) {
    const re = new RegExp(`\\b${co.replace(/[.&+*?^$()[\]{}|\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) detected.add(co);
  }
  return Array.from(detected);
}

console.log(`\n=== Extractions ===`);
console.log(`Age: ${extractAge(florenceTranscript) || "—"}`);
console.log(`Années d'exp: ${extractYearsExp(florenceTranscript) || "—"}`);
console.log(`Outils: ${extractTools(florenceTranscript).join(", ") || "—"}`);
console.log(`Entreprises: ${extractCompanies(florenceTranscript).join(", ") || "—"}`);

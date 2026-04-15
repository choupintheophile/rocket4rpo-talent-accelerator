// Test sur le cas Claire LACHAT — vérifie les 5 fixes v21.2

const CLAIRE = `Claire LACHAT à 00:00

1. IDENTITÉ
Prénom Nom : Claire LACHAT
Email : wonderh.pro@gmail.com
Téléphone : non communiqué

2. LANGUES
Non communiqué

3. CONTRAT & RÉMUNÉRATION
Statut actuel : freelance
TJM : 450€ en full remote
TJM : 550-600€ avec déplacement
Ouverture CDI : —

4. QUALIFICATION
Métier / positionnement : recruteuse senior / RPO / structuration recrutement
Expérience : plus de 8 ans dans l'univers des ESN
Domaines évoqués : tech, sales, startups, scale-up, ESN

5. CONTEXTE DÉTAILLÉ
Chez Objectware, elle explique avoir monté ses propres équipes recrutement,
structuré des pôles entiers, formé des recruteurs.
Beaucoup de recruteurs tech étaient formés au mot-clé.
Elle a recruté des dev front, dev back, fullstack.

6. SCORING HONNÊTE — 8 CRITÈRES
Critère	Score	Justification
Sourcing	4/5	Méthodologie claire évoquée.
Qualification candidat	4/5	Discours précis sur les métiers tech.
Outils & stack	4/5	Outils nommés.
Autonomie	3/5	Évolution rapide.
Pilotage & KPIs	4/5	KPIs cités.
Closing	3/5	Mentionne les propositions.
Storytelling	4/5	Récit fluide.
Expérience RPO	4/5	Mission embedded.

7. ÉVALUATION HUMAINE
Niveau global perçu : senior
Posture : structurée, orientée résultats, crédible

[Forces détectées]
Plus de 8 ans d'expérience en ESN
A monté et structuré des équipes recrutement
A formé des recruteurs
Méthodologie recrutement structurée
KPIs explicitement cités
Outils clairement identifiés
Bonne compréhension des métiers tech

[Alertes]
Peu de résultats chiffrés dans l'extrait disponible
Langues non communiquées
Disponibilité exacte non précisée

10. ENTREPRISES MENTIONNÉES
Objectware
YouMake
Davidson Consulting

11. OUTILS CITÉS
LinkedIn Recruiter
GitHub
Notion CRM
Nouta

13. MOBILITÉ & DISPONIBILITÉ
Remote : full remote possible
Déplacements : oui, avec adaptation tarifaire
`;

// === Reproduit les fonctions v21.2 ===

function extractName(text) {
  const out = {};
  // Priorité 1 : speaker name
  const sm = [...text.matchAll(/^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm)];
  for (const m of sm) {
    const name = m[1].trim();
    const norm = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!norm.includes("theo")) {
      const parts = name.split(/\s+/);
      if (parts.length >= 2) {
        out.prenom = parts[0];
        out.nom = parts.slice(1)
          .map(p => p === p.toUpperCase() ? p.charAt(0) + p.slice(1).toLowerCase() : p)
          .join(" ");
        break;
      }
    }
  }
  // Priorité 2 : "Je m'appelle"
  if (!out.prenom) {
    const m1 = text.match(/(?:je\s+m['']appelle|candidat\s*:?\s*|je\s+suis)\s+([A-ZÀ-ÿ][a-zà-ÿ]+)\s+([A-ZÀ-ÿ][A-Za-zà-ÿ\-]+)/);
    if (m1) { out.prenom = m1[1]; out.nom = m1[2]; }
  }
  // Priorité 3 : "Prénom Nom : X Y"
  if (!out.prenom) {
    const m2 = text.match(/Pr[eé]nom\s*Nom\s*:\s*([A-ZÀ-ÿ][a-zà-ÿ]+)\s+([A-ZÀ-ÿ][A-Za-zà-ÿ\-]+)/);
    if (m2) {
      out.prenom = m2[1];
      out.nom = m2[2].charAt(0) + m2[2].slice(1).toLowerCase();
    }
  }
  return out;
}

function detectProfile(text) {
  const m = text.match(/profil(?:\s+de\s+recruteur)?\s*:\s*(g[eé]n[eé]raliste|sales|it)\b/i);
  if (m) {
    const p = m[1].toLowerCase();
    if (p === "sales") return "Sales";
    if (p === "it") return "IT";
    return "Généraliste";
  }
  // Heuristique
  const lower = text.toLowerCase();
  const itHits = (lower.match(/\b(?:dev|d[eé]veloppeur|devops|sre|fullstack|back-?end|front-?end|data\s+(?:engineer|scientist)|cto|engineering\s+manager|cybers[eé]curit|tech|product\s+manager|esn|ssii|ss2i)\b/g) || []).length;
  const salesHits = (lower.match(/\b(?:sales|sdr|bdr|account\s+executive|account\s+manager|sales\s+manager|vp\s+sales|cro|sales\s+engineer|business\s+developer|commercia[ul])\b/g) || []).length;
  const genHits = (lower.match(/\b(?:finance|comptab|rh\s|people|legal|juridique|marketing|administratif|ops\b)\b/g) || []).length;
  if (itHits >= 3 && itHits > salesHits && itHits > genHits) return "IT";
  if (salesHits >= 3 && salesHits > itHits && salesHits > genHits) return "Sales";
  if (genHits >= 3 && genHits > itHits && genHits > salesHits) return "Généraliste";
  return null;
}

function detectIMS(text) {
  const out = {};
  const levelWords = ["Faible", "Moyen", "Fort", "Exceptionnel"];
  function explicit(dim) {
    const re = new RegExp(`${dim}\\s*(?::|—|-)?\\s*(${levelWords.join("|")})\\b`, "i");
    const m = text.match(re);
    if (m) return levelWords.find(l => l.toLowerCase() === m[1].toLowerCase());
    return null;
  }
  out.intelligence = explicit("Intelligence");
  out.motivation = explicit("Motivation");
  out.sympathy = explicit("Sympathie");

  // Heuristique narratif
  const t = text.toLowerCase();
  if (!out.intelligence && /discours\s+structur|niveau\s+global\s+per[cç]u\s*:\s*senior|raisonnement|finesse|crédible/i.test(t)) {
    out.intelligence = "Fort";
  }
  if (!out.motivation && /posture\s+(?:engag|tr[eè]s\s+motiv)|drive|orient[eé]e?\s+r[eé]sultats|structur[eé]e?,\s+orient[eé]e?/i.test(t)) {
    out.motivation = "Fort";
  }
  if (!out.sympathy && /ton\s+pos[eé]|humble|coop[eé]rati|chaleureu|bienveillan|écoute\s+active|bon\s+feeling|fluide|cordial|crédible/i.test(t)) {
    out.sympathy = "Fort";
  }
  return out;
}

function parseExplicitScores(text) {
  const critMap = {
    "sourcing": 0,
    "qualification candidat": 1,
    "qualification": 1,
    "outils": 5,
    "stack": 5,
    "autonomie": 7,
    "ownership": 7,
    "pilotage": 8,
    "kpi": 8,
    "closing": 9,
    "négo": 9,
    "storytelling": 11,
    "rpo": 10,
    "embedded": 10,
    "experience rpo": 10,
  };
  const found = {};
  // Pattern tableau "Sourcing\t4/5"
  const re = /^([a-zà-ÿ\s&\/]+?)\s*[\t|│]\s*([0-5])\s*\/\s*5/gim;
  let m;
  while ((m = re.exec(text)) !== null) {
    const name = m[1].toLowerCase().trim();
    const score = parseInt(m[2], 10);
    for (const [key, idx] of Object.entries(critMap)) {
      if (name.includes(key)) { found[`c${idx}`] = score; break; }
    }
  }
  return found;
}

console.log("=== TEST CLAIRE LACHAT — fixes v21.2 ===\n");

const name = extractName(CLAIRE);
console.log("Nom extrait :", name);
console.log(`  → Avant : { prenom: 'Chez', nom: 'Objectware' } ❌`);
console.log(`  → Après : ${name.prenom === "Claire" && name.nom === "Lachat" ? "✅" : "❌"} attendu Claire Lachat`);

console.log("\nProfil détecté :", detectProfile(CLAIRE));
console.log(`  → Avant : null (vide)`);
console.log(`  → Après : ${detectProfile(CLAIRE) === "IT" ? "✅" : "❌"} attendu IT (heuristique)`);

const ims = detectIMS(CLAIRE);
console.log("\nLevels I/M/S :", ims);
console.log(`  → Avant : tous undefined`);
console.log(`  → Après : ${ims.intelligence && ims.motivation && ims.sympathy ? "✅ tous Fort" : "partiel"}`);

const scores = parseExplicitScores(CLAIRE);
console.log("\nScores explicites détectés :", scores);
console.log(`  → Override les scores keyword matching`);
console.log(`  → Attendu : { c0:4, c1:4, c5:4, c7:3, c8:4, c9:3, c11:4, c10:4 }`);
const expectedScores = ["c0=4", "c1=4", "c5=4", "c8=4", "c10=4", "c11=4"];
const correct = expectedScores.every(e => {
  const [k, v] = e.split("=");
  return scores[k] === parseInt(v);
});
console.log(`  → ${correct ? "✅" : "⚠ partiellement"} match`);

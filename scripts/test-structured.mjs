// Test rapide du parseStructuredSummary v20
// Usage : node scripts/test-structured.mjs

// Reproduit la logique de parsing pour validation
function parseStructuredQualif(text) {
  const out = { profile: null, level: null, types: [] };

  const profileMatch = text.match(/profil(?:\s+de\s+recruteur)?\s*:\s*(g[eé]n[eé]raliste|sales|it)\b/i);
  if (profileMatch) {
    const p = profileMatch[1].toLowerCase();
    if (p.includes("g") && p.includes("n")) out.profile = "Généraliste";
    else if (p === "sales") out.profile = "Sales";
    else if (p === "it") out.profile = "IT";
  }

  const levelPatterns = [
    { re: /\bniveau\s+expert\b|\bexpert\s*\(10\+\s*an/i, value: "Expert (10+ ans)" },
    { re: /\bniveau\s+senior\b|\bsenior\s*\(6-10\s*an/i, value: "Senior (6-10 ans)" },
    { re: /\bniveau\s+mid\b|\bmid\s*\(3-5\s*an/i, value: "Mid (3-5 ans)" },
    { re: /\bniveau\s+junior\b/i, value: "Junior" },
  ];
  for (const p of levelPatterns) {
    if (p.re.test(text)) { out.level = p.value; break; }
  }

  return out;
}

function parseStructuredLevels(text) {
  const out = { intelligence: null, motivation: null, sympathy: null };
  const levelWords = ["Faible", "Moyen", "Fort", "Exceptionnel"];
  function find(dim) {
    const re1 = new RegExp(`${dim}\\s*(?::|—|-)?\\s*(${levelWords.join("|")})\\b`, "i");
    const m = text.match(re1);
    if (m) return levelWords.find((l) => l.toLowerCase() === m[1].toLowerCase());
    return null;
  }
  out.intelligence = find("Intelligence");
  out.motivation = find("Motivation");
  out.sympathy = find("Sympathie");
  return out;
}

function parseLanguages(text) {
  const langs = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais"];
  const lvlMap = [
    { re: /natif/i, level: "Natif" },
    { re: /bilingue/i, level: "Bilingue" },
    { re: /c1|c2|courant/i, level: "Courant (C1-C2)" },
    { re: /op[eé]rationnel|b2/i, level: "Opérationnel (B2)" },
    { re: /b1|interm/i, level: "Intermédiaire (B1)" },
    { re: /notion|d[eé]butant/i, level: "Notions" },
  ];
  const norm = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const out = [];
  for (const lang of langs) {
    const ln = lang.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const re = new RegExp(`\\b${ln}\\b`, "i");
    const m = re.exec(norm);
    if (m) {
      const window = norm.slice(m.index, Math.min(norm.length, m.index + 60));
      let level = "";
      for (const lvl of lvlMap) { if (lvl.re.test(window)) { level = lvl.level; break; } }
      out.push({ lang, level });
    }
  }
  return out;
}

// Exemple de texte structuré (issu du prompt v2)
const sample = `Marie Dupont à 00:00

Je m'appelle Marie Dupont. Je suis basée à Paris.
Je parle français (natif), anglais courant (C1), espagnol bilingue, italien notions.

Profil de recruteur : Sales. Niveau Senior (6-10 ans). J'ai 10 ans d'expérience.

J'ai recruté des SDR / BDR, des Account Executive, des Account Manager, des Sales Manager,
des VP Sales, et quelques CRO et Sales Engineer.

Contexte : cycle de vente Enterprise (cycle long), taille contrats Enterprise (500K+ ARR),
modèle business SaaS B2B principalement.

Mon ressenti : Intelligence Fort. Motivation Exceptionnel. Sympathie Fort.

[Forces détectées]
Sourcing proactif fort, chiffres précis spontanés, autonomie démontrée, closing efficace,
fit RPO évident.

[Profil recruté détecté]
Sales, International.

[Type de boîte]
Scale-up (50-300p), SaaS / Tech produit.
`;

console.log("=== Test parseStructuredSummary v20 ===\n");
console.log("Qualif :", parseStructuredQualif(sample));
console.log("Levels :", parseStructuredLevels(sample));
console.log("Langues :", parseLanguages(sample));

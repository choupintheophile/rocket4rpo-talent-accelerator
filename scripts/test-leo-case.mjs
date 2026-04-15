// Test sur le cas Léo Le Hen — vérifie que les anti-faux-positifs v21.1 marchent
// Reproduit le résumé Gabriel qui causait 6 problèmes

const LEO_RESUME = `Léo Le Hen à 00:00

Je m'appelle Léo Le Hen. Mon email est leolehen2@gmail.com.

1. IDENTITÉ
Téléphone : non communiqué.
LinkedIn : non communiqué explicitement.
Localisation : Paris.

2. LANGUES
Je parle Français bilingue.
Je parle Anglais couramment (C1/C2).
Espagnol : notions.
Allemand : notions.
Italien : notions.
Portugais : notions.
Néerlandais : notions.
Arabe : notions.
Chinois : notions.
Russe : notions.

3. CONTRAT & RÉMUNÉRATION
Ouverture CDI : —
TJM : non communiqué.

4. TYPE DE PROFIL
Profil de recruteur : IT
Niveau : Mid (3-5 ans)

7. CONTEXTE DÉTAILLÉ
Stack principale : JS / TS / React, Python / Django / FastAPI, Java / JVM, Go / Rust, .NET / C#, Mobile natif, Polyvalent.
Domaine : Produit / Startup, Infrastructure / Cloud, Data / IA, Cybersécurité, Embedded / IoT, Gaming / 3D.
Environnement : Startup early, Scale-up, Grand groupe, ESN / Consulting, RPO / Embedded.
International : France uniquement, Europe, US / Monde, Full remote distribué.

[Forces détectées]
expérience RPO
embedded chez
intégré dans l'équipe
approche directe
sourcing proactif
chasse directe
bilingue
éditeur de logiciels (SaaS) non confirmé
structuration du process partiellement visible
démontre son autonomie
à mon compte : non, seulement projeté
plug and play probable mais non verbalisé
`;

// === Reproduction des fonctions corrigées v21.1 ===

function parseLanguagesV21(text) {
  const langs = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Néerlandais", "Arabe", "Chinois", "Russe"];
  const lvlMap = [
    { re: /natif/i, level: "Natif" },
    { re: /bilingue/i, level: "Bilingue" },
    { re: /c1|c2|courant/i, level: "Courant (C1-C2)" },
    { re: /op[eé]rationnel|b2/i, level: "Opérationnel (B2)" },
    { re: /b1|interm/i, level: "Intermédiaire (B1)" },
    { re: /notion/i, level: "Notions" },
  ];
  const norm = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let result = [];
  for (const lang of langs) {
    const ln = lang.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const re = new RegExp(`\\b${ln}\\b`, "i");
    const m = re.exec(norm);
    if (m) {
      const startIdx = m.index + ln.length;
      const remaining = norm.slice(startIdx, Math.min(norm.length, startIdx + 80));
      const stopRe = /[,.;]|\b(francai|anglai|espagnol|allemand|italien|portugai|neerlandai|arabe|chinoi|russe)\b/i;
      const sm = stopRe.exec(remaining);
      const strict = sm ? remaining.slice(0, sm.index) : remaining.slice(0, 50);
      let level = "";
      for (const lvl of lvlMap) if (lvl.re.test(strict)) { level = lvl.level; break; }
      // Anti-faux-positif négations
      if (/non\s+communiqu|non\s+parl|pas\s+de\s+niveau|\s—\s|:\s*—|\bxx\b/i.test(strict)) continue;
      result.push({ lang, level });
    }
  }
  // Anti "liste exhaustive notions"
  const allNotions = result.filter((l) => l.level === "Notions");
  if (result.length >= 6 && allNotions.length >= 5) {
    result = result.filter((l) => l.level !== "Notions" || l.lang === "Français" || l.lang === "Anglais");
  }
  return result;
}

function parseContextV21(text, profile) {
  const CONTEXT_BY_PROFILE = {
    IT: [
      { title: "Stack principale", options: ["JS / TS / React", "Python / Django / FastAPI", "Java / JVM", "Go / Rust", ".NET / C#", "Mobile natif", "Polyvalent"] },
      { title: "Domaine", options: ["Produit / Startup", "Infrastructure / Cloud", "Data / IA", "Cybersécurité", "Embedded / IoT", "Gaming / 3D"] },
      { title: "Environnement", options: ["Startup early", "Scale-up", "Grand groupe", "ESN / Consulting", "RPO / Embedded"] },
      { title: "International", options: ["France uniquement", "Europe", "US / Monde", "Full remote distribué"] },
    ],
  };
  const lower = text.toLowerCase();
  const out = {};
  for (const group of CONTEXT_BY_PROFILE[profile] || []) {
    const matches = [];
    for (const opt of group.options) {
      if (lower.includes(opt.toLowerCase())) matches.push(opt);
    }
    // Filtre 1 : si TOUTES les options matchent → liste exhaustive, on skip
    if (matches.length === group.options.length && group.options.length >= 4) continue;
    // Filtre 2 : cap à 3 max
    if (matches.length > 0) out[group.title] = matches.slice(0, 3);
  }
  return out;
}

function parseCdiV21(text) {
  const explicitUndefined = /ouverture\s+(?:au\s+)?c?di\s*[:\-—]\s*(?:—|non\s+communiqu|non\s+pr[eé]cis|ind[eé]termin)/i.test(text);
  if (explicitUndefined) return undefined;
  if (/(?:je\s+suis\s+)?ouvert[e]?\s+(?:au|à\s+un)\s+c?di|les\s+deux\s+m['']int[eé]ressent/i.test(text)) return true;
  if (/uniquement\s+freelance|que\s+du\s+freelance|pas\s+ouvert\s+au\s+cdi/i.test(text)) return false;
  return undefined;
}

function parseForcesV21(text) {
  const m = text.match(/\[\s*Forces\s+d[eé]tect[eé]e?s?\s*\]\s*[:\n]?([\s\S]*?)(?=\[|\n\s*\n|$)/i);
  if (!m) return [];
  const section = m[1];
  const lines = section.split("\n");
  const catalog = [
    "Sourcing proactif fort", "Chiffres précis spontanés", "Autonomie démontrée",
    "Closing efficace", "Fit RPO évident", "Structurateur de process",
    "Bilingue / profil international",
  ];
  const found = [];
  for (const force of catalog) {
    const core = force.toLowerCase().split(/[()/'-]/)[0].trim();
    const matchedLine = lines.find((l) => l.toLowerCase().includes(core));
    if (!matchedLine) continue;
    const negRe = /\bnon\s+(?:confirm|d[eé]montr|verbalis|certain|pr[eé]cis)|\bpartiellement|\bprobable|\bimplicite|\bplut[oô]t|\bpas\s+(?:r[eé]ellement|encore|de)|:\s*non/i;
    if (negRe.test(matchedLine)) continue;
    found.push(force);
  }
  return found;
}

// === Tests ===

console.log("=== TEST CASE LÉO LE HEN — anti-faux-positifs v21.1 ===\n");

const langs = parseLanguagesV21(LEO_RESUME);
console.log("Langues détectées :", langs.length);
langs.forEach((l) => console.log(`  - ${l.lang} : ${l.level}`));
console.log(`  → AVANT v21.1 : 10 langues (toutes "Notions" sauf FR/EN)`);
console.log(`  → APRÈS v21.1 : ${langs.length === 2 ? "✅" : "❌"} attendu 2 (FR + EN)`);

console.log("\nContexte IT détecté :");
const ctx = parseContextV21(LEO_RESUME, "IT");
for (const [g, vals] of Object.entries(ctx)) {
  console.log(`  - ${g}: ${vals.join(", ") || "(vide)"}`);
}
const totalCtx = Object.values(ctx).flat().length;
console.log(`  → AVANT v21.1 : 22 valeurs cochées (toutes les options)`);
console.log(`  → APRÈS v21.1 : ${totalCtx} valeurs ${totalCtx === 0 ? "✅ (toutes options ignorées car liste exhaustive)" : "(filtré)"}`);

console.log("\nOuverture CDI :");
const cdi = parseCdiV21(LEO_RESUME);
console.log(`  Détecté : ${cdi === undefined ? "—" : cdi}`);
console.log(`  → AVANT v21.1 : Oui ❌`);
console.log(`  → APRÈS v21.1 : ${cdi === undefined ? "✅" : "❌"} attendu — (vide)`);

console.log("\nForces explicites :");
const forces = parseForcesV21(LEO_RESUME);
forces.forEach((f) => console.log(`  ✓ ${f}`));
console.log(`  → AVANT v21.1 : 12 forces (incluant "non confirmé", "partiellement", "probable")`);
console.log(`  → APRÈS v21.1 : ${forces.length} forces filtrées`);

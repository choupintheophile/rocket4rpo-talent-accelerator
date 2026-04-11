/**
 * Fix all resource HTML files:
 * 1. Add missing cover visual elements (grid, line, bottom)
 * 2. Fix French accents
 * 3. Ensure consistent structure
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "../public/resources");

// Accent fixes — common words without accents
const accentFixes = [
  // é
  [/\bdetaille/gi, (m) => m.replace(/detaille/i, "détaillé")],
  [/\bdetaillee/gi, (m) => m.replace(/detaillee/i, "détaillée")],
  [/\bequipe/gi, (m) => m.replace(/equipe/i, "équipe")],
  [/\bevaluation/gi, (m) => m.replace(/evaluation/i, "évaluation")],
  [/\bevaluer/gi, (m) => m.replace(/evaluer/i, "évaluer")],
  [/\bevalue/gi, (m) => m.replace(/evalue/i, "évalué")],
  [/\bremuneration/gi, (m) => m.replace(/remuneration/i, "rémunération")],
  [/\bresultat/gi, (m) => m.replace(/resultat/i, "résultat")],
  [/\bresultats/gi, (m) => m.replace(/resultats/i, "résultats")],
  [/\bdelai/gi, (m) => m.replace(/delai/i, "délai")],
  [/\bdelais/gi, (m) => m.replace(/delais/i, "délais")],
  [/\bdecision/gi, (m) => m.replace(/decision/i, "décision")],
  [/\bdefinition/gi, (m) => m.replace(/definition/i, "définition")],
  [/\brecrutement/g, "recrutement"], // already correct
  [/\bpenurie/gi, (m) => m.replace(/penurie/i, "pénurie")],
  [/\brealise/gi, (m) => m.replace(/realise/i, "réalisé")],
  [/\brealises/gi, (m) => m.replace(/realises/i, "réalisés")],
  [/\brealisee/gi, (m) => m.replace(/realisee/i, "réalisée")],
  [/\breference/gi, (m) => m.replace(/reference/i, "référence")],
  [/\breferences/gi, (m) => m.replace(/references/i, "références")],
  [/\bexperience/gi, (m) => m.replace(/experience/i, "expérience")],
  [/\bgeneral/gi, (m) => m.replace(/general/i, "général")],
  [/\bgenerale/gi, (m) => m.replace(/generale/i, "générale")],
  [/\bgeneralement/gi, (m) => m.replace(/generalement/i, "généralement")],
  [/\bstrategique/gi, (m) => m.replace(/strategique/i, "stratégique")],
  [/\bstrategie/gi, (m) => m.replace(/strategie/i, "stratégie")],
  [/\bcompetence/gi, (m) => m.replace(/competence/i, "compétence")],
  [/\bcompetences/gi, (m) => m.replace(/competences/i, "compétences")],
  [/\bintegre/gi, (m) => m.replace(/integre/i, "intégré")],
  [/\bintegrer/gi, (m) => m.replace(/integrer/i, "intégrer")],
  [/\bintegration/gi, (m) => m.replace(/integration/i, "intégration")],
  [/\bestime/gi, (m) => m.replace(/estime/i, "estimé")],
  [/\bestimee/gi, (m) => m.replace(/estimee/i, "estimée")],
  [/\bsalarie/gi, (m) => m.replace(/salarie/i, "salarié")],
  [/\bsalaries/gi, (m) => m.replace(/salaries/i, "salariés")],
  [/\belevee/gi, (m) => m.replace(/elevee/i, "élevée")],
  [/\beleve/gi, (m) => m.replace(/eleve/i, "élevé")],
  [/\bpresente/gi, (m) => m.replace(/presente/i, "présenté")],
  [/\bpresenter/gi, (m) => m.replace(/presenter/i, "présenter")],
  [/\bpresentation/gi, (m) => m.replace(/presentation/i, "présentation")],
  [/\bsecurite/gi, (m) => m.replace(/securite/i, "sécurité")],
  [/\bqualite/gi, (m) => m.replace(/qualite/i, "qualité")],
  [/\bactivite/gi, (m) => m.replace(/activite/i, "activité")],
  [/\bsociete/gi, (m) => m.replace(/societe/i, "société")],
  [/\bpreparation/gi, (m) => m.replace(/preparation/i, "préparation")],
  [/\bprepare/gi, (m) => m.replace(/prepare/i, "préparé")],
  [/\bpreparer/gi, (m) => m.replace(/preparer/i, "préparer")],
  [/\bameliorer/gi, (m) => m.replace(/ameliorer/i, "améliorer")],
  [/\bamelioration/gi, (m) => m.replace(/amelioration/i, "amélioration")],
  [/\bcree/gi, (m) => m.replace(/cree/i, "créé")],
  [/\bcreation/gi, (m) => m.replace(/creation/i, "création")],
  [/\bdeveloppement/gi, (m) => m.replace(/developpement/i, "développement")],
  [/\bdeveloppeur/gi, (m) => m.replace(/developpeur/i, "développeur")],
  [/\bprocedure/gi, (m) => m.replace(/procedure/i, "procédure")],
  [/\bretention/gi, (m) => m.replace(/retention/i, "rétention")],
  [/\bperiode/gi, (m) => m.replace(/periode/i, "période")],
  [/\bnecessaire/gi, (m) => m.replace(/necessaire/i, "nécessaire")],
  [/\bbenefice/gi, (m) => m.replace(/benefice/i, "bénéfice")],
  [/\bspecifique/gi, (m) => m.replace(/specifique/i, "spécifique")],
  [/\bmethode/gi, (m) => m.replace(/methode/i, "méthode")],
  [/\bverifie/gi, (m) => m.replace(/verifie/i, "vérifié")],
  [/\bdemarrage/gi, (m) => m.replace(/demarrage/i, "démarrage")],
  [/\bdemarrer/gi, (m) => m.replace(/demarrer/i, "démarrer")],
  // è
  [/\bcritere/gi, (m) => m.replace(/critere/i, "critère")],
  [/\bcriteres/gi, (m) => m.replace(/criteres/i, "critères")],
  [/\bsalaire/g, "salaire"], // already correct
  // ê
  [/\bmeme/gi, (m) => m.replace(/\bmeme\b/i, "même")],
  [/\benquete/gi, (m) => m.replace(/enquete/i, "enquête")],
  [/\betre/gi, (m) => m.replace(/\betre\b/i, "être")],
  // à
  [/\ba partir/gi, "à partir"],
  [/\ba votre/gi, "à votre"],
  [/\ba la/gi, "à la"],
  [/\ba un/gi, "à un"],
  // ô
  [/\bcout /gi, "coût "],
  [/\bcouts/gi, "coûts"],
  [/\brole/gi, (m) => m.replace(/\brole\b/i, "rôle")],
  [/\bcontrole/gi, (m) => m.replace(/controle/i, "contrôle")],
  // ç
  [/\bfrancais/gi, (m) => m.replace(/francais/i, "français")],
  [/\bfacon/gi, (m) => m.replace(/facon/i, "façon")],
  // û
  [/\bsuperieur/gi, (m) => m.replace(/superieur/i, "supérieur")],
];

function fixAccents(content) {
  // Don't fix inside HTML tags or attributes
  // Split by tags, only fix text content
  return content.replace(/>([\s\S]*?)</g, (match, text) => {
    let fixed = text;
    for (const [pattern, replacement] of accentFixes) {
      if (typeof replacement === "string") {
        fixed = fixed.replace(pattern, replacement);
      } else {
        fixed = fixed.replace(pattern, replacement);
      }
    }
    return `>${fixed}<`;
  });
}

function addCoverElements(content) {
  // Add cover-grid, cover-line, cover-bottom if missing
  if (content.includes("cover-grid")) return content;

  // Add after <div class="cover">
  content = content.replace(
    /<div class="cover">/,
    `<div class="cover">
    <div class="cover-grid"></div>
    <div class="cover-line"></div>`
  );

  // Add cover-bottom before </div> closing cover
  content = content.replace(
    /(<\/div>\s*\n\s*<!--\s*CONTENT\s*-->)/i,
    `    <div class="cover-bottom">rocket4rpo.com — Document confidentiel</div>
  </div>

  <!-- CONTENT -->`
  );

  // If that didn't work, try simpler pattern
  if (!content.includes("cover-bottom")) {
    content = content.replace(
      /(cover-meta[\s\S]*?<\/div>\s*\n\s*<\/div>)/,
      `$1\n    <div class="cover-bottom">rocket4rpo.com — Document confidentiel</div>`
    );
  }

  return content;
}

// Process all files
const files = fs.readdirSync(DIR).filter(f => f.endsWith(".html") && f !== "moodboard-design.html");
let totalFixes = 0;

for (const file of files) {
  const filepath = path.join(DIR, file);
  let content = fs.readFileSync(filepath, "utf-8");
  const original = content;

  // Fix accents
  content = fixAccents(content);

  // Add cover visual elements
  content = addCoverElements(content);

  if (content !== original) {
    fs.writeFileSync(filepath, content, "utf-8");
    const diff = original.length !== content.length ? `(${content.length - original.length > 0 ? "+" : ""}${content.length - original.length} chars)` : "(modified)";
    console.log(`✓ Fixed: ${file} ${diff}`);
    totalFixes++;
  } else {
    console.log(`  Skip: ${file} (no changes needed)`);
  }
}

console.log(`\nDone! Fixed ${totalFixes}/${files.length} files`);

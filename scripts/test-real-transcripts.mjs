// Test sur de vraies transcriptions brutes (style Fireflies/Modjo)
// Vérifie que l'auto-scoring reste robuste sans format structuré explicite

const ANTHONY_REAL = `Théophile Choupin à 00:12

Bonjour ! Tu vas bien ? Tu connais un peu Rocket ?

Anthony Oudot à 00:30

Ouais, je viens de regarder, je connaissais pas, j'ai regardé avant l'entretien.
Du coup, là, j'imagine que c'est pour la branche RPO. Vous avez lancé une activité
RPO ? Ok très clair. Et vous êtes sur Lyon, c'est ça ?

Anthony Oudot à 04:00

Pour te faire une petite présentation rapide de ce qui nous intéresse, moi ça
fait 10 ans que je fais du recrutement. J'ai commencé à Londres, un petit peu à
l'ancienne, où là on faisait vraiment, tu vois, on avait un portefeuille à
développer, on faisait le sales, le business développement.

J'ai 34 ans. Je suis sur Paris 16. Mon TJM, je suis à 550 euros au jour chez eux.
Full remote, ça me va aussi.

Ensuite, je suis allé en CDI chez Excelsior. Donc là, chez Excelsior, j'étais
Head of Talent Acquisition. J'ai mis en place tout le pôle. J'ai monté l'équipe
de recruteurs.

Je me suis mis à mon compte en RPO en septembre. J'ai recruté des Account
Executive, des Account Manager, des SDR / BDR, des Sales Manager et quelques VP
Sales. Stack : Talent Link, Smart Recruiter, Hello Work, CV Library, Sales
Navigator, LinkedIn Recruiter. Apollo aussi pour la chasse.

J'ai bossé chez Publicis Media, intégration LVMH. Mes clients : grand groupe
LVMH, Accor.

Au niveau anglais, je suis bilingue (10 ans à Londres). Espagnol notions.

Je suis ouvert au CDI si c'est une belle boîte.
`;

console.log("=== TEST TRANSCRIPTION RÉELLE — Anthony Oudot ===\n");

function splitTranscript(text) {
  const speakerPattern = /^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm;
  const matches = [...text.matchAll(speakerPattern)];
  if (matches.length < 2) return { candidate: text, hasSpeakers: false, recruiterRatio: 0 };
  const parts = text.split(speakerPattern);
  const segs = []; let theoLen = 0, candLen = 0;
  for (let i = 1; i < parts.length; i += 2) {
    const speaker = (parts[i] || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const content = (parts[i + 1] || "").trim();
    if (speaker.includes("theophile") || speaker.startsWith("theo ")) theoLen += content.length;
    else { segs.push(content); candLen += content.length; }
  }
  return { candidate: segs.join("\n\n").trim() || text, hasSpeakers: true, recruiterRatio: theoLen / (theoLen + candLen) };
}

function extractIdentity(text) {
  const out = { languages: [], tools: [], methodologies: [], companies: [] };
  const e = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/); if (e) out.email = e[0].trim();
  const p = text.match(/(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}/); if (p) out.phone = p[0].replace(/\s+/g, " ").trim();
  let tjmValue;
  const t1 = text.match(/(\d{3,4})\s*(?:€|eur|euros?)?\s*[/\\-]?\s*j(?:our|\b)/i); if (t1) tjmValue = t1[1];
  if (!tjmValue) { const t2 = text.match(/(?:tjm|tarif\s+journalier|euros?\s+au\s+jour)[^0-9€]{0,30}(\d{3,4})/i); if (t2) tjmValue = t2[1]; }
  if (!tjmValue) { const t3 = text.match(/(\d{3,4})\s*euros?\s+au\s+jour/i); if (t3) tjmValue = t3[1]; }
  if (tjmValue) out.tjm = `${tjmValue} €/j`;
  const villes = ["Paris", "Lyon", "Londres", "Bordeaux"];
  for (const v of villes) if (new RegExp(`\\b${v}\\b`, "i").test(text)) { out.loc = v; break; }
  const sm = [...text.matchAll(/^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm)];
  for (const m of sm) {
    const name = m[1].trim();
    const norm = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!norm.includes("theo")) {
      const parts = name.split(/\s+/);
      if (parts.length >= 2) { out.prenom = parts[0]; out.nom = parts.slice(1).join(" "); break; }
    }
  }
  const am = text.match(/j['']ai\s+(\d{2})\s+ans\b(?!\s+(?:d['']|de\s+))/i);
  if (am) { const a = parseInt(am[1]); if (a >= 18 && a <= 75) out.age = `${a} ans`; }
  const yp = [/(\d{1,2})\s+ans?\s+d['']exp/i, /ca\s+fait\s+(\d{1,2})\s+ans?/i, /depuis\s+(\d{1,2})\s+an/i];
  let yE = null;
  for (const r of yp) { const m = text.match(r); if (m) { const n = parseInt(m[1]); if (n >= 1 && n <= 40 && (yE === null || n > yE)) yE = n; } }
  if (yE) out.yearsExperience = `${yE} ans`;
  return out;
}

function parseStructured(text) {
  const out = { qualifRecruitedTypes: [], languagesSpoken: [] };
  // Profil
  const pm = text.match(/profil(?:\s+de\s+recruteur)?\s*:\s*(g[eé]n[eé]raliste|sales|it)\b/i);
  if (pm) {
    const p = pm[1].toLowerCase();
    if (p === "sales") out.qualifProfile = "Sales";
    else if (p === "it") out.qualifProfile = "IT";
    else out.qualifProfile = "Généraliste";
  }
  // Recruited types
  const types = ["SDR / BDR", "Account Executive", "Account Manager", "Sales Manager", "VP Sales", "CRO", "Sales Engineer", "Pre-Sales / Solutions", "Customer Success"];
  for (const t of types) {
    const re = new RegExp(`\\b${t.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) out.qualifRecruitedTypes.push(t);
  }
  // CDI
  if (/ouvert[e]?\s+au\s+c?di/i.test(text)) out.openCddCdi = true;
  // Langues
  const langs = ["Français", "Anglais", "Espagnol"];
  const lvlMap = [
    { re: /natif/i, level: "Natif" },
    { re: /bilingue/i, level: "Bilingue" },
    { re: /c1|c2|courant/i, level: "Courant (C1-C2)" },
    { re: /op[eé]rationnel|b2/i, level: "Opérationnel (B2)" },
    { re: /b1|interm/i, level: "Intermédiaire (B1)" },
    { re: /notion/i, level: "Notions" },
  ];
  const norm = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const lang of langs) {
    const ln = lang.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const re = new RegExp(`\\b${ln}\\b`, "i");
    const m = re.exec(norm);
    if (m) {
      const startIdx = m.index + ln.length;
      const remaining = norm.slice(startIdx, Math.min(norm.length, startIdx + 60));
      const stopRe = /[,.;]|\b(francai|anglai|espagnol|allemand|italien|portugai|neerlandai|arabe|chinoi|russe)\b/i;
      const sm = stopRe.exec(remaining);
      const window = sm ? remaining.slice(0, sm.index) : remaining.slice(0, 50);
      let level = "";
      for (const lvl of lvlMap) if (lvl.re.test(window)) { level = lvl.level; break; }
      out.languagesSpoken.push({ lang, level });
    }
  }
  return out;
}

const split = splitTranscript(ANTHONY_REAL);
console.log("Split — recruiter ratio:", (split.recruiterRatio * 100).toFixed(1) + "%");
console.log("Candidate length:", split.candidate.length);

const id = extractIdentity(ANTHONY_REAL);
console.log("\nIdentity :", JSON.stringify(id, null, 2));

const struct = parseStructured(ANTHONY_REAL);
console.log("\nStructured :", JSON.stringify(struct, null, 2));

console.log("\n━━━ AUDIT ━━━");
const checks = [
  ["Prénom", id.prenom, "Anthony"],
  ["Nom", id.nom, "Oudot"],
  ["Phone", id.phone, "no need"],
  ["TJM", id.tjm, "550 €/j"],
  ["Localisation", id.loc, "Paris"],
  ["Âge", id.age, "34 ans"],
  ["Années exp", id.yearsExperience, "10 ans"],
  ["Anglais Bilingue", struct.languagesSpoken.find(l => l.lang === "Anglais")?.level, "Bilingue"],
  ["Espagnol Notions", struct.languagesSpoken.find(l => l.lang === "Espagnol")?.level, "Notions"],
  ["Recruited types", struct.qualifRecruitedTypes.length, "≥3"],
  ["Ouvert CDI", struct.openCddCdi, true],
];

let pass = 0, fail = 0;
for (const [name, got, expected] of checks) {
  const ok = expected === "no need" ? !!got
    : expected === "≥3" ? got >= 3
    : got === expected;
  if (ok) { pass++; console.log(`  ✅ ${name.padEnd(20)} ${String(got).padEnd(30)}`); }
  else { fail++; console.log(`  ❌ ${name.padEnd(20)} got: ${String(got).padEnd(30)} expected: ${expected}`); }
}
console.log(`\n${pass}/${pass + fail} (${Math.round(pass / (pass + fail) * 100)}%)`);

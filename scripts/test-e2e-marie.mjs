// Test e2e exhaustif : simule autoScore() complet sur le sample Marie Dupont
// du prompt v2 et vérifie que TOUS les champs du form sont correctement remplis.

const FULL_SAMPLE = `Marie Dupont à 00:00

Je m'appelle Marie Dupont. Mon email c'est marie.dupont@gmail.com, mon
téléphone +33 6 12 34 56 78. Mon LinkedIn : linkedin.com/in/marie-dupont-r.
J'ai 34 ans, je suis basée à Paris. Je parle français (natif), anglais
courant (C1), espagnol bilingue, italien notions.

Actuellement je suis en freelance à mon compte depuis 3 ans. Mon TJM est à
650 €/j, je prends entre 500 et 700 €/j selon le contexte. Je suis ouverte
au CDI si c'est une belle boîte avec un projet fort — les deux m'intéressent
en fait.

Profil de recruteur : Sales. Niveau Senior (6-10 ans). J'ai 10 ans
d'expérience dans le recrutement, dont 8 ans focalisés Sales et Revenue.
J'ai recruté des SDR / BDR, des Account Executive, des Account Manager, des
Sales Manager, des VP Sales, et quelques CRO et Sales Engineer.

Contexte : cycle de vente Enterprise (cycle long), taille contrats
Enterprise (500K+ ARR), modèle business SaaS B2B principalement, avec un
peu de Marketplace. Géographie Europe (DACH/UK/Nordics) en majorité, avec
du US. J'ai travaillé chez Doctolib 6 mois en embedded, puis chez Aircall
et Back Market. Mes clients actuels : Qonto et Spendesk.

[Critère 01 — Sourcing & identification]
Je fais 20 approches directes par semaine via Sales Navigator et Apollo,
en booléen avancé multicanal. Je source aussi sur GitHub pour les Sales
Engineer et via cooptation sur mon réseau de 9000 contacts LinkedIn. Mon
pipeline sourcing est automatisé avec Lemlist et La Growth Machine. Taux
de retour moyen : 22%.

[Critère 02 — Qualification candidat]
J'ai une grille de scorecard structurée pour chaque poste. Je fais un
brief avec le hiring manager pour la calibration, puis je passe les
candidats en entretien structuré avec fit culturel et soft skills.
Pour les profils Sales Engineer, je propose un case study mise en
situation.

[Critère 03 — Outils & stack]
Stack complète : Greenhouse ATS configuré par mes soins, Sales Navigator
avancé, LinkedIn Recruiter niveau expert. Automation avec Lemlist et
La Growth Machine. Intégrations Zapier avec HubSpot CRM. Je paramètre
moi-même les workflows. Je teste aussi Modjo pour le suivi des calls.

[Critère 04 — Autonomie & ownership]
Complètement autonome, je prends des décisions sans supervision. Je fais
du pushback quand un HM me donne un brief flou. J'ai refusé 2 missions
cette année parce que la cible n'était pas réaliste. Je démontre mon
autonomie au quotidien.

[Critère 05 — Pilotage & KPIs]
TTF moyen 24 jours sur mes 12 derniers mois, taux d'acceptation à 89%,
ratio CV présentés / closing à 4,2. Dashboard maintenu en continu avec
reporting hebdo data-driven pour mon client. J'ai closé 35 postes en
2025. Objectif toujours atteint.

[Critère 06 — Closing & négo]
Closing sous 7 jours en moyenne. J'ai géré 5 contre-offres employeur
cette année, dont 4 candidats signés grâce à une négo package sur
équité + variable. Posture conseil auprès du hiring manager.

[Critère 07 — Storytelling & exemples]
Mon meilleur recrutement : VP Sales chez Aircall, brief en janvier,
closing en 18 jours, package 140K + équité. Step by step : mapping de
50 profils, 12 approchés, 4 qualifiés, 2 présentés, signature.
J'ai aussi eu un échec marquant — un CTO qui a refusé l'offre, j'ai
appris à verrouiller les critères dès le brief.

[Critère 08 — Expérience RPO/embedded]
J'ai fait 2 missions RPO embedded : 6 mois chez Doctolib, 4 mois chez
Aircall. Je comprends bien la différence entre un cabinet de recrutement
classique et le modèle RPO — côté RPO, je suis intégrée dans l'équipe
du client, plug and play dès le J1. Mon onboarding client type :
immersion 5 jours (brief stakeholders, découverte outils, mapping
backlog, alignement process).

[Ressenti]
Mon ressenti : Intelligence Fort — raisonnement clair, exemples concrets,
connecte bien les sujets. Motivation Exceptionnel — vraiment hungry, drive
palpable, vision 3 ans articulée. Sympathie Fort — chaleureuse, écoute
active, bon feeling.

[Forces détectées]
Sourcing proactif fort, chiffres précis spontanés, autonomie démontrée
(a son compte, refuse des missions), closing efficace, fit RPO évident
(embedded chez Doctolib et Aircall), fort réseau mobilisable (9000
contacts), deliverer (objectif toujours atteint), expérience en top
boîte (Doctolib), bilingue espagnol.

[Profil recruté détecté]
Sales, International.

[Type de boîte]
Scale-up (50-300p), SaaS / Tech produit, RPO / Recrutement.

[Mobilité & dispo]
Full remote préféré, Paris 2 jours par semaine OK. Disponibilité
Court-terme (préavis 3 semaines).

[Notes libres]
- Creuser la relation avec Qonto (mission en cours, dates fin)
- Vérifier niveau espagnol réel (elle dit bilingue, à tester sur un
  profil espagnol)
- Lui proposer la mission X chez Payfit dès dispo
- Très bon feeling, à pousser en priorité

[Verdict]
Sales Senior expérimenté top 5%, RPO-ready, bilingue — pousser en priorité
sur missions SaaS B2B.
`;

console.log("=== AUDIT EXHAUSTIF parseStructuredSummary v20 ===");
console.log(`Texte source : ${FULL_SAMPLE.length} caractères\n`);

// ─── Reproduction de splitTranscript ───
function splitTranscript(text) {
  const speakerPattern = /^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm;
  const matches = [...text.matchAll(speakerPattern)];
  if (matches.length < 2) {
    return { candidate: text, full: text, hasSpeakers: matches.length === 1, recruiterRatio: 0 };
  }
  const parts = text.split(speakerPattern);
  const segs = [];
  let theoLen = 0, candLen = 0;
  for (let i = 1; i < parts.length; i += 2) {
    const speaker = (parts[i] || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const content = (parts[i + 1] || "").trim();
    if (speaker.includes("theophile") || speaker.startsWith("theo ")) theoLen += content.length;
    else { segs.push(content); candLen += content.length; }
  }
  return { candidate: segs.join("\n\n").trim() || text, full: text, hasSpeakers: true, recruiterRatio: theoLen / (theoLen + candLen) };
}

// ─── Reproduction extractIdentity ───
function extractIdentity(text) {
  const out = { languages: [], tools: [], methodologies: [], companies: [] };
  const e = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/);
  if (e) out.email = e[0].trim();
  const p = text.match(/(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}/);
  if (p) out.phone = p[0].replace(/\s+/g, " ").trim();
  const li = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w\-À-ÿ]+\/?/i);
  if (li) out.linkedin = li[0].trim();
  let tjmValue;
  const t1 = text.match(/(\d{3,4})\s*(?:€|eur|euros?)?\s*[/\\-]?\s*j(?:our|\b)/i);
  if (t1) tjmValue = t1[1];
  if (!tjmValue) {
    const t2 = text.match(/(?:tjm|tarif\s+journalier)[^0-9€]{0,30}(\d{3,4})/i);
    if (t2) tjmValue = t2[1];
  }
  if (tjmValue) out.tjm = `${tjmValue} €/j`;
  const tjmRange = text.match(/entre\s+(\d{3,4})\s+et\s+(\d{3,4})|(\d{3,4})\s*[-à]\s*(\d{3,4})\s*(?:€|eur|euros)?\s*(?:\/|par|au)\s*j/i);
  if (tjmRange) {
    const min = tjmRange[1] || tjmRange[3];
    const max = tjmRange[2] || tjmRange[4];
    if (min && max) {
      if (!out.tjm) out.tjm = `${min} €/j`;
      out.tjmMax = `${max} €/j`;
    }
  }
  // Loc
  const villes = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Lille", "Nice", "Annecy"];
  for (const v of villes) {
    if (new RegExp(`\\b${v}\\b`, "i").test(text)) { out.loc = v; break; }
  }
  // Name
  const sm = [...text.matchAll(/^(.+?)\s+à\s+\d{1,2}:\d{2}\s*$/gm)];
  for (const m of sm) {
    const name = m[1].trim();
    const norm = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!norm.includes("theo")) {
      const parts = name.split(/\s+/);
      if (parts.length >= 2) { out.prenom = parts[0]; out.nom = parts.slice(1).join(" "); break; }
    }
  }
  // Age
  const am = text.match(/j['']ai\s+(\d{2})\s+ans\b(?!\s+(?:d['']|de\s+))/i);
  if (am) { const a = parseInt(am[1]); if (a >= 18 && a <= 75) out.age = `${a} ans`; }
  // Years exp
  const yp = [/(\d{1,2})\s+ans?\s+d['']exp/i, /ca\s+fait\s+(\d{1,2})\s+ans?/i, /depuis\s+(\d{1,2})\s+an/i];
  let yE = null;
  for (const r of yp) {
    const m = text.match(r);
    if (m) { const n = parseInt(m[1]); if (n >= 1 && n <= 40 && (yE === null || n > yE)) yE = n; }
  }
  if (yE) out.yearsExperience = `${yE} ans`;
  return out;
}

// ─── Reproduction parseStructuredSummary ───
function parseStructuredSummary(text) {
  const out = {
    qualifRecruitedTypes: [], qualifContext: {}, languagesSpoken: [],
    explicitProfileTypes: [], explicitCompanyTypes: [],
    explicitForces: [], explicitRisks: [],
  };

  // Profile
  const pm = text.match(/profil(?:\s+de\s+recruteur)?\s*:\s*(g[eé]n[eé]raliste|sales|it)\b/i);
  if (pm) {
    const p = pm[1].toLowerCase();
    if (p.includes("g") && p.includes("n")) out.qualifProfile = "Généraliste";
    else if (p === "sales") out.qualifProfile = "Sales";
    else if (p === "it") out.qualifProfile = "IT";
  }

  // Level
  const lp = [
    { re: /\bexpert\s*\(10\+\s*an/i, value: "Expert (10+ ans)" },
    { re: /\bsenior\s*\(6-10\s*an/i, value: "Senior (6-10 ans)" },
    { re: /\bmid\s*\(3-5\s*an/i, value: "Mid (3-5 ans)" },
    { re: /\bniveau\s+junior\b|\bjunior\s*\(0-2\s*an/i, value: "Junior" },
  ];
  for (const p of lp) if (p.re.test(text)) { out.qualifLevel = p.value; break; }

  // Recruited types
  const types = [
    "SDR / BDR", "Account Executive", "Account Manager", "Sales Manager",
    "VP Sales", "CRO", "Sales Engineer", "Pre-Sales / Solutions",
    "Customer Success", "Business Developer",
    "Dev front", "Dev back", "Fullstack", "DevOps / SRE",
    "Data Engineer", "Data Scientist / ML", "Engineering Manager",
    "CTO / VP Eng", "Product Manager", "Product Designer",
    "Cybersécurité", "Mobile (iOS/Android)",
    "Finance / Comptabilité", "RH / People", "Marketing / Communication",
    "Direction / C-level", "Ops / Administratif", "Legal / Juridique",
  ];
  const found = new Set();
  for (const t of types) {
    const re = new RegExp(`\\b${t.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) found.add(t);
  }
  out.qualifRecruitedTypes = Array.from(found);

  // Levels I/M/S
  const levelWords = ["Faible", "Moyen", "Fort", "Exceptionnel"];
  function findLevel(dim) {
    const re1 = new RegExp(`${dim}\\s*(?::|—|-)?\\s*(${levelWords.join("|")})\\b`, "i");
    const m = text.match(re1);
    if (m) return levelWords.find((l) => l.toLowerCase() === m[1].toLowerCase());
    return undefined;
  }
  out.intelligenceLevel = findLevel("Intelligence");
  out.motivationLevel = findLevel("Motivation");
  out.sympathyLevel = findLevel("Sympathie");

  // Languages avec fenêtre intelligente
  const langs = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais"];
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

  // [Profil recruté détecté]
  const psm = text.match(/\[\s*Profil\s+recrut[eé]\s+d[eé]tect[eé]\s*\]\s*[:\n]?([^[\n]+)/i);
  if (psm) {
    const sec = psm[1];
    const presets = ["Sales", "Tech", "Data & ML", "Product & Design", "Marketing",
      "Customer Success", "Ops / RevOps", "Finance", "Direction / C-level", "International"];
    for (const tag of presets) {
      const re = new RegExp(`\\b${tag.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
      if (re.test(sec)) out.explicitProfileTypes.push(tag);
    }
  }

  // [Type de boîte]
  const csm = text.match(/\[\s*Type\s+de\s+bo[iî]te\s*\]\s*[:\n]?([^[\n]+)/i);
  if (csm) {
    const sec = csm[1];
    const presets = ["Startup (<50p)", "Scale-up (50-300p)", "Licorne / 300+p",
      "ETI / Grand groupe", "SaaS / Tech produit", "Services / Conseil / ESN", "RPO / Recrutement"];
    for (const tag of presets) {
      const re = new RegExp(`\\b${tag.replace(/[.&+*?^$()[\]{}|\\/-]/g, "\\$&")}\\b`, "i");
      if (re.test(sec)) out.explicitCompanyTypes.push(tag);
    }
  }

  // [Forces détectées]
  const fsm = text.match(/\[\s*Forces\s+d[eé]tect[eé]e?s?\s*\]\s*[:\n]?([\s\S]*?)(?=\[|\n\s*\n|$)/i);
  if (fsm) {
    const sec = fsm[1];
    const forces = [
      "Sourcing proactif fort", "Chiffres précis spontanés", "Autonomie démontrée",
      "Closing efficace", "Fit RPO évident", "Management d'équipe",
      "Leadership TA senior", "Profil élite", "Fort réseau mobilisable",
      "Structurateur de process", "Fort volume de placement",
      "Deliverer (atteint ses KPI)", "Expérience en top boîte",
      "Bilingue / profil international", "Senior 15+ ans", "Expertise executive search",
    ];
    for (const f of forces) {
      const core = f.toLowerCase().split(/[()/'-]/)[0].trim();
      if (core.length > 3 && sec.toLowerCase().includes(core)) out.explicitForces.push(f);
    }
  }

  // Mobilité
  if (/full\s*remote|100\s*%\s*t[eé]l[eé]travail|full\s*t[eé]l[eé]travail/i.test(text)) {
    out.explicitMobility = "Full remote";
  } else if (/hybride|mix\s*bureau|2\s+jours\s+sur\s+place|3\s+jours\s+sur\s+place|2-3\s+jours/i.test(text)) {
    out.explicitMobility = "Hybride";
  }

  // Dispo
  if (/imm[eé]diate|asap|d[eè]s\s+maintenant/i.test(text)) {
    out.explicitAvailability = "Immédiate";
  } else if (/court[\s-]terme|sous\s+(?:une?\s+semaine|2\s+semaines|15\s+jours)|pr[eé]avis\s+(?:court|\d+\s+semaines?)/i.test(text)) {
    out.explicitAvailability = "Court-terme (<1 mois)";
  }

  // CDD/CDI
  if (/ouvert[e]?\s+au\s+c?di|les\s+deux\s+m['']int[eé]ressent/i.test(text)) {
    out.openCddCdi = true;
  } else if (/uniquement\s+freelance|que\s+du\s+freelance/i.test(text)) {
    out.openCddCdi = false;
  }

  return out;
}

// ─── EXÉCUTION ───
const split = splitTranscript(FULL_SAMPLE);
const identity = extractIdentity(FULL_SAMPLE);
const struct = parseStructuredSummary(FULL_SAMPLE);

console.log("━━━ SPLIT TRANSCRIPT ━━━");
console.log(`hasSpeakers: ${split.hasSpeakers}`);
console.log(`recruiterRatio: ${(split.recruiterRatio * 100).toFixed(1)}%`);
console.log(`candidate length: ${split.candidate.length} / ${split.full.length}`);

console.log("\n━━━ IDENTITY ━━━");
console.log(JSON.stringify(identity, null, 2));

console.log("\n━━━ STRUCTURED PARSE ━━━");
console.log("qualifProfile:", struct.qualifProfile);
console.log("qualifLevel:", struct.qualifLevel);
console.log("qualifRecruitedTypes:", struct.qualifRecruitedTypes);
console.log("intelligenceLevel:", struct.intelligenceLevel);
console.log("motivationLevel:", struct.motivationLevel);
console.log("sympathyLevel:", struct.sympathyLevel);
console.log("languagesSpoken:", struct.languagesSpoken);
console.log("explicitProfileTypes:", struct.explicitProfileTypes);
console.log("explicitCompanyTypes:", struct.explicitCompanyTypes);
console.log("explicitForces:", struct.explicitForces);
console.log("explicitMobility:", struct.explicitMobility);
console.log("explicitAvailability:", struct.explicitAvailability);
console.log("openCddCdi:", struct.openCddCdi);

console.log("\n━━━ AUDIT — CHAMPS DU FORM ━━━");
const checks = [
  ["Prénom", identity.prenom, "Marie"],
  ["Nom", identity.nom, "Dupont"],
  ["Email", identity.email, "marie.dupont@gmail.com"],
  ["Phone", identity.phone, "+33 6 12 34 56 78"],
  ["LinkedIn", identity.linkedin, "linkedin.com/in/marie-dupont-r"],
  ["Localisation", identity.loc, "Paris"],
  ["Âge", identity.age, "34 ans"],
  ["Années exp", identity.yearsExperience, "10 ans"],
  ["TJM", identity.tjm, "650 €/j"],
  ["TJM Max", identity.tjmMax, "700 €/j"],
  ["Langues count", struct.languagesSpoken.length, "≥4"],
  ["Français Natif", struct.languagesSpoken.find(l => l.lang === "Français")?.level, "Natif"],
  ["Anglais Courant", struct.languagesSpoken.find(l => l.lang === "Anglais")?.level, "Courant (C1-C2)"],
  ["Espagnol Bilingue", struct.languagesSpoken.find(l => l.lang === "Espagnol")?.level, "Bilingue"],
  ["Italien Notions", struct.languagesSpoken.find(l => l.lang === "Italien")?.level, "Notions"],
  ["Ouvert CDI", struct.openCddCdi, true],
  ["Qualif Profile", struct.qualifProfile, "Sales"],
  ["Qualif Level", struct.qualifLevel, "Senior (6-10 ans)"],
  ["Recruited types count", struct.qualifRecruitedTypes.length, "≥7"],
  ["Intelligence", struct.intelligenceLevel, "Fort"],
  ["Motivation", struct.motivationLevel, "Exceptionnel"],
  ["Sympathie", struct.sympathyLevel, "Fort"],
  ["Profile types explicit", struct.explicitProfileTypes.length, "≥2"],
  ["Company types explicit", struct.explicitCompanyTypes.length, "≥2"],
  ["Forces explicit", struct.explicitForces.length, "≥5"],
  ["Mobilité", struct.explicitMobility, "Full remote"],
  ["Disponibilité", struct.explicitAvailability, "Court-terme (<1 mois)"],
];

let pass = 0, fail = 0;
for (const [name, got, expected] of checks) {
  const ok = expected === "≥4" ? got >= 4
    : expected === "≥7" ? got >= 7
    : expected === "≥5" ? got >= 5
    : expected === "≥2" ? got >= 2
    : got === expected;
  if (ok) {
    pass++;
    console.log(`  ✅ ${name.padEnd(25)} ${String(got).padEnd(30)}`);
  } else {
    fail++;
    console.log(`  ❌ ${name.padEnd(25)} got: ${String(got).padEnd(30)} expected: ${expected}`);
  }
}

console.log(`\n━━━ RÉSULTAT : ${pass}/${pass + fail} (${Math.round((pass / (pass + fail)) * 100)}%) ━━━`);

// Test rapide de calibration de autoScore v17 sur transcriptions réelles
// Usage : node scripts/test-autoscore.mjs

function normalize(text) {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:!?()[\]{}"'`]/g, " ")
    .replace(/\b(\w{4,})s\b/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return ` ${normalized} `;
}

const CONTRAT_DETECTION = [
  { label: "TJM Freelance", keywords: [" freelance ", " independant ", " independante ", "a mon compte", "a mon propre compte", "mon propre compte", "auto-entrepreneur", "auto entrepreneur", " tjm ", " t j m ", "tarif journalier", "taux journalier", " tgm ", " t g m ", "ma societe", " ma boite ", " mon cabinet ", "en freelance", "en independ", "portage salarial", "je suis en mission", "euros au jour", "euros par jour", "€/j", "euros la journee", "a la journee", "ma structure", "tarif de"] },
  { label: "CDI", keywords: ["je suis en cdi", "je suis salarie", "je suis salariee", "en poste chez", "salarie en interne", "en interne chez", "ma derniere experience en cdi", "mon cdi"] },
  { label: "CDD", keywords: ["je suis en cdd", "contrat a duree determinee", "cdd de"] },
];

const PROFILE_TYPES_DETECTION = {
  "Sales": [" sales ", " commercial ", " commerciale ", " sdr ", " bdr ", "account executive", "account manager", "business developer", "vp sales", " cro ", "ingenieur commercial", "inside sales", "sales manager", "sales engineer", "profil sales"],
  "Tech": [" tech ", " dev ", " devs ", " it ", "developpeur", "dev front", "dev back", "fullstack", "full stack", "devops", " sre ", "cybersecurite", "ingenieur logiciel", "ingenieur systeme", "ingenieur reseau", "j2ee", "javascript", " java ", " python ", " linux ", "embarque", "infrastructure", "back-end", "front-end", " qa ", "software engineering", " sde "],
  "Data & ML": ["data analyst", "data scientist", "data engineer", "data manager", "machine learning", " dba ", "intelligence artificielle", "data science", "analyst data", " data ", " ia ", " ml "],
  "Product & Design": ["product manager", "product owner", "product designer", " ux ", " ui ", " cpo ", "head of product", "directeur produit", "chef de produit", " po ", " pm "],
  "Marketing": [" growth ", " cmo ", " seo ", " sea ", "content manager", "brand manager", "growth marketing", "acquisition paye", "marketing digital", "marketing produit", "marketing operationnel", "inbound marketing", "outbound marketing"],
  "Customer Success": ["customer success", " csm ", "pre-sales", "presales", "solutions engineer", "pre sales"],
  "Ops / RevOps": [" revops ", " salesops ", "people ops", "operations manager", "operations engineer"],
  "Finance": [" daf ", " cfo ", "controleur de gestion", "controleur gestion", " fp&a ", "compliance", "conformite", "controlling", " finance ", " financier ", " financiere "],
  "Direction / C-level": ["c-level", " ceo ", " cto ", " coo ", " vp ", "head of", " director ", " directeur ", " directrice ", " founder ", " cofounder ", " co-founder ", "cofondateur", "cofondatrice", "top management", "middle management", "executive search", "comite de direction", " comex ", "hiring manager", " drh "],
  "International": ["international", "cross-border", "cross border", " uk ", " dach ", "nordics", " usa ", "etats-unis", "royaume-uni", "continent africain", " afrique ", " chine ", " inde ", "expatriation", "multilingue", "bilingue", " anglais ", "angleterre", " londres ", "luxembourg", "benelux", " europe ", "marche americain", "marche us"],
};

const COMPANY_TYPES_DETECTION = {
  "Startup (<50p)": [" startup ", " startups ", "start-up", "start up", " seed ", "pre-seed", "pre seed", "early stage", "jeune pousse", "amorcage"],
  "Scale-up (50-300p)": ["scale-up", "scale up", " scaleup ", "serie a", "serie b", "levee de fonds", "levee de fond", "post-levee", "post levee", "hyper-croissance", "hyper croissance"],
  "Licorne / 300+p": [" licorne ", " unicorn ", "serie c", "serie d", "post-ipo"],
  "ETI / Grand groupe": ["grand groupe", "grand compte", "grands groupe", " corporate ", " eti ", "groupe cote", "cote en bourse", "bourse de paris", "multinationale", "entreprise familiale", " lvmh ", " amazon ", " adobe ", " accor ", " publicis ", " allianz ", " alstom ", " roquette ", " capgemini ", " microsoft ", " google ", " oracle ", " bnp ", " orange "],
  "SaaS / Tech produit": [" saas ", "editeur de logiciel", "editeur logiciel", "editeur de logiciels", " software ", "produit software", "plateforme saas", "entreprise tech"],
  "Services / Conseil / ESN": [" esn ", " ss2i ", " ssii ", "societe de service", "societe de conseil", "cabinet de conseil", " consulting ", "prestation de service", "assistance technique", " sopra ", " accenture "],
  "RPO / Recrutement": [" rpo ", "cabinet de recrutement", "chasse de tete", "executive search", "mission rpo", "modele rpo", "cabinet recrutement", "cabinet de chasse", "boutique de recrutement"],
};

function detectContrat(normalized) {
  const matches = new Set();
  for (const { label, keywords } of CONTRAT_DETECTION) {
    for (const kw of keywords) {
      if (normalized.includes(normalize(kw))) {
        matches.add(label);
        break;
      }
    }
  }
  if (matches.has("TJM Freelance") && matches.has("CDI")) return "Les deux";
  if (matches.has("TJM Freelance")) return "TJM Freelance";
  if (matches.has("CDI")) return "CDI";
  if (matches.has("CDD")) return "CDD";
  return undefined;
}

function detectMultiSelect(normalized, keywordMap) {
  const detected = [];
  for (const [tag, keywords] of Object.entries(keywordMap)) {
    for (const kw of keywords) {
      if (normalized.includes(normalize(kw))) {
        detected.push(tag);
        break;
      }
    }
  }
  return detected;
}

function testTranscript(name, text) {
  const normalized = normalize(text);
  const contrat = detectContrat(normalized);
  const profileTypes = detectMultiSelect(normalized, PROFILE_TYPES_DETECTION);
  const companyTypes = detectMultiSelect(normalized, COMPANY_TYPES_DETECTION);

  console.log(`\n=== ${name} ===`);
  console.log(`Contrat: ${contrat || "—"}`);
  console.log(`ProfileTypes (${profileTypes.length}): ${profileTypes.join(", ") || "—"}`);
  console.log(`CompanyTypes (${companyTypes.length}): ${companyTypes.join(", ") || "—"}`);
}

// Florence (IT freelance senior)
const florence = `Vous êtes un site spécialisé, enfin un cabinet de recrutement spécialisé dans les talents d'acquisition de manager, c'est ça ? Alors, on fait un peu les deux. Je me suis lancée en auto-entrepreneur. Donc le fil rouge de mon profil, j'aime mon métier, j'aime le recrutement. Je suis partie comme si c'était mon cabinet de conseil. J'avais mon cabinet, j'ai commencé en auto-entrepreneur. J'ai créé une équipe, donc j'ai recruté une centaine d'ingénieurs études et développement, DBA, le domaine du web. J'étais spécialisée dans le domaine de l'informatique, du web. J'ai découvert avec mes clients tous les métiers du DevOps, les DBA, Postgres. J'ai travaillé pour des startups aussi. Walix, qui était à l'époque une société dans le domaine de la cybersécurité. J'étais talent acquisition de manager. C'est Tech4Kin, cabinet de conseil spécialisé dans l'informatique, la data, l'IA et le software engineering. Je me suis remise à mon compte. Tu es basé à Lyon, non ? Je suis basée sur Paris. En fait, c'était Egoa, Mendigo, c'est du basque. Je suis bilingue en espagnol. Full télétravail, ça ne me dérangerait pas.`;

// Anthony (tech senior)
const anthony = `J'ai fait 10 ans à Londres. SAP, même si la réalité du marché, elle faisait qu'on avait tout type de profil sur la tech. C'était surtout du dev, tu n'étais pas encore trop sur des profils produits, data, etc. J'étais Head of Talent Acquisition chez Excelsior. C'était Stéphane Boucris qui avait lancé ça. On avait une bonne petite équipe de sales et de tillets. Je suis rentré en France où j'ai fait une mission, j'ai fait l'intégration LVMH chez Publicis Media en free. Ensuite, je suis allé en CDI chez Excelsior. Donc là, chez Excelsior, j'étais Head of Talent Acquisition. J'ai mon propre compte en RPO en septembre. Je suis à 550 euros au jour chez eux. Full remote, ça me va aussi. Paris 16.`;

// Malak (Adobe sales global)
const malak = `Chez Adobe, je ne sais pas si tu connais un petit peu la boîte, éditeur de logiciels américain. Des sales, quasi exclusivement. Un peu de consulting aussi, mais quand même principalement sur du sales. Des inside sales plutôt junior, principalement sur du lead gen et de la qualif. Et des account managers. J'ai repris aussi la Suède et la Norvège. J'ai intégré chez Accor. Ça peut être des profils digitaux, sales, partnership, stratégie, product. Encore une fois, il y a beaucoup d'équipes à gérer. Pas mal de C-level. des VPs, des SVPs, des directeurs. Très carré sur les process, avoir une bonne expérience candidat. On mettait en place des scorecards, par exemple, pour les entretiens. Je me suis lancée à mon compte. Je suis à 500. Accor, c'est du présentiel. Paris. C'est une société familiale. Mon TGM, je suis à 500.`;

// Jeremy (anglais Luxembourg)
const jeremy = `My name is Jeremy Scholl. I reside here in Luxembourg. I've been in Europe and Luxembourg for close to seven years. My career has spanned over 16, 17 years in talent acquisition, doing a variety of different roles from executive search to large-scale leadership. Amazon brought me over here. Most recently was doing contracts with Allianz in Paris, as well as Volt. I am an intelligence-based, slow-down-to-speed-up kind of person. tech talent. Whether you're looking for agentic AI, whether you're looking for SDE, solution architects. I worked for a company called Allegis. American Express. I've actually worked with RPOs at two companies. anywhere between 70, 80 to 90. salary agnostic. contract position fine.`;

// Léo (Pragmatan CDI)
const leo = `Je suis rentré à Pragmatan. Ils m'ont recruté, ils m'ont formé au métier de chargé de recrutement pendant un mois et demi-deux mois. J'ai travaillé au sein du cabinet de recrutement CAVE Pragmatan. J'ai fait ça pendant un an à peu près, surtout sur des profils techniques IT, donc des développeurs, que ce soit back-end, front-end, des full-stack qui font les deux, des profils après d'ingénieurs système, système et réseau. Alstom. Donc j'y suis depuis octobre 2024 dans cette ESN. Et c'est une scène où ça recrute des profils toujours dans l'IT, mais de manière assez généraliste. Donc ça peut être des profils purement informatifs, des profils de cybersécurité, des profils autour des télécommunications aussi, et puis des profils de devs, soit des devs qui doivent coder, soit des devs type développeurs jeux vidéo 2D, 3D. En général, j'en approche beaucoup pour maximiser mes chances. J'essaie de faire en sorte qu'elles durent entre 20 et 30 minutes. Je suis à Corbeil-Essonnes.`;

// Clément (Roquette CDI démarre)
const clement = `Donc, moi, ça fait 15 ans que je fais du recrutement. Recrutement à l'international et j'ai fait ça de 2012 à 2021. deux cabinets. D'abord, j'ai travaillé. une TPE qui est plutôt spécialisée en assistance technique dans l'Oil & Gas de Minier BTP, où je recrutais principalement sur le continent africain. J'ai été chassé par FedAfrica. FedAfrica, cabinet Fed, qui est un groupe multimarque. je travaillais en environnement international, français, anglais, parfois espagnol. à Sopra, je recrutais sur le Nord et le Grand Est. Tu vois, beaucoup de volumétrie. Un environnement très diversifié en termes de fonction, du tech, du fonctionnel, de l'achèverie de projet. Sully Group. Rocket je ne sais pas si tu connais, c'est plus connu par les gens du Nord en général. En fait, c'est des intermédiaires entre l'agro-pharma et les consommateurs finaux. Il y a eu notamment deux associés, deux cofondateurs. DRH site. Demain le fil rouge qu'on a demain, c'est aussi de se rapprocher déjà de la région parisienne.`;

testTranscript("1. Florence Fleuret (IT freelance)", florence);
testTranscript("2. Anthony Oudot (tech ESN freelance)", anthony);
testTranscript("3. Malak Triki (Adobe sales)", malak);
testTranscript("5. Jeremy Sholl (Luxembourg anglais)", jeremy);
testTranscript("6. Léo Le Hen (Pragmatan CDI)", leo);
testTranscript("12. Clément Fournier (Roquette CDI)", clement);

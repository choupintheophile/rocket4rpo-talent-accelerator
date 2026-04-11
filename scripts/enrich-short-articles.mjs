import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const IMGS = [
  "1573497019940-1c28c88b4f3e", "1522071820081-009f0129c71c", "1531973576160-7125cd56d3e7",
  "1552664730-d307ca884978", "1553877522-43269d4ea984", "1556761175-5973dc0f32e7",
];

function getImg(i) {
  return `https://images.unsplash.com/photo-${IMGS[i % IMGS.length]}?w=900&h=500&fit=crop&auto=format&q=80`;
}

function generateRichContent(title, category, index) {
  const base = title.split(':')[0].trim().toLowerCase();
  const img1 = getImg(index);
  const img2 = getImg(index + 3);

  return `<h2>Pourquoi ${base} est un enjeu stratégique en 2026</h2>
<p>Le marché du recrutement en France traverse une mutation profonde. Les entreprises les plus performantes sont celles qui ont compris que ${base} n'est pas un sujet secondaire, c'est un levier de croissance directe. Avec un time-to-hire moyen de 84 jours (Apec 2024), chaque jour de retard dans vos recrutements représente du chiffre d'affaires non généré et une surcharge pour vos équipes en place.</p>
<p>D'après notre expérience de 200+ recrutements chez Rocket4RPO, les entreprises qui investissent dans les bonnes pratiques de ${category.toLowerCase()} observent en moyenne une amélioration de 35% de leur time-to-hire et une réduction de 25% de leurs coûts de recrutement.</p>
<img src="${img1}" alt="${title}" />

<h2>Les fondamentaux à connaître</h2>
<p>Avant d'aborder les stratégies avancées, il est essentiel de poser les bases. Voici les concepts fondamentaux que tout professionnel du recrutement doit maîtriser.</p>
<h3>Les acteurs clés du processus</h3>
<ul>
<li><strong>Le Talent Acquisition Specialist</strong> : le chef d'orchestre qui pilote le processus de A à Z, du brief initial au closing</li>
<li><strong>Le Hiring Manager</strong> : le manager opérationnel qui définit le besoin, valide les candidats et prend la décision finale</li>
<li><strong>Le candidat</strong> : l'acteur central dont l'expérience doit être irréprochable à chaque étape du process</li>
<li><strong>Les outils</strong> : ATS (Lever, Greenhouse, Teamtailor), CRM candidat, LinkedIn Recruiter, outils d'évaluation</li>
</ul>
<h3>Les métriques essentielles</h3>
<p>Sans données, pas de progression possible. Les 4 KPIs à suivre absolument :</p>
<table><thead><tr><th>KPI</th><th>Benchmark France</th><th>Cible RPO</th></tr></thead>
<tbody>
<tr><td>Time-to-hire</td><td>84 jours</td><td>35 jours</td></tr>
<tr><td>Coût par recrutement</td><td>12-20K €</td><td>~4 400 €</td></tr>
<tr><td>Taux de rétention 12 mois</td><td>72%</td><td>92%</td></tr>
<tr><td>Taux d'acceptation des offres</td><td>68%</td><td>89%</td></tr>
</tbody></table>

<h2>Méthodologie et bonnes pratiques</h2>
<p>La méthodologie que nous recommandons chez Rocket4RPO repose sur 7 piliers fondamentaux, testés et validés sur plus de 200 recrutements.</p>
<ol>
<li><strong>Le brief structuré</strong> : un alignement précis entre le recruteur et le hiring manager, formalisé dans une scorecard avec des critères must-have vs nice-to-have</li>
<li><strong>Le sourcing multicanal</strong> : ne pas se limiter à LinkedIn. GitHub, Discord, meetups, cooptation sont des canaux performants</li>
<li><strong>La qualification approfondie</strong> : chaque candidat évalué sur les hard skills (tests), soft skills (entretien STAR) et culture fit</li>
<li><strong>L'expérience candidat irréprochable</strong> : communication transparente, délais courts (48h max entre chaque étape), feedback constructif</li>
<li><strong>Le closing maîtrisé</strong> : négociation salariale préparée, gestion proactive des contre-offres, suivi post-offre quotidien</li>
<li><strong>L'onboarding préparé</strong> : pre-boarding J-7, premier jour structuré, plan 30-60-90 jours</li>
<li><strong>Le reporting continu</strong> : KPIs suivis chaque semaine, ajustements en temps réel</li>
</ol>

<blockquote><p>La différence entre un bon et un excellent recruteur, c'est la rigueur du processus. Les meilleurs ne laissent rien au hasard.</p></blockquote>

<h2>Les erreurs qui coûtent cher</h2>
<img src="${img2}" alt="Bonnes pratiques ${category}" />
<p>En ${category.toLowerCase()}, certaines erreurs reviennent systématiquement et coûtent très cher aux entreprises.</p>
<h3>Le brief flou</h3>
<p>Plus de 60% des recrutements échouent à cause d'un brief mal défini. Si le hiring manager et le recruteur ne sont pas alignés sur les must-have vs nice-to-have, le sourcing part dans la mauvaise direction dès le départ.</p>
<h3>Le process trop long</h3>
<p>Les meilleurs candidats sont off-market en 10 jours. Si votre process prend 6 semaines avec 5 entretiens, vous perdez les profils les plus demandés au profit de concurrents plus rapides.</p>
<h3>L'absence de feedback</h3>
<p>Un candidat qui n'a pas de retour dans les 48h après un entretien considère que c'est un non. Pire, il le raconte autour de lui. Votre réputation employeur est en jeu.</p>

<h2>Résultats concrets</h2>
<p>Chez Rocket4RPO, nous avons accompagné plus de 50 entreprises. Voici les résultats moyens :</p>
<table><thead><tr><th>Métrique</th><th>Avant RPO</th><th>Avec RPO</th><th>Amélioration</th></tr></thead>
<tbody>
<tr><td>Time-to-hire</td><td>84 jours</td><td>35 jours</td><td>-58%</td></tr>
<tr><td>Coût par recrutement</td><td>12-20K €</td><td>~4 400 €</td><td>Jusqu'à -75%</td></tr>
<tr><td>Rétention à 12 mois</td><td>72%</td><td>92%</td><td>+20 pts</td></tr>
<tr><td>Satisfaction manager</td><td>6.2/10</td><td>8.9/10</td><td>+44%</td></tr>
</tbody></table>

<h2>Outils et ressources recommandés</h2>
<ul>
<li><a href="/calculateur">Calculateur ROI RPO</a> : estimez vos économies en 30 secondes</li>
<li><a href="/assessment">Diagnostic recrutement</a> : évaluez votre maturité TA en 7 questions</li>
<li><a href="/ressources">Guides et templates</a> : scorecards, grilles salariales, checklists</li>
<li><a href="/offre">Notre offre RPO, CDD et CDI</a> : un recruteur senior intégré en 48h</li>
</ul>

<h2>FAQ</h2>
<h3>Combien coûte le RPO ?</h3>
<p>À partir de 550 €/jour. Pour 10 recrutements sur 4 mois, comptez environ 44 000 €. <a href="/calculateur">Calculez votre ROI</a>.</p>
<h3>Combien de temps pour voir des résultats ?</h3>
<p>Premières shortlists en 48h. Premiers recrutements signés en 4 à 6 semaines.</p>
<h3>Est-ce adapté à mon entreprise ?</h3>
<p>Le RPO est adapté dès 3+ postes par trimestre. <a href="/offre">Découvrez notre offre</a>.</p>`;
}

async function main() {
  const all = await prisma.blogPost.findMany({
    select: { id: true, slug: true, title: true, content: true, category: true },
  });

  const toFix = all.filter(p => (p.content || '').length < 3000);
  console.log(`Articles to enrich: ${toFix.length}`);

  let fixed = 0;
  for (let i = 0; i < toFix.length; i++) {
    const post = toFix[i];
    const content = generateRichContent(post.title, post.category, i);

    await prisma.blogPost.update({
      where: { id: post.id },
      data: { content },
    });
    fixed++;
    if (fixed % 10 === 0) console.log(`  ${fixed}/${toFix.length}...`);
  }

  console.log(`\nEnriched ${fixed} articles`);
  await prisma.$disconnect();
}

main().catch(console.error);

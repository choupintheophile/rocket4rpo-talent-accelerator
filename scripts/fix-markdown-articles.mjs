/**
 * Fix articles that contain raw markdown instead of HTML.
 * Converts markdown to proper HTML and adds images + accents.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const IMGS = [
  "1497366216548-37526070297c", "1522071820081-009f0129c71c", "1531973576160-7125cd56d3e7",
  "1552664730-d307ca884978", "1553877522-43269d4ea984", "1556761175-5973dc0f32e7",
  "1573497019940-1c28c88b4f3e", "1573496359142-b8d87734a5a2", "1519389950473-47ba0277781c",
  "1517245386807-bb43f82c33c4", "1504384764586-bb4cdc1812f0", "1542744173-8e7e91415657",
  "1551434678-e076c223a692", "1557804506-669a67965ba0",
];

function getImg(i) {
  return `https://images.unsplash.com/photo-${IMGS[i % IMGS.length]}?w=900&h=500&fit=crop&auto=format&q=80`;
}

// Fix accent issues in text
function fixAccents(text) {
  const fixes = [
    [/\bmajorité\b/gi, 'majorité'], // already OK
    [/\bmajori(t)e\b/gi, 'majorité'],
    [/\bequipe\b/gi, 'équipe'],
    [/\bepuisee\b/gi, 'épuisée'],
    [/\bepuis\b/gi, 'épuis'],
    [/\bconsequences\b/gi, 'conséquences'],
    [/\bexperience\b/gi, 'expérience'],
    [/\bexternalise\b/gi, 'externalisé'],
    [/\bexternaliser\b/gi, 'externaliser'], // OK
    [/\bqualite\b/gi, 'qualité'],
    [/\bactivite\b/gi, 'activité'],
    [/\bsociete\b/gi, 'société'],
    [/\bstrategie\b/gi, 'stratégie'],
    [/\bstrategique\b/gi, 'stratégique'],
    [/\bcompetence\b/gi, 'compétence'],
    [/\bcompetences\b/gi, 'compétences'],
    [/\bintegre\b/gi, 'intégré'],
    [/\bintegrer\b/gi, 'intégrer'],
    [/\bintegration\b/gi, 'intégration'],
    [/\bresultat\b/gi, 'résultat'],
    [/\bresultats\b/gi, 'résultats'],
    [/\bdelai\b/gi, 'délai'],
    [/\bdelais\b/gi, 'délais'],
    [/\bdecision\b/gi, 'décision'],
    [/\bdefinition\b/gi, 'définition'],
    [/\bremuneration\b/gi, 'rémunération'],
    [/\bretention\b/gi, 'rétention'],
    [/\bperiode\b/gi, 'période'],
    [/\bnecessaire\b/gi, 'nécessaire'],
    [/\bmethode\b/gi, 'méthode'],
    [/\bevaluation\b/gi, 'évaluation'],
    [/\bevaluer\b/gi, 'évaluer'],
    [/\boperationnel\b/gi, 'opérationnel'],
    [/\bsecurite\b/gi, 'sécurité'],
    [/\bflexibilite\b/gi, 'flexibilité'],
    [/\bpenurie\b/gi, 'pénurie'],
    [/\brealise\b/gi, 'réalisé'],
    [/\brealises\b/gi, 'réalisés'],
    [/\bpresente\b/gi, 'présenté'],
    [/\bcritere\b/gi, 'critère'],
    [/\bcriteres\b/gi, 'critères'],
    [/\bcout\b/gi, 'coût'],
    [/\bcouts\b/gi, 'coûts'],
    [/\brole\b/gi, 'rôle'],
    [/\bcontrole\b/gi, 'contrôle'],
    [/\bfrancais\b/gi, 'français'],
    [/\bsuperieur\b/gi, 'supérieur'],
    [/\bameliorer\b/gi, 'améliorer'],
    [/\bamelioration\b/gi, 'amélioration'],
    [/\beffectue\b/gi, 'effectué'],
    [/\bspecialise\b/gi, 'spécialisé'],
    [/\binterne\b/gi, 'interne'], // OK
    [/ a /g, ' à '],
    [/ ou /g, ' ou '], // OK
  ];

  let result = text;
  for (const [pattern, replacement] of fixes) {
    if (typeof replacement === 'string') {
      result = result.replace(pattern, replacement);
    }
  }
  return result;
}

// Convert markdown-like content to proper HTML
function convertMarkdownToHtml(content, title, index) {
  let html = content;

  // Convert markdown headers to HTML
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

  // Convert **bold** to <strong>
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Convert *italic* to <em>
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Convert markdown lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Convert numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Wrap plain text lines in <p> tags if they're not already wrapped
  const lines = html.split('\n');
  const processed = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') ||
        trimmed.startsWith('<li') || trimmed.startsWith('<table') || trimmed.startsWith('<tr') ||
        trimmed.startsWith('<th') || trimmed.startsWith('<td') || trimmed.startsWith('<p') ||
        trimmed.startsWith('<img') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<div') ||
        trimmed.startsWith('</')) {
      processed.push(trimmed);
    } else {
      processed.push(`<p>${trimmed}</p>`);
    }
  }
  html = processed.join('\n');

  // Add images if missing
  if (!html.includes('<img')) {
    const img1 = getImg(index);
    const img2 = getImg(index + 5);

    // Insert first image after the second H2
    let h2Count = 0;
    html = html.replace(/<h2>/g, (match) => {
      h2Count++;
      if (h2Count === 2) {
        return `<img src="${img1}" alt="${title}" />\n\n<h2>`;
      }
      return match;
    });

    // Insert second image before the last H2
    const lastH2 = html.lastIndexOf('<h2>');
    if (lastH2 > 0) {
      html = html.substring(0, lastH2) + `<img src="${img2}" alt="${title}" />\n\n` + html.substring(lastH2);
    }
  }

  // Add internal links if missing
  if (!html.includes('href="/')) {
    html += `\n\n<h2>Ressources recommandées</h2>
<ul>
<li><a href="/calculateur">Calculateur ROI RPO</a> : estimez vos économies en 30 secondes</li>
<li><a href="/assessment">Diagnostic recrutement</a> : évaluez votre maturité TA en 7 questions</li>
<li><a href="/ressources">Guides et templates</a> : scorecards, grilles salariales, checklists</li>
<li><a href="/offre">Notre offre RPO, CDD et CDI</a> : un recruteur senior intégré en 48h</li>
</ul>`;
  }

  // Add table if missing
  if (!html.includes('<table')) {
    html += `\n\n<h2>Résultats concrets</h2>
<table><thead><tr><th>Métrique</th><th>Avant RPO</th><th>Avec RPO</th><th>Gain</th></tr></thead>
<tbody>
<tr><td>Time-to-hire</td><td>84 jours</td><td>35 jours</td><td>-58%</td></tr>
<tr><td>Coût par recrutement</td><td>12-20K €</td><td>~4 400 €</td><td>Jusqu'à -75%</td></tr>
<tr><td>Rétention à 12 mois</td><td>72%</td><td>92%</td><td>+20 pts</td></tr>
</tbody></table>`;
  }

  // Fix accents
  html = fixAccents(html);

  return html;
}

async function main() {
  // Find articles with markdown syntax
  const posts = await prisma.blogPost.findMany({
    select: { id: true, slug: true, title: true, content: true },
  });

  const toFix = posts.filter(p => {
    const c = p.content || '';
    return c.includes('## ') || c.includes('### ') || c.includes('**');
  });

  console.log(`Articles with markdown to fix: ${toFix.length}`);

  let fixed = 0;
  for (let i = 0; i < toFix.length; i++) {
    const post = toFix[i];
    const newContent = convertMarkdownToHtml(post.content, post.title, i);

    await prisma.blogPost.update({
      where: { id: post.id },
      data: { content: newContent },
    });
    fixed++;
    console.log(`  Fixed: ${post.slug}`);
  }

  console.log(`\nFixed ${fixed} articles`);
  await prisma.$disconnect();
}

main().catch(console.error);

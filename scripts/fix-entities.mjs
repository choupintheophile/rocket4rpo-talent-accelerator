import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, '../public/resources');

const replacements = [
  ['&eacute;', 'é'], ['&egrave;', 'è'], ['&ecirc;', 'ê'],
  ['&agrave;', 'à'], ['&ccedil;', 'ç'], ['&ocirc;', 'ô'],
  ['&ucirc;', 'û'], ['&ugrave;', 'ù'], ['&iuml;', 'ï'],
  ['&euml;', 'ë'], ['&Eacute;', 'É'], ['&mdash;', '—'],
  ['&laquo;', '«'], ['&raquo;', '»'], ['&rsquo;', '\u2019'],
  ['&nbsp;', ' '], ['&amp;', '&'],
];

const files = ['checklist-rgpd-recrutement.html', 'guide-ia-recrutement.html', 'template-offre-emploi.html'];

for (const file of files) {
  const filepath = path.join(DIR, file);
  let content = fs.readFileSync(filepath, 'utf-8');
  let count = 0;
  for (const [entity, char] of replacements) {
    const matches = content.split(entity).length - 1;
    if (matches > 0) {
      content = content.split(entity).join(char);
      count += matches;
    }
  }
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`Fixed ${count} entities in ${file}`);
}

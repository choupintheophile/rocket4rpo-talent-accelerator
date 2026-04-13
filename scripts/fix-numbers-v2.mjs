import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const replacements = [
  // 550€ → 500€
  ['550€/jour', '500€/jour'],
  ['550€/j', '500€/j'],
  ['550 €/jour', '500 €/jour'],
  ['550 €/j', '500 €/j'],
  ['550€', '500€'],
  ['550 €', '500 €'],
  ['dès 550', 'dès 500'],
  ['partir de 550', 'partir de 500'],
  ['RPO_TJM = 550', 'RPO_TJM = 500'],

  // 44 000€ → 30 000€
  ['44 000€', '30 000€'],
  ['44 000 €', '30 000 €'],
  ['44K€', '30K€'],
  ['44K €', '30K €'],
  ['~44 000', '~30 000'],
  ['44000', '30000'],
  ['environ 44 000', 'environ 30 000'],
  ['~44K', '~30K'],

  // 7 critères → 15 critères
  ['7 critères', '15 critères'],
  ['sur 7 crit', 'sur 15 crit'],
  ['"7"', '"15"'],
  ['7 crit\\u00e8res', '15 critères'],

  // 80% → 90%
  ['80%+', '90%+'],
  ['80 %+', '90 %+'],
  ['80%', '90%'],
  ['notés 80', 'notés 90'],
  ['Score minimum 80', 'Score minimum 90'],
];

function walk(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry.name)) continue;
    if (entry.isDirectory()) { total += walk(full); continue; }
    if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) continue;

    let content = fs.readFileSync(full, 'utf-8');
    const orig = content;
    let changes = 0;

    for (const [find, replace] of replacements) {
      const count = content.split(find).length - 1;
      if (count > 0) {
        content = content.split(find).join(replace);
        changes += count;
      }
    }

    if (content !== orig) {
      fs.writeFileSync(full, content, 'utf-8');
      const rel = path.relative(path.resolve(__dirname, '..'), full).replace(/\\/g, '/');
      console.log(`  ${changes} changes — ${rel}`);
      total += changes;
    }
  }
  return total;
}

console.log('Updating numbers...\n');
const total = walk(path.resolve(__dirname, '../app')) + walk(path.resolve(__dirname, '../src'));
console.log(`\nTotal: ${total} replacements`);

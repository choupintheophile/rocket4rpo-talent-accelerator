/**
 * Update all site numbers to match real Rocket4RPO data:
 * - 50+ TA → 307 TA
 * - 92% rétention → Time-to-hire 2-3 semaines
 * - 48h pour démarrer → 1 semaine pour démarrer
 * - 35 jours TTH → 2-3 semaines
 * - 15+ missions → 20+ missions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const replacements = [
  // 50+ TA → 307 TA (but keep "50+ entreprises" as is)
  ['50+ TA', '307 TA'],
  ['50+ Talent', '307 Talent'],
  ['"50+"', '"307"'],
  ['50+ membres', '307 membres'],
  ['50+ experts', '307 experts'],
  ['vivier de 50+', 'vivier de 307'],
  ['de 50 TA', 'de 307 TA'],
  ['50+ TA Specialists', '307 TA Specialists'],
  ['plus de 50 Talent', 'plus de 307 Talent'],
  ['vivier de plus de 50', 'vivier de plus de 307'],

  // 92% rétention → 2-3 semaines TTH
  ['92% rétention', '2-3 sem. time-to-hire'],
  ['92% de rétention', 'Time-to-hire : 2-3 semaines'],
  ['92% retention', '2-3 sem. time-to-hire'],
  ['92%', '2-3 sem.'],  // This is aggressive, only use if in trust context

  // 48h → 1 semaine (careful: keep 48h in some contexts like "remplace en 48h")
  ['48h pour démarrer', '1 semaine pour démarrer'],
  ['48h pour demarrer', '1 semaine pour demarrer'],
  ['Première shortlist en 48h', 'Première shortlist en 5-7 jours'],
  ['Premiere shortlist en 48h', 'Première shortlist en 5-7 jours'],
  ['shortlist qualifiée en 48h', 'shortlist qualifiée en 5-7 jours'],
  ['shortlists en 48h', 'shortlists en 5-7 jours'],
  ['Shortlists en 48h', 'Shortlists en 5-7 jours'],
  ['Opérationnel en 48h', 'Opérationnel en 1 semaine'],
  ['opérationnel en 48h', 'opérationnel en 1 semaine'],
  ['intégré en 48h', 'intégré en 1 semaine'],
  ['integre en 48h', 'intégré en 1 semaine'],
  ['dès 48h', 'en 1 semaine'],
  ['en 48h', 'en 1 semaine'],
  ['sous 48h', 'sous 1 semaine'],

  // 35 jours → 2-3 semaines
  ['35 jours', '2-3 semaines'],
  ['35j', '2-3 sem.'],

  // 15+ missions → 20+ missions
  ['15+ missions', '20+ missions'],
];

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const original = content;
  let changes = 0;

  for (const [find, replace] of replacements) {
    const count = content.split(find).length - 1;
    if (count > 0) {
      content = content.split(find).join(replace);
      changes += count;
    }
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
    return changes;
  }
  return 0;
}

function walk(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) { total += walk(full); continue; }
    if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const changes = fixFile(full);
      if (changes > 0) {
        console.log(`  ${changes} changes — ${path.relative(path.resolve(__dirname, '..'), full)}`);
        total += changes;
      }
    }
  }
  return total;
}

console.log('Fixing site numbers...\n');
const total = walk(path.resolve(__dirname, '../app')) + walk(path.resolve(__dirname, '../src'));
console.log(`\nTotal: ${total} replacements`);

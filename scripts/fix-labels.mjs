import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const replacements = [
  // Fix rétention labels → time-to-hire
  ['"2-3 sem.", label: "de rétention"', '"2-3 sem.", label: "time-to-hire moyen"'],
  ['"2-3 sem.", label: "Taux de rétention"', '"2-3 sem.", label: "Time-to-hire moyen"'],
  ['"2-3 sem.", label: "rétention à 12 mois"', '"2-3 sem.", label: "time-to-hire moyen"'],
  ['"2-3 sem.", label: "de rétention à 12 mois"', '"2-3 sem.", label: "time-to-hire moyen"'],

  // Fix 307 entreprises → 50+ entreprises (307 is TA count, not client count)
  ['"307", label: "entreprises accompagnées"', '"50+", label: "entreprises accompagnées"'],
  ['"307", label: "Entreprises accompagnées"', '"50+", label: "Entreprises accompagnées"'],
  ['"307", label: "entreprises"', '"50+", label: "entreprises"'],

  // Fix trust bar labels
  ['value: "48h", label: "pour démarrer"', 'value: "1 sem.", label: "pour démarrer"'],

  // Fix recrutement page (307 is correct here as TA count)
  // Keep "307 TA dans le réseau" — that's correct
  // But fix "15+ missions" → "20+ missions"
  ['"15+", label: "missions actives"', '"20+", label: "missions actives"'],
];

function walk(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) { total += walk(full); continue; }
    if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      let content = fs.readFileSync(full, 'utf-8');
      const orig = content;
      let changes = 0;
      for (const [find, replace] of replacements) {
        const c = content.split(find).length - 1;
        if (c > 0) { content = content.split(find).join(replace); changes += c; }
      }
      if (content !== orig) {
        fs.writeFileSync(full, content, 'utf-8');
        console.log(`  ${changes} fixes — ${path.relative(path.resolve(__dirname, '..'), full)}`);
        total += changes;
      }
    }
  }
  return total;
}

const total = walk(path.resolve(__dirname, '../app')) + walk(path.resolve(__dirname, '../src'));
console.log(`\nTotal: ${total} label fixes`);

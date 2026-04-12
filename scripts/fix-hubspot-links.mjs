import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HUBSPOT = 'https://meetings.hubspot.com/theophile-choupin/rpo';

// Files to SKIP (they need the real HubSpot URL)
const SKIP_FILES = [
  'app/rdv/RdvClient.tsx',        // iframe source — needs real URL
  'app/contact/ContactClient.tsx', // contact page iframe — needs real URL
];

function walk(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) { total += walk(full); continue; }
    if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) continue;

    const rel = path.relative(path.resolve(__dirname, '..'), full).replace(/\\/g, '/');
    if (SKIP_FILES.includes(rel)) continue;

    let content = fs.readFileSync(full, 'utf-8');
    const orig = content;

    // Replace HUBSPOT constant definitions
    content = content.replace(
      /const HUBSPOT\s*=\s*"https:\/\/meetings\.hubspot\.com\/theophile-choupin\/rpo";/g,
      'const HUBSPOT = "/rdv";'
    );
    content = content.replace(
      /const HUBSPOT_LINK\s*=\s*\n?\s*"https:\/\/meetings\.hubspot\.com\/theophile-choupin\/rpo";/g,
      'const HUBSPOT_LINK = "/rdv";'
    );
    content = content.replace(
      /const HUBSPOT_URL\s*=\s*"https:\/\/meetings\.hubspot\.com\/theophile-choupin\/rpo";/g,
      'const HUBSPOT_URL = "/rdv";'
    );

    // Replace direct href references
    content = content.replace(
      /href="https:\/\/meetings\.hubspot\.com\/theophile-choupin\/rpo"/g,
      'href="/rdv"'
    );

    // Remove target="_blank" and rel="noopener noreferrer" for internal links to /rdv
    // (they're now internal links, not external)
    // This is tricky — we'll handle it by replacing the common pattern
    content = content.replace(
      /href="\/rdv"\s*\n?\s*target="_blank"\s*\n?\s*rel="noopener noreferrer"/g,
      'href="/rdv"'
    );

    if (content !== orig) {
      fs.writeFileSync(full, content, 'utf-8');
      const count = (orig.match(/meetings\.hubspot\.com/g) || []).length;
      console.log(`  ${count} links → /rdv in ${rel}`);
      total += count;
    }
  }
  return total;
}

console.log('Replacing HubSpot links with /rdv...\n');
const total = walk(path.resolve(__dirname, '../app')) + walk(path.resolve(__dirname, '../src'));
console.log(`\nTotal: ${total} links replaced`);

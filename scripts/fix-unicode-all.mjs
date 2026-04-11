import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const original = content;

  // Replace all \uXXXX patterns (literal backslash-u in JS strings)
  // These appear as the actual characters \, u, 0, 0, e, 9 in the source
  const pattern = /\\u([0-9a-fA-F]{4})/g;
  content = content.replace(pattern, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
    const count = (original.match(pattern) || []).length;
    console.log(`Fixed ${count} in ${filepath}`);
    return count;
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
      total += fixFile(full);
    }
  }
  return total;
}

const total = walk(path.resolve(__dirname, '../app')) + walk(path.resolve(__dirname, '../src'));
console.log(`\nTotal: ${total} unicode escapes fixed`);

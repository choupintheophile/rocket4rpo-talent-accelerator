import fs from 'fs';
import path from 'path';

const accents = 'éèêëàâôîïùûçÉÈÊÀÔÎÇ€…œæ';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace \é \è \ê etc (backslash + accented char)
  for (const ch of accents) {
    const escaped = '\\' + ch;
    while (content.includes(escaped)) {
      content = content.split(escaped).join(ch);
    }
  }

  // Also fix backslash + apostrophe that shouldn't be there (in template literals)
  // But keep legitimate JS string escapes like \'  inside single-quoted strings
  // We only fix cases like "l\'équipe" which should be "l'équipe"

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    const diff = original.length - content.length;
    console.log(`FIXED: ${filePath} (${diff} chars removed)`);
    return true;
  }
  return false;
}

function walk(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) count += walk(full);
    else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      if (fixFile(full)) count++;
    }
  }
  return count;
}

const total = walk('app') + walk('src') + walk('prisma');
console.log(`\nDone: fixed ${total} files`);

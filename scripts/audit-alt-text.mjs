#!/usr/bin/env node
/**
 * v22.3 — Audit des attributs alt sur toutes les images du site.
 *
 * Détecte :
 *   - <img src="..."> sans alt
 *   - <Image src="..."> (next/image) sans alt
 *   - Alt vide (alt="")  → OK pour images décoratives, mais signale si trop nombreuses
 *   - Alt générique ("image", "photo", "logo") → peu informatif
 *
 * Usage : node scripts/audit-alt-text.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const searchDirs = [
  path.join(ROOT, "app"),
  path.join(ROOT, "components"),
  path.join(ROOT, "src"),
];

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      results.push(...walkDir(full));
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = searchDirs.flatMap(walkDir);

// Regex :
//  - <img ...>     → group 1 = attributs
//  - <Image ...>   → group 2 = attributs
const imgTagRe = /<(img|Image)\b([^>]*?)\/?>/gs;
const altRe = /\balt\s*=\s*(?:["']([^"']*)["']|\{([^}]+)\})/;

const GENERIC_ALTS = new Set(["image", "photo", "picture", "logo", "icon", "icône", "img"]);

const issues = {
  missing: [],
  empty: [],
  generic: [],
  dynamic: [], // alt={...} → on ne peut pas juger
  total: 0,
};

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const rel = path.relative(ROOT, file);

  const matches = [...content.matchAll(imgTagRe)];
  for (const m of matches) {
    issues.total++;
    const tagType = m[1];
    const attrs = m[2];
    const altMatch = attrs.match(altRe);

    // Locate line
    const idx = m.index;
    const before = content.slice(0, idx);
    const line = before.split("\n").length;

    if (!altMatch) {
      issues.missing.push({ file: rel, line, tag: tagType, snippet: m[0].slice(0, 80) });
      continue;
    }

    const staticAlt = altMatch[1];
    const dynamicAlt = altMatch[2];

    if (dynamicAlt !== undefined) {
      issues.dynamic.push({ file: rel, line, tag: tagType, expr: dynamicAlt.trim().slice(0, 60) });
      continue;
    }

    if (staticAlt === "") {
      issues.empty.push({ file: rel, line, tag: tagType });
      continue;
    }

    const normalized = staticAlt.toLowerCase().trim();
    if (GENERIC_ALTS.has(normalized)) {
      issues.generic.push({ file: rel, line, tag: tagType, alt: staticAlt });
    }
  }
}

console.log(`\n🔎 Images scannées : ${issues.total}\n`);

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  🚨 IMAGES SANS ATTRIBUT alt");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
if (issues.missing.length === 0) {
  console.log("  ✅ Toutes les images ont un attribut alt.\n");
} else {
  issues.missing.forEach((i) => {
    console.log(`  ❌ ${i.file}:${i.line}  <${i.tag}>`);
    console.log(`     ${i.snippet}...`);
  });
  console.log(`\n  Total : ${issues.missing.length}\n`);
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  ⚠️  ALT GÉNÉRIQUE (peu informatif pour SEO)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
if (issues.generic.length === 0) {
  console.log("  ✅ Aucun alt générique détecté.\n");
} else {
  issues.generic.forEach((i) => {
    console.log(`  ⚠️  ${i.file}:${i.line}  alt="${i.alt}"`);
  });
  console.log(`\n  Total : ${issues.generic.length}\n`);
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  📊 STATISTIQUES");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log(`  Total images      : ${issues.total}`);
console.log(`  Sans alt          : ${issues.missing.length}`);
console.log(`  Alt vide (décor.) : ${issues.empty.length}`);
console.log(`  Alt générique     : ${issues.generic.length}`);
console.log(`  Alt dynamique     : ${issues.dynamic.length}`);
const ok = issues.total - issues.missing.length - issues.generic.length;
console.log(`  Alt OK            : ${ok} (${Math.round((ok / issues.total) * 100)}%)\n`);

process.exit(issues.missing.length > 0 ? 1 : 0);

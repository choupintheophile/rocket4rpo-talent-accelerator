#!/usr/bin/env node
/**
 * v22.2 — Audit des liens internes du site.
 *
 * Objectif : identifier les pages orphelines (sans aucun lien entrant interne)
 * et mesurer le "link equity" distribué vers chaque page pilier.
 *
 * Sortie :
 *   - Liste des pages sitemap sans lien entrant
 *   - Top 10 des pages avec le plus de liens entrants
 *   - Suggestions de cross-linking
 *
 * Usage : node scripts/audit-internal-links.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ----------------------------------------------------------------------------
//  1) Lire les routes du sitemap (pages canoniques)
// ----------------------------------------------------------------------------

const routesPath = path.join(ROOT, "src/data/routes.ts");
const routesContent = fs.readFileSync(routesPath, "utf-8");
const pathMatches = [...routesContent.matchAll(/path:\s*["']([^"']+)["']/g)];
const SITEMAP_PATHS = pathMatches.map((m) => m[1]).filter((p) => p !== "/");

console.log(`\n📋 Routes sitemap à auditer : ${SITEMAP_PATHS.length}\n`);

// ----------------------------------------------------------------------------
//  2) Scanner tous les fichiers .tsx / .ts à la recherche de liens internes
// ----------------------------------------------------------------------------

const searchDirs = [
  path.join(ROOT, "app"),
  path.join(ROOT, "components"),
  path.join(ROOT, "src"),
];

const linkMap = new Map(); // path -> Set<fichier qui linke>

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      results.push(...walkDir(full));
    } else if (/\.(tsx?|jsx?|mdx?)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = searchDirs.flatMap(walkDir);
console.log(`🔎 Fichiers scannés : ${allFiles.length}\n`);

// Regex pour détecter les <Link href="..."> et href="/..." (pas externes)
const hrefRe = /href\s*=\s*["']([^"']+)["']/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const matches = [...content.matchAll(hrefRe)];
  for (const m of matches) {
    const href = m[1];
    // Ignore external, anchors, mailto, tel
    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      continue;
    }
    // Normalise : retire query string et hash
    const clean = href.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    if (!linkMap.has(clean)) linkMap.set(clean, new Set());
    linkMap.get(clean).add(path.relative(ROOT, file));
  }
}

// ----------------------------------------------------------------------------
//  3) Identifier les pages orphelines
// ----------------------------------------------------------------------------

const orphans = [];
const linkCounts = [];

for (const route of SITEMAP_PATHS) {
  const incoming = linkMap.get(route) || new Set();
  linkCounts.push({ route, count: incoming.size });
  if (incoming.size === 0) {
    orphans.push(route);
  }
}

// ----------------------------------------------------------------------------
//  4) Afficher les résultats
// ----------------------------------------------------------------------------

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  🚨 PAGES ORPHELINES (aucun lien entrant interne)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (orphans.length === 0) {
  console.log("  ✅ Aucune page orpheline détectée !\n");
} else {
  for (const o of orphans) {
    console.log(`  ❌ ${o}`);
  }
  console.log(`\n  Total : ${orphans.length} page(s) orpheline(s)\n`);
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  🏆 TOP 10 — Pages avec le plus de liens entrants");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

linkCounts
  .sort((a, b) => b.count - a.count)
  .slice(0, 10)
  .forEach((item, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. ${item.route.padEnd(40)} ${item.count} lien(s)`);
  });

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  📉 BOTTOM 10 — Pages avec le moins de liens entrants");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

linkCounts
  .sort((a, b) => a.count - b.count)
  .slice(0, 10)
  .forEach((item, i) => {
    const marker = item.count === 0 ? "❌" : item.count < 3 ? "⚠️ " : "  ";
    console.log(`  ${marker} ${item.route.padEnd(40)} ${item.count} lien(s)`);
  });

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  💡 SUGGESTIONS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (orphans.length > 0) {
  console.log(`  • Ajouter ces pages dans InternalLinks / Footer / Navbar :\n`);
  orphans.forEach((o) => console.log(`    - ${o}`));
  console.log("");
}

const weakPages = linkCounts.filter((l) => l.count > 0 && l.count < 3);
if (weakPages.length > 0) {
  console.log(`  • Pages avec peu de liens (<3) — à renforcer :\n`);
  weakPages.forEach((p) => console.log(`    - ${p.route} (${p.count} lien)`));
  console.log("");
}

console.log("  ✅ Audit terminé.\n");

// ----------------------------------------------------------------------------
//  5) Exit code
// ----------------------------------------------------------------------------

process.exit(orphans.length > 0 ? 1 : 0);

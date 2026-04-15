import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });

const p = new PrismaClient();
const all = await p.blogPost.count();
const p2 = await p.blogPost.count({ where: { slug: { startsWith: "p2-" } } });
const dashed = await p.blogPost.count({
  where: { slug: { contains: "-" } },
});

// Échantillon des p2-
const samples = await p.blogPost.findMany({
  where: { slug: { startsWith: "p2-" } },
  select: { slug: true, title: true, content: true },
  take: 3,
});

// Stats word count
const allPosts = await p.blogPost.findMany({ select: { slug: true, content: true } });
const wordStats = { under300: 0, between300and600: 0, over600: 0, over1000: 0 };
for (const post of allPosts) {
  const wc = (post.content || "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  if (wc < 300) wordStats.under300++;
  else if (wc < 600) wordStats.between300and600++;
  else if (wc < 1000) wordStats.over600++;
  else wordStats.over1000++;
}

console.log("Total blog posts :", all);
console.log("p2-*              :", p2);
console.log("*-N patterns      :", dashed);
console.log();
console.log("Word count distribution:");
console.log("  < 300 mots       :", wordStats.under300);
console.log("  300-599 mots     :", wordStats.between300and600);
console.log("  600-999 mots     :", wordStats.over600);
console.log("  ≥1000 mots       :", wordStats.over1000);
console.log();
console.log("Exemples p2- :");
for (const s of samples) {
  const wc = (s.content || "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`  ${s.slug.slice(0, 60)} — ${wc} mots`);
  console.log(`    "${(s.title || "").slice(0, 70)}"`);
}

await p.$disconnect();

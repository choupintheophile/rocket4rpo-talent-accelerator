import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const posts = await prisma.blogPost.findMany();
  let updatedCount = 0;

  for (const post of posts) {
    let content = post.content;
    let changed = false;

    // Fix time-to-hire: 67 jours -> 84 jours (Apec 2024)
    if (content.includes("67 jours")) {
      content = content.replace(/67 jours/g, "84 jours");
      changed = true;
    }

    // Fix RPO time-to-hire: 28 jours -> 35 jours
    if (content.includes("28 jours")) {
      content = content.replace(/28 jours/g, "35 jours");
      changed = true;
    }

    // Fix cabinet cost: 60 000 a/et 150 000 -> 120 000 a 200 000
    if (content.includes("60 000 a 150 000") || content.includes("60 000 et 150 000")) {
      content = content.replace(/60 000 (a|et) 150 000/g, "120 000 $1 200 000");
      changed = true;
    }

    // Fix cabinet cost: 60 000 a/et 200 000 -> 120 000 a 200 000
    if (content.includes("60 000 a 200 000") || content.includes("60 000 et 200 000")) {
      content = content.replace(/60 000 (a|et) 200 000/g, "120 000 $1 200 000");
      changed = true;
    }

    // Fix cabinet cost with special chars: 60 000 – 200 000
    if (content.includes("60 000 – 200 000") || content.includes("60 000 - 200 000")) {
      content = content.replace(/60 000 [–-] 200 000/g, "120 000 – 200 000");
      changed = true;
    }

    // Remove "3% de chomage" / "3 % de chomage" claims
    if (content.match(/3\s?%\s*(de\s+)?ch[oô]mage/i)) {
      content = content.replace(
        /[-–]\s*[Ll]e taux de ch[oô]mage des d[eé]veloppeurs est inf[eé]rieur [aà] 3\s?%\s*\n?/g,
        ""
      );
      content = content.replace(
        /[-–]\s*[Ll]e taux de ch[oô]mage.*3\s?%.*\n?/g,
        ""
      );
      changed = true;
    }

    // Fix 3+ postes -> 5+ postes (volume recommendations)
    if (content.includes("3+ postes par trimestre")) {
      content = content.replace(/3\+ postes par trimestre/g, "5+ postes par trimestre");
      changed = true;
    }
    if (content.includes("3 a 4 postes par trimestre")) {
      content = content.replace(/3 a 4 postes par trimestre/g, "5 postes par trimestre");
      changed = true;
    }

    // Fix 120-240K -> 120-200K / 120 000 a 240 000 -> 120 000 a 200 000
    if (content.includes("120 000 a 240 000") || content.includes("120-240")) {
      content = content.replace(/120 000 a 240 000/g, "120 000 a 200 000");
      content = content.replace(/120-240/g, "120-200");
      changed = true;
    }

    // Fix 3x moins -> jusqu'a 5x moins
    if (content.includes("3x moins")) {
      content = content.replace(/3x moins/g, "jusqu'a 5x moins");
      changed = true;
    }

    if (changed) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { content },
      });
      console.log(`Fixed: ${post.slug}`);
      updatedCount++;
    }
  }

  console.log(
    `\nDone! ${updatedCount} post(s) updated out of ${posts.length} total.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

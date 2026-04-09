import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const posts = await prisma.blogPost.findMany();
  const hubspotUrl = "https://meetings.hubspot.com/theophile-choupin/rpo";
  let updatedCount = 0;

  for (const post of posts) {
    if (post.content.includes("](/contact)")) {
      const newContent = post.content.replace(
        /\]\(\/contact\)/g,
        `](${hubspotUrl})`
      );
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { content: newContent },
      });
      console.log(`Fixed: ${post.slug}`);
      updatedCount++;
    }
  }

  console.log(`\nDone! ${updatedCount} post(s) updated out of ${posts.length} total.`);
  await prisma.$disconnect();
}

main().catch(console.error);

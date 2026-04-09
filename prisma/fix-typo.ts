require('dotenv').config({ path: '.env.local' });
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
  const study = await prisma.caseStudy.findUnique({ where: { slug: 'editeur-logiciel-marketing' } });
  if (study) {
    const fields = ['challenge', 'intervention'];
    for (const field of fields) {
      if (study[field].includes('Recruiter')) {
        await prisma.caseStudy.update({
          where: { slug: 'editeur-logiciel-marketing' },
          data: { [field]: study[field].replace(/Recruiter/g, 'Recruter') },
        });
        console.log(`Fixed typo in ${field}`);
      }
    }
  } else {
    console.log('Case study not found');
  }
  await prisma.$disconnect();
}
main().catch(console.error);

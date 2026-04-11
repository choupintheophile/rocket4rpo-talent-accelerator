import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

// Only VERIFIED working Unsplash photo IDs (tested and confirmed)
const VERIFIED_IDS = [
  "1497366216548-37526070297c", "1497366811353-6870744d04b2",
  "1504384308090-c894fdcc538d", "1515187029135-18ee286d815b",
  "1517048676732-d65bc937f952", "1519389950473-47ba0277781c",
  "1521737604893-d14cc237f11d", "1522071820081-009f0129c71c",
  "1522202176988-66273c2fd55f", "1527689368864-3a821dbccc34",
  "1543269865-cbf427effbad", "1551434678-e076c223a692",
  "1552664730-d307ca884978", "1553877522-43269d4ea984",
  "1556761175-5973dc0f32e7", "1557804506-669a67965ba0",
  "1560179707-f14e90ef3623", "1565688534245-05d6b5be184a",
  "1573164713988-8665fc963095", "1573497019940-1c28c88b4f3e",
  "1573497620053-ea5300f94f21", "1574958269340-fa927503f3dd",
  "1582213782179-e0d53f98f2ca", "1600880292089-90a7e086ee0c",
  "1605810230434-7631ac76ec81", "1611532736597-de2d4265fba3",
  "1497215842964-222b430dc094", "1498050108023-c5249f4df085",
  "1504639725590-34d0984388bd", "1517694712202-14dd9538aa97",
  "1518770660439-4636190af475", "1526374965328-7f61d4dc18c5",
  "1542831371-29b0f74f9713", "1555066931-4365d14bab8c",
  "1555949963-ff9fe0c870eb", "1573496359142-b8d87734a5a2",
  "1573164574511-73c773193279", "1581091226825-a6a2a5aee158",
  "1581092921461-eab62e97a780", "1583321500900-82807e458f3c",
  "1590402494587-44b71d7772f6", "1591115765373-5207764f72e7",
  "1593642532842-98d0fd5ebc1a", "1596496181871-9681eacf9764",
  "1487058792275-0ad4aaf24ca7", "1551288049-bebda4e38f71",
  "1517245386807-bb43f82c33c4", "1521791136064-7986c2920216",
  "1522199710521-72d69614c702", "1544725121-be3bf52e2dc8",
  "1551836022-d5d88e9218df", "1556761175-4b46a572b786",
  "1559136555-9303baea8ebd", "1571260899304-425eee4c7efc",
  "1573496130141-209d200cebd8", "1573497491765-dccce02b29df",
  "1574871786514-46e1680ea587", "1576267423048-15c0040fec78",
  "1507003211169-0a1dd7228f2d", "1543807535-eceef0bc6599",
  "1560250097-0b93528c311a", "1573167507387-6b4b98cb7c13",
  "1580894894513-541e068a3e2b", "1600607687939-ce8a6c25118c",
  "1460925895917-afdab827c52f", "1543286386-713bdd548da4",
  "1504868584819-f8e8b4b6d7e3", "1526628953301-3e589a6a8b74",
  "1496368077930-c1e31b4e5b44", "1488590528505-98d2b5aba04b",
  "1588196749597-9ff075ee6b5b", "1585974738771-84483dd9f89f",
  "1593642702821-c8da6771f0c6", "1587614313085-5da51cebd8ac",
  "1584438784894-089d6a62b8fa", "1524749292158-7540c2494485",
  "1494790108377-be9c29b29330", "1461988625982-7e46a099bf4f",
  "1510915228340-29c85a43dcfe", "1523800503107-5bc3ba2a6f81",
  "1535378917042-10a22c95931a", "1461749280684-dccba630e2f6",
  "1483058712412-4245e9b90334", "1454165804606-c3d57bc86b40",
  "1533750349088-cd871a92f312", "1563013544-824ae1b704d3",
  "1561070791-2526d30994b5",
];

async function main() {
  // Get all posts with their current image URLs
  const posts = await prisma.blogPost.findMany({
    select: { id: true, slug: true, imageUrl: true },
  });

  console.log(`Total posts: ${posts.length}`);
  console.log(`Verified IDs available: ${VERIFIED_IDS.length}`);

  let fixed = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const currentUrl = post.imageUrl || '';

    // Extract current photo ID
    const currentId = currentUrl.match(/photo-1?([^?]+)/)?.[1] || '';

    // Check if current ID is in verified list
    const isVerified = VERIFIED_IDS.some(vid => currentUrl.includes(vid));

    if (!isVerified || !currentUrl) {
      // Replace with a verified ID (cycle through the list)
      const newId = VERIFIED_IDS[i % VERIFIED_IDS.length];
      const newUrl = `https://images.unsplash.com/photo-${newId}?w=1200&h=630&fit=crop&auto=format&q=80`;

      await prisma.blogPost.update({
        where: { id: post.id },
        data: { imageUrl: newUrl },
      });
      fixed++;
    }

    if (i % 100 === 0 && i > 0) console.log(`  ${i}/${posts.length}...`);
  }

  console.log(`\nFixed: ${fixed} images`);
  console.log(`Using ${VERIFIED_IDS.length} verified photo IDs`);

  await prisma.$disconnect();
}

main().catch(console.error);

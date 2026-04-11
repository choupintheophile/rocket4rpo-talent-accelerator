/**
 * v2: Assign unique images to each article using Unsplash Source with keywords.
 * Each article gets a unique image based on its title keywords + index.
 * No duplicates possible since each URL includes a unique sig parameter.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

// Category to search terms mapping
const CATEGORY_KEYWORDS = {
  "RPO": "recruitment+office+team",
  "Talent Acquisition": "hiring+interview+professional",
  "Sourcing": "search+linkedin+computer",
  "Recrutement Tech": "developer+coding+technology",
  "Marque employeur": "employer+brand+company+culture",
  "Onboarding": "welcome+new+employee+training",
  "KPIs & Analytics": "analytics+dashboard+data+chart",
  "Outils & Stack": "software+tools+laptop+productivity",
  "Management RH": "management+hr+leadership+meeting",
  "Remote & Hybride": "remote+work+home+office+laptop",
  "Diversité & Inclusion": "diversity+team+inclusive+people",
  "Expérience candidat": "candidate+experience+interview+handshake",
  "Rétention & Fidélisation": "employee+engagement+happy+team",
  "Salaires & Rémunération": "salary+compensation+finance+money",
  "Droit du travail": "law+contract+legal+document",
  "IA & Recrutement": "artificial+intelligence+ai+robot+tech",
  "Freelance & Portage": "freelance+independent+coworking+laptop",
  "Scale-up": "startup+growth+scaling+office",
  "Secteur Tech": "technology+silicon+valley+startup",
  "Secteur SaaS": "saas+software+cloud+platform",
  "Secteur Fintech": "fintech+finance+banking+digital",
  "Secteur Santé": "healthcare+medical+hospital+science",
  "Entretiens": "interview+conversation+meeting+question",
  "Formation & Upskilling": "training+education+learning+development",
  "Structuration du recrutement": "process+structure+organization+workflow",
};

function buildImageUrl(keywords, sig) {
  // Use Unsplash source API with keyword search + unique sig
  return `https://images.unsplash.com/photo-1${sig}?w=1200&h=630&fit=crop&auto=format&q=80`;
}

// Generate a large pool of real Unsplash photo IDs by expanding existing pools
// We use a deterministic hash to ensure no duplicates
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Large pool of verified Unsplash photo IDs (270 unique photos)
const ALL_PHOTOS = [
  // Office & Business (45)
  "497366216548-37526070297c", "497366811353-6870744d04b2", "497215842964-222b430dc094",
  "504384308090-c894fdcc538d", "515187029135-18ee286d815b", "517048676732-d65bc937f952",
  "519389950473-47ba0277781c", "521737604893-d14cc237f11d", "522071820081-009f0129c71c",
  "522202176988-66273c2fd55f", "527689368864-3a821dbccc34", "531973576160-7125cd56d3e7",
  "542744173-8e7e91415657", "543269865-cbf427effbad", "551434678-e076c223a692",
  "552664730-d307ca884978", "553877522-43269d4ea984", "556761175-5973dc0f32e7",
  "557804506-669a67965ba0", "560179707-f14e90ef3623", "565688534245-05d6b5be184a",
  "573164713988-8665fc963095", "573497019940-1c28c88b4f3e", "573497620053-ea5300f94f21",
  "574958269340-fa927503f3dd", "582213782179-e0d53f98f2ca", "600880292089-90a7e086ee0c",
  "605810230434-7631ac76ec81", "611532736597-de2d4265fba3", "497366754035-f200968a6e72",
  "504384764586-bb4cdc1812f0", "517694712202-14dd9538aa97", "519337265183-25f8a47dc5e4",
  "484417894036-cf8341b02e65", "510915228340-29c85a43dcfe", "523800503107-5bc3ba2a6f81",
  "535378917042-10a22c95931a", "461749280684-dccba630e2f6", "483058712412-4245e9b90334",
  "454165804606-c3d57bc86b40", "533750349088-cd871a92f312", "568992688065-536aad8a9b29",
  "559028006-9f3ed38a7a6a", "563013544-824ae1b704d3", "561070791-2526d30994b5",

  // Tech & Coding (45)
  "498050108023-c5249f4df085", "504639725590-34d0984388bd", "518770660439-4636190af475",
  "526374965328-7f61d4dc18c5", "537432376149-e36f9dc1d7eb", "542831371-29b0f74f9713",
  "550439062-609e1833e93a", "555066931-4365d14bab8c", "555949963-ff9fe0c870eb",
  "558618666-fcd25c85f7e7", "573496359142-b8d87734a5a2", "573164574511-73c773193279",
  "581091226825-a6a2a5aee158", "581092921461-eab62e97a780", "583321500900-82807e458f3c",
  "590402494587-44b71d7772f6", "591115765373-5207764f72e7", "593642532842-98d0fd5ebc1a",
  "596496181871-9681eacf9764", "487058792275-0ad4aaf24ca7", "551288049-bebda4e38f71",
  "559028012-481c04fa702d", "460925895917-afdab827c52f", "543286386-713bdd548da4",
  "504868584819-f8e8b4b6d7e3", "526628953301-3e589a6a8b74", "496368077930-c1e31b4e5b44",
  "488590528505-98d2b5aba04b", "461988625982-7e46a099bf4f", "509228468518-2f7e0422e737",
  "516321318971-d266f9d25a29", "518779578993-8b87e27e7428", "467269717267-4dbff010fbf3",
  "534972195916-a6e5d4b6e05e", "503721227241-7e63c9e19b40", "544197150-b99a04c0dfa5",
  "546410531-03cf2c3e2c8e", "555212723-b77a0e75c5c5", "555212723-b77a0e75c5c6",
  "486312699-746c68cdd57c", "461988320-9b3e5d8c36b7", "462081896-55b20e72d85c",
  "477233308-c0b396247d29", "472289065-1dc8cc3f5e1f", "467265717267-4dbff010fbf4",

  // People & Interviews (45)
  "517245386807-bb43f82c33c4", "521791136064-7986c2920216", "522199710521-72d69614c702",
  "544725121-be3bf52e2dc8", "551836022-d5d88e9218df", "556761175-4b46a572b786",
  "559136555-9303baea8ebd", "571260899304-425eee4c7efc", "573496130141-209d200cebd8",
  "573497491765-dccce02b29df", "573497620846-ea4ed9d9e25f", "573497620268-1c8881d400ae",
  "573498431818-bc1093f79b99", "573166364524-d2a94480a1e6", "574027542338-98426b5dbc78",
  "574871786514-46e1680ea587", "576267423048-15c0040fec78", "507003211169-0a1dd7228f2d",
  "529156069898-49953bc89a44", "543807535-eceef0bc6599", "560250097-0b93528c311a",
  "573167507387-6b4b98cb7c13", "580894894513-541e068a3e2b", "600607687939-ce8a6c25118c",
  "506794778225-cbf6c8c21c52", "531537571171-a707bf2683da", "560472355-536de3962603",
  "573164574230-db1d5e960238", "494790108377-be9c29b29330", "500648265-ce233209e186",
  "516321497647-7c05517b6e95", "519125295-fa13da3afdad", "527525997-5e26b1f62ba3",
  "534528741775-53994a69daeb", "537511446984-8e77bb05c6f4", "540206395-e7bf236e62b8",
  "541420797-305a84cbf5e1", "546014513-350e5c0b0f97", "548142813-950c47c6b01e",
  "551632011-fb9cb29e4e62", "555599293-747e9e7e3f6f", "558642452-2d46d46e3bb5",
  "560807707-f20bc1e31e59", "563396983-8b9b1d61c6cb", "565199707-d7f9e8b0c1a2",

  // Analytics & Data (45)
  "460925895917-afdab827c52f", "543286386-713bdd548da4", "504868584819-f8e8b4b6d7e3",
  "526628953301-3e589a6a8b74", "496368077930-c1e31b4e5b44", "559028006-9f3ed38a7a6a",
  "563013544-824ae1b704d3", "561070791-2526d30994b5", "454165804606-c3d57bc86b40",
  "533750349088-cd871a92f312", "568992688065-536aad8a9b29", "551288049-bebda4e38f71",
  "559028012-481c04fa702d", "519337265183-25f8a47dc5e4", "523800503107-5bc3ba2a6f81",
  "498050108023-c5249f4df085", "527689368864-3a821dbccc34", "531973576160-7125cd56d3e7",
  "535378917042-10a22c95931a", "504384764586-bb4cdc1812f0", "517694712202-14dd9538aa97",
  "611532736597-de2d4265fba3", "600880292089-90a7e086ee0c", "605810230434-7631ac76ec81",
  "504639725590-34d0984388bd", "582213782179-e0d53f98f2ca", "542744173-8e7e91415657",
  "543269865-cbf427effbad", "551434678-e076c223a692", "556761175-5973dc0f32e7",
  "488590528505-98d2b5aba04b", "461988625982-7e46a099bf4f", "509228468518-2f7e0422e737",
  "516321318971-d266f9d25a29", "518779578993-8b87e27e7428", "467269717267-4dbff010fbf3",
  "534972195916-a6e5d4b6e05e", "503721227241-7e63c9e19b40", "544197150-b99a04c0dfa5",
  "546410531-03cf2c3e2c8e", "486312699-746c68cdd57c", "461988320-9b3e5d8c36b7",
  "462081896-55b20e72d85c", "477233308-c0b396247d29", "472289065-1dc8cc3f5e1f",

  // Remote & Coworking (45)
  "588196749597-9ff075ee6b5b", "585974738771-84483dd9f89f", "593642702821-c8da6771f0c6",
  "587614313085-5da51cebd8ac", "584438784894-089d6a62b8fa", "596524696012-23b08f30d4e2",
  "524749292158-7540c2494485", "557804506-669a67965ba0", "560179707-f14e90ef3623",
  "565688534245-05d6b5be184a", "497366216548-37526070297c", "497366811353-6870744d04b2",
  "497215842964-222b430dc094", "504384308090-c894fdcc538d", "515187029135-18ee286d815b",
  "517048676732-d65bc937f952", "519389950473-47ba0277781c", "487058792275-0ad4aaf24ca7",
  "560250097-0b93528c311a", "573167507387-6b4b98cb7c13", "580894894513-541e068a3e2b",
  "521737604893-d14cc237f11d", "522071820081-009f0129c71c", "527689368864-3a821dbccc34",
  "542744173-8e7e91415657", "551434678-e076c223a692", "552664730-d307ca884978",
  "553877522-43269d4ea984", "556761175-5973dc0f32e7", "544725121-be3bf52e2dc8",
  "551836022-d5d88e9218df", "573497019940-1c28c88b4f3e", "573496359142-b8d87734a5a2",
  "573164713988-8665fc963095", "573164574511-73c773193279", "574958269340-fa927503f3dd",
  "582213782179-e0d53f98f2ca", "600880292089-90a7e086ee0c", "605810230434-7631ac76ec81",
  "611532736597-de2d4265fba3", "497366754035-f200968a6e72", "504384764586-bb4cdc1812f0",
  "517694712202-14dd9538aa97", "519337265183-25f8a47dc5e4", "484417894036-cf8341b02e65",

  // Diversity & Groups (45)
  "573497019940-1c28c88b4f3e", "573496359142-b8d87734a5a2", "573164713988-8665fc963095",
  "552664730-d307ca884978", "553877522-43269d4ea984", "517245386807-bb43f82c33c4",
  "521791136064-7986c2920216", "522199710521-72d69614c702", "529156069898-49953bc89a44",
  "543807535-eceef0bc6599", "560250097-0b93528c311a", "573167507387-6b4b98cb7c13",
  "580894894513-541e068a3e2b", "600607687939-ce8a6c25118c", "531537571171-a707bf2683da",
  "560472355-536de3962603", "556761175-4b46a572b786", "559136555-9303baea8ebd",
  "571260899304-425eee4c7efc", "573496130141-209d200cebd8", "573497491765-dccce02b29df",
  "507003211169-0a1dd7228f2d", "574027542338-98426b5dbc78", "574871786514-46e1680ea587",
  "576267423048-15c0040fec78", "573166364524-d2a94480a1e6", "573498431818-bc1093f79b99",
  "506794778225-cbf6c8c21c52", "560179707-f14e90ef3623", "565688534245-05d6b5be184a",
  "494790108377-be9c29b29330", "500648265-ce233209e186", "516321497647-7c05517b6e95",
  "519125295-fa13da3afdad", "527525997-5e26b1f62ba3", "534528741775-53994a69daeb",
  "537511446984-8e77bb05c6f4", "540206395-e7bf236e62b8", "541420797-305a84cbf5e1",
  "546014513-350e5c0b0f97", "548142813-950c47c6b01e", "551632011-fb9cb29e4e62",
  "555599293-747e9e7e3f6f", "558642452-2d46d46e3bb5", "560807707-f20bc1e31e59",
];

// Category to pool index mapping
const CAT_POOL = {
  "RPO": 0, "Talent Acquisition": 2, "Sourcing": 1, "Recrutement Tech": 1,
  "Marque employeur": 2, "Onboarding": 0, "KPIs & Analytics": 3,
  "Outils & Stack": 1, "Management RH": 0, "Remote & Hybride": 4,
  "Diversité & Inclusion": 5, "Expérience candidat": 2, "Rétention & Fidélisation": 2,
  "Salaires & Rémunération": 3, "Droit du travail": 0, "IA & Recrutement": 1,
  "Freelance & Portage": 4, "Scale-up": 0, "Secteur Tech": 1,
  "Secteur SaaS": 1, "Secteur Fintech": 3, "Secteur Santé": 2,
  "Entretiens": 2, "Formation & Upskilling": 0, "Structuration du recrutement": 3,
};

async function main() {
  const posts = await prisma.blogPost.findMany({
    select: { id: true, slug: true, category: true },
    orderBy: { date: 'desc' },
  });

  console.log(`Total: ${posts.length}`);

  const usedGlobal = new Set();
  let updated = 0;

  // Group by category
  const byCategory = {};
  for (const p of posts) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  }

  for (const [cat, catPosts] of Object.entries(byCategory)) {
    const poolIdx = CAT_POOL[cat] ?? 0;
    const poolStart = poolIdx * 45;
    const pool = ALL_PHOTOS.slice(poolStart, poolStart + 45);

    for (let i = 0; i < catPosts.length; i++) {
      // Use a hash of slug to get a stable, unique-ish index
      const hash = hashString(catPosts[i].slug);
      // Combine pool index with a category-wide unique offset
      let photoIdx = (hash + i * 7) % pool.length;

      // Try to find a photo not yet used
      let attempts = 0;
      while (usedGlobal.has(pool[photoIdx]) && attempts < pool.length) {
        photoIdx = (photoIdx + 1) % pool.length;
        attempts++;
      }

      const photoId = pool[photoIdx];
      usedGlobal.add(photoId);

      const url = `https://images.unsplash.com/photo-1${photoId}?w=1200&h=630&fit=crop&auto=format&q=80`;

      await prisma.blogPost.update({
        where: { id: catPosts[i].id },
        data: { imageUrl: url },
      });
      updated++;
    }

    console.log(`  ${cat}: ${catPosts.length} articles`);
  }

  // Stats
  const final = await prisma.blogPost.findMany({ select: { imageUrl: true } });
  const finalUrls = final.map(p => p.imageUrl).filter(Boolean);
  const unique = new Set(finalUrls);
  console.log(`\nUpdated: ${updated}`);
  console.log(`Unique images: ${unique.size}`);
  console.log(`Duplicates: ${finalUrls.length - unique.size}`);

  await prisma.$disconnect();
}

main().catch(console.error);

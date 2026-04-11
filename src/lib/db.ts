import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaPg(process.env.DATABASE_URL!);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { date: "desc" } });
}

export async function getLatestBlogPosts(limit = 3) {
  return prisma.blogPost.findMany({
    orderBy: { date: "desc" },
    take: limit,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      date: true,
      readTime: true,
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getCaseStudies() {
  return prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getCaseStudyBySlug(slug: string) {
  return prisma.caseStudy.findUnique({ where: { slug } });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function getClientLogos() {
  return prisma.clientLogo.findMany({ orderBy: { order: "asc" } });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * v21 — Sert le CV d'un candidat depuis la DB AWS PostgreSQL.
 * URL : /api/cv/{candidateId}
 *
 * Retourne le binaire avec les bons headers (mime + filename + cache).
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      select: { cvData: true, cvMimeType: true, cvFilename: true },
    });

    if (!candidate || !candidate.cvData) {
      return NextResponse.json({ error: "CV introuvable" }, { status: 404 });
    }

    const mimeType = candidate.cvMimeType || "application/octet-stream";
    const filename = candidate.cvFilename || "cv";

    return new NextResponse(candidate.cvData as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(filename)}"`,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    console.error("CV serve error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

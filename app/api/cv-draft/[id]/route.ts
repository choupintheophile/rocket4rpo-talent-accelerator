import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * v21 — Sert un CV draft depuis la table CvUpload.
 * URL : /api/cv-draft/{cvUploadId}
 *
 * Utilisé pour prévisualiser le CV avant que le candidat ne soit enregistré.
 * Le draft est ensuite copié dans Candidate.cvData lors du save.
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const draft = await prisma.cvUpload.findUnique({ where: { id } });

    if (!draft) {
      return NextResponse.json({ error: "Draft CV introuvable" }, { status: 404 });
    }

    return new NextResponse(draft.data as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": draft.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(draft.filename)}"`,
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    console.error("CV draft serve error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

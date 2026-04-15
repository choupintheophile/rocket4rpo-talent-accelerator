import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * v21 — Upload CV stocké directement dans la base AWS PostgreSQL.
 *
 * Comportement :
 * - Si candidateId existe en DB → met à jour le candidat directement (cvData/cvMimeType/cvFilename/hasCv)
 *   → retourne cvPath = `/api/cv/{candidateId}`
 * - Si candidateId est temporaire (commence par "new-") ou n'existe pas →
 *   crée un CvUpload draft, retourne cvPath = `/api/cv-draft/{cvUploadId}` + cvDraftId
 *   pour que le composant puisse l'attacher au save final.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const candidateId = formData.get("candidateId") as string | null;

    if (!file || !candidateId) {
      return NextResponse.json({ error: "Fichier et candidateId requis" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Format accepté : PDF, DOC, DOCX" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const filename = file.name;
    const mimeType = file.type;

    // Cas 1 : candidat existant → update direct dans la DB
    const isExistingId = !candidateId.startsWith("new-");
    if (isExistingId) {
      const existing = await prisma.candidate.findUnique({ where: { id: candidateId } });
      if (existing) {
        await prisma.candidate.update({
          where: { id: candidateId },
          data: {
            cvData: buffer,
            cvMimeType: mimeType,
            cvFilename: filename,
            hasCv: true,
            cvPath: `/api/cv/${candidateId}`,
          },
        });
        return NextResponse.json({
          ok: true,
          cvPath: `/api/cv/${candidateId}`,
          mode: "candidate-direct",
        });
      }
      // Fall-through si l'id n'existe plus en DB
    }

    // Cas 2 : nouveau candidat ou ID inconnu → création d'un draft
    const draft = await prisma.cvUpload.create({
      data: {
        filename,
        mimeType,
        data: buffer,
      },
    });

    return NextResponse.json({
      ok: true,
      cvPath: `/api/cv-draft/${draft.id}`,
      cvDraftId: draft.id,
      mode: "draft",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 });
  }
}

/**
 * Suppression du CV :
 * - Pour un draft (cvPath = /api/cv-draft/X) → supprime le CvUpload
 * - Pour un candidat existant (cvPath = /api/cv/X) → reset cvData à null
 * - Pour le legacy (cvPath = /cv/X.pdf) → ignore (filesystem éphémère, déjà perdu)
 */
export async function DELETE(request: NextRequest) {
  try {
    const { cvPath } = await request.json();
    if (!cvPath || typeof cvPath !== "string") {
      return NextResponse.json({ error: "cvPath requis" }, { status: 400 });
    }

    const draftMatch = cvPath.match(/^\/api\/cv-draft\/([\w-]+)$/);
    if (draftMatch) {
      const draftId = draftMatch[1];
      await prisma.cvUpload.delete({ where: { id: draftId } }).catch(() => null);
      return NextResponse.json({ ok: true, mode: "draft-deleted" });
    }

    const cvMatch = cvPath.match(/^\/api\/cv\/([\w-]+)$/);
    if (cvMatch) {
      const candidateId = cvMatch[1];
      await prisma.candidate
        .update({
          where: { id: candidateId },
          data: {
            cvData: null,
            cvMimeType: null,
            cvFilename: null,
            hasCv: false,
            cvPath: null,
          },
        })
        .catch(() => null);
      return NextResponse.json({ ok: true, mode: "candidate-cv-cleared" });
    }

    // Legacy /cv/xxx.pdf → no-op (déjà perdu sur Vercel)
    return NextResponse.json({ ok: true, mode: "legacy-noop" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

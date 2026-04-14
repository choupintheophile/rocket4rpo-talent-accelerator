"use server";

import { prisma } from "./db";
import { calcScore } from "./r4rpo-constants";
import type { Candidate } from "@prisma/client";

export type CandidateWithVerdict = Candidate & {
  verdictLabel: string;
  verdictLevel: "top" | "mid" | "low" | "nc";
};

function addVerdict(c: Candidate): CandidateWithVerdict {
  const filled = c.filled;
  const pct = c.pct;
  let level: "top" | "mid" | "low" | "nc" = "nc";
  let label = "Incomplet";
  if (filled >= 5) {
    if (pct >= 80) { level = "top"; label = "Prioritaire"; }
    else if (pct >= 60) { level = "mid"; label = "Secondaire"; }
    else { level = "low"; label = "Non retenu"; }
  }
  return { ...c, verdictLabel: label, verdictLevel: level };
}

export async function getCandidates(filter?: string): Promise<CandidateWithVerdict[]> {
  const candidates = await prisma.candidate.findMany({
    orderBy: { updatedAt: "desc" },
  });

  let result = candidates.map(addVerdict);

  if (filter && filter !== "all") {
    result = result.filter((c) => c.verdictLevel === filter);
  }

  return result;
}

export async function getCandidate(id: string): Promise<CandidateWithVerdict | null> {
  const c = await prisma.candidate.findUnique({ where: { id } });
  if (!c) return null;
  return addVerdict(c);
}

export async function createCandidate(data: {
  prenom: string;
  nom: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  date?: string;
  contrat?: string;
  tjm?: string;
  loc?: string;
  notes?: string;
  resumeText?: string;
  scores?: Record<string, number>;
  forces?: string[];
  risks?: string[];
  // v17 — taxonomies multi-select (auto-détectées)
  profileTypes?: string[];
  companyTypes?: string[];
  profileStyle?: string[];
  intelligenceTypes?: string[];
  // v18 — nouveaux champs entretien
  openCddCdi?: boolean;
  qualifProfile?: string;
  qualifLevel?: string;
  qualifRecruitedTypes?: string[];
  qualifContext?: Record<string, string[]>;
  intelligenceLevel?: string;
  motivationTypes?: string[];
  motivationLevel?: string;
  sympathyTypes?: string[];
  sympathyLevel?: string;
  // v19
  languagesSpoken?: { lang: string; level: string }[];
  hasCv?: boolean;
  cvPath?: string;
}): Promise<Candidate> {
  const sc = calcScore(data.scores || null);

  return prisma.candidate.create({
    data: {
      prenom: data.prenom,
      nom: data.nom,
      email: data.email || null,
      phone: data.phone || null,
      linkedin: data.linkedin || null,
      date: data.date ? new Date(data.date) : null,
      contrat: data.contrat || null,
      tjm: data.tjm || null,
      loc: data.loc || null,
      notes: data.notes || null,
      resumeText: data.resumeText || null,
      scores: data.scores || {},
      forces: data.forces || [],
      risks: data.risks || [],
      profileTypes: data.profileTypes || [],
      companyTypes: data.companyTypes || [],
      profileStyle: data.profileStyle || [],
      intelligenceTypes: data.intelligenceTypes || [],
      openCddCdi: data.openCddCdi ?? null,
      qualifProfile: data.qualifProfile || null,
      qualifLevel: data.qualifLevel || null,
      qualifRecruitedTypes: data.qualifRecruitedTypes || [],
      qualifContext: data.qualifContext || {},
      intelligenceLevel: data.intelligenceLevel || null,
      motivationTypes: data.motivationTypes || [],
      motivationLevel: data.motivationLevel || null,
      sympathyTypes: data.sympathyTypes || [],
      sympathyLevel: data.sympathyLevel || null,
      languagesSpoken: data.languagesSpoken || [],
      score: sc.total,
      maxScore: sc.max,
      pct: sc.pct,
      filled: sc.filled,
      hasCv: data.hasCv || false,
      cvPath: data.cvPath || null,
    },
  });
}

export async function updateCandidate(
  id: string,
  data: {
    prenom?: string;
    nom?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    date?: string;
    contrat?: string;
    tjm?: string;
    loc?: string;
    notes?: string;
    resumeText?: string;
    scores?: Record<string, number>;
    forces?: string[];
    risks?: string[];
    // v17 — taxonomies multi-select
    profileTypes?: string[];
    companyTypes?: string[];
    profileStyle?: string[];
    intelligenceTypes?: string[];
    // v18 — nouveaux champs entretien
    openCddCdi?: boolean;
    qualifProfile?: string;
    qualifLevel?: string;
    qualifRecruitedTypes?: string[];
    qualifContext?: Record<string, string[]>;
    intelligenceLevel?: string;
    motivationTypes?: string[];
    motivationLevel?: string;
    sympathyTypes?: string[];
    sympathyLevel?: string;
    // v19
    languagesSpoken?: { lang: string; level: string }[];
    hasCv?: boolean;
    cvPath?: string | null;
  }
): Promise<Candidate> {
  const sc = data.scores ? calcScore(data.scores) : null;

  const updateData: Record<string, unknown> = {};

  if (data.prenom !== undefined) updateData.prenom = data.prenom;
  if (data.nom !== undefined) updateData.nom = data.nom;
  if (data.email !== undefined) updateData.email = data.email || null;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.linkedin !== undefined) updateData.linkedin = data.linkedin || null;
  if (data.date !== undefined) updateData.date = data.date ? new Date(data.date) : null;
  if (data.contrat !== undefined) updateData.contrat = data.contrat || null;
  if (data.tjm !== undefined) updateData.tjm = data.tjm || null;
  if (data.loc !== undefined) updateData.loc = data.loc || null;
  if (data.notes !== undefined) updateData.notes = data.notes || null;
  if (data.resumeText !== undefined) updateData.resumeText = data.resumeText || null;
  if (data.scores !== undefined) updateData.scores = data.scores;
  if (data.forces !== undefined) updateData.forces = data.forces;
  if (data.risks !== undefined) updateData.risks = data.risks;
  if (data.profileTypes !== undefined) updateData.profileTypes = data.profileTypes;
  if (data.companyTypes !== undefined) updateData.companyTypes = data.companyTypes;
  if (data.profileStyle !== undefined) updateData.profileStyle = data.profileStyle;
  if (data.intelligenceTypes !== undefined) updateData.intelligenceTypes = data.intelligenceTypes;
  // v18
  if (data.openCddCdi !== undefined) updateData.openCddCdi = data.openCddCdi;
  if (data.qualifProfile !== undefined) updateData.qualifProfile = data.qualifProfile || null;
  if (data.qualifLevel !== undefined) updateData.qualifLevel = data.qualifLevel || null;
  if (data.qualifRecruitedTypes !== undefined) updateData.qualifRecruitedTypes = data.qualifRecruitedTypes;
  if (data.qualifContext !== undefined) updateData.qualifContext = data.qualifContext;
  if (data.intelligenceLevel !== undefined) updateData.intelligenceLevel = data.intelligenceLevel || null;
  if (data.motivationTypes !== undefined) updateData.motivationTypes = data.motivationTypes;
  if (data.motivationLevel !== undefined) updateData.motivationLevel = data.motivationLevel || null;
  if (data.sympathyTypes !== undefined) updateData.sympathyTypes = data.sympathyTypes;
  if (data.sympathyLevel !== undefined) updateData.sympathyLevel = data.sympathyLevel || null;
  if (data.languagesSpoken !== undefined) updateData.languagesSpoken = data.languagesSpoken;
  if (data.hasCv !== undefined) updateData.hasCv = data.hasCv;
  if (data.cvPath !== undefined) updateData.cvPath = data.cvPath;

  if (sc) {
    updateData.score = sc.total;
    updateData.maxScore = sc.max;
    updateData.pct = sc.pct;
    updateData.filled = sc.filled;
  }

  return prisma.candidate.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteCandidate(id: string): Promise<void> {
  await prisma.candidate.delete({ where: { id } });
}

export async function getCandidateStats() {
  const all = await prisma.candidate.findMany({
    select: { pct: true, filled: true },
  });

  const total = all.length;
  const prioritaire = all.filter((c) => c.filled >= 5 && c.pct >= 80).length;
  const secondaire = all.filter((c) => c.filled >= 5 && c.pct >= 60 && c.pct < 80).length;
  const nonRetenu = all.filter((c) => c.filled >= 5 && c.pct < 60).length;

  return { total, prioritaire, secondaire, nonRetenu };
}

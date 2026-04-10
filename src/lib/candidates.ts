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
  if (filled >= 3) {
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
  dispo?: string;
  loc?: string;
  remote?: string;
  days?: string;
  sector?: string;
  notes?: string;
  resumeText?: string;
  scores?: Record<string, number>;
  forces?: string[];
  risks?: string[];
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
      dispo: data.dispo || null,
      loc: data.loc || null,
      remote: data.remote || null,
      days: data.days || null,
      sector: data.sector || null,
      notes: data.notes || null,
      resumeText: data.resumeText || null,
      scores: data.scores || {},
      forces: data.forces || [],
      risks: data.risks || [],
      score: sc.total,
      maxScore: sc.max,
      pct: sc.pct,
      filled: sc.filled,
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
    dispo?: string;
    loc?: string;
    remote?: string;
    days?: string;
    sector?: string;
    notes?: string;
    resumeText?: string;
    scores?: Record<string, number>;
    forces?: string[];
    risks?: string[];
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
  if (data.dispo !== undefined) updateData.dispo = data.dispo || null;
  if (data.loc !== undefined) updateData.loc = data.loc || null;
  if (data.remote !== undefined) updateData.remote = data.remote || null;
  if (data.days !== undefined) updateData.days = data.days || null;
  if (data.sector !== undefined) updateData.sector = data.sector || null;
  if (data.notes !== undefined) updateData.notes = data.notes || null;
  if (data.resumeText !== undefined) updateData.resumeText = data.resumeText || null;
  if (data.scores !== undefined) updateData.scores = data.scores;
  if (data.forces !== undefined) updateData.forces = data.forces;
  if (data.risks !== undefined) updateData.risks = data.risks;

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
  const prioritaire = all.filter((c) => c.filled >= 3 && c.pct >= 80).length;
  const secondaire = all.filter((c) => c.filled >= 3 && c.pct >= 60 && c.pct < 80).length;

  return { total, prioritaire, secondaire };
}

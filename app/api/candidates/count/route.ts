import { NextResponse } from "next/server";
import { getCandidateStats } from "@/lib/candidates";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getCandidateStats();
  return NextResponse.json({ total: stats.total });
}

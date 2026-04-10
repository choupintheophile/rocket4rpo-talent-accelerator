import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";

// Allowed users — passwords hashed with SHA-256
// To generate: echo -n "password" | sha256sum
const USERS: Record<string, string> = {
  "theo@rocket4rpo.com": process.env.AUTH_HASH_THEO || "",
  "admin@rocket4rpo.com": process.env.AUTH_HASH_ADMIN || "",
  "clement@rocket4rpo.com": process.env.AUTH_HASH_CLEMENT || "",
};

const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString("hex");

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function createSessionToken(email: string): string {
  const payload = `${email}:${Date.now()}:${randomBytes(16).toString("hex")}`;
  const signature = createHash("sha256").update(payload + SESSION_SECRET).digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const parts = decoded.split(":");
    if (parts.length < 4) return null;
    const signature = parts.pop()!;
    const payload = parts.join(":");
    const expected = createHash("sha256").update(payload + SESSION_SECRET).digest("hex");
    if (signature !== expected) return null;
    // Check expiry (24h)
    const timestamp = parseInt(parts[1]);
    if (Date.now() - timestamp > 86400000) return null;
    return parts[0]; // email
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, googleCredential } = body;

  // Google OAuth login
  if (googleCredential) {
    try {
      const payload = JSON.parse(
        Buffer.from(googleCredential.split(".")[1], "base64").toString()
      );
      const userEmail = payload.email || "";
      const domain = userEmail.split("@")[1];

      if (domain !== "rocket4rpo.com") {
        return NextResponse.json(
          { error: "Accès réservé aux comptes @rocket4rpo.com" },
          { status: 403 }
        );
      }

      const token = createSessionToken(userEmail);
      const response = NextResponse.json({ ok: true, user: payload.name || userEmail });
      response.cookies.set("r4rpo_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400,
        path: "/",
      });
      return response;
    } catch {
      return NextResponse.json({ error: "Token Google invalide" }, { status: 401 });
    }
  }

  // Email/password login
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
  }

  const expectedHash = USERS[email.toLowerCase()];
  if (!expectedHash) {
    return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
  }

  const inputHash = hashPassword(password);
  if (inputHash !== expectedHash) {
    return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
  }

  const token = createSessionToken(email);
  const response = NextResponse.json({ ok: true, user: email.split("@")[0] });
  response.cookies.set("r4rpo_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("r4rpo_session");
  return response;
}

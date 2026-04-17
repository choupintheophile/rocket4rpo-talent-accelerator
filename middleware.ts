import { NextRequest, NextResponse } from "next/server";

// v23.4 — Slugs auto-générés à désindexer (410 Gone).
// Google accélère la sortie de l'index sur 410 (vs noindex seul).
// Patterns alignés avec isAutoGenThin() dans src/lib/blog-canonicals.ts.
const AUTOGEN_SLUG_PATTERNS: RegExp[] = [
  /^p2-/,
  /^extra-/,
  /-\d{1,4}$/,
];

function isAutoGenSlug(slug: string): boolean {
  return AUTOGEN_SLUG_PATTERNS.some((re) => re.test(slug));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 410 Gone sur les articles de blog auto-générés (désindexation rapide)
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length).split("/")[0];
    if (slug && isAutoGenSlug(slug)) {
      return new NextResponse(null, {
        status: 410,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      });
    }
    return NextResponse.next();
  }

  // Only protect /webapp-testing routes (except login and API)
  if (!pathname.startsWith("/webapp-testing")) return NextResponse.next();
  if (pathname === "/webapp-testing/login") return NextResponse.next();

  const session = request.cookies.get("r4rpo_session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/webapp-testing/login", request.url));
  }

  // Basic token structure check (full verification in API route)
  try {
    const decoded = Buffer.from(session, "base64url").toString();
    const parts = decoded.split(":");
    if (parts.length < 4) throw new Error("invalid");
    const timestamp = parseInt(parts[1]);
    if (Date.now() - timestamp > 86400000) throw new Error("expired");
  } catch {
    const response = NextResponse.redirect(new URL("/webapp-testing/login", request.url));
    response.cookies.delete("r4rpo_session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/webapp-testing/:path*", "/blog/:slug*"],
};

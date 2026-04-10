import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  matcher: ["/webapp-testing/:path*"],
};

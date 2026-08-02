import { NextRequest, NextResponse } from "next/server";

export function middleweare(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("admin_auth");
  const correctPassword = process.env.ADMIN_PASSWORD;
  const isLoggedIn = authCookie?.value === correctPassword;

  if (!isLoggedIn) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

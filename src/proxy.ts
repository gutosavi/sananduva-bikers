import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = pathname === "/admin/login";

  if (!isLoggedIn) {
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Usuário não autorizado." },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

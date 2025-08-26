import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Protected and public routes
const protectedRoutes = ["/dashboard", "/verify-email", "/delete-account"];
const publicRoutes = ["/login", "/register", "/reset-password"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 1. Get the JWT token cookie (set by backend)
  const token = (await cookies()).get("token")?.value;

  // 2. Redirect if trying to access protected route without session
  if (isProtectedRoute && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 3. Redirect if logged in user tries to access public routes
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Exclude middleware from APIs and static files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

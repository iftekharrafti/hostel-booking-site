import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authToken = request.cookies.get("TOKEN_LOGIN")?.value;

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/application";

  if (loggedInUserNotAccessPaths) {
    if (authToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};

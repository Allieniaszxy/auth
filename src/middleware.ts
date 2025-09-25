import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuth = request.cookies.get("token")?.value || "";

  if (path === "/client/login" || path === "/client/signup") {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/client/login", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/client/login", "/client/signup", "/client/profile"],
};

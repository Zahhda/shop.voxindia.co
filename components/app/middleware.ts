import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // If it's the NextAuth session endpoint, allow the request
  if (path.includes("/api/auth")) {
    return NextResponse.next()
  }

  // For all other paths, proceed normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all API routes
    "/api/:path*",
    // Match all pages except public ones
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

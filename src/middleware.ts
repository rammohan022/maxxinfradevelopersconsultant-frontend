import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignore static assets, api routes, and admin routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const backendUrl = process.env.baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003";

  try {
    const res = await fetch(`${backendUrl}/seo/redirects/active`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const redirects: Array<{ sourcePath: string; targetPath: string; statusCode: number }> = await res.json();
      
      const matchingRedirect = redirects.find((r) => {
        const src = r.sourcePath.trim();
        return src === pathname || (src !== "/" && src.replace(/\/$/, "") === pathname.replace(/\/$/, ""));
      });

      if (matchingRedirect) {
        const target = matchingRedirect.targetPath.startsWith("http")
          ? matchingRedirect.targetPath
          : new URL(matchingRedirect.targetPath, request.url);
        
        return NextResponse.redirect(target, matchingRedirect.statusCode || 301);
      }
    }
  } catch (err) {
    // Fail gracefully if backend is unreachable
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const backendUrl = process.env.baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003";
  try {
    const res = await fetch(`${backendUrl}/seo/robots.txt`, {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) {
      throw new Error(`Backend error: ${res.statusText}`);
    }
    const txt = await res.text();
    return new NextResponse(txt, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("Failed to fetch robots.txt:", err);
    return new NextResponse(
      `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /login\n\nSitemap: https://maxxinfradevelopersconsultant.com/sitemap.xml`,
      {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }
}

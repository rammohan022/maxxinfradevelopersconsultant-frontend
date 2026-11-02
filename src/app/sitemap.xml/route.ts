import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const backendUrl = process.env.baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003";
  try {
    const res = await fetch(`${backendUrl}/seo/sitemap.xml`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Backend error: ${res.statusText}`);
    }
    const xml = await res.text();
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("Failed to generate sitemap.xml:", err);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://maxxinfradevelopersconsultant.com</loc></url></urlset>`,
      {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}

import BlogDetailsClient from '../components/BlogDetailsClient';

const fallbackBlogs = [
  'how-to-hire-top-talent',
  'importance-of-compliance-in-hr',
  'how-hr-solutions-are-transforming-modern-workforce-management',
]

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (baseUrl) {
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const res = await fetch(`${cleanBaseUrl}/blogs`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        const data = await res.json();
        const apiSlugs = data.map((blog: any) => ({ slug: blog.slug || String(blog.id) }));
        
        // Merge API slugs with fallback slugs to prevent "missing param" errors
        const allSlugs = [...apiSlugs];
        for (const fSlug of fallbackBlogs) {
          if (!allSlugs.find(s => s.slug === fSlug)) {
            allSlugs.push({ slug: fSlug });
          }
        }
        
        if (allSlugs.length > 0) return allSlugs;
      }
    }
  } catch (error) {
    console.error("Failed to fetch blogs for generateStaticParams:", error);
  }

  // Fallback if API is offline or not set during build time
  return fallbackBlogs.map((slug) => ({
    slug,
  }));
}

export default function BlogDetails() {
  return <BlogDetailsClient />;
}

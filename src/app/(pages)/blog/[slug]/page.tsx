import BlogDetailsClient from '../components/BlogDetailsClient';

const fallbackBlogs = [
  'how-to-hire-top-talent',
  'importance-of-compliance-in-hr',
]

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (baseUrl) {
      const res = await fetch(`${baseUrl}/blogs`);
      if (res.ok) {
        const data = await res.json();
        const apiSlugs = data.map((blog: any) => ({ slug: blog.slug || String(blog.id) }));
        if (apiSlugs.length > 0) return apiSlugs;
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

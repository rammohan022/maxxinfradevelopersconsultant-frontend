import CategoryServicesClient from '../components/CategoryServicesClient';

// Fallback category slugs for static export
const fallbackCategorySlugs = [
  'seo-service',
  'hiring-services',
  'hr-training',
  'labor-compliance',
  'executive-search',
  'payroll-management',
  'general-services',
];

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (baseUrl) {
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      
      // Fetch both service-categories and services to extract all category slugs
      const [categoriesRes, servicesRes] = await Promise.all([
        fetch(`${cleanBaseUrl}/service-categories`, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(2000),
        }),
        fetch(`${cleanBaseUrl}/services`, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(2000),
        }),
      ]);

      const slugsSet = new Set<string>();

      if (categoriesRes.ok) {
        const categories = await categoriesRes.json();
        categories.forEach((cat: any) => {
          if (cat.slug) slugsSet.add(cat.slug);
        });
      }

      if (servicesRes.ok) {
        const services = await servicesRes.json();
        services.forEach((s: any) => {
          if (s.category) {
            const slug = s.category
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
            if (slug) slugsSet.add(slug);
          }
        });
      }

      if (slugsSet.size > 0) {
        return Array.from(slugsSet).map((categorySlug) => ({
          categorySlug,
        }));
      }
    }
  } catch (error) {
    console.error('Failed to fetch categories for generateStaticParams:', error);
  }

  return fallbackCategorySlugs.map((categorySlug) => ({
    categorySlug,
  }));
}

export default function CategoryPage() {
  return <CategoryServicesClient />;
}

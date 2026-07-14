import ServiceDetailsClient from '../components/ServiceDetailsClient';

// Fallback slug list for static export
const fallbackPracticeAreas = [
  'hiring-staffing',
  'hr-training',
  'labor-compliance',
  'executive-search',
  'payroll-management',
  'hr-consulting',
]

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (baseUrl) {
      const res = await fetch(`${baseUrl}/services`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const apiSlugs = data.map((area: any) => ({ slug: area.slug }));
        if (apiSlugs.length > 0) return apiSlugs;
      }
    }
  } catch (error) {
    console.error("Failed to fetch services for generateStaticParams:", error);
  }

  return fallbackPracticeAreas.map((slug) => ({
    slug,
  }));
}

export default function ServiceDetails() {
  return <ServiceDetailsClient />;
}

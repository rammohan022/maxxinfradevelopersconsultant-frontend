import PracticeAreaDetailsClient from '../components/PracticeAreaDetailsClient';

// Fallback slug list for static export
const fallbackPracticeAreas = [
  'apostille-service',
  'criminal-cases',
  'ed-cases',
  'pmla-cases',
  'eow-cases',
  'cyber-crime',
  'arbitration-adr',
  'arbitration-alternative-dispute-resolution',
  'banking-finance',
  'corporate-commercial',
  'mergers-acquisitions',
  'intellectual-property',
  'real-estate',
  'labor-employment',
  'litigation',
  'white-collar-crime',
]

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (baseUrl) {
      const res = await fetch(`${baseUrl}/practice-areas`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const apiSlugs = data.map((area: any) => ({ slug: area.slug }));
        if (apiSlugs.length > 0) return apiSlugs;
      }
    }
  } catch (error) {
    console.error("Failed to fetch practice areas for generateStaticParams:", error);
  }

  return fallbackPracticeAreas.map((slug) => ({
    slug,
  }));
}

export default function PracticeAreaDetails() {
  return <PracticeAreaDetailsClient />;
}

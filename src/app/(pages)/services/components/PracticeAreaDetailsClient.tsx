"use client";

import { useGetServicesQuery } from '@/services/services';
import { HeroDetails, MainContentSection } from '@/components/services';
import { useParams } from 'next/navigation';

export default function PracticeAreaDetailsClient() {
    const { slug } = useParams();
    const { data: practiceAreas, isLoading } = useGetServicesQuery();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const normalizeSlug = (s: string) => s.replace(/[\u2013\u2014]/g, '-').toLowerCase();
    const area = practiceAreas?.find((a) => normalizeSlug(a.slug) === normalizeSlug(slug as string));

    if (!area) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-white">
                <h1 className="text-4xl font-bold mb-4">Practice Area Not Found</h1>
                <p className="text-gray-400">The page you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <>
            <HeroDetails
                title={area.title}
                slug={area.slug}
                innerImage={area.innerImage}
            />
            <MainContentSection
                title={area.title}
                overview={area.overview}
                services={area.services}
                approach={area.approach}
                quoteText={area.quoteText}
                quoteAuthor={area.quoteAuthor}
                faqs={area.faqs}
            />
        </>
    );
}

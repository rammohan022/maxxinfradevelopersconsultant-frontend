"use client";

import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Container } from '@/components/ui'
import { getImageUrl } from '@/lib/utils/imageUtils';
import Image from "next/image";
import Link from "next/link";
import { useGetBlogsQuery } from "@/services/blog";

const LatestArticlesSection = () => {
    const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

    if (isLoading) return <div className="py-20 text-center text-slate-500">Loading articles...</div>;
    if (isError || blogs.length === 0) return null;

    // Split blogs into "Latest" (first 3) and "More Insights" (rest)
    const latestArticles = blogs.slice(0, 3);
    const moreInsights = blogs.slice(3);

    return (
        <>
            <section className="bg-gray-50 py-12">
                <Container>
                    {/* Header */}
                    <div className="mb-12 flex items-center justify-between">
                        <h2 className="font-serif text-3xl font-bold text-navy">
                            Latest Articles
                        </h2>
                        <div className="ml-8 h-1 flex-1 bg-gradient-to-r from-red-800 via-red-700 to-transparent" />
                    </div>

                    {/* Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {latestArticles.map((article) => (
                            <article
                                key={article.id}
                                className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-2xl flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={getImageUrl(article.blogImage) || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80"}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy">
                                            {article.category || "Legal Insights"}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 p-6 flex flex-col flex-1">
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-red-700" />
                                            <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    <h3 className="font-serif text-xl font-bold leading-tight text-navy transition-colors group-hover:text-red-700 line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <div
                                        className="leading-relaxed text-gray-600 line-clamp-3 text-sm"
                                        dangerouslySetInnerHTML={{ __html: article.content.substring(0, 150) + "..." }}
                                    />

                                    <div className="mt-auto pt-4">
                                        <Link href={`/blog/${article.slug || article.id}`} className="group/btn inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-red-700">
                                            <span>Read More</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            {moreInsights.length > 0 && (
                <section className="bg-white py-12">
                    <Container>
                        {/* Header */}
                        <div className="mb-12 flex items-center justify-between">
                            <h2 className="font-serif text-3xl font-bold text-navy">
                                More Insights
                            </h2>
                            <div className="ml-8 h-1 flex-1 bg-gradient-to-r from-red-800 via-red-700 to-transparent" />
                        </div>

                        {/* Grid */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {moreInsights.map((article) => (
                                <article
                                    key={article.id}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-2xl flex flex-col"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={getImageUrl(article.blogImage) || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80"}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy">
                                                {article.category || "Legal Insights"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 p-6 flex flex-col flex-1">
                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4 text-red-700" />
                                                <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>

                                        <h3 className="font-serif text-xl font-bold leading-tight text-navy transition-colors group-hover:text-red-700 line-clamp-2">
                                            {article.title}
                                        </h3>

                                        <div
                                            className="leading-relaxed text-gray-600 line-clamp-3 text-sm"
                                            dangerouslySetInnerHTML={{ __html: article.content.substring(0, 150) + "..." }}
                                        />

                                        <div className="mt-auto pt-4">
                                            <Link href={`/blog/${article.slug || article.id}`} className="group/btn inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-red-700">
                                                <span>Read More</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
};

export default LatestArticlesSection;

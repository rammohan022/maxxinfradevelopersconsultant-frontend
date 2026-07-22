"use client";

import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { Calendar, ArrowRight, Search, Loader2 } from 'lucide-react'
import { useGetBlogsQuery } from '@/services/blog'
import { notFound, useSearchParams } from 'next/navigation'
import { getImageUrl } from '@/lib/utils/imageUtils'

// Helper to strip HTML tags for the excerpt
const stripHtml = (html: string) => {
    if (typeof window === 'undefined') return html.replace(/<[^>]*>?/gm, '');
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};
const categories = [
    'Corporate Law',
    'Arbitration',
    'Insolvency',
    'IP Law',
    'Technology Law',
    'Tax Law',
    'Litigation',
]



function BlogDetailsContent() {
    const searchParams = useSearchParams();
    const idOrSlug = searchParams.get('id') || '';

    // We use useGetBlogsQuery and filter locally because a pure static export ('output: export') 
    // cannot easily do dynamic server-side fetching per page without generateStaticParams
    const { data: blogs, isLoading, isError } = useGetBlogsQuery();

    if (isLoading || !idOrSlug) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !blogs) {
        return notFound();
    }

    // Find the blog matching the slug or id
    const article = blogs.find((b) => b.slug === idOrSlug || b.id === idOrSlug);

    if (!article) {
        return notFound();
    }

    // Formatting date
    const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const recentBlogsList = blogs.filter(b => b.id !== article.id).slice(0, 4);

    return (
        <>
            {/* ================= 1. HERO / PAGE HEADER ================= */}
            <section className="relative min-h-[400px] overflow-hidden bg-navy flex flex-col justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/img/contact-hero-bg-v2.png"
                        alt="Modern workspace background matching main blog"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,28,46,0.9),rgba(15,28,46,0.6))]" />
                <div className="relative z-10 mx-auto w-full max-w-7xl py-16 px-4 sm:px-5 lg:px-6">
                    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-300" aria-label="Breadcrumb">
                        <Link href="/" className="transition hover:text-white">Home</Link>
                        <span className="text-gray-400" aria-hidden="true">&gt;</span>
                        <Link href="/blog" className="transition hover:text-white">Blog</Link>
                        <span className="text-gray-400" aria-hidden="true">&gt;</span>
                        <span className="font-medium text-white truncate max-w-[200px] sm:max-w-none" aria-current="page">{article.title}</span>
                    </nav>
                    <h1 className="font-serif capitalize text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-white mb-4">
                        {article.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-4xl line-clamp-2">
                        {stripHtml(article.content)}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mt-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-secondary" />
                            {formattedDate}
                        </span>
                        {article.category && (
                            <span className="rounded-full bg-white/10 px-3 py-1 text-white font-medium">
                                {article.category}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* ================= 2 & 3. MAIN CONTENT + SIDEBAR ================= */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <Container>
                    <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
                        {/* ================= BLOG CONTENT AREA ================= */}
                        <article className="min-w-0">
                            <div className="rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm mb-8">
                                <div className="relative aspect-video w-full bg-navy/10">
                                    <Image
                                        src={getImageUrl(article.blogImage) || "/img/blog-fallback.jpg"}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />
                                </div>
                            </div>

                            {/* Social sharing near top */}
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-sm font-medium text-gray-600">Share:</span>
                                <a href="#" className="p-2 rounded border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition" aria-label="Share on LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="#" className="p-2 rounded border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition" aria-label="Share on Twitter">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a href="#" className="p-2 rounded border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition" aria-label="Share on Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                            </div>

                            <div
                                className="prose prose-lg max-w-none text-gray-700 mt-6"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* ================= AUTHOR SECTION (hidden) ================= */}
                            {/* <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-navy/10 relative">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy">{article.author.name}</h3>
                    <p className="text-sm text-primary font-medium mt-0.5">{article.author.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mt-2">{article.author.bio}</p>
                  </div>
                </div>
              </div> */}
                        </article>

                        {/* ================= 4. SIDEBAR ================= */}
                        <aside className="lg:pt-0">
                            <div className="sticky top-24 space-y-8">
                                <div>
                                    <label htmlFor="sidebar-search" className="sr-only">Search blog</label>
                                    <div className="relative">
                                        <input
                                            id="sidebar-search"
                                            type="search"
                                            placeholder="Search articles..."
                                            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="rounded-lg bg-white border border-gray-100 shadow-sm p-6">
                                    <h3 className="font-serif text-lg font-bold text-navy mb-4">Categories</h3>
                                    <ul className="space-y-2">
                                        {Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).map((cat) => (
                                            <li key={cat}>
                                                <Link href="/blog" className="text-gray-600 hover:text-primary transition text-sm">
                                                    {cat}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-lg bg-white border border-gray-100 shadow-sm p-6">
                                    <h3 className="font-serif text-lg font-bold text-navy mb-4">Recent Posts</h3>
                                    <ul className="space-y-4">
                                        {recentBlogsList.map((post) => (
                                            <li key={post.id}>
                                                <Link href={`/blog/blog-details?id=${post.slug || post.id}`} className="group block">
                                                    <span className="font-medium text-navy text-sm group-hover:text-primary transition line-clamp-2">{post.title}</span>
                                                    <span className="text-xs text-gray-500 mt-0.5 block">
                                                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* 
                                <div className="rounded-lg bg-white border border-gray-100 shadow-sm p-6">
                                    <h3 className="font-serif text-lg font-bold text-navy mb-4">Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Corporate', 'Litigation', 'Arbitration', 'IP', 'Tax', 'Regulatory'].map((area) => (
                                            <Link key={area} href="/services" className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-navy hover:bg-primary hover:text-white transition">
                                                {area}
                                            </Link>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </aside>
                    </div>
                </Container>
            </section>

            {/* ================= 7. RELATED ARTICLES ================= */}
            {recentBlogsList.length > 0 && (
                <section className="py-12 lg:py-16 bg-white">
                    <Container>
                        <div className="mb-12 flex items-center justify-between">
                            <h2 className="font-serif text-3xl font-bold text-navy">Related Articles</h2>
                            <div className="ml-8 h-1 flex-1 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {recentBlogsList.slice(0, 3).map((item) => (
                                <article key={item.id} className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-xl border border-gray-100 flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={getImageUrl(item.blogImage) || "/img/blog-fallback.jpg"}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy">{item.category || "Legal"}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            <span>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <h3 className="font-serif text-xl font-bold leading-tight text-navy transition-colors group-hover:text-primary">
                                            {item.title}
                                        </h3>
                                        <div className="leading-relaxed text-gray-600 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) }} />
                                        <div className="mt-auto pt-4">
                                            <Link href={`/blog/blog-details?id=${item.slug || item.id}`} className="inline-flex items-center gap-2 font-semibold text-navy hover:text-primary transition-colors text-sm">
                                                <span>Read More</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ================= 8. CTA ================= */}
            <section className="relative overflow-hidden bg-navy py-16 lg:py-20">
                <div className="absolute inset-0">
                    <Image
                        src="/img/contact-hero-bg-v2.png"
                        alt="Modern workspace consulting background"
                        fill
                        className="object-cover opacity-30"
                    />
                </div>
                <Container className="relative z-10 max-w-3xl text-center">
                    <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
                        Need Expert Assistance? Speak With Our Advisors
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Our experienced consultants are ready to provide strategic advice tailored to your needs. Contact us for a consultation.
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-block bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-navy"
                    >
                        Contact Us
                    </Link>
                </Container>
            </section>
        </>
    )
}

export default function BlogDetailsPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        }>
            <BlogDetailsContent />
        </Suspense>
    )
}


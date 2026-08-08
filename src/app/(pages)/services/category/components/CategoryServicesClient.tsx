'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Container, CallToAction } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetServicesQuery, Service } from '@/services/services';
import { useGetServiceCategoriesQuery } from '@/services/serviceCategory';
import { slugifyCategory, unslugifyCategory } from '@/lib/utils/slugUtils';
import { getImageUrl } from '@/lib/utils/imageUtils';
import {
  ChevronRight,
  ChevronLeft,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Layers,
  ShieldCheck,
  Zap,
  Award,
  BookOpen,
} from 'lucide-react';

const ITEMS_PER_PAGE = 12;

// Convert ALL CAPS or mixed text to Title Case
const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function CategoryServicesClient() {
  const params = useParams();
  const router = useRouter();
  const rawCategorySlug = (params?.categorySlug as string) || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Fetch services and categories
  const { data: rawServices = [], isLoading: isServicesLoading } = useGetServicesQuery();
  const allServices = useMemo(() => (rawServices || []).filter((s) => s.status !== 'Draft'), [rawServices]);
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetServiceCategoriesQuery();

  // Reset page number on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [rawCategorySlug, searchTerm]);

  // Extract all distinct categories from backend services + serviceCategories table
  const availableCategories = useMemo(() => {
    const map = new Map<string, { name: string; slug: string; count: number }>();

    // Add from service-categories table
    categories.forEach((cat) => {
      const slug = cat.slug || slugifyCategory(cat.name);
      map.set(slug, { name: cat.name, slug, count: 0 });
    });

    // Add / calculate counts from services list
    allServices.forEach((service) => {
      const catName = service.category || 'General Services';
      const slug = slugifyCategory(catName);
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { name: catName, slug, count: 1 });
      }
    });

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [categories, allServices]);

  // Active Category Name
  const activeCategoryName = useMemo(() => {
    if (!rawCategorySlug) return 'All Services';
    const activeCategoryObj = categories.find(
      (c) => c.slug === rawCategorySlug || slugifyCategory(c.name) === rawCategorySlug
    );
    if (activeCategoryObj) return toTitleCase(activeCategoryObj.name);
    const matchingService = allServices.find(
      (s) => s.category && slugifyCategory(s.category) === rawCategorySlug
    );
    if (matchingService?.category) return toTitleCase(matchingService.category);
    return unslugifyCategory(rawCategorySlug) || 'Services';
  }, [rawCategorySlug, categories, allServices]);

  // Filter services belonging to this category or all services
  const categoryServices = useMemo(() => {
    if (!rawCategorySlug) return allServices;
    return allServices.filter((s) => {
      const serviceCatSlug = slugifyCategory(s.category || 'General Services');
      return (
        serviceCatSlug === rawCategorySlug ||
        s.category?.toLowerCase().trim() === activeCategoryName.toLowerCase().trim()
      );
    });
  }, [allServices, rawCategorySlug, activeCategoryName]);

  // Apply search filtering
  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return categoryServices;
    const term = searchTerm.toLowerCase();
    return categoryServices.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        (s.overview && s.overview.toLowerCase().includes(term))
    );
  }, [categoryServices, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  // Aggregate FAQs from services in this category
  const categoryFaqs = useMemo(() => {
    const faqs: { question: string; answer: string; serviceTitle?: string }[] = [];
    categoryServices.forEach((s) => {
      if (s.faqs && Array.isArray(s.faqs)) {
        s.faqs.forEach((faq) => {
          if (faq.question && faq.answer) {
            faqs.push({
              question: faq.question,
              answer: faq.answer,
              serviceTitle: s.title,
            });
          }
        });
      }
    });
    return faqs;
  }, [categoryServices]);

  if (isServicesLoading || isCategoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">Loading services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gray-900 min-h-[380px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
            alt={activeCategoryName}
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>

        {/* Solid Dark Gray Overlay with Opacity */}
        <div className="absolute inset-0 bg-gray-900/70" />

        {/* Content */}
        <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
          <div className="max-w-3xl w-full text-left">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-200 mb-4 flex-wrap font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-400">&gt;</span>
              <Link href="/services" className="hover:text-white transition-colors">
                Our Services
              </Link>
              {rawCategorySlug && (
                <>
                  <span className="text-gray-400">&gt;</span>
                  <span className="font-bold text-secondary">{activeCategoryName}</span>
                </>
              )}
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-secondary text-xs font-bold tracking-widest mb-4 backdrop-blur-md">
              <Layers size={14} />
              <span>Service Category</span>
            </div>

            <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-4 drop-shadow-lg">
              {activeCategoryName}
            </h1>

            <p className="text-xs md:text-sm text-gray-100 mt-1 max-w-3xl leading-relaxed mb-8 font-normal drop-shadow-md">
              Explore our specialized consulting services under{' '}
              <span className="text-white font-bold">{activeCategoryName}</span>. Built to empower your organization with expert guidance, seamless compliance, and strategic excellence.
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <div className="px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white backdrop-blur-md flex items-center gap-2 shadow-md">
                <Sparkles size={16} className="text-secondary" />
                <span>
                  <strong className="text-white font-bold">{categoryServices.length}</strong> Specialized Services Available
                </span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white backdrop-blur-md flex items-center gap-2 shadow-md">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>100% Industry Compliant & Certified</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORY SWITCHER & SEARCH BAR */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <Container className="py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 scroll-smooth">

              {/* All Services Tab */}
              <Link
                href="/services"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${!rawCategorySlug
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <span>All Services</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${!rawCategorySlug ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                >
                  {allServices.length}
                </span>
              </Link>

              {availableCategories.map((cat) => {
                const isActive = cat.slug === rawCategorySlug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/services/category/${cat.slug}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                    >
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] lg:max-w-xs shrink-0">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder={`Search in ${activeCategoryName}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES GRID */}
      <Container className="py-12 md:py-16">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {activeCategoryName} Offerings
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Showing {paginatedServices.length} of {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isServicesLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse h-80 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-full h-40 bg-slate-200 rounded-xl" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
                <div className="h-10 bg-slate-200 rounded-lg w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isServicesLoading && filteredServices.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">No Services Found</h3>
            <p className="text-slate-600 text-sm mb-6">
              {searchTerm
                ? `No services matching "${searchTerm}" found under ${activeCategoryName}.`
                : `No services have been assigned to ${activeCategoryName} yet.`}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/contact-us"
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition inline-block"
              >
                Request Custom Solution
              </Link>
            )}
          </div>
        )}

        {/* Services Cards */}
        {!isServicesLoading && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {paginatedServices.map((service) => {
              const imageSrc = getImageUrl(service.innerImage);

              return (
                <div
                  key={service.id}
                  className="group flex flex-col space-y-4"
                >
                  {/* Top Image with Rounded Corners */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="relative h-56 sm:h-64 w-full rounded-3xl overflow-hidden block shadow-sm group-hover:shadow-md transition-all duration-300 bg-slate-100"
                  >
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>

                  {/* Title & Overview Text Below Image */}
                  <div className="space-y-3 px-1 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <Link href={`/services/${service.slug}`} className="block">
                        <h3 
                          className="font-semibold text-primary mb-1 hover:text-secondary transition-colors line-clamp-2 leading-snug capitalize"
                          title={service.title}
                        >
                          {service.title.toLowerCase()}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {service.overview
                          ? service.overview.replace(/<[^>]*>?/gm, '')
                          : 'Professional HR consulting and workforce compliance solutions for modern enterprises.'}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-secondary hover:text-primary font-bold text-xs tracking-wider group/link transition-colors pt-1"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight size={14} className="transform group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!isServicesLoading && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-xl text-xs sm:text-sm font-bold transition-all ${currentPage === pageNum
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </Container>

      {/* CATEGORY FAQs SECTION */}
      {categoryFaqs.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <Container>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-secondary/20 text-secondary text-xs font-bold tracking-widest mb-3">
                <HelpCircle size={14} />
                <span>Frequently Asked Questions</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                Common Questions about {activeCategoryName}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4.5 sm:gap-5 items-start">
              {categoryFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 font-semibold text-slate-800 text-sm sm:text-base hover:text-primary transition-colors leading-snug"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-secondary' : ''
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                            <p>{faq.answer}</p>
                            {faq.serviceTitle && (
                              <span className="inline-block mt-2 text-[11px] font-bold text-secondary tracking-wider">
                                Related Service: {faq.serviceTitle}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* CALL TO ACTION */}
      <CallToAction />
    </div>
  );
}

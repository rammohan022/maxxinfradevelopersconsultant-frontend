'use client';

import React, { useState, useMemo } from 'react';
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

export default function CategoryServicesClient() {
  const params = useParams();
  const router = useRouter();
  const rawCategorySlug = (params?.categorySlug as string) || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Fetch services and categories
  const { data: allServices = [], isLoading: isServicesLoading } = useGetServicesQuery();
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetServiceCategoriesQuery();

  // Find active category info
  const activeCategoryObj = useMemo(() => {
    return categories.find(
      (c) => c.slug === rawCategorySlug || slugifyCategory(c.name) === rawCategorySlug
    );
  }, [categories, rawCategorySlug]);

  const activeCategoryName = useMemo(() => {
    if (activeCategoryObj) return activeCategoryObj.name;
    // Fallback search across allServices category string
    const matchingService = allServices.find(
      (s) => s.category && slugifyCategory(s.category) === rawCategorySlug
    );
    if (matchingService?.category) return matchingService.category;
    return unslugifyCategory(rawCategorySlug);
  }, [activeCategoryObj, allServices, rawCategorySlug]);

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

  // Filter services belonging to this category
  const categoryServices = useMemo(() => {
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

  // Aggregate FAQs from services in this category
  const categoryFaqs = useMemo(() => {
    const faqs: { question: string; answer: string; serviceTitle?: string }[] = [];
    categoryServices.forEach((s) => {
      if (s.faqs && Array.isArray(s.faqs)) {
        s.faqs.forEach((faq) => {
          if (faq.question && faq.answer) {
            faqs.push({ ...faq, serviceTitle: s.title });
          }
        });
      }
    });
    return faqs;
  }, [categoryServices]);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200 text-slate-900 overflow-hidden py-14 lg:py-20">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mb-6 flex-wrap font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <Link href="/services" className="hover:text-primary transition-colors">
              Our Services
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-primary font-bold">{activeCategoryName}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Layers size={14} />
              <span>Service Category</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              {activeCategoryName}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Explore our specialized consulting services under{' '}
              <span className="text-slate-900 font-semibold">{activeCategoryName}</span>. Built to empower your organization with expert guidance, seamless compliance, and strategic excellence.
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-2 text-slate-700">
                <Sparkles size={16} className="text-secondary" />
                <span>
                  <strong className="text-slate-900 font-bold">{categoryServices.length}</strong> Specialized Services Available
                </span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-2 text-slate-700">
                <ShieldCheck size={16} className="text-emerald-600" />
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
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
              <Link
                href="/services"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                All Services
              </Link>

              {availableCategories.map((cat) => {
                const isActive = cat.slug === rawCategorySlug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/services/category/${cat.slug}`}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.count > 0 ? cat.count : categoryServices.length}
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
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeCategoryName} Offerings
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isServicesLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h3 className="text-lg font-bold text-slate-800 mb-2">No Services Found</h3>
            <p className="text-slate-600 text-sm mb-6">
              {searchTerm
                ? `No services matching "${searchTerm}" found under ${activeCategoryName}.`
                : `No services have been assigned to ${activeCategoryName} yet.`}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/services"
                className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition"
              >
                View All Services
              </Link>
            )}
          </div>
        )}

        {/* Services List Grid */}
        {!isServicesLoading && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => {
              const imageSrc = getImageUrl(service.innerImage) || '/img/hr_hero_bg_1783707638359.png';

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-primary font-bold text-[11px] uppercase tracking-wider rounded-full shadow-sm">
                      {activeCategoryName}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-3">
                      {service.title}
                    </h3>

                    {/* Overview snippet */}
                    <div
                      className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1"
                      dangerouslySetInnerHTML={{ __html: service.overview || '' }}
                    />

                    {/* Included Key Offerings / Bullet Highlights */}
                    {service.services && Array.isArray(service.services) && service.services.length > 0 && (
                      <div className="mb-6 pt-4 border-t border-slate-100 space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Key Offerings
                        </span>
                        {service.services.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 size={14} className="text-secondary shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-800 text-xs sm:text-sm font-bold transition-all duration-300"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>

      {/* WHY CHOOSE US FOR THIS CATEGORY */}
      <section className="py-16 bg-white border-t border-b border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Why Partner With Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Why Choose People Consulting for {activeCategoryName}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tailored Execution</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We customize solutions specifically to your business framework, operational scale, and growth objectives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Statutory Risk Mitigation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our team ensures complete adherence to all regulatory standards, giving you 100% peace of mind.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Proven Track Record</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Over a decade of industry expertise delivering quantifiable results across corporate sectors nationwide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORY FAQS (If Any Exist) */}
      {categoryFaqs.length > 0 && (
        <section className="py-16 bg-slate-50">
          <Container className="max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle size={14} />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Got Questions About {activeCategoryName}?
              </h2>
            </div>

            <div className="space-y-4">
              {categoryFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-primary transition"
                    >
                      <span className="text-base">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                            <p>{faq.answer}</p>
                            {faq.serviceTitle && (
                              <span className="inline-block mt-3 text-[11px] font-semibold text-slate-400">
                                Related to: {faq.serviceTitle}
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

      {/* CTA SECTION */}
      <CallToAction />
    </div>
  );
}

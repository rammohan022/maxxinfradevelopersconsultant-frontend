'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, ChevronRight, Menu, X, Calculator, Briefcase, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react'
import { useGetServicesQuery } from '@/services/services'
import { useGetServiceCategoriesQuery } from '@/services/serviceCategory'
import { useGetSiteSettingsQuery } from '@/services/siteSettings'
import { useGetSeoSettingsQuery } from '@/services/seo'
import { useGetWebsiteLinksQuery } from '@/services/websiteLink'
import { getImageUrl } from '@/lib/utils/imageUtils'
import { motion, AnimatePresence } from 'framer-motion'
import { slugifyCategory } from '@/lib/utils/slugUtils'

/* ================= TITLE CASE HELPER ================= */
function formatTitleCase(str: string): string {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toUpperCase()
      if (['HR', 'SEO', 'RPO', 'CV', 'IT', 'AI'].includes(cleanWord)) {
        return word.toUpperCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/* ================= DEFAULT NAV ITEMS ================= */
const defaultNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Careers', href: '#', dropdown: true },
  { label: 'Resources', href: '#', resourceDropdown: true },
  { label: 'Compliance', href: '#', complianceDropdown: true },
]

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [careerOpen, setCareerOpen] = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [complianceOpen, setComplianceOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false)
  const [mobileCareerOpen, setMobileCareerOpen] = useState(false)
  const [mobileResourceOpen, setMobileResourceOpen] = useState(false)
  const [mobileComplianceOpen, setMobileComplianceOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { data: practiceAreas = [] } = useGetServicesQuery()
  const { data: serviceCategories = [] } = useGetServiceCategoriesQuery()
  const { data: siteSettings } = useGetSiteSettingsQuery()
  const { data: seoList = [] } = useGetSeoSettingsQuery()
  const { data: websiteLinks = [] } = useGetWebsiteLinksQuery()
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  // Chunk websiteLinks into 4 columns
  const complianceChunks = useMemo(() => {
    const links = websiteLinks.length > 0 ? websiteLinks : [
      { id: '1', title: 'Ablyworks', url: 'https://ablyworks.com/', createdAt: '', updatedAt: '' },
    ]
    const chunkSize = Math.max(4, Math.ceil(links.length / 4))
    const chunks: (typeof links)[] = [[], [], [], []]
    links.forEach((link, idx) => {
      const colIndex = Math.min(3, Math.floor(idx / chunkSize))
      chunks[colIndex].push(link)
    })
    return chunks
  }, [websiteLinks])

  // Dynamic navbar item names based on SEO Settings (seoList pageName)
  const navItems = useMemo(() => {
    const seoPageNameMap = (seoList || []).reduce<Record<string, string>>((acc, item) => {
      if (item.pagePath && item.pageName) {
        acc[item.pagePath] = item.pageName;
        if (item.pagePath === '/about-us' || item.pagePath === '/about') {
          acc['/about-us'] = item.pageName;
          acc['/about'] = item.pageName;
        }
        if (item.pagePath === '/career' || item.pagePath === '/careers') {
          acc['/career'] = item.pageName;
          acc['/careers'] = item.pageName;
        }
        if (item.pagePath === '/contact-us' || item.pagePath === '/contact') {
          acc['/contact-us'] = item.pageName;
          acc['/contact'] = item.pageName;
        }
      }
      return acc;
    }, {});

    return defaultNavItems.map((item) => {
      const dynamicLabel = seoPageNameMap[item.href];
      return {
        ...item,
        label: dynamicLabel || item.label,
      };
    });
  }, [seoList]);

  // Map category names to positions
  const categoryPositionMap = (serviceCategories || []).reduce<Record<string, number>>((acc, cat) => {
    acc[cat.name] = cat.position ?? 0;
    return acc;
  }, {});

  // Group published services by category
  const servicesByCategory = (practiceAreas || [])
    .filter((area) => area.status !== 'Draft')
    .reduce<Record<string, typeof practiceAreas>>((acc, area) => {
      const categoryName = area.category || 'General Services'
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(area)
      return acc
    }, {})

  // Sort categories by position, then sort services within each category by position
  const sortedServicesByCategory = Object.entries(servicesByCategory)
    .sort(([catA], [catB]) => {
      const posA = categoryPositionMap[catA] ?? 999;
      const posB = categoryPositionMap[catB] ?? 999;
      return posA - posB;
    })
    .map(([cat, items]) => [
      cat,
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
    ] as [string, typeof practiceAreas]);

  // Add scroll listener for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpenDropdown(true)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(false)
    }, 200)
  }

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-0' : 'shadow-sm py-1'}`}>
      <Container>

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center h-20 relative">

          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Image
              src={siteSettings?.logo ? getImageUrl(siteSettings.logo) : "/img/logo.png"}
              alt={siteSettings?.siteName || "People Consulting"}
              width={scrolled ? 180 : 220}
              height={90}
              className="h-11 sm:h-12 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-8">

            {navItems.map((item) => (
              <div
                key={item.label}
                className={`${item.mega ? 'static' : 'relative'} group`}
                onMouseEnter={item.mega ? handleMouseEnter : undefined}
                onMouseLeave={item.mega ? handleMouseLeave : undefined}
              >

                {/* ================= PRACTICE AREA MEGA ================= */}
                {item.mega ? (
                  <>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Link
                        href={item.href!}
                        className="text-slate-800 hover:text-secondary font-semibold py-2 transition-colors"
                      >
                        {formatTitleCase(item.label)}
                      </Link>
                      <button
                        type="button"
                        className="p-1 text-slate-800 group-hover:text-secondary transition-colors"
                      >
                        <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {openDropdown && (
                        <div className="absolute left-0 right-0 top-full pt-2 flex justify-center">
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="w-[1050px]"
                          >
                            <div className="bg-white shadow-2xl border-t-2 border-primary rounded-xl p-8 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                              <div className="grid grid-cols-4 gap-x-6 gap-y-8 relative z-10">
                                {sortedServicesByCategory.map(([category, items]) => (
                                  <div key={category} className="space-y-3">
                                    <Link
                                      href={`/services/category/${slugifyCategory(category)}`}
                                      onClick={() => setOpenDropdown(false)}
                                      className="group/cat flex items-center justify-between text-sm font-bold tracking-wide text-primary hover:text-secondary border-b-2 border-secondary/40 pb-1.5 transition-all"
                                    >
                                      <span>{formatTitleCase(category)}</span>
                                      <ChevronRight size={14} className="text-secondary opacity-0 group-hover/cat:opacity-100 group-hover/cat:translate-x-1 transition-all" />
                                    </Link>
                                    <div className="space-y-2">
                                      {items.map((area) => (
                                        <Link
                                          key={area.id}
                                          href={`/services/${area.slug}`}
                                          onClick={() => setOpenDropdown(false)}
                                          className="group/link flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-secondary transition-all duration-200"
                                        >
                                          <ChevronRight
                                            size={14}
                                            className="text-primary/40 group-hover/link:text-secondary group-hover/link:translate-x-1 transition-all"
                                          />
                                          <span>{formatTitleCase(area.title)}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </>
                ) : item.dropdown ? (

                  /* ================= CAREERS DROPDOWN ================= */
                  <div
                    className="relative"
                    onMouseEnter={() => setCareerOpen(true)}
                    onMouseLeave={() => setCareerOpen(false)}
                  >
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="text-slate-800 hover:text-secondary font-semibold py-2 transition-colors">
                        {formatTitleCase(item.label)}
                      </span>
                      <ChevronDown size={16} className={`text-slate-800 group-hover:text-secondary transition-all duration-300 ${careerOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {careerOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-3 w-56 bg-white shadow-xl border-t-2 border-primary rounded-xl overflow-hidden z-50 p-2"
                        >
                          <div className="space-y-1">
                            <Link
                              href="/career"
                              onClick={() => setCareerOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-secondary p-1.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                            >
                              <ChevronRight size={14} className="text-secondary shrink-0" />
                              <span>Open Positions</span>
                            </Link>
                            <Link
                              href="/submit-cv"
                              onClick={() => setCareerOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-secondary p-1.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                            >
                              <ChevronRight size={14} className="text-secondary shrink-0" />
                              <span>Submit Your CV</span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.resourceDropdown ? (

                  /* ================= RESOURCES DROPDOWN ================= */
                  <div
                    className="relative"
                    onMouseEnter={() => setResourceOpen(true)}
                    onMouseLeave={() => setResourceOpen(false)}
                  >
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="text-slate-800 hover:text-secondary font-semibold py-2 transition-colors">
                        {formatTitleCase(item.label)}
                      </span>
                      <ChevronDown size={16} className={`text-slate-800 group-hover:text-secondary transition-all duration-300 ${resourceOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {resourceOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-3 w-[480px] bg-white shadow-2xl border-t-2 border-primary rounded-xl overflow-hidden p-6 z-50"
                        >
                          <div className="grid grid-cols-2 gap-6">
                            {/* Column 1: Insights & Media */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wide text-primary border-b-2 border-secondary/40 pb-1.5 mb-2.5 flex items-center gap-1.5">
                                <BookOpen size={14} className="text-secondary" />
                                <span>Insights &amp; Media</span>
                              </h4>
                              <div className="space-y-1">
                                <Link
                                  href="/blog"
                                  onClick={() => setResourceOpen(false)}
                                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-secondary p-1.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                                >
                                  <ChevronRight size={14} className="text-secondary shrink-0" />
                                  <span>Blogs</span>
                                </Link>
                              </div>
                            </div>

                            {/* Column 2: Calculators */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wide text-primary border-b-2 border-secondary/40 pb-1.5 mb-2.5 flex items-center gap-1.5">
                                <Calculator size={14} className="text-secondary" />
                                <span>HR Calculators</span>
                              </h4>
                              <div className="space-y-1">
                                <Link
                                  href="/salary-calculator"
                                  onClick={() => setResourceOpen(false)}
                                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-secondary p-1.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                                >
                                  <ChevronRight size={14} className="text-secondary shrink-0" />
                                  <span>Salary Calculator</span>
                                </Link>
                                <Link
                                  href="/gratuity-calculator"
                                  onClick={() => setResourceOpen(false)}
                                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-secondary p-1.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                                >
                                  <ChevronRight size={14} className="text-secondary shrink-0" />
                                  <span>Gratuity Calculator</span>
                                </Link>
                                <Link
                                  href="/attrition-calculator"
                                  onClick={() => setResourceOpen(false)}
                                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-secondary p-1.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                                >
                                  <ChevronRight size={14} className="text-secondary shrink-0" />
                                  <span>Attrition Rate Calculator</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.complianceDropdown ? (

                  /* ================= COMPLIANCE LIBRARY DROPDOWN ================= */
                  <div
                    className="relative"
                    onMouseEnter={() => setComplianceOpen(true)}
                    onMouseLeave={() => setComplianceOpen(false)}
                  >
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="text-slate-800 hover:text-secondary font-semibold py-2 transition-colors">
                        {formatTitleCase(item.label)}
                      </span>
                      <ChevronDown size={16} className={`text-slate-800 group-hover:text-secondary transition-all duration-300 ${complianceOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {complianceOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-3 w-64 bg-white shadow-xl border-t-2 border-primary rounded-xl overflow-hidden z-50 p-2 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                        >
                          <div className="space-y-1">
                            {websiteLinks && websiteLinks.length > 0 ? (
                              websiteLinks.map((wLink) => (
                                <a
                                  key={wLink.id}
                                  href={wLink.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setComplianceOpen(false)}
                                  className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-secondary p-2 rounded-lg hover:bg-orange-50/50 transition-colors group/link"
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <ChevronRight size={14} className="text-secondary shrink-0" />
                                    <span className="truncate">{formatTitleCase(wLink.title)}</span>
                                  </div>
                                  <ExternalLink size={11} className="text-slate-400 group-hover/link:text-secondary shrink-0 ml-1" />
                                </a>
                              ))
                            ) : (
                              <a
                                href="https://ablyworks.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setComplianceOpen(false)}
                                className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-secondary p-2 rounded-lg hover:bg-orange-50/50 transition-colors group/link"
                              >
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <ChevronRight size={14} className="text-secondary shrink-0" />
                                  <span className="truncate">Ablyworks</span>
                                </div>
                                <ExternalLink size={11} className="text-slate-400 group-hover/link:text-secondary shrink-0 ml-1" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* ================= NORMAL LINK ================= */
                  <Link
                    href={item.href!}
                    className="text-slate-800 hover:text-secondary font-semibold py-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
                  >
                    {formatTitleCase(item.label)}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* ================= DESKTOP CTA ================= */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact-us"
              className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2.5 rounded-lg font-bold transition-all duration-300 shadow-md shadow-secondary/20 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className="lg:hidden p-2 text-slate-800 hover:text-primary transition-colors focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" } as const}
              className="lg:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-semibold text-slate-800 hover:text-secondary hover:bg-orange-50/50 rounded-lg">
                  {formatTitleCase(navItems.find((i) => i.href === '/')?.label || 'Home')}
                </Link>
                <Link href="/about-us" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-semibold text-slate-800 hover:text-secondary hover:bg-orange-50/50 rounded-lg">
                  {formatTitleCase(navItems.find((i) => i.href === '/about-us')?.label || 'About Us')}
                </Link>

                {/* Mobile Practice Accordion */}
                <div className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center font-semibold text-slate-800 px-4 py-3 hover:text-secondary hover:bg-orange-50/50 transition-colors"
                    onClick={() => setMobilePracticeOpen(!mobilePracticeOpen)}
                  >
                    {formatTitleCase(navItems.find((i) => i.mega)?.label || 'Our Services')}
                    <motion.div animate={{ rotate: mobilePracticeOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobilePracticeOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50/50"
                      >
                        <div className="px-6 py-3 ml-6 my-2 space-y-4 border-l-2 border-secondary/20">
                          {sortedServicesByCategory.map(([category, items]) => (
                            <div key={category} className="space-y-2">
                              <Link
                                href={`/services/category/${slugifyCategory(category)}`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between text-xs font-bold tracking-wide text-primary hover:text-secondary border-b border-secondary/30 pb-1 py-0.5 transition-colors"
                              >
                                <span>{formatTitleCase(category)}</span>
                                <ChevronRight size={12} />
                              </Link>
                              <div className="space-y-1">
                                {items.map((area) => (
                                  <Link
                                    key={area.id}
                                    href={`/services/${area.slug}`}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1.5 transition-colors leading-snug"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    <ChevronRight size={12} className="text-secondary/50" />
                                    <span>{formatTitleCase(area.title)}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Careers Accordion */}
                <div className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center font-semibold text-slate-800 px-4 py-3 hover:text-secondary hover:bg-orange-50/50 transition-colors"
                    onClick={() => setMobileCareerOpen(!mobileCareerOpen)}
                  >
                    <span>Careers</span>
                    <motion.div animate={{ rotate: mobileCareerOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileCareerOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50/50"
                      >
                        <div className="px-6 py-3 ml-6 my-2 space-y-2 border-l-2 border-secondary/20">
                          <Link href="/career" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors">
                            <ChevronRight size={12} className="text-secondary/50" />
                            <span>Open Positions</span>
                          </Link>
                          <Link href="/submit-cv" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors">
                            <ChevronRight size={12} className="text-secondary/50" />
                            <span>Submit Your CV</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Resources Accordion */}
                <div className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center font-semibold text-slate-800 px-4 py-3 hover:text-secondary hover:bg-orange-50/50 transition-colors"
                    onClick={() => setMobileResourceOpen(!mobileResourceOpen)}
                  >
                    <span>Resources</span>
                    <motion.div animate={{ rotate: mobileResourceOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileResourceOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50/50"
                      >
                        <div className="px-6 py-3 ml-6 my-2 space-y-4 border-l-2 border-secondary/20">
                          {/* Blogs */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold tracking-wide text-primary border-b border-secondary/30 pb-1 mb-1">
                              Insights &amp; Media
                            </div>
                            <Link href="/blog" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors">
                              <ChevronRight size={12} className="text-secondary/50" />
                              <span>Blogs</span>
                            </Link>
                          </div>

                          {/* Calculators */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold tracking-wide text-primary border-b border-secondary/30 pb-1 mb-1">
                              HR Calculators
                            </div>
                            <Link href="/salary-calculator" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors">
                              <ChevronRight size={12} className="text-secondary/50" />
                              <span>Salary Calculator</span>
                            </Link>
                            <Link href="/gratuity-calculator" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors">
                              <ChevronRight size={12} className="text-secondary/50" />
                              <span>Gratuity Calculator</span>
                            </Link>
                            <Link href="/attrition-calculator" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors">
                              <ChevronRight size={12} className="text-secondary/50" />
                              <span>Attrition Rate Calculator</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Compliance Library Accordion */}
                <div className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center font-semibold text-slate-800 px-4 py-3 hover:text-secondary hover:bg-orange-50/50 transition-colors"
                    onClick={() => setMobileComplianceOpen(!mobileComplianceOpen)}
                  >
                    <span>Compliance Library</span>
                    <motion.div animate={{ rotate: mobileComplianceOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileComplianceOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50/50"
                      >
                        <div className="px-6 py-3 ml-6 my-2 space-y-2 border-l-2 border-secondary/20 max-h-60 overflow-y-auto">
                          {websiteLinks && websiteLinks.length > 0 ? (
                            websiteLinks.map((wLink) => (
                              <a
                                key={wLink.id}
                                href={wLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors"
                              >
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <ChevronRight size={12} className="text-secondary/50" />
                                  <span className="truncate">{formatTitleCase(wLink.title)}</span>
                                </div>
                                <ExternalLink size={11} className="text-slate-400 shrink-0 ml-1" />
                              </a>
                            ))
                          ) : (
                            <a
                              href="https://ablyworks.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center justify-between text-sm font-medium text-gray-600 hover:text-secondary py-1 transition-colors"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <ChevronRight size={12} className="text-secondary/50" />
                                <span className="truncate">Ablyworks</span>
                              </div>
                              <ExternalLink size={11} className="text-slate-400 shrink-0 ml-1" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-4 pt-6 mt-2 border-t border-gray-100">
                  <Link
                    href="/contact-us"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full bg-secondary text-white py-3 rounded-lg font-bold shadow-md shadow-secondary/20 active:scale-95 transition-transform"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </header>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useGetServicesQuery } from '@/services/services'
import { motion, AnimatePresence } from 'framer-motion'

/* ================= RESOURCE ITEMS ================= */
const resourceItems = [
  { label: 'Blogs/Articles', href: '/blog' },
  { label: 'Career', href: '/career' },
]

/* ================= NAV ITEMS ================= */
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Services', href: '/services', mega: true },
  { label: 'Resource Centre', href: '#', dropdown: true },
]

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false)
  const [mobileResourceOpen, setMobileResourceOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { data: practiceAreas = [] } = useGetServicesQuery()
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  // Add scroll listener for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
    }, 150)
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
              src="/img/logo.png"
              alt="People Consulting"
              width={scrolled ? 200 : 250}
              height={100}
              className="h-16 w-auto transition-all duration-300"
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
                        className="text-slate-800 hover:text-primary font-semibold py-2 transition-colors"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="p-1 text-slate-800 group-hover:text-primary transition-colors"
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
                            className="w-[800px]"
                          >
                            <div className="bg-white shadow-2xl border-t-2 border-primary rounded-xl p-8 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                              <div className="grid grid-cols-3 gap-x-10 gap-y-5 relative z-10">
                                {practiceAreas.map((area) => (
                                  <Link
                                    key={area.id}
                                    href={`/services/${area.slug}`}
                                    onClick={() => setOpenDropdown(false)}
                                    className="group/link flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-200"
                                  >
                                    <ChevronRight
                                      size={16}
                                      className="text-primary/40 group-hover/link:text-primary group-hover/link:translate-x-1 transition-all"
                                    />
                                    <span>{area.title}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </>
                ) : item.dropdown ? (

                  /* ================= RESOURCE DROPDOWN ================= */
                  <>
                    <div
                      className="relative"
                      onMouseEnter={() => setResourceOpen(true)}
                      onMouseLeave={() => setResourceOpen(false)}
                    >
                      <div className="flex items-center gap-1 cursor-pointer">
                        <span className="text-slate-800 hover:text-primary font-semibold py-2 transition-colors">
                          {item.label}
                        </span>
                        <ChevronDown size={16} className={`text-slate-800 group-hover:text-primary transition-all duration-300 ${resourceOpen ? 'rotate-180' : ''}`} />
                      </div>

                      <AnimatePresence>
                        {resourceOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-4 w-60 bg-white shadow-xl border-t-2 border-primary rounded-xl overflow-hidden"
                          >
                            {resourceItems.map((res, index) => (
                              <Link
                                key={res.label}
                                href={res.href}
                                className={`block px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:text-primary transition-colors ${index !== resourceItems.length - 1
                                  ? 'border-b border-gray-100'
                                  : ''
                                  }`}
                              >
                                {res.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </>
                ) : (
                  /* ================= NORMAL LINK ================= */
                  <Link
                    href={item.href!}
                    className="text-slate-800 hover:text-primary font-semibold py-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* ================= DESKTOP CTA ================= */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/submit-cv"
              className="text-slate-800 hover:text-primary font-bold transition-all duration-300"
            >
              Submit CV
            </Link>
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
                <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-semibold text-slate-800 hover:bg-gray-50 rounded-lg">Home</Link>
                <Link href="/about-us" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-semibold text-slate-800 hover:bg-gray-50 rounded-lg">About Us</Link>

                {/* Mobile Practice Accordion */}
                <div className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center font-semibold text-slate-800 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobilePracticeOpen(!mobilePracticeOpen)}
                  >
                    Our Services
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
                        <div className="px-6 py-2 grid gap-1 border-l-2 border-primary/20 ml-6 my-2">
                          {practiceAreas.map((area) => (
                            <Link
                              key={area.id}
                              href={`/services/${area.slug}`}
                              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary py-2 transition-colors leading-snug"
                              onClick={() => setMobileOpen(false)}
                            >
                              <ChevronRight size={14} className="text-primary/50" />
                              <span>{area.title}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Resource Accordion */}
                <div className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center font-semibold text-slate-800 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileResourceOpen(!mobileResourceOpen)}
                  >
                    Resource Centre
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
                        <div className="px-6 py-2 grid gap-1 border-l-2 border-primary/20 ml-6 my-2">
                          {resourceItems.map((res) => (
                            <Link
                              key={res.label}
                              href={res.href}
                              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary py-2 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              <ChevronRight size={14} className="text-primary/50" />
                              {res.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>



                <Link href="/career" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-semibold text-slate-800 hover:bg-gray-50 rounded-lg">
                  Career
                </Link>

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

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useGetWebsiteLinksQuery } from '@/services/websiteLink'

const slides = [
  {
    tag: 'HR & RECRUITMENT',
    title: "Aligning Strategy With",
    highlight: 'People & Culture',
    subtitle: '',
    desc: 'Increasing your competitive advantage',
    body: 'People Consulting has long established a reputation for helping organizations streamline their recruitment, training, and labor compliance processes. We help organizations become High Performance workplaces.',
  },
  {
    tag: 'TALENT ACQUISITION',
    title: 'Connecting Top Talent With',
    highlight: 'Industry Leaders',
    subtitle: '',
    desc: '500+ Active Jobs across all sectors',
    body: 'Our recruitment strategy focuses on clarity, structure, and navigating a wide range of market conditions to match the right candidates with the right employers effectively.',
  },
  {
    tag: 'CORPORATE TRAINING',
    title: 'Excellence Through',
    highlight: 'People',
    subtitle: '',
    desc: 'Comprehensive HR Training & Development',
    body: 'Everything we do is driven by our mission to build a better world by helping organizations become Great Employers to work for all, through comprehensive training and compliance frameworks.',
  },
]

import Image from 'next/image'

const slideVariants: Variants = {
  enter: { opacity: 0, x: -30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

export default function Hero() {
  const { data: externalLinks = [] } = useGetWebsiteLinksQuery()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-[650px] lg:min-h-[700px] flex items-center bg-white overflow-hidden border-b border-slate-200">
      {/* Background Banner Image */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat opacity-95"
        style={{
          backgroundImage: 'url(/img/recruitment_banner.png)',
        }}
      />
      {/* Gradient overlay to ensure text readability on mobile/tablet */}
      <div className="absolute inset-0 bg-white/90 md:bg-white/40 lg:bg-transparent z-0" />

      <Container className="relative w-full py-16 lg:py-24 z-10">
        <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-block text-navy text-xs sm:text-sm font-semibold mb-4 tracking-widest uppercase border-l-4 border-secondary pl-3 bg-slate-100/90 py-1 pr-3 rounded-r-md"
              >
                {slides[current].tag}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-serif-heading leading-tight mb-4"
              >
                {slides[current].title}{' '}
                <span className="text-secondary">{slides[current].highlight}</span>{' '}
                {slides[current].subtitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg sm:text-xl text-navy font-semibold mb-2"
              >
                {slides[current].desc}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-sm sm:text-base text-slate-600 mb-8 max-w-xl leading-relaxed"
              >
                {slides[current].body}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <Link
                  href="/submit-cv"
                  className="bg-secondary hover:bg-secondary-dark text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block shadow-md hover:shadow-secondary/20 hover:-translate-y-0.5"
                >
                  Submit Your CV
                </Link>
                <Link
                  href="/about-us"
                  className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block bg-white"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 mt-12 mb-2"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-secondary w-8' : 'bg-slate-300 w-3 hover:bg-slate-400'
                  }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </motion.div>

          {/* Associated Portals/Links */}
          {externalLinks && externalLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-6 border-t border-slate-200/50 flex flex-wrap items-center gap-3"
            >
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">Associated Portals:</span>
              <div className="flex flex-wrap gap-2.5">
                {externalLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100/80 hover:bg-primary hover:text-white px-3 py-1.5 rounded-md font-semibold text-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs border border-slate-200"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}

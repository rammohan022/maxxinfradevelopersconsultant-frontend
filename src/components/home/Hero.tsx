'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useGetWebsiteLinksQuery } from '@/services/websiteLink'
import { useGetBannersQuery } from '@/services/banners'
import { getImageUrl } from '@/lib/utils/imageUtils'

const defaultSlides = [
  {
    tag: 'HR & RECRUITMENT',
    title: "Aligning Strategy With",
    highlight: 'People & Culture',
    subtitle: '',
    desc: 'Increasing your competitive advantage',
    body: 'People Consulting has long established a reputation for helping organizations streamline their recruitment, training, and labor compliance processes. We help organizations become High Performance workplaces.',
    ctaText: 'Explore Services',
    ctaLink: '/services',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about-us',
    image: '/img/recruitment_banner.png',
  },
  {
    tag: 'TALENT ACQUISITION',
    title: 'Connecting Top Talent With',
    highlight: 'Industry Leaders',
    subtitle: '',
    desc: '500+ Active Jobs across all sectors',
    body: 'Our recruitment strategy focuses on clarity, structure, and navigating a wide range of market conditions to match the right candidates with the right employers effectively.',
    ctaText: 'View Openings',
    ctaLink: '/career',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about-us',
    image: '/img/recruitment_banner.png',
  },
  {
    tag: 'CORPORATE TRAINING',
    title: 'Excellence Through',
    highlight: 'People',
    subtitle: '',
    desc: 'Comprehensive HR Training & Development',
    body: 'Everything we do is driven by our mission to build a better world by helping organizations become Great Employers to work for all, through comprehensive training and compliance frameworks.',
    ctaText: 'Contact Us',
    ctaLink: '/contact-us',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about-us',
    image: '/img/recruitment_banner.png',
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
  const { data: apiBanners = [] } = useGetBannersQuery({ activeOnly: true })
  const [current, setCurrent] = useState(0)

  const activeSlides = apiBanners.length > 0
    ? apiBanners.map((b) => ({
        tag: b.tag || 'HR & RECRUITMENT',
        title: b.title,
        highlight: b.highlight || '',
        subtitle: b.subtitle || '',
        desc: b.subtitle || '',
        body: b.description || b.subtitle || 'People Consulting has long established a reputation for helping organizations streamline their recruitment, training, and labor compliance processes.',
        ctaText: b.ctaText || 'Explore Services',
        ctaLink: b.ctaLink || '/services',
        secondaryCtaText: b.secondaryCtaText || 'Learn More',
        secondaryCtaLink: b.secondaryCtaLink || '/about-us',
        image: b.image ? getImageUrl(b.image) : '/img/recruitment_banner.png',
      }))
    : defaultSlides;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % activeSlides.length), 6000)
    return () => clearInterval(t)
  }, [activeSlides.length])

  const activeSlide = activeSlides[current] || activeSlides[0]

  return (
    <section className="relative min-h-[650px] lg:min-h-[700px] flex items-center bg-white overflow-hidden border-b border-slate-200">
      {/* Background Banner Image */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat opacity-95 transition-all duration-700"
        style={{
          backgroundImage: `url(${activeSlide.image})`,
        }}
      />
      {/* Gradient overlay to ensure text readability on mobile/tablet */}
      <div className="absolute inset-0 bg-white/90 md:bg-white/40 lg:bg-transparent z-0" />

      <Container className="relative w-full py-16 lg:py-14 z-10">
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
              {activeSlide.tag && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-block text-primary text-xs sm:text-sm font-bold mb-4 tracking-widest border-l-4 border-secondary pl-3 bg-slate-100/90 py-1 pr-3 rounded-r-md"
                >
                  {activeSlide.tag}
                </motion.span>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4"
              >
                {activeSlide.title}{' '}
                {activeSlide.highlight && (
                  <span className="text-secondary">{activeSlide.highlight}</span>
                )}{' '}
                {activeSlide.subtitle}
              </motion.h1>

              {activeSlide.desc && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-sm sm:text-base text-slate-800 font-semibold mb-2"
                >
                  {activeSlide.desc}
                </motion.p>
              )}

              {activeSlide.body && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mb-8 leading-relaxed rich-text-content [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-secondary [&_a]:underline [&_strong]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: activeSlide.body }}
                />
              )}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                {activeSlide.ctaText && activeSlide.ctaLink && (
                  <Link
                    href={activeSlide.ctaLink}
                    className="bg-secondary hover:bg-secondary-dark text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block shadow-md hover:shadow-secondary/20 hover:-translate-y-0.5"
                  >
                    {activeSlide.ctaText}
                  </Link>
                )}
                {activeSlide.secondaryCtaText && activeSlide.secondaryCtaLink && (
                  <Link
                    href={activeSlide.secondaryCtaLink}
                    className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block bg-white"
                  >
                    {activeSlide.secondaryCtaText}
                  </Link>
                )}
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
            {activeSlides.map((_, i) => (
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
              <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider">Associated Portals:</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                {externalLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.title}
                    className="bg-slate-100/80 hover:bg-white hover:border-slate-300 px-3 py-1.5 rounded-lg font-semibold text-slate-700 hover:scale-[1.03] active:scale-[0.98] transition-all text-xs border border-slate-200 inline-flex items-center justify-center shadow-sm"
                  >
                    {link.logo ? (
                      <div className="relative h-6 w-20 sm:w-24">
                        <Image
                          src={getImageUrl(link.logo)}
                          alt={link.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span>{link.title}</span>
                    )}
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

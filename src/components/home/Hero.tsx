'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { motion, AnimatePresence, Variants } from 'framer-motion'

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

const slideVariants: Variants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-[600px] lg:min-h-[600px] flex items-center bg-navy overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(/img/hr_hero_bg_1783707638359.png)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />

      <Container className="relative w-full py-14 md:py-14 lg:py-18">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-block text-white/90 text-xs sm:text-sm font-medium mb-4 tracking-widest uppercase border-l-4 border-primary pl-3"
            >
              {slides[current].tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white font-serif-heading leading-tight mb-4"
            >
              {slides[current].title}{' '}
              <span className="text-secondary">{slides[current].highlight}</span>{' '}
              {slides[current].subtitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-white/90 mb-2 font-medium"
            >
              {slides[current].desc}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm sm:text-base text-white/75 mb-8 max-w-xl leading-relaxed"
            >
              {slides[current].body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="/submit-cv"
                className="bg-secondary hover:bg-secondary-dark text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5"
              >
                Submit Your CV
              </Link>
              <Link
                href="/about-us"
                className="border-2 border-white/80 text-white hover:bg-white hover:text-navy px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block backdrop-blur-sm"
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
          transition={{ delay: 0.7 }}
          className="flex gap-2 mt-12"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-8' : 'bg-white/40 w-3 hover:bg-white/70'
                }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

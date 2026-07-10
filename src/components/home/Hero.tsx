'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const slides = [
  {
    tag: 'LEGAL ADVISORY & REPRESENTATION',
    title: "Structured Legal Support",
    highlight: 'Across Multiple Practice Areas',
    subtitle: 'Defence Lawyer',
    desc: '…with experience across diverse legal domains',
    body: 'Equity and Legal Solutions provides structured legal assistance across criminal, civil, corporate, and regulatory matters. The focus remains on legal clarity, procedural compliance, and informed representation based on applicable law.',
  },
  {
    tag: 'PROFESSIONAL LEGAL APPROACH',
    title: 'Legal Matters',
    highlight: 'Handled With Due Process',
    subtitle: 'Adherence to law at every stage',
    desc: 'Offer Expert Legal Remedies in Digital Offences and Online Fraud',
    body: 'Each matter is approached with careful evaluation of facts, documentation, and statutory provisions. Assistance is provided in accordance with established legal procedures, ensuring that every step aligns with applicable regulations and judicial processes.',
  },
  {
    tag: 'LEGAL DOMAIN COVERAGE',
    title: 'Assistance Across',
    highlight: 'Diverse Legal Proceedings',
    subtitle: '',
    desc: 'Criminal, civil, and regulatory matters',
    body: 'The firm handles matters related to criminal law, financial and economic offences, regulatory proceedings, family disputes, and related legal concerns. Engagement is based on case-specific assessment and lawful representation.',
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
          backgroundImage: 'url(/img/hero-bg.jpg)',
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
              <span className="text-primary">{slides[current].highlight}</span>{' '}
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
                href="/contact-us"
                className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-block shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Schedule a Consultation
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

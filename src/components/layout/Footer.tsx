'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import { useGetPracticeAreasQuery } from '@/services/practice-area'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Career', href: '/career' },
  { label: 'Our Team', href: '/our-team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
]


const locations = [
  'Delhi',
  'Gurugram',
  'Pune',
  'Hyderabad',
  'Chandigarh',
  'Bengaluru',
  'Mumbai',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Footer() {
  const { data: practiceAreas = [] } = useGetPracticeAreasQuery()
  return (
    <>
      <iframe
        src="https://www.google.com/maps?q=28,+Upper+Ground+Floor,+School+Lane,+New+Delhi+110001&output=embed"
        width="100%"
        height={450}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Equity and Legal Solutions Location"
        className="grayscale opacity-90 transition-all hover:grayscale-0"
      />
      <footer className="bg-navy text-white pt-16 md:pt-20 pb-10 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
          >
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Link href="/" className="block mb-6 transition-opacity hover:opacity-90">
                <Image
                  src="/img/logo.png"
                  alt="Equity & Legal Solutions"
                  width={200}
                  height={60}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="text-white/70 mb-8 leading-relaxed text-sm md:text-base pr-4">
                At Equity & Legal Solutions, we deliver trusted, result-oriented legal services across diverse practice areas. Our experienced team provides strategic advice and strong representation to clients across industries.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition duration-300 transform hover:-translate-y-1" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition duration-300 transform hover:-translate-y-1" aria-label="Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition duration-300 transform hover:-translate-y-1" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold font-serif-heading mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-3 font-medium">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-white/70 hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200 text-sm md:text-base">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold font-serif-heading mb-6 relative inline-block">
                Our Location
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-3 font-medium">
                {locations.map((p) => (
                  <li key={p}>
                    <Link href="/practice-areas" className="text-white/70 hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200 text-sm md:text-base">
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold font-serif-heading mb-6 relative inline-block">
                Contact Info
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-white/70 text-sm md:text-base leading-relaxed">
                <li className="flex flex-col gap-1">
                  <span className="uppercase text-xs font-bold text-white/40 tracking-wider">Call Us</span>
                  <a href="tel:+911142502484" className="hover:text-primary font-semibold transition-colors">+91-1142502484</a>
                  <a href="tel:+917070709689" className="hover:text-primary font-semibold transition-colors">+91-70707 09689</a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="uppercase text-xs font-bold text-white/40 tracking-wider">Email Us</span>
                  <a href="mailto:elsattorney@gmail.com" className="hover:text-primary font-semibold transition-colors">
                    elsattorney@gmail.com
                  </a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="uppercase text-xs font-bold text-white/40 tracking-wider">Visit Us</span>
                  <span>28, Upper Ground Floor,<br />School Lane,<br />New Delhi – 110001</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          {/* Practice Areas Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pb-10"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Practice Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {practiceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/practice-areas/${area.slug}`}
                  className="px-3 py-1.5 rounded border border-white/15 text-white/65 text-xs font-medium hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
                >
                  {area.title}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
          >
            <p className="text-white/50 text-sm font-medium">
              © {new Date().getFullYear()} Equity & Legal Solutions. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/privacy-policy" className="text-white/50 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-white/50 hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </motion.div>
        </Container>
      </footer>
    </>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import { useGetAdminProfileQuery } from '@/services/auth'
import { useGetSiteSettingsQuery } from '@/services/siteSettings'
import { getImageUrl } from '@/lib/utils/imageUtils'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Career', href: '/career' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
]

const calculatorLinks = [
  { label: 'Salary Calculator', href: '/salary-calculator' },
  { label: 'Gratuity Calculator', href: '/gratuity-calculator' },
  { label: 'Attrition Rate Calculator', href: '/attrition-calculator' },
  { label: 'Open Positions', href: '/career' },
  { label: 'Submit Resume / CV', href: '/submit-cv' },
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
  const { data: adminProfile } = useGetAdminProfileQuery()
  const { data: siteSettings } = useGetSiteSettingsQuery()

  const email = siteSettings?.contactEmail || adminProfile?.email || "hello@peopleconsultings.com";
  const phone = siteSettings?.contactPhone || adminProfile?.phoneNumber || "+91 8800177307";
  const facebook = siteSettings?.socialLinks?.facebook || adminProfile?.facebookUrl || "#";
  const linkedin = siteSettings?.socialLinks?.linkedin || adminProfile?.linkedinUrl || "https://www.linkedin.com/company/people-consulting-services/";
  const instagram = siteSettings?.socialLinks?.instagram || adminProfile?.instagramUrl || "https://www.instagram.com/peopleconsultco?igsh=bGNkZzVoeDNoMGl2";
  const twitter = siteSettings?.socialLinks?.twitter || adminProfile?.twitterUrl || "";

  return (
    <>
      <iframe
        src="https://www.google.com/maps?q=243,+2nd+Floor,+Vipul+Trade+Centre,+Sector+48,+Sohna+Road,+Gurgaon,+Haryana&output=embed"
        width="100%"
        height={450}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="People Consulting Location"
        className="grayscale opacity-90 transition-all hover:grayscale-0"
      />
      <footer
        className="text-gray-900 border-t border-gray-100 pt-12 md:pt-12 pb-6 relative overflow-hidden"
        style={{
          backgroundImage: "url('/img/paper_texture_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10">

          {/* Top 4-Column Layout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12"
          >
            {/* Column 1: Company Profile & Social Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Link href="/" className="block mb-6 transition-opacity hover:opacity-90">
                <Image
                  src="/img/logo.png"
                  alt="People Consulting"
                  width={250}
                  height={100}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base pr-4">
                At People Consulting, we deliver trusted, result-oriented consulting services across diverse areas. Our experienced team provides strategic advice to clients across industries.
              </p>
              <div className="flex gap-4">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition duration-300 transform hover:-translate-y-1" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition duration-300 transform hover:-translate-y-1" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition duration-300 transform hover:-translate-y-1" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                )}
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition duration-300 transform hover:-translate-y-1" aria-label="Twitter">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Column 2: Calculators & HR Utilities */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-primary mb-6 relative inline-block">
                Calculators & Tools
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-3 font-medium">
                {calculatorLinks.map((calc) => (
                  <li key={calc.label}>
                    <Link href={calc.href} className="text-gray-600 hover:text-secondary transition-colors hover:translate-x-1 inline-flex transform duration-200 text-sm md:text-base">
                      {calc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-primary mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-3 font-medium">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-gray-600 hover:text-secondary transition-colors hover:translate-x-1 inline-flex transform duration-200 text-sm md:text-base">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-primary mb-6 relative inline-block">
                Contact Info
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                <li className="flex flex-col gap-1">
                  <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">Call Us</span>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-slate-800 hover:text-secondary font-semibold transition-colors">{phone}</a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">Email Us</span>
                  <a href={`mailto:${email}`} className="text-slate-800 hover:text-secondary font-semibold transition-colors">
                    {email}
                  </a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">Reg. Office</span>
                  <span>243, 2nd Floor, Vipul Trade Centre,<br />Sector 48, Sohna Road,<br />Gurgaon, Haryana</span>
                </li>
                <li className="flex flex-col gap-1 mt-2">
                  <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">Branch Office</span>
                  <span>7th Floor, Tower 3, RPS 12th Avenue,<br />Main Mathura Road, Sector 27C,<br />Faridabad.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Copyright Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
          >
            <p className="text-gray-500 text-sm font-medium">
              © {new Date().getFullYear()} People Consulting. All rights reserved. | Developed by <a href="https://webexbytes.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors font-semibold">webexbytes</a>
            </p>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-secondary transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-gray-500 hover:text-secondary transition-colors">Terms & Conditions</Link>
            </div>
          </motion.div>
        </Container>
      </footer>
    </>
  )
}

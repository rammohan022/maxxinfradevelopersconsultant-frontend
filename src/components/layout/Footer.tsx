'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { Mail, Phone, Linkedin, Facebook, Instagram } from 'lucide-react'
import { useGetAdminProfileQuery } from '@/services/auth'
import { useGetSiteSettingsQuery } from '@/services/siteSettings'
import { getImageUrl } from '@/lib/utils/imageUtils'

export default function Footer() {
  const { data: adminProfile } = useGetAdminProfileQuery()
  const { data: siteSettings } = useGetSiteSettingsQuery()

  const email = siteSettings?.contactEmail || adminProfile?.email || "hello@peopleconsultings.com";
  const phone = siteSettings?.contactPhone || adminProfile?.phoneNumber || "+91 8800177307";
  const facebook = siteSettings?.socialLinks?.facebook || adminProfile?.facebookUrl || "#";
  const linkedin = siteSettings?.socialLinks?.linkedin || adminProfile?.linkedinUrl || "https://www.linkedin.com/company/people-consulting-services/";
  const instagram = siteSettings?.socialLinks?.instagram || adminProfile?.instagramUrl || "https://www.instagram.com/peopleconsultco?igsh=bGNkZzVoeDNoMGl2";

  return (
    <footer>
      {/* 1. Pre-Footer Gradient Call-To-Action Block */}
      <section className="py-10 md:py-12 text-white relative overflow-hidden bg-[#3b5a7a]">
        {/* World Map Background Graphic */}
        <div
          className="absolute inset-0 opacity-[0.7] pointer-events-none z-0"
          style={{
            backgroundImage: "url('/img/footer-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark Overlay Removed */}

        {/* Decorative Wave/Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Pitch and Pill Badges */}
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight max-w-2xl">
                Let&apos;s discuss how <br />
                <span className="text-secondary">People Consulting</span> <br />
                can help you.
              </h2>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                {/* Email Pill */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white relative z-10 shadow-md border-2 border-white/30 after:content-[''] after:absolute after:right-[-6px] after:top-1/2 after:-translate-y-1/2 after:border-t-[6px] after:border-t-transparent after:border-b-[6px] after:border-b-transparent after:border-l-[8px] after:border-l-secondary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="bg-white/40 backdrop-blur-md text-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm -ml-3 pl-6 border border-white/50">
                    <a href={`mailto:${email}`} className="hover:text-secondary transition-colors">{email}</a>
                  </div>
                </div>

                {/* Phone Pill */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white relative z-10 shadow-md border-2 border-white/30 after:content-[''] after:absolute after:right-[-6px] after:top-1/2 after:-translate-y-1/2 after:border-t-[6px] after:border-t-transparent after:border-b-[6px] after:border-b-transparent after:border-l-[8px] after:border-l-secondary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="bg-white/40 backdrop-blur-md text-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm -ml-3 pl-6 border border-white/50">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-secondary transition-colors">{phone}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Skyscraper Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-xl border border-slate-100 transform hover:-translate-y-1.5 transition-all duration-300">
                <img
                  src="/img/footer-img.png"
                  alt="People Consulting Office Skyline"
                  className="w-full h-auto block"
                />
                {/* Details */}
                <div className="p-8 text-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest block mb-3">
                    Our Offices
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-primary tracking-wide mb-2">
                        Gurgaon
                      </h4>
                      <p className="text-xs sm:text-xs text-slate-600 leading-relaxed font-normal">
                        243, 2nd Floor, Vipul Trade Centre,<br />
                        Sector 48, Sohna Road,<br />
                        Gurgaon, Haryana, India
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary tracking-wide mb-2">
                        Faridabad
                      </h4>
                      <p className="text-xs sm:text-xs text-slate-600 leading-relaxed font-normal">
                        7th Floor, Tower 3, RPS 12th Avenue,<br />
                        Main Mathura Road, Sector 27C,<br />
                        Faridabad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Footer Bottom Bar */}
      <section className="bg-slate-50 py-4 border-t border-slate-200/60 relative overflow-hidden z-20">
        {/* Background Paper Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.20] pointer-events-none"
          style={{
            backgroundImage: "url('/img/paper_texture_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-4 shrink-0 flex-wrap justify-center sm:justify-start">
              <Link href="/" className="transition-opacity hover:opacity-90">
                <Image
                  src="/img/logo.png"
                  alt="People Consulting"
                  width={300}
                  height={80}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Actions & Socials Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-wrap justify-center lg:justify-end">
              <div className="flex items-center gap-3">
                <Link
                  href="/submit-cv"
                  className="px-5 py-2 rounded-full bg-[#fff9f5] text-xs sm:text-sm font-semibold text-slate-700 hover:text-white hover:bg-secondary hover:border-secondary shadow-sm border border-orange-100 transition duration-300"
                >
                  Submit CV
                </Link>
                <Link
                  href="/contact-us"
                  className="px-5 py-2 rounded-full bg-[#fff9f5] text-xs sm:text-sm font-semibold text-slate-700 hover:text-white hover:bg-secondary hover:border-secondary shadow-sm border border-orange-100 transition duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  href="/hr-free-tools"
                  className="px-5 py-2 rounded-full bg-[#fff9f5] text-xs sm:text-sm font-semibold text-slate-700 hover:text-white hover:bg-secondary hover:border-secondary shadow-sm border border-orange-100 transition duration-300"
                >
                  HR Free Tools
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#fff9f5] border border-orange-100 shadow-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#fff9f5] border border-orange-100 shadow-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#fff9f5] border border-orange-100 shadow-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Legal/Copyright Bar */}
      <section className="bg-primary py-3 md:py-4 border-t border-primary-dark/40 z-20 relative">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] sm:text-xs font-medium text-white/85">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} <span className="text-secondary font-semibold">People Consulting</span>. All Rights Reserved. Developed by{' '}
              <a
                href="https://webexbytes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-secondary transition-colors"
              >
                webexbytes
              </a>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  )
}

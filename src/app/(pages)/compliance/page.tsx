import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container, CallToAction } from '@/components/ui'
import { CheckCircle2, Building2, Factory, FileSignature, ShoppingCart, ShieldCheck, Briefcase, Landmark, FileText, BadgePercent, GraduationCap, Gavel, FileCheck, ArrowRight, Layers, BellRing, PieChart, Store } from 'lucide-react'
import { FAQs } from '@/components/home'
import SeoHead from '@/components/seo/SeoHead'
import ComplianceLinks from '@/components/compliance/ComplianceLinks'
import ComplianceServicesSlider from '@/components/compliance/ComplianceServicesSlider'
import ComplianceDashboardSection from '@/components/compliance/ComplianceDashboardSection'
import ComplianceSimplificationSection from '@/components/compliance/ComplianceSimplificationSection'

export const metadata: Metadata = {
  title: 'Labour Law Compliance Services in India | People Consulting',
  description:
    'End-to-end labour law compliance services, statutory compliance services and establishment compliance for businesses in India. Book a free health check.',
  openGraph: {
    title: 'Labour Law & Statutory Compliance Services | People Consulting',
    description:
      'Labour law consultancy and statutory compliance management covering PF, ESIC, LWF, PT, TDS and establishment compliance, all under one partner.',
    url: 'https://peopleconsultings.com/compliance',
    siteName: 'People Consulting',
    images: [
      {
        url: 'https://peopleconsultings.com/img/about-hero-bg-v3.png',
        alt: 'Labour law compliance services and statutory compliance management by People Consulting',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labour Law & Statutory Compliance Services | People Consulting',
    description:
      'Labour law consultancy and statutory compliance management covering PF, ESIC, LWF, PT, TDS and establishment compliance, all under one partner.',
    images: ['https://peopleconsultings.com/img/about-hero-bg-v3.png'],
  },
  alternates: {
    canonical: 'https://peopleconsultings.com/compliance',
  },
}

const complianceSolutions = [
  {
    icon: Landmark,
    title: 'Central Act Compliances (PF, ESIC, Gratuity, POSH Act etc.)',
    desc: 'We manage all your central labour law requirements, including PF, ESIC, Gratuity and POSH Act. Timely filings and accurate records keep your business penalty-free and audit-ready.',
  },
  {
    icon: Factory,
    title: 'Factory Act Compliances',
    desc: 'We handle every Factory Act requirement, from licences and returns to registers and inspections. Your workplace stays compliant, safe and inspection-ready at all times.',
  },
  {
    icon: Store,
    title: 'Shop Act Compliances',
    desc: 'We take care of Shops and Establishments Act registrations, renewals and statutory records. Stay compliant with state-specific rules without the paperwork burden.',
  },
  {
    icon: FileCheck,
    title: 'New Labour Code Implementation',
    desc: 'We help you move smoothly to the new Labour Codes with a clear gap analysis and a practical action plan. Your policies, payroll and records get updated so you stay compliant from day one.',
  },
  {
    icon: BadgePercent,
    title: 'LWF & P.Tax Compliance',
    desc: 'We manage Labour Welfare Fund and Professional Tax calculations, payments and returns across states. Every deadline is tracked, so you never miss a due date or pay a penalty.',
  },
  {
    icon: PieChart,
    title: 'Digiliance – Compliance Management Software',
    desc: 'Digiliance is our compliance management software that tracks due dates, documents and filings in one dashboard. It gives you real-time visibility and automated alerts across all your locations.',
  },
  {
    icon: FileSignature,
    title: 'Registrations and License Management',
    desc: 'We handle new registrations, licence applications, renewals and amendments from start to finish. Our team makes sure every licence stays valid and up to date.',
  },
  {
    icon: Building2,
    title: 'Factory and Establishment Setup Support',
    desc: 'We guide you through the complete setup of your factory or establishment, from registrations to statutory approvals. Start your operations faster with the right compliance foundation in place.',
  },
]

export default function CompliancePage() {
  return (
    <>
      <SeoHead
        title="Labour Law Compliance Services in India | People Consulting"
        description="End-to-end labour law compliance services, statutory compliance services and establishment compliance for businesses in India. Book a free health check."
        ogTitle="Labour Law & Statutory Compliance Services | People Consulting"
        ogDescription="Labour law consultancy and statutory compliance management covering PF, ESIC, LWF, PT, TDS and establishment compliance, all under one partner."
        twitterTitle="Labour Law & Statutory Compliance Services | People Consulting"
        twitterDescription="Labour law consultancy and statutory compliance management covering PF, ESIC, LWF, PT, TDS and establishment compliance, all under one partner."
        canonicalPath="/compliance"
        image="/img/about-hero-bg-v3.png"
      />

      {/* ================= 1. HERO ================= */}
      <section className="relative min-h-[460px] py-16 sm:py-20 flex items-center justify-center overflow-hidden border-b border-slate-200/80">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/about-hero-bg-v3.png"
            alt="Labour law compliance services and statutory compliance management by People Consulting"
            fill
            className="object-cover"
            priority
          />
          {/* Solid Dark Gray Overlay with Opacity */}
          <div className="absolute inset-0 bg-gray-950/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-sm font-medium tracking-wider">
            <Link
              href="/"
              className="hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <span className="mx-3">/</span>
            <span className="text-gray-300">Compliance</span>
          </div>

          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-4">
            End-to-End Labour Law & Statutory Compliance Services
          </h1>

          <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl mx-auto leading-relaxed">
            From establishment registrations to monthly statutory filings, People Consulting manages the full labour law compliance lifecycle for your business, so your team can focus on growth, not paperwork. One partner, every regulation covered.
          </p>

          {/* 2 CTA Buttons */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact-us?service=compliance-health-check"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              <span>Book a Free Compliance Health Check</span>
            </Link>
            <Link
              href="#compliance-services"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/40 px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              <span>Explore Our Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. WHAT WE HANDLE (CMS + SWIPER SLIDER) ================= */}
      <ComplianceServicesSlider />

      {/* ================= 3. OUR SOLUTIONS ================= */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/img/paper_texture_bg.png')] bg-repeat z-0"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold">
                Our Solutions
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Complete Statutory Compliance Services Under One Partner
            </h2>
            <p className="text-xs md:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We act as your extended compliance team, managing all statutory filings, documentation, and government interactions as part of our labour law consultancy and compliance management services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {complianceSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-5 sm:p-6 lg:p-5 xl:p-6 rounded-3xl shadow-sm border border-slate-200/60 hover:bg-[#fff9f5] hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 group flex flex-col relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-secondary/5 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-sm sm:text-[15px] text-primary mb-2 group-hover:text-secondary transition-colors duration-300 leading-snug">
                    {solution.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {solution.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= 4. HOW WE SIMPLIFY HR & COMPLIANCE FOR YOU ================= */}
      <ComplianceSimplificationSection />

      {/* ================= 5. DASHBOARD PREVIEW & FEATURES (FAQ ACCORDION) ================= */}
      <ComplianceDashboardSection />

      {/* ================= 4. COMPLIANCE LIBRARY ================= */}
      <ComplianceLinks />

      {/* ================= 5. FAQs ================= */}
      <FAQs className="bg-slate-50" />

      {/* ================= 6. CTA ================= */}
      <CallToAction
        title="Let's Keep Your Business Fully Compliant"
        description="Whether you need labour law compliance services, statutory compliance management, or expert labour law consultancy, People Consulting is ready to help. Book a free compliance health check today."
        buttons={[
          { label: "Get In Touch", href: "/contact-us", primary: true },
          { label: "HR Solutions", href: "/services" },
          { label: "Looking for Job", href: "/career" },
        ]}
      />
    </>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container, CallToAction } from '@/components/ui'
import {
  Cpu,
  HeartPulse,
  Building2,
  Factory,
  ShoppingCart,
  Briefcase,
  Zap,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Users,
  Award
} from 'lucide-react'

const industrySectors = [
  {
    name: 'IT & Technology',
    icon: Cpu,
    tagline: 'Digital Transformation & Engineering',
    image: '/img/tech_industry.png',
    desc: 'Empowering tech startups and enterprise platforms with top-tier software engineers, cloud architects, product leaders, and CTO advisory. We help companies scale engineering organizations across emerging technologies.',
    features: ['Software Engineering & Architecture', 'Cloud & DevOps Specialists', 'AI & Machine Learning Talent', 'Product & Technical Leadership']
  },
  {
    name: 'Healthcare & Life Sciences',
    icon: HeartPulse,
    tagline: 'Medical Excellence & Biotech Leadership',
    image: '/img/healthcare_industry.png',
    desc: 'Sourcing clinical specialists, hospital administrative leaders, regulatory affairs experts, and pharmaceutical R&D professionals. Our practice bridges executive medical talent with healthcare institutions globally.',
    features: ['Hospital Administration & Leadership', 'Biotech & Pharma R&D', 'Clinical Research Directors', 'Medical Regulatory Compliance']
  },
  {
    name: 'Banking, Finance & Fintech',
    icon: Building2,
    tagline: 'Financial Advisory & Capital Management',
    image: '/img/finance_industry.png',
    desc: 'Placing high-caliber investment bankers, risk management directors, statutory compliance officers, and fintech innovators. We connect financial institutions with leaders who navigate complex market regulations.',
    features: ['Investment Banking & M&A', 'Financial Risk & Compliance', 'Fintech Product Managers', 'Corporate Accounting & Audit']
  },
  {
    name: 'Manufacturing & Industrial Core',
    icon: Factory,
    tagline: 'Operational Excellence & Supply Chain',
    image: '/img/manufacturing_industry.png',
    desc: 'Connecting manufacturing conglomerates with plant heads, supply chain strategists, quality assurance directors, and EHS managers. We support smart factory automation and lean industrial operations.',
    features: ['Plant Operations & Management', 'Global Supply Chain & Logistics', 'Quality Assurance & Lean Six Sigma', 'EHS & Industrial Safety Officers']
  },
  {
    name: 'Retail, FMCG & E-Commerce',
    icon: ShoppingCart,
    tagline: 'Consumer Brands & Omnichannel Growth',
    image: '/img/capabilities_card.png',
    desc: 'Driving retail transformation through category managers, brand strategists, digital marketing leaders, and supply chain experts. We enable consumer brands to win in omnichannel marketplaces.',
    features: ['Omnichannel Retail Strategy', 'Category Management & Merchandising', 'Brand & Performance Marketing', 'E-Commerce Logistics Leaders']
  },
  {
    name: 'Energy, Infrastructure & Clean Tech',
    icon: Zap,
    tagline: 'Sustainable Power & Smart Infrastructure',
    image: '/img/industries_card.png',
    desc: 'Navigating the green energy transition with project development managers, renewable energy engineers, and infrastructure directors. We build leadership teams powering global sustainability.',
    features: ['Solar & Wind Project Engineers', 'Infrastructure Asset Managers', 'ESG & Sustainability Directors', 'Grid Modernization Experts']
  },
  {
    name: 'Corporate, Professional & Legal Services',
    icon: Briefcase,
    tagline: 'Strategic HR & Executive Governance',
    image: '/img/about-us.jpg',
    desc: 'Matching law firms, consulting practices, and corporate headquarters with legal counsel, CHROs, and administrative directors who build resilient corporate structures.',
    features: ['General Counsel & Legal Talent', 'CHRO & HR Business Partners', 'Corporate Strategy Advisors', 'Administrative Operations Directors']
  },
  {
    name: 'Education, Media & EdTech',
    icon: GraduationCap,
    tagline: 'Knowledge Dissemination & Content Innovation',
    image: '/img/hr_training_1783707657031.png',
    desc: 'Connecting educational institutions, learning platforms, and media agencies with academic leaders, EdTech innovators, and corporate learning directors.',
    features: ['Academic Deans & Institution Leaders', 'EdTech Product & Curriculum Specialists', 'Media & Communications Directors', 'Corporate Training Directors']
  }
]

export default function IndustriesPage() {
  return (
    <>
      {/* ================= 1. HERO ================= */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gray-900 min-h-[420px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/industries_card.png"
            alt="Industries We Serve"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Solid Dark Gray Overlay with Opacity */}
        <div className="absolute inset-0 bg-gray-900/70" />

        {/* Content */}
        <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
          <div className="max-w-3xl w-full text-left">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-300 font-medium">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span className="font-bold text-secondary">
                Industries
              </span>
            </nav>

            {/* Heading */}
            <h1 className="mb-4 font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-md tracking-tight">
              Industries We Serve
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-200 mb-8 drop-shadow-sm">
              Sector-focused talent acquisition, executive search, and HR advisory across major global industries. We bring deep domain knowledge to connect high-impact leaders with forward-thinking organizations.
            </p>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Consult Our Industry Experts</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ================= 2. ALTERNATING ZIG-ZAG SECTORS SECTION ================= */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-4">
              Sector Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(13_33_55)] leading-tight tracking-tight">
              Tailored Talent Solutions Across Key Domains
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Every industry faces unique operational, regulatory, and talent challenges. Our specialized search practice teams combine deep market networks with rigorous screening to deliver high-performance executive placements.
            </p>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {industrySectors.map((sector, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={idx}
                  className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl group ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <Image
                      src={sector.image}
                      alt={sector.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                      <span className="text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
                        {sector.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-secondary flex items-center justify-center shadow-sm">
                      <sector.icon size={28} />
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(13_33_55)] leading-tight">
                      {sector.name}
                    </h3>

                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                      {sector.desc}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {sector.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm"
                        >
                          <ShieldCheck size={16} className="text-secondary shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <span>Explore {sector.name} Solutions</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ================= 3. WHY OUR INDUSTRY PRACTICE ================= */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[rgb(13_33_55)] to-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <Award className="text-secondary mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Deep Industry Knowledge</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our talent advisors don&apos;t just recruit—they understand sector specific compliance frameworks, technical requirements, and market dynamics.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-[rgb(13_33_55)] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <Users className="text-secondary mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">50,000+ Verified Candidate Network</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Access active and passive executive talent pipelines mapped across India and global markets for rapid placement cycles.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/90 to-orange-600 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <ShieldCheck className="text-white mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Statutory Compliance Alignment</h3>
                <p className="text-orange-100 text-sm leading-relaxed">
                  From labor law adherence to contractual compliance, we ensure every placement meets the highest regulatory standards.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= 4. CTA ================= */}
      <CallToAction />
    </>
  )
}

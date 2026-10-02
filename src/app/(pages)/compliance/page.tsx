import Image from 'next/image'
import Link from 'next/link'
import { Container, CallToAction } from '@/components/ui'
import { CheckCircle2, Building2, Factory, FileSignature, ShoppingCart, ShieldCheck, Briefcase, Landmark, FileText, BadgePercent, GraduationCap, Gavel, FileCheck, ArrowRight, Layers, BellRing, PieChart } from 'lucide-react'
import { FAQs } from '@/components/home'
import SeoHead from '@/components/seo/SeoHead'
import ComplianceLinks from '@/components/compliance/ComplianceLinks'

const complianceServices = [
  {
    title: 'Establishment Compliance',
    desc: 'Ensuring full compliance across shops, offices, and commercial establishments nationwide.',
    img: '/img/capabilities_card.png',
  },
  {
    title: 'Factory Compliance',
    desc: 'Comprehensive factory law compliance ensuring operational safety and regulatory adherence.',
    img: '/img/manufacturing_industry.png',
  },
  {
    title: 'Licensing & Registration Services',
    desc: 'End-to-end business licensing and statutory registrations across all jurisdictions.',
    img: '/img/practice-details-bg.png',
  },
  {
    title: 'Trade & Retail Compliance',
    desc: 'Regulatory support for trade licenses, shop establishments, and retail-specific statutory needs.',
    img: '/img/finance_industry.png',
  },
  {
    title: 'Digital Compliance Tracking',
    desc: 'Technology-enabled monitoring of filings, deadlines, and regulatory updates in real time.',
    img: '/img/tech_industry.png',
  },
  {
    title: 'Compliance Audits & Reporting',
    desc: 'Periodic audits and detailed reporting to keep your organization always audit-ready.',
    img: '/img/about-us.jpg',
  },
]

const complianceSolutions = [
  {
    icon: Briefcase,
    title: 'Provident Fund (PF)',
    desc: 'Employee enrolment, KYC, ECR filing, challans, transfers, withdrawals, statutory records, inspections, and department coordination.',
  },
  {
    icon: Building2,
    title: 'ESIC Compliance',
    desc: 'Employee registration, e-Pehchan, monthly filings, contribution management, inspections, and statutory documentation.',
  },
  {
    icon: Landmark,
    title: 'Labour Welfare Fund (LWF)',
    desc: 'State-wise enrolment, contribution filings, challans, employee records, and statutory compliance management.',
  },
  {
    icon: FileText,
    title: 'Professional Tax (PT)',
    desc: 'Registration, employee enrolment, return filing, challans, and statutory record management.',
  },
  {
    icon: BadgePercent,
    title: 'Payroll Tax (TDS)',
    desc: 'Investment validation, Form 24Q, quarterly returns, Form 16 generation, and payroll tax documentation.',
  },
  {
    icon: Gavel,
    title: 'Government Liaison Support',
    desc: 'Support for notices, inspections, documentation, and communication with statutory authorities whenever required.',
  },
]

export default function CompliancePage() {
  return (
    <>
      <SeoHead
        title="Compliance Management | People Consulting"
        description="End-to-End Labour Law & Statutory Compliance Management."
        canonicalPath="/compliance"
      />

      {/* ================= 1. HERO ================= */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-slate-200/80">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/practice-hero-bg-v2.png"
            alt="Corporate Compliance Background"
            fill
            className="object-cover"
            priority
          />
          {/* Solid Dark Gray Overlay with Opacity */}
          <div className="absolute inset-0 bg-gray-900/70" />
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

          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-6">
            End-to-End Labour Law & Statutory Compliance Management
          </h1>

          <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl mx-auto leading-relaxed">
            From establishment registrations to monthly statutory filings, we manage the full compliance
            lifecycle for your business — so your team can focus on growth, not paperwork. One
            partner, every regulation covered.
          </p>

          <div className="pt-8">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              <span>Talk to Our Experts</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. WHAT WE HANDLE ================= */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative border-b border-slate-200/80">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest">
                What We Handle
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Our Compliance Services
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive coverage across every stage of your business&apos;s regulatory journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceServices.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 border border-slate-100 flex flex-col transform hover:-translate-y-2"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center relative bg-white">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <ShieldCheck size={32} className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-primary mt-6 mb-2 group-hover:text-secondary transition-colors duration-300">{service.title}</h3>
                  <p className="text-xs text-slate-600 mb-8 flex-grow leading-relaxed">{service.desc}</p>

                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= 3. OUR SOLUTIONS ================= */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/img/paper_texture_bg.png')] bg-repeat z-0"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest">
                Our Solutions
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Complete Compliance Management Under One Partner
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We act as your extended compliance team, managing all statutory filings, documentation, and government interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:bg-[#fff9f5] hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 group flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/5 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{solution.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {solution.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= 4. DASHBOARD PREVIEW ================= */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest">
                  Compliance Dashboard
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold">
                  Powered by Digiliance
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                Track Every Filing, Deadline & Update in Real Time
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium pb-2">
                Our compliance dashboard gives you complete visibility into your organization&apos;s statutory status — no more chasing spreadsheets or waiting on emails.
              </p>
              
              <div className="space-y-3.5">
                {[
                  { title: 'Real-time dashboards & visual reports', icon: PieChart },
                  { title: 'Track key compliance metrics at a glance', icon: Layers },
                  { title: 'Automated deadline reminders & alerts', icon: BellRing },
                  { title: 'Export filings & reports in multiple formats', icon: FileCheck },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[#f8faff] border border-slate-200/90 hover:border-secondary/40 hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-xs">
                      <item.icon size={20} strokeWidth={2.2} />
                    </div>
                    <span className="text-primary font-bold text-sm sm:text-base leading-snug group-hover:text-secondary transition-colors">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dashboard Visual */}
            <div className="lg:col-span-7 relative">
              {/* Decorative Blobs */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Device Window Frame */}
              <div className="relative bg-slate-900 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 shadow-2xl overflow-visible border-4 border-slate-100/90 group transform hover:scale-[1.01] transition-transform duration-500">
                {/* Browser Top Chrome */}
                <div className="flex items-center justify-between gap-3 mb-4 px-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/50 shadow-xs"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50 shadow-xs"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/50 shadow-xs"></div>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 text-[11px] sm:text-xs font-mono shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    app.digiliance.com/dashboard
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 font-semibold tracking-wide">
                    <span className="text-secondary font-extrabold tracking-wider">DIGILIANCE</span>
                  </div>
                </div>

                {/* Real Digiliance Dashboard Screen Image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white">
                  <Image
                    src="/img/dashbaord.jpeg"
                    alt="Digiliance Statutory Compliance Management Dashboard"
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-100 flex items-center gap-3 animate-bounce-slow z-20">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                    <CheckCircle2 size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-primary">Audit Ready</div>
                    <div className="text-[11px] text-slate-500 font-medium">All statutory records verified</div>
                  </div>
                </div>

                {/* Floating Top-Right Bell Alert */}
                <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-100 z-20">
                  <div className="relative">
                    <BellRing size={24} className="text-secondary" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= 4. COMPLIANCE LIBRARY ================= */}
      <ComplianceLinks />

      {/* ================= 5. FAQs ================= */}
      <FAQs className="bg-slate-50" />

      {/* ================= 6. CTA ================= */}
      <CallToAction />
    </>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Container, CallToAction } from '@/components/ui'
import { CheckCircle2, Building2, Factory, FileSignature, ShoppingCart, Activity, ShieldCheck, Briefcase, Landmark, FileText, BadgePercent, GraduationCap, Gavel, FileCheck, ArrowRight, Layers, BellRing, PieChart } from 'lucide-react'
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
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
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
      <section className="py-16 md:py-14 bg-white relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
            <p className="text-sm font-bold tracking-widest text-secondary uppercase">
              What We Handle
            </p>
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
      <section className="py-16 md:py-14 bg-slate-50 relative overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/img/paper_texture_bg.png')] bg-repeat z-0"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <p className="text-sm font-bold tracking-widest text-secondary uppercase">
              Our Solutions
            </p>
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
      <section className="py-16 md:py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm font-bold tracking-widest text-secondary uppercase">
                Compliance Dashboard
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                Track Every Filing, Deadline & Update in Real Time
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium pb-2">
                Our compliance dashboard gives you complete visibility into your organization&apos;s statutory status — no more chasing spreadsheets or waiting on emails.
              </p>
              
              <ul className="space-y-5">
                {[
                  { title: 'Real-time dashboards & visual reports', icon: PieChart },
                  { title: 'Track key compliance metrics at a glance', icon: Layers },
                  { title: 'Automated deadline reminders & alerts', icon: BellRing },
                  { title: 'Export filings & reports in multiple formats', icon: FileCheck },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300 border border-transparent hover:border-slate-100">
                    <div className="mt-0.5 bg-secondary/10 text-secondary rounded-xl p-2.5 shadow-sm">
                      <item.icon size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-700 font-bold text-base pt-2.5">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Dashboard Visual */}
            <div className="lg:col-span-7 relative">
              {/* Decorative Blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
              
              <div className="relative bg-gradient-to-br from-primary to-slate-900 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl overflow-visible border-4 border-slate-50 transform hover:scale-[1.02] transition-transform duration-500">
                {/* Mock UI Header */}
                <div className="flex gap-2 mb-6 ml-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500 shadow-sm"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500 shadow-sm"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-500 shadow-sm"></div>
                </div>

                <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-white/20 relative backdrop-blur-sm">
                  {/* Glass Header */}
                  <div className="bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200/80 flex justify-between items-center sticky top-0 z-10">
                    <span className="text-base font-extrabold text-slate-800 tracking-wide flex items-center gap-2">
                      <Activity size={18} className="text-secondary" />
                      Compliance Overview
                    </span>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">System Active</span>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { val: '1,248', label: 'Total Documents', color: 'text-primary' },
                        { val: '98%', label: 'Compliance Rate', color: 'text-emerald-600' },
                        { val: '99.8%', label: 'Filing Accuracy', color: 'text-blue-600' }
                      ].map((stat, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                          <div className={`text-3xl font-extrabold mb-1.5 ${stat.color}`}>{stat.val}</div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Charts Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Bar Chart */}
                      <div className="sm:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 flex items-end justify-between h-48 pt-12 pb-6 px-6 shadow-sm">
                        {[40, 60, 45, 80, 55, 75, 50, 90, 65].map((h, i) => (
                          <div key={i} className="w-[8%] bg-gradient-to-t from-primary to-blue-400 rounded-t-md hover:opacity-80 cursor-pointer transition-all duration-300 group relative" style={{ height: `${h}%` }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                              {h}%
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Donut Chart */}
                      <div className="sm:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center shadow-sm">
                        <div className="relative w-24 h-24 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-secondary drop-shadow-md" strokeDasharray="76, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </svg>
                          <span className="absolute text-lg font-extrabold text-slate-800">76%</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-widest">On Time Filings</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl shadow-slate-900/20 border border-slate-100 animate-bounce-slow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Audit Ready</div>
                      <div className="text-xs text-slate-500 font-medium">All clear for Q3</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl shadow-slate-900/20 border border-slate-100">
                  <div className="relative">
                    <BellRing size={28} className="text-secondary" />
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
      <FAQs />

      {/* ================= 6. CTA ================= */}
      <CallToAction />
    </>
  )
}

'use client'

import { Container } from '@/components/ui'
import {
  Building2,
  UserCheck,
  Clock,
  CreditCard,
  User,
  Smartphone,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    title: 'Company Management',
    description:
      'Manage departments, branches, policies, and workforce data effortlessly. Centralized company information keeps teams organized, connected, and efficient.',
    icon: Building2,
    href: '/services',
  },
  {
    title: 'HR Management',
    description:
      'Streamline employee management with automated HR workflows. Handle onboarding, attendance, documents, and leave from one secure platform.',
    icon: UserCheck,
    href: '/services',
  },
  {
    title: 'Attendance Management',
    description:
      'Track attendance, shifts, overtime, and working hours effortlessly. Automated records and real-time reporting improve accuracy while reducing manual effort.',
    icon: Clock,
    href: '/services',
  },
  {
    title: 'Payroll Management',
    description:
      'Simplify payroll with automated salary processing, deductions, and compliance. Reduce manual work while improving accuracy and efficiency.',
    icon: CreditCard,
    href: '/services',
  },
  {
    title: 'Employee Management',
    description:
      'Simplify employee management with secure records, onboarding, and document storage. Improve visibility, productivity, and workforce administration.',
    icon: User,
    href: '/services',
  },
  {
    title: 'Employee Self-Service Mobile App',
    description:
      'Access attendance, leave, payslips, and personal information anytime. Empower employees with secure self-service while reducing HR workload.',
    icon: Smartphone,
    href: '/services',
  },
]

export default function FeaturesHRMS() {
  return (
    <section
      className="py-16 md:py-20 bg-slate-50/80 relative overflow-hidden border-b border-slate-200/60"
      id="hrms-features"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold tracking-wider uppercase mb-3.5 shadow-sm">
            PeopleX
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            One Platform. <span className="text-secondary">Smarter HR.</span> Seamless Payroll
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
            One platform for Payroll, Compliance, Leave &amp; Attendance, and smarter HR automation.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(13,33,55,0.08)] hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Top subtle highlight line on hover */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50/90 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2.5 leading-snug group-hover:text-secondary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="pt-2">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:text-secondary transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

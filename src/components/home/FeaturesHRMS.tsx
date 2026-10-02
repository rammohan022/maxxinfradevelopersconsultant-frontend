'use client'

import { Container } from '@/components/ui'
import {
  Building2,
  UserCheck,
  Clock,
  CreditCard,
  User,
  Smartphone,
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Company Management',
    description:
      'Manage departments, branches, policies, and workforce data effortlessly. Centralized company information keeps teams organized, connected, and efficient.',
    icon: Building2,
  },
  {
    title: 'HR Management',
    description:
      'Streamline employee management with automated HR workflows. Handle onboarding, attendance, documents, and leave from one secure platform.',
    icon: UserCheck,
  },
  {
    title: 'Attendance Management',
    description:
      'Track attendance, shifts, overtime, and working hours effortlessly. Automated records and real-time reporting improve accuracy while reducing manual effort.',
    icon: Clock,
  },
  {
    title: 'Payroll Management',
    description:
      'Simplify payroll with automated salary processing, deductions, and compliance. Reduce manual work while improving accuracy and efficiency.',
    icon: CreditCard,
  },
  {
    title: 'Employee Management',
    description:
      'Simplify employee management with secure records, onboarding, and document storage. Improve visibility, productivity, and workforce administration.',
    icon: User,
  },
  {
    title: 'Employee Self-Service Mobile App',
    description:
      'Access attendance, leave, payslips, and personal information anytime. Empower employees with secure self-service while reducing HR workload.',
    icon: Smartphone,
  },
]

export default function FeaturesHRMS() {
  return (
    <section
      className="py-12 md:py-16 bg-slate-50/80 relative overflow-hidden border-b border-slate-200/60"
      id="hrms-features"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-3">
            PeopleX
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-3">
            One Platform. <span className="text-secondary">Smarter HR.</span> Seamless Payroll
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
            One platform for Payroll, Compliance, Leave &amp; Attendance, and smarter HR automation.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(13,33,55,0.06)] hover:border-secondary/40 transition-all duration-300 flex flex-col hover:-translate-y-0.5"
              >
                {/* Top subtle highlight line on hover */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-lg bg-blue-50/90 text-primary flex items-center justify-center mb-3.5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-primary mb-2 leading-snug group-hover:text-secondary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}


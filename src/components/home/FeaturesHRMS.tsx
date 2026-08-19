'use client'

import { Container } from '@/components/ui'
import { Users, Banknote, FileCheck, CalendarDays, UserCog, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'HR Management',
    description: 'Manage employee onboarding, digital records, HR policies, and workforce information from one centralized platform.',
    icon: Users,
    iconBg: 'bg-primary',
  },
  {
    title: 'Payroll Management',
    description: 'Automate payroll processing, salary structures, tax declarations, and statutory payroll compliance.',
    icon: Banknote,
    iconBg: 'bg-primary',
  },
  {
    title: 'Compliance Management',
    description: 'Manage statutory compliance, labour law records, returns, and employee documentation with confidence.',
    icon: FileCheck,
    iconBg: 'bg-secondary',
  },
  {
    title: 'Attendance Management',
    description: 'Track daily attendance, shifts, regularizations, and timesheets accurately across multiple locations.',
    icon: CalendarDays,
    iconBg: 'bg-primary',
  },
  {
    title: 'Leave Management',
    description: 'Simplify leave policies, approvals, leave balances, and track team availability in real-time.',
    icon: UserCog,
    iconBg: 'bg-primary',
  },
  {
    title: 'Exit Management',
    description: 'Manage resignations, exit interviews, asset recovery, and full & final settlements seamlessly.',
    icon: LogOut,
    iconBg: 'bg-primary',
  },
]

export default function FeaturesHRMS() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden" id="hrms-features">
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            Features of HRMS Software
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Empower your HR team with a smart, cloud-based platform that streamlines employee management, attendance, payroll, leave, compliance, approvals, and reporting. AddettoHR helps businesses reduce manual work, improve accuracy, and build efficient HR operations through intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-100 rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-full ${feature.iconBg} flex items-center justify-center text-white mb-6 shadow-md`}>
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-primary mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

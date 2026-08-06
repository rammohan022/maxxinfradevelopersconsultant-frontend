'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, ArrowRight, ChevronRight, Calculator } from 'lucide-react'

const availableCalculators = [
  { name: 'Salary & Take-Home Calculator', href: '/salary-calculator' },
  { name: 'Gratuity & Exit Benefit Calculator', href: '/gratuity-calculator' },
  { name: 'Attrition Rate Calculator', href: '/attrition-calculator' },
]

export default function CalculatorSidebar({ currentPath }: { currentPath?: string }) {
  const pathname = usePathname()
  const activePath = currentPath || pathname

  // Filter out the calculator of the current active page
  const otherCalculators = availableCalculators.filter(
    (tool) => !activePath?.includes(tool.href)
  )

  return (
    <div className="space-y-6">
      {/* Strategic Advisory Banner */}
      <div className="bg-gradient-to-br from-[#fff5ee] via-[#fef3eb] to-[#fde7d8] rounded-2xl p-6 border border-secondary/30 shadow-sm relative overflow-hidden text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-primary leading-snug">
              Payroll Restructuring & Advisory
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Optimize tax compliance and design competitive CTC structures with People Consulting expert advisors.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="w-full bg-secondary hover:bg-secondary-dark text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            REQUEST CONSULTATION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Other Available Calculators List */}
      {otherCalculators.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-secondary" />
            Other HR Utilities
          </h4>
          <div className="space-y-1.5">
            {otherCalculators.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all text-slate-700 hover:bg-[#fff5ee] hover:text-secondary hover:border-secondary/30 border border-transparent"
              >
                <span>{tool.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

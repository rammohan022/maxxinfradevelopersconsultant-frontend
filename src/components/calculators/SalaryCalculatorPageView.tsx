'use client'

import { Container } from '@/components/ui'
import SalaryCalculator from '@/components/calculators/SalaryCalculator'
import SalaryContent from '@/components/calculators/SalaryContent'
import CalculatorSidebar from '@/components/calculators/CalculatorSidebar'

export default function SalaryCalculatorPageView() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-6 md:py-10">
      <Container>
        {/* Main Header (Compact & Small) */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Salary Calculator
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Estimate your monthly in-hand take-home salary, employer/employee PF contributions, and cost to company (CTC) breakdown.
          </p>
        </div>

        {/* Main Grid: Calculator & Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <SalaryCalculator />
            <SalaryContent />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <CalculatorSidebar currentPath="/salary-calculator" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

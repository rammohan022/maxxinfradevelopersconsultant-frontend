'use client'

import { Container } from '@/components/ui'
import AttritionCalculator from '@/components/calculators/AttritionCalculator'
import AttritionContent from '@/components/calculators/AttritionContent'
import CalculatorSidebar from '@/components/calculators/CalculatorSidebar'

export default function AttritionCalculatorPageView() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-6 md:py-10">
      <Container>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Attrition Rate Calculator
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Calculate your organization&apos;s employee turnover percentage quickly and accurately to evaluate retention strategies and workforce health.
          </p>
        </div>

        {/* Main Grid: Calculator & Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <AttritionCalculator />
            <AttritionContent />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <CalculatorSidebar currentPath="/attrition-calculator" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

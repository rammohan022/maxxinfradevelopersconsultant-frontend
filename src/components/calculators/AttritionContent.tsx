'use client'

import { HelpCircle, Calculator, TrendingDown, CheckCircle2 } from 'lucide-react'

export default function AttritionContent() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-8">
      {/* Overview Section */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-secondary" />
          Understanding Employee Attrition Rate
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Employee Attrition Rate measures the percentage of staff who leave an organization over a specified period (monthly, quarterly, or annually) due to resignation, retirement, or contract termination, without being immediately replaced.
        </p>
      </div>

      {/* Formula & Calculation Method */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-primary flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Attrition Rate Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-xs md:text-sm text-slate-800 space-y-2">
          <p><strong>1. Average Employees:</strong> (Start Count + End Count) &divide; 2</p>
          <p><strong>2. Attrition Rate (%):</strong> (Employees Who Left &divide; Average Employees) &times; 100</p>
        </div>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Example: If you started the year with 100 employees, ended with 110 employees, and 5 employees departed during the year:
          Average Employees = (100 + 110) / 2 = 105. Attrition Rate = (5 / 105) * 100 = 4.76%.
        </p>
      </div>

      {/* Why Attrition Rate Matters */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-secondary" />
          Key Strategies to Reduce High Attrition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Competitive Compensation & CTC
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Regularly benchmark salaries against market rates to prevent key talent loss to competitors.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Career Growth & Upskilling
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Provide continuous professional development, mentorship, and clear internal promotion pathways.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Positive Workplace Culture
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Maintain work-life balance, recognize achievements, and foster an inclusive environment.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Structured Exit Interviews
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Gather actionable feedback from departing staff to identify operational bottlenecks and culture gaps.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

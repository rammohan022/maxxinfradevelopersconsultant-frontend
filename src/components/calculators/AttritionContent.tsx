'use client'

import { useState } from 'react'
import { HelpCircle, Calculator, TrendingDown, CheckCircle2, ChevronDown } from 'lucide-react'

const attritionFaqs = [
  {
    q: "What is a good attrition rate?",
    a: "A 'good' attrition rate varies by industry, but generally, an annual attrition rate of 10% or less is considered healthy and sustainable for most organizations."
  },
  {
    q: "What is the difference between attrition and turnover?",
    a: "Turnover usually refers to employees leaving who are then replaced, while attrition refers to employees leaving without immediate plans to replace them (often due to restructuring, retirement, or automation)."
  },
  {
    q: "How often should I calculate attrition rate?",
    a: "Many companies calculate it monthly or quarterly to spot trends early, but annual attrition is the standard metric used for benchmarking against industry averages."
  },
  {
    q: "Does attrition include involuntary terminations?",
    a: "Yes, overall attrition includes all departures. However, companies often separate it into 'voluntary attrition' (resignations) and 'involuntary attrition' (layoffs, firings) for deeper analysis."
  },
  {
    q: "Why is high attrition bad for business?",
    a: "High attrition leads to increased recruitment and training costs, loss of institutional knowledge, decreased team morale, and potential disruptions in client relationships."
  },
  {
    q: "How can HR reduce a high attrition rate?",
    a: "HR can reduce attrition by offering competitive compensation, clear career progression, improving work-life balance, fostering a positive culture, and conducting exit interviews to address core issues."
  }
];

export default function AttritionContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
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
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Competitive Compensation & CTC
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regularly benchmark salaries against market rates to prevent key talent loss to competitors.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Career Growth & Upskilling
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide continuous professional development, mentorship, and clear internal promotion pathways.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Positive Workplace Culture
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintain work-life balance, recognize achievements, and foster an inclusive environment.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              Structured Exit Interviews
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gather actionable feedback from departing staff to identify operational bottlenecks and culture gaps.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-primary">Frequently Asked Questions (FAQs)</h3>
        <div className="space-y-3">
          {attritionFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${isOpen ? 'border-secondary bg-secondary/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <span className={`font-semibold text-sm md:text-base ${isOpen ? 'text-secondary' : 'text-primary'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : 'text-slate-400'}`} 
                  />
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="p-4 md:p-5 pt-0 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

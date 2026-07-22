'use client'

import { useState } from 'react'
import { ChevronDown, CheckCircle, Lightbulb, ShieldAlert, Award } from 'lucide-react'

const originalFaqs = [
  {
    q: 'How does annual CTC differ from actual take-home salary in India?',
    a: 'Cost to Company (CTC) represents the overall budget an organization allocates for an employee over a full year. This includes direct pay, performance incentives, employer statutory contributions (like EPF and Gratuity), and non-cash perks (like medical insurance). Take-home salary (or net pay) is the cash amount transferred directly to your bank account every month after deducting employee PF, professional tax, and income tax (TDS).',
  },
  {
    q: 'What steps are involved in computing monthly in-hand earnings from gross pay?',
    a: 'To calculate your monthly take-home income, start with your total monthly gross compensation (Basic + HRA + Special Allowances). From this gross figure, subtract mandatory statutory withholdings: Employee EPF (12% of Basic Pay), Professional Tax (determined by state government limits), and any applicable Tax Deduction at Source (TDS).',
  },
  {
    q: 'Which salary components qualify for tax exemptions under Indian tax rules?',
    a: 'Under the Old Tax Regime, employees can claim tax relief on House Rent Allowance (Section 10(13A)), Leave Travel Allowance (LTA), standard deduction of ₹50,000, Section 80C investments (EPF, PPF, ELSS up to ₹1.5 Lakhs), and medical premiums (Section 80D). Under the New Tax Regime, tax slabs are lower, but most itemized deductions except standard deduction and employer EPF contribution are phased out.',
  },
  {
    q: 'Can employees choose to cap their monthly EPF deduction at ₹1,800?',
    a: 'Yes. Under EPFO guidelines, if your basic pay exceeds ₹15,000 per month, statutory EPF deduction can either be calculated as 12% of your full Basic Salary or capped at 12% of ₹15,000 (which equals ₹1,800 per month for both employee and employer).',
  },
  {
    q: 'Why is employer Provident Fund contribution deducted from CTC?',
    a: 'The employer EPF contribution (12% of basic pay) is paid by your company directly into your EPFO retirement account. Because it is a cost borne by the employer for your employment, companies count it as part of your overall CTC package even though it is not paid out in your monthly salary slip.',
  },
]

export default function SalaryContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-10">
      {/* Overview Section */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-secondary" />
          Understanding Salary Structure & Take-Home Pay
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Navigating executive compensation and job offers requires a clear distinction between what a company spends on your role (Cost to Company) and what actually lands in your bank account (Net Monthly Pay). Our salary estimation tool provides precise, real-time insights into statutory deductions, allowance distribution, and tax-saving opportunities.
        </p>
      </section>

      {/* Key Elements Breakdown */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-primary">Core Components of an Indian Pay Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-[#fff5ee]/50 p-4 rounded-xl border border-secondary/20">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary" />
              Basic Pay
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The foundational, fully taxable element of compensation. Usually configured at 40% to 50% of gross pay, serving as the benchmark for calculating EPF and Gratuity.
            </p>
          </div>

          <div className="bg-[#fff5ee]/50 p-4 rounded-xl border border-secondary/20">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary" />
              House Rent Allowance (HRA)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Allowance designed to offset residential rental expenses. Tax exemptions are calculated as the lowest of actual rent paid, 50%/40% of basic pay, or HRA received.
            </p>
          </div>

          <div className="bg-[#fff5ee]/50 p-4 rounded-xl border border-secondary/20">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary" />
              Provident Fund (EPF)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A retirement fund contribution mandatory for basic pay up to ₹15,000. Both employee and employer match 12% contributions to build long-term savings.
            </p>
          </div>

          <div className="bg-[#fff5ee]/50 p-4 rounded-xl border border-secondary/20">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary" />
              Special & Flexible Allowances
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Residual components used to reach total negotiated CTC. These include performance bonuses, medical benefits, internet allowances, and meal vouchers.
            </p>
          </div>
        </div>
      </section>

      {/* Formula & Comparison Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-primary">Calculation Methodology & Formulas</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Companies structure payroll by dividing annual compensation into fixed gross earnings, variable performance payouts, and statutory employer benefits:
        </p>

        {/* Custom Formula Box */}
        <div className="bg-slate-900 text-slate-100 p-5 rounded-xl text-xs sm:text-sm font-mono space-y-2 border border-slate-800">
          <p className="text-secondary font-bold">&#47;&#47; People Consulting Payroll Model</p>
          <p>Monthly CTC = Gross Salary + Employer EPF + Monthly Bonus Allocation</p>
          <p>Gross Pay = Fixed Basic + HRA + Special Allowances</p>
          <p className="text-secondary">Monthly Take-Home = Gross Pay - (Employee EPF + Professional Tax + Additional Withholdings)</p>
        </div>

        {/* Rephrased Salary Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs md:text-sm text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3 border border-slate-200">Pay Head</th>
                <th className="p-3 border border-slate-200">Part of CTC?</th>
                <th className="p-3 border border-slate-200">Reflected in Monthly Salary Slip?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Basic & HRA</td>
                <td className="p-3 text-secondary font-bold">Yes</td>
                <td className="p-3 text-secondary font-bold">Credited in In-Hand</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Performance Bonus</td>
                <td className="p-3 text-secondary font-bold">Yes</td>
                <td className="p-3 text-slate-500 font-medium">Distributed Periodically / Annually</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Employer EPF Share</td>
                <td className="p-3 text-secondary font-bold">Yes</td>
                <td className="p-3 text-rose-500 font-bold">Deducted from CTC (EPFO Deposit)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Employee EPF Share</td>
                <td className="p-3 text-slate-400">Part of Gross</td>
                <td className="p-3 text-rose-500 font-bold">Deducted from Monthly Gross</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Professional Tax (PT)</td>
                <td className="p-3 text-slate-400">State Statutory Levy</td>
                <td className="p-3 text-rose-500 font-bold">Deducted from Monthly Gross</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategic Benefits */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-primary">Strategic Value for Candidates & HR Leaders</h3>
        <ul className="space-y-2.5 text-sm text-slate-600">
          <li className="flex items-start gap-2.5">
            <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <span><strong>Offer Letter Assessment:</strong> Compare job offers with clarity on net cash flow vs total CTC promises.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <span><strong>Tax Optimization:</strong> Restructure allowance headers to maximize statutory tax exemptions under IT Act provisions.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <span><strong>Financial Budgeting:</strong> Align personal SIP investments and monthly loan commitments with actual bank credits.</span>
          </li>
        </ul>
      </section>

      {/* Rephrased FAQs */}
      <section className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-xl font-bold text-primary">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {originalFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center bg-slate-50/60 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-800 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      isOpen ? 'rotate-180 text-secondary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 text-xs md:text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

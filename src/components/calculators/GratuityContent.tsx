'use client'

import { useState } from 'react'
import { ChevronDown, CheckCircle, Award, FileText, Scale } from 'lucide-react'

const gratuityFaqs = [
  {
    q: 'Is this Gratuity Calculator completely free to use?',
    a: 'Yes, People Consulting provides this online gratuity estimation tool free of charge for employees, HR leaders, and financial advisors without any usage limits.',
  },
  {
    q: 'How are fractional service years handled (e.g. 16 years and 4 months)?',
    a: 'Under the Payment of Gratuity Act 1972, if the extra tenure is less than 6 months (such as 16 years and 4 months), it is rounded down to 16 full years. If the extra tenure is 6 months or more (such as 16 years and 7 months), it is rounded up to 17 full years.',
  },
  {
    q: 'Is 5 years of continuous service mandatory to receive gratuity?',
    a: 'Generally, yes. To qualify for statutory gratuity payouts upon resignation or retirement, an employee must complete at least 5 years of continuous service with the same employer. However, the 5-year tenure rule is waived if employment ends due to permanent disability caused by an accident or illness, or in the event of an employee’s demise.',
  },
  {
    q: 'What are the income tax exemption rules for gratuity received by private sector employees?',
    a: 'For private sector employees covered under the Gratuity Act, the tax-exempt portion is the minimum of three figures: (1) Actual gratuity received, (2) The statutory lifetime cap of ₹20 Lakhs, or (3) The formula amount (15/26 × Last Basic Pay × Years of Service). Any amount received beyond these limits is subject to standard income tax.',
  },
  {
    q: 'What is an Ex-Gratia gratuity payment?',
    a: 'If an employer voluntarily pays an amount higher than the statutory ceiling (or higher than the calculated formula figure), the surplus portion is termed an "Ex-Gratia" payout. Ex-gratia payouts are fully taxable under head "Income from Salary".',
  },
  {
    q: 'How is gratuity calculated for employees not covered under the Act?',
    a: 'For employees not covered under the Payment of Gratuity Act, the calculation is based on a half month\'s average salary for each completed year of service (15/30 * Average Salary of last 10 months * Years of Service).',
  },
  {
    q: 'Can an employer deduct money from my gratuity?',
    a: 'Generally, no. However, deductions can be made if the employee is terminated for willful omission, negligence causing damage to the employer\'s property, or any act involving moral turpitude.',
  }
]

export default function GratuityContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-10">
      {/* Overview Section */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <Award className="w-5 h-5 text-secondary" />
          Understanding Statutory Gratuity Provisions in India
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Gratuity is a monetary benefit offered by employers to honor long-term dedication and continuous service. Governed by the <strong>Payment of Gratuity Act 1972</strong>, this lump-sum benefit is payable to eligible workforce members upon retirement, resignation, superannuation, or job transition after completing a minimum specified tenure.
        </p>
      </section>

      {/* Gratuity Calculation Formula */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-primary">Statutory Gratuity Calculation Formula</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          For organizations covered under the Gratuity Act, the statutory payout formula evaluates 15 days of last drawn basic earnings for every completed year of service:
        </p>

        {/* Formula Box */}
        <div className="bg-slate-100/90 text-slate-800 p-5 rounded-xl text-xs sm:text-sm font-mono space-y-2 border border-slate-200">
          <p className="text-secondary font-bold">&#47;&#47; Standard Gratuity Formula</p>
          <p>Gratuity (G) = (Years of Service × Last Basic Pay & DA × 15) ÷ 26</p>
          <p className="text-xs text-slate-600 font-sans mt-2">
            *Where <strong>15</strong> represents 15 working days per year and <strong>26</strong> represents standard monthly working days excluding weekly off-days.
          </p>
        </div>

        {/* Practical Example Box */}
        <div className="bg-[#fff5ee]/60 border border-secondary/20 p-4 rounded-xl text-xs md:text-sm text-slate-700 space-y-2">
          <h4 className="font-bold text-primary flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-secondary" />
            Illustration Example
          </h4>
          <p className="leading-relaxed">
            Suppose an employee completes <strong>5 years</strong> of continuous service with a final monthly basic salary + DA of <strong>₹30,000</strong>.
          </p>
          <p className="font-mono text-xs bg-white p-2.5 rounded-lg border border-secondary/20 font-semibold">
            Gratuity = (5 × 30,000 × 15) ÷ 26 = ₹86,538.46
          </p>
        </div>
      </section>

      {/* Key Statutory Principles & Rounding Rules */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-primary">Important Statutory Provisions & Service Tenure Rounding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
              Tenure Rounding Rules
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Service periods exceeding 6 months in the final year are rounded up to a full year (e.g., 17 years 7 months = 18 years). Tenures below 6 months are rounded down (e.g., 16 years 4 months = 16 years).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
              5-Year Eligibility Criteria
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Completion of 5 continuous years is compulsory for standard departure payouts. However, this 5-year requirement is waived in case of accidental disability or death.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
              Maximum Gratuity Limit
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              As per the latest 2018 amendment, the maximum tax-free gratuity payable under the Act is capped at ₹20 Lakhs. Any voluntary payment over this limit is taxable.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
              Employer Coverage Rules
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Payment of Gratuity Act applies to all mines, oilfields, plantations, ports, railways, companies, and shops employing 10 or more people on any day of the year.
            </p>
          </div>
        </div>
      </section>

      {/* Taxation Rules Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <Scale className="w-5 h-5 text-secondary" />
          Taxation Guidelines for Gratuity Received
        </h3>
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-xs md:text-sm text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-3 border border-slate-200">Employee Category</th>
                <th className="p-3 border border-slate-200">Income Tax Exemption Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">Government Employees (Central / State / Local)</td>
                <td className="p-3 text-secondary font-bold">100% Tax-Exempt (Fully exempt under Income Tax Act)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">Private Sector Covered under Gratuity Act 1972</td>
                <td className="p-3 text-slate-700 font-medium">
                  Exempt up to minimum of: (1) Actual Gratuity, (2) Statutory Ceiling of ₹20 Lakhs, or (3) Formula Payout.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">Private Sector Not Covered under Gratuity Act</td>
                <td className="p-3 text-slate-700 font-medium">
                  Exempt up to minimum of: (1) Half month salary per year served, or (2) ₹20 Lakhs.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-xl font-bold text-primary">Frequently Asked Questions (FAQs)</h3>
        <div className="space-y-3">
          {gratuityFaqs.map((faq, idx) => {
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
                  <span className="text-sm font-semibold text-primary pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-secondary' : ''
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

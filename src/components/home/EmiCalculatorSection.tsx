"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function EmiCalculatorSection() {
  const [amount, setAmount] = useState(4000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const totalMonths = tenure * 12;
  const emi = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - amount;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="bg-slate-50 rounded-3xl p-6 md:p-12 border border-slate-100">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                <Calculator size={15} /> Financial Planning
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                Calculate Your Home Loan EMI with Ease
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Owning your dream home is easier than ever. Maxx Infra projects are pre-approved by leading banks like SBI, HDFC, and PNB with loan funding up to 90%.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Lowest interest rates starting at 8.40%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Doorstep documentation &amp; zero processing hassle</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Quick sanction within 48 to 72 hours</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/loan"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-md"
                >
                  Apply For Pre-Approved Loan <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Calculator Controls */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase">Loan Amount</span>
                    <span className="text-base font-black text-primary">₹{(amount / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="15000000"
                    step="100000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹10 Lakh</span>
                    <span>₹75 Lakh</span>
                    <span>₹1.5 Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase">Interest Rate</span>
                    <span className="text-base font-black text-secondary">{rate}% P.A.</span>
                  </div>
                  <input
                    type="range"
                    min="7.5"
                    max="13.0"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-secondary h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>7.5%</span>
                    <span>10.0%</span>
                    <span>13.0%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase">Tenure</span>
                    <span className="text-base font-black text-primary">{tenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>5 Years</span>
                    <span>15 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Monthly EMI Output Box */}
              <div className="mt-8 p-5 rounded-xl bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-300 block font-semibold">Estimated Monthly EMI</span>
                  <span className="text-2xl md:text-3xl font-black text-secondary">₹{emi.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-left sm:text-right text-xs text-slate-300">
                  <div>Principal: <strong className="text-white">₹{(amount / 100000).toFixed(1)}L</strong></div>
                  <div>Total Interest: <strong className="text-white">₹{(totalInterest / 100000).toFixed(1)}L</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


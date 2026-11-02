"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calculator, 
  CheckCircle2, 
  Building, 
  Percent, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Phone, 
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/ui";
import { useCreateLeadMutation } from "@/services/lead";
import toast from "react-hot-toast";

export default function LoanPage() {
  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState(4000000); // 40 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    monthlyIncome: "",
    loanNeeded: "₹40 Lakhs",
  });

  const [createLead, { isLoading }] = useCreateLeadMutation();

  // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const handleLoanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      toast.error("Please enter your name and phone number");
      return;
    }

    try {
      await createLead({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || "finance@maxxinfradevelopersconsultant.com",
        subject: `Home Loan Assistance Request - ${formData.loanNeeded}`,
        message: `Loan Amount Required: ${formData.loanNeeded}, Monthly Income: ${formData.monthlyIncome || "Not specified"}. Please assist with loan sanction.`,
        source: "Home Loan Page"
      }).unwrap();

      toast.success("Loan inquiry received! Our banking expert will contact you.");
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        monthlyIncome: "",
        loanNeeded: "₹40 Lakhs",
      });
    } catch {
      toast.error("Failed to submit. Please call +91 79051 45968 directly.");
    }
  };

  const partnerBanks = [
    { name: "State Bank of India (SBI)", rate: "8.40% onwards", maxTenure: "30 Years", features: "Zero processing fee on selected projects" },
    { name: "HDFC Bank", rate: "8.50% onwards", maxTenure: "30 Years", features: "Fast-track 48 hr sanction" },
    { name: "ICICI Bank", rate: "8.55% onwards", maxTenure: "30 Years", features: "Digital pre-approved sanction" },
    { name: "Punjab National Bank (PNB)", rate: "8.45% onwards", maxTenure: "30 Years", features: "Lowest EMI & flexible prepayment" },
    { name: "Bank of Baroda", rate: "8.40% onwards", maxTenure: "30 Years", features: "Transparent terms & zero hidden fee" },
    { name: "Axis Bank", rate: "8.75% onwards", maxTenure: "30 Years", features: "Higher eligibility on family income" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="relative bg-primary text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/img/hero/real_estate_hero.jpg"
            alt="Home Loan Assistance"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

        <Container className="relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-semibold tracking-wide uppercase mb-4 border border-secondary/30">
            <ShieldCheck size={16} /> Hassle-Free Home Loan Assistance
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get Up to 90% Funding at Lowest Interest Rates
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Maxx Infra Developers & Consultant partners with premier nationalized and private banks to ensure fast-track home loan sanction with zero consultancy fees.
          </p>
        </Container>
      </div>

      <Container className="-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive EMI Calculator */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calculator size={26} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Interactive Home Loan EMI Calculator</h2>
                <p className="text-xs text-slate-500">Plan your home budget and monthly installment easily</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              {/* Loan Amount Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Loan Amount</label>
                  <span className="text-base font-black text-primary">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹5 Lakh</span>
                  <span>₹75 Lakh</span>
                  <span>₹1.5 Crore</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Interest Rate (% P.A.)</label>
                  <span className="text-base font-black text-secondary">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="14.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-secondary h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>7.5%</span>
                  <span>10.5%</span>
                  <span>14.0%</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Loan Tenure (Years)</label>
                  <span className="text-base font-black text-primary">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* EMI Result Summary Card */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Monthly EMI</span>
                <span className="text-xl md:text-2xl font-black text-primary">₹{emi.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Total Interest</span>
                <span className="text-xl md:text-2xl font-black text-amber-600">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Total Payable</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Right: Instant Loan Assistance Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={14} /> 100% Free Doorstep Support
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Check Loan Eligibility & Apply</h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill this quick form and our dedicated loan manager will get you the best bank quote within 2 hours.
            </p>

            <form onSubmit={handleLoanSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amit Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Monthly In-Hand Income</label>
                <select
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary bg-white"
                >
                  <option value="">Select income range</option>
                  <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                  <option value="Above ₹2,00,000">Above ₹2,00,000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Loan Amount Required</label>
                <input
                  type="text"
                  value={formData.loanNeeded}
                  onChange={(e) => setFormData({ ...formData, loanNeeded: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-white text-xs font-bold tracking-wide uppercase hover:bg-primary-dark transition shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? "Submitting..." : "Apply For Pre-Approved Loan"}
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Partner Banks Grid */}
      <Container className="mt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Trusted Banking Network</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">Our Partner Banks & Lenders</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2">
            Maxx Infra projects are approved with all major public and private sector banks for hassle-free sanction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerBanks.map((bank, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900 text-sm">{bank.name}</h4>
                <Building size={18} className="text-secondary" />
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex justify-between">
                  <span className="text-slate-400">Interest Rate:</span>
                  <span className="font-bold text-emerald-600">{bank.rate}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Tenure:</span>
                  <span className="font-semibold text-slate-800">{bank.maxTenure}</span>
                </p>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-50">
                  {bank.features}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Documents Required */}
      <Container className="mt-16">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Checklist</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">Documents Required for Home Loan</h3>
            <p className="text-xs text-slate-500 mt-1">Keep these basic documents ready for 24-48 hour approval</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50">
              <FileText className="text-primary mb-3" size={24} />
              <h5 className="font-bold text-sm text-slate-800 mb-2">1. Identity & Address Proof</h5>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>PAN Card & Aadhaar Card</li>
                <li>Passport / Voter ID</li>
                <li>Recent passport sized photos</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-50">
              <Percent className="text-secondary mb-3" size={24} />
              <h5 className="font-bold text-sm text-slate-800 mb-2">2. Income Documents (Salaried)</h5>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Last 3 to 6 months salary slips</li>
                <li>Latest 6 months bank statement</li>
                <li>Form 16 & ITR for last 2 years</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-50">
              <Building className="text-emerald-600 mb-3" size={24} />
              <h5 className="font-bold text-sm text-slate-800 mb-2">3. Self-Employed / Business</h5>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Last 2-3 years ITR with computation</li>
                <li>Balance sheet & P&L statements</li>
                <li>Business registration / GST certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


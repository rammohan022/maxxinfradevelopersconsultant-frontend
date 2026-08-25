'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { motion } from "framer-motion"
import { Calendar, FileText, CheckCircle2, Send } from "lucide-react"
import { toast } from "react-hot-toast"

const programs = [
  { title: "Leadership & Strategic Management", desc: "Build cross-functional management capabilities and strategic vision." },
  { title: "Statutory Compliance & Labor Law", desc: "Keep internal teams aligned with legal compliance updates." },
  { title: "Diversity, Equity & Inclusion (DEI)", desc: "Foster inclusive culture, employee compliance, and trust." },
  { title: "Performance & OKR Goal Alignment", desc: "Align team execution and track productivity metrics efficiently." },
  { title: "Soft Skills & Team Communication", desc: "Enhance interpersonal collaboration, emotional intelligence, and synergy." },
  { title: "POSH & Harassment Prevention", desc: "Ensure safe, respectful workplaces in compliance with statutory POSH laws." },
]

export default function CorporateTraining() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      toast.error("Please fill in all fields.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Demo request submitted successfully! Our team will get in touch shortly.")
      setFormData({ name: "", email: "", company: "", message: "" })
    }, 1200)
  }

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100/80 text-slate-900" id="corporate-training">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Programs Info */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-4">
              Training Programs
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">
              Corporate training programs tailored for <span className="text-secondary">workplace excellence</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed mb-8">
              We design and deliver interactive curriculum focused on building operational skills, understanding legal compliance updates, and fostering cross-functional leadership.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {programs.map((prog) => (
                <div
                  key={prog.title}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/70 hover:shadow-xl hover:shadow-slate-300/80 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary mb-1 flex items-center gap-1.5 leading-snug">{prog.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{prog.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5 flex">
            <div className="p-8 rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/80 w-full flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Need Expert Assistance?</h3>
                  <p className="text-xs text-slate-500">Book a personalized training demo for your team</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="pf-name" className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                    <input
                      id="pf-name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="pf-email" className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                    <input
                      id="pf-email"
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="pf-company" className="block text-xs font-semibold text-slate-600 mb-1.5">Company Name</label>
                    <input
                      id="pf-company"
                      type="text"
                      required
                      placeholder="Enter company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="pf-message" className="block text-xs font-semibold text-slate-600 mb-1.5">Training Details</label>
                    <textarea
                      id="pf-message"
                      required
                      rows={3}
                      placeholder="Describe your team's training requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2.5 pt-1 pb-1">
                    <input
                      id="pf-consent"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 text-secondary rounded border-slate-300 focus:ring-secondary accent-secondary cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="pf-consent" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                      I agree to the Terms of Service and Privacy Policy.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                    <>
                      <span>Request Training Demo</span>
                      <Send size={16} />
                    </>
                  )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

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
  const [formData, setFormData] = useState({ name: "", email: "", company: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.company) {
      toast.error("Please fill in all fields.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Demo request submitted successfully! Our team will get in touch shortly.")
      setFormData({ name: "", email: "", company: "" })
    }, 1200)
  }

  return (
    <section className="py-16 md:py-14 bg-white text-slate-900" id="corporate-training">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Programs Info */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Training Programs
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Corporate training programs tailored for <span className="text-secondary">workplace excellence</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed">
              We design and deliver interactive curriculum focused on building operational skills, understanding legal compliance updates, and fostering cross-functional leadership.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.map((prog) => (
                <div key={prog.title} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary text-sm sm:text-base leading-snug">{prog.title}</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{prog.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Need Expert Assistance?</h3>
                  <p className="text-xs text-slate-500">Book a personalized training demo for your team</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center font-semibold rounded-xl bg-secondary text-white hover:bg-secondary-dark transition-colors px-6 py-3.5 mt-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-md"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Book a Demo
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { motion } from "framer-motion"
import { Download, FileText, CheckCircle2 } from "lucide-react"
import { toast } from "react-hot-toast"

const programs = [
  "Leadership & Strategic Management Training",
  "Statutory Compliance & Labor Law Updates",
  "Diversity, Equity & Inclusion (DEI) Workshops",
  "Performance & OKR Goal Alignment Training",
  "Soft Skills, Communication & Sales Training",
  "Conflict Resolution & Team Building Seminars",
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
      toast.success("Brochure downloaded successfully!")
      window.open("/docs/company_profile.pdf", "_blank")
      setFormData({ name: "", email: "", company: "" })
    }, 1500)
  }

  return (
    <section className="py-16 md:py-24 bg-white text-slate-900" id="corporate-training">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Programs Info */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Training Programs
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Corporate training programs tailored for <span className="text-secondary">workplace excellence</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              We design and deliver interactive curriculum focused on building operational skills, understanding legal compliance updates, and fostering cross-functional leadership.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.map((prog) => (
                <li key={prog} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{prog}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Company Profile</h3>
                  <p className="text-xs text-slate-500">Download our compliance & training guide</p>
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
                    <span>Downloading...</span>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Company Profile
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

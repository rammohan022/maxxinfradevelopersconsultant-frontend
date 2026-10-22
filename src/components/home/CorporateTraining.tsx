'use client'

import { useState } from "react"
import Link from "next/link"
import { Container } from "@/components/ui"
import { motion } from "framer-motion"
import { Calendar, FileText, CheckCircle2, Send } from "lucide-react"
import { toast } from "react-hot-toast"
import { useCreateLeadMutation } from "@/services/lead"

const programs = [
  {
    title: "Leadership Development",
    desc: "Build confident leaders who can think strategically, inspire teams, and drive business results through effective leadership practices.",
  },
  {
    title: "Behavioural & Interpersonal Skills",
    desc: "Strengthen communication, collaboration, emotional intelligence, problem-solving, and workplace effectiveness through experiential learning.",
  },
  {
    title: "Sales & Customer Excellence",
    desc: "Equip sales teams with practical skills in consultative selling, negotiation, customer engagement, relationship building, and sales performance.",
  },
  {
    title: "Functional & Business Skills",
    desc: "Develop job-ready capabilities through practical training in Advanced Excel, Power BI, Finance for Non-Finance, and other business-critical skills.",
  },
  {
    title: "Manager Development & Growth Mindset",
    desc: "Enable managers to transition from individual contributors to effective people leaders while building accountability, adaptability, and a growth mindset.",
  },
  {
    title: "HR, Labour Compliance & Team Building",
    desc: "Build compliant, collaborative workplaces through HR and labour law training, workplace policies, and engaging offsite team-building experiences.",
  },
]

export default function CorporateTraining() {
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation()
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      toast.error("Please fill in all required fields.")
      return
    }

    try {
      await createLead({
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone || "Not provided",
        company: formData.company,
        subject: "Corporate Training Demo Request",
        message: formData.message,
        source: typeof window !== "undefined" ? window.location.pathname + "#corporate-training" : "/#corporate-training",
      }).unwrap()

      toast.success("Demo request submitted successfully! Our team will get in touch shortly.")
      setFormData({ name: "", email: "", phone: "", company: "", message: "" })
    } catch (err) {
      console.error("Training demo request failed:", err)
      toast.error("Failed to submit request. Please try again later.")
    }
  }

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100/80 text-primary" id="corporate-training">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Programs Info */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-4">
              Training Programs
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-3">
              Corporate Training programs that drive <span className="text-secondary">business performance</span>
            </h2>
            <div className="space-y-2 mb-8">
              <p className="text-xs sm:text-sm font-bold text-secondary tracking-wide">
                Building Skills. Strengthening Teams. Enabling Growth.
              </p>
              <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
                We deliver practical, engaging corporate training programs that enhance employee skills, develop leadership capabilities and improve workplace performance. Our approach combines functional, soft skills development, Competency development with effective talent management strategies to help organisations build stronger teams, improve productivity and achieve business goals. From employee development to workplace effectiveness, we help businesses create a culture of continuous learning and growth.
              </p>
              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-secondary-dark shadow-md hover:shadow-secondary/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Explore Training Programs
                </Link>
              </div>
            </div>

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
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/70 w-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary">Need Expert Assistance?</h3>
                  <p className="text-xs text-slate-500">Book a personalized training demo for your team</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="pf-name" className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    id="pf-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="pf-email" className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                  <input
                    id="pf-email"
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="pf-phone" className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                  <input
                    id="pf-phone"
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="pf-company" className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
                  <input
                    id="pf-company"
                    type="text"
                    required
                    placeholder="Enter company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="pf-message" className="block text-xs font-semibold text-slate-600 mb-1">Training Details</label>
                  <textarea
                    id="pf-message"
                    required
                    rows={3}
                    placeholder="Describe your team's training requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-secondary transition-colors resize-none"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Request Training Demo</span>
                        <Send size={15} />
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

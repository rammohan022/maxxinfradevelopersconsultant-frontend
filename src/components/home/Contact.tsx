'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import { ChevronDown, Send } from 'lucide-react'
import { useCreateLeadMutation } from '@/services/lead'
import toast from 'react-hot-toast'

const serviceCategories = [
  "HR Consulting & Advisory",
  "Talent Acquisition & Staffing",
  "Corporate Training & Leadership Development",
  "Payroll Management & Processing",
  "Labour Law & Statutory Compliance",
  "HRMS & Software Solutions (PeopleX)",
  "Executive Search",
  "Other Enquiries",
]

export default function Contact() {
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.subject) {
      toast.error("Please select a service category.")
      return
    }
    try {
      await createLead({
        ...form,
        source: typeof window !== "undefined" ? window.location.pathname : "",
      }).unwrap()
      toast.success("Enquiry submitted successfully! We'll get back to you soon.")
      setForm({ fullName: '', email: '', phoneNumber: '', subject: '', message: '' })
    } catch (err) {
      console.error('Submission error:', err)
      toast.error('Failed to submit enquiry. Please try again later.')
    }
  }

  return (
    <section className="relative bg-slate-50/70 py-14 md:py-16 overflow-hidden border-b border-slate-100/80" id="contact">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right hidden lg:block pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Contact <span className="text-secondary">Us</span>
          </h2>
        </div>

        {/* Compact Card */}
        <div className="max-w-5xl mx-auto grid items-stretch lg:grid-cols-12 rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
          {/* Left Column: Team / Professional Discussion Image */}
          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full w-full overflow-hidden bg-slate-900">
            <Image
              src="/img/home-contact.png"
              alt="People Consulting Team Discussion"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Form: Compact Height */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 p-6 sm:p-7 lg:p-8 bg-white relative flex flex-col justify-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-2 w-fit">
              Contact Form
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-primary tracking-tight mb-1.5">
              Discuss Your Requirements
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed font-normal">
              Tell us what your organisation needs, and our experts will help you explore the right HR, training, and people solutions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/10 placeholder:text-slate-400 font-normal text-xs sm:text-sm text-slate-800"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/10 placeholder:text-slate-400 font-normal text-xs sm:text-sm text-slate-800"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/10 placeholder:text-slate-400 font-normal text-xs sm:text-sm text-slate-800"
                />
              </div>

              {/* Service Dropdown */}
              <div className="relative">
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/10 text-xs sm:text-sm appearance-none cursor-pointer pr-10 font-normal ${
                    !form.subject ? 'text-slate-400' : 'text-slate-800 font-medium'
                  }`}
                >
                  <option value="" disabled>
                    Subject / Service Required
                  </option>
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat} className="text-slate-800">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Tell us about your requirements..."
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/10 placeholder:text-slate-400 font-normal text-xs sm:text-sm text-slate-800"
                />
              </div>
              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-secondary py-2.5 font-bold text-white text-xs sm:text-sm transition-colors hover:bg-secondary-dark shadow-md hover:shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 disabled:bg-slate-400"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Get An Expert</span>
                    <Send size={14} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "What recruitment services do you offer?",
    a: "We offer end-to-end recruitment solutions including Executive Search, Headhunting, High-Volume Staffing, and temporary placements across IT, Finance, Healthcare, Manufacturing, and Corporate Service sectors.",
  },
  {
    q: "How does the corporate training curriculum get customized?",
    a: "Our training advisors assess your specific organizational goals, compliance requirements, or leadership competency gaps first. Then, we design and deliver workshops online or on-site based on your schedule.",
  },
  {
    q: "Do you handle statutory compliance and payroll administration?",
    a: "Yes. We manage monthly payroll processes, statutory compliance checks, employee benefits advisory, and ensure strict alignment with current labor law guidelines.",
  },
  {
    q: "How can we start our partnership with People Consulting?",
    a: "You can book a free consultation directly through our website form, or connect with our advisors via WhatsApp/Phone call to discuss your recruitment or training needs.",
  },
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-14 bg-slate-50" id="faqs">
      <Container className="max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            FAQs
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Find answers to common questions about our search methodology, training modules, and compliance workflows.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-primary text-base sm:text-lg pr-4">{faq.q}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-50 text-slate-600 text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useGetFaqsQuery } from "@/services/faqs"

const fallbackFaqs = [
  {
    question: "What recruitment services do you offer?",
    answer: "We offer end-to-end recruitment solutions including Executive Search, Headhunting, High-Volume Staffing, and temporary placements across IT, Finance, Healthcare, Manufacturing, and Corporate Service sectors.",
  },
  {
    question: "How does the corporate training curriculum get customized?",
    answer: "Our training advisors assess your specific organizational goals, compliance requirements, or leadership competency gaps first. Then, we design and deliver workshops online or on-site based on your schedule.",
  },
  {
    question: "Do you handle statutory compliance and payroll administration?",
    answer: "Yes. We manage monthly payroll processes, statutory compliance checks, employee benefits advisory, and ensure strict alignment with current labor law guidelines.",
  },
  {
    question: "How can we start our partnership with People Consulting?",
    answer: "You can book a free consultation directly through our website form, or connect with our advisors via WhatsApp/Phone call to discuss your recruitment or training needs.",
  },
]

interface FAQsProps {
  className?: string;
  category?: string;
  tag?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
}

const defaultAboutFaqs = [
  {
    question: "What is the core vision and mission of People Consulting?",
    answer: "Our mission is to help organizations build agile, resilient, and forward-looking workplaces by integrating strategic talent solutions, advanced HR technology, and disciplined compliance execution.",
  },
  {
    question: "How long has People Consulting been delivering HR & compliance services?",
    answer: "With over a decade of dedicated industry expertise, we have partnered with hundreds of leading enterprises, mid-market businesses, and startups across India.",
  },
  {
    question: "What core practice areas does People Consulting specialize in?",
    answer: "We deliver end-to-end people solutions across five key pillars: Workforce Solutions & Headhunting, Strategic HR Advisory, Talent Development & Corporate Training, Labour Law Compliance, and HR Technology.",
  },
  {
    question: "Where are People Consulting’s corporate and branch offices located?",
    answer: "Our main corporate office is located in Faridabad (NCR) with a nationwide network of branch offices, compliance associates, and recruitment partners operating across PAN India.",
  },
];

export default function FAQs({
  className = "bg-white",
  category,
  tag,
  title,
  highlight,
  subtitle,
}: FAQsProps = {}) {
  const isAbout = category?.toLowerCase().includes("about");
  const { data: apiFaqs = [] } = useGetFaqsQuery(category ? { category } : undefined);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fallbackList = isAbout ? defaultAboutFaqs : fallbackFaqs;
  const displayFaqs = apiFaqs && apiFaqs.length > 0 ? apiFaqs : fallbackList;

  const displayTag = tag || (isAbout ? "About People Consulting" : "FAQs");
  const displayTitle = title || "Frequently Asked";
  const displayHighlight = highlight || "Questions";
  const displaySubtitle =
    subtitle ||
    (isAbout
      ? "Find answers to common questions about our heritage, expertise, organizational values, and consulting approach."
      : "Find answers to common questions about our search methodology, training modules, and compliance workflows.");

  return (
    <section className={`py-16 md:py-20 lg:py-24 border-b border-slate-200/80 ${className}`} id="faqs">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-3">
            {displayTag}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            {displayTitle} <span className="text-secondary">{displayHighlight}</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* Compact 2-Column FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-4.5 sm:gap-5 items-start">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={(faq as any).id || idx}
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-primary text-sm sm:text-base pr-3 leading-snug">
                    {faq.question || (faq as any).q}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-secondary" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer || (faq as any).a}
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

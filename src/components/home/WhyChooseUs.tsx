'use client'

import { Container } from "@/components/ui"
import { motion } from "framer-motion"

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-14 bg-white overflow-hidden" id="why-choose-us">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Most agencies fill positions.{' '}
            <span className="text-secondary">People Consulting builds high performance teams.</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            Traditional staffing agencies stop at delivering resumes. We optimize your entire recruitment operations, employee compliance, and team training workflows.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-200/50 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600">Traditional Agency</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">People Consulting Model</span>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="flex flex-col gap-3">
            {/* Card 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mt-1 flex-shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="text-sm sm:text-base text-slate-500 leading-snug">
                  Focuses on transactional placements to hit quarterly sales quotas.
                </span>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-primary/20 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                  Focuses on matching candidate capabilities with culture and strategy for long-term retention.
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mt-1 flex-shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="text-sm sm:text-base text-slate-500 leading-snug">
                  Relies on automated resume matching without validation of practical skills.
                </span>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-primary/20 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                  Conducts detailed screening and validation against custom requirements for client roles.
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mt-1 flex-shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="text-sm sm:text-base text-slate-500 leading-snug">
                  Disconnects once the candidate signs the offer letter, offering zero post-hire alignment.
                </span>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-primary/20 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                  Provides ongoing HR compliance advisory, training programs, and performance support.
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mt-1 flex-shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="text-sm sm:text-base text-slate-500 leading-snug">
                  Unpredictable billing and high fee percentages with minimal advisory value.
                </span>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-primary/20 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                  Transparent agreements and clear pricing linked directly to deliverables and placement success.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client';

import { useState } from 'react';
import { Container } from '@/components/ui';
import { motion } from 'framer-motion';
import { ChevronDown, Send, Phone, MapPin, ShieldCheck, Calendar } from 'lucide-react';
import { useCreateLeadMutation } from '@/services/lead';
import toast from 'react-hot-toast';

const propertyCategories = [
  "Verified Resell Plots (Him City / Samrat / Goyala / Surya Vihar)",
  "Sai Yash Residency Flat (2/3 BHK - Ayodhya Road)",
  "Eiffel Palm Vista Flat (2/3 BHK - Deva Road)",
  "Aravali Green City Plot (Badel, Barabanki)",
  "Goyala City Township Plot / Villa",
  "2 BHK / 3 BHK Modern Row House",
  "Luxury Duplex Villa",
  "Gated Society Residential Plot",
  "Independent Builder Floor",
  "Free Site Visit with Cab Facility",
  "Home Loan & Banking Consultation",
  "Other Property Inquiry",
];

export default function Contact() {
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: propertyCategories[0],
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.fullName || !form.phoneNumber) {
      toast.error("Please enter your name and contact number.");
      return;
    }
    try {
      await createLead({
        ...form,
        email: form.email || "lead@maxxinfradevelopersconsultant.com",
        source: typeof window !== "undefined" ? window.location.pathname : "Homepage Lead Form",
      }).unwrap();
      toast.success("Enquiry submitted successfully! Our consultant will call you shortly.");
      setForm({ fullName: '', email: '', phoneNumber: '', subject: propertyCategories[0], message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Failed to submit enquiry. Please call us directly at +91 79051 45968.');
    }
  };

  return (
    <section className="relative bg-slate-50 py-16 md:py-24 scroll-mt-20 overflow-hidden" id="contact">
      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Book Site Visit
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-2">
            Schedule Free Cab Site Inspection
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            Inspect multiple projects with our senior engineers. Complimentary cab pickup &amp; drop available across Lucknow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 grid md:grid-cols-12 gap-8 items-center">
          {/* Left Contact Info */}
          <div className="md:col-span-5 bg-primary text-white p-7 rounded-2xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
              Direct Desk
            </span>
            <h3 className="text-xl font-extrabold leading-snug">
              Have Questions? Talk to an Expert
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We provide transparent developer rates, zero brokerage, and immediate mutation assistance.
            </p>

            <div className="space-y-4 pt-2 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
                <span>G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow, UP</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-secondary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+917905145968" className="text-white hover:text-secondary font-bold block">
                    +91 79051 45968
                  </a>
                  <a href="tel:+916386100070" className="text-slate-300 hover:text-secondary font-bold block">
                    +91 63861 00070
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-secondary font-semibold">
              <ShieldCheck size={16} /> 100% Certified Clear Titles
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Mishra"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 79051 45968"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Property Type / Service</label>
                <div className="relative">
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-slate-800 appearance-none pr-8"
                  >
                    {propertyCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Special Requirements / Preferred Date</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for ready to move 2 BHK row house under 50 Lakhs. Need site visit this Sunday."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-md flex items-center justify-center gap-2"
              >
                <Send size={14} className="text-secondary" />
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry & Book Cab"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

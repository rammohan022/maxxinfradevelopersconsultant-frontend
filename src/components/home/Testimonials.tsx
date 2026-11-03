"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui";
import { useGetTestimonialsQuery } from "@/services/testimonial";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface TestimonialItem {
  id: string | number;
  clientName: string;
  clientRole?: string;
  avatarBg?: string;
  initials?: string;
  clientImage?: string;
  testimonialText: string;
  rating?: number;
  propertyType?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    clientName: "Rajesh & Sunita Srivastava",
    clientRole: "Deva Road, Lucknow",
    avatarBg: "bg-primary text-secondary",
    initials: "RS",
    testimonialText:
      "Buying our 2 BHK row house through Maxx Infra was completely stress-free. 100% clear registry papers, zero broker commission, and our SBI home loan was sanctioned in just 4 days. The construction quality is top-notch!",
    rating: 5,
    propertyType: "2 BHK Modern Row House",
  },
  {
    id: 2,
    clientName: "Vikram Singh Rathore",
    clientRole: "Goyala City Investor",
    avatarBg: "bg-secondary text-primary-dark",
    initials: "VR",
    testimonialText:
      "I purchased residential plots at the Goyala City township. Wide 40-foot boulevards, solar street lighting, and immediate Dakhil Kharij mutation. Capital appreciation has already surpassed my expectations.",
    rating: 5,
    propertyType: "Goyala City Township Plots",
  },
  {
    id: 3,
    clientName: "Dr. Anand Tiwari",
    clientRole: "Sultanpur Road, Lucknow",
    avatarBg: "bg-slate-800 text-white",
    initials: "AT",
    testimonialText:
      "Superb architectural design and grand double-height living. The Maxx Infra team arranged a free cab pickup for my family to inspect multiple sites and handed over ready possession right on schedule.",
    rating: 5,
    propertyType: "4 BHK Royal Duplex Villa",
  },
  {
    id: 4,
    clientName: "Pooja Verma",
    clientRole: "Gomti Nagar Extension",
    avatarBg: "bg-emerald-600 text-white",
    initials: "PV",
    testimonialText:
      "Completely transparent pricing with zero hidden costs. Excellent modular kitchen, elevator access, and a safe, peaceful gated society. Maxx Infra is truly a trustworthy real estate developer.",
    rating: 5,
    propertyType: "Independent Builder Floor",
  },
];

export default function Testimonials() {
  const { data: apiTestimonials } = useGetTestimonialsQuery();
  const [current, setCurrent] = useState(0);

  const testimonials = apiTestimonials && apiTestimonials.length > 0
    ? apiTestimonials.map((t, idx) => ({
        id: t.id || idx,
        clientName: t.clientName,
        clientRole: t.clientRole || "Homeowner",
        avatarBg: "bg-primary text-secondary",
        initials: t.clientName.slice(0, 2).toUpperCase(),
        clientImage: t.clientImage ? getImageUrl(t.clientImage) : "",
        testimonialText: t.testimonialText,
        rating: t.rating || 5,
        propertyType: t.caseType || "Verified Property",
      }))
    : defaultTestimonials;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Verified Experiences
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-2">
            What Our Happy Homeowners Say
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2">
            Over 500 families have found their dream homes with Maxx Infra Developers &amp; Consultant.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative">
          <Quote className="text-secondary/20 absolute top-8 right-8 w-24 h-24 pointer-events-none" />

          <div className="relative z-10">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-6 text-amber-500">
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-base md:text-xl text-slate-800 font-medium leading-relaxed italic mb-8">
              &ldquo;{item.testimonialText}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shadow ${item.avatarBg}`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.clientName}</h4>
                  <p className="text-xs text-slate-500">{item.clientRole} • <span className="text-secondary font-semibold">{item.propertyType}</span></p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-primary hover:border-primary transition flex items-center justify-center shadow-sm"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl bg-primary text-white hover:bg-primary-dark transition flex items-center justify-center shadow-sm"
                  aria-label="Next review"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

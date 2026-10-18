"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
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
  caseType?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    clientName: "Aarav Mehta",
    clientRole: "Head of HR, Sciero",
    avatarBg: "bg-indigo-600 text-white",
    initials: "AM",
    clientImage: "",
    testimonialText:
      "People Consulting cut our hiring & onboarding turnaround time significantly. The accuracy, responsiveness, and peace of mind are genuinely game-changing for our team.",
    rating: 5,
    caseType: "IT Staffing & HR",
  },
  {
    id: 2,
    clientName: "Sara Kapoor",
    clientRole: "Finance Director, Quantico",
    avatarBg: "bg-emerald-600 text-white",
    initials: "SK",
    clientImage: "",
    testimonialText:
      "The compliance and payroll engine alone pays for itself. We've never missed a statutory deadline since partnering, and audits are no longer something we dread.",
    rating: 5,
    caseType: "Payroll & Compliance",
  },
  {
    id: 3,
    clientName: "Rohan Nair",
    clientRole: "COO, ZennovaTech",
    avatarBg: "bg-[#0D2137] text-white",
    initials: "RN",
    clientImage: "",
    testimonialText:
      "Finally, an HR and training partner our employees actually enjoy working with. Clean, fast, and intuitive — our learning curves and team retention have never been smoother.",
    rating: 5,
    caseType: "Corporate Training",
  },
  {
    id: 4,
    clientName: "Priya Sharma",
    clientRole: "VP - People & Culture, Apex Corp",
    avatarBg: "bg-amber-600 text-white",
    initials: "PS",
    clientImage: "",
    testimonialText:
      "The corporate training and leadership workshops designed by People Consulting transformed our managerial effectiveness and cross-functional collaboration across multiple locations.",
    rating: 5,
    caseType: "Leadership Development",
  },
];

export default function Testimonials() {
  const { data: apiTestimonials = [], isLoading, isError } = useGetTestimonialsQuery();
  const [index, setIndex] = useState(0);

  const testimonials: TestimonialItem[] =
    !isError && apiTestimonials && apiTestimonials.length > 0
      ? apiTestimonials
      : defaultTestimonials;

  useEffect(() => {
    setIndex(0);
  }, [testimonials]);

  if (isLoading) return null;

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const visibleCount = getVisibleCount();

  const next = () => {
    if (index + visibleCount >= testimonials.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index - 1 < 0) {
      setIndex(Math.max(0, testimonials.length - visibleCount));
    } else {
      setIndex(index - 1);
    }
  };

  const visibleTestimonials = testimonials.slice(index, index + visibleCount);
  const totalSlides = Math.max(1, testimonials.length - visibleCount + 1);

  const getInitials = (name: string) => {
    if (!name) return "PC";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-100/80 overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-3.5">
            Loved by Teams
          </span>

          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            Trusted for HR, Recruitment &amp; <span className="text-secondary">Compliance Solutions</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From fast-growing startups to established organisations, businesses choose People Consulting for reliable HR Consulting, labour law compliance, HR compliance, recruitment consulting services, and talent management services. We focus on understanding business needs and delivering practical, people-centric solutions that strengthen teams, simplify HR processes and support long-term growth.
          </p>
        </motion.div>

        {/* Slider Grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 relative">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((item, i) => {
                const authorInitials = item.initials || getInitials(item.clientName || "");
                const roleText = item.clientRole || item.caseType || "Client Partner";

                return (
                  <motion.div
                    key={`${index}-${item.id || i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="group flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(13,33,55,0.08)] hover:border-secondary/30 transition-all duration-300 relative hover:-translate-y-1"
                  >
                    <div>
                      {/* Quote Icon & Stars */}
                      <div className="flex items-center justify-between mb-3">
                        <Quote className="w-6 h-6 text-secondary/70 stroke-[2] fill-secondary/10" />
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(item.rating || 5)].map((_, starIdx) => (
                            <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                        {item.testimonialText}
                      </p>
                    </div>

                    {/* Client Info Section */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      {item.clientImage ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm bg-slate-100">
                          <Image
                            src={getImageUrl(item.clientImage)}
                            alt={item.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full ${
                            item.avatarBg || "bg-primary text-white"
                          } font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}
                        >
                          {authorInitials}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-primary truncate">
                          {item.clientName}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate">
                          {roleText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Controls: Arrows + Dots */}
          {testimonials.length > visibleCount && (
            <div className="mt-10 flex flex-col items-center gap-5">
              {/* Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary text-primary transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary text-primary transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {[...Array(totalSlides)].map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === dotIdx ? "bg-secondary w-6" : "bg-slate-300 hover:bg-slate-400 w-2"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

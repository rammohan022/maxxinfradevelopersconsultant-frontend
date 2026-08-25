"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui";
import { useGetTestimonialsQuery } from "@/services/testimonial";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/utils/imageUtils";

const defaultTestimonials = [
  {
    id: 1,
    clientName: "Rakesh Sharma",
    clientImage: "",
    testimonialText: "People Consulting helped us hire 10+ software engineers in record time. Their support and responsiveness were outstanding throughout the entire recruitment process.",
    rating: 5,
    caseType: "IT Staffing",
  },
  {
    id: 2,
    clientName: "Meera Nair",
    clientImage: "",
    testimonialText: "The corporate training programs conducted by People Consulting have greatly improved our team's productivity and alignment. Highly recommended partner for HR solutions.",
    rating: 5,
    caseType: "Corporate Training",
  },
  {
    id: 3,
    clientName: "Vikram Malhotra",
    clientImage: "",
    testimonialText: "Outstanding executive search service! They understood our leadership requirements perfectly and delivered top-tier candidates within a few weeks.",
    rating: 5,
    caseType: "Executive Search",
  },
  {
    id: 4,
    clientName: "Priya Sen",
    clientImage: "",
    testimonialText: "Their payroll and compliance outsourcing services have freed up our internal teams to focus on core growth. Very professional and highly recommended.",
    rating: 5,
    caseType: "Payroll Management",
  }
];

export default function Testimonials() {
  const { data: apiTestimonials = [], isLoading, isError } = useGetTestimonialsQuery();
  const [index, setIndex] = useState(0);

  const testimonials = (!isError && apiTestimonials && apiTestimonials.length > 0) ? apiTestimonials : defaultTestimonials;

  useEffect(() => {
    setIndex(0);
  }, [testimonials]);

  if (isLoading) return null;

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
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
      setIndex(testimonials.length - visibleCount);
    } else {
      setIndex(index - 1);
    }
  };

  const visibleTestimonials = testimonials.slice(index, index + visibleCount);

  // Calculate slide pages for dots
  const totalSlides = testimonials.length - visibleCount + 1;

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100/80 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -z-0" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest">
            Testimonials
          </span>

          <h2 className="mt-4 sm:mt-6 text-xl md:text-2xl font-bold text-primary tracking-tight">
            Our Clients Trust Us for Reliable HR Solutions
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500 relative min-h-[280px]">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((item, i) => (
                <motion.div
                  key={`${index}-${item.id || i}`}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col bg-white shadow-xl rounded-2xl p-5 sm:p-6 hover:shadow-primary/10 transition-all duration-300 relative"
                >
                  <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 text-primary/10 -z-0" />
                  
                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 relative z-10 italic mb-6">
                      &quot;{item.testimonialText}&quot;
                    </p>
                  </div>

                  {/* Client Info Section with Avatar */}
                  <div className="pt-4 border-t border-gray-100 relative z-10 flex items-center gap-4">
                    {/* Avatar Image */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-50 shadow-sm bg-gray-100">
                      <Image
                        src={getImageUrl(item.clientImage) || "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80"}
                        alt={item.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Meta */}
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < (item.rating || 5) ? 'text-yellow-400' : 'text-gray-200'}`}>
                            ★
                          </span>
                        ))}
                      </div>

                      <h4 className="text-sm font-semibold text-primary mb-1 leading-tight">
                        {item.clientName}
                      </h4>
                      <p className="text-primary text-xs font-semibold tracking-wider mt-0.5">
                        {item.caseType}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls: Arrows + Dots */}
          {testimonials.length > visibleCount && (
            <div className="mt-12 flex flex-col items-center gap-6">
              {/* Arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white text-navy transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white text-navy transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>

              {/* Dots */}
              <div className="flex gap-2">
                {[...Array(totalSlides)].map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setIndex(dotIdx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === dotIdx ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
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

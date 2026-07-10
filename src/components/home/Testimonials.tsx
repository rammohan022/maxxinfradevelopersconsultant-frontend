"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui";
import { useGetTestimonialsQuery } from "@/services/testimonial";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function Testimonials() {
  const { data: testimonials = [], isLoading, isError } = useGetTestimonialsQuery();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [testimonials]);

  if (isLoading || isError || testimonials.length === 0) return null;

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : 2;
    }
    return 2;
  };

  const visibleCount = getVisibleCount();

  const next = () => {
    if (index + visibleCount >= testimonials.length) {
      setIndex(0);
    } else {
      setIndex(index + (testimonials.length > 1 ? visibleCount : 1));
    }
  };

  const prev = () => {
    if (index - visibleCount < 0) {
      setIndex(Math.max(0, testimonials.length - (testimonials.length > 1 ? visibleCount : 1)));
    } else {
      setIndex(index - visibleCount);
    }
  };

  const visibleTestimonials = testimonials.slice(index, index + visibleCount);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-100 overflow-hidden relative">
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
          <span className="text-sm uppercase tracking-widest text-primary font-bold border-b-2 border-primary pb-1">
            Testimonials
          </span>

          <h2 className="mt-4 sm:mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-navy font-serif-heading">
            Our Clients Trust Us for Reliable HR Solutions
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 transition-all duration-500 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((item, i) => (
                <motion.div
                  key={`${index}-${item.id || i}`}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-primary/10 transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-auto sm:w-40 lg:w-48 flex-shrink-0 bg-gray-200 overflow-hidden group">
                    <Image
                      src={getImageUrl(item.clientImage) || "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80"}
                      alt={item.clientName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent sm:hidden" />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 bg-white flex flex-col justify-between flex-1 relative">
                    <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 text-primary/10 -z-0" />
                    <p className="text-base leading-relaxed text-gray-700 line-clamp-4 relative z-10 font-medium italic">
                      &quot;{item.testimonialText}&quot;
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-100 relative z-10">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < (item.rating || 5) ? 'text-yellow-400' : 'text-gray-200'}`}>
                            ★
                          </span>
                        ))}
                      </div>

                      <h4 className="text-lg font-bold text-navy font-serif-heading">
                        {item.clientName}
                      </h4>
                      <p className="text-primary text-sm font-semibold uppercase tracking-wider mt-1">
                        {item.caseType}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Arrows */}
          {testimonials.length > visibleCount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 mt-12"
            >
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white text-navy transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white text-navy transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}

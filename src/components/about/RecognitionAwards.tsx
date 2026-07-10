"use client";

import Image from "next/image";
import { Container } from "@/components/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const awards = [
  {
    title: "IFLR1000",
    subtitle: "Notable Firm 2024",
    image:
      "/img/award-iflr1000.png",
  },
  {
    title: "Asian Legal Business",
    subtitle: "India Law Awards",
    image:
      "/img/award-alb.png",
  },
  {
    title: "RSG Consulting",
    subtitle: "Top Tier Firm",
    image:
      "/img/award-rsg.png",
  },
  {
    title: "Benchmark Litigation",
    subtitle: "Asia Pacific 2024",
    image:
      "/img/award-benchmark.png",
  },
  {
    title: "Legal 500 Asia Pacific",
    subtitle: "Recommended Firm",
    image:
      "/img/award-legal500.png",
  },
  {
    title: "Who's Who Legal",
    subtitle: "Corporate & M&A",
    image:
      "/img/award-wwl.png",
  },
];

const RecognitionAwards = () => {
  return (
    <section
      id="recognition-awards"
      className="py-16 md:py-20 lg:py-24 bg-gray-50 overflow-hidden"
    >
      <Container>
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
            Recognition
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy font-serif-heading mb-6">
            Awards & Accolades
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has been recognized by leading legal
            publications and industry bodies.
          </p>
        </motion.div>

        {/* ================= SLIDER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="awards-swiper pb-12" // Padding for pagination dots
          >
            {awards.map((award, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full text-center group">
                  <div className="h-24 flex items-center justify-center mb-6 relative">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={160}
                      height={80}
                      className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <h3 className="text-base font-bold text-navy font-serif-heading group-hover:text-primary transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 font-medium">
                    {award.subtitle}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </section>
  );
};

export default RecognitionAwards;

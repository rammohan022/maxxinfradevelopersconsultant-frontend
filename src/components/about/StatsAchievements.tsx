"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  GraduationCap,
  Users,
  Target,
  MessageSquareText,
  Sparkles,
  Compass,
  ClipboardList,
  Workflow,
  MessagesSquare,
  ShieldCheck,
  Zap,
  TrendingUp,
  Network,
  Heart,
  UserPlus,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  category: "leadership" | "org" | "advisory";
  icon: any;
}

const stats: StatItem[] = [
  {
    value: 50000,
    suffix: "+",
    label: "Hours of Learning Interventions",
    category: "leadership",
    icon: GraduationCap,
  },
  {
    value: 50,
    suffix: "+",
    label: "Leadership Development Interventions",
    category: "leadership",
    icon: Users,
  },
  {
    value: 30,
    suffix: "+",
    label: "High Potential Interventions",
    category: "leadership",
    icon: Target,
  },
  {
    value: 400,
    suffix: "+",
    label: "Hours of Training & Coaching",
    description: "200 Leaders Coached",
    category: "leadership",
    icon: MessagesSquare,
  },
  {
    value: 20,
    suffix: "+",
    label: "Succession Planning Interventions",
    category: "leadership",
    icon: Workflow,
  },
  {
    value: 40,
    suffix: "+",
    label: "OE Interventions",
    description: "Including D&I Initiatives",
    category: "org",
    icon: Sparkles,
  },
  {
    value: 30,
    suffix: "+",
    label: "Values Mission and Values Formulation and Cascade",
    category: "org",
    icon: Compass,
  },
  {
    value: 20,
    suffix: "+",
    label: "Competency Models",
    category: "org",
    icon: ClipboardList,
  },
  {
    value: 50,
    suffix: "+",
    label: "Culture Transformation Interventions",
    category: "org",
    icon: Zap,
  },
  {
    value: 25,
    suffix: "+",
    label: "Org Design Interventions",
    category: "org",
    icon: Network,
  },
  {
    value: 45,
    suffix: "+",
    label: "Architecting Performance Management Interventions",
    category: "org",
    icon: TrendingUp,
  },
  {
    value: 40,
    suffix: "+",
    label: "HR Advisory Assignments",
    category: "advisory",
    icon: ShieldCheck,
  },
  {
    value: 30,
    suffix: "+",
    label: "Employee Engagement Interventions",
    category: "advisory",
    icon: Heart,
  },
  {
    value: 20,
    suffix: "+",
    label: "Improving Talent Acquisition Interventions",
    category: "advisory",
    icon: UserPlus,
  },
  {
    value: 50,
    suffix: "+",
    label: "Multi Rater/360 Feedback Interventions",
    category: "advisory",
    icon: MessageSquareText,
  },
];

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsAchievements = () => {
  return (
    <section id="stats-achievements" className="py-16 md:py-20 bg-slate-50 relative overflow-hidden border-t border-b border-slate-100">
      {/* Decorative blurry blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-secondary tracking-widest border-l-4 border-secondary pl-3 inline-block mb-3">
            Track Record
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Some Statistics
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Our measurable impact and extensive experience in delivering strategic HR, leadership development, and organizational growth solutions.
          </p>
        </div>

        {/* Slider Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 sm:px-12"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-stats",
              prevEl: ".swiper-button-prev-stats",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".swiper-pagination-custom-stats",
            }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="w-full"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <SwiperSlide key={stat.label} className="!h-auto flex flex-col">
                  <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 shadow-sm relative overflow-hidden group min-h-[170px] h-full w-full">
                    {/* Top hover accent bar */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Icon Badge */}
                      <div className="w-9 h-9 bg-primary/5 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                      </div>

                      {/* Count Counter */}
                      <div className="text-xl sm:text-2xl font-extrabold text-primary mb-1.5 tracking-tight">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </div>

                      {/* Label */}
                      <h3 className="text-primary text-xs sm:text-sm font-semibold leading-snug transition-colors duration-300">
                        {stat.label}
                      </h3>
                    </div>

                    {/* Subtext Description */}
                    {stat.description && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                        <span className="text-[10px] text-slate-500 font-medium leading-tight">
                          {stat.description}
                        </span>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="swiper-pagination swiper-pagination-custom-stats !static mt-8 flex justify-center items-center" />

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-stats absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:pointer-events-none">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="swiper-button-next-stats absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:pointer-events-none">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsAchievements;

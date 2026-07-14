"use client";

import { useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import { useRef } from "react";
import {
  CalendarDays,
  Building2,
  Briefcase,
  Factory,
} from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: any;
}

const stats: StatItem[] = [
  {
    label: "Years of Experience",
    value: 15,
    suffix: "+",
    icon: CalendarDays,
  },
  {
    label: "Offices Across India",
    value: 8,
    icon: Building2,
  },
  {
    label: "Consulting Services",
    value: 12,
    suffix: "+",
    icon: Briefcase,
  },
  {
    label: "Industries Served",
    value: 20,
    suffix: "+",
    icon: Factory,
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
      {count}
      {suffix}
    </span>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut", type: "spring", bounce: 0.4 } },
}

const StatsAchievements = () => {
  return (
    <section id="stats-achievements" className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-b border-slate-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] -z-0" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 shadow-md">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>

                <div className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3 drop-shadow-sm">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                <div className="text-slate-500 text-sm sm:text-base font-semibold uppercase tracking-wider group-hover:text-primary transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsAchievements;

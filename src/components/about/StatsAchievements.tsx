"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
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
} from "lucide-react";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const StatsAchievements = () => {
  const [activeTab, setActiveTab] = useState<"all" | "leadership" | "org" | "advisory">("all");

  const filteredStats = activeTab === "all"
    ? stats
    : stats.filter((stat) => stat.category === activeTab);

  return (
    <section id="stats-achievements" className="py-16 md:py-20 bg-slate-50 relative overflow-hidden border-t border-b border-slate-100">
      {/* Decorative blurry blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest border-l-4 border-secondary pl-3 inline-block mb-3">
            Track Record
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Some Statistics
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Our measurable impact and extensive experience in delivering strategic HR, leadership development, and organizational growth solutions.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: "all", label: "All Statistics" },
            { id: "leadership", label: "Leadership & Talent" },
            { id: "org", label: "Org & Culture" },
            { id: "advisory", label: "Advisory & Acquisition" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-secondary border-secondary text-white shadow-md shadow-secondary/20 scale-105"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  key={stat.label}
                  className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 shadow-sm relative overflow-hidden group min-h-[170px]"
                >
                  {/* Top hover accent bar */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Icon Badge */}
                    <div className="w-9 h-9 bg-primary/5 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    </div>

                    {/* Count Counter */}
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Label */}
                    <h3 className="text-slate-800 text-xs sm:text-sm font-semibold leading-snug group-hover:text-primary transition-colors duration-300">
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsAchievements;

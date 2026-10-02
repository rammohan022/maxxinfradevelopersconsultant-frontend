"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import {
  Users,
  Target,
  Network,
  GraduationCap,
  UserCheck,
  Handshake,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const strengths = [
  {
    title: "Client-Centric Approach",
    description:
      "We take time to understand your business, people, and challenges to create practical solutions aligned with your organisation's goals.",
    icon: Users,
    iconBg: "bg-orange-50 text-secondary border border-orange-100",
    barColor: "bg-secondary",
  },
  {
    title: "Practical, Business-Focused Solutions",
    description:
      "Our approach goes beyond theory, delivering actionable HR and learning solutions that can be applied directly in the workplace.",
    icon: Target,
    iconBg: "bg-primary/10 text-primary border border-primary/20",
    barColor: "bg-primary",
  },
  {
    title: "End-to-End People Expertise",
    description:
      "From talent acquisition and HR consulting to training, compliance, and team development, we support organisations across the people journey.",
    icon: Network,
    iconBg: "bg-primary/10 text-primary border border-primary/20",
    barColor: "bg-secondary",
  },
  {
    title: "Customised Learning & Development",
    description:
      "We design engaging programs around your specific needs—from leadership and behavioural skills to sales, functional, and managerial development.",
    icon: GraduationCap,
    iconBg: "bg-primary/10 text-primary border border-primary/20",
    barColor: "bg-primary",
  },
  {
    title: "Experienced & Responsive Team",
    description:
      "We work closely with our clients, bringing hands-on expertise, clear communication, and responsive support to every engagement.",
    icon: UserCheck,
    iconBg: "bg-primary/10 text-primary border border-primary/20",
    barColor: "bg-secondary",
  },
  {
    title: "Long-Term Partnership",
    description:
      "We believe in building lasting relationships—not just delivering one-time solutions. Our focus is on creating sustainable value for your people and business.",
    icon: Handshake,
    iconBg: "bg-orange-50 text-secondary border border-orange-100",
    barColor: "bg-secondary",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose" className="py-16 md:py-20 bg-slate-50/70 relative overflow-hidden border-b border-slate-100/80">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 pointer-events-none -z-0">
        <div className="w-24 h-24 bg-secondary rounded-br-[80px] opacity-90" />
        <div className="w-10 h-10 bg-blue-100/80 rounded-full absolute top-12 left-16" />
      </div>

      <div className="absolute bottom-0 right-0 pointer-events-none -z-0">
        <div className="w-28 h-28 bg-blue-100/70 rounded-tl-[90px]" />
        <div className="w-8 h-8 bg-secondary rounded-full absolute bottom-6 right-8" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-secondary/40" />
            <span className="px-3.5 py-0.5 rounded-full border border-secondary/25 bg-secondary/5 text-secondary text-xs font-bold tracking-wide">
              Our Strengths
            </span>
            <span className="w-5 h-[1px] bg-secondary/40" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            The People Consulting <span className="text-secondary">Difference</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl mx-auto leading-relaxed">
            We bring together HR expertise, practical thinking, and people-first solutions to help
            organisations build stronger teams and achieve better business outcomes.
          </p>
        </motion.div>

        {/* ================= GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {strengths.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(13,33,55,0.08)] hover:border-secondary/30 transition-all duration-300 flex flex-col items-start group"
              >
                {/* Rounded Icon */}
                <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-300`}>
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-primary mb-1.5 leading-snug group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>

                {/* Accent line under title */}
                <div className={`w-7 h-0.5 ${item.barColor} rounded-full mb-3 group-hover:w-10 transition-all duration-300`} />

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;

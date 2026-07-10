"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import {
  ShieldCheck,
  Users,
  Award,
  Handshake,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ValuesPhilosophy = () => {
  const values = [
    {
      title: "Integrity & Ethics",
      description: "At People Consulting, integrity is the foundation of our practice. We conduct every matter with honesty, transparency, and strict adherence to professional ethics.",
      icon: ShieldCheck,
    },
    {
      title: "Diversity & Inclusion",
      description: "We reflect the diversity of the society we serve, actively promoting an inclusive work environment where different experiences strengthen our ability to solve complex legal problems.",
      icon: Users,
    },
    {
      title: "Excellence & Growth",
      description: "We are committed to delivering exceptional legal work, focusing on continuous learning, accountability, and forward-looking strategies in an ever-changing legal landscape.",
      icon: Award,
    },
  ];

  return (
    <section id="values-philosophy" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl relative order-2 lg:order-1 group"
          >
            <Image
              src="/img/values-philosophy.png"
              alt="Diverse legal team collaboration in modern law office"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          </motion.div>

          {/* ================= CONTENT ================= */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="mb-10 sm:mb-12"
            >
              <div className="text-primary text-sm font-bold uppercase tracking-widest mb-4 border-l-4 border-primary pl-3">
                Our Values
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy font-serif-heading leading-tight">
                Built on Integrity, Excellence, and Trust
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6 sm:space-y-8"
            >
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start group p-4 sm:p-5 rounded-xl border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 -mx-4 sm:-mx-5"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center flex-shrink-0 mr-5 sm:mr-6 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-navy font-serif-heading mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ValuesPhilosophy;

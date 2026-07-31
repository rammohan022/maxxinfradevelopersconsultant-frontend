"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import { ShieldCheck, Users, Award } from "lucide-react";

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
      description: "At People Consulting, integrity is the foundation of our operations. We conduct every search and advisory mandate with honesty, transparency, and strict adherence to professional ethics.",
      icon: ShieldCheck,
    },
    {
      title: "Diversity & Inclusion",
      description: "We reflect the diversity of the businesses we serve, actively promoting inclusive recruitment methodologies to source the best minds and build balanced teams.",
      icon: Users,
    },
    {
      title: "Excellence & Growth",
      description: "We are committed to delivering exceptional HR solutions, focusing on continuous learning, operational accountability, and strategic alignment in an ever-changing regulatory and talent landscape.",
      icon: Award,
    },
  ];

  return (
    <section id="values-philosophy" className="py-16 md:py-14 bg-slate-50 overflow-hidden">
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
              alt="Diverse HR consulting team collaboration in modern office"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
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
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
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
              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    variants={itemVariants}
                    key={item.title}
                    className="flex gap-4 sm:gap-6 items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
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

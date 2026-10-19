"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";

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
      letter: "S",
      title: "Strategic Partnership",
      description:
        "Working as a trusted extension of our clients' business and HR teams",
    },
    {
      letter: "P",
      title: "Pragmatic Innovation",
      description:
        "Using practical ideas, technology and new approaches to solve real business problems",
    },
    {
      letter: "I",
      title: "Integrity",
      description:
        "Transparency, confidentiality, ethics and doing the right thing",
    },
    {
      letter: "C",
      title: "Continuous Learning",
      description:
        "Staying ahead of evolving talent practices, technology, regulations and business needs",
    },
    {
      letter: "E",
      title: "Excellence",
      description:
        "Commitment to quality, accuracy, speed and measurable outcomes",
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
              alt="Diverse HR professionals collaborating on recruitment and labour law compliance"
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
              className="mb-8 sm:mb-10"
            >
              <div className="text-primary text-sm font-bold tracking-widest mb-3 border-l-4 border-primary pl-3">
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
              className="space-y-4 sm:space-y-5"
            >
              {values.map((item) => (
                <motion.div
                  variants={itemVariants}
                  key={item.letter}
                  className="flex gap-4 sm:gap-5 items-start group"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-secondary/10 text-secondary font-black text-xl sm:text-2xl flex items-center justify-center flex-shrink-0 border border-secondary/20 shadow-xs group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    {item.letter}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1 flex items-center gap-1.5 text-sm sm:text-base group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ValuesPhilosophy;

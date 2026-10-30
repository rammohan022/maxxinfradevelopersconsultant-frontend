"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ValuesPhilosophy = () => {
  const values = [
    {
      letter: "T",
      title: "Transparency First",
      description:
        "No hidden charges, no vague land documentation. Every agreement is clear, registered, and verifiable.",
    },
    {
      letter: "R",
      title: "Reliability & Safety",
      description:
        "Every project is pre-cleared for titles, government land records, and local authority guidelines.",
    },
    {
      letter: "U",
      title: "Uncompromising Quality",
      description:
        "Engineered with branded steel, cement, certified electricals, and aesthetic civil architecture.",
    },
    {
      letter: "S",
      title: "Sustainable Living",
      description:
        "Wide tree-lined boulevards, solar street lighting, underground sewage, and green family parks.",
    },
    {
      letter: "T",
      title: "Timely Delivery",
      description:
        "We honor our handover commitments, ensuring rapid possession and immediate registry for buyers.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Visual */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Core Principles
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 mb-4 leading-snug">
              Built on the Foundation of <span className="text-secondary">&ldquo;TRUST&rdquo;</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
              Our architectural philosophy centers around crafting spaces where families thrive and real estate investments appreciate year after year.
            </p>

            <div className="relative h-64 md:h-72 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="/img/hero/real_estate_hero.jpg"
                alt="Values Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Values Cards */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              {values.map((v, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-secondary/30 transition shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-secondary font-black text-lg flex items-center justify-center shrink-0">
                    {v.letter}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{v.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{v.description}</p>
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

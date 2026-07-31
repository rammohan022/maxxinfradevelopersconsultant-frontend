"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import {
  Users,
  Handshake,
  Briefcase,
  Lightbulb,
  Scale,
  Globe,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WhyChooseUs = () => {
  const strengths = [
    {
      title: "Client-Centric Approach",
      description:
        "We prioritize understanding our clients’ business objectives and industry dynamics to deliver tailored legal strategies that create long-term value.",
      icon: Users,
    },
    {
      title: "Partner-Led Service",
      description:
        "Senior partners directly oversee matters, ensuring strategic focus, accountability, and consistent access to experienced legal leadership.",
      icon: Handshake,
    },
    {
      title: "Deep Sector Expertise",
      description:
        "Our lawyers bring specialized knowledge across technology, finance, healthcare, infrastructure, and manufacturing sectors.",
      icon: Briefcase,
    },
    {
      title: "Practical Solutions",
      description:
        "We provide commercially viable legal advice that balances regulatory rigor with real-world business practicality.",
      icon: Lightbulb,
    },
    {
      title: "Dispute Resolution Excellence",
      description:
        "Our litigation and arbitration teams handle complex, high-stakes disputes with a strong track record of success.",
      icon: Scale,
    },
    {
      title: "Global Network",
      description:
        "Through strategic alliances with international firms, we support cross-border transactions and multi-jurisdictional matters.",
      icon: Globe,
    },
  ];

  return (
    <section id="why-choose" className="py-20 bg-gray-50">
      <Container>
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-red-700 text-sm font-semibold uppercase tracking-wider mb-4">
            Our Strengths
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">
            Why Leading Businesses Choose Us
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed">
            We combine legal expertise with business intelligence to deliver
            exceptional value and results for our clients.
          </p>
        </motion.div>

        {/* ================= GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {strengths.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-red-700/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-red-700" strokeWidth={1.8} />
                </div>

                <h3 className="font-semibold text-primary mb-1 flex items-center gap-1.5">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
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

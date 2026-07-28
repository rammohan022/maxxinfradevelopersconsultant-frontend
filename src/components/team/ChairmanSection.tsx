"use client";

import Image from "next/image";
import { Briefcase, MapPin } from "lucide-react";
import { Container } from "@/components/ui";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const ChairmanSection = () => {
  return (
    <>
      <section className="bg-gray-50 py-16 md:py-20 lg:py-14">
        <Container>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16 text-center lg:text-left"
          >
            <h2 className="mb-4 font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
              Leadership
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto lg:mx-0 rounded-full" />
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Chairman */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 block border border-transparent hover:border-primary/10">
              <div className="relative h-80 sm:h-96 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/rajesh-k-mehta.png"
                  alt="Rajesh K. Mehta - Chairman"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-2xl font-bold text-primary transition-colors">
                  Rajesh K. Mehta
                </h3>
                <p className="mb-4 text-sm font-semibold text-primary uppercase tracking-wider">
                  Chairman &amp; Founding Partner
                </p>

                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Over 40 years of distinguished practice in corporate law and
                  international arbitration. Former President of the Bar Council
                  of India.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={16} className="text-primary/70" />
                    Corporate Law
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={16} className="text-primary/70" />
                    Mumbai
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Managing Partner */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 block border border-transparent hover:border-primary/10">
              <div className="relative h-80 sm:h-96 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/priya-sharma.png"
                  alt="Priya Sharma - Managing Partner"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-2xl font-bold text-primary transition-colors">
                  Priya Sharma
                </h3>
                <p className="mb-4 text-sm font-semibold text-primary uppercase tracking-wider">
                  Managing Partner
                </p>

                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Leading expert in mergers &amp; acquisitions with 30+ years
                  experience. Advises Fortune 500 companies on cross-border
                  transactions.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={16} className="text-primary/70" />
                    M&amp;A, Private Equity
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={16} className="text-primary/70" />
                    Delhi
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Managing Partner – Litigation */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 block border border-transparent hover:border-primary/10">
              <div className="relative h-80 sm:h-96 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/vikram-desai.png"
                  alt="Vikram Desai - Managing Partner Litigation"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-2xl font-bold text-primary transition-colors">
                  Vikram Desai
                </h3>
                <p className="mb-4 text-sm font-semibold text-primary uppercase tracking-wider">
                  Managing Partner – Litigation
                </p>

                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Renowned litigator with Supreme Court practice spanning 28 years.
                  Specializes in constitutional and commercial disputes.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={16} className="text-primary/70" />
                    Litigation, Arbitration
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={16} className="text-primary/70" />
                    Delhi
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-14">
        <Container>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16 text-center lg:text-left"
          >
            <h2 className="mb-4 font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
              Senior Partners
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto lg:mx-0 rounded-full" />
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Card 1 */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 block">
              <div className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/anil-kumar.png"
                  alt="Anil Kumar - Senior Partner"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-xl font-bold text-primary transition-colors">
                  Anil Kumar
                </h3>
                <p className="mb-3 text-xs font-semibold text-primary uppercase tracking-wider">
                  Senior Partner
                </p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  Tax &amp; regulatory specialist with 25 years expertise in GST
                  and international taxation.
                </p>

                <div className="space-y-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={14} className="text-primary/70" />
                    Tax Law
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={14} className="text-primary/70" />
                    Mumbai
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 block">
              <div className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/meera-iyer.png"
                  alt="Meera Iyer - Senior Partner"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-xl font-bold text-primary transition-colors">
                  Meera Iyer
                </h3>
                <p className="mb-3 text-xs font-semibold text-primary uppercase tracking-wider">
                  Senior Partner
                </p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  Intellectual property expert advising technology and
                  pharmaceutical companies globally.
                </p>

                <div className="space-y-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={14} className="text-primary/70" />
                    IP &amp; Technology
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={14} className="text-primary/70" />
                    Bangalore
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 block">
              <div className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/sanjay-reddy.png"
                  alt="Sanjay Reddy - Senior Partner"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-xl font-bold text-primary transition-colors">
                  Sanjay Reddy
                </h3>
                <p className="mb-3 text-xs font-semibold text-primary uppercase tracking-wider">
                  Senior Partner
                </p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  Real estate and infrastructure law specialist with extensive
                  project finance experience.
                </p>

                <div className="space-y-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={14} className="text-primary/70" />
                    Real Estate
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={14} className="text-primary/70" />
                    Mumbai
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={itemVariants} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 block">
              <div className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden">
                <Image
                  src="/img/kavita-nair.png"
                  alt="Kavita Nair - Senior Partner"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 relative bg-white">
                <h3 className="mb-1 font-serif-heading text-xl font-bold text-primary transition-colors">
                  Kavita Nair
                </h3>
                <p className="mb-3 text-xs font-semibold text-primary uppercase tracking-wider">
                  Senior Partner
                </p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  Banking and finance law expert with focus on structured finance
                  and debt capital markets.
                </p>

                <div className="space-y-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <Briefcase size={14} className="text-primary/70" />
                    Banking &amp; Finance
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                    <MapPin size={14} className="text-primary/70" />
                    Delhi
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ChairmanSection;

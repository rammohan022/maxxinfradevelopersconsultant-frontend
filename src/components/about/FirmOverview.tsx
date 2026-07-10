"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { motion, Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const FirmOverview = () => {
  return (
    <section id="firm-overview" className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-primary text-sm font-bold uppercase tracking-widest mb-4 border-l-4 border-primary pl-3">
              Who We Are
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy font-serif-heading mb-6 leading-tight">
              Leading Corporate Law Firm Serving India&apos;s Business Landscape
            </h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                <strong>Equity and Legal Solutions</strong> is a full-service law firm dedicated to providing strategic, solution-oriented, and result-driven legal services across India. With a strong professional network and multidisciplinary expertise, we cater to individuals, businesses, and corporate entities across diverse sectors.
              </p>

              <p>
                We advise domestic as well as international clients on establishing, structuring, and expanding their operations in India. Our firm offers comprehensive support in regulatory compliance, investment structuring, and commercial transactions, enabling clients to navigate India’s evolving legal and business environment with clarity and confidence.
              </p>

              {/* <p>
                Our corporate practice handles complex and high-value transactions including mergers and acquisitions, foreign direct investment (FDI), private equity transactions, joint ventures, and strategic commercial arrangements. We combine technical legal precision with practical commercial understanding to safeguard our clients’ interests.
              </p> */}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/contact-us"
                className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Contact Us
              </Link>

              <Link
                href="/practice-areas"
                className="text-primary font-bold hover:text-navy transition-colors flex items-center group uppercase tracking-wider text-sm"
              >
                <span>Our Practice Areas</span>
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl relative group">
              <Image
                src="/img/about-us.jpg"
                alt="Professional corporate lawyers in modern office"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-60" />
            </div>

            {/* EXPERIENCE BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-navy text-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs border border-white/10 backdrop-blur-sm"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-1 sm:mb-2 font-serif-heading text-primary">25+</div>
              <div className="text-gray-200 text-sm sm:text-base font-medium leading-tight">
                Years of Legal Excellence
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FirmOverview;

"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { motion } from "framer-motion"

const FirmOverview = () => {
  return (
    <section id="firm-overview" className="py-16 md:py-20 lg:py-14 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-primary text-sm font-bold tracking-widest mb-4 border-l-4 border-primary pl-3">
              Who We Are
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">
              Leading HR & Recruitment Consulting Firm Serving Indian Businesses
            </h2>

            <div className="space-y-6 text-slate-600 text-xs md:text-sm leading-relaxed mb-8">
              <p>
                <strong>People Consulting</strong> is a premier human resources and talent acquisition agency dedicated to providing strategic, compliance-aligned, and result-driven workforce solutions across India. With a strong professional network and cross-disciplinary expertise, we cater to startups, scaling mid-market businesses, and large enterprise entities.
              </p>

              <p>
                We advise domestic and international clients on building high-performance teams, streamlining payroll operations, and navigating statutory labor compliance guidelines with confidence and structural clarity.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/contact-us"
                className="bg-secondary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-secondary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Contact Us
              </Link>

              <Link
                href="/services"
                className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center group tracking-wider text-sm"
              >
                <span>Explore Our Services</span>
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
                alt="Professional human resource team in modern office"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />
            </div>

            {/* EXPERIENCE BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-white border border-slate-200 text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs backdrop-blur-sm"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-1 sm:mb-2 text-primary">15+</div>
              <div className="text-slate-600 text-sm sm:text-base font-medium leading-tight">
                Years of Consulting Excellence
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FirmOverview;

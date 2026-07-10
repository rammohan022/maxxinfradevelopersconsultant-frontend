'use client'

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"
import { getImageUrl } from "@/lib/utils/imageUtils"

const bulletsLeft = [
  "Corporate Advisory and Compliance Management",
  "Mergers and Acquisitions Support",
  "Foreign Direct Investment and FEMA Compliance",
  "Private Equity and Venture Capital Transactions",
]

const bulletsRight = [
  "Joint Ventures and Strategic Arrangements",
  "Corporate Restructuring and Insolvency Matters",
  "Commercial Contracts and Documentation",
  "Litigation and Dispute Resolution",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function AboutUs() {
  return (
    <section className="py-6 md:py-8 lg:py-14 bg-white overflow-hidden" id="about">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-3 sm:gap-4 relative"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="space-y-3 sm:space-y-4">
              <motion.div variants={imageVariants} className="aspect-[4/5] rounded-2xl bg-navy/80 overflow-hidden relative shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
                  alt="Law firm"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
              <motion.div variants={imageVariants} className="aspect-[4/3] rounded-2xl bg-navy/80 overflow-hidden relative shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&q=80"
                  alt="Legal consultation"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12">
              <motion.div variants={imageVariants} className="aspect-[4/3] rounded-2xl bg-navy/80 overflow-hidden relative shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
                  alt="Court"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
              <motion.div variants={imageVariants} className="aspect-[4/5] rounded-2xl bg-navy/80 overflow-hidden relative shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&q=80"
                  alt="Lawyers"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 border-l-4 border-primary pl-3">
              About Us
            </span>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy font-serif-heading mb-6 leading-tight">
              Structured Legal Advisory, Every Step of the Process
            </h2>

            <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
              <strong>Equity and Legal Solutions</strong> is a full-service law firm providing strategic and solution-oriented legal services across India. With a multidisciplinary approach and strong professional network, the firm advises individuals, businesses, and corporate entities across diverse sectors.
            </p>

            <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
              The firm assists domestic and international clients in establishing, structuring, and expanding operations in India. Our services include regulatory compliance, investment structuring, commercial transactions, and comprehensive dispute resolution support tailored to the client’s specific requirements.
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10"
            >
              <ul className="space-y-3">
                {bulletsLeft.map((b) => (
                  <motion.li variants={itemVariants} key={b} className="flex text-sm items-center gap-3 text-gray-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {b}
                  </motion.li>
                ))}
              </ul>

              <ul className="space-y-3">
                {bulletsRight.map((b) => (
                  <motion.li variants={itemVariants} key={b} className="flex text-sm items-center gap-3 text-gray-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

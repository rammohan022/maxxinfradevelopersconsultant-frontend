"use client";

import Image from "next/image"
import { Container } from "@/components/ui"
import { useGetMembersQuery } from "@/services/member"
import { motion, Variants } from "framer-motion"
import { getImageUrl } from "@/lib/utils/imageUtils"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function Attorneys() {
  const { data: members = [], isLoading, isError } = useGetMembersQuery();

  if (isLoading || isError || members.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-14 bg-gray-50/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            Our Team
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Together We Achieve, Together We Succeed
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {(members || []).map((m) => (
            <motion.div
              variants={itemVariants}
              key={m.id}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[3/4] bg-navy/5 overflow-hidden relative">
                <Image
                  src={getImageUrl(m.profileImage) || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"}
                  alt={m.fullName}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 text-center relative bg-white">
                <h3 className="text-xl font-bold text-primary mb-1 transition-colors">
                  {m.fullName}
                </h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider">{m.designation}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

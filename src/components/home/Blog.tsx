"use client";

import Link from "next/link"
import { Container } from "@/components/ui"
import { useGetBlogsQuery } from "@/services/blog"
import { motion, Variants } from "framer-motion"
import BlogCard from "@/components/blog/BlogCard"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Blog() {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  if (isLoading || isError || blogs.length === 0) return null;

  // Show only last 3 blogs
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100/80">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-3">
            Our Insights
          </span>

          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Insights and Updates on HR and Talent Acquisition
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {latestBlogs.map((post) => (
            <motion.div variants={itemVariants} key={post.id}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-xs sm:text-sm tracking-wider shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Insights
          </Link>
        </div>
      </Container>
    </section>
  )
}

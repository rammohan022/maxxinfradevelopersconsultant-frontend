"use client";

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { useGetBlogsQuery } from "@/services/blog"
import { motion, Variants } from "framer-motion"
import { ArrowRight, CalendarDays } from "lucide-react"
import { getImageUrl } from "@/lib/utils/imageUtils"

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
  const latestBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  return (
    <section className="py-6 md:py-8 lg:py-14 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Latest Blog
          </span>

          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-navy font-serif-heading leading-tight">
            Insights and Updates from Legal Matters and Developments
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestBlogs.map((post) => (
            <motion.article
              variants={itemVariants}
              key={post.id}
              className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10 transition-all duration-300 h-full flex flex-col group transform hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-navy/5 overflow-hidden relative">
                <Image
                  src={getImageUrl(post.blogImage) || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-navy uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-primary" />
                  {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
                  By Admin
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-navy font-serif-heading mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blog/${post.slug || post.id}`}>
                    {post.title}
                  </Link>
                </h3>

                <div
                  className="text-gray-600 mb-6 line-clamp-3 text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + "..." }}
                />
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href={`/blog/${post.slug || post.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-navy transition-colors text-sm uppercase tracking-wider">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

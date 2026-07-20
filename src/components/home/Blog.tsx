"use client";

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { useGetBlogsQuery } from "@/services/blog"
import { useGetAdminProfileQuery } from "@/services/auth"
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
  const { data: adminProfile } = useGetAdminProfileQuery();

  if (isLoading || isError || blogs.length === 0) return null;

  const authorName = adminProfile?.name || "People Consulting";

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

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Insights and Updates on HR and Talent Acquisition
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
              className="w-full h-[400px] perspective-1000 group cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* FRONT SIDE (Full Image + Overlay + Icon + Title) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col backface-hidden shadow-md group-hover:pointer-events-none">
                  {/* Background Image */}
                  <Image
                    src={getImageUrl(post.blogImage) || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 z-0 transition-opacity duration-300 group-hover:bg-slate-950/70" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-primary uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>

                  {/* Centered Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    {/* Yellow Icon */}
                    <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center mb-6 text-secondary bg-white/5 backdrop-blur-sm">
                      <CalendarDays className="w-8 h-8" />
                    </div>
                    {/* White Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* BACK SIDE (White Card + Description + Button) */}
                <div className="absolute inset-0 w-full h-full bg-white text-navy rounded-2xl p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 shadow-lg border border-slate-100">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4 pb-3 border-b border-slate-100">
                      <span>By {authorName}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <div
                      className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-[5] overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: post.content.replace(/<[^>]*>?/gm, '').substring(0, 180) + "..." }}
                    />
                  </div>
                  <div className="pt-4">
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 text-sm uppercase tracking-wider shadow-md hover:-translate-y-0.5"
                    >
                      Click Here
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All
          </Link>
        </div>
      </Container>
    </section>
  )
}

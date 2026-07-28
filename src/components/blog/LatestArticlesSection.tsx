"use client";

import { CalendarDays, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Image from "next/image";
import Link from "next/link";
import { useGetBlogsQuery } from "@/services/blog";
import { useGetAdminProfileQuery } from "@/services/auth";
import { motion } from "framer-motion";

const LatestArticlesSection = () => {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();
  const { data: adminProfile } = useGetAdminProfileQuery();

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 font-medium">
        Loading articles...
      </div>
    );
  }

  if (isError || blogs.length === 0) return null;

  const authorName = adminProfile?.name || "People Consulting";

  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-block text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Articles & Insights
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Latest Publications
          </h2>
        </div>

        {/* Blogs Grid with 3D Flip Card UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-[400px] perspective-1000 group cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col backface-hidden shadow-md group-hover:pointer-events-none">
                  {/* Background Image */}
                  <Image
                    src={
                      getImageUrl(post.blogImage) ||
                      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* Dark Overlay for Text Contrast */}
                  <div className="absolute inset-0 bg-slate-950/60 z-0 transition-opacity duration-300 group-hover:bg-slate-950/70" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-primary uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  {/* Centered Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    {/* Yellow Icon Circle */}
                    <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center mb-6 text-secondary bg-white/5 backdrop-blur-sm">
                      <CalendarDays className="w-8 h-8" />
                    </div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full bg-white text-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xl border border-slate-100">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4 pb-3 border-b border-slate-100">
                      <span>By {authorName}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <div
                      className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-[5] overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.content
                            .replace(/<[^>]*>?/gm, "")
                            .substring(0, 180) + "...",
                      }}
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
        </div>
      </Container>
    </section>
  );
};

export default LatestArticlesSection;

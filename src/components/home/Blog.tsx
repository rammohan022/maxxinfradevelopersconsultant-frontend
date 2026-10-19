"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";
import { useGetBlogsQuery } from "@/services/blog";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Blog() {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  if (isLoading || isError || blogs.length === 0) return null;

  // Show latest blogs in slider (sorted newest first)
  const latestBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  const enableLoop = latestBlogs.length > 3;

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100/80">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-3">
            Our Insights
          </span>

          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Insights and Updates on HR and Talent Acquisition
          </h2>
        </motion.div>

        {/* Blog Slider Container */}
        <div className="relative group/blog-slider px-1 sm:px-2">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-blog",
              prevEl: ".swiper-button-prev-blog",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".swiper-pagination-blog",
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={enableLoop}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.15, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="blog-swiper w-full pb-8 !overflow-hidden"
          >
            {latestBlogs.map((post) => (
              <SwiperSlide key={post.id} className="!h-auto flex flex-col pb-1">
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          {latestBlogs.length > 1 && (
            <>
              <button
                aria-label="Previous Blog"
                className="swiper-button-prev-blog absolute -left-2 sm:-left-4 top-[42%] -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="Next Blog"
                className="swiper-button-next-blog absolute -right-2 sm:-right-4 top-[42%] -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          <div className="swiper-pagination-blog flex justify-center items-center mt-4" />
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-xs sm:text-sm tracking-wider shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Insights
          </Link>
        </div>
      </Container>
    </section>
  );
}

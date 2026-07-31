"use client";

import { Container } from "@/components/ui";
import { useGetBlogsQuery } from "@/services/blog";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

const LatestArticlesSection = () => {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 font-medium">
        Loading articles...
      </div>
    );
  }

  if (isError || blogs.length === 0) return null;

  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-block text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Articles & Insights
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Latest Publications
          </h2>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestArticlesSection;

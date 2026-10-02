"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui";
import { useGetBlogsQuery } from "@/services/blog";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";

const LatestArticlesSection = () => {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    if (!blogs || blogs.length === 0) return ["All"];
    
    const uniqueCategories = new Set<string>();
    blogs.forEach((post: any) => {
      const categoryName =
        typeof post.category === "object" && post.category?.name
          ? post.category.name
          : typeof post.category === "string"
          ? post.category
          : "Compliance";
      
      if (categoryName) uniqueCategories.add(categoryName);
    });
    
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") return blogs;
    
    return blogs.filter((post: any) => {
      const categoryName =
        typeof post.category === "object" && post.category?.name
          ? post.category.name
          : typeof post.category === "string"
          ? post.category
          : "Compliance";
          
      return categoryName === activeCategory;
    });
  }, [blogs, activeCategory]);

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
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="inline-block text-primary font-bold text-xs tracking-widest mb-2">
            Articles & Insights
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Latest Publications
          </h2>
        </div>
        
        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-secondary/50 hover:text-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Blogs Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((post: any) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

export default LatestArticlesSection;

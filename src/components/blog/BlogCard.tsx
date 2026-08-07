"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Tag, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    blogImage?: string;
    category?: { name: string } | string;
    overview?: string;
    content?: string;
    createdAt: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const dateFormatted = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "23/07/2026";

  const categoryName =
    typeof post.category === "object" && post.category?.name
      ? post.category.name
      : typeof post.category === "string"
      ? post.category
      : "Compliance";

  // Strip HTML tags for clean excerpt
  const rawExcerpt = post.overview || post.content || "";
  const cleanExcerpt = rawExcerpt.replace(/<[^>]*>?/gm, "");

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group h-full">
      {/* Top Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden block"
      >
        <Image
          src={
            getImageUrl(post.blogImage) ||
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
          }
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Meta Info Row (Date & Tag) */}
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
              <span>{dateFormatted}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[140px]">{categoryName}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h3 
              className="font-semibold text-primary mb-1 group-hover:text-secondary transition-colors line-clamp-2 leading-snug"
              title={post.title}
            >
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-6">
            {cleanExcerpt ||
              "Stay informed with our latest research, legal updates, and strategic workforce insights."}
          </p>
        </div>

        {/* Footer Explore Link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-secondary hover:text-primary font-bold text-sm transition-all duration-300 group/btn"
          >
            <span>Explore</span>
            <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

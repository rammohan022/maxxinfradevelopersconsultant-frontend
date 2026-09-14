"use client";

import Image from "next/image";
import Link from "next/link";
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
  return (
    <article className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group h-full">
      {/* Top Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden block"
      >
        <Image
          src={
            getImageUrl(post.blogImage) ||
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
          }
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block mb-4">
          <h3
            className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-secondary transition-colors line-clamp-3 leading-snug"
            title={post.title}
          >
            {post.title}
          </h3>
        </Link>

        {/* Read More Button */}
        <div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded transition-all duration-200 shadow-sm hover:shadow"
          >
            READ MORE
          </Link>
        </div>
      </div>
    </article>
  );
}

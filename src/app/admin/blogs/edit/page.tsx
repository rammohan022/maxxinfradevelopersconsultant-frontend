"use client";

import { useSearchParams } from "next/navigation";
import { useGetBlogByIdQuery } from "@/services/blog";
import BlogForm from "../components/BlogForm";

export default function EditBlogPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id as string, {
    skip: !id,
  });

  if (isLoading) return <div className="p-6 text-center text-slate-500">Loading blog details...</div>;
  if (!id || isError || !blog) return <div className="p-6 text-center text-red-500">Error loading blog post.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-navy">
        Edit Blog Post
      </h1>

      <BlogForm initialData={blog} isEdit />
    </div>
  );
}

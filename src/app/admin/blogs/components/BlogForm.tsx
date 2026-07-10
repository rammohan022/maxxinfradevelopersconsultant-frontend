"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCreateBlogMutation, useUpdateBlogMutation } from "@/services/blog";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({
  initialData,
  isEdit = false,
}: BlogFormProps) {
  const router = useRouter();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [status, setStatus] = useState(initialData?.status || "Draft");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [displayOrder, setDisplayOrder] = useState<number>(initialData?.displayOrder || 0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialData?.blogImage || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setContent(initialData.content || "");
      setStatus(initialData.status || "Draft");
      setSlug(initialData.slug || "");
      setDisplayOrder(initialData.displayOrder || 0);
      setPreview(initialData.blogImage || "");
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("displayOrder", displayOrder.toString());

    if (imageFile) {
      formData.append("blogImage", imageFile);
    }

    try {
      if (isEdit && initialData?.id) {
        await updateBlog({ id: initialData.id, data: formData }).unwrap();
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(formData).unwrap();
        toast.success("Blog created successfully!");
      }
      router.push("/admin/blogs");
    } catch (err) {
      console.error("Failed to save blog:", err);
      toast.error("Failed to save blog. Please check your input.");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blog Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug (URL part)
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. navigating-mergers-and-acquisitions"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Blog Image
            </label>
            <div className="flex items-center gap-4">
              {preview && (
                <div className="relative w-16 h-16 rounded overflow-hidden border">
                  <Image
                    src={getImageUrl(preview)}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary outline-none text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Blog Content
          </label>
          <div className="bg-white min-h-[300px]">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="bg-white h-[250px] mb-12"
            />
          </div>
        </div>

        {/* Status */}
        <div className="w-48">
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : (isEdit ? "Update Blog" : "Create Blog")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="border px-6 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCreateBlogMutation, useUpdateBlogMutation } from "@/services/blog";
import { useGetBlogCategoriesQuery } from "@/services/blogCategory";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { Sparkles } from "lucide-react";
import AiModal, { AiToolType } from "@/components/ai/AiModal";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export default function BlogForm({
  initialData,
  isEdit = false,
}: BlogFormProps) {
  const router = useRouter();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const { data: categories = [] } = useGetBlogCategoriesQuery();

  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [status, setStatus] = useState(initialData?.status || "Draft");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [displayOrder, setDisplayOrder] = useState<number>(initialData?.displayOrder || 0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialData?.blogImage || "");
  
  // Meta fields
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");

  const [aiModal, setAiModal] = useState<{
    isOpen: boolean;
    tool: AiToolType;
    input: string;
  }>({ isOpen: false, tool: "blog", input: "" });

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setContent(initialData.content || "");
      setStatus(initialData.status || "Draft");
      setSlug(initialData.slug || "");
      setDisplayOrder(initialData.displayOrder || 0);
      setPreview(initialData.blogImage || "");
      setMetaTitle(initialData.metaTitle || "");
      setMetaDescription(initialData.metaDescription || "");
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
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);

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
    } catch (err: any) {
      console.error("Submit error:", err);
      const errorMessage =
        err?.data?.message ||
        (Array.isArray(err?.data?.message) ? err.data.message.join(", ") : null) ||
        err?.message ||
        "Failed to save blog. Please check your input.";
      toast.error(errorMessage);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border space-y-4">
      {/* Top AI Action Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-purple-900">
          <Sparkles className="text-purple-600 animate-bounce" size={18} />
          <div>
            <p className="text-xs font-bold">AI Content Assistant 🤖</p>
            <p className="text-[11px] text-purple-700">Generate blog posts, meta descriptions, or fix grammar instantly</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAiModal({ isOpen: true, tool: "blog", input: title || "HR Consulting Trends" })}
            className="flex items-center gap-1.5 bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700 shadow transition"
          >
            <Sparkles size={14} /> AI Blog Generator
          </button>
          <button
            type="button"
            onClick={() => setAiModal({ isOpen: true, tool: "grammar", input: content })}
            className="flex items-center gap-1.5 bg-white text-purple-700 border border-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-100 transition"
          >
            Proofread & Fix Grammar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Title and Slug */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Blog Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                const val = e.target.value;
                setTitle(val);
                if (!isEdit) {
                  setSlug(slugify(val));
                }
              }}
              placeholder="Enter blog title"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Slug (URL part)
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. navigating-mergers-and-acquisitions"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
            />
          </div>
        </div>

        {/* Category, Display Order, Blog Image */}
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Blog Image
            </label>
            <div className="flex items-center gap-4">
              {preview && (
                <div className="relative w-10 h-10 rounded overflow-hidden border flex-shrink-0">
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
                className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-xs file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
              />
            </div>
          </div>
        </div>

        {/* SEO Metadata Section */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-bold text-slate-800 mb-3">SEO Search Settings</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Enter meta title for search engines"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter meta description for search result snippet"
                rows={1}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Blog Content
          </label>
          <div className="bg-white min-h-[320px]">
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
          <label className="block text-sm font-semibold mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Submit Actions */}
        <div className="flex gap-2 border-t pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark text-sm font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : (isEdit ? "Update" : "Create")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* AI Assistant Modal */}
      <AiModal
        isOpen={aiModal.isOpen}
        onClose={() => setAiModal((prev) => ({ ...prev, isOpen: false }))}
        initialTool={aiModal.tool}
        initialInput={aiModal.input}
        onApply={(result) => {
          if (aiModal.tool === "blog" && result?.title) {
            setTitle(result.title);
            setSlug(slugify(result.title));
            if (result.excerpt) setMetaDescription(result.excerpt);
            if (result.content) setContent(result.content);
            toast.success("AI generated blog content applied!");
          } else if (typeof result === "string") {
            if (aiModal.tool === "grammar" || aiModal.tool === "rewrite") {
              setContent(result);
              toast.success("Content updated with AI result!");
            } else if (aiModal.tool === "metaDescription") {
              setMetaDescription(result);
              toast.success("Meta Description updated!");
            }
          }
        }}
      />
    </div>
  );
}

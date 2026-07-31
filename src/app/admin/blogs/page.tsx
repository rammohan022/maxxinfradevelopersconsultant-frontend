"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useGetBlogsQuery, useDeleteBlogMutation } from "@/services/blog";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";

export default function BlogListPage() {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [search, setSearch] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const filteredBlogs = (blogs || []).filter((blog) =>
    (blog.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (blog.category || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async () => {
    try {
      await deleteBlog(deleteModal.id).unwrap();
      toast.success("Blog post deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentBlogs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete blog post.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading blogs...</div>;
  }

  if (isError) {
    return (
      <div className="p-3 text-center text-red-500">
        Error loading blogs. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Blog Posts Management
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Manage your legal insights and news articles</p>
        </div>

        <div className="flex gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search blogs..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Link
            href="/admin/blogs/create"
            className="flex items-center font-medium gap-2 bg-secondary text-white px-3 py-2 rounded-lg hover:bg-secondary-dark transition text-sm"
          >
            <Plus size={16} />
            Add Blog
          </Link>
        </div>
      </div>

      {/* Table Card - RESPONSIVE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left whitespace-nowrap">Title</th>
                <th className="px-3 py-2 text-left whitespace-nowrap">Category</th>
                <th className="px-3 py-2 text-left whitespace-nowrap">Date</th>
                <th className="px-3 py-2 text-left whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                currentBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t hover:bg-slate-50 transition align-top">
                    <td className="px-3 py-2 font-medium text-[rgb(13_33_55)]">{blog.title}</td>
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{blog.category}</td>
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${blog.status === "Published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/blogs/edit?id=${blog.id}`}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: blog.id, name: blog.title })}
                          className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalResults={filteredBlogs.length}
          indexOfFirst={indexOfFirstItem}
          indexOfLast={indexOfLastItem}
        />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        itemName={deleteModal.name}
      />
    </div>
  );
}

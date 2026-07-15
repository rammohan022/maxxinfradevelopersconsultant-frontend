"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Loader2, FolderOpen } from "lucide-react";
import {
  useGetServiceCategoriesQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} from "@/services/serviceCategory";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export default function ServiceCategoriesListPage() {
  const { data: categories = [], isLoading, isError } = useGetServiceCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateServiceCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateServiceCategoryMutation();
  const [deleteCategory] = useDeleteServiceCategoryMutation();

  const [search, setSearch] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals / Forms State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });
  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    id: "",
    name: "",
    slug: "",
  });

  const filteredCategories = (categories || []).filter((item) =>
    (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.slug || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const openCreateModal = () => {
    setFormModal({
      isOpen: true,
      mode: "create",
      id: "",
      name: "",
      slug: "",
    });
  };

  const openEditModal = (item: any) => {
    setFormModal({
      isOpen: true,
      mode: "edit",
      id: item.id,
      name: item.name,
      slug: item.slug,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModal.name.trim() || !formModal.slug.trim()) {
      toast.error("Name and Slug are required.");
      return;
    }

    try {
      if (formModal.mode === "create") {
        await createCategory({
          name: formModal.name,
          slug: formModal.slug,
        }).unwrap();
        toast.success("Service category created successfully!");
      } else {
        await updateCategory({
          id: formModal.id,
          data: {
            name: formModal.name,
            slug: formModal.slug,
          },
        }).unwrap();
        toast.success("Service category updated successfully!");
      }
      setFormModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err: any) {
      console.error("Form submit failed:", err);
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteModal.id).unwrap();
      toast.success("Service category deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentCategories.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete service category.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading service categories...</div>;
  }

  if (isError) {
    return (
      <div className="p-3 text-center text-red-500">
        Error loading service categories. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Service Categories</h1>
          <p className="text-gray-500 text-sm">
            Manage Service Categories used in dropdown menu selections on the Services creation form
          </p>
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
              placeholder="Search categories..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-secondary text-white px-3 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-medium"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Category Name</th>
                <th className="p-4 text-left whitespace-nowrap">Slug</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-10 text-gray-400">
                    No service categories found.
                  </td>
                </tr>
              ) : (
                currentCategories.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 font-semibold text-[rgb(13_33_55)]">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="text-slate-400 w-4 h-4" />
                        {item.name}
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-xs">{item.slug}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id, name: item.name })}
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
          totalResults={filteredCategories.length}
          indexOfFirst={indexOfFirstItem}
          indexOfLast={indexOfLastItem}
        />
      </div>

      {/* Form Dialog Modal */}
      {formModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-bold text-lg text-slate-800">
                {formModal.mode === "create" ? "Add Service Category" : "Edit Service Category"}
              </h3>
              <button
                onClick={() => setFormModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. HR Services"
                  value={formModal.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormModal((prev) => ({
                      ...prev,
                      name,
                      slug: prev.mode === "create" ? slugify(name) : prev.slug,
                    }));
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. hr-services"
                  value={formModal.slug}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 border-t pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setFormModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-semibold disabled:opacity-75"
                >
                  {(isCreating || isUpdating) && <Loader2 size={16} className="animate-spin" />}
                  {formModal.mode === "create" ? "Create" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Service Category"
        itemName={deleteModal.name}
      />
    </div>
  );
}

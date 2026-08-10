"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, FolderOpen } from "lucide-react";
import AdminPagination from "@/app/admin/components/AdminPagination";
import DeleteModal from "@/app/admin/components/DeleteModal";
import toast from "react-hot-toast";
import {
  useGetHrResourceCategoriesQuery,
  useCreateHrResourceCategoryMutation,
  useUpdateHrResourceCategoryMutation,
  useDeleteHrResourceCategoryMutation,
  HrResourceCategory
} from "@/services/hrResourceCategories";

export default function AdminHrResourceCategoriesPage() {
  const { data: categories = [], isLoading } = useGetHrResourceCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateHrResourceCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateHrResourceCategoryMutation();
  const [deleteCategory] = useDeleteHrResourceCategoryMutation();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    id: string;
    name: string;
  }>({
    isOpen: false,
    mode: "create",
    id: "",
    name: "",
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  // Filter
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const openCreateModal = () => {
    setFormModal({ isOpen: true, mode: "create", id: "", name: "" });
  };

  const openEditModal = (cat: HrResourceCategory) => {
    setFormModal({
      isOpen: true,
      mode: "edit",
      id: cat.id,
      name: cat.name,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModal.name) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (formModal.mode === "create") {
        await createCategory({ name: formModal.name }).unwrap();
        toast.success("Category created successfully");
      } else {
        await updateCategory({
          id: formModal.id,
          data: { name: formModal.name },
        }).unwrap();
        toast.success("Category updated successfully");
      }
      setFormModal({ isOpen: false, mode: "create", id: "", name: "" });
    } catch (error) {
      toast.error("Failed to save category");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteModal.id).unwrap();
      toast.success("Category deleted successfully");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="flex-1 bg-slate-50">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2.5 rounded-lg w-full sm:w-72 outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-sm text-slate-950 shadow-sm"
        />
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-secondary-dark transition shadow-sm font-semibold text-sm w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-slate-200">Name</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-secondary mx-auto" />
                  </td>
                </tr>
              ) : currentCategories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-slate-500 flex flex-col items-center">
                    <FolderOpen className="w-10 h-10 mb-2 text-slate-300" />
                    No categories found.
                  </td>
                </tr>
              ) : (
                currentCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-medium text-slate-900">{cat.name}</td>
                    <td className="p-4 text-center w-32">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Category"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: cat.id, name: cat.name })}
                          className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete Category"
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
      </div>

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalResults={filteredCategories.length}
        indexOfFirst={indexOfFirstItem}
        indexOfLast={indexOfLastItem}
      />


      {/* Form Modal */}
      {formModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-bold text-lg text-slate-800">
                {formModal.mode === "create" ? "Add Category" : "Edit Category"}
              </h3>
              <button
                onClick={() => setFormModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Compliance"
                  value={formModal.name}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950"
                  required
                />
              </div>

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
                  {formModal.mode === "create" ? "Add Category" : "Save Changes"}
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
        title="Delete Category"
        itemName={deleteModal.name}
      />
    </div>
  );
}

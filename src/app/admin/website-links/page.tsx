"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Loader2, Globe, ExternalLink } from "lucide-react";
import {
  useGetWebsiteLinksQuery,
  useCreateWebsiteLinkMutation,
  useUpdateWebsiteLinkMutation,
  useDeleteWebsiteLinkMutation,
} from "@/services/websiteLink";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";

export default function WebsiteLinksListPage() {
  const { data: links = [], isLoading, isError } = useGetWebsiteLinksQuery();
  const [createLink, { isLoading: isCreating }] = useCreateWebsiteLinkMutation();
  const [updateLink, { isLoading: isUpdating }] = useUpdateWebsiteLinkMutation();
  const [deleteLink] = useDeleteWebsiteLinkMutation();

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
    title: "",
    url: "",
    order: 0,
  });

  const filteredLinks = (links || []).filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.url || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);

  const openCreateModal = () => {
    setFormModal({
      isOpen: true,
      mode: "create",
      id: "",
      title: "",
      url: "",
      order: 0,
    });
  };

  const openEditModal = (item: any) => {
    setFormModal({
      isOpen: true,
      mode: "edit",
      id: item.id,
      title: item.title,
      url: item.url,
      order: item.order || 0,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModal.title.trim() || !formModal.url.trim()) {
      toast.error("Title and URL are required.");
      return;
    }

    try {
      if (formModal.mode === "create") {
        await createLink({
          title: formModal.title,
          url: formModal.url,
          order: Number(formModal.order),
        }).unwrap();
        toast.success("Website link created successfully!");
      } else {
        await updateLink({
          id: formModal.id,
          data: {
            title: formModal.title,
            url: formModal.url,
            order: Number(formModal.order),
          },
        }).unwrap();
        toast.success("Website link updated successfully!");
      }
      setFormModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err: any) {
      console.error("Form submit failed:", err);
      toast.error(err?.data?.message || "Operation failed. Make sure URL is valid.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLink(deleteModal.id).unwrap();
      toast.success("Website link deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentLinks.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete website link.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading website links...</div>;
  }

  if (isError) {
    return (
      <div className="p-3 text-center text-red-500">
        Error loading website links. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Website Links</h1>
          <p className="text-gray-500 text-sm">
            Manage external portal/associated website links displayed in the homepage Hero section
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
              placeholder="Search links..."
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
            <Plus size={18} /> Add Link
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Title</th>
                <th className="p-4 text-left whitespace-nowrap">URL</th>
                <th className="p-4 text-left whitespace-nowrap">Display Order</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentLinks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-10 text-gray-400">
                    No website links found.
                  </td>
                </tr>
              ) : (
                currentLinks.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-[rgb(13_33_55)]">
                      <div className="flex items-center gap-2">
                        <Globe className="text-slate-400 w-4 h-4" />
                        {item.title}
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1 text-slate-600 hover:text-secondary font-medium"
                      >
                        {item.url}
                        <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{item.order || 0}</td>
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
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id, name: item.title })}
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
          totalResults={filteredLinks.length}
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
                {formModal.mode === "create" ? "Add Website Link" : "Edit Website Link"}
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
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ATS Portal"
                  value={formModal.title}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://ats.example.com"
                  value={formModal.url}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, url: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formModal.order}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, order: Number(e.target.value) }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                />
                <p className="text-xs text-slate-400 mt-1">Lower values will display first.</p>
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
                  {formModal.mode === "create" ? "Create Link" : "Save Changes"}
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
        title="Delete Website Link"
        itemName={deleteModal.name}
      />
    </div>
  );
}

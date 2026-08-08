"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Loader2, FileText, Copy, Check, ExternalLink } from "lucide-react";
import {
  useGetHrResourcesQuery,
  useCreateHrResourceMutation,
  useUpdateHrResourceMutation,
  useDeleteHrResourceMutation,
  useUploadHrResourceFileMutation,
} from "@/services/hrResources";
import { useGetHrResourceCategoriesQuery } from "@/services/hrResourceCategories";
import { getImageUrl } from "@/lib/utils/imageUtils";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/utils/apiUtils";

const fileTypes = ["PDF", "DOCX", "XLSX"];

export default function HrResourcesListPage() {
  const { data: resources = [], isLoading, isError } = useGetHrResourcesQuery();
  const { data: categories = [], isLoading: isLoadingCategories } = useGetHrResourceCategoriesQuery();
  const [createResource, { isLoading: isCreating }] = useCreateHrResourceMutation();
  const [updateResource, { isLoading: isUpdating }] = useUpdateHrResourceMutation();
  const [deleteResource] = useDeleteHrResourceMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadHrResourceFileMutation();

  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    description: "",
    category: "",
    fileType: fileTypes[0],
    fileUrl: "",
  });
  const [resourceFile, setResourceFile] = useState<File | null>(null);

  const filteredResources = (resources || []).filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstItem, indexOfLastItem);

  const openCreateModal = () => {
    setResourceFile(null);
    setFormModal({
      isOpen: true,
      mode: "create",
      id: "",
      title: "",
      description: "",
      category: categories.length > 0 ? categories[0].name : "",
      fileType: fileTypes[0],
      fileUrl: "",
    });
  };

  const openEditModal = (item: any) => {
    setResourceFile(null);
    setFormModal({
      isOpen: true,
      mode: "edit",
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      fileType: item.fileType,
      fileUrl: item.fileUrl,
    });
  };

  const handleCopyUrl = async (id: string, fileUrl?: string) => {
    if (!fileUrl) return;
    const fullUrl = getImageUrl(fileUrl);
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      toast.success("Public URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy URL.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModal.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (formModal.mode === "create" && !resourceFile && !formModal.fileUrl) {
      toast.error("Please upload a file or provide a URL.");
      return;
    }

    try {
      let finalFileUrl = formModal.fileUrl;

      if (resourceFile) {
        const formData = new FormData();
        formData.append("file", resourceFile);
        const uploadRes = await uploadFile(formData).unwrap();
        finalFileUrl = uploadRes.url;
      }

      const payload = {
        title: formModal.title.trim(),
        description: formModal.description.trim(),
        category: formModal.category,
        fileType: formModal.fileType,
        fileUrl: finalFileUrl,
      };

      if (formModal.mode === "create") {
        await createResource(payload).unwrap();
        toast.success("HR Resource created successfully!");
      } else {
        await updateResource({ id: formModal.id, data: payload }).unwrap();
        toast.success("HR Resource details updated successfully!");
      }
      setFormModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err: any) {
      console.error("Form submit failed:", err);
      toast.error(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteResource(deleteModal.id).unwrap();
      toast.success("HR Resource deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentResources.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete HR Resource.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading HR resources...</div>;
  }

  if (isError) {
    return (
      <div className="p-3 text-center text-red-500">
        Error loading HR resources. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">HR Free Tools</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage templates, checklists, and formats for the HR Free Tools page.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition shadow-sm font-semibold text-sm w-full md:w-auto"
        >
          <Plus size={16} />
          Add Resource
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-3 border-b bg-slate-50/50 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Total {filteredResources.length} resources
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b text-slate-600 font-semibold">
              <tr>
                <th className="p-4 w-1/3">Title & Category</th>
                <th className="p-4">File Type</th>
                <th className="p-4">File URL</th>
                <th className="p-4 text-center">Copy Link</th>
                <th className="p-4 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentResources.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={32} className="text-slate-300" />
                      <p>No HR resources found.</p>
                      {search && (
                        <button
                          onClick={() => setSearch("")}
                          className="text-secondary hover:underline text-sm font-medium mt-1"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                currentResources.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{item.title}</span>
                        <span className="text-xs text-slate-500">{item.category}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">
                        {item.fileType}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 max-w-xs truncate">
                      {item.fileUrl && (
                        <a
                          href={getImageUrl(item.fileUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 text-slate-600 hover:text-secondary font-medium truncate"
                        >
                          <span className="truncate">{item.fileUrl}</span>
                          <ExternalLink size={12} className="flex-shrink-0" />
                        </a>
                      )}
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleCopyUrl(item.id, item.fileUrl)}
                        className={`flex items-center gap-1.5 mx-auto px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          copiedId === item.id
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-600 hover:text-secondary hover:bg-blue-50 border-slate-200 hover:border-blue-200"
                        }`}
                        title="Copy Public URL to Clipboard"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            Copy URL
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Resource"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id, name: item.title })}
                          className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete Resource"
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
          totalResults={filteredResources.length}
          indexOfFirst={indexOfFirstItem}
          indexOfLast={indexOfLastItem}
        />
      </div>

      {/* Form Dialog Modal */}
      {formModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden my-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-bold text-lg text-slate-800">
                {formModal.mode === "create" ? "Add HR Resource" : "Edit HR Resource"}
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
                  placeholder="e.g. Offer Letter Template"
                  value={formModal.title}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Professional offer letter format for all roles."
                  value={formModal.description}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950 min-h-[100px]"
                  maxLength={1000}
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1 flex justify-between">
                  <span>Describe the resource briefly.</span>
                  <span>{formModal.description.length}/1000</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formModal.category}
                    onChange={(e) => setFormModal((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950"
                  >
                    <option value="" disabled>Select a Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    File Format <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formModal.fileType}
                    onChange={(e) => setFormModal((prev) => ({ ...prev, fileType: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950"
                  >
                    {fileTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Upload File {formModal.mode === "create" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setResourceFile(file);
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {formModal.fileUrl && !resourceFile && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <Check size={12} /> Current file exists. Uploading a new file will replace it.
                  </p>
                )}
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-[11px] text-slate-500 font-medium">Supported formats: PDF, DOCX, XLSX</p>
                  <p className="text-[11px] text-slate-500 font-medium">Maximum file size: 5MB</p>
                </div>
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
                  disabled={isCreating || isUpdating || isUploading}
                  className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-semibold disabled:opacity-75"
                >
                  {(isCreating || isUpdating || isUploading) && <Loader2 size={16} className="animate-spin" />}
                  {formModal.mode === "create" ? "Add Resource" : "Save Changes"}
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
        title="Delete HR Resource"
        itemName={deleteModal.name}
      />
    </div>
  );
}

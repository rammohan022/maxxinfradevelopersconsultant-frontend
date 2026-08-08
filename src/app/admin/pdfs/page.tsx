"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Loader2, FileText, Copy, Check, ExternalLink } from "lucide-react";
import {
  useGetPdfsQuery,
  useCreatePdfMutation,
  useUpdatePdfMutation,
  useDeletePdfMutation,
} from "@/services/pdf";
import { getImageUrl } from "@/lib/utils/imageUtils";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";
import { slugifyCategory } from "@/lib/utils/slugUtils";
import { getErrorMessage } from "@/lib/utils/apiUtils";

export default function PdfsListPage() {
  const { data: pdfs = [], isLoading, isError } = useGetPdfsQuery();
  const [createPdf, { isLoading: isCreating }] = useCreatePdfMutation();
  const [updatePdf, { isLoading: isUpdating }] = useUpdatePdfMutation();
  const [deletePdf] = useDeletePdfMutation();

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
    order: 0,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const filteredPdfs = (pdfs || []).filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPdfs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPdfs = filteredPdfs.slice(indexOfFirstItem, indexOfLastItem);

  const openCreateModal = () => {
    setPdfFile(null);
    setFormModal({
      isOpen: true,
      mode: "create",
      id: "",
      title: "",
      order: 0,
    });
  };

  const openEditModal = (item: any) => {
    setPdfFile(null);
    setFormModal({
      isOpen: true,
      mode: "edit",
      id: item.id,
      title: item.title,
      order: item.order || 0,
    });
  };

  const handleCopyUrl = async (id: string, fileUrl?: string, title?: string) => {
    if (!fileUrl || !title) return;
    const slug = slugifyCategory(title);
    const fullUrl = `${window.location.origin}/pdf?doc=${slug}`;
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

    if (formModal.mode === "create" && !pdfFile) {
      toast.error("Please upload a PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formModal.title.trim());
      formData.append("order", String(formModal.order));
      if (pdfFile) {
        formData.append("file", pdfFile);
      }

      if (formModal.mode === "create") {
        await createPdf(formData).unwrap();
        toast.success("PDF document uploaded successfully!");
      } else {
        await updatePdf({ id: formModal.id, data: formData }).unwrap();
        toast.success("PDF document details updated successfully!");
      }
      setFormModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err: any) {
      console.error("Form submit failed:", err);
      toast.error(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    try {
      await deletePdf(deleteModal.id).unwrap();
      toast.success("PDF document deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentPdfs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete PDF document.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading PDF documents...</div>;
  }

  if (isError) {
    return (
      <div className="p-3 text-center text-red-500">
        Error loading PDF documents. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">PDF Documents</h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Upload PDF documents and copy their public URLs to link them anywhere on the website
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
              placeholder="Search PDF titles..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64 text-slate-950"
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
            <Plus size={18} /> Upload PDF
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
                <th className="p-4 text-left whitespace-nowrap">File Path</th>
                <th className="p-4 text-left whitespace-nowrap">Display Order</th>
                <th className="p-4 text-center whitespace-nowrap">Public URL</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentPdfs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-10 text-gray-400">
                    No PDF documents found.
                  </td>
                </tr>
              ) : (
                currentPdfs.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-[rgb(13_33_55)]">
                      <div className="flex items-center gap-2">
                        <FileText className="text-rose-500 w-4 h-4 flex-shrink-0" />
                        {item.title}
                      </div>
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
                    <td className="p-4 text-slate-500 whitespace-nowrap">{item.order || 0}</td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleCopyUrl(item.id, item.fileUrl, item.title)}
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
                          title="Edit Document Details"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id, name: item.title })}
                          className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete PDF Document"
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
          totalResults={filteredPdfs.length}
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
                {formModal.mode === "create" ? "Upload PDF Document" : "Edit PDF Details"}
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
                  placeholder="e.g. Gratuity Policy Rules 2026"
                  value={formModal.title}
                  onChange={(e) => setFormModal((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950"
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
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-slate-950"
                />
                <p className="text-xs text-slate-400 mt-1">Lower values will display first.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  PDF File {formModal.mode === "create" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPdfFile(file);
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  required={formModal.mode === "create"}
                />
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-[11px] text-slate-500 font-medium">Supported formats: PDF</p>
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
                  disabled={isCreating || isUpdating}
                  className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-semibold disabled:opacity-75"
                >
                  {(isCreating || isUpdating) && <Loader2 size={16} className="animate-spin" />}
                  {formModal.mode === "create" ? "Upload PDF" : "Save Changes"}
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
        title="Delete PDF Document"
        itemName={deleteModal.name}
      />
    </div>
  );
}

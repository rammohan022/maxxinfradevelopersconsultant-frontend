"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Loader2,
  ShieldCheck,
  ExternalLink,
  Upload,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import {
  useGetComplianceServicesAdminQuery,
  useCreateComplianceServiceMutation,
  useUpdateComplianceServiceMutation,
  useDeleteComplianceServiceMutation,
  ComplianceServiceItem,
} from "@/services/complianceServices";
import { useUploadMediaFileMutation } from "@/services/media";
import { getImageUrl } from "@/lib/utils/imageUtils";
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

export default function ComplianceServicesAdminPage() {
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useGetComplianceServicesAdminQuery();

  const [createService, { isLoading: isCreating }] =
    useCreateComplianceServiceMutation();
  const [updateService, { isLoading: isUpdating }] =
    useUpdateComplianceServiceMutation();
  const [deleteService, { isLoading: isDeleting }] =
    useDeleteComplianceServiceMutation();
  const [uploadMedia, { isLoading: isUploading }] =
    useUploadMediaFileMutation();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    id: "",
    title: "",
    slug: "",
    desc: "",
    image: "",
    link: "/services",
    order: 0,
    isActive: true,
    imageFile: null as File | null,
    imagePreview: "",
  });

  const filteredServices = (services || []).filter(
    (item) =>
      (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.desc || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.slug || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const openCreateModal = () => {
    setFormModal({
      isOpen: true,
      mode: "create",
      id: "",
      title: "",
      slug: "",
      desc: "",
      image: "",
      link: "/services",
      order: services.length + 1,
      isActive: true,
      imageFile: null,
      imagePreview: "",
    });
  };

  const openEditModal = (item: ComplianceServiceItem) => {
    setFormModal({
      isOpen: true,
      mode: "edit",
      id: item.id,
      title: item.title,
      slug: item.slug || "",
      desc: item.desc || "",
      image: item.image || "",
      link: item.link || "/services",
      order: item.order ?? 0,
      isActive: item.isActive ?? true,
      imageFile: null,
      imagePreview: item.image ? getImageUrl(item.image) : "",
    });
  };

  const handleTitleChange = (val: string) => {
    setFormModal((prev) => ({
      ...prev,
      title: val,
      slug: prev.mode === "create" ? slugify(val) : prev.slug,
    }));
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      setFormModal((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModal.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!formModal.desc.trim()) {
      toast.error("Description is required.");
      return;
    }

    try {
      let finalImageUrl = formModal.image;

      // If user uploaded a new image file, upload it first
      if (formModal.imageFile) {
        const formData = new FormData();
        formData.append("file", formModal.imageFile);
        const uploadRes = await uploadMedia(formData).unwrap();
        finalImageUrl = uploadRes.url;
      }

      const payload = {
        title: formModal.title.trim(),
        slug: formModal.slug.trim() || slugify(formModal.title),
        desc: formModal.desc.trim(),
        image: finalImageUrl || undefined,
        link: formModal.link.trim() || "/services",
        order: Number(formModal.order) || 0,
        isActive: formModal.isActive,
      };

      if (formModal.mode === "create") {
        await createService(payload).unwrap();
        toast.success("Compliance service card created successfully!");
      } else {
        await updateService({
          id: formModal.id,
          data: payload,
        }).unwrap();
        toast.success("Compliance service card updated successfully!");
      }

      setFormModal((prev) => ({ ...prev, isOpen: false }));
      refetch();
    } catch (err: any) {
      console.error("Form submit failed:", err);
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService(deleteModal.id).unwrap();
      toast.success("Compliance service card deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete item.");
    }
  };

  const handleToggleStatus = async (item: ComplianceServiceItem) => {
    try {
      await updateService({
        id: item.id,
        data: { isActive: !item.isActive },
      }).unwrap();
      toast.success(
        `Service ${!item.isActive ? "activated" : "deactivated"} successfully!`
      );
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Status update failed.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
              Compliance Services CMS
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage the &quot;Our Compliance Services&quot; interactive cards
            displayed on the public Compliance page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/compliance#compliance-services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/40 text-xs sm:text-sm font-semibold transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            <span>View Live</span>
          </a>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Compliance Service</span>
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, description or slug..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
            Total: <strong>{services.length}</strong>
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active: <strong>{services.filter((s) => s.isActive).length}</strong>
          </span>
        </div>
      </div>

      {/* Cards Table List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-xs sm:text-sm">Loading compliance services...</p>
          </div>
        ) : isError ? (
          <div className="p-12 flex flex-col items-center justify-center text-red-500 gap-2">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm font-semibold">Failed to load compliance services</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-30 text-primary" />
            <p className="text-sm font-semibold text-slate-600">
              No compliance services found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Click &quot;Add Compliance Service&quot; to create a new card.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4 w-20">Image</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Service Title</th>
                  <th className="py-3.5 px-4 min-w-[280px]">Description</th>
                  <th className="py-3.5 px-4 w-32">Link</th>
                  <th className="py-3.5 px-4 w-24 text-center">Order</th>
                  <th className="py-3.5 px-4 w-24 text-center">Status</th>
                  <th className="py-3.5 px-4 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentServices.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">
                      {indexOfFirstItem + idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        {item.image ? (
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-primary">{item.title}</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {item.slug}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-sm">
                        {item.desc}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={item.link || "/services"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-secondary font-mono underline"
                      >
                        <span>{item.link || "/services"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-500 font-semibold">
                      {item.order ?? 0}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          item.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isActive ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {item.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                          title="Edit Service"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              id: item.id,
                              name: item.title,
                            })
                          }
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200">
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalResults={filteredServices.length}
              indexOfFirst={indexOfFirstItem}
              indexOfLast={indexOfLastItem}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {formModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <h3 className="text-lg font-bold text-primary">
                {formModal.mode === "create"
                  ? "Add Compliance Service Card"
                  : "Edit Compliance Service Card"}
              </h3>
              <button
                onClick={() =>
                  setFormModal((prev) => ({ ...prev, isOpen: false }))
                }
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Factory Compliance"
                  value={formModal.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. factory-compliance"
                  value={formModal.slug}
                  onChange={(e) =>
                    setFormModal((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Short description of the compliance service..."
                  value={formModal.desc}
                  onChange={(e) =>
                    setFormModal((prev) => ({ ...prev, desc: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Thumbnail Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-14 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {formModal.imagePreview || formModal.image ? (
                      <Image
                        src={
                          formModal.imagePreview ||
                          getImageUrl(formModal.image)
                        }
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      id="compliance-img-file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="compliance-img-file"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-primary" />
                      <span>Upload New Image</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Or enter image URL (/img/...)"
                      value={formModal.image}
                      onChange={(e) =>
                        setFormModal((prev) => ({
                          ...prev,
                          image: e.target.value,
                          imagePreview: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Internal Link
                  </label>
                  <input
                    type="text"
                    placeholder="/services or page URL"
                    value={formModal.link}
                    onChange={(e) =>
                      setFormModal((prev) => ({
                        ...prev,
                        link: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formModal.order}
                    onChange={(e) =>
                      setFormModal((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formModal.isActive}
                  onChange={(e) =>
                    setFormModal((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded text-secondary focus:ring-secondary border-slate-300 cursor-pointer"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Active & Displayed on Public Website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() =>
                    setFormModal((prev) => ({ ...prev, isOpen: false }))
                  }
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating || isUploading}
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
                >
                  {(isCreating || isUpdating || isUploading) && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <span>
                    {formModal.mode === "create" ? "Create Service" : "Save Changes"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Compliance Service"
        itemName={deleteModal.name}
        isLoading={isDeleting}
      />
    </div>
  );
}

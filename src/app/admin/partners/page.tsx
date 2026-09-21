"use client";

import { useState, useEffect } from "react";
import {
  useGetAdminPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  Partner,
} from "@/services/partners";
import {
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
} from "@/services/siteSettings";
import { getErrorMessage } from "@/lib/utils/apiUtils";
import { Plus, Pencil, Trash2, Globe, CheckCircle, XCircle, Building2, UploadCloud, Save, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";
import DeleteModal from "../components/DeleteModal";

export default function PartnersAdminPage() {
  const { data: partners = [], isLoading } = useGetAdminPartnersQuery();
  const { data: siteSettings } = useGetSiteSettingsQuery();
  const [updateSiteSettings, { isLoading: isSavingSettings }] = useUpdateSiteSettingsMutation();

  const [createPartner, { isLoading: isCreating }] = useCreatePartnerMutation();
  const [updatePartner, { isLoading: isUpdating }] = useUpdatePartnerMutation();
  const [deletePartner, { isLoading: isDeleting }] = useDeletePartnerMutation();

  // Section Header Form State
  const [sectionForm, setSectionForm] = useState({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    if (siteSettings) {
      setSectionForm({
        title: siteSettings.clientSectionTitle || "A leading HR service provider",
        subtitle: siteSettings.clientSectionSubtitle || "Join hands with People Consulting, your HR partner with a rich experience of over 5 years in collaborating with organizations. Our comprehensive end-to-end HR services and solutions are driven by deep domain expertise, ensuring you get the best support for your HR needs",
      });
    }
  }, [siteSettings]);

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("clientSectionTitle", sectionForm.title);
      formData.append("clientSectionSubtitle", sectionForm.subtitle);
      await updateSiteSettings(formData).unwrap();
      toast.success("Section content updated successfully!");
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to update section content"));
    }
  };

  // Partner Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const [form, setForm] = useState({
    name: "",
    websiteUrl: "",
    order: 0,
    isActive: true,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleOpenModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setForm({
        name: partner.name || "",
        websiteUrl: partner.websiteUrl || "",
        order: partner.order || 0,
        isActive: partner.isActive ?? true,
      });
      setPreview(partner.logo ? getImageUrl(partner.logo) : "");
    } else {
      setEditingPartner(null);
      setForm({
        name: "",
        websiteUrl: "",
        order: (partners.length || 0) + 1,
        isActive: true,
      });
      setPreview("");
    }
    setLogoFile(null);
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Partner/Client name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("websiteUrl", form.websiteUrl);
    formData.append("order", String(form.order));
    formData.append("isActive", String(form.isActive));

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      if (editingPartner) {
        await updatePartner({ id: editingPartner.id, data: formData }).unwrap();
        toast.success("Partner updated successfully!");
      } else {
        await createPartner(formData).unwrap();
        toast.success("Partner created successfully!");
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to save partner"));
    }
  };

  const handleToggleStatus = async (partner: Partner) => {
    try {
      const formData = new FormData();
      formData.append("isActive", String(!partner.isActive));
      await updatePartner({ id: partner.id, data: formData }).unwrap();
      toast.success(`Partner marked as ${!partner.isActive ? "Active" : "Inactive"}`);
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to update status"));
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deletePartner(deleteModal.id).unwrap();
      toast.success("Partner deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to delete partner"));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Building2 className="text-secondary" size={28} />
            Client Logos &amp; Partners CMS
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage client logos, brands marquee, and section header text displayed on the homepage.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all text-sm w-fit"
        >
          <Plus size={18} />
          Add Client Logo
        </button>
      </div>

      {/* Section Header Content CMS Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-1">Section Header Content</h2>
        <p className="text-xs text-slate-500 mb-4">
          Customize the title and description shown above the client logos marquee.
        </p>

        <form onSubmit={handleSaveSection} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={sectionForm.title}
              onChange={(e) => setSectionForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. A leading HR service provider"
              className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Section Subtitle / Description
            </label>
            <textarea
              rows={3}
              value={sectionForm.subtitle}
              onChange={(e) => setSectionForm((p) => ({ ...p, subtitle: e.target.value }))}
              placeholder="Describe your collaboration with clients..."
              className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition bg-slate-50/50"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingSettings}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm disabled:opacity-60"
            >
              <Save size={16} />
              {isSavingSettings ? "Saving..." : "Save Section Details"}
            </button>
          </div>
        </form>
      </div>

      {/* Partners List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">
            Partner Logos ({partners.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading client logos...
          </div>
        ) : partners.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No client logos found. Click &quot;Add Client Logo&quot; to add your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="py-3 px-5 w-16">Order</th>
                  <th className="py-3 px-5 w-32">Logo</th>
                  <th className="py-3 px-5">Partner / Client Name</th>
                  <th className="py-3 px-5">Website URL</th>
                  <th className="py-3 px-5 w-28">Status</th>
                  <th className="py-3 px-5 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-5 font-semibold text-slate-600">
                      {partner.order}
                    </td>
                    <td className="py-4 px-5">
                      <div className="h-12 w-28 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-center p-2 overflow-hidden relative">
                        {partner.logo ? (
                          <Image
                            src={getImageUrl(partner.logo)}
                            alt={partner.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="text-[11px] font-bold text-slate-600 text-center line-clamp-2">
                            {partner.name}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-800">
                      {partner.name}
                    </td>
                    <td className="py-4 px-5 text-slate-500 text-xs">
                      {partner.websiteUrl ? (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-secondary hover:underline inline-flex items-center gap-1"
                        >
                          {partner.websiteUrl}
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleStatus(partner)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                          partner.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {partner.isActive ? (
                          <>
                            <CheckCircle size={12} className="text-emerald-500" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="text-slate-400" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(partner)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                          title="Edit Partner"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              id: partner.id,
                              name: partner.name,
                            })
                          }
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition"
                          title="Delete Partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">
                {editingPartner ? "Edit Client Logo" : "Add Client Logo"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Client / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Deloitte"
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Logo Image
                </label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <div className="h-16 w-32 relative bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-2 shrink-0">
                      <Image
                        src={preview}
                        alt="Logo preview"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : null}
                  <label className="flex-1 border-2 border-dashed border-slate-200 hover:border-secondary rounded-lg p-4 cursor-pointer text-center transition flex flex-col items-center justify-center bg-slate-50/50">
                    <UploadCloud size={24} className="text-slate-400 mb-1" />
                    <span className="text-xs text-slate-600 font-medium">
                      {logoFile ? logoFile.name : "Click to upload logo"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PNG, SVG, JPG, WebP supported
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(e) => setForm((p) => ({ ...p, websiteUrl: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                      className="w-4 h-4 text-secondary rounded border-slate-300 focus:ring-secondary"
                    />
                    <span className="text-xs font-semibold text-slate-700">Active (Visible)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 py-2 text-sm bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium shadow-sm transition disabled:opacity-60"
                >
                  {isCreating || isUpdating
                    ? "Saving..."
                    : editingPartner
                    ? "Update Partner"
                    : "Create Partner"}
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
        title="Delete Partner Logo"
        itemName={deleteModal.name}
        isLoading={isDeleting}
      />
    </div>
  );
}

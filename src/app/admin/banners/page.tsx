"use client";

import { useState } from "react";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  Banner,
} from "@/services/banners";
import { Plus, Pencil, Trash2, Sliders, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function BannersAdminPage() {
  const { data: banners = [], isLoading } = useGetBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [form, setForm] = useState({
    tag: "",
    title: "",
    highlight: "",
    subtitle: "",
    description: "",
    ctaText: "",
    ctaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
    position: 1,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setForm({
        tag: banner.tag || "",
        title: banner.title || "",
        highlight: banner.highlight || "",
        subtitle: banner.subtitle || "",
        description: banner.description || "",
        ctaText: banner.ctaText || "",
        ctaLink: banner.ctaLink || "",
        secondaryCtaText: banner.secondaryCtaText || "",
        secondaryCtaLink: banner.secondaryCtaLink || "",
        position: banner.position || 1,
        isActive: banner.isActive ?? true,
      });
      setPreview(banner.image || "");
    } else {
      setEditingBanner(null);
      setForm({
        tag: "HR & RECRUITMENT",
        title: "Aligning Strategy With",
        highlight: "People & Culture",
        subtitle: "Increasing your competitive advantage",
        description: "People Consulting has long established a reputation for helping organizations streamline their recruitment, training, and labor compliance processes. We help organizations become High Performance workplaces.",
        ctaText: "Explore Services",
        ctaLink: "/services",
        secondaryCtaText: "Learn More",
        secondaryCtaLink: "/about-us",
        position: banners.length + 1,
        isActive: true,
      });
      setPreview("");
    }
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tag", form.tag);
    formData.append("title", form.title);
    formData.append("highlight", form.highlight);
    formData.append("subtitle", form.subtitle);
    formData.append("description", form.description);
    formData.append("ctaText", form.ctaText);
    formData.append("ctaLink", form.ctaLink);
    formData.append("secondaryCtaText", form.secondaryCtaText);
    formData.append("secondaryCtaLink", form.secondaryCtaLink);
    formData.append("position", form.position.toString());
    formData.append("isActive", form.isActive ? "true" : "false");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingBanner) {
        await updateBanner({ id: editingBanner.id, data: formData }).unwrap();
        toast.success("Hero Banner updated successfully!");
      } else {
        await createBanner(formData).unwrap();
        toast.success("Hero Banner created successfully!");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      // baseQuery handles toast error notification
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero banner?")) return;
    try {
      await deleteBanner(id).unwrap();
      toast.success("Hero Banner deleted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-4 text-center text-slate-500">Loading hero banners...</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Hero Banners Manager</h1>
          <p className="text-sm text-slate-500">Manage homepage hero slides, titles, tags, text, and buttons</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-bold shadow"
        >
          <Plus size={18} /> Add Hero Banner
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-slate-700 font-bold">
            <tr>
              <th className="p-3 text-left">Banner Image</th>
              <th className="p-3 text-left">Category & Title</th>
              <th className="p-3 text-left">Subtitle & Description</th>
              <th className="p-3 text-center">Position</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {banners.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No hero banners found. Create your first hero slide.
                </td>
              </tr>
            ) : (
              banners.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    {b.image ? (
                      <div className="relative w-24 h-14 rounded overflow-hidden border">
                        <Image src={getImageUrl(b.image)} alt={b.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-14 bg-slate-100 rounded border flex items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-orange-50 px-2 py-0.5 rounded border border-orange-200 block w-fit mb-1">
                      {b.tag || "HR & RECRUITMENT"}
                    </span>
                    <div className="font-bold text-slate-800">
                      {b.title} <span className="text-secondary">{b.highlight}</span>
                    </div>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="font-semibold text-slate-700 text-xs truncate">{b.subtitle || "No subtitle"}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{b.description || "No description"}</div>
                  </td>
                  <td className="p-3 text-center font-semibold text-slate-600">{b.position || 1}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        b.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {b.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {b.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(b)}
                        className="text-slate-400 hover:text-secondary p-1.5 rounded hover:bg-blue-50"
                        title="Edit Banner"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50"
                        title="Delete Banner"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-3">
              {editingBanner ? "Edit Hero Banner" : "Create Hero Banner"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Top Tag / Category Badge</label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                    placeholder="e.g. HR & RECRUITMENT"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Highlighted Word(s) in Title (Orange)</label>
                  <input
                    type="text"
                    value={form.highlight}
                    onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                    placeholder="e.g. People & Culture"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Banner Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-xs font-semibold"
                  placeholder="e.g. Aligning Strategy With"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Subheading</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-xs"
                  placeholder="e.g. Increasing your competitive advantage"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description Body</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-xs"
                  placeholder="e.g. People Consulting has long established a reputation for helping organizations streamline their recruitment, training, and labor compliance processes."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs"
                    placeholder="Explore Services"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Link URL</label>
                  <input
                    type="text"
                    value={form.ctaLink}
                    onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs"
                    placeholder="/services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Button Text</label>
                  <input
                    type="text"
                    value={form.secondaryCtaText}
                    onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs"
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Link URL</label>
                  <input
                    type="text"
                    value={form.secondaryCtaLink}
                    onChange={(e) => setForm({ ...form, secondaryCtaLink: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs"
                    placeholder="/about-us"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Position (Order)</label>
                  <input
                    type="number"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={form.isActive ? "true" : "false"}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
                    className="w-full border rounded-lg px-3 py-2 text-xs font-medium"
                  >
                    <option value="true">Active</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Background / Graphic Image</label>
                {preview && (
                  <div className="relative w-full h-28 rounded border mb-2 overflow-hidden bg-slate-100">
                    <Image src={getImageUrl(preview)} alt="Preview" fill className="object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="w-full border rounded-lg px-3 py-1.5 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 border rounded-lg hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark text-xs font-bold shadow"
                >
                  Save Hero Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetAdminFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  Faq,
} from "@/services/faqs";
import { getErrorMessage } from "@/lib/utils/apiUtils";
import {
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  CheckCircle,
  XCircle,
  Search,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";
import AiModal from "@/components/ai/AiModal";

export default function FaqsAdminPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { data: faqs = [], isLoading } = useGetAdminFaqsQuery();

  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    question: "",
  });

  useEffect(() => {
    if (categoryParam) {
      if (categoryParam.toLowerCase().includes("about")) {
        setActiveCategory("About Us");
      } else {
        setActiveCategory(categoryParam);
      }
    }
  }, [categoryParam]);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "General",
    order: 0,
    isActive: true,
  });

  const handleOpenModal = (faq?: Faq) => {
    if (faq) {
      setEditingFaq(faq);
      setForm({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category || "General",
        order: faq.order || 0,
        isActive: faq.isActive ?? true,
      });
    } else {
      setEditingFaq(null);
      setForm({
        question: "",
        answer: "",
        category: activeCategory !== "All" ? activeCategory : "About Us",
        order: (faqs.length || 0) + 1,
        isActive: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim()) {
      toast.error("Question is required");
      return;
    }
    if (!form.answer.trim()) {
      toast.error("Answer is required");
      return;
    }

    try {
      if (editingFaq) {
        await updateFaq({
          id: editingFaq.id,
          data: form,
        }).unwrap();
        toast.success("FAQ updated successfully!");
      } else {
        await createFaq(form).unwrap();
        toast.success("FAQ created successfully!");
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to save FAQ"));
    }
  };

  const handleToggleStatus = async (faq: Faq) => {
    try {
      await updateFaq({
        id: faq.id,
        data: { isActive: !faq.isActive },
      }).unwrap();
      toast.success(
        `FAQ marked as ${!faq.isActive ? "Active" : "Inactive"}`
      );
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to update status"));
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteFaq(deleteModal.id).unwrap();
      toast.success("FAQ deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", question: "" });
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to delete FAQ"));
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "About Us"
        ? f.category?.toLowerCase().includes("about")
        : f.category?.toLowerCase() === activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <HelpCircle className="text-secondary" size={28} />
            {activeCategory === "About Us" ? "About Us FAQs Management" : "FAQs Management"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {activeCategory === "About Us"
              ? "Manage Frequently Asked Questions specifically displayed on the About Us page."
              : "Manage Frequently Asked Questions displayed on the homepage, about page, and across the website."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAiOpen(true)}
            className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-4 py-2.5 rounded-xl font-medium shadow-sm transition-all text-sm"
          >
            <Sparkles size={16} />
            AI FAQ Generator
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all text-sm"
          >
            <Plus size={18} />
            Add New FAQ
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
        {[
          { id: "All", label: "All FAQs" },
          { id: "About Us", label: "About Us FAQs", isSpecial: true },
          { id: "General", label: "General / Home" },
          { id: "Recruitment", label: "Recruitment" },
          { id: "Training", label: "Corporate Training" },
          { id: "Compliance", label: "Compliance" },
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          const count = faqs.filter((f) =>
            tab.id === "All"
              ? true
              : tab.id === "About Us"
              ? f.category?.toLowerCase().includes("about")
              : f.category?.toLowerCase() === tab.id.toLowerCase()
          ).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs ${
                isActive
                  ? tab.isSpecial
                    ? "bg-secondary text-white shadow-secondary/20 shadow-md"
                    : "bg-primary text-white shadow-primary/20 shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search FAQs by question or answer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition bg-slate-50/50"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing: <span className="font-bold text-slate-800">{filteredFaqs.length}</span> of {faqs.length} FAQs
        </div>
      </div>

      {/* FAQs List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">
            {activeCategory === "All" ? "All FAQs" : `${activeCategory} FAQs`} ({filteredFaqs.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading FAQs...
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            {searchQuery
              ? "No FAQs match your search criteria."
              : activeCategory !== "All"
              ? `No FAQs found for "${activeCategory}". Click "Add New FAQ" to create one!`
              : 'No FAQs found. Click "Add New FAQ" to create one!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="py-3 px-5 w-16">Order</th>
                  <th className="py-3 px-5 w-1/3">Question</th>
                  <th className="py-3 px-5">Answer</th>
                  <th className="py-3 px-5 w-28">Status</th>
                  <th className="py-3 px-5 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFaqs.map((faq) => (
                  <tr
                    key={faq.id}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="py-4 px-5 font-semibold text-slate-600 align-top">
                      {faq.order}
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-800 align-top leading-snug">
                      {faq.question}
                      {faq.category && (
                        <span
                          className={`inline-block mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                            faq.category.toLowerCase().includes("about")
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : faq.category.toLowerCase().includes("recruit")
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : faq.category.toLowerCase().includes("train")
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : faq.category.toLowerCase().includes("compli")
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {faq.category}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-slate-600 text-xs sm:text-sm leading-relaxed align-top">
                      <p className="line-clamp-3">{faq.answer}</p>
                    </td>
                    <td className="py-4 px-5 align-top">
                      <button
                        onClick={() => handleToggleStatus(faq)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                          faq.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {faq.isActive ? (
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
                    <td className="py-4 px-5 text-right align-top">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(faq)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                          title="Edit FAQ"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              id: faq.id,
                              question: faq.question,
                            })
                          }
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition"
                          title="Delete FAQ"
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">
                {editingFaq ? "Edit FAQ" : "Add New FAQ"}
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
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, question: e.target.value }))
                  }
                  placeholder="e.g. What recruitment services do you offer?"
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, answer: e.target.value }))
                  }
                  placeholder="Provide a clear, detailed answer..."
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={
                      ["About Us", "General", "Recruitment", "Training", "Compliance"].includes(form.category)
                        ? form.category
                        : "Custom"
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "Custom") {
                        setForm((p) => ({ ...p, category: val }));
                      }
                    }}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition bg-white"
                  >
                    <option value="About Us">About Us</option>
                    <option value="General">General / Home</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Training">Corporate Training</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Custom">Custom Category...</option>
                  </select>
                  {!["About Us", "General", "Recruitment", "Training", "Compliance"].includes(form.category) && (
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                      placeholder="Enter custom category"
                      className="mt-2 w-full text-sm px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        order: Number(e.target.value),
                      }))
                    }
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary transition"
                  />
                </div>

                <div className="flex items-center sm:pt-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          isActive: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-secondary rounded border-slate-300 focus:ring-secondary"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Active (Visible)
                    </span>
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
                    : editingFaq
                    ? "Update FAQ"
                    : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Modal for Generating FAQs */}
      <AiModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialTool="faq"
        onApply={(generated: any) => {
          if (Array.isArray(generated) && generated.length > 0) {
            // Apply first or handle multiple
            const first = generated[0];
            setForm({
              question: first.question || first.q || "",
              answer: first.answer || first.a || "",
              category: "General",
              order: (faqs.length || 0) + 1,
              isActive: true,
            });
            setEditingFaq(null);
            setModalOpen(true);
            toast.success("AI FAQ loaded into form! Review and click Save.");
          }
        }}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, id: "", question: "" })
        }
        onConfirm={handleDelete}
        title="Delete FAQ"
        itemName={deleteModal.question}
        isLoading={isDeleting}
      />
    </div>
  );
}

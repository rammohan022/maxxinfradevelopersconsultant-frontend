"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useGetTestimonialsQuery, useDeleteTestimonialMutation } from "@/services/testimonial";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

export default function TestimonialListPage() {
  const { data: testimonials = [], isLoading, isError } = useGetTestimonialsQuery();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [search, setSearch] = useState("");

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const filteredTestimonials = (testimonials || []).filter((item) =>
    (item.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.caseType || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteTestimonial(deleteModal.id).unwrap();
      toast.success("Testimonial deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete testimonial.");
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">Loading testimonials...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading testimonials. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Testimonials</h1>
          <p className="text-gray-500 text-sm">
            Manage client testimonials displayed on website
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
              placeholder="Search testimonials..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            href="/admin/testimonials/create"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-medium"
          >
            <Plus size={18} /> Add Testimonial
          </Link>
        </div>
      </div>

      {/* Table Card - RESPONSIVE */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b text-slate-600">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Name</th>
                <th className="p-4 text-left whitespace-nowrap">Case Type</th>
                <th className="p-4 text-left whitespace-nowrap">Rating</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-10 text-gray-400">
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-navy">{item.clientName}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{item.caseType}</td>
                    <td className="p-4 text-amber-500 whitespace-nowrap">
                      {"★".repeat(item.rating || 5)}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                        }`}>
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/testimonials/edit?id=${item.id}`}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id, name: item.clientName })}
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
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        itemName={deleteModal.name}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useGetCareersQuery, useDeleteCareerMutation } from "@/services/career";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

const CareerListPage = () => {
  const { data: careers = [], isLoading, isError } = useGetCareersQuery();
  const [deleteCareer] = useDeleteCareerMutation();
  const [search, setSearch] = useState("");

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const filteredCareers = (careers || []).filter((career) =>
    (career.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (career.department || "").toLowerCase().includes(search.toLowerCase()) ||
    (career.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteCareer(deleteModal.id).unwrap();
      toast.success("Career opportunity deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete career.");
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">Loading career opportunities...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading career opportunities. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Career Opportunities</h1>
          <p className="text-gray-500 text-sm">
            Manage all job openings listed on website
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
              placeholder="Search jobs..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            href="/admin/career/create"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-medium"
          >
            <Plus size={18} /> Add Career
          </Link>
        </div>
      </div>

      {/* Table Card - RESPONSIVE */}
      <div className="bg-white shadow rounded-xl overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b text-slate-600">
              <tr>
                <th className="p-4 whitespace-nowrap">Title</th>
                <th className="p-4 whitespace-nowrap">Department</th>
                <th className="p-4 whitespace-nowrap">Location</th>
                <th className="p-4 whitespace-nowrap">Type</th>
                <th className="p-4 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCareers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-10 text-gray-400">
                    No career opportunities found.
                  </td>
                </tr>
              ) : (
                filteredCareers.map((career) => (
                  <tr key={career.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-navy">{career.title}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{career.department}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{career.location}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                        {career.jobType}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/career/edit?id=${career.id}`}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: career.id, name: career.title })}
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
        title="Delete Career Opening"
        itemName={deleteModal.name}
      />
    </div>
  );
};

export default CareerListPage;

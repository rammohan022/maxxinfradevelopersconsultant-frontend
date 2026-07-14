"use client";

import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { useGetLeadsQuery, useDeleteLeadMutation } from "@/services/lead";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

export default function LeadsPage() {
  const { data: leads = [], isLoading, isError } = useGetLeadsQuery();
  const [deleteLead] = useDeleteLeadMutation();
  const [search, setSearch] = useState("");

  // Modal State
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: "",
    name: "",
  });

  const filteredLeads = leads.filter((lead) => {
    return (
      lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.subject?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async () => {
    try {
      await deleteLead(deleteModal.id).unwrap();
      toast.success("Lead deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete lead.");
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">Loading leads...</div>;
  }

  if (isError) {
    return <div className="p-6 text-center text-red-500">Error loading leads. Please try again later.</div>;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">
            Leads Management
          </h1>
          <p className="text-sm text-slate-500">View and manage all incoming enquiries from the contact form</p>
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
              placeholder="Search leads..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table Card - RESPONSIVE Container */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-6 py-3 whitespace-nowrap">Date</th>
                <th className="text-left px-6 py-3 whitespace-nowrap">Name</th>
                <th className="text-left px-6 py-3 whitespace-nowrap">Contact Info</th>
                <th className="text-left px-6 py-3 whitespace-nowrap">Subject</th>
                <th className="text-left px-6 py-3 min-w-[300px]">Message</th>
                <th className="text-center px-6 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-slate-400"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t hover:bg-slate-50 transition align-top"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {lead.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-slate-600">{lead.email}</div>
                      <div className="text-slate-400 text-xs">{lead.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 italic text-slate-600">
                      {lead.subject || "No Subject"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 leading-relaxed min-w-[300px]">
                      {lead.message}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, id: lead.id, name: lead.fullName })}
                        className="text-slate-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Lead"
        itemName={deleteModal.name}
      />
    </div>
  );
}

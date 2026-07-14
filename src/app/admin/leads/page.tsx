"use client";

import { useState } from "react";
import { Search, Trash2, Eye } from "lucide-react";
import { useGetLeadsQuery, useDeleteLeadMutation } from "@/services/lead";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";

export default function LeadsPage() {
  const { data: leads = [], isLoading, isError } = useGetLeadsQuery();
  const [deleteLead] = useDeleteLeadMutation();
  const [search, setSearch] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  // Modal States
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: "",
    name: "",
  });

  const [viewModal, setViewModal] = useState<{ isOpen: boolean; message: string; subject: string; name: string }>({
    isOpen: false,
    message: "",
    subject: "",
    name: "",
  });

  const filteredLeads = leads.filter((lead) => {
    return (
      lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.subject?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const handleDelete = async () => {
    try {
      await deleteLead(deleteModal.id).unwrap();
      toast.success("Lead deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      // Reset to page 1 if current page is empty after delete
      if (currentLeads.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete lead.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading leads...</div>;
  }

  if (isError) {
    return <div className="p-3 text-center text-red-500">Error loading leads. Please try again later.</div>;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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
                <th className="text-left px-3 py-2 whitespace-nowrap">Name</th>
                <th className="text-left px-3 py-2 whitespace-nowrap">Contact Info</th>
                <th className="text-left px-3 py-2 whitespace-nowrap">Subject</th>
                <th className="text-left px-3 py-2 min-w-[300px]">Message</th>
                <th className="text-left px-3 py-2 whitespace-nowrap">Date</th>
                <th className="text-center px-3 py-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-slate-400"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                currentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t hover:bg-slate-50 transition align-top"
                  >
                    <td className="px-3 py-2 font-medium whitespace-nowrap">
                      {lead.fullName}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-slate-600">{lead.email}</div>
                      <div className="text-slate-400 text-xs">{lead.phoneNumber}</div>
                    </td>
                    <td className="px-3 py-2 italic text-slate-600">
                      {lead.subject || "No Subject"}
                    </td>
                    <td className="px-3 py-2 text-slate-500 leading-relaxed max-w-[300px] truncate" title={lead.message}>
                      {lead.message}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-500">
                      {new Date(lead.createdAt).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>

                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <button
                        onClick={() => setViewModal({ isOpen: true, message: lead.message, subject: lead.subject || "No Subject", name: lead.fullName })}
                        className="text-slate-400 hover:text-secondary transition p-2 hover:bg-slate-50 rounded-lg mr-1"
                        title="View Full Message"
                      >
                        <Eye size={18} />
                      </button>
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

        {/* Pagination Controls */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalResults={filteredLeads.length}
          indexOfFirst={indexOfFirstLead}
          indexOfLast={indexOfLastLead}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Lead"
        itemName={deleteModal.name}
      />

      {/* View Message Modal */}
      {viewModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-[rgb(13_33_55)] truncate">
                Enquiry from {viewModal.name}
              </h3>
              <button
                onClick={() => setViewModal({ isOpen: false, message: "", subject: "", name: "" })}
                className="text-slate-400 hover:text-slate-600 transition text-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</span>
                <p className="text-sm font-medium text-slate-700 mt-0.5">{viewModal.subject}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</span>
                <div className="bg-slate-50 p-3 rounded-lg border text-sm text-slate-600 max-h-[300px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {viewModal.message}
                </div>
              </div>
            </div>
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewModal({ isOpen: false, message: "", subject: "", name: "" })}
                className="px-4 py-2 bg-[rgb(13_33_55)] hover:bg-[rgb(13_33_55)]/90 text-white rounded-lg text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

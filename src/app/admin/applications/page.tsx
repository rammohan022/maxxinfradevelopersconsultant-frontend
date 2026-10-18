"use client";

import React, { useState } from "react";
import { Trash2, Search, FileText, ExternalLink, Calendar, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useGetJobApplicationsQuery, useDeleteJobApplicationMutation } from "@/services/jobApplication";
import { useGetCareersQuery } from "@/services/career";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/utils/imageUtils";

const ApplicationsListPage = () => {
  const { data: applications = [], isLoading, isError } = useGetJobApplicationsQuery();
  const { data: careers = [] } = useGetCareersQuery();
  const [deleteApplication] = useDeleteJobApplicationMutation();
  const [search, setSearch] = useState("");
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  // Map jobId to job title
  const getJobTitle = (jobId?: string) => {
    if (!jobId) return "General CV Submission";
    const job = careers.find((j) => j.id === jobId);
    return job ? job.title : "Unknown Position";
  };

  const filteredApplications = (applications || []).filter((app) =>
    (app.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (app.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (getJobTitle(app.jobId)).toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async () => {
    try {
      await deleteApplication(deleteModal.id).unwrap();
      toast.success("Application deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentApplications.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete application.");
    }
  };

  if (isLoading) {
    return <div className="p-3 text-center text-slate-500">Loading applications...</div>;
  }

  if (isError) {
    return (
      <div className="p-3 text-center text-red-500">
        Error loading applications. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Job Applications</h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            View and manage all job applications received
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
              placeholder="Search applications..."
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

      {/* Table Card */}
      <div className="bg-white shadow rounded-xl overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b text-slate-600">
              <tr>
                <th className="p-4 whitespace-nowrap">Applicant</th>
                <th className="p-4 whitespace-nowrap">Position</th>
                <th className="p-4 whitespace-nowrap">Contact Info</th>
                <th className="p-4 whitespace-nowrap">Applied Date</th>
                <th className="p-4 whitespace-nowrap">Resume</th>
                <th className="p-4 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-10 text-gray-400">
                    No applications found.
                  </td>
                </tr>
              ) : (
                currentApplications.map((app) => (
                  <React.Fragment key={app.id}>
                    <tr className="border-b hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                            {app.fullName.charAt(0)}
                          </div>
                          <div className="font-medium text-[rgb(13_33_55)]">{app.fullName}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${app.jobId ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
                          {getJobTitle(app.jobId)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Mail size={12} /> {app.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Phone size={12} /> {app.phoneNumber}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {new Date(app.createdAt).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                      <td className="p-4">
                        {app.resume ? (
                          <a
                            href={app.resume.startsWith('http') ? app.resume : getImageUrl(app.resume)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-secondary hover:underline font-medium"
                          >
                            <FileText size={16} />
                            View CV
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-slate-400">No CV</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setExpandedAppId(expandedAppId === app.id ? null : app.id)}
                            className="text-slate-400 hover:text-secondary p-2 hover:bg-slate-50 rounded-lg transition"
                            title="View details (Cover Letter, Experience, etc.)"
                          >
                            {expandedAppId === app.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: app.id, name: app.fullName })}
                            className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                            title="Delete Application"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedAppId === app.id && (
                      <tr className="bg-slate-50/50 border-b">
                        <td colSpan={6} className="p-4">
                          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-4">
                            <h4 className="font-bold text-slate-800 text-base border-b pb-2">Application Details</h4>
                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                              {app.currentCtc && (
                                <div>
                                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Current Annual CTC</span>
                                  <span className="text-slate-800 text-sm font-semibold">{app.currentCtc}</span>
                                </div>
                              )}
                              {app.currentLocation && (
                                <div>
                                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Current Location</span>
                                  <span className="text-slate-700 text-sm">{app.currentLocation}</span>
                                </div>
                              )}
                              {app.preferredLocation && (
                                <div>
                                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Preferred Location</span>
                                  <span className="text-slate-700 text-sm">{app.preferredLocation}</span>
                                </div>
                              )}
                              {app.experience && (
                                <div>
                                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Total Experience</span>
                                  <span className="text-slate-700 text-sm">{app.experience} Years</span>
                                </div>
                              )}
                              {app.industry && (
                                <div>
                                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Target Industry</span>
                                  <span className="text-slate-700 text-sm">{app.industry}</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold mb-1">Cover Letter / Message</span>
                              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                                {app.message || <em className="text-slate-400">No message provided by the applicant.</em>}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
          totalResults={filteredApplications.length}
          indexOfFirst={indexOfFirstItem}
          indexOfLast={indexOfLastItem}
        />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Job Application"
        itemName={deleteModal.name}
      />
    </div>
  );
};

export default ApplicationsListPage;

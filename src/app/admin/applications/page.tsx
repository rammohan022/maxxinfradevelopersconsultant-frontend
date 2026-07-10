"use client";

import { useState } from "react";
import { Trash2, Search, FileText, ExternalLink, Calendar, User, Mail, Phone } from "lucide-react";
import { useGetJobApplicationsQuery, useDeleteJobApplicationMutation } from "@/services/jobApplication";
import { useGetCareersQuery } from "@/services/career";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

const ApplicationsListPage = () => {
  const { data: applications = [], isLoading, isError } = useGetJobApplicationsQuery();
  const { data: careers = [] } = useGetCareersQuery();
  const [deleteApplication] = useDeleteJobApplicationMutation();
  const [search, setSearch] = useState("");

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  // Map jobId to job title
  const getJobTitle = (jobId: string) => {
    const job = careers.find((j) => j.id === jobId);
    return job ? job.title : "Unknown Position";
  };

  const filteredApplications = (applications || []).filter((app) =>
    (app.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (app.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (getJobTitle(app.jobId)).toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteApplication(deleteModal.id).unwrap();
      toast.success("Application deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete application.");
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">Loading applications...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading applications. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Job Applications</h1>
          <p className="text-gray-500 text-sm">
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
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-10 text-gray-400">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {app.fullName.charAt(0)}
                        </div>
                        <div className="font-medium text-navy">{app.fullName}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
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
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      {app.resume ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-primary hover:underline font-medium"
                        >
                          <FileText size={16} />
                          View CV
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-slate-400">No file</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, id: app.id, name: app.fullName })}
                        className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                        title="Delete Application"
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

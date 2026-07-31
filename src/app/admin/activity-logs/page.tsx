"use client";

import { useState } from "react";
import {
  useGetActivityLogsQuery,
  useClearActivityLogsMutation,
  ActivityLogItem,
} from "@/services/activityLog";
import {
  History,
  Search,
  Trash2,
  PlusCircle,
  RefreshCw,
  XCircle,
  Shield,
  Sparkles,
  User,
  Filter,
  Clock,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminPagination from "../components/AdminPagination";
import DeleteModal from "../components/DeleteModal";
import { useGetProfileQuery } from "@/services/auth";

export default function ActivityLogsAdminPage() {
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const userRole = (profile?.role || "").toLowerCase();

  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState("ALL");
  const [selectedAction, setSelectedAction] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const itemsPerPage = 20;

  const { data, isLoading } = useGetActivityLogsQuery(
    {
      search: search || undefined,
      module: selectedModule,
      action: selectedAction,
      page: currentPage,
      limit: itemsPerPage,
    },
    { skip: userRole !== "admin" && userRole !== "superadmin" }
  );

  const [clearLogs, { isLoading: isClearing }] = useClearActivityLogsMutation();

  const handleClearLogsConfirm = async () => {
    try {
      await clearLogs().unwrap();
      toast.success("Activity logs history cleared successfully!");
      setClearModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear activity logs.");
    }
  };

  const logs = data?.logs || [];
  const totalLogs = data?.total || 0;
  const totalPages = Math.ceil(totalLogs / itemsPerPage) || 1;

  const renderActionBadge = (action: string) => {
    const act = (action || "").toUpperCase();
    if (act === "CREATE") {
      return (
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
          <PlusCircle size={12} /> Create
        </span>
      );
    }
    if (act === "UPDATE") {
      return (
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
          <RefreshCw size={12} /> Update
        </span>
      );
    }
    if (act === "DELETE") {
      return (
        <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
          <Trash2 size={12} /> Delete
        </span>
      );
    }
    if (act === "LOGIN") {
      return (
        <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
          <Shield size={12} /> Login
        </span>
      );
    }
    if (act === "AI_GENERATE" || act === "AI") {
      return (
        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
          <Sparkles size={12} /> AI Action
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 border border-gray-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
        {action}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  if (isProfileLoading || isLoading) return <div className="p-6 text-center text-slate-500">Loading activity logs...</div>;

  if (profile && userRole !== "admin" && userRole !== "superadmin") {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border shadow-xs my-8 space-y-3">
        <Shield size={48} className="mx-auto text-red-500" />
        <h2 className="text-xl font-bold text-slate-800">Access Restricted</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Activity & Audit Logs are strictly restricted to Admin users. You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight flex items-center gap-2">
            <History className="text-secondary" size={24} /> Activity & Audit Logs
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Real-time activity tracking of user actions, content updates, logins, and AI operations.
          </p>
        </div>

        <button
          onClick={() => setClearModalOpen(true)}
          disabled={isClearing || logs.length === 0}
          className="flex items-center gap-1.5 border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50"
        >
          <Trash2 size={14} /> Clear Log History
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by User, Email, or Action description..."
              className="w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-secondary/20 outline-none"
            />
          </div>

          {/* Module Filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            <select
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl px-3 py-2 text-xs font-medium bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Modules</option>
              <option value="Auth">Auth & Security</option>
              <option value="Blogs">Blogs</option>
              <option value="Services">Services</option>
              <option value="Users">Team & Users</option>
              <option value="SEO">SEO Settings</option>
              <option value="Settings">Site Settings</option>
              <option value="Banners">Hero Banners</option>
              <option value="Leads">Leads & Applications</option>
            </select>
          </div>

          {/* Action Filter */}
          <div>
            <select
              value={selectedAction}
              onChange={(e) => {
                setSelectedAction(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl px-3 py-2 text-xs font-medium bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="LOGIN">Login</option>
              <option value="AI_GENERATE">AI Action</option>
            </select>
          </div>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Total Logs: <span className="text-slate-800">{totalLogs}</span>
        </div>
      </div>

      {/* Logs Table / List */}
      <div className="bg-white rounded-2xl border shadow-xs overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3.5">User</th>
              <th className="p-3.5">Action</th>
              <th className="p-3.5">Module</th>
              <th className="p-3.5">Description</th>
              <th className="p-3.5 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-400">
                  No activity logs found.
                </td>
              </tr>
            ) : (
              logs.map((log: ActivityLogItem) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  {/* User */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
                        {log.userName ? log.userName[0] : "U"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{log.userName || "System User"}</div>
                        <div className="text-[11px] text-slate-400">{log.userEmail || "admin"}</div>
                      </div>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="p-3.5">{renderActionBadge(log.action)}</td>

                  {/* Module */}
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border text-[11px]">
                      {log.module || "General"}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="p-3.5 max-w-md">
                    <p className="text-slate-800 font-medium leading-relaxed">{log.description}</p>
                  </td>

                  {/* Timestamp */}
                  <td className="p-3.5 text-right whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    <span className="flex items-center justify-end gap-1 text-slate-400">
                      <Clock size={12} /> {formatDate(log.createdAt)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalResults={totalLogs}
          indexOfFirst={(currentPage - 1) * itemsPerPage + 1}
          indexOfLast={Math.min(currentPage * itemsPerPage, totalLogs)}
        />
      )}

      {/* Clear Logs Modal */}
      <DeleteModal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        onConfirm={handleClearLogsConfirm}
        title="Clear Activity Logs History"
        itemName="All Activity Log Entries"
        isLoading={isClearing}
      />
    </div>
  );
}

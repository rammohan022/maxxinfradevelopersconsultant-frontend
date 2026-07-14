"use client";

import SideNav from "@/components/layout/SideNav";
import { Users, FileText, Layers, BarChart3, Loader2 } from "lucide-react";
import { useGetDashboardStatsQuery } from "@/services/dashboard";

const Dashboard = () => {
  const { data: stats, isLoading, isError, error } = useGetDashboardStatsQuery();

  if (isError) {
    console.error("Dashboard Stats Error:", error);
  }

  const statsData = [
    { title: "Total Leads", value: stats?.totalLeads || 0, icon: Users },
    { title: "Blog Posts", value: stats?.totalBlogs || 0, icon: FileText },
    { title: "Services", value: stats?.totalServices || stats?.totalPracticeAreas || 0, icon: Layers },
    { title: "Teams Members", value: stats?.totalMembers || 0, icon: BarChart3 },
  ];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">
          CMS Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Manage leads, blogs, and services from one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {statsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-3 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h3 className="text-2xl font-bold text-[rgb(13_33_55)]">
                    {item.value}
                  </h3>
                </div>
                <div className="p-3 rounded-lg bg-[rgb(13_33_55/0.08)]">
                  <Icon className="text-[rgb(13_33_55)]" size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-3 shadow-sm border">
        <h3 className="text-lg font-semibold text-[rgb(13_33_55)] mb-4">
          Recent Leads
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b">
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats?.latestLeads && stats.latestLeads.length > 0 ? (
              stats.latestLeads.map((lead) => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-slate-50 transition">
                  <td className="py-2 font-medium">{lead.fullName}</td>
                  <td className="text-slate-500">
                    {lead.email}
                  </td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                      New
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-500">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;

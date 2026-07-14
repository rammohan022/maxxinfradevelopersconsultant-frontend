"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useGetMembersQuery, useDeleteMemberMutation } from "@/services/member";
import Image from "next/image";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function OurTeamPage() {
  const { data: members = [], isLoading, isError } = useGetMembersQuery();
  const [deleteMember] = useDeleteMemberMutation();
  const [search, setSearch] = useState("");

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const filteredMembers = (members || []).filter((member) =>
    (member.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (member.designation || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteMember(deleteModal.id).unwrap();
      toast.success("Team member removed successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete team member.");
    }
  };

  if (isLoading) return <div className="p-6 text-center text-slate-500">Loading team...</div>;
  if (isError) return <div className="p-6 text-center text-red-500">Error loading team members.</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Team Members</h1>
          <p className="text-gray-500 text-sm">Manage your legal professionals and staff</p>
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
              placeholder="Search team..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            href="/admin/our-team/create"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-medium"
          >
            <Plus size={18} /> Add Member
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Member</th>
                <th className="p-4 text-left whitespace-nowrap">Designation</th>
                <th className="p-4 text-left whitespace-nowrap">Category</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400">No team members found.</td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                      <div className="relative w-10 h-10 overflow-hidden rounded-full border bg-slate-100 flex-shrink-0">
                        <Image
                          src={getImageUrl(member.profileImage) || "/images/team-placeholder.jpg"}
                          alt={member.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-navy">{member.fullName}</span>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{member.designation}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{member.category || "N/A"}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${member.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/our-team/edit?id=${member.id}`}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: member.id, name: member.fullName })}
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
        title="Remove Team Member"
        itemName={deleteModal.name}
      />
    </div>
  );
}

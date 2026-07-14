"use client";

import { useState } from "react";
import { useGetPrivacyPoliciesQuery, useDeletePrivacyPolicyMutation } from "@/services/legal";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

export default function PrivacyPolicyPage() {
  const { data: policies = [], isLoading, isError } = useGetPrivacyPoliciesQuery();
  const [deletePolicy] = useDeletePrivacyPolicyMutation();

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const handleDelete = async () => {
    try {
      await deletePolicy(deleteModal.id).unwrap();
      toast.success("Policy deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete policy.");
    }
  };

  if (isLoading) return <div className="p-6 text-center text-slate-500">Loading policies...</div>;
  if (isError) return <div className="p-6 text-center text-red-500">Error loading privacy policies.</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Privacy Policy Management</h1>
          <p className="text-gray-500 text-sm">Manage website privacy policies</p>
        </div>

        <Link
          href="/admin/privacy-policy/create"
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition"
        >
          <Plus size={18} /> Add Policy
        </Link>
      </div>

      <div className="bg-white border rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Title</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Last Updated</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id} className="border-b hover:bg-slate-50 transition">
                  <td className="p-4 font-medium">{policy.title}</td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${policy.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {policy.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-500">
                    {new Date(policy.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/privacy-policy/edit?id=${policy.id}`}
                        className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => setDeleteModal({ isOpen: true, id: policy.id, name: policy.title })}
                        className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {policies.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-10 text-gray-400">
                    No privacy policies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Policy"
        itemName={deleteModal.name}
      />
    </>
  );
}

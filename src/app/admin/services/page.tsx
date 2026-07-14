"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useGetServicesQuery, useDeleteServiceMutation } from "@/services/services";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";

const ServicesPage = () => {
  const { data: practiceAreas = [], isLoading, isError } = useGetServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [search, setSearch] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const filteredAreas = (practiceAreas || []).filter((area: any) =>
    (area?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAreas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAreas = filteredAreas.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async () => {
    try {
      await deleteService(deleteModal.id).unwrap();
      toast.success("Service deleted successfully!");
      setDeleteModal({ isOpen: false, id: "", name: "" });
      if (currentAreas.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete service.");
    }
  };

  if (isLoading) return <div className="p-3 text-center text-slate-500">Loading...</div>;
  if (isError) return <div className="p-3 text-center text-red-500">Failed to load services</div>;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">
            Services
          </h1>
          <p className="text-sm text-slate-500">
            Manage all service pages
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
              placeholder="Search services..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Link
            href="/admin/services/create"
            className="flex items-center gap-2 bg-secondary text-white px-3 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-medium"
          >
            <Plus size={16} />
            Add Service
          </Link>
        </div>
      </div>

      {/* RESPONSIVE Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-3 py-2 whitespace-nowrap">Service Name</th>
                <th className="text-left px-3 py-2 min-w-[300px]">Description</th>
                <th className="text-left px-3 py-2 whitespace-nowrap text-center">Services Count</th>
                <th className="text-center px-3 py-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentAreas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-400">
                    No practice areas found
                  </td>
                </tr>
              ) : (
                currentAreas.map((item: any) => (
                  <tr key={item.id} className="border-t hover:bg-slate-50 transition align-top">
                    <td className="px-3 py-2 font-semibold text-[rgb(13_33_55)] whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-3 py-2 text-slate-500 leading-relaxed min-w-[300px]">
                      <div className="line-clamp-2">
                        {item.overview?.replace(/<[^>]*>?/gm, "")}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">
                        {item.services?.length || 0} Sub-services
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/services/edit?id=${item.id}`}
                          className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id.toString(), name: item.title })}
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

        {/* Pagination Controls */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalResults={filteredAreas.length}
          indexOfFirst={indexOfFirstItem}
          indexOfLast={indexOfLastItem}
        />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "" })}
        onConfirm={handleDelete}
        title="Delete Service"
        itemName={deleteModal.name}
      />
    </>
  );
};

export default ServicesPage;

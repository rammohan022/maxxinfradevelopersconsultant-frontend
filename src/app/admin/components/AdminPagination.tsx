"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage?: (page: number) => void;
  onPageChange?: (page: number) => void;
  totalResults?: number;
  indexOfFirst?: number;
  indexOfLast?: number;
  itemsPerPage?: number;
}

export default function AdminPagination({
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
  onPageChange,
  totalResults,
  indexOfFirst,
  indexOfLast,
  itemsPerPage = 10,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (setCurrentPage) {
      setCurrentPage(validPage);
    } else if (onPageChange) {
      onPageChange(validPage);
    }
  };

  // Safe range calculations preventing any NaN
  const hasTotal = typeof totalResults === "number" && !isNaN(totalResults) && totalResults >= 0;
  
  const start =
    typeof indexOfFirst === "number" && !isNaN(indexOfFirst)
      ? indexOfFirst + 1
      : (currentPage - 1) * itemsPerPage + 1;

  const end =
    typeof indexOfLast === "number" && !isNaN(indexOfLast)
      ? hasTotal
        ? Math.min(indexOfLast, totalResults!)
        : indexOfLast
      : hasTotal
      ? Math.min(currentPage * itemsPerPage, totalResults!)
      : currentPage * itemsPerPage;

  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-white px-3 py-2">
      {/* Mobile buttons */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {hasTotal ? (
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{Math.min(start, end)}</span> to{" "}
              <span className="font-semibold text-slate-700">{end}</span> of{" "}
              <span className="font-semibold text-slate-700">{totalResults}</span> results
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Page <span className="font-semibold text-slate-700">{currentPage}</span> of{" "}
              <span className="font-semibold text-slate-700">{totalPages}</span>
            </p>
          )}
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center rounded-l-md px-1.5 py-1 text-slate-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-3 py-1 text-xs font-semibold focus:z-20 ${
                  currentPage === page
                    ? "z-10 bg-secondary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    : "text-slate-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center rounded-r-md px-1.5 py-1 text-slate-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

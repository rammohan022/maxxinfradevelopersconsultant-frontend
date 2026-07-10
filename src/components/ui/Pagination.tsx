import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  from?: number;
  to?: number;
  totalItems?: number;
};

const PaginationSection = ({
  currentPage = 1,
  totalPages = 9,
  from = 1,
  to = 18,
  totalItems = 156,
}: PaginationProps) => {
  const pages = [1, 2, 3, 4];

  return (
    <section className="bg-white pb-10">
      <Container>
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          {/* Info */}
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-navy">
              {from}-{to}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-navy">
              {totalItems}
            </span>{" "}
            articles
          </p>

          {/* Pagination */}
          <div className="flex items-center space-x-2">
            {/* Prev */}
            <button
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-[22px] w-4" />
            </button>

            {/* Page numbers */}
            {pages.map((page) => (
              <button
                key={page}
                className={`rounded-lg px-4 py-2 font-semibold transition-colors ${page === currentPage
                    ? "bg-navy text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Ellipsis */}
            <span className="px-2 text-gray-500">…</span>

            {/* Last page */}
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
              {totalPages}
            </button>

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-[22px] w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PaginationSection;

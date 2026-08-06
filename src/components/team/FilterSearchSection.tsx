"use client";

import { Container } from "@/components/ui"
import { motion } from "framer-motion"

interface FilterSearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPracticeArea: string;
  onPracticeAreaChange: (value: string) => void;
  practiceAreas: string[];
  onReset: () => void;
}

const FilterSearchSection = ({
  searchQuery,
  onSearchChange,
  selectedPracticeArea,
  onPracticeAreaChange,
  practiceAreas,
  onReset
}: FilterSearchSectionProps) => {
  return (
    <section
      id="filter-search-section"
      className="border-t border-gray-100 bg-white py-12 md:py-16 shadow-sm relative z-10"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-end justify-between gap-6 lg:gap-8 rounded-2xl bg-gray-50 p-6 sm:p-8 lg:p-10 border border-gray-100"
        >
          {/* Search by Name */}
          <div className="flex-1 w-full">
            <label className="mb-2.5 block text-sm font-bold tracking-wider text-gray-700">
              Search by Name
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter attorney name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 pr-12 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 placeholder:text-gray-400 font-medium"
              />

              {/* Search Icon */}
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors">
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Service */}
          <div className="flex-1 w-full">
            <label className="mb-2.5 block text-sm font-bold tracking-wider text-gray-700">
              Service
            </label>
            <div className="relative">
              <select
                value={selectedPracticeArea}
                onChange={(e) => onPracticeAreaChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 appearance-none font-medium text-gray-700 cursor-pointer"
              >
                <option value="">All Services</option>
                {practiceAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex-1 w-full">
            <label className="mb-2.5 block text-sm font-bold tracking-wider text-gray-700">
              Location
            </label>
            <div className="relative">
              <select className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 appearance-none font-medium text-gray-700 cursor-pointer">
                <option>All Locations</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>London</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="flex-shrink-0 w-full lg:w-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={onReset}
              className="w-full lg:w-auto rounded-xl bg-navy px-8 py-3.5 font-bold tracking-wider text-white transition-all duration-300 hover:bg-primary shadow-md hover:shadow-lg active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FilterSearchSection;

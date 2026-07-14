"use client";

import CareerForm from "../components/CareerForm";

export default function CareerCreatePage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Create New Career Opportunity</h1>
        <p className="text-gray-500 text-sm">Post a new job opening for applicants</p>
      </div>
      <CareerForm />
    </div>
  );
}

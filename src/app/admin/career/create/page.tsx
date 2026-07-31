"use client";

import CareerForm from "../components/CareerForm";

export default function CareerCreatePage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Create New Career Opportunity</h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Post a new job opening for applicants</p>
      </div>
      <CareerForm />
    </div>
  );
}

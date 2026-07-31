"use client";

import TestimonialForm from "../components/TestimonialForm";

export default function CreateTestimonialPage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Create Testimonial</h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Add client feedback and recommendations</p>
      </div>
      <TestimonialForm />
    </div>
  );
}

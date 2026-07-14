"use client";

import TestimonialForm from "../components/TestimonialForm";

export default function CreateTestimonialPage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Create Testimonial</h1>
        <p className="text-gray-500 text-sm">Add client feedback and recommendations</p>
      </div>
      <TestimonialForm />
    </div>
  );
}

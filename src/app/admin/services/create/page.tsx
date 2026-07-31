"use client";

import ServiceForm from "../components/ServiceForm";

export default function ServiceCreatePage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-3 text-primary tracking-tight">Create Service</h1>
      <ServiceForm />
    </div>
  );
}

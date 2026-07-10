"use client";

import { useSearchParams } from "next/navigation";
import { useGetTestimonialByIdQuery } from "@/services/testimonial";
import TestimonialForm from "../components/TestimonialForm";

export default function EditTestimonialPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: testimonial, isLoading, isError } = useGetTestimonialByIdQuery(id as string, {
        skip: !id,
    });

    if (isLoading) return <div className="p-6 text-center text-slate-500">Loading testimonial details...</div>;
    if (!id || isError || !testimonial) return <div className="p-6 text-center text-red-500">Error loading testimonial.</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-navy">Edit Testimonial</h1>
            <TestimonialForm initialData={testimonial} isEdit />
        </div>
    );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useGetCareerByIdQuery } from "@/services/career";
import CareerForm from "../components/CareerForm";

export default function EditCareerPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: career, isLoading, isError } = useGetCareerByIdQuery(id as string, {
        skip: !id,
    });

    if (isLoading) return <div className="p-6 text-center text-slate-500">Loading career details...</div>;
    if (!id || isError || !career) return <div className="p-6 text-center text-red-500">Error loading career opportunity.</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-navy">Edit Career Opportunity</h1>
            <CareerForm initialData={career} isEdit />
        </div>
    );
}

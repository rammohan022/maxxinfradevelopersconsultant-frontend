"use client";

import { useSearchParams } from "next/navigation";
import { useGetPracticeAreaByIdQuery } from "@/services/practice-area";
import PracticeAreaForm from "../components/PracticeAreaForm";

export default function EditPracticeAreaPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: area, isLoading, isError } = useGetPracticeAreaByIdQuery(id as string, {
        skip: !id,
    });

    if (isLoading) return <div className="p-6 text-center text-slate-500">Loading practice area details...</div>;
    if (!id || isError || !area) return <div className="p-6 text-center text-red-500">Error loading practice area.</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-navy">Edit Practice Area</h1>
            <PracticeAreaForm initialData={area} isEdit />
        </div>
    );
}

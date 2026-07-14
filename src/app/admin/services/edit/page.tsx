"use client";

import { useSearchParams } from "next/navigation";
import { useGetServiceByIdQuery } from "@/services/services";
import ServiceForm from "../components/ServiceForm";

export default function EditServicePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: area, isLoading, isError } = useGetServiceByIdQuery(id as string, {
        skip: !id,
    });

    if (isLoading) return <div className="p-6 text-center text-slate-500">Loading service details...</div>;
    if (!id || isError || !area) return <div className="p-6 text-center text-red-500">Error loading service.</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-navy">Edit Service</h1>
            <ServiceForm initialData={area} isEdit />
        </div>
    );
}

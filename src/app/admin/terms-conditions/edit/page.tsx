"use client";

import { useSearchParams } from "next/navigation";
import { useGetTermsConditionsQuery, useUpdateTermsConditionMutation } from "@/services/legal";
import LegalForm from "../../components/LegalForm";

export default function EditTermsPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: terms = [], isLoading: isFetching } = useGetTermsConditionsQuery();
    const [updateTerms, { isLoading: isUpdating }] = useUpdateTermsConditionMutation();

    const doc = terms.find(t => t.id === id);

    const handleSave = async (data: any) => {
        if (!id) return;
        return updateTerms({ id, data }).unwrap();
    };

    if (isFetching) return <div className="p-6 text-center text-slate-500">Loading document...</div>;
    if (!id || !doc) return <div className="p-6 text-center text-red-500">Document not found.</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Terms & Conditions</h1>
            <LegalForm
                type="terms"
                initialData={doc}
                isEdit
                onSave={handleSave}
                isLoading={isUpdating}
            />
        </div>
    );
}

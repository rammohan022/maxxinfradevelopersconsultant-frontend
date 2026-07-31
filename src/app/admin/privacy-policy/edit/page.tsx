"use client";

import { useSearchParams } from "next/navigation";
import { useGetPrivacyPoliciesQuery, useUpdatePrivacyPolicyMutation } from "@/services/legal";
import LegalForm from "../../components/LegalForm";

export default function EditPrivacyPolicyPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: policies = [], isLoading: isFetching } = useGetPrivacyPoliciesQuery();
    const [updatePolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();

    const policy = policies.find(p => p.id === id);

    const handleSave = async (data: any) => {
        if (!id) return;
        return updatePolicy({ id, data }).unwrap();
    };

    if (isFetching) return <div className="p-3 text-center text-slate-500">Loading document...</div>;
    if (!id || !policy) return <div className="p-3 text-center text-red-500">Document not found.</div>;

    return (
        <div>
            <h1 className="text-xl md:text-2xl font-bold mb-3 text-primary tracking-tight">Edit Privacy Policy</h1>
            <LegalForm
                type="privacy"
                initialData={policy}
                isEdit
                onSave={handleSave}
                isLoading={isUpdating}
            />
        </div>
    );
}

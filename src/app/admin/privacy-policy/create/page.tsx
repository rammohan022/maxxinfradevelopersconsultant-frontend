"use client";

import LegalForm from "../../components/LegalForm";
import { useCreatePrivacyPolicyMutation } from "@/services/legal";

export default function CreatePrivacyPolicyPage() {
    const [createPolicy, { isLoading }] = useCreatePrivacyPolicyMutation();

    const handleSave = async (data: any) => {
        return createPolicy(data).unwrap();
    };

    return (
        <div>
            <div className="mb-3">
                <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Create Privacy Policy</h1>
                <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Draft a new version of the privacy policy</p>
            </div>
            <LegalForm type="privacy" onSave={handleSave} isLoading={isLoading} />
        </div>
    );
}

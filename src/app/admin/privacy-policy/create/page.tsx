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
            <h1 className="text-2xl font-bold mb-6">Create Privacy Policy</h1>
            <LegalForm type="privacy" onSave={handleSave} isLoading={isLoading} />
        </div>
    );
}

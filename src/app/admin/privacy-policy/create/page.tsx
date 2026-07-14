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
                <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Create Privacy Policy</h1>
                <p className="text-gray-500 text-sm">Draft a new version of the privacy policy</p>
            </div>
            <LegalForm type="privacy" onSave={handleSave} isLoading={isLoading} />
        </div>
    );
}

"use client";

import LegalForm from "../../components/LegalForm";
import { useCreateTermsConditionMutation } from "@/services/legal";

export default function CreateTermsPage() {
  const [createTerms, { isLoading }] = useCreateTermsConditionMutation();

  const handleSave = async (data: any) => {
    return createTerms(data).unwrap();
  };

  return (
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Create Terms & Conditions</h1>
        <p className="text-gray-500 text-sm">Draft a new version of the terms and conditions</p>
      </div>
      <LegalForm type="terms" onSave={handleSave} isLoading={isLoading} />
    </div>
  );
}

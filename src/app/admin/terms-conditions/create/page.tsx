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
      <h1 className="text-2xl font-bold mb-6">Create Terms & Conditions</h1>
      <LegalForm type="terms" onSave={handleSave} isLoading={isLoading} />
    </div>
  );
}

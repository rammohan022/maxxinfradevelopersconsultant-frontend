"use client";

import { useSearchParams } from "next/navigation";
import { useGetMemberByIdQuery } from "@/services/member";
import MemberForm from "../components/MemberForm";

export default function EditMemberPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: member, isLoading, isError } = useGetMemberByIdQuery(id as string, {
        skip: !id,
    });

    if (isLoading) return <div className="p-3 text-center text-slate-500">Loading member details...</div>;
    if (!id || isError || !member) return <div className="p-3 text-center text-red-500">Error loading team member profile.</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3 text-[rgb(13_33_55)]">Edit Team Member</h1>
            <MemberForm initialData={member} isEdit />
        </div>
    );
}

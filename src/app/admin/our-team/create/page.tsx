"use client";

import MemberForm from "../components/MemberForm";

export default function OurTeamCreatePage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Create Team Member</h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Add a new professional member to the team</p>
      </div>
      <MemberForm />
    </div>
  );
}

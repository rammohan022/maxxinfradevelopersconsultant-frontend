"use client";

import MemberForm from "../components/MemberForm";

export default function OurTeamCreatePage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Create Team Member</h1>
        <p className="text-gray-500 text-sm">Add a new professional member to the team</p>
      </div>
      <MemberForm />
    </div>
  );
}

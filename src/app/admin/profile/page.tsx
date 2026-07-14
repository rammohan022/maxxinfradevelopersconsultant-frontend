"use client";

import { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } from "@/services/auth";
import toast from "react-hot-toast";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      await changePassword(passwordForm).unwrap();
      toast.success("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.error("Password change failed:", err);
      toast.error(err?.data?.message || "Failed to change password.");
    }
  };

  if (isLoading) return <div className="p-3 text-center text-slate-500">Loading profile...</div>;
  if (isError) return <div className="p-3 text-center text-red-500">Error loading profile information.</div>;

  return (
    <>
      {/* Page Title */}
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">
          Admin Profile
        </h1>
        <p className="text-gray-500 text-sm">
          View and update your personal information and password settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-3">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition ${activeTab === "profile"
            ? "border-b-2 border-secondary text-secondary"
            : "text-slate-500 hover:text-secondary"
            }`}
        >
          <User size={16} />
          Profile Info
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition ${activeTab === "password"
            ? "border-b-2 border-secondary text-secondary"
            : "text-slate-500 hover:text-secondary"
            }`}
        >
          <Lock size={16} />
          Change Password
        </button>
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className="bg-white p-3 rounded-xl shadow-sm border">


          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-secondary font-medium text-white px-3 py-2 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= PASSWORD TAB ================= */}
      {activeTab === "password" && (
        <div className="bg-white p-3 rounded-xl shadow-sm border">
          <form onSubmit={handlePasswordSubmit} className="grid gap-3 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-secondary font-medium text-white px-3 py-2 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50"
              >
                {isChangingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

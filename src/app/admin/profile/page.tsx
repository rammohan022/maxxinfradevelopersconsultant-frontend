"use client";

import { useState, useEffect } from "react";
import { User, Lock, Upload, Globe, Link2 } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } from "@/services/auth";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    facebookUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    twitterUrl: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

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
        facebookUrl: profile.facebookUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
        instagramUrl: profile.instagramUrl || "",
        twitterUrl: profile.twitterUrl || "",
      });
      if (profile.profilePhoto) {
        setPhotoPreview(getImageUrl(profile.profilePhoto));
      }
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fullName", form.fullName);
      data.append("email", form.email);
      data.append("phoneNumber", form.phoneNumber);
      data.append("facebookUrl", form.facebookUrl);
      data.append("linkedinUrl", form.linkedinUrl);
      data.append("instagramUrl", form.instagramUrl);
      data.append("twitterUrl", form.twitterUrl);
      if (photoFile) {
        data.append("profilePhoto", photoFile);
      }

      await updateProfile(data).unwrap();
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
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Avatar Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border bg-slate-50 flex items-center justify-center">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-slate-400" />
                )}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-semibold text-slate-800 text-sm">Profile Photo</h4>
                <p className="text-xs text-slate-500">Supports PNG, JPG, JPEG. Max size 2MB.</p>
                <label className="flex items-center justify-center sm:justify-start gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition w-fit mx-auto sm:mx-0">
                  <Upload size={14} />
                  Choose Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                />
              </div>
            </div>

            {/* Social Links Sub-Section */}
            <div className="pt-4 border-t space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Globe size={16} className="text-secondary" />
                Social Media Profiles
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    name="facebookUrl"
                    placeholder="https://facebook.com/username"
                    value={form.facebookUrl}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/username"
                    value={form.linkedinUrl}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    name="instagramUrl"
                    placeholder="https://instagram.com/username"
                    value={form.instagramUrl}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    name="twitterUrl"
                    placeholder="https://twitter.com/username"
                    value={form.twitterUrl}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-secondary font-semibold text-white px-4 py-2.5 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50 text-sm shadow-md shadow-secondary/10"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= PASSWORD TAB ================= */}
      {activeTab === "password" && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <form onSubmit={handlePasswordSubmit} className="grid gap-4 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition"
              />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-secondary font-semibold text-white px-4 py-2.5 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50 text-sm"
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

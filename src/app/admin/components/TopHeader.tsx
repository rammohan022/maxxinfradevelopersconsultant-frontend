"use client";

import { useState, useRef, useEffect } from "react";
import { useGetProfileQuery, useLogoutMutation } from "@/services/auth";
import { removeAuthToken } from "@/lib/utils/TokenHelper";
import { User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function TopHeader() {
  const { data: profile } = useGetProfileQuery();
  const [logoutApi] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (err) {
      console.error("Logout API call error:", err);
    } finally {
      removeAuthToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-3 sticky top-0 z-40 shadow-sm">
      <div className="text-slate-500 font-medium text-sm">
        Welcome to Admin Portal
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition"
        >
          <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold overflow-hidden border">
            {profile?.profilePhoto ? (
              <img src={getImageUrl(profile.profilePhoto)} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              profile?.name?.charAt(0).toUpperCase() || <User size={18} />
            )}
          </div>
          <div className="text-left hidden md:block">
            <div className="text-sm font-semibold text-slate-800 leading-tight">
              {profile?.name || "Admin"}
            </div>
            <div className="text-xs text-slate-400">
              {profile?.role || "Administrator"}
            </div>
          </div>
          <ChevronDown size={16} className="text-slate-500" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-xs text-slate-400">Signed in as</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{profile?.email}</p>
            </div>
            
            <Link
              href="/admin/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
            >
              <User size={16} className="text-slate-500" />
              My Profile
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50/50 transition border-t border-slate-100 text-left font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

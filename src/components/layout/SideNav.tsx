"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Layers,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/lib/utils/TokenHelper";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Job Post", href: "/admin/career", icon: Users },
  { name: "Job Applications", href: "/admin/applications", icon: FileText },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: Users },
  { name: "Privacy Policy", href: "/admin/privacy-policy", icon: FileText },
  { name: "Terms & Conditions", href: "/admin/terms-conditions", icon: FileText },
  { name: "Profile", href: "/admin/profile", icon: Settings },
];

const SideNav = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Remove auth token from cookies
    removeAuthToken();
    // Redirect to login page and force a hard refresh
    window.location.href = "/login";
  };

  return (
    <aside
      className="w-64 max-h-screen sticky top-0 text-white flex flex-col justify-between"
      style={{ backgroundColor: "rgb(13 33 55)" }}
    >
      <div>
        {/* Logo */}
        <div className="px-4 py-3 border-b border-white/10 flex justify-center">
          <Link href="/admin/dashboard">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={220}
              height={60}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
        {/* Menu */}
        <nav className="flex-1 mt-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-white/10 transition"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Bottom Logout */}
      <div className="border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center text-red-500 gap-3 px-6 py-4 font-semibold hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNav;

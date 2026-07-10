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
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { name: "Practice Areas", href: "/admin/practice-area", icon: Layers },
  { name: "Career Opportunities", href: "/admin/career", icon: Users },
  { name: "Job Applications", href: "/admin/applications", icon: FileText },
  { name: "Our Team", href: "/admin/our-team", icon: Users },
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
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/admin/dashboard">
            <Image 
              src="/img/logo.png" 
              alt="Logo" 
              width={150} 
              height={40} 
              className="h-10 w-auto"
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
          className="w-full flex items-center text-red-700 gap-3 px-6 py-4 font-semibold hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNav;

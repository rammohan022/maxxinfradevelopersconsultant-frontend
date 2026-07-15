"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Layers,
  Settings,
  LogOut,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { removeAuthToken } from "@/lib/utils/TokenHelper";

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon: any;
  subItems?: SubItem[];
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    name: "Services",
    icon: Layers,
    subItems: [
      { name: "All Services", href: "/admin/services" },
      { name: "Categories", href: "/admin/service-categories" },
    ],
  },
  {
    name: "Careers",
    icon: Users,
    subItems: [
      { name: "Job Posts", href: "/admin/career" },
      { name: "Job Applications", href: "/admin/applications" },
    ],
  },
  {
    name: "Blogs",
    icon: FileText,
    subItems: [
      { name: "Blog Posts", href: "/admin/blogs" },
      { name: "Blog Categories", href: "/admin/blog-categories" },
    ],
  },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Compliance Library", href: "/admin/website-links", icon: Globe },
  { name: "Testimonials", href: "/admin/testimonials", icon: Users },
  { name: "Privacy Policy", href: "/admin/privacy-policy", icon: FileText },
  { name: "Terms & Conditions", href: "/admin/terms-conditions", icon: FileText },
  { name: "Profile", href: "/admin/profile", icon: Settings },
];

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Track open state for dropdown menus
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Services: pathname.startsWith("/admin/services") || pathname.startsWith("/admin/service-categories"),
    Careers: pathname.startsWith("/admin/career") || pathname.startsWith("/admin/applications"),
    Blogs: pathname.startsWith("/admin/blogs") || pathname.startsWith("/admin/blog-categories"),
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = "/login";
  };

  return (
    <aside
      className="w-64 max-h-screen sticky top-0 text-white flex flex-col justify-between select-none"
      style={{ backgroundColor: "rgb(13 33 55)" }}
    >
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
        {/* Logo */}
        <div className="px-4 py-3 border-b border-white/10 flex justify-center sticky top-0 z-10" style={{ backgroundColor: "rgb(13 33 55)" }}>
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
        <nav className="flex-1 mt-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const hasSubItems = !!item.subItems;
            const isOpen = openMenus[item.name];

            // Check if active
            const isActive = item.href ? pathname === item.href : false;

            if (hasSubItems) {
              return (
                <div key={index} className="space-y-1">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between px-6 py-3 text-sm hover:bg-white/10 transition text-left ${isOpen ? "bg-white/5" : ""
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-white/70" />
                      <span>{item.name}</span>
                    </div>
                    {isOpen ? <ChevronDown size={14} className="text-white/50" /> : <ChevronRight size={14} className="text-white/50" />}
                  </button>

                  {/* Render SubMenu Items */}
                  {isOpen && (
                    <div className="bg-black/20 py-1 pl-12 pr-4 space-y-1">
                      {item.subItems!.map((sub, sIdx) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className={`block py-2 text-xs transition ${isSubActive
                              ? "text-secondary font-bold"
                              : "text-white/70 hover:text-white"
                              }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.href!}
                className={`flex items-center gap-3 px-6 py-3 text-sm hover:bg-white/10 transition ${isActive ? "bg-secondary text-white font-bold" : "text-white/80"
                  }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-white/70"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout */}
      <div className="border-t border-white/10 sticky bottom-0" style={{ backgroundColor: "rgb(13 33 55)" }}>
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

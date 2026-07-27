"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthToken } from "@/lib/utils/TokenHelper";
import { useGetProfileQuery } from "@/services/auth";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MODULE_PERMISSIONS_MAP: { prefix: string; permissionKey: string; allowedRoles?: string[] }[] = [
  { prefix: "/admin/dashboard", permissionKey: "dashboard", allowedRoles: ["admin"] },
  { prefix: "/admin/banners", permissionKey: "banners", allowedRoles: ["admin"] },
  { prefix: "/admin/services", permissionKey: "services", allowedRoles: ["admin"] },
  { prefix: "/admin/service-categories", permissionKey: "services", allowedRoles: ["admin"] },
  { prefix: "/admin/career", permissionKey: "careers", allowedRoles: ["admin", "hr"] },
  { prefix: "/admin/applications", permissionKey: "careers", allowedRoles: ["admin", "hr"] },
  { prefix: "/admin/blogs", permissionKey: "blogs", allowedRoles: ["admin", "editor"] },
  { prefix: "/admin/blog-categories", permissionKey: "blogs", allowedRoles: ["admin", "editor"] },
  { prefix: "/admin/media", permissionKey: "media", allowedRoles: ["admin"] },
  { prefix: "/admin/leads", permissionKey: "leads", allowedRoles: ["admin"] },
  { prefix: "/admin/seo", permissionKey: "seo", allowedRoles: ["admin"] },
  { prefix: "/admin/settings", permissionKey: "settings", allowedRoles: ["admin"] },
  { prefix: "/admin/website-links", permissionKey: "settings", allowedRoles: ["admin"] },
  { prefix: "/admin/users", permissionKey: "users", allowedRoles: ["admin"] },
  { prefix: "/admin/testimonials", permissionKey: "testimonials", allowedRoles: ["admin"] },
  { prefix: "/admin/privacy-policy", permissionKey: "legal", allowedRoles: ["admin"] },
  { prefix: "/admin/terms-conditions", permissionKey: "legal", allowedRoles: ["admin"] },
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(13_33_55)]"></div>
      </div>
    );
  }

  // Check Module Route Permission
  if (profile) {
    const userRole = (profile.role || "user").toLowerCase();
    const userPermissions: string[] = (profile as any)?.permissions || [];

    // Super Admin has 100% access to everything
    if (userRole === "admin" || userRole === "superadmin") {
      return <>{children}</>;
    }

    const match = MODULE_PERMISSIONS_MAP.find((m) => pathname.startsWith(m.prefix));

    if (match && pathname !== "/admin/profile") {
      const hasRoleAccess = match.allowedRoles?.some((r) => r.toLowerCase() === userRole);
      const hasPermissionAccess = userPermissions.includes(match.permissionKey);

      if (!hasRoleAccess && !hasPermissionAccess) {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 w-full">
            <div className="bg-white border rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert size={32} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">Access Restricted</h2>
                <p className="text-sm text-slate-500 mt-1">
                  You do not have permission to access or manage the <strong>{match.permissionKey.toUpperCase()}</strong> module.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/profile"
                  className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-secondary-dark transition shadow"
                >
                  <ArrowLeft size={16} /> Return to My Profile
                </Link>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  return <>{children}</>;
}

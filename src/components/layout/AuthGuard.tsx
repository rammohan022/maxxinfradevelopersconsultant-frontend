"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/utils/TokenHelper";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if token exists in cookies
        const token = getAuthToken();

        if (!token) {
            // Not authenticated, redirect to login
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Optionally, show a loader while checkingauth state to prevent flashing
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(13_33_55)]"></div>
            </div>
        );
    }

    return <>{children}</>;
}

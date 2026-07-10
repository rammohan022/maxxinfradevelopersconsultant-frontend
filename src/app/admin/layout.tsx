import SideNav from "@/components/layout/SideNav";
import AuthGuard from "@/components/layout/AuthGuard";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-slate-100">
                <SideNav />
                <main className="flex-1 p-6 text-[rgb(13_33_55)]">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}

import SideNav from "@/components/layout/SideNav";
import AuthGuard from "@/components/layout/AuthGuard";
import TopHeader from "./components/TopHeader";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-slate-100">
                <SideNav />
                <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                    <TopHeader />
                    <main className="flex-1 p-3 text-[rgb(13_33_55)]">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}

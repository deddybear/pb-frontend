import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/sidebar.component";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <div className="min-h-screen bg-zinc-900 flex">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

            {/* Main area */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300
          ${collapsed ? "lg:ml-16" : "lg:ml-64"}`}
            >
                {/* Topbar */}
                <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-10">
                    {/* Mobile menu toggle */}
                    <button
                        className="lg:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setCollapsed((prev) => !prev)}
                        aria-label="Toggle sidebar"
                    >
                        <span className="block w-5 h-0.5 bg-white" />
                        <span className="block w-5 h-0.5 bg-white" />
                        <span className="block w-5 h-0.5 bg-white" />
                    </button>

                    {/* Page title area */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block h-6 w-0.5 bg-zinc-700" />
                        <span className="text-zinc-400 text-xs uppercase tracking-widest hidden lg:block">
                            Dashboard
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 ml-auto">
                        {/* Notification */}
                        <button
                            className="relative w-9 h-9 flex items-center justify-center rounded-sm bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                            aria-label="Notifications"
                        >
                            <span className="text-sm">◎</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-400 rounded-full" />
                        </button>

                        {/* Search */}
                        <div className="hidden sm:flex items-center gap-2 bg-zinc-800 rounded-sm px-3 py-2 text-zinc-500 text-sm w-48 hover:bg-zinc-700 transition-colors cursor-pointer">
                            <span className="text-xs">⌕</span>
                            <span className="text-xs uppercase tracking-widest">Search...</span>
                            <span className="ml-auto text-xs bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-500">⌘K</span>
                        </div>

                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-sm bg-blue-400 flex items-center justify-center text-zinc-950 font-black text-sm cursor-pointer hover:bg-blue-300 transition-colors">
                            JD
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

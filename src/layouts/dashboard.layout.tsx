import { useState, type JSX } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/sidebar.component";
import { useAuth } from "../hooks/useAuth.hook";
import { type MenuSidebarList } from "../models/menu.model";
import { faDoorOpen, faEnvelopeOpen, faGun, faHouse, faKey, faMedal, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import BreadcrumbComponent from "../components/breadcump.component";

export default function DashboardLayout(): JSX.Element {
    const [pageTitle, setPageTitle] = useState<string>("");
    const [descFeature, setDescFeature] = useState<string>("");
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const navigate = useNavigate();
    const { logout, dataAccount } = useAuth();

    if (dataAccount === null) {
        navigate("/login");
    }

    const handleLogout = (): void => {
        logout();
        navigate("/login");
    };

    const menuSidebarList: MenuSidebarList[] = [
        {
            group: "Shop",
            items: [
                { label: "Cash", to: "/dashboard/shop-cash", icon: faMoneyBill1Wave },
                { label: "Weapon", to: "/dashboard/shop-weapon", icon: faGun },
                { label: "Medal", to: "/dashboard/shop-medal", icon: faMedal }
            ],
        },
        {
            group: "Account",
            items: [
                { label: "Change Email", to: "/dashboard/change-email", icon: faEnvelopeOpen },
                { label: "Change Password", to: "/dashboard/change-password", icon: faKey },
                { label: "Logout", to: (() => { }), icon: faDoorOpen }
            ],
        },
        {
            group: "Home",
            items: [
                { label: "Back To Home", to: "/", icon: faHouse }
            ],
        }
    ];


    return (
        <div className="min-h-screen bg-zinc-900 flex">
            {/* Sidebar */}
            <Sidebar
                handleLogout={handleLogout}
                username={dataAccount!.username.toUpperCase()}
                email={dataAccount!.email}
                menuSidebarList={menuSidebarList}
                collapsed={collapsed}
                onToggle={() => setCollapsed((prev) => !prev)}
            />

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
                            {pageTitle}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 ml-auto">

                        {/* Search */}
                        <div className="hidden sm:flex items-center gap-2 bg-zinc-800 rounded-sm px-3 py-2 text-zinc-500 text-sm w-48 hover:bg-zinc-700 transition-colors cursor-pointer">
                            <span className="text-xs">⌕</span>
                            <span className="text-xs uppercase tracking-widest">Feature will coming soon...</span>
                            <span className="ml-auto text-xs bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-500">⌘K</span>
                        </div>

                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-sm bg-blue-400 flex items-center justify-center text-zinc-950 font-black text-sm cursor-pointer hover:bg-blue-300 transition-colors">
                            {dataAccount!.username[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Breadcrumb */}
                    <div className="my-1">
                        <BreadcrumbComponent />
                    </div>

                    {/* Page heading */}
                    <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                                {pageTitle}
                            </h1>
                            <p className="text-zinc-500 mt-1 text-sm">
                                {descFeature}
                                {/* Welcome back, {dataAccount!.username}. Here's what's happening. */}
                            </p>
                        </div>
                    </div>

                    <Outlet context={{ setPageTitle, dataAccount, setDescFeature }} />
                </main>
            </div>
        </div>
    );
}

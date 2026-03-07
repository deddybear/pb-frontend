import { Link, useLocation } from "react-router";

interface MenuItem {
    label: string;
    to: string;
    icon: string;
}

interface MenuGroup {
    group: string;
    items: MenuItem[];
}

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const menuItems: MenuGroup[] = [
    {
        group: "Main",
        items: [
            { label: "Overview", to: "/dashboard", icon: "▣" },
            { label: "Analytics", to: "/dashboard/analytics", icon: "◈" },
            { label: "Projects", to: "/dashboard/projects", icon: "◉" },
        ],
    },
    {
        group: "Manage",
        items: [
            { label: "Users", to: "/dashboard/users", icon: "◎" },
            { label: "Settings", to: "/dashboard/settings", icon: "◐" },
            { label: "Billing", to: "/dashboard/billing", icon: "◆" },
        ],
    },
    {
        group: "Support",
        items: [
            { label: "Docs", to: "/dashboard/docs", icon: "◇" },
            { label: "Help", to: "/dashboard/help", icon: "◯" },
        ],
    },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const location = useLocation();

    return (
        <>
            {/* Overlay mobile */}
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={onToggle}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full z-30 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-all duration-300
          ${collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-64"}`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center border-b border-zinc-800 px-4 gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-sm rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="w-12 h-12 relative z-10"
                            fill="none"
                        >
                            {/* Skull head */}
                            <path
                                d="M32 6C18 6 10 15 10 26c0 7 4 13 10 16v6h4v-4h4v4h8v-4h4v4h4v-6c6-3 10-9 10-16C54 15 46 6 32 6z"
                                fill="#fbbf24"
                            />
                            {/* Left eye */}
                            <ellipse cx="24" cy="26" rx="5" ry="6" fill="#18181b" />
                            {/* Right eye */}
                            <ellipse cx="40" cy="26" rx="5" ry="6" fill="#18181b" />
                            {/* Nose */}
                            <path d="M30 34 L32 30 L34 34 Z" fill="#18181b" />
                            {/* Teeth dividers */}
                            <line x1="28" y1="48" x2="28" y2="42" stroke="#18181b" strokeWidth="2" />
                            <line x1="36" y1="48" x2="36" y2="42" stroke="#18181b" strokeWidth="2" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <span className="text-white font-black text-lg tracking-tight uppercase whitespace-nowrap overflow-hidden">
                            <span className="text-amber-400">PB</span> ITKI
                        </span>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-2">
                    {menuItems.map((group) => (
                        <div key={group.group} className="mb-6">
                            {!collapsed && (
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-600 px-3 mb-2">
                                    {group.group}
                                </p>
                            )}
                            <ul className="flex flex-col gap-0.5">
                                {group.items.map((item) => {
                                    const active = location.pathname === item.to;
                                    return (
                                        <li key={item.to}>
                                            <Link
                                                to={item.to}
                                                title={collapsed ? item.label : undefined}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-semibold transition-all duration-150 group
                          ${active
                                                        ? "bg-amber-400 text-zinc-950"
                                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                                    }`}
                                            >
                                                <span className={`text-base shrink-0 ${active ? "text-zinc-950" : "text-amber-400"}`}>
                                                    {item.icon}
                                                </span>
                                                {!collapsed && (
                                                    <span className="uppercase tracking-widest text-xs whitespace-nowrap overflow-hidden">
                                                        {item.label}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* User */}
                <div className="border-t border-zinc-800 p-3 shrink-0">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-zinc-800 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-sm bg-amber-400 flex items-center justify-center text-zinc-950 font-black text-sm shrink-0">
                            JD
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden">
                                <p className="text-white font-bold text-sm truncate">John Doe</p>
                                <p className="text-zinc-500 text-xs truncate">john@example.com</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Collapse toggle (desktop) */}
                <button
                    onClick={onToggle}
                    className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? "›" : "‹"}
                </button>
            </aside>
        </>
    );
}

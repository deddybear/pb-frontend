export interface NavLink {
    label: string;
    to: string;
}

export interface MenuItem {
    label: string;
    to: string;
    icon: string;
}

export interface MenuGroup {
    group: string;
    items: MenuItem[];
}

export interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}


export const navLinks: NavLink[] = [
    { label: "Home", to: "/" },
    // { label: "Register", to: "/register" },
    { label: "Patch Notes", to: "/patch-notes"},
    { label: "Download", to: "/download" },
];

export const menuDashboard: MenuGroup[] = [
    {
        group: "Shop",
        items: [
            { label: "Cash", to: "/dashboard/shop-cash", icon: "▣" },
            { label: "Weapon", to: "/dashboard/shop-weapon", icon: "▣" },
            { label: "Medal", to: "/dashboard/shop-medal", icon: "▣" },
            { label: "Home", to: "/", icon: "▣" }
        ],
    },
    // {
    //     group: "Profile",
    //     items: [
    //         { label: "Users", to: "/dashboard/users", icon: "◎" },
    //         { label: "Settings", to: "/dashboard/settings", icon: "◐" },
    //         { label: "Billing", to: "/dashboard/billing", icon: "◆" },
    //     ],
    // },
    // {
    //     group: "Support",
    //     items: [
    //         { label: "Docs", to: "/dashboard/docs", icon: "◇" },
    //         { label: "Help", to: "/dashboard/help", icon: "◯" },
    //     ],
    // },
];

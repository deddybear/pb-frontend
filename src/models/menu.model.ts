import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface NavLink {
    label: string;
    to: string;
}

export interface MenuItem {
    label: string;
    to: string | (() => void);
    icon: IconProp;
}

export interface MenuSidebarList {
    group: string;
    items: MenuItem[];
}

export interface SidebarProps {
    username: string,
    email: string,
    collapsed: boolean;
    onToggle: () => void;
    menuSidebarList: MenuSidebarList[],
    handleLogout: () => void;
}




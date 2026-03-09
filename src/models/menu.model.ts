export interface NavLink {
    label: string;
    to: string;
}


export const navLinks: NavLink[] = [
    { label: "Home", to: "/" },
    { label: "Register", to: "/register" },
    { label: "Patch Notes", to: "/patch-notes"},
    { label: "Download", to: "/download" },
];
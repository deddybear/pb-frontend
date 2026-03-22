import { useState, type JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import IconComponent from "./icon.component";

import { useAuth } from "../hooks/useAuth.hook";
import type { NavLink } from "../models/menu.model";


export default function NavbarComponent(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        logout();
        setOpen(false);
        navigate("/login");
    };

    const navLinks: NavLink[] = [
        { label: "Home", to: "/" },

        // { label: "Register", to: "/register" },
        { label: "Patch Notes", to: "/patch-notes" },
        { label: "Download", to: "/download" },
    ];



    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-zinc-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-sm rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        <IconComponent />
                    </div>

                    <span className="text-white font-black text-xl tracking-tight uppercase">
                        <span className="text-blue-400">PB </span> ITKI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const active = location.pathname === link.to;

                        return (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className={`px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm
                                                ${active ? "bg-blue-400 text-zinc-950" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}


                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* if already login */}
                        {isLoggedIn === true ?
                            (<>
                                <Link
                                    to="/dashboard"
                                    className="px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                                >
                                    Logout
                                </button>
                            </>) :
                            // if not yet login
                            (<>
                                <Link
                                    to="/register"
                                    className={`px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm ${location.pathname === "/register" ? "bg-blue-400 text-zinc-950" : "text-zinc-400 hover:text-white"}`}
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm ${location.pathname === "/login" ? "bg-blue-400 text-zinc-950" : "text-zinc-400 hover:text-white"}`}
                                >
                                    Login
                                </Link>
                            </>)
                        }
                    </div>
                </ul>


                {/* Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
                <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const active = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={`px-4 py-3 text-sm font-semibold uppercase tracking-widest rounded-sm transition-all
                  ${active ? "bg-blue-400 text-zinc-950" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-col gap-2">
                        <Link
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 text-sm font-semibold uppercase tracking-widest text-zinc-400 hover:text-white text-center border border-zinc-700 rounded-sm"
                        >
                            Login
                        </Link>
                        {/* <Link
                            to="/register"
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 text-sm font-black uppercase tracking-widest bg-blue-400 text-zinc-950 text-center rounded-sm"
                        >
                            Get Started
                        </Link> */}
                    </div>
                </div>
            </div>
        </header>
    );


}
import { Link } from "react-router";

interface AuthLayoutProps {
    heading: string;
    sub: string;
    flip: boolean;
    children: React.ReactNode;
}

export default function AuthLayout({ heading, sub, flip, children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-900 flex">
            {/* Form side */}
            <div className={`w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 ${flip ? "lg:order-2" : "lg:order-1"}`}>
                <div className="w-full max-w-md mx-auto">
                    <Link to="/" className="flex items-center gap-2 group mb-10 w-fit">
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
                        <span className="text-white font-black text-xl tracking-tight uppercase">
                            Point Blank <span className="text-amber-400">PS</span>
                        </span>
                    </Link>

                    <h1 className="text-white font-black text-4xl uppercase tracking-tight leading-none mb-2">
                        {heading}
                    </h1>
                    <p className="text-zinc-500 text-sm mb-8">{sub}</p>

                    {children}
                </div>
            </div>

            {/* Visual side */}
            <div className={`hidden lg:flex lg:w-1/2 bg-zinc-950 border-l border-zinc-800 items-center justify-center relative overflow-hidden ${flip ? "lg:order-1" : "lg:order-2"}`}>
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Decorative blur glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl" />

                {/* Floating shapes */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-amber-400/10 rotate-12 rounded-sm border border-amber-400/20" />
                <div className="absolute bottom-16 left-10 w-12 h-12 border-2 border-amber-400/20 rotate-45 rounded-sm" />
                <div className="absolute top-1/3 left-8 w-3 h-3 bg-amber-400/40 rounded-full" />
                <div className="absolute bottom-1/3 right-12 w-2 h-2 bg-amber-400/60 rounded-full" />

                <div className="relative z-10 text-center px-12 max-w-sm">
                    {/* Crosshair icon */}
                    <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-amber-400/10 rounded-sm rotate-3" />
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

                    {/* Headline */}
                    <p className="text-white font-black text-3xl uppercase tracking-tight leading-tight">
                        Point Blank<br />
                        <span className="text-amber-400">Private Server.</span>
                    </p>
                    <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                        Server stabil, lag minimal, gratis selamanya. Rasakan pengalaman bermain Point Blank tanpa batas.
                    </p>

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-3 gap-3">
                        {[
                            { value: "5,000+", label: "Pemain Aktif" },
                            { value: "99.9%", label: "Uptime" },
                            { value: "Gratis", label: "Selamanya" },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-sm p-3">
                                <p className="text-amber-400 font-black text-lg leading-none">{stat.value}</p>
                                <p className="text-zinc-600 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

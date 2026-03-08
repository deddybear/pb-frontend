import { Link } from "react-router";

export default function HomePage() {

    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col">

            <main className="flex-1 pt-16">
                <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
                        <div className="flex justify-center mb-6">
                            <span className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-sm px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                ITKI - Present
                            </span>
                        </div>

                        <h1 className="text-center text-white font-black text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tighter leading-none mb-6">
                            Point Blank<br />
                            <span className="text-blue-400">Private Server.</span>
                        </h1>

                        <p className="text-center text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Nostalgia bermain Point Blank bersama teman-teman lama.
                            Server private dengan gameplay klasik yang kamu rindukan.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/register"
                                className="w-full sm:w-auto px-8 py-4 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors text-center"
                            >
                                Get Started Free →
                            </Link>
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto px-8 py-4 border border-zinc-700 text-zinc-400 font-black text-sm uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all text-center"
                            >
                                View Dashboard
                            </Link>
                        </div>

                        <p className="text-center text-zinc-600 text-xs uppercase tracking-widest mt-8">
                            Bergabung bersama ribuan pemain di server private Point Blank kami. Gratis, stabil, dan terus berkembang.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}
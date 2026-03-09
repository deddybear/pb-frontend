import { type JSX } from "react";

export default function DashboardPages() : JSX.Element {
    return (
        <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-zinc-600">
                <span className="hover:text-zinc-400 cursor-pointer transition-colors">Home</span>
                <span>›</span>
                <span className="text-blue-400">Dashboard</span>
            </div>

            {/* Page heading */}
            <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                        Overview
                    </h1>
                    <p className="text-zinc-500 mt-1 text-sm">
                        Welcome back, John. Here's what's happening.
                    </p>
                </div>
                <button className="px-5 py-2.5 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors shrink-0">
                    + New Project
                </button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Revenue", value: "$48,295", delta: "+12.5%", up: true },
                    { label: "Active Users", value: "3,842", delta: "+8.1%", up: true },
                    { label: "Conversion", value: "4.73%", delta: "-0.4%", up: false },
                    { label: "Churn Rate", value: "1.2%", delta: "-0.8%", up: true },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-zinc-950 border border-zinc-800 rounded-sm p-5 hover:border-zinc-700 transition-colors"
                    >
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">
                            {stat.label}
                        </p>
                        <p className="text-white font-black text-2xl">{stat.value}</p>
                        <p className={`text-xs font-semibold mt-1 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                            {stat.delta} vs last month
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout(): JSX.Element {
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

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
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

          {/* Nested route content */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 min-h-64">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

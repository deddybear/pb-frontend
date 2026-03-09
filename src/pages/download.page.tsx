import { type JSX } from "react";
import { installSteps, specs } from "../models/download.model";

// ─── Component ────────────────────────────────────────────────────────────────

export default function DownloadPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">

      <main className="flex-1 pt-16">

        {/* ── Spesifikasi PC ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-zinc-800 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">System Requirements</p>
              <h2 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                Spesifikasi Minimum PC
              </h2>
            </div>

            <div className="border border-zinc-800 rounded-sm overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-zinc-900 border-b border-zinc-800">
                <div className="px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-500">Komponen</div>
                <div className="px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-500 border-l border-zinc-800">Minimum</div>
                <div className="px-5 py-3 text-xs font-black uppercase tracking-widest text-blue-400 border-l border-zinc-800">Recommended</div>
              </div>

              {/* Table rows */}
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-3 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-900/50 transition-colors ${i % 2 === 0 ? "" : "bg-zinc-900/20"}`}
                >
                  <div className="px-5 py-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                    {spec.label}
                  </div>
                  <div className="px-5 py-4 text-sm text-zinc-500 border-l border-zinc-800">
                    {spec.minimum}
                  </div>
                  <div className="px-5 py-4 text-sm text-white font-semibold border-l border-zinc-800">
                    {spec.recommended}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Panduan Instalasi ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">Installation Guide</p>
              <h2 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                Panduan Instalasi
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {installSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 relative group hover:border-blue-400/30 transition-colors"
                >
                  {/* Step number bg */}
                  <span className="absolute top-4 right-4 text-zinc-800 font-black text-5xl select-none group-hover:text-zinc-700 transition-colors leading-none">
                    {step.num}
                  </span>

                  {/* Step indicator */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-400 rounded-sm flex items-center justify-center text-zinc-950 font-black text-sm shrink-0">
                        {i + 1}
                      </div>
                      {i < installSteps.length - 1 && (
                        <div className="hidden lg:block flex-1 h-px bg-zinc-800" />
                      )}
                    </div>
                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Help note */}
            <div className="mt-6 flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-sm px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Mengalami masalah saat instalasi? Bergabunglah ke{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Discord server kami
                </a>{" "}
                dan tim support kami siap membantu kamu 24/7.
              </p>
            </div>
          </div>
        </section>


        {/* ── Hero Download ─────────────────────────────────────────────── */}
        <section className="relative bg-zinc-950 border-b border-zinc-800 overflow-hidden">
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-blue-400/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
            {/* Badge versi */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-sm px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Latest Version — v3.6.8
            </div>

            <h1 className="text-white font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-none mb-4">
              Download<br />
              <span className="text-blue-400">Client Game</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base max-w-lg mb-10 leading-relaxed">
              Download client resmi Point Blank Private Server. Gratis, aman, dan selalu up-to-date.
            </p>

            {/* Download button */}
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-all duration-200 shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40"
            >
              {/* Arrow icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Sekarang
              <span className="text-zinc-700 font-semibold text-xs normal-case tracking-normal">~4.2 GB</span>
            </a>

            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs uppercase tracking-widest text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                Windows Only
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                Update: 01 Jan 2026
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                SHA256 Verified
              </span>
            </div>
          </div>
        </section>

      </main>


    </div>
  );
}
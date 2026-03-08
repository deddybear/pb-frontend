import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface Stat {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  { icon: "◈", title: "Lightning Fast", desc: "Optimized for performance from day one. Zero bloat, maximum speed." },
  { icon: "◉", title: "Fully Responsive", desc: "Pixel-perfect on every device. Mobile-first, desktop-ready." },
  { icon: "◆", title: "Dark by Default", desc: "Bold dark aesthetics with blue accents. Your users will love it." },
  { icon: "◎", title: "Ready to Ship", desc: "Copy, paste, customize. Production-grade layouts out of the box." },
  { icon: "◐", title: "React + Tailwind", desc: "Pure React and Tailwind CSS. No dependencies to fight with." },
  { icon: "◇", title: "Easy to Scale", desc: "Built with scalability in mind. Add pages and features effortlessly." },
];

const steps: Step[] = [
  { num: "01", title: "Copy the layout", desc: "Drop any layout file into your project." },
  { num: "02", title: "Customize it", desc: "Swap colors, text, and links to match your brand." },
  { num: "03", title: "Ship it", desc: "Deploy with confidence. It just works." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LandingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
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
                React + Tailwind Layout System
              </span>
            </div>

            <h1 className="text-center text-white font-black text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tighter leading-none mb-6">
              Build Bold.<br />
              <span className="text-blue-400">Ship Fast.</span>
            </h1>

            <p className="text-center text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              A modern, responsive layout system built with pure React and Tailwind CSS.
              Drop it in. Make it yours.
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
              Trusted by 1,200+ developers worldwide
            </p>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">Features</p>
              <h2 className="text-white font-black text-4xl sm:text-5xl uppercase tracking-tight leading-tight max-w-xl">
                Everything you need. Nothing you don't.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div className="text-blue-400 text-2xl mb-4 group-hover:scale-110 transition-transform duration-200 w-fit">
                    {f.icon}
                  </div>
                  <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2">
                    {f.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-b border-zinc-800 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-white font-black text-4xl sm:text-5xl uppercase tracking-tight">
                3 Steps to Ship.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-zinc-800">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="bg-zinc-950 p-8 sm:p-10 relative group hover:bg-zinc-900 transition-colors"
                >
                  <span className="text-zinc-800 font-black text-7xl absolute top-4 right-6 select-none group-hover:text-zinc-700 transition-colors">
                    {step.num}
                  </span>
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-400 rounded-sm flex items-center justify-center text-zinc-950 font-black mb-5">
                      {i + 1}
                    </div>
                    <h3 className="text-white font-black text-lg uppercase tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-400 rounded-sm p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-300/30 rounded-full" />
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-blue-500/20 rotate-45 rounded-sm" />
              <div className="relative">
                <h2 className="text-zinc-950 font-black text-4xl sm:text-5xl uppercase tracking-tight leading-tight">
                  Ready to build?
                </h2>
                <p className="text-zinc-700 mt-2">Start for free. No credit card required.</p>
              </div>
              <Link
                to="/register"
                className="relative shrink-0 px-8 py-4 bg-zinc-950 text-white font-black text-sm uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-colors"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

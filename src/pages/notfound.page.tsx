import { Link, useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden px-4">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating decorations */}
      <div className="absolute top-10 left-10 w-10 h-10 border-2 border-blue-400/20 rotate-45 rounded-sm" />
      <div className="absolute top-20 right-16 w-6 h-6 bg-blue-400/10 rotate-12 rounded-sm" />
      <div className="absolute bottom-20 left-16 w-4 h-4 bg-blue-400/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border border-blue-400/20 rotate-12 rounded-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

        {/* Skull icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-400/10 rounded-sm rotate-3 scale-110" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-24 h-24 relative z-10"
            fill="none"
          >
            <path
              d="M32 6C18 6 10 15 10 26c0 7 4 13 10 16v6h4v-4h4v4h8v-4h4v4h4v-6c6-3 10-9 10-16C54 15 46 6 32 6z"
              fill="#18181b"
            />
            <ellipse cx="24" cy="26" rx="5" ry="6" fill="#09090b" />
            <ellipse cx="40" cy="26" rx="5" ry="6" fill="#09090b" />
            <path d="M30 34 L32 30 L34 34 Z" fill="#09090b" />
            <line x1="28" y1="48" x2="28" y2="42" stroke="#09090b" strokeWidth="2" />
            <line x1="36" y1="48" x2="36" y2="42" stroke="#09090b" strokeWidth="2" />
          </svg>
        </div>

        {/* 404 */}
        <h1 className="text-white font-black uppercase tracking-tighter leading-none"
          style={{ fontSize: "clamp(80px, 20vw, 160px)" }}
        >
          4<span className="text-blue-400">0</span>4
        </h1>

        {/* Message */}
        <p className="text-white font-black text-xl sm:text-2xl uppercase tracking-tight mt-2">
          Kamu Tewas Di Sini.
        </p>
        <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
          Halaman yang kamu cari tidak ditemukan. Mungkin sudah dihapus, dipindahkan, atau memang tidak pernah ada.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-8 w-full max-w-xs">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-700 text-xs uppercase tracking-widest">respawn</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Link
            to="/"
            className="flex-1 py-3 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors text-center"
          >
            ← Kembali ke Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 border border-zinc-700 text-zinc-400 font-black text-sm uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all text-center"
          >
            Halaman Sebelumnya
          </button>
        </div>

      </div>
    </div>
  );
}
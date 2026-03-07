import { Link } from "react-router";

interface SocialLink {
  label: string;
  href: string;
}

const socials: SocialLink[] = [
  { label: "X", href: "#" },
  { label: "GH", href: "#" },
  { label: "LI", href: "#" },
  { label: "YT", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-amber-400 rounded-sm rotate-12 group-hover:rotate-0 transition-transform duration-300" />
          <span className="text-white font-black text-xl tracking-tight uppercase">
            Point Blank <span className="text-amber-400">PS</span>
          </span>
        </Link>

        {/* Sosial Media */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="px-4 py-2 rounded-sm bg-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-all duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-zinc-600 text-xs uppercase tracking-widest text-center">
          © {new Date().getFullYear()} PB-ITKI. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
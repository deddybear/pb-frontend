import { Link } from "react-router";
import IconComponent from "./icon.component";

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
          <IconComponent/>
          <span className="text-white font-black text-xl tracking-tight uppercase">
            Point Blank <span className="text-blue-400">ITKI</span>
          </span>
        </Link>

        {/* Sosial Media */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="px-4 py-2 rounded-sm bg-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest hover:bg-blue-400 hover:text-zinc-950 transition-all duration-200"
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
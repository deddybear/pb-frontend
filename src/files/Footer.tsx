import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  to: string;
}

interface SocialLink {
  label: string;
  href: string;
}

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Changelog", to: "/changelog" },
    { label: "Roadmap", to: "/roadmap" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/press" },
  ],
  Legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Cookies", to: "/cookies" },
  ],
};

const socials: SocialLink[] = [
  { label: "X", href: "#" },
  { label: "GH", href: "#" },
  { label: "LI", href: "#" },
  { label: "YT", href: "#" },
];

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group w-fit mb-4">
              <div className="w-8 h-8 bg-blue-400 rounded-sm rotate-12 group-hover:rotate-0 transition-transform duration-300" />
              <span className="text-white font-black text-xl tracking-tight uppercase">
                Volt<span className="text-blue-400">UI</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Modern, bold design system for React developers. Build faster. Ship louder.
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 flex items-center justify-center rounded-sm bg-zinc-800 text-zinc-400 hover:bg-blue-400 hover:text-zinc-950 transition-all duration-200 text-xs font-black"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-zinc-500 text-sm hover:text-blue-400 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} VoltUI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-600 text-xs uppercase tracking-widest">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { JSX } from "react";
import { Link, useLocation } from "react-router";

// "dashboard-overview" → "Dashboard Overview"
const formatSegment = (segment: string): string => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BreadcrumbComponent(): JSX.Element {
  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-xs uppercase tracking-widest">
      {/* Home */}
      <Link
        to="/"
        className="text-zinc-600 hover:text-amber-400 transition-colors"
      >
        Home
      </Link>

      {segments.map((segment, index) => {
        const to = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = formatSegment(segment);

        return (
          <span key={to} className="flex items-center gap-2">
            <span className="text-zinc-700">›</span>

            {isLast ? (
              <span className="text-blue-400">{label}</span>
            ) : (
              <Link
                to={to}
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

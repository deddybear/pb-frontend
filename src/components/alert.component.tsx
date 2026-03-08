import { useState, type JSX } from "react";
import type { AlertProps, AlertState, AlertVariant, UseAlertReturn } from "../models/alert";


// ─── Config per variant ───────────────────────────────────────────────────────

const variantConfig: Record<
  AlertVariant,
  { borderColor: string; iconBg: string; iconColor: string; titleColor: string; messageColor: string; icon: JSX.Element }
> = {
  success: {
    borderColor: "border-emerald-500/40",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-400",
    messageColor: "text-zinc-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  error: {
    borderColor: "border-red-500/40",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    titleColor: "text-red-400",
    messageColor: "text-zinc-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
  warning: {
    borderColor: "border-amber-500/40",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    titleColor: "text-amber-400",
    messageColor: "text-zinc-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  info: {
    borderColor: "border-blue-500/40",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    titleColor: "text-blue-400",
    messageColor: "text-zinc-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
};

// ─── Alert Component ──────────────────────────────────────────────────────────

export function Alert({ variant, title, message, onClose }: AlertProps): JSX.Element {
  const config = variantConfig[variant];

  return (
    <div
      className={`flex items-start gap-3 bg-zinc-900 border ${config.borderColor} rounded-sm px-4 py-3 w-full`}
      role="alert"
    >
      {/* Icon */}
      <div className={`shrink-0 w-8 h-8 rounded-sm flex items-center justify-center ${config.iconBg} ${config.iconColor}`}>
        {config.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pt-0.5">
        {title && (
          <p className={`text-xs font-black uppercase tracking-widest mb-0.5 ${config.titleColor}`}>
            {title}
          </p>
        )}
        <p className={`text-sm leading-relaxed ${config.messageColor}`}>
          {message}
        </p>
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-zinc-600 hover:text-white transition-colors mt-0.5"
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── useAlert hook (opsional, untuk kemudahan pakai) ─────────────────────────


export function useAlert(): UseAlertReturn {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = (data: AlertState): void => setAlert(data);
  const hideAlert = (): void => setAlert(null);

  const AlertComponent = alert ? (
    <Alert
      variant={alert.variant}
      title={alert.title}
      message={alert.message}
      onClose={hideAlert}
    />
  ) : null;

  return { alert, showAlert, hideAlert, AlertComponent };
}
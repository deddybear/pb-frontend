import { useEffect, useRef, type JSX } from "react";
import type { ConfirmModalProps, FormModalProps, InfoModalProps } from "../models/modal.model";



// ─── Base Modal Wrapper ───────────────────────────────────────────────────────

function ModalWrapper({ isOpen, onClose, title, children }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}): JSX.Element | null {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 className="text-white font-black text-sm uppercase tracking-widest">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-white transition-colors"
            aria-label="Tutup modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  variant = "default",
  onlyCloseButton = false,
  onConfirm,
}: ConfirmModalProps): JSX.Element | null {
  const confirmStyles: Record<string, string> = {
    danger: "bg-red-500 hover:bg-red-400 text-white",
    warning: "bg-amber-400 hover:bg-amber-300 text-zinc-950",
    success: "bg-emerald-500 hover:bg-emerald-400 text-white",
    question: "bg-blue-500 hover:bg-blue-400 text-white",
    default: "bg-amber-400 hover:bg-amber-300 text-zinc-950",
  };

  const iconMap: Record<string, JSX.Element> = {
    danger: (
      <div className="w-12 h-12 rounded-sm bg-red-500/10 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      </div>
    ),
    warning: (
      <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    ),
    success: (
      <div className="w-12 h-12 rounded-sm bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-5" />
        </svg>
      </div>
    ),
    question: (
      <div className="w-12 h-12 rounded-sm bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    ),
    default: (
      <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
    ),
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={title}>
      <div className="px-5 py-6 text-center">
        {iconMap[variant]}
        <p className="text-zinc-400 text-sm leading-relaxed">{message}</p>
      </div>
      <div className="flex gap-2 px-5 pb-5">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 border border-zinc-700 text-zinc-400 font-black text-xs uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all"
        >
          {cancelLabel}
        </button>
        {
          (onlyCloseButton == true) ? <></> : <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-2.5 font-black text-xs uppercase tracking-widest rounded-sm transition-all ${confirmStyles[variant]}`}
          >
            {confirmLabel}
          </button>
        }

      </div>
    </ModalWrapper>
  );
}

// ─── Info Modal ───────────────────────────────────────────────────────────────

export function InfoModal({
  isOpen,
  onClose,
  title,
  message,
  closeLabel = "Mengerti",
}: InfoModalProps): JSX.Element | null {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={title}>
      <div className="px-5 py-6">
        <div className="w-12 h-12 rounded-sm bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed text-center">{message}</p>
      </div>
      <div className="px-5 pb-5">
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors"
        >
          {closeLabel}
        </button>
      </div>
    </ModalWrapper>
  );
}

// ─── Form Modal ───────────────────────────────────────────────────────────────

export function FormModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Simpan",
  cancelLabel = "Batal",
  isLoading = false,
}: FormModalProps): JSX.Element | null {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={onSubmit}>
        <div className="px-5 py-5 flex flex-col gap-4">
          {children}
        </div>
        <div className="flex gap-2 px-5 pb-5 border-t border-zinc-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 border border-zinc-700 text-zinc-400 font-black text-xs uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2.5 bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && (
              <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {isLoading ? "Memproses..." : submitLabel}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
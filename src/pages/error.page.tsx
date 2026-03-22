import { Component, type JSX } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "../models/error.model";

// ─── Error Fallback UI ────────────────────────────────────────────────────────

function ErrorFallback({
  error,
  errorInfo,
  onReset,
}: {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  onReset: () => void;
}): JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorations */}
      <div className="absolute top-10 left-10 w-10 h-10 border-2 border-red-500/20 rotate-45 rounded-sm" />
      <div className="absolute bottom-10 right-10 w-8 h-8 bg-red-500/10 rotate-12 rounded-sm" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-500/10 rounded-sm rotate-3 scale-110" />
          <div className="relative w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white font-black text-4xl sm:text-5xl uppercase tracking-tighter leading-none mb-2">
          Terjadi <span className="text-red-400">Error.</span>
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">
          Aplikasi mengalami kesalahan yang tidak terduga. Tim kami sudah diberitahu. Coba refresh halaman atau kembali ke beranda.
        </p>

        {/* Error detail — collapsible */}
        {error && (
          <details className="w-full mb-6 text-left bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden group">
            <summary className="px-4 py-3 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors flex items-center justify-between select-none">
              Detail Error
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-4 pb-4 border-t border-zinc-800 pt-3 flex flex-col gap-2">
              <p className="text-red-400 text-xs font-mono break-all">
                {error.name}: {error.message}
              </p>
              {errorInfo?.componentStack && (
                <pre className="text-zinc-600 text-xs font-mono overflow-auto max-h-32 leading-relaxed whitespace-pre-wrap break-all">
                  {errorInfo.componentStack.trim()}
                </pre>
              )}
            </div>
          </details>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <button
            onClick={onReset}
            className="flex-1 py-3 bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors"
          >
            Coba Lagi
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="flex-1 py-3 border border-zinc-700 text-zinc-400 font-black text-sm uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all"
          >
            Ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Error Boundary Class ─────────────────────────────────────────────────────

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo });
    // TODO: kirim ke error tracking service (Sentry, dll)
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Pakai custom fallback jika disediakan
      if (this.props.fallback) return this.props.fallback;

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

// ─── Route Error Page (untuk errorElement di router) ─────────────────────────

export function ErrorFallbackPage(): JSX.Element {
  const error = useRouteError();

  let message = "Terjadi kesalahan yang tidak terduga.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText ?? error.data ?? message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.log(message);
  

  return (
    <ErrorFallback
      error={error instanceof Error ? error : null}
      errorInfo={null}
      onReset={() => window.location.reload()}
    />
  );
}
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // optional custom fallback
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

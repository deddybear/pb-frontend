// ─── Types ────────────────────────────────────────────────────────────────────

import type { JSX } from "react";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
}


export interface AlertState {
  variant: AlertVariant;
  title?: string;
  message: string;
}

export interface UseAlertReturn {
  alert: AlertState | null;
  showAlert: (data: AlertState) => void;
  hideAlert: () => void;
  AlertComponent: JSX.Element | null;
}

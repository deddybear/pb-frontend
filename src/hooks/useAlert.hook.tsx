// ─── useAlert hook (opsional, untuk kemudahan pakai) ─────────────────────────

import { useState } from "react";
import { Alert } from "../components/alert.component";
import type { AlertState, UseAlertReturn } from "../models/alert.model";


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
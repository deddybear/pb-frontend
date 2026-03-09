// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export interface ConfirmModalProps extends ModalBaseProps {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?:  "danger" | "warning" | "success" | "question" | "default";
  onConfirm: () => void;
  onlyCloseButton: boolean;
}

export interface InfoModalProps extends ModalBaseProps {
  message: string;
  closeLabel?: string;
}

export interface FormModalProps extends ModalBaseProps {
  children: React.ReactNode;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}
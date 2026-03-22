export interface ChangePasswordBody {
  player_id: number;
  old_password: string;
  new_password: string;
}

export interface ChangePasswordForm {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
}

export interface ChangeEmailBody {
  player_id: number;
  old_email: string;
  new_email: string;
}

export interface ChangeEmailForm {
  currentEmail: string;
  newEmail: string;
}

export interface PasswordStrengthProp {
  password: string;
  level: string;
  handleChangeLevelStrength: (level : string) => void
}
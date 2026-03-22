import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordForm {
  email: string;
}

interface ChangeEmailForm {
  currentEmail: string;
  newEmail: string;
  password: string;
}

// ─── Shared Input Component ───────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: InputFieldProps): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors pr-16"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs transition-colors uppercase tracking-widest"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {hint && <p className="text-zinc-600 text-xs">{hint}</p>}
    </div>
  );
}

// ─── Shared Page Wrapper ──────────────────────────────────────────────────────

interface AccountPageWrapperProps {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  children: React.ReactNode;
  backTo?: string;
  backLabel?: string;
}

function AccountPageWrapper({
  title,
  subtitle,
  icon,
  children,
  backTo = "/dashboard/settings",
  backLabel = "Kembali ke Settings",
}: AccountPageWrapperProps): JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-12">
      {/* Grid bg */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {backLabel}
        </Link>

        {/* Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-zinc-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
              {icon}
            </div>
            <div>
              <h1 className="text-white font-black text-sm uppercase tracking-widest">
                {title}
              </h1>
              <p className="text-zinc-500 text-xs mt-0.5">{subtitle}</p>
            </div>
          </div>

          {/* Form content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Status Message ───────────────────────────────────────────────────────────

interface StatusMessageProps {
  type: "success" | "error";
  message: string;
}

function StatusMessage({ type, message }: StatusMessageProps): JSX.Element {
  const styles = {
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
  };

  const icons = {
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  };

  return (
    <div className={`flex items-center gap-2 border rounded-sm px-4 py-3 text-sm ${styles[type]}`}>
      {icons[type]}
      {message}
    </div>
  );
}

// ─── 1. Change Password Page ──────────────────────────────────────────────────

export function ChangePasswordPage(): JSX.Element {
  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<void> => {
    e.preventDefault();
    setStatus(null);

    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: "error", message: "Password baru tidak cocok." });
      return;
    }

    if (form.newPassword.length < 8) {
      setStatus({ type: "error", message: "Password baru minimal 8 karakter." });
      return;
    }

    setIsLoading(true);

    // TODO: ganti dengan api call
    // const { ok, message } = await api.post("/auth/change-password", form);
    await new Promise((res) => setTimeout(res, 1000)); // simulasi

    setIsLoading(false);
    setStatus({ type: "success", message: "Password berhasil diubah." });
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <AccountPageWrapper
      title="Ganti Password"
      subtitle="Pastikan password baru kamu kuat dan aman"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {status && <StatusMessage type={status.type} message={status.message} />}

        <InputField
          label="Password Saat Ini"
          name="currentPassword"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Masukkan password saat ini"
        />

        <div className="h-px bg-zinc-800" />

        <InputField
          label="Password Baru"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Minimal 8 karakter"
          hint="Gunakan kombinasi huruf, angka, dan simbol"
        />

        <InputField
          label="Konfirmasi Password Baru"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Ulangi password baru"
        />

        {/* Password strength indicator */}
        {form.newPassword && (
          <div className="flex flex-col gap-1.5">
            <p className="text-xs uppercase tracking-widest text-zinc-600">Kekuatan Password</p>
            <div className="flex gap-1">
              {[
                form.newPassword.length >= 8,
                /[A-Z]/.test(form.newPassword),
                /[0-9]/.test(form.newPassword),
                /[^A-Za-z0-9]/.test(form.newPassword),
              ].map((passed, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-colors duration-300 ${passed ? "bg-amber-400" : "bg-zinc-800"}`}
                />
              ))}
            </div>
            <p className="text-zinc-600 text-xs">
              {(() => {
                const score = [
                  form.newPassword.length >= 8,
                  /[A-Z]/.test(form.newPassword),
                  /[0-9]/.test(form.newPassword),
                  /[^A-Za-z0-9]/.test(form.newPassword),
                ].filter(Boolean).length;
                if (score <= 1) return "Lemah";
                if (score === 2) return "Cukup";
                if (score === 3) return "Kuat";
                return "Sangat Kuat";
              })()}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && (
            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
          {isLoading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </form>
    </AccountPageWrapper>
  );
}

// ─── 2. Forgot Password Page ──────────────────────────────────────────────────

export function ForgotPasswordPage(): JSX.Element {
  const [form, setForm] = useState<ForgotPasswordForm>({ email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<void> => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    // TODO: ganti dengan api call
    // const { ok, message } = await api.post("/auth/forgot-password", form);
    await new Promise((res) => setTimeout(res, 1000)); // simulasi

    setIsLoading(false);
    setSent(true);
  };

  return (
    <AccountPageWrapper
      title="Lupa Password"
      subtitle="Kami akan kirim link reset ke email kamu"
      backTo="/login"
      backLabel="Kembali ke Login"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      }
    >
      {sent ? (
        // State setelah email terkirim
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-14 h-14 rounded-sm bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div>
            <p className="text-white font-black text-sm uppercase tracking-widest">Email Terkirim!</p>
            <p className="text-zinc-500 text-sm mt-1">
              Cek inbox <span className="text-amber-400">{form.email}</span> dan ikuti instruksi untuk reset password.
            </p>
          </div>
          <p className="text-zinc-600 text-xs">Tidak menerima email? Cek folder spam kamu.</p>
          <button
            onClick={() => { setSent(false); setForm({ email: "" }); }}
            className="text-xs text-zinc-500 hover:text-amber-400 uppercase tracking-widest transition-colors"
          >
            Kirim ulang
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {status && <StatusMessage type={status.type} message={status.message} />}

          <p className="text-zinc-500 text-sm leading-relaxed">
            Masukkan email yang terdaftar di akun Point Blank kamu. Kami akan mengirimkan link untuk reset password.
          </p>

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && (
              <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {isLoading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>
      )}
    </AccountPageWrapper>
  );
}

// ─── 3. Change Email Page ─────────────────────────────────────────────────────

export function ChangeEmailPage(): JSX.Element {
  const { user } = useAuth();
  const [form, setForm] = useState<ChangeEmailForm>({
    currentEmail: user?.email ?? "",
    newEmail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<void> => {
    e.preventDefault();
    setStatus(null);

    if (form.newEmail === form.currentEmail) {
      setStatus({ type: "error", message: "Email baru tidak boleh sama dengan email saat ini." });
      return;
    }

    setIsLoading(true);

    // TODO: ganti dengan api call
    // const { ok, message } = await api.post("/auth/change-email", form);
    await new Promise((res) => setTimeout(res, 1000)); // simulasi

    setIsLoading(false);
    setStatus({ type: "success", message: "Email berhasil diubah. Silakan login ulang." });
    setForm((prev) => ({ ...prev, newEmail: "", password: "" }));
  };

  return (
    <AccountPageWrapper
      title="Ganti Email"
      subtitle="Perubahan email memerlukan verifikasi password"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {status && <StatusMessage type={status.type} message={status.message} />}

        {/* Current email — readonly */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Email Saat Ini
          </label>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-sm px-4 py-3 text-zinc-500 text-sm">
            {form.currentEmail || "—"}
          </div>
        </div>

        <div className="h-px bg-zinc-800" />

        <InputField
          label="Email Baru"
          name="newEmail"
          type="email"
          value={form.newEmail}
          onChange={handleChange}
          placeholder="email_baru@example.com"
          hint="Pastikan email baru aktif dan bisa diakses"
        />

        <InputField
          label="Konfirmasi dengan Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Masukkan password kamu"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && (
            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
          {isLoading ? "Menyimpan..." : "Simpan Email Baru"}
        </button>
      </form>
    </AccountPageWrapper>
  );
}
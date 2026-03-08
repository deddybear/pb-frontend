import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

interface AuthLayoutProps {
  heading: string;
  sub: string;
  flip: boolean;
  children: React.ReactNode;
}

// ─── Login Page ───────────────────────────────────────────────────────────────

export function LoginPage(): JSX.Element {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // handle login logic here
    console.log("Login:", form);
  };

  return (
    <AuthLayout
      heading="Welcome back."
      sub="Log in to your account to continue."
      flip={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-zinc-500 hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs transition-colors"
            >
              {show ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors mt-2"
        >
          Log In →
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <button
          type="button"
          className="w-full py-3 border border-zinc-700 text-zinc-400 font-semibold text-sm uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all"
        >
          Continue with Google
        </button>

        <p className="text-center text-zinc-600 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

// ─── Register Page ────────────────────────────────────────────────────────────

export function RegisterPage(): JSX.Element {
  const [form, setForm] = useState<RegisterForm>({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Register:", form);
  };

  return (
    <AuthLayout
      heading="Create account."
      sub="Start building something bold today."
      flip={true}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        <p className="text-zinc-600 text-xs">
          By signing up you agree to our{" "}
          <Link to="/terms" className="text-blue-400 hover:text-blue-300">Terms</Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
        </p>

        <button
          type="submit"
          className="w-full py-3 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors"
        >
          Create Account →
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <button
          type="button"
          className="w-full py-3 border border-zinc-700 text-zinc-400 font-semibold text-sm uppercase tracking-widest rounded-sm hover:border-zinc-500 hover:text-white transition-all"
        >
          Continue with Google
        </button>

        <p className="text-center text-zinc-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

// ─── Shared Auth Layout ───────────────────────────────────────────────────────

function AuthLayout({ heading, sub, flip, children }: AuthLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-900 flex">
      {/* Form side */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 ${flip ? "lg:order-2" : "lg:order-1"}`}>
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2 group mb-10 w-fit">
            <div className="w-8 h-8 bg-blue-400 rounded-sm rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            <span className="text-white font-black text-xl tracking-tight uppercase">
              Volt<span className="text-blue-400">UI</span>
            </span>
          </Link>

          <h1 className="text-white font-black text-4xl uppercase tracking-tight leading-none mb-2">
            {heading}
          </h1>
          <p className="text-zinc-500 text-sm mb-8">{sub}</p>

          {children}
        </div>
      </div>

      {/* Visual side */}
      <div className={`hidden lg:flex lg:w-1/2 bg-zinc-950 border-l border-zinc-800 items-center justify-center relative overflow-hidden ${flip ? "lg:order-1" : "lg:order-2"}`}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-16 right-16 w-32 h-32 bg-blue-400/10 rotate-12 rounded-sm" />
        <div className="absolute bottom-20 left-12 w-20 h-20 border-4 border-blue-400/20 rotate-45 rounded-sm" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/5 rounded-full" />

        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 bg-blue-400 rounded-sm rotate-12 mx-auto mb-6" />
          <p className="text-white font-black text-2xl uppercase tracking-tight leading-tight">
            Build Fast.<br />Ship Bold.
          </p>
          <p className="text-zinc-600 text-sm mt-4 max-w-xs mx-auto">
            The design system for teams that move fast and look great doing it.
          </p>
          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-sm p-5 text-left">
            <p className="text-zinc-300 text-sm leading-relaxed">
              "VoltUI cut our design time in half. The layouts are sharp and everything just works."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 bg-blue-400/20 rounded-sm flex items-center justify-center text-blue-400 text-xs font-black">
                AR
              </div>
              <div>
                <p className="text-white font-bold text-xs">Alex Rivera</p>
                <p className="text-zinc-600 text-xs">CTO @ Launchpad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

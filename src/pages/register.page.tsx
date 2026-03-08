import { useState } from "react";
import { Link } from "react-router";
import AuthLayout from "../layouts/auth.layout";
import type { RegisterForm } from "../models/register";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({ username: "", password: "", email: "", age: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.BaseSyntheticEvent): void => {
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
            Username
          </label>
          <input
            name="name"
            type="text"
            required
            value={form.username}
            onChange={handleChange}
            placeholder="John Doe"
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

        {/* Age */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Umur
          </label>
          <input
            name="age"
            type="number"
            min={1}
            max={255}
            required
            value={form.age}
            onChange={handleChange}
            placeholder="umur anda"
            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        <p className="text-zinc-600 text-xs">
          By signing up you agree to our{" "}
          <Link to="#" className="text-blue-400 hover:text-blue-300">Terms</Link>{" "}
          and{" "}
          <Link to="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
        </p>

        <button
          type="submit"
          className="w-full py-3 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors"
        >
          Create Account →
        </button>

      </form>
    </AuthLayout>
  );
}
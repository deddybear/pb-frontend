import { useState } from "react";
import { Link } from "react-router";
import AuthLayout from "../layouts/auth.layout";



export function LoginPage() {

    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
    const [show, setShow] = useState<boolean>(false);
    interface LoginForm {
        email: string;
        password: string;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();
        // handle login logic here
        console.log("Login:", form);
    };

    return (
        <AuthLayout
            heading="Welcome back."
            sub="Log in to your account to continue."
            flip={true}>
            <div>
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
                            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
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
                                className="text-xs text-zinc-500 hover:text-amber-400 transition-colors"
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
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors pr-12"
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
                        className="w-full py-3 bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-colors mt-2"
                    >
                        Log In →
                    </button>


                    <p className="text-center text-zinc-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}
import { useState } from "react";
import { Link } from "react-router";
import AuthLayout from "../layouts/auth.layout";
import { useAlert } from "../components/alert.component";
import type { LoginForm } from "../models/login";



export function LoginPage() {
    const { showAlert, AlertComponent } = useAlert();
    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const [show, setShow] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();

        showAlert({
            variant: "success",
            title: "Sukses",
            message: "lorem ipsum"
        })
        // handle login logic here
        // console.log("Login:", form);
    };

    return (
        <AuthLayout
            heading="Welcome back."
            sub="Log in to your account to continue."
            flip={true}>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {AlertComponent}
                    {/* Username */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                            username
                        </label>
                        <input
                            name="username"
                            type="text"
                            required
                            value={form.username}
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-600 text-xs transition-colors"
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


                    <p className="text-center text-zinc-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}
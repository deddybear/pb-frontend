import { useState, type JSX } from "react";
import { Link } from "react-router";
import AuthLayout from "../layouts/auth.layout";
import { useAlert } from "../hooks/useAlert.hook";
import { type DataAccount, type LoginForm } from "../models/login.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api.service";
import { useModal } from "../hooks/useModal.hook";
import { ConfirmModal } from "../components/modal.component";
import { SaveSessionLogin, SaveSessionToken } from "../services/session.service";
import type { GeneralResponse } from "../models/response.model";
import { useAuth } from "../hooks/useAuth.hook";


export function LoginPage(): JSX.Element {
    const { showAlert, AlertComponent, hideAlert } = useAlert();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const [messageResponse, setMessageResponse] = useState<string>("");
    const [dataResponse, setDataResponse] = useState<GeneralResponse<DataAccount>>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const resultModal = useModal();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleShowPassword = (): void => {
        setShowPassword((prev) => !prev);
    }

    const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<void> => {
        hideAlert();
        setIsLoading(true);
        e.preventDefault();

        await doLogin();

    };

    const doLogin = async () => {
        const { codeHttp, response, message } = await api.post<GeneralResponse<DataAccount>, LoginForm>("/api/auth/login", form);

        if (codeHttp != 200 || !response) {
            showAlert({
                variant: "error",
                title: "Terjadi Kesalahan Pada Server",
                message: message
            });
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setMessageResponse(message);
        setDataResponse(response);
        resultModal.open();
    }

    const saveState = () => {
        console.log(dataResponse);
        
        SaveSessionLogin(dataResponse!.response);
        SaveSessionToken(dataResponse!.response.token);
        login(dataResponse!.response);
    }

    return (
        <AuthLayout
            heading="Selamat Datang."
            sub="Masuk ke akun Anda untuk melanjutkan."
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
                            placeholder="username"
                            className="bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                            Password
                        </label>
                        <div className="flex flex-row gap-1 ">
                            <div className="basis-full">
                                <input
                                    name="password"
                                    type={`${showPassword ? "text" : "password"}`}
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                                />
                            </div>
                            <div className="grid basis-16 text-zinc-800 bg-zinc-400 place-content-center" onClick={toggleShowPassword}>
                                <div className="w-full h-full">
                                    {
                                        showPassword == true ?
                                            (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 flex items-center justify-center gap-2 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors mt-2 ${isLoading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-400 cursor-pointer"}`}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        )}
                        {isLoading ? "Memproses..." : "Log In"}

                    </button>

                    <p className="text-center text-zinc-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </form>
                <ConfirmModal
                    isOpen={resultModal.isOpen}
                    onClose={() => saveState()}
                    title="Status Login"
                    message={`${messageResponse}`}
                    variant="success"
                    confirmLabel="Baik"
                    cancelLabel="Tutup"
                    onlyCloseButton={true}
                    onConfirm={() => {}}
                />
            </div>
        </AuthLayout>
    )
}
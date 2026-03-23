import { useState, type JSX } from "react";
import { Link } from "react-router";
import AuthLayout from "../layouts/auth.layout";
import { useAlert } from "../hooks/useAlert.hook";
import type { RegisterForm } from "../models/register.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "../components/modal.component";
import { useModal } from "../hooks/useModal.hook";
import { api } from "../services/api.service";

export default function RegisterPage(): JSX.Element {
    const { showAlert, AlertComponent } = useAlert();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<RegisterForm>({ username: "", password: "", email: "", age: 0 });
    const [messageResponse, setMessageResponse] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const confirmModal = useModal();
    const resultModal = useModal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm(
            (prev) => ({
                ...prev,
                [e.target.name]: (e.target.name == "age") ? Number(e.target.value) : e.target.value
            })
        );
    };

    const toggleShowPassword = (): void => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();
        confirmModal.open();
    };

    const doRegister = async (form: RegisterForm): Promise<void> => {
        setIsLoading(true);

        if (/\s/gm.test(form.username)) {
            showAlert({
                variant: "error",
                title: "Terjadi Kesalahan Pada Inputan",
                message: "Username tidak boleh mengandung spasi"
            });
            setIsLoading(false);
            return;
        }

        if (/\s/gm.test(form.password)) {
            showAlert({
                variant: "error",
                title: "Terjadi Kesalahan Pada Inputan",
                message: "Password tidak boleh mengandung spasi"
            });
            setIsLoading(false);
            return;
        }

        const { codeHttp, message } = await api.post("/api/auth/signup", form);

        if (codeHttp == 201) {
            setMessageResponse(message);
            resultModal.open();
            setIsLoading(false);
            return;
        } else {
            showAlert({
                variant: "error",
                title: "Terjadi Kesalahan Pada Server",
                message: message
            });
            setIsLoading(false);
            return;
        }




    };

    return (
        <AuthLayout
            heading="Daftar Akun Baru."
            sub="Silahkan mengisi form pendaftaran dibawah ini."
            flip={true}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {AlertComponent}
                {/* Username */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={form.username}
                        onChange={handleChange}
                        placeholder="JohnDoe"
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
                                placeholder="Min. 8 characters"
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
                    <span role="alert" className="text-xs font-black uppercase text-gray-50 bg-amber-300/40">dimohon untuk menggunakan email yang aktif !</span>
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
                    Dengan mendaftar, Anda menyetujui {" "}
                    <Link to="#" className="text-blue-400 hover:text-blue-300">Syarat</Link>{" "}
                    dan{" "}
                    <Link to="#" className="text-blue-400 hover:text-blue-300">Kebijakan Privasi</Link>
                    {" "}kami.
                </p>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading && (
                        <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    )}
                    {isLoading ? "Memproses..." : "Create Account"}
                </button>

            </form>
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={confirmModal.close}
                title="Konfrimasi Email"
                message={`Apakah kamu sudah yakin menggunakan email ${form.email} ? karena dibutuhkan email yang aktif`}
                variant="question"
                confirmLabel="Ya, Gunakan itu"
                cancelLabel="Batal"
                onlyCloseButton={false}
                onConfirm={() => doRegister(form)}
            />
            <ConfirmModal
                isOpen={resultModal.isOpen}
                onClose={resultModal.close}
                title="Status Pendaftaran"
                message={`${messageResponse}`}
                variant="success"
                confirmLabel="Baik"
                cancelLabel="Tutup"
                onlyCloseButton={true}
                onConfirm={() => { }}
            />
        </AuthLayout>
    );
}
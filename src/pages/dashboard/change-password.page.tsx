import { useEffect, useState, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";
import type { ChangePasswordBody, ChangePasswordForm } from "../../models/account.model";
import { useAlert } from "../../hooks/useAlert.hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { CheckPasswordStrength } from "../../components/password.component";
import { api } from "../../services/api.service";
import type { GeneralResponse } from "../../models/response.model";
import { ConfirmModal } from "../../components/modal.component";
import { useModal } from "../../hooks/useModal.hook";

export default function ChangePasswordPage(): JSX.Element {
    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showAlert, AlertComponent, hideAlert } = useAlert();
    const [messageResponse, setMessageResponse] = useState<string>("");
    const [strengthPassword, setStrengthPassword] = useState<string>("");
    const [showPasswordCurrent, setShowPasswordCurrent] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfrimPassword, setShowConfrimPassword] = useState<boolean>(false);
    const [form, setForm] = useState<ChangePasswordForm>({
        newPassword: "",
        currentPassword: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const confirmModal = useModal();
    const resultModal = useModal();

    if (dataAccount == null) {
        navigate("/");
    }

    useEffect(() => {
        setPageTitle("Ubah Password")
        setDescFeature(`Silahkan mengubah password akun anda ${dataAccount.username}`)
    }, [setPageTitle, setDescFeature, dataAccount]);

    const toggleShowPassword = (type: string): void => {

        if (type === "currentPassword") {
            setShowPasswordCurrent((prev) => !prev);
        } else if (type === "newPassword") {
            setShowNewPassword((prev) => !prev);
        } else if (type === "confrimPassword") {
            setShowConfrimPassword((prev) => !prev);
        }
        return;
    }

    const handleChangeStrength = (strengthLevel: string): void => {
        setStrengthPassword(strengthLevel);
    }

    const handleCloseModal = (): void => {
        confirmModal.close();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();

        hideAlert();

        if (/\s/gm.test(form.newPassword)) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "Password Baru tidak boleh mengandung spasi"
            });

            return;
        }

        if (strengthPassword === "Lemah") {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "Password terlalu Lemah."
            });


            return;
        }

        if (form.newPassword === form.currentPassword) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "Password baru tidak boleh sama."
            });


            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "Password baru tidak cocok."
            });


            return;
        }

        if (form.newPassword.length < 5) {
            showAlert({
                variant: "error",
                title: "Terjadi Kesalahan Pada Server",
                message: "Password baru minimal 5 karakter."
            });


            return;
        }

        confirmModal.open();
    };

    const doChangePassword = async (form: ChangePasswordForm): Promise<void> => {
        setIsLoading(true);
        const payload: ChangePasswordBody = {
            player_id: Number(dataAccount.player_id),
            old_password: form.currentPassword,
            new_password: form.newPassword
        }

        const { codeHttp, response, message } = await api.patch<GeneralResponse, ChangePasswordBody>("/api/account/change-password", payload);

        if (codeHttp != 200 || !response) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: message
            });
            setIsLoading(false);
            return;
        }

        setMessageResponse(message);
        resultModal.open();
        setIsLoading(false);

        setForm({ newPassword: "", currentPassword: "", confirmPassword: "" });
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {AlertComponent}

                {/* password saat ini */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        Password Saat Ini
                    </label>
                    <div className="flex flex-row gap-1 ">
                        <div className="basis-full">
                            <input
                                name="currentPassword"
                                type={`${showPasswordCurrent ? "text" : "password"}`}
                                required
                                value={form.currentPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div className="grid basis-16 text-zinc-800 bg-zinc-400 place-content-center" onClick={() => toggleShowPassword("currentPassword")}>
                            <div className="w-full h-full">
                                {
                                    showPasswordCurrent == true ?
                                        (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>


                {/* password baru */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        Password Baru
                    </label>
                    <div className="flex flex-row gap-1 ">
                        <div className="basis-full">
                            <input
                                name="newPassword"
                                type={`${showNewPassword ? "text" : "password"}`}
                                required
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div className="grid basis-16 text-zinc-800 bg-zinc-400 place-content-center" onClick={() => toggleShowPassword("newPassword")}>
                            <div className="w-full h-full">
                                {
                                    showNewPassword == true ?
                                        (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Password strength indicator */}
                <CheckPasswordStrength password={form.newPassword} level={strengthPassword} handleChangeLevelStrength={(val) => handleChangeStrength(val)} />

                {/* confrim password */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        Konfrimasi Password Baru
                    </label>
                    <div className="flex flex-row gap-1 ">
                        <div className="basis-full">
                            <input
                                name="confirmPassword"
                                type={`${showConfrimPassword ? "text" : "password"}`}
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div className="grid basis-16 text-zinc-800 bg-zinc-400 place-content-center" onClick={() => toggleShowPassword("confrimPassword")}>
                            <div className="w-full h-full">
                                {
                                    showConfrimPassword == true ?
                                        (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading && (
                        <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    )}
                    {isLoading ? "Menyimpan..." : "Ubah Password"}
                </button>
            </form>
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={handleCloseModal}
                title="Konfrimasi Email"
                message="Anda sudah yakin dengan perubahan pasword anda ?"
                variant="question"
                confirmLabel="Ya, Ganti Password"
                cancelLabel="Batal"
                onlyCloseButton={false}
                onConfirm={() => doChangePassword(form)}
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
        </div>
    );
}

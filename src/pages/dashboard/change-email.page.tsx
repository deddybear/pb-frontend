import { useEffect, useState, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";
import type { ChangeEmailBody, ChangeEmailForm } from "../../models/account.model";
import { useAlert } from "../../hooks/useAlert.hook";
import { useModal } from "../../hooks/useModal.hook";
import { ConfirmModal } from "../../components/modal.component";
import { api } from "../../services/api.service";
import type { GeneralResponse } from "../../models/response.model";

export default function ChangeEmailPage(): JSX.Element {
    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showAlert, AlertComponent, hideAlert } = useAlert();
    const [messageResponse, setMessageResponse] = useState<string>("");
    const [form, setForm] = useState<ChangeEmailForm>({
        currentEmail: dataAccount.email,
        newEmail: ""
    });
    const navigate = useNavigate();
    const confirmModal = useModal();
    const resultModal = useModal();

    if (dataAccount == null) {
        navigate("/");
    }

    useEffect(() => {
        setPageTitle("Ubah Email")
        setDescFeature(`Silahkan mengubah email akun anda ${dataAccount.username}`)
    }, [setPageTitle, setDescFeature, dataAccount]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCloseModal = (): void => {
        setIsLoading(false);
        confirmModal.close();
    }


    const handleSubmit = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();

        setIsLoading(true);
        hideAlert();

        if (form.newEmail === form.currentEmail) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "Email baru tidak boleh sama dengan email saat ini."
            });
            setIsLoading(false);

            return;
        }

        confirmModal.open();
    };

    const doChangeEmail = async (form: ChangeEmailForm): Promise<void> => {
        const payload: ChangeEmailBody = {
            player_id: Number(dataAccount.player_id),
            new_email: form.newEmail,
            old_email: form.currentEmail
        }

        const { codeHttp, response, message } = await api.patch<GeneralResponse, ChangeEmailBody>("/api/account/change-email", payload);

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
        setIsLoading(false);
        setForm({ currentEmail: form.newEmail, newEmail: "" })
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {AlertComponent}
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

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        Email Baru
                    </label>
                    <div className="flex flex-row gap-1 ">
                        <div className="basis-full">
                            <input
                                name="newEmail"
                                type="text"
                                required
                                value={form.newEmail}
                                onChange={handleChange}
                                placeholder={form.newEmail}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                            />
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
                    {isLoading ? "Menyimpan..." : "Ubah Email"}
                </button>
            </form>
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={handleCloseModal}
                title="Konfrimasi Email"
                message="Anda sudah yakin dengan perubahan email anda ?"
                variant="question"
                confirmLabel="Ya, Ganti Email"
                cancelLabel="Batal"
                onlyCloseButton={false}
                onConfirm={() => doChangeEmail(form)}
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
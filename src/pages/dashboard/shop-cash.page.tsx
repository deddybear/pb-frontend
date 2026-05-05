import { useEffect, useState, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";
import { formatCurrency } from "../../utils/formater";
import type { CashVariety } from "../../models/shop.model";
import { useAlert } from "../../hooks/useAlert.hook";
import { useModal } from "../../hooks/useModal.hook";
import { ConfirmModal } from "../../components/modal.component";
import { randomStr } from "../../utils/strings";


export default function ShopCashPage(): JSX.Element {
    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();
    const { showAlert, AlertComponent, hideAlert } = useAlert();
    const [cashValue, setCashValue] = useState<number>(dataAccount.cash);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chooseCashTopUp, setChooseCashTopUp] = useState<string>("");
    const [messageResponse, setMessageResponse] = useState<string>("");
    const listCashTopUp: CashVariety[] = [
        { key: randomStr(32), name: "Cash Point 2500", value: 2500 },
        { key: randomStr(32), name: "Cash Point 5000", value: 5000 },
        { key: randomStr(32), name: "Cash Point 10000", value: 10000 },
        { key: randomStr(32), name: "Cash Point 15000", value: 15000 },
        { key: randomStr(32), name: "Cash Point 25000", value: 25000 },
        { key: randomStr(32), name: "Cash Point 30000", value: 30000 },
        { key: randomStr(32), name: "Cash Point 35000", value: 35000 },
        { key: randomStr(32), name: "Cash Point 50000", value: 50000 }
    ];
    const navigate = useNavigate();
    const confirmModal = useModal();
    const resultModal = useModal();

    if (dataAccount == null) {
        navigate("/");
    }

    useEffect(() => {
        setPageTitle("Shop Cash")
        setDescFeature(`Menu untuk melakukan top-up Cash`)

    }, [setPageTitle, setDescFeature, dataAccount]);

    const handleCloseModal = (): void => {
        confirmModal.close();
    }

    const handClickTopUp = (keyTopUp: string): void => {
        hideAlert();
        
        const keyExist = listCashTopUp.some(data => data.key === keyTopUp);
        
        console.log(keyTopUp, keyExist);


        if (keyExist == false) {

            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "key choose data topup tidak sesuai"
            });

            setIsLoading(false);

            return;
        }

        confirmModal.open();
    }

    const doTopUpCash = async (keyTopUp: string): Promise<void> => {
        alert(keyTopUp)
    }

    return (
        <div>

            <div className="flex flex-col gap-1.5">
                {/* Cash Value */}
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Cash anda Ini
                </label>
                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-sm px-4 py-3 text-zinc-500 text-sm">
                    {formatCurrency(cashValue)}
                </div>
            </div>

            <div className="my-5">
                {AlertComponent}
            </div>

            {/* Variant Cash */}
            <div className="my-5">
                <h1 className="text-white font-black text-1xl sm:text-2xl uppercase tracking-tight">
                    List Cash
                </h1>
                <div className="mt-2 grid grid-cols-4 gap-3">
                    {listCashTopUp.map((data, index) => (
                        <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-center">
                            <p className="text-blue-400 font-black text-lg leading-none">{data.name}</p>
                            <p className="text-zinc-600 text-xs uppercase tracking-widest mt-1">{`Rp ${formatCurrency(data.value)},-`}</p>
                            <button
                                onClick={() => handClickTopUp(data.key)}
                                className={`w-full py-3 flex items-center justify-center gap-2 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-sm hover:bg-blue-300 transition-colors mt-2 ${isLoading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-400 cursor-pointer"}`}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                )}
                                {isLoading ? "Memproses..." : "Beli"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={handleCloseModal}
                title="Pembelian Cash"
                message="Anda sudah yakin dengan Pembelian anda ?"
                variant="question"
                confirmLabel="Ya, Lanjutkan"
                cancelLabel="Batal"
                onlyCloseButton={false}
                onConfirm={() => doTopUpCash(chooseCashTopUp)}
            />
            <ConfirmModal
                isOpen={resultModal.isOpen}
                onClose={resultModal.close}
                title="Status Perubahan Email"
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
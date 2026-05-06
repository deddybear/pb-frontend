import { useEffect, useState, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";
import { api } from "../../services/api.service";
import { formatCurrency } from "../../utils/formater";
import type { PointVariety, TopUpPointBody } from "../../models/point-shop.model";
import { useAlert } from "../../hooks/useAlert.hook";
import { useModal } from "../../hooks/useModal.hook";
// import { useAuth } from "../../hooks/useAuth.hook";
import { ConfirmModal } from "../../components/modal.component";
import { randomStr } from "../../utils/strings";
import type { GeneralResponse } from "../../models/response.model";
import type { DataAccount } from "../../models/login.model";
import { SaveSessionLogin } from "../../services/session.service";

export default function ShopPointPage(): JSX.Element {
    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();
    const { showAlert, AlertComponent, hideAlert } = useAlert();
    const [pointValue, setPointValue] = useState<number>(dataAccount.gold);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [choosePointTopUp, setChoosePointTopUp] = useState<PointVariety>();
    const [messageResponse, setMessageResponse] = useState<string>("");
    const [messageConfrimModal, setMessageConfrimModal] = useState<string>("");
    const listPointTopUp: PointVariety[] = [
        { key: randomStr(32), name: "Top Up Point 10000", value: 10000 },
        { key: randomStr(32), name: "Top Up Point 15000", value: 15000 },
        { key: randomStr(32), name: "Top Up Point 25000", value: 25000 },
        { key: randomStr(32), name: "Top Up Point 30000", value: 30000 },
        { key: randomStr(32), name: "Top Up Point 35000", value: 35000 },
        { key: randomStr(32), name: "Top Up Point 50000", value: 50000 },
        { key: randomStr(32), name: "Top Up Point 75000", value: 75000 },
        { key: randomStr(32), name: "Top Up Point 90000", value: 90000 }
    ];
    const navigate = useNavigate();
    const confirmModal = useModal();
    const resultModal = useModal();
    // const { login } = useAuth();

    if (dataAccount == null) {
        navigate("/");
    }


    useEffect(() => {
        setPageTitle("Shop Point")
        setDescFeature(`Menu untuk melakukan top-up Point`)
    }, [setPageTitle, setDescFeature, dataAccount]);

    const handleCloseModal = (): void => {
        confirmModal.close();
    }

    const fetchPointPlayer = async (playerId: number): Promise<number | null> => {

        const { codeHttp, response, message } = await api.get<GeneralResponse<DataAccount>>("/api/account/get-data", {
            params: { player_id: playerId }
        });

        if (codeHttp != 200 || !response) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan Fetch data Player",
                message: message
            });
            return null;
        }

        SaveSessionLogin(response.response)

        return response.response.gold;
    }

    const handleClickBuy = (keyTopUp: string): void => {
        hideAlert();

        const keyExist = listPointTopUp.some(data => data.key === keyTopUp);

        if (keyExist == false) {

            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "key choose data topup tidak sesuai"
            });

            setIsLoading(false);

            return;
        }

        const dataPointTopUp = listPointTopUp.find(data => data.key === keyTopUp);

        if (!dataPointTopUp) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "data topup point tidak ditemukan"
            });
        }

        setChoosePointTopUp(dataPointTopUp)

        setMessageConfrimModal(`Apakah anda yakin dengan pembelian ${dataPointTopUp?.name} ?`);
        confirmModal.open();
    }

    const doTopUpPoint = async (dataPointTopUp: PointVariety): Promise<void> => {
        setIsLoading(true);

        const payload: TopUpPointBody = {
            player_id: Number(dataAccount.player_id),
            top_up_type: "gold",
            value: dataPointTopUp.value
        }

        const { codeHttp, response, message } = await api.patch<GeneralResponse, TopUpPointBody>("/api/shop/top-up-money", payload);

        if (codeHttp != 200 || !response) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: message
            });
            setIsLoading(false);
            return;
        }

        const fetchPoint = await fetchPointPlayer(Number(dataAccount.player_id));
        const newValuePoint = fetchPoint == null ? dataAccount.gold : fetchPoint;

        setPointValue(newValuePoint);
        setMessageResponse(message);
        resultModal.open();
        setIsLoading(false);


    }

    return (
        <div>

            <div className="flex flex-col gap-1.5">
                {/* Point Value */}
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Point anda Ini
                </label>
                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-sm px-4 py-3 text-zinc-500 text-sm">
                    {formatCurrency(pointValue)}
                </div>
            </div>

            <div className="my-5">
                {AlertComponent}
            </div>

            {/* Variant Point */}
            <div className="my-5">
                <h1 className="text-white font-black text-1xl sm:text-2xl uppercase tracking-tight">
                    List Point
                </h1>
                <div className="mt-2 grid grid-cols-4 gap-3">
                    {listPointTopUp.map((data, index) => (
                        <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-center">
                            <p className="text-blue-400 font-black text-lg leading-none">{data.name}</p>
                            <p className="text-zinc-600 text-xs uppercase tracking-widest mt-1">{`Rp ${formatCurrency(data.value)},-`}</p>
                            <button
                                onClick={() => handleClickBuy(data.key)}
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
                title="Pembelian Point"
                message={messageConfrimModal}
                variant="question"
                confirmLabel="Ya, Lanjutkan"
                cancelLabel="Batal"
                onlyCloseButton={false}
                onConfirm={() => doTopUpPoint(choosePointTopUp!)}
            />
            <ConfirmModal
                isOpen={resultModal.isOpen}
                onClose={resultModal.close}
                title="Status Pembelian Point"
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
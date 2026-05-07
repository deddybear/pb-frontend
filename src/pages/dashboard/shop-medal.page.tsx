import { useEffect, useState, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";
import { listEnsignTopUp, listMasterMedalTopUp, listMedalTopUp, listRibbonTopUp, type DataMedalPlayer, type MedalVariety, type ShopMedal, type TopUpMedalBody, type TypeMedal } from "../../models/medal-shop.model";
import { useAlert } from "../../hooks/useAlert.hook";
import { useModal } from "../../hooks/useModal.hook";
import { ConfirmModal } from "../../components/modal.component";
import { api } from "../../services/api.service";
import type { GeneralResponse } from "../../models/response.model";

export default function ShopMedalPage(): JSX.Element {
    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showAlert, AlertComponent, hideAlert } = useAlert();
    const [valueSelectMedal, setValueSelectMedal] = useState<string>("");
    const [medalValue, setMedalValue] = useState<string>("-");
    const [messageResponse, setMessageResponse] = useState<string>("");
    const [messageConfrimModal, setMessageConfrimModal] = useState<string>("");
    const [chooseMedalTopUp, setChooseMedalTopUp] = useState<ShopMedal>();
    const navigate = useNavigate();
    const confirmModal = useModal();
    const resultModal = useModal();
    // console.log(!choiceMedal);

    if (dataAccount == null) {
        navigate("/");
    }

    useEffect(() => {
        setPageTitle("Shop Medal")
        setDescFeature(`Menu untuk melakukan top-up Medal untuk membuka title anda`)

    }, [setPageTitle, setDescFeature]);


    const listChoiceMedal: TypeMedal[] = [
        { label: "Ribbon", value: "ribbon" },
        { label: "Ensign", value: "ensign" },
        { label: "Medal", value: "medal" },
        { label: "Master Medal", value: "master_medal" }
    ];

    const ListShopMedal: MedalVariety[] = [
        { key: "", name: "-", value: [] },
        { key: "ribbon", name: "Ribbon", value: listRibbonTopUp },
        { key: "ensign", name: "Ensign", value: listEnsignTopUp },
        { key: "medal", name: "Medal", value: listMedalTopUp },
        { key: "master_medal", name: "Master Medal", value: listMasterMedalTopUp },
    ];

    const medalChoose = ListShopMedal.find((item) => item.key === valueSelectMedal);

    const fetchDataMedalPlayer = async (valueSelected: string): Promise<string> => {

        const { codeHttp, response, message } = await api.get<GeneralResponse<DataMedalPlayer>>("/api/account/get-data-medal", {
            params: { player_id: dataAccount.player_id }
        });

        if (codeHttp != 200 || !response) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: message
            });
            return "";
        }

        return String(response.response[valueSelected as keyof DataMedalPlayer]);
    }

    const handleCloseModal = (): void => {
        confirmModal.close();
    }

    const handleChangeSelectMedal = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        setIsLoading(true);
        hideAlert();

        const valueSelected = e.target.value;

        if (valueSelected === "") {
            setValueSelectMedal("");
            setMedalValue("-");
            return;
        }

        setValueSelectMedal(valueSelected);

        const stringNumber = await fetchDataMedalPlayer(valueSelected);
        setMedalValue(stringNumber);
        setIsLoading(false);
    }

    const handleClickBuy = (keyTopUp: string): void => {
        hideAlert();

        const keyExist = medalChoose?.value.some(data => data.key === keyTopUp);

        if (keyExist == false) {

            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "key choose data topup tidak sesuai"
            });

            setIsLoading(false);

            return;
        }

        const dataMedalTopUp = medalChoose?.value.find(data => data.key === keyTopUp);

        if (dataMedalTopUp === undefined) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: "data topup tidak ditemukan"
            });
        }

        setMessageConfrimModal(`Apakah anda yakin dengan pembelian ${dataMedalTopUp?.name} ?`);
        setChooseMedalTopUp(dataMedalTopUp);
        confirmModal.open();
    }

    const doTopUpMedal = async (dataMedalTopUp: ShopMedal): Promise<void> => {
        setIsLoading(true);

        const payload: TopUpMedalBody = {
            player_id: Number(dataAccount.player_id),
            top_up_type: dataMedalTopUp.type,
            value: dataMedalTopUp.value
        }

        const { codeHttp, response, message } = await api.patch<GeneralResponse, TopUpMedalBody>("/api/shop/top-up-medal", payload);

        if (codeHttp != 200 || !response) {
            showAlert({
                variant: "error",
                title: "Ada Kesalahan",
                message: message
            });
            setIsLoading(false);
            return;
        }

        const fetchCash = await fetchDataMedalPlayer(dataMedalTopUp.type);
        const newValueCash = fetchCash === "" ? "Gagal Load silahkan refresh" : fetchCash;

        setMedalValue(newValueCash);
        setMessageResponse(message);
        resultModal.open();
        setIsLoading(false);


    }

    return (
        <div>
            {/* Medal Pilihan */}
            <div className="flex flex-col gap-1.5 my-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Silahkan Pilih Medal
                </label>
                <select className="bg-zinc-800/50 border border-zinc-700/50 rounded-sm px-4 py-3 text-zinc-500 text-sm" value={valueSelectMedal} onChange={handleChangeSelectMedal} >
                    <option className="text-zinc-950 text-sm" value="">-- Pilih Type Medal --</option>
                    {listChoiceMedal.map((medal, index) => (
                        <option className="text-zinc-950 text-sm" key={index} value={medal.value}>{medal.label}</option>
                    ))}
                </select>
            </div>

            {/* Medal Value */}
            <div className="flex flex-col gap-1.5 my-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Medal Value
                </label>
                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-sm px-4 py-3 text-zinc-500 text-sm">
                    {medalValue}
                </div>
            </div>

            <div className="my-5">
                {AlertComponent}
            </div>


            {/* Variant Medal */}
            <div className="my-5">
                <h1 className="text-white font-black text-1xl sm:text-2xl uppercase tracking-tight">
                    List Price Medal
                </h1>
                <div className="mt-2 grid grid-cols-3 gap-4">
                    {!valueSelectMedal ?
                        (<p className="text-zinc-500 text-sm col-span-4">
                           Silahkan Pilih medal terlebih dahulu
                        </p>) : isLoading ?
                            (<p className="text-zinc-500 text-sm col-span-4">
                                Memuat...
                            </p>) :
                            (medalChoose?.value.map((data, index) => (
                                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-center">
                                    <p className="text-blue-400 font-black text-lg leading-none">{data.name}</p>
                                    {/* <p className="text-zinc-600 text-xs uppercase tracking-widest mt-1">{`Rp ${formatCurrency(data.value)},-`}</p> */}
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
                            )))
                    }
                </div>
            </div>
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={handleCloseModal}
                title="Pembelian Medal"
                message={messageConfrimModal}
                variant="question"
                confirmLabel="Ya, Lanjutkan"
                cancelLabel="Batal"
                onlyCloseButton={false}
                onConfirm={() => doTopUpMedal(chooseMedalTopUp!)}
            />
            <ConfirmModal
                isOpen={resultModal.isOpen}
                onClose={resultModal.close}
                title="Status Pembelian Medal"
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
import { useEffect, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";

export default function ShopWeaponPage(): JSX.Element {

    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();

    const navigate = useNavigate();

    if (dataAccount == null) {
        navigate("/");
    }

    useEffect(() => {
        setPageTitle("Shop Cash")
        setDescFeature(`Menu untuk melakukan pembelian senjata diperlukan untuk anda`)
    }, [setPageTitle, setDescFeature, dataAccount]);

    return (
        <div>


            <div className="grid place-content-center">
                <h1 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                    Fitur masih belum tersedia
                </h1>
            </div>
        </div>
    );
}
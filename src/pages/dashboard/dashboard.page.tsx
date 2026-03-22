import { useEffect, type JSX } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { type DashboardOutletContext } from "../../models/dashboard.model";



export default function DashboardPages(): JSX.Element {
    const { setPageTitle, dataAccount, setDescFeature } = useOutletContext<DashboardOutletContext>();
    const navigate = useNavigate();

    if (dataAccount == null) {
        navigate("/");
    }



    useEffect(() => {
        setPageTitle("Dashboard")
        setDescFeature(`Selamat datang ${dataAccount.username}`)
    }, [setPageTitle, setDescFeature, dataAccount]);


    return (
        <div>
            {/* Breadcrumb */}


            <div className="grid place-content-center">
                <h1 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                    Fitur masih belum tersedia
                </h1>
            </div>
        </div>
    );
}
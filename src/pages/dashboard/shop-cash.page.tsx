import { useEffect, type JSX } from "react";
import { type DashboardOutletContext } from "../../models/dashboard.model";
import { useOutletContext, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.hook";
import BreadcrumbComponent from "../../components/breadcump.component";

export default function ShopCashPage(): JSX.Element {

    const { setPageTitle } = useOutletContext<DashboardOutletContext>();
    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.dataAccount == null) {
        navigate("/");
    }


    useEffect(() => {
        setPageTitle("Shop Cash")
    }, [setPageTitle]);

    return (
        <div>
            {/* Breadcrumb */}
            <BreadcrumbComponent />

            {/* Page heading */}
            <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                        Shop Cash
                    </h1>
                    <p className="text-zinc-500 mt-1 text-sm">
                        Welcome back, {auth.dataAccount?.username}. Here's what's happening.
                    </p>
                </div>
            </div>

            <div className="grid place-content-center">
                <h1 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                    Fitur masih belum tersedia 
                </h1>
            </div>
        </div>
    );
}
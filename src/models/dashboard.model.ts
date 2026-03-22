import type { DataAccount } from "./login.model";

export interface DashboardOutletContext {
    setPageTitle: (title: string) => void;
    setPageSubtitle: (subtitle: string) => void;
    setDescFeature: (desc: string) => void;
    dataAccount: DataAccount;
}
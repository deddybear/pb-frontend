import type { DataAccount } from "../models/login.model";


export function SaveSessionLogin(dataLogin: DataAccount | null | undefined | unknown): void {
    console.log(dataLogin);
    
    if (!dataLogin) {
        console.warn("SaveSessionLogin: data is null or undefined");
        return;
    }


    for (const [key, value] of Object.entries(dataLogin)) {
        localStorage.setItem(key, value);
    }
}

export function SaveSessionToken(dataToken: string): void {
    localStorage.setItem('ab6_log_stat', dataToken);
}

export function CheckLogin(): boolean {
    const logStat = localStorage.getItem('ab6_log_stat');
    return logStat !== null && logStat !== "";
}
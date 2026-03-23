import type { DataAccount } from "../models/login.model";


export function SaveSessionLogin(dataLogin: DataAccount | null | undefined | unknown): void {
    // console.log(dataLogin);

    if (!dataLogin) {
        console.warn("SaveSessionLogin: data is null or undefined");
        return;
    }


    for (const [key, value] of Object.entries(dataLogin)) {
        localStorage.setItem(key, value);
    }
}

export function GetSession(): DataAccount {

    return {
        access_level: Number(localStorage.getItem("access_level")),
        age: Number(localStorage.getItem("age")),
        cash: Number(localStorage.getItem("cash")),
        create_time: localStorage.getItem("create_time") ?? "",
        email: localStorage.getItem("email") ?? "",
        experience: Number(localStorage.getItem("experience")),
        gold: Number(localStorage.getItem("gold")),
        nickname: localStorage.getItem("nickname") ?? "",
        pc_cafe: Number(localStorage.getItem("pc_cafe")),
        player_id: Number(localStorage.getItem("player_id")),
        rank: Number(localStorage.getItem("rank")),
        update_time: localStorage.getItem("update_time") ?? "",
        token: localStorage.getItem("ab6_log_stat") ?? "",
        username: localStorage.getItem("username") ?? ""
    };
}


export function ClearSession(): void {
    const keys: string[] = [
        "access_level", "age", "cash", "create_time", "email",
        "experience", "gold", "nickname", "pc_cafe", "player_id",
        "rank", "ab6_log_stat", "update_time", "username", "token",
    ];

    keys.forEach((key) => localStorage.removeItem(key));
}

export function SaveSessionToken(dataToken: string): void {
    localStorage.setItem('ab6_log_stat', dataToken);
}

export function CheckLogin(): boolean {
    const logStat = localStorage.getItem('ab6_log_stat');
    return logStat !== null && logStat !== "";
}
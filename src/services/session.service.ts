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
        accessLevel: Number(localStorage.getItem("accessLevel")),
        age: Number(localStorage.getItem("age")),
        cash: Number(localStorage.getItem("cash")),
        createTime: localStorage.getItem("createTime") ?? "",
        email: localStorage.getItem("email") ?? "",
        experience: Number(localStorage.getItem("experience")),
        gold: Number(localStorage.getItem("gold")),
        nickname: localStorage.getItem("nickname") ?? "",
        pcCafe: Number(localStorage.getItem("pcCafe")),
        playerId: Number(localStorage.getItem("playerId")),
        rank: Number(localStorage.getItem("rank")),
        updateTime: localStorage.getItem("updateTime") ?? "",
        token: localStorage.getItem("ab6_log_stat") ?? "",
        username: localStorage.getItem("username") ?? ""
    };
}


export function ClearSession(): void {
    const keys: string[] = [
        "accessLevel", "age", "cash", "createTime", "email",
        "experience", "gold", "nickname", "pcCafe", "playerId",
        "rank", "ab6_log_stat", "updateTime", "username",
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
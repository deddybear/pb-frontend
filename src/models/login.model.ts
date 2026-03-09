export interface LoginForm {
    username: string;
    password: string;
}

export interface DataAccount {
    accessLevel: number;
    age: number;
    cash: number;
    createTime: string;
    email: string;
    experience: number;
    gold: number;
    nickname: string;
    pcCafe: number;
    playerId: number;
    rank: number;
    updateTime: string;
}

export interface LoginData {
    dataAccount: DataAccount;
    token: string;
}
export interface LoginForm {
    username: string;
    password: string;
}

export interface DataAccount {
    access_level: number;
    age: number;
    cash: number;
    create_time: string;
    email: string;
    experience: number;
    gold: number;
    nickname: string;
    pc_cafe: number;
    player_id: number;
    rank: number;
    token: string;
    update_time: string;
    username: string;
}

export interface LoginData {
    dataAccount: DataAccount;
    token: string;
}
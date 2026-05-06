export interface CashVariety {
    key: string;
    name: string;
    value: number;
}

export interface TopUpCashBody {
    player_id : number;
    top_up_type: string;
    value: number;
}
export interface PointVariety {
    key: string;
    name: string;
    value: number;
}

export interface TopUpPointBody {
    player_id : number;
    top_up_type: string;
    value: number;
}
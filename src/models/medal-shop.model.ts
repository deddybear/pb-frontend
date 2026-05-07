import { randomStr } from "../utils/strings";

export interface TopUpMedalBody {
    player_id : number;
    top_up_type: string;
    value: number;
}

export interface TypeMedal {
    label: string;
    value: string;
}

export interface MedalVariety {
    key: string;
    name: string;
    value: ShopMedal[]
}

export interface ShopMedal {
    key: string;
    name: string;
    type: string;
    value: number;
}

export interface DataMedalPlayer {
    ribbon: number;
    ensign: number;
    medal: number;
    master_medal: number;
    update_time: string;
}

export const listRibbonTopUp: ShopMedal[] = [
    { key: randomStr(32), name: "Top Up Ribbon 10", type: "ribbon", value: 10 },
    { key: randomStr(32), name: "Top Up Ribbon 25", type: "ribbon", value: 25 },
    { key: randomStr(32), name: "Top Up Ribbon 50", type: "ribbon", value: 50 },
];

export const listEnsignTopUp: ShopMedal[] = [
    { key: randomStr(32), name: "Top Up Ensign 10", type: "ensign", value: 10 },
    { key: randomStr(32), name: "Top Up Ensign 25", type: "ensign", value: 25 },
    { key: randomStr(32), name: "Top Up Ensign 50", type: "ensign", value: 50 },
];

export const listMedalTopUp: ShopMedal[] = [
    { key: randomStr(32), name: "Top Up Medal 10", type: "medal", value: 10 },
    { key: randomStr(32), name: "Top Up Medal 25", type: "medal", value: 25 },
    { key: randomStr(32), name: "Top Up Medal 50", type: "medal", value: 50 },
];

export const listMasterMedalTopUp: ShopMedal[] = [
    { key: randomStr(32), name: "Top Up Master Medal 5", type: "master_medal", value: 5 },
    { key: randomStr(32), name: "Top Up Master Medal 15", type: "master_medal", value: 15 },
    { key: randomStr(32), name: "Top Up Master Medal 25", type: "master_medal", value: 25 },
];
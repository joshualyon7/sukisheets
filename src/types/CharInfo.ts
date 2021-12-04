import { StatInfo } from './StatInfo';

export interface CharInfo {
    name?: string,
    stats?: StatInfo,
    level: number,
    hp?: number,
    tempHp?: number,
    race?: string,
    alignment?: string,
    background?: string
}

export interface CharInfoAction {
    type: 'setHealth' | 'setName' | 'setLevel' | 'setStats' | 'setTempHealth' | 'setCharInfo',
    payload: string | StatInfo | number | CharInfo
}

import { ESkill } from './Skill';

export interface AbilityInfo {
    name: EAbility,
    value: number,
    modifier: number,
    relevantSkills: ESkill[]
}

export enum EAbility {
    STR = 'str', DEX = 'dex', CON = 'con', INT = 'int', WIS = 'wis', CHA = 'cha'
}

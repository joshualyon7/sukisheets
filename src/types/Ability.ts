import { Skill } from './Skill';

export interface AbilityInfo {
    name: Ability,
    value: number,
    modifier: number,
    relevantSkills: Skill[]
}

export enum Ability {
    STR = 'str', DEX = 'dex', CON = 'con', INT = 'int', WIS = 'wis', CHA = 'cha'
}

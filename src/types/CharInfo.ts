import { Ability, AbilityInfo } from './Ability';
import { Skill } from './Skill';

export function initChar(initialChar: CharInfo) {
    return initialChar;
}

export function charReducer(char: CharInfo, action: CharInfoAction): CharInfo {
    switch (action.type) {
    case 'setName':
        return { ...char, name: action.payload as string };
    case 'setAbility':
        // eslint-disable-next-line no-extra-parens
        char.abilities.set((action.payload as AbilityInfo).name, action.payload as AbilityInfo);
        return { ...char };
    case 'addProficiency':
        return { ...char, proficiencies: [...char.proficiencies, action.payload as Skill] };
    case 'removeProficiency':
        return { ...char, proficiencies: char.proficiencies.filter(prof => prof !== action.payload as Skill)};
    case 'reset':
        return initChar(action.payload as CharInfo);
    default:
        throw new Error('Illegal reducer action!');
    }
}
export interface CharInfo {
    name: string,
    abilities: Map<Ability, AbilityInfo>,
    proficiencies: Skill[];
    baseAc: number
}

export interface CharInfoAction {
    type: 'setAbility' | 'setName'| 'reset' | 'addProficiency' | 'removeProficiency',
    payload: string | AbilityInfo | CharInfo | Skill
}

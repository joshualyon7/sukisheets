import { AbilityInfo } from './AbilityInfo';
import { ESkill } from './Skill';
import { EAbility } from './AbilityInfo';
import { IClass } from './Class';

export function initChar(initialChar: ICharInfo) {
    return initialChar;
}

export function charReducer(char: ICharInfo, action: ICharInfoAction): ICharInfo {
    switch (action.type) {
    case 'setName':
        return { ...char, name: action.payload as string };
    case 'setAbility':
        // eslint-disable-next-line no-extra-parens
        char.abilities.set((action.payload as AbilityInfo).name, action.payload as AbilityInfo);
        return { ...char };
    case 'addProficiency':
        return { ...char, proficiencies: [...char.proficiencies, action.payload as ESkill] };
    case 'removeProficiency':
        return { ...char, proficiencies: char.proficiencies.filter(prof => prof !== action.payload as ESkill)};
    case 'reset':
        return initChar(action.payload as ICharInfo);
    default:
        throw new Error('Illegal reducer action!');
    }
}
export interface ICharInfo {
    name: string,
    abilities: Map<EAbility, AbilityInfo>,
    proficiencies: ESkill[];
    baseAc: number,
    classList: IClass[]
}

export interface ICharInfoAction {
    type: 'setAbility' | 'setName'| 'reset' | 'addProficiency' | 'removeProficiency',
    payload: string | AbilityInfo | ICharInfo | ESkill
}

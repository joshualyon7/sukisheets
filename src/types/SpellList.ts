import { Spell } from './Spell';

/**
 * Conforms to the api from https://api.open5e.com/spells
 */
export interface SpellList {
    count: number,
    next: string | null,
    previous: string | null,
    results: Spell[]
}


export function isSpellList(spellList: any): spellList is SpellList {
    return 'count' in spellList
    && 'next' in spellList
    && 'previous' in spellList
    && 'results' in spellList;
}

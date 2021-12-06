import RACES from '../data/races.json';

export interface IRace {
    name: string;
    baseSpeed: number;
    features: string[];
}

export const races: Map<string, IRace> = new Map<string, IRace>(
    RACES.map(jsonRace => {
        return [jsonRace.name, jsonRace];
    })
);

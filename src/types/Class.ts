import { EDice } from './Dice';
import CLASSES from '../data/classes.json';

export interface IClass {
    name: string,
    hitDice: EDice;
    features: string[];
    level?: number
}

export const classes: Map<string, IClass> = new Map<string, IClass>(
    CLASSES.map(jsonClass => {
        return [jsonClass.name, {...jsonClass, hitDice: Number.parseInt(jsonClass.hitDice)}];
    })
);

console.log(classes);


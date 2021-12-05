/**
 * Calculates the modifier for a given ability score based on the table in
 * the player's handbook.
 * @param abilityScore score to calculate modifier based on
 * @returns the modifier.
 */
export function calculateModifier(abilityScore: number): number {
    let mod = -5;
    for(let i = 2; i <= 30; i += 2) {
        if (abilityScore < i) return mod;
        mod++;
    }
    return mod;
}

/**
 * creates a string representing the sign and value of a given number
 * @param value number to make signed
 * @returns the signed value
 */
export function makeSignedNumber(value: number): string {
    return value >= 0 ? `+${value}` : `${value}`;
}

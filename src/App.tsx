import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import StatPane from './components/StatPane';
import CombatPane from './components/CombatPane';
import InfoPane from './components/InfoPane';
// import { CharInfo, CharInfoAction } from './types/CharInfo';
import { EAbility, AbilityInfo } from './types/AbilityInfo';
import { calculateModifier } from './utilities';
import { ESkill } from './types/Skill';
import { ICharInfo, charReducer, initChar } from './types/CharInfo';
import { classes } from './types/Class';
import { races } from './types/Race';

export const skillMap = new Map<EAbility, ESkill[]>([
    [EAbility.STR, [ESkill.ATHLETICS, ]],
    [EAbility.DEX, [ESkill.ACROBATICS, ESkill.SLEIGHT_OF_HAND, ESkill.STEALTH]],
    [EAbility.INT, [ESkill.ARCANA, ESkill.HISTORY, ESkill.INVESTIGATION, ESkill.NATURE, ESkill.RELIGION]],
    [EAbility.WIS, [ESkill.ANIMAL_HANDLING, ESkill.INSIGHT, ESkill.MEDICINE, ESkill.PERCEPTION, ESkill.SURVIVAL]],
    [EAbility.CHA, [ESkill.DECEPTION, ESkill.INTIMIDATION, ESkill.PERFORMANCE, ESkill.PERSUASION]],
    [EAbility.CON, []]
]);

const DEFAULT_ABILITY_MAP = new Map<EAbility, AbilityInfo>(Object.values(EAbility).map(ability => {
    return [ability, {
        name: ability,
        value: 12,
        modifier: calculateModifier(12),
        relevantSkills: skillMap.get(ability) || []
    }];
}));

const defaultChar: ICharInfo = {
    name: 'Tim',
    abilities: DEFAULT_ABILITY_MAP,
    proficiencies: [],
    baseAc: 10,
    classList: [classes.get('wizard')!, classes.get('fighter')!],
    race: races.get('human')!,
    playerName: 'Josh',
    curHp: classes.get('fighter')!.hitDice
};

function App() {
    const [curChar, dispatchChar] = useReducer(charReducer, defaultChar, initChar);

    return (
        <Container fluid className='h-100 App'>
            <Row className='h-100'>
                <Col lg={9} className='h-100'>
                    <InfoPane char={curChar} _dispatch={dispatchChar}/>
                    <Row className='h-100'>
                        <StatPane char={curChar} dispatch={dispatchChar}/>
                        <CombatPane char={curChar} _dispatch={dispatchChar}/>
                    </Row>
                </Col>
                <Col lg={3}>
                    <Row>
                        Proficiencies and languages
                    </Row>
                    <Row>
                        Inventory and equipment
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default App;

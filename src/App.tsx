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

const DEFAULT_ABILITY_SCORE = 12;
const DEFAULT_BASE_AC = 10;
const DEFAULT_CLASSES = [classes.get('wizard')!, classes.get('fighter')!];
const DEFAULT_RACE = races.get('human')!;

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
        value: DEFAULT_ABILITY_SCORE,
        modifier: calculateModifier(DEFAULT_ABILITY_SCORE),
        relevantSkills: skillMap.get(ability) || []
    }];
}));

function App() {
    const initialState: ICharInfo = {
        name: 'Tim',
        abilities: DEFAULT_ABILITY_MAP,
        proficiencies: [],
        baseAc: DEFAULT_BASE_AC,
        classList: DEFAULT_CLASSES,
        race: DEFAULT_RACE
    };
    const [curChar, dispatchChar] = useReducer(charReducer, initialState, initChar);

    return (
        <Container fluid className='h-100 App'>
            <Row className='h-100'>
                <Col lg={9} className='h-100'>
                    <InfoPane/>
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

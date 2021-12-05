import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import StatPane from './components/StatPane';
import CombatPane from './components/CombatPane';
import InfoPane from './components/InfoPane';
// import { CharInfo, CharInfoAction } from './types/CharInfo';
import { Ability, AbilityInfo } from './types/Ability';
import { calculateModifier } from './utilities';
import { Skill } from './types/Skill';
import { CharInfo, charReducer, initChar } from './types/CharInfo';

const DEFAULT_ABILITY_SCORE = 12;
const DEFAULT_BASE_AC = 10;

export const skillMap = new Map<Ability, Skill[]>([
    [Ability.STR, [Skill.ATHLETICS, ]],
    [Ability.DEX, [Skill.ACROBATICS, Skill.SLEIGHT_OF_HAND, Skill.STEALTH]],
    [Ability.INT, [Skill.ARCANA, Skill.HISTORY, Skill.INVESTIGATION, Skill.NATURE, Skill.RELIGION]],
    [Ability.WIS, [Skill.ANIMAL_HANDLING, Skill.INSIGHT, Skill.MEDICINE, Skill.PERCEPTION, Skill.SURVIVAL]],
    [Ability.CHA, [Skill.DECEPTION, Skill.INTIMIDATION, Skill.PERFORMANCE, Skill.PERSUASION]],
    [Ability.CON, []]
]);

const DEFAULT_ABILITY_MAP = new Map<Ability, AbilityInfo>(Object.values(Ability).map(ability => {
    return [ability, {
        name: ability,
        value: DEFAULT_ABILITY_SCORE,
        modifier: calculateModifier(DEFAULT_ABILITY_SCORE),
        relevantSkills: skillMap.get(ability) || []
    }];
}));

function App() {
    const initialState: CharInfo = {
        name: 'Tim',
        abilities: DEFAULT_ABILITY_MAP,
        proficiencies: [],
        baseAc: DEFAULT_BASE_AC
    };
    const [curChar, dispatchChar] = useReducer(charReducer, initialState, initChar);
    console.log(curChar);

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

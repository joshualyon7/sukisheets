import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { diceToString, makeSignedNumber } from '../utilities';
import HealthPane from './HealthPane';
import '../css/CombatPane.css';
import '../App.css';
import { EAbility } from '../types/AbilityInfo';
import { InfoBox } from './InfoBox';

export default function CombatPane({char, _dispatch}: {
    char: ICharInfo, _dispatch: Dispatch<ICharInfoAction>
}) {
    const hitDice = char.classList.map(c => diceToString([c.level || 1, c.hitDice])).join('\n');

    function DeathSavePane() {
        return (
            <div className='raised-pane'>
                <div>
                    Successes -
                    <input className='save-input success' type='checkbox'></input>
                    <input className='save-input success' type='checkbox'></input>
                    <input className='save-input success' type='checkbox'></input>
                </div>
                <div>
                    Failures -
                    <input className='save-input failure' type='checkbox'></input>
                    <input className='save-input failure' type='checkbox'></input>
                    <input className='save-input failure' type='checkbox'></input>
                </div>
            </div>
        );
    }

    return (
        <Col lg={8}>
            <Row>
                <HealthPane char={char} dispatch={_dispatch}></HealthPane>
                <Col className='pane'>
                    <Row>
                        <Col>
                            <InfoBox title='Hit Dice' value={hitDice}/>
                            <InfoBox title='Initiative' value={makeSignedNumber(char.abilities.get(EAbility.DEX)!.modifier)}/>
                        </Col>
                        <Col>
                            <InfoBox title='Death Saves'><DeathSavePane/></InfoBox>
                            <InfoBox title='Speed' value={`${char.race.baseSpeed}ft`}></InfoBox>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                Attacking
            </Row>
            <Row>
                Other features
            </Row>
        </Col>
    );

}



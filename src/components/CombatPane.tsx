import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { diceToString } from '../utilities';
import HealthPane from './HealthPane';
import '../css/CombatPane.css';
import '../App.css';

export default function CombatPane({char, _dispatch}: {
    char: ICharInfo, _dispatch: Dispatch<ICharInfoAction>
}) {
    const hitDice = char.classList.map(c => diceToString([c.level || 1, c.hitDice])).join('\n');

    function DeathSavePane() {
        return (
            <div className='raised-pane'>
                <div>
                    Successes -
                    <input className='save-input' type='checkbox'></input>
                    <input className='save-input' type='checkbox'></input>
                    <input className='save-input' type='checkbox'></input>
                </div>
                <div>
                    Failures -
                    <input className='save-input' type='checkbox'></input>
                    <input className='save-input' type='checkbox'></input>
                    <input className='save-input' type='checkbox'></input>
                </div>
            </div>
        );
    }

    return (
        <Col lg={8}>
            <Row>
                <HealthPane char={char} _dispatch={_dispatch}></HealthPane>
                <Col className='pane'>
                    <Row>
                        <Col>
                            <InfoBox title='Hit Dice' value={hitDice}/>
                            <InfoBox title='Initiative' value={'13'}/>
                        </Col>
                        <Col>
                            <InfoBox title='Death Saves'><DeathSavePane/></InfoBox>
                            <InfoBox title='Speed'></InfoBox>
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

function InfoBox({title, value, children}: {title: string, value?: string, children?: JSX.Element}) {
    return (
        <div className='info-box raised-pane'>
            <div>{value || children}</div>
            <div>{title}</div>
        </div>
    );
}


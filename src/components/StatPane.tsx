import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../App.css';
import '../css/StatPane.css';
import { Ability } from '../types/Ability';
import { CharInfo, CharInfoAction } from '../types/CharInfo';
import { calculateModifier, makeSignedNumber } from '../utilities';
import { ProficiencyPane } from './ProficiencyPane';

export default function StatPane({ char, dispatch }: { char: CharInfo, dispatch: React.Dispatch<CharInfoAction> }) {
    function handleStatDClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        const target = e.target as HTMLInputElement;
        target.value = '';
        target.readOnly = false;
    }

    function handleStatChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const newValue = Number.parseInt(target.value);
        if (Number.isNaN(newValue)) return;
        dispatch({type: 'setAbility', payload: {
            ...char.abilities.get(target.title as Ability)!,
            value: newValue,
            modifier: calculateModifier(newValue)
        }});
    }
    return (
        <Col id='stat-col'>
            <Row>
                <Col>
                    {Array.from(char.abilities.values()).map(ability => {
                        return (
                            <div className='stat-box' key={ability.name}>
                                {ability.name.toUpperCase()}<br/>{makeSignedNumber(ability.modifier)}
                                (<input
                                    className='stat-input'
                                    defaultValue={ability.value}
                                    title={ability.name.toLowerCase()}
                                    type='number'
                                    readOnly
                                    onDoubleClick={(e) => handleStatDClick(e)}
                                    onChange={(e) => handleStatChange(e)}/>)
                            </div>
                        );
                    })}
                </Col>
                <Col>
                    <ProficiencyPane char={char} dispatch={dispatch}/>
                </Col>
            </Row>
        </Col>
    );
}
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import '../App.css';
import '../css/StatPane.css';
import { EAbility } from '../types/AbilityInfo';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { calculateModifier, makeSignedNumber } from '../utilities';
import { ChangeableStatBox } from './ChangeableStatBox';
import { ProficiencyPane } from './ProficiencyPane';

export default function StatPane({ char, dispatch }: { char: ICharInfo, dispatch: React.Dispatch<ICharInfoAction> }) {

    function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
        const target = e.target as HTMLInputElement;
        const newValue = Number.parseInt(target.value);

        if (Number.isNaN(newValue)) return;

        dispatch({
            type: 'setAbility', payload: {
                ...char.abilities.get(target.title as EAbility)!,
                value: newValue,
                modifier: calculateModifier(newValue)
            }
        });
        target.readOnly = true;
    }

    return (
        <Col id='stat-col'>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Ability</th>
                                <th>Value</th>
                                <th>Mod</th>
                            </tr>
                        </thead>
                        <tbody> {
                            Array.from (char.abilities.values()).map(ability => {
                                return (
                                    <tr key={ability.name}>
                                        <td>{ability.name.toUpperCase()}</td>
                                        <td>
                                            <ChangeableStatBox
                                                title={ability.name}
                                                value={ability.value}
                                                onChange={handleBlur}/>
                                        </td>
                                        <td>{makeSignedNumber(ability.modifier)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <ProficiencyPane char={char} dispatch={dispatch} />
                </Col>
            </Row>
        </Col>
    );
}

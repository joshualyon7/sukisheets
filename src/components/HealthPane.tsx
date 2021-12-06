import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import { EAbility } from '../types/AbilityInfo';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { calculateModifier } from '../utilities';

export default function HealthPane({char, _dispatch}: {
    char: ICharInfo, _dispatch: Dispatch<ICharInfoAction>
}) {
    console.log('rendering health pane');

    return (
        <Col>
            <Row>
                <Col>
                    {char.baseAc + calculateModifier(char.abilities.get(EAbility.DEX)!.value)}
                </Col>
                <Col>
                    MAX HP
                </Col>
                <Col>
                    TEMP HP
                </Col>
            </Row>
            <Row>
                CURRENT HP
            </Row>
        </Col>
    );
}

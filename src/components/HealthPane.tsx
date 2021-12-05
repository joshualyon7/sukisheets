import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Ability } from '../types/Ability';
import { CharInfo, CharInfoAction } from '../types/CharInfo';
import { calculateModifier } from '../utilities';

export default function HealthPane({char, _dispatch}: {
    char: CharInfo, _dispatch: Dispatch<CharInfoAction>
}) {
    console.log('rendering health pane');

    return (
        <Col>
            <Row>
                <Col>
                    {char.baseAc + calculateModifier(char.abilities.get(Ability.DEX)!.value)}
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
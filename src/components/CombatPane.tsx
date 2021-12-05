import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CharInfo, CharInfoAction } from '../types/CharInfo';
import HealthPane from './HealthPane';

export default function CombatPane({char, _dispatch}: {
    char: CharInfo, _dispatch: Dispatch<CharInfoAction>
}) {
    return (
        <Col lg={8}>
            <Row>
                <HealthPane char={char} _dispatch={_dispatch}></HealthPane>
                <Col>
                    Hit dice, death saves, etc.
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
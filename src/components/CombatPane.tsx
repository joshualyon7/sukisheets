import React from 'react';
import { Col, Row } from 'react-bootstrap';
import HealthPane from './HealthPane';

export default function CombatPane() {
    return (
        <Col lg={8}>
            <Row>
                <HealthPane></HealthPane>
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
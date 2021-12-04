import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function HealthPane() {
    return (
        <Col>
            <Row>
                <Col>
                    AC
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
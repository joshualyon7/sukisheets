import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function StatPane() {

    return (
        <Col>
            <Row>
                <Col className='layout' lg={4}>
                    {}
                    Stat blocks
                </Col>
                <Col className='layout' lg={8}>
                    Proficiencies and such
                </Col>
            </Row>
        </Col>
    );
}
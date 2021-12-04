import React, { Dispatch, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CharInfo, CharInfoAction } from '../types/CharInfo';
import { EditCharInfoModal } from './modals/EditCharInfoModal';

export default function InfoPane({ pc, dispatchPc }:
    { pc: CharInfo, dispatchPc: Dispatch<CharInfoAction> }) {
    const [editShown, setEditShown] = useState(false);
    function showEditInfo() {
        setEditShown(true);
    }
    return (
        <Row>
            <EditCharInfoModal pc={ pc } dispatchPc={ dispatchPc } shown={ editShown } setEditShown={ setEditShown }/>
            <Col lg={4}>
                <Button onClick={ showEditInfo }>Edit Info</Button>
                {pc.name || 'Tim'}
            </Col>
            <Col>
                <Row>
                    <Col>Level/Class</Col>
                    <Col>Race</Col>
                    <Col>Player Name</Col>
                </Row>
                <Row>
                    <Col>XP</Col>
                    <Col>Alignment</Col>
                    <Col>Background</Col>
                </Row>
            </Col>
        </Row>
    );

}
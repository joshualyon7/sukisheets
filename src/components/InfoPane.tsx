import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../App.css';

export default function InfoPane(/*{ pc, dispatchPc }:
    { pc: CharInfo, dispatchPc: Dispatch<CharInfoAction> }*/) {
    //const [editShown, setEditShown] = useState(false);
    // function showEditInfo() {
    //     setEditShown(true);
    // }
    return (
        <Row>
            {/* <EditCharInfoModal pc={ pc } dispatchPc={ dispatchPc } shown={ editShown } setEditShown={ setEditShown }/> */}
            <Col lg={4}>
                TIM
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

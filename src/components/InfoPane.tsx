import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../App.css';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { firstLetterCaps } from '../utilities';

export default function InfoPane({char, _dispatch}: {char: ICharInfo, _dispatch: Dispatch<ICharInfoAction> }) {

    return (
        <Row>
            {/* <EditCharInfoModal pc={ pc } dispatchPc={ dispatchPc } shown={ editShown } setEditShown={ setEditShown }/> */}
            <Col lg={4}>
                {char.name}
            </Col>
            <Col>
                <Row>
                    <Col>{
                        char.classList.map(c => {
                            return (
                                <div key={c.name}>{`${firstLetterCaps(c.name)} (lvl${c.level || 1})`}</div>
                            );
                        })
                    }</Col>
                    <Col>{firstLetterCaps(char.race.name)}</Col>
                    <Col>{firstLetterCaps(char.playerName)}</Col>
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

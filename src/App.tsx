import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import StatPane from './components/StatPane';
import CombatPane from './components/CombatPane';
import InfoPane from './components/InfoPane';
import { CharInfo, CharInfoAction } from './types/CharInfo';
import { StatInfo } from './types/StatInfo';

function reducer(pc: CharInfo, action: CharInfoAction): CharInfo {
    switch (action.type) {
    case 'setHealth':
        return { ...pc, hp: action.payload as number };
    case 'setLevel':
        return { ...pc, level: action.payload as number };
    case 'setName':
        return { ...pc, name: action.payload as string };
    case 'setStats':
        return { ...pc, stats: action.payload as StatInfo };
    case 'setTempHealth':
        return { ...pc, tempHp: action.payload as number };
    case 'setCharInfo':
        return action.payload as CharInfo;
    default:
        throw new Error();
    }
}

function App() {
    const initialState: CharInfo = {level: 1, name: 'tim'};
    const [curPc, dispatchPc] = useReducer(reducer, initialState);

    return (
        <Container className='App'>
            <Row>
                <Col lg={9}>
                    <InfoPane pc={curPc} dispatchPc={dispatchPc}/>
                    <Row>
                        <StatPane/>
                        <CombatPane/>
                    </Row>
                </Col>
                <Col lg={3}>
                    <Row>
                        Proficiencies and languages
                    </Row>
                    <Row>
                        Inventory and equipment

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default App;

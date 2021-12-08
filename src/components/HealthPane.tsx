import React, { Dispatch } from 'react';
import { Col, Row } from 'react-bootstrap';
import { EAbility } from '../types/AbilityInfo';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { calculateModifier } from '../utilities';
import { ChangeableStatBox } from './ChangeableStatBox';
import '../css/HealthPane.css';

export default function HealthPane({char, dispatch}: {
    char: ICharInfo, dispatch: Dispatch<ICharInfoAction>
}) {
    console.log('rendering health pane');

    function handleHpChange(e: React.FocusEvent<HTMLInputElement, Element>) {
        const target = e.target as HTMLInputElement;
        const newValue = Number.parseInt(target.value);

        if (Number.isNaN(newValue)) return;

        dispatch({type: 'setCurHp', payload: newValue});
    }

    return (
        <Col id='health-pane' className='spaced'>
            <Row className='h-50 health-ac-wrapper'>
                <HealthInfoBox className='ac-box'
                    header='Armor Class'
                    content={char.baseAc + calculateModifier(char.abilities.get(EAbility.DEX)!.value)}/>
                <HealthInfoBox className='hp-box'
                    header='Hit Points'>
                    <div className='hp-display-box'>
                        <HealthChanger curHp={char.curHp} dispatch={dispatch}/>
                        <div className='hp-fraction-box'>
                            <ChangeableStatBox
                                title='curHp'
                                value={char.curHp}
                                onChange={handleHpChange}
                                className='cur-hp-input'
                            /><span className='max-hp'> / {Math.max.apply(Math, char.classList.map(c => c.hitDice))}</span>
                        </div>
                    </div>
                </HealthInfoBox>
                <HealthInfoBox className='tmp-hp-box'
                    header='Temporary Hit Points'
                    content={char.tempHp || '--'}/>
            </Row>
        </Col>
    );
}

function HealthInfoBox({header, content, children, className}:
    {header: string, content?: string | number, children?: JSX.Element | JSX.Element[], className?: string}) {
    return (
        <div className={`health-info-box-wrapper ${className}`}>
            <div className='health-info-box-header'>{header}</div>
            {children !== undefined && children}
            {content !== undefined && <div className='health-info-box-content'>{content}</div>}
        </div>
    );
}

function HealthChanger({curHp, dispatch}: {curHp: number, dispatch: Dispatch<ICharInfoAction>}) {
    function incrementHp() {
        dispatch({type: 'setCurHp', payload: curHp + 1});
    }

    function decrementHp() {
        dispatch({type: 'setCurHp', payload: curHp - 1});
    }

    return (
        <div className='hp-change-wrapper'>
            <button onClick={() => incrementHp()}>+</button>
            <button onClick={() => decrementHp()}>-</button>
        </div>
    );
}

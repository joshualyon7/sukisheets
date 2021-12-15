import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Accordion, Button, Col,
    Form, FormControl, FormGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, Row, } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Spell } from '../../types/Spell';
import { isSpellList, SpellList } from '../../types/SpellList';
import '../../css/SpellPaneModal.css';
import { ICharInfo, ICharInfoAction } from '../../types/CharInfo';

enum _SpellFilterGroup {
    SCHOOL='School',
    CLASS='Class'
}

const defaultSpellList: SpellList = {
    count: 0,
    next: null,
    previous: null,
    results: []
};

export function SpellPaneModal({show, setShow, char, dispatch}: {
    show: boolean,
    setShow: Dispatch<React.SetStateAction<boolean>>,
    char: ICharInfo,
    dispatch: Dispatch<ICharInfoAction>
}) {
    const [fullSpellBook, setFullSpellBook] = useState<Spell[]>([]);
    const [shownSpells, setShownSpells] = useState(fullSpellBook);
    const [uniqueClasses, setUniqueClasses] = useState<string[]>(['Necromancy']);
    const [uniqueSchools, setUniqueSchools] = useState<string[]>([]);

    useEffect(() => {
        const asyncWrapper = async () => setFullSpellBook(await fetchSpells(setUniqueClasses, setUniqueSchools));
        asyncWrapper();
    }, []);

    return (
        <Modal id='spell-modal' size='lg' backdrop='true' show={show}>
            <ModalHeader>
                Spell List
                <Button variant='close' onClick={() => setShow(false)}/>
            </ModalHeader>
            <ModalBody>
                <div className='filter-row'>
                    <SpellFilter spells={fullSpellBook} setShownSpells={setShownSpells} classes={uniqueClasses} schools={uniqueSchools}/>
                </div>
                <SpellBook char={char} dispatch={dispatch} spells={shownSpells}/>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setShow(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}
export function SpellBook({spells, char, dispatch}: {spells: Spell[], char: ICharInfo, dispatch: Dispatch<ICharInfoAction>}) {


    return (
        <div className='spell-list'>
            <Accordion defaultActiveKey='0'>
                {spells.map(spell => {
                    return <SpellListing char={char} dispatch={dispatch} key={spell.name} spell={spell}/>;
                })}
            </Accordion>
        </div>
    );
}


function SpellListing({char, dispatch, spell}: {
    spell: Spell,
    char: ICharInfo,
    dispatch: Dispatch<ICharInfoAction>
}) {
    function handleSpellAdd(spell: Spell) {
        const action: ICharInfoAction = {
            type: 'setSpellBook',
            payload: [...char.spellBook, spell]
        };

        dispatch(action);
    }

    function handleSpellRemove(spell: Spell) {
        const action: ICharInfoAction = {
            type: 'setSpellBook',
            payload: char.spellBook.filter(sp => sp.slug !== spell.slug)
        };

        dispatch(action);
    }

    return (
        <Col className='spell-list-entry'>
            <Accordion.Item eventKey={spell.name}>
                <Accordion.Header>
                    <div className='spell-header'>
                        <div className='spell-header-main'>{spell.name}</div>
                        <div className='spell-header-sub'>{spell.level} {spell.school}</div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col lg={7}><div>{spell.desc}</div><br/><div>{spell.higher_level}</div></Col>
                        <Col lg={5}><ListGroup>
                            <ListGroupItem>
                                {spell.casting_time !== '' && <div className='spell-info'>Casting time: {spell.casting_time}</div>}
                                {spell.dnd_class !== '' && <div className='spell-info'>Class(es): {spell.dnd_class}</div>}
                                {spell.duration !== '' && <div className='spell-info'>Duration: {spell.duration}</div>}
                                {spell.range !== '' && <div className='spell-info'>Range/Area: {spell.range}</div>}
                                {spell.components !== '' && <div className='spell-info'>Components: {spell.components}</div>}
                                {spell.material !== '' && <div className='spell-info'>Materials: {spell.material}</div>}
                            </ListGroupItem>
                        </ListGroup><br/>
                        {
                            !char.spellBook.find(sp => sp.slug === spell.slug)
                                ? <Button onClick={() => handleSpellAdd(spell)}variant='success'>Add to spellbook</Button>
                                : <Button onClick={() => handleSpellRemove(spell)}variant='danger'>Remove from spellbook</Button>
                        }
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Col>
    );
}

async function fetchSpells(
    setUniqueClasses: Dispatch<SetStateAction<string[]>>,
    setUniqueSchools: Dispatch<SetStateAction<string[]>>
): Promise<Spell[]> {
    let tempSpellList: SpellList = {...defaultSpellList};
    let spells: Spell[] = [];
    let pageNo = 1;
    const uniqueClasses = new Set<string>();
    const uniqueSchools = new Set<string>();

    do {
        const response = await fetch(`https://api.open5e.com/spells/?page=${pageNo++}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        const data = await response.json();
        if (data && isSpellList(data)) {
            tempSpellList = data;
            spells = spells.concat(data.results);
        }
    } while (tempSpellList.next !== null);

    spells.forEach(spell => {
        spell.dnd_class.split(',').forEach(dnd_class => uniqueClasses.add(dnd_class.trim()));
        uniqueSchools.add(spell.school);
    });

    setUniqueClasses(Array.from(uniqueClasses));
    setUniqueSchools(Array.from(uniqueSchools));
    return spells;
}


function SpellFilter({classes, schools, spells, setShownSpells}: {
    classes: string[],
    schools: string[],
    spells: Spell[],
    setShownSpells: Dispatch<SetStateAction<Spell[]>>}) {
    console.log(classes, schools);

    function handleSearchChange(e: any) {
        const target = e.target as HTMLInputElement;
        if (target.value === '') {
            setShownSpells(spells);
            return;
        }
        const filteredSpells = spells.filter(spell => spell.name.toLowerCase().startsWith(target.value.toLowerCase().trim()));
        setShownSpells(filteredSpells);
    }

    return (
        <Form>
            <FormGroup>
                <FormControl type='text' placeholder='Search' onChange={(e) => handleSearchChange(e)}></FormControl>
                {classes.forEach(dnd_class => {
                    return (
                        <Form.Check inline>
                            <Form.Check.Label>{dnd_class}</Form.Check.Label>
                            <Form.Check.Input id={`${dnd_class}-filter-check`} type='checkbox'></Form.Check.Input>
                        </Form.Check>
                    );
                })}<br/>
                {schools.forEach(school => {
                    return <Form.Check inline type='checkbox'>{school}</Form.Check>;
                })}
            </FormGroup>
        </Form>
    );
}

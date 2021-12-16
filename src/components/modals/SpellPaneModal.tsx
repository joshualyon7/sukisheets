import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Accordion, Button, Col,
    Form, FormControl, FormGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, Row, } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Spell } from '../../types/Spell';
import { isSpellList, SpellList } from '../../types/SpellList';
import '../../css/SpellPaneModal.css';
import { ICharInfo, ICharInfoAction } from '../../types/CharInfo';
import BKP_SPELLS from '../../data/backupSpells.json';

const TYPING_TIMEOUT = 250;

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
    const [fullSpellBook, setFullSpellBook] = useState<Spell[]>(BKP_SPELLS);
    const [shownSpells, setShownSpells] = useState<Spell[]>([]);
    const [uniqueClasses, setUniqueClasses] = useState<string[]>(['Necromancy']);
    const [uniqueSchools, setUniqueSchools] = useState<string[]>([]);

    useEffect(() => {
        const asyncWrapper = async () => {
            setFullSpellBook(await fetchSpells(setUniqueClasses, setUniqueSchools));
        };
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
    let typingTimer = setTimeout(() => 5, 1000);

    const [searchFilter, setSearchFilter] = useState('');
    const [schoolFilter, setSchoolFilter] = useState<string[]>([]);
    const [classFilter, setClassFilter] = useState<string[]>([]);

    useEffect(() => {
        console.log(schoolFilter, searchFilter, classFilter);
        filterSpells();
    }, [schoolFilter, searchFilter, classFilter]);

    function handleSearchChange(e: any) {
        const target = e.target as HTMLInputElement;
        setSearchFilter(target.value.toLowerCase());
    }

    function handleSchoolFilterChange(e: any) {
        const target = e.target as HTMLInputElement;
        target.checked ? setSchoolFilter([...schoolFilter, target.value.toLowerCase()])
            : setSchoolFilter(schoolFilter.filter(school => school !== target.value));
    }

    function handleClassFilterChange(e: any) {
        const target = e.target as HTMLInputElement;
        target.checked ? setClassFilter([...classFilter, target.value.toLowerCase()])
            : setClassFilter(classFilter.filter(dnd_class => dnd_class.toLowerCase() !== target.value.toLowerCase()));
    }

    function filterSpells() {
        const filteredSpells = spells.filter(spell => {
            const passesSchool = schoolFilter.includes(spell.school.toLowerCase());
            const passesClass = spell.dnd_class.split(',').map(cls => cls.trim().toLowerCase()).some(cls => classFilter.includes(cls));
            const passesSearch = spell.name.toLowerCase().startsWith(searchFilter.toLowerCase().trim());
            let valid = true;
            if (searchFilter !== '') {
                valid = valid && passesSearch;
                if (classFilter.length !== 0) {
                    valid = valid && passesClass;
                }
                if (schoolFilter.length !== 0) {
                    valid = valid && passesSchool;
                }
            } else if (classFilter.length !== 0) {
                valid = valid && passesClass;
                if (schoolFilter.length !== 0) {
                    valid = valid && passesSchool;
                }
                if (searchFilter !== '') {
                    valid = valid && passesSearch;
                }
            } else if (schoolFilter.length !== 0) {
                valid = valid && passesSchool;
                if (classFilter.length !== 0) {
                    valid = valid && passesClass;
                }
                if (searchFilter !== '') {
                    valid = valid && passesSearch;
                }
            }
            return valid;
        });
        setShownSpells(filteredSpells);
    }

    return (
        <Form>
            <FormGroup>
                <FormControl
                    type='text'
                    placeholder='Search'
                    onKeyUp={(e) => {
                        typingTimer = setTimeout(handleSearchChange, TYPING_TIMEOUT, e);
                    }}
                    onKeyDown={() => clearTimeout(typingTimer)}></FormControl
                >
                Classes:<br/>
                {classes.map(dnd_class => {
                    return <Form.Check
                        inline key={dnd_class}
                        onChange={handleClassFilterChange}
                        label={dnd_class}
                        value={dnd_class}
                        id={`${dnd_class}-filter-check`}
                        type='checkbox'
                    />;
                })}<br/>
                Schools:<br/>
                {schools.map(school => {
                    return <Form.Check
                        onChange={handleSchoolFilterChange}
                        key={school}
                        label={school}
                        value={school}
                        inline type='checkbox'
                    />;
                })}
            </FormGroup>
        </Form>
    );
}
